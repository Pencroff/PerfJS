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