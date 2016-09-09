/**
 * Created by Pencroff on 09-Sep-16.
 */
(function (root) {
    root.search = root.search || {};
    var module = root.search;

    module.init = initSearch;
    module.init();

    // module.render = renderCaseList;
    // module.onRoot = onRootRoute;
    // module.byId = byIdRoute;
    // module.search = searchRoute;
    // module.byTag = byTagRoute;

    function initSearch() {
        $('.c-search__input').on('keypress', handleEvent);
        $('.c-search__button').on('click', handleEvent);
    }
    
    function handleEvent(e) {
        console.dir(e);
    }

})(window.PerformanceJs);