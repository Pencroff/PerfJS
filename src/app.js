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
        var routes = {
            '!': [caseList.onRoot, caseDetails.onRoot],
            '!:id': [caseList.byId, caseDetails.byId],
            '!search/:query': [caseList.search, search.onSearch],
            '!tag/:tag': [caseList.byTag, search.onTag],
        };

        var router = Router(routes);
        router.init('!');
    }
})(window.PerformanceJs);