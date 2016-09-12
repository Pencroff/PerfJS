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