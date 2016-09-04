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