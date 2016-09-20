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
        var router = root.router;
        if (query === 'undefined' || query === 'null') router.navigate('/');
        module.filteredData = _.filter(root.data, function(item) {
            item.active = item.id === module.selectedCase;
            return ((item.name && item.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
                || (item.description && item.description.toLowerCase().indexOf(query.toLowerCase()) > -1));
        });
        module.render(module.filteredData);
    }
    function byTagRoute(tag) {
        var router = root.router;
        if (tag === 'undefined' || tag === 'null') router.navigate('/');
        module.filteredData = _.filter(root.data, function(item) {
            item.active = item.id === module.selectedCase;
            return _.includes(item.tags, tag);
        });
        module.render(module.filteredData);
    }
    function renderCaseList(list) {
        list.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
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