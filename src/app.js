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
            '/search/:query': [caseList.search],
            '/tag/:tag': [caseList.byTag],
        };

        var router = Router(routes);
        router.init('/');
    }
})(window.PerformanceJs);