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