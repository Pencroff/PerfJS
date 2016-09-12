/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.app = root.app || {};
    var module = root.app;
    module.run = run;

    function run() {
        var caseList = root.caseList;
        var caseDetails = root.caseDetails;
        var search = root.search;

        var router = new Grapnel({ pushState : false, root: '', hashBang: true });
        root.router = router;
        router.get('/search/:query', function (req, e) {
            caseList.search(req.params.query);
            search.onSearch(req.params.query);
        });
        router.get('/tag/:tag', function (req, e) {
            caseList.byTag(req.params.tag);
            search.onTag(req.params.tag);
        });
        router.get('/:id', function (req, e) {
            caseList.byId(req.params.id);
            caseDetails.byId(req.params.id);
        });
        router.get('/', function () {
            caseList.onRoot();
            caseDetails.onRoot();
        });
        router.get('', function () {
            router.navigate('/');
        });
    }
})(window.PerformanceJs);
/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseDetails = root.caseDetails || {};
    var module = root.caseDetails;
    module.onRoot = onRootRoute;
    module.byId = byIdRoute;

    function onRootRoute() {
        renderCaseDetails('Please select test in list beside (click on header)')
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
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = item.kebabName + '-' + item.id;
                this.page.url = 'http://perfjs.info/#!/' + item.id;
            }
        });
    }
})(window.PerformanceJs);

/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseList = root.caseList || {};
    var module = root.caseList;
    var templateFn = root.JST['caseList'];
    module.render = renderCaseList;
    module.onRoot = onRootRoute;
    module.byId = byIdRoute;
    module.search = searchRoute;
    module.byTag = byTagRoute;

    function onRootRoute() {
        module.filteredData = root.data.slice(0);
        module.render(module.filteredData);
    }
    function byIdRoute(id) {
        var router = root.router;
        if (id === 'undefined' || id === 'null') router.navigate('/');
        id =  id.substr(0, 36);
        if (!module.filteredData) {
            module.filteredData = root.data.slice(0);
        }
        module.selectedCase = id;
        var data = module.filteredData.map(function (item) {
            item.active = item.id === id;
            return item;
        });
        module.render(data);
    }
    function searchRoute(query) {
        if (query === 'undefined' || query === 'null') window.location.hash = '!';
        module.filteredData = _.filter(root.data, function(item) {
            item.active = item.id === module.selectedCase;
            return ((item.name && item.name.indexOf(query) > -1)
                || (item.description && item.description.indexOf(query) > -1));
        });
        module.render(module.filteredData);
    }
    function byTagRoute(tag) {
        if (tag === 'undefined' || tag === 'null') window.location.hash = '!';
        module.filteredData = _.filter(root.data, function(item) {
            item.active = item.id === module.selectedCase;
            return _.includes(item.tags, tag);
        });
        module.render(module.filteredData);
    }
    function renderCaseList(list) {
        var caseListContainer = $('.c-test-list')[0];
        $('.c-card__content', caseListContainer).off('click');
        $('.c-card__content > c-paragraph', caseListContainer).off('click');
        $('.c-tag', caseListContainer).off('click');
        caseListContainer.innerHTML = list.map(function (item) {
            return templateFn(item);
        }).join('');
        $('.c-tag', caseListContainer).on('click', onTagSelect);
        $('.c-card__content', caseListContainer).on('click', onCaseSelect);
        $('.c-card__content > c-paragraph', caseListContainer).on('click', onCaseSelect);
    }
    function onCaseSelect(e) {
        var router = root.router;
        var el = e.target;
        var id = $(el).attr('data-id');
        if (!id) {
            el = $(el).parent('.c-card__content[data-id]');
            id = $(el).attr('data-id');
        }
        e.stopPropagation();
        router.navigate('/' + id);
    }
    function onTagSelect(e) {
        var router = root.router;
        var el = e.target;
        var tag = $(el).text().trim();
        e.stopPropagation();
        router.navigate('/tag/' + tag);
    }
})(window.PerformanceJs);
/**
 * Created by Pencroff on 09-Sep-16.
 */
(function (root) {
    root.search = root.search || {};
    var module = root.search;
    var inputControl = $('.c-search__input');

    initSearch();

    module.onSearch = onSearchRoute;
    module.onTag = onTagRoute;

    function onSearchRoute(query) {
        inputControl.val(query);
    }
    function onTagRoute(tag) {
        inputControl.val('tag:' + tag);
    }

    function initSearch() {
        inputControl.on('keypress', handleEvent);
        $('.c-search__button').on('click', handleEvent);
    }
    function handleEvent(e) {
        if (e.type === 'click') {
            e.preventDefault();
            updatePageHash(inputControl.val());
        }
        var code = e.code ? e.code : e.keyCode ? e.keyCode : e.which;
        if (e.type === 'keypress' && (code === 'Enter' || code === 13)) {
            e.preventDefault();
            updatePageHash(inputControl.val());
        }
    }
    function updatePageHash(value) {
        var router = root.router;
        if (value.length === 0) {
            router.navigate('/');
        } else if (value.indexOf('tag:') === 0) {
            router.navigate('/tag/' + value.substr(4));
        } else {
            router.navigate('/search/' + inputControl.val());
        }
    }
})(window.PerformanceJs);
/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.utils = root.utils || {};
    var module = root.utils;
    module.toType = (function(global) {
        return function(obj) {
            if (obj === global) {
                return 'global';
            }
            return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
        };
    })(this);
    module.isPromise = function (v) {
        var result = false;
        var vType = module.toType(v);
        if ((vType === 'object' || vType === 'function')
            && module.toType(v.then) === 'function') {
            result = true;
        }
        return result;
    }
})(window.PerformanceJs);