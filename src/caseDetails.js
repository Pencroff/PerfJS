/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseDetails = root.caseDetails || {};
    var module = root.caseDetails;
    module.onRoot = onRootRoute;
    module.byId = byIdRoute;

    function onRootRoute() {
        renderCaseDetails('Please select case in list beside or filter by tag')
    }

    function byIdRoute(id) {
        $('head > script').remove();
        if (id === 'undefined' || id === 'null') return;
        id =  id.substr(0, 36);
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
            id: test.id,
            kebabName: _.kebabCase(test.name),
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
            $('.c-table__cell-result, .c-table__cell-result > span', container).off('click');

            var content = $(templateFn(item));
            $('code[class*="language-"]', content)
                .forEach(function(item) {
                    Prism.highlightElement(item);
                });
            container.innerHTML = content.html();

            $('.c-button--run-test', container).on('click', function (e) {
                $('.c-table__cell-result, .c-table__cell-result > span', container).off('click');
                $('.c-button--run-test').prop('disabled', true);
                $('.c-table__cell-result[data-id]')
                    .removeClass('c-table__cell-result-fastest')
                    .removeClass('c-table__cell-result-slowest');
                $('.c-table__cell-result[data-id] > .c-table__cell-result-text').text('-')
                $('.c-table__cell-result[data-id="' + module.currentSuite[0].id + '"] > .c-table__cell-result-text')
                    .html('<span class="gauge-loader"></span>');
                module.currentSuite
                    .on('cycle', uiCycleHandler)
                    .on('complete', uiCompleteHandler)
                    .run({ 'async': true });
            });
            $('.c-table__cell-result, .c-table__cell-result > span', container).on('click', singleBenchRunner);
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
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = item.kebabName + '-' + item.id;
                this.page.url = 'http://perfjs.info/#!/' + item.id;
            }
        });
    }
    function uiCycleHandler(event) {
        console.log(String(event.target));
        var suite = module.currentSuite;
        $('.c-table__cell-result[data-id="' + event.target.id + '"] > .c-table__cell-result-text').text(event.target.toString());
        var currentIndex =  suite.indexOf(event.target);
        if (currentIndex > -1 && currentIndex < suite.length - 1) {
            $('.c-table__cell-result[data-id="' + suite[currentIndex+1].id + '"] > .c-table__cell-result-text')
                .html('<span class="gauge-loader"></span>')
        }
    }
    function uiCompleteHandler() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        $('.c-button--run-test').prop('disabled', false);
        $('.c-table__cell-result, .c-table__cell-result > span').on('click', singleBenchRunner);
        var fastest = this.filter('fastest').map(function (item) {
            return $('.c-table__cell-result[data-id="' + item.id + '"]')
        });
        var slowest = this.filter('slowest').map(function (item) {
            return $('.c-table__cell-result[data-id="' + item.id + '"]')
        });
        fastest.forEach(function (el) {
            el.addClass('c-table__cell-result--fastest');
        });
        slowest.forEach(function (el) {
            el.addClass('c-table__cell-result--slowest');
        })
    }
    function singleBenchRunner(e) {
        $('.c-button--run-test').prop('disabled', true);
        $('.c-table__cell-result, .c-table__cell-result > span').off('click');
        var targetEl = e.target;
        var el = $(targetEl);
        var strId = el.attr('data-id');
        if (!strId) {
            el = $(el).parent('.c-table__cell-result[data-id]');
            strId = $(el).attr('data-id');
        }
        var id = parseInt(strId, 10);
        console.log(id);
        var bench = _.find(module.currentSuite, { id: id });
        if (bench) {
            var clone = bench.clone();
            var events = module.currentSuite.events;
            _.forEach(events.start, function (fn) {
                clone.on('start', fn);
            });
            _.forEach(events.cycle, function (fn) {
                if (fn !== uiCycleHandler) clone.on('cycle', fn);
            });
            el.children('.c-table__cell-result-text').html('<span class="gauge-loader"></span>');
            clone
                .on('complete', completeHandler)
                .run({ 'async': true });
        }
        function completeHandler(e) {
            clone.off('start');
            clone.off('cycle');
            clone.off('complete');
            el.children('.c-table__cell-result-text').text(clone.toString());
            $('.c-button--run-test').prop('disabled', false);
            $('.c-table__cell-result, .c-table__cell-result > span').on('click', singleBenchRunner);
        }
    }
})(window.PerformanceJs);
