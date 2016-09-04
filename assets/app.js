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
        var routes = {
            '/': [caseList.onRoot, caseDetails.onRoot],
            '/:id': [caseList.byId, caseDetails.byId],
            '/search/:query': [caseList.search, caseDetails.search],
            '/search/:query/:id': [caseList.search, caseDetails.search],
            '/tag/:tag': [caseList.byTag, caseDetails.byTag],
            '/tag/:tag/:id': [caseList.byTag, caseDetails.byTag],
        };

        var router = Router(routes);
        router.init('/');
    }
})(window.PerformanceJs);
/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseDetails = root.caseDetails || {};
    var module = root.caseDetails;
    module.render = renderCaseDetails;
    module.onRoot = onRootRoute;
    module.byId = byIdRoute;
    module.search = searchRoute;
    module.byTag = byTagRoute;

    function onRootRoute() {
        module.render('Please select test in list beside')
    }
    function byIdRoute(id) {
        console.log('id - caseDetails ::', id);
    }
    function searchRoute(query) {
        console.log('query - caseDetails ::', query);
    }
    function byTagRoute(tag) {
        console.log('tag - caseDetails ::', tag);
    }

    function renderCaseDetails(item) {
        var utils = root.utils;
        var container = $('.c-test-detail')[0];
        var templateFn = root.JST['caseDetails'];
        var emptyTemplateFn = root.JST['caseDetailsEmpty'];
        if (utils.toType(item) === 'object') {
            $('.c-tab-heading', container).off('click');
            container.innerHTML = templateFn(item);
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
        var data = root.data;
        module.render(data);
    }
    function byIdRoute(id) {
        if (id === 'undefined' || id === 'null') window.location.hash = '/';
        var data = root.data.map(function (item) {
            item.active = item.id === id;
            return item;
        });
        module.render(data);
    }
    function searchRoute(query, id) {
        if (query === 'undefined' || query === 'null') window.location.hash = '/';
        var data = _.filter(root.data, function(item) {
            item.active = item.id === id;
            return ((item.name && item.name.indexOf(query) > -1)
                || (item.description && item.description.indexOf(query) > -1));
        });
        module.render(data);
    }
    function byTagRoute(tag, id) {
        if (tag === 'undefined' || tag === 'null') window.location.hash = '/';
        var data = _.filter(root.data, function(item) {
            item.active = item.id === id;
            return _.includes(item.tags, tag);
        });
        module.render(data);
    }
    function renderCaseList(list) {
        var caseListContainer = $('.c-test-list')[0];
        $('.c-card__content--divider', caseListContainer).off('click');
        $('.c-tag', caseListContainer).off('click');
        caseListContainer.innerHTML = list.map(function (item) {
            return templateFn(item);
        }).join('');
        $('.c-card__content--divider', caseListContainer).on('click', onCaseSelect);
        $('.c-tag', caseListContainer).on('click', onTagSelect)
    }
    function onCaseSelect(e) {
        var el = e.target;
        var id = $(el).attr('data-id');
        var parts = window.location.hash.split('/').splice(1, 2);
        if (parts[0] === 'tag' || parts[0] === 'search') {
            parts.push(id);
            window.location.hash = '/'+ parts.join('/');
        } else  {
            window.location.hash = '/' + id;
        }
    }
    function onTagSelect(e) {
        var el = e.target;
        var tag = $(el).text().trim();
        window.location.hash = '/tag/'+tag;
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
    })(this)
})(window.PerformanceJs);