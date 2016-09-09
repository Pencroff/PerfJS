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
        if (value.length === 0) {
            window.location.hash = '!';
        } else if (value.indexOf('tag:') === 0) {
            window.location.hash = '!tag/'+ value.substr(4);
        } else {
            window.location.hash = '!search/' + inputControl.val();
        }
    }
})(window.PerformanceJs);