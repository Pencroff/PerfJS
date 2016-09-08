/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseDetails = root.caseDetails || {};
    var module = root.caseDetails;
    module.onRoot = onRootRoute;
    module.byId = byIdRoute;

    function onRootRoute() {
        renderCaseDetails('Please select test in list beside')
    }

    function byIdRoute(id) {
        $('head > script').remove();
        var selectedCase = getCaseById(id, root.data);
        $script(selectedCase.url + '?v=' + Date.now(), function () {
            var test = window.test;
            var suite = new Benchmark.Suite;
            var testFillResult = test.fill(suite);
            if (root.utils.isPromise(testFillResult)) {
                testFillResult.then(finishSuiteSetup);
            } else {
                finishSuiteSetup(suite);
            }
        })
    }

    function finishSuiteSetup(suite) {
        var test = window.test;
        var viewData = transformSuiteToViewData(suite, test);
        module.currentSuite = suite;
        renderCaseDetails(viewData);
    }

    function transformSuiteToViewData(suite, test) {
        var result = {
            name: test.name,
            platform: platform.description,
            source: test.fill.toString()
        };
        result.cases = _.map(suite, function (benchmark) {
            var viewData = {
                id: benchmark.id,
                name: benchmark.name,
                source: getFunctionSource(benchmark.fn.toString())
            };
            return viewData;
        });
        return result;
    }

    function getFunctionSource(str) {
        var firstIndex = str.indexOf('{');
        var lastIndex = str.lastIndexOf('}');
        var result = str.substring(firstIndex + 1, lastIndex);
        return result;
    }

    function getCaseById(id, list) {
        var len = list.length;
        var index = 0;
        var result = null;
        var currentCase;
        while (len > 0 && result === null) {
            currentCase = list[index];
            if (currentCase.id === id) {
                result = currentCase;
            }
            index += 1;
            len -= 1;
        }
        return result;
    }

    function renderCaseDetails(item) {
        var utils = root.utils;
        var container = $('.c-test-detail')[0];
        var templateFn = root.JST['caseDetails'];
        var emptyTemplateFn = root.JST['caseDetailsEmpty'];
        if (utils.toType(item) === 'object') {
            $('.c-tab-heading', container).off('click');
            $('.c-button--run-test', container).off('click');

            var content = $(templateFn(item));
            $('code[class*="language-"]', content)
                .forEach(function(item) {
                    Prism.highlightElement(item);
                });
            container.innerHTML = content.html();

            $('.c-button--run-test', container).on('click', function (e) {
                $('.c-button--run-test').prop('disabled', true);
                $('.c-table__cell--case-result[data-id]')
                    .removeClass('c-table__cell--case-result-fastest')
                    .removeClass('c-table__cell--case-result-slowest')
                    .text('-');
                $('.c-table__cell--case-result[data-id="' + module.currentSuite[0].id + '"]')
                    .html('<span class="gauge-loader"></span>');
                module.currentSuite
                    .on('cycle', function(event) {
                        console.log(String(event.target));
                        var suite = module.currentSuite;
                        $('.c-table__cell--case-result[data-id="' + event.target.id + '"]').text(event.target.toString());
                        var currentIndex =  suite.indexOf(event.target);
                        if (currentIndex > -1 && currentIndex < suite.length - 1) {
                            $('.c-table__cell--case-result[data-id="' + suite[currentIndex+1].id + '"]')
                                .html('<span class="gauge-loader"></span>')
                        }

                    })
                    .on('complete', function() {
                        console.log('Fastest is ' + this.filter('fastest').map('name'));
                        $('.c-button--run-test').prop('disabled', false);
                        var fastest = this.filter('fastest').map(function (item) {
                            return $('.c-table__cell--case-result[data-id="' + item.id + '"]')
                        });
                        var slowest = this.filter('slowest').map(function (item) {
                            return $('.c-table__cell--case-result[data-id="' + item.id + '"]')
                        });
                        fastest.forEach(function (el) {
                            el.addClass('c-table__cell--case-result-fastest');
                        });
                        slowest.forEach(function (el) {
                            el.addClass('c-table__cell--case-result-slowest');
                        })
                    })
                    .run({ 'async': true });
            });
            $('.c-tab-heading', container).on('click', function (e) {
                var targetEl = e.target;
                var nextIndex = targetEl.previousElementSibling ? 1 : 0;
                var contentPanels = $('.c-tabs__tab', container).removeClass('c-tabs__tab--active');
                $('.c-tab-heading', container)
                    .removeClass('c-tab-heading--active')
                    .forEach(function (el, index) {
                        if(index === nextIndex) {
                            $(el).addClass('c-tab-heading--active');
                            $(contentPanels[index]).addClass('c-tabs__tab--active');
                        }
                    });
            });
        } else {
            container.innerHTML = emptyTemplateFn({ text: item || '' });
        }
    }
})(window.PerformanceJs);
