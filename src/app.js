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

        var router = new Grapnel({ pushState : false, root: '', hashBang: true });
        root.router = router;
        router.get('/search/:query', function (req, e) {
            caseList.search(req.params.query);
            search.onSearch(req.params.query);
        });
        router.get('/tag/:tag', function (req, e) {
            caseList.byTag(req.params.tag);
            search.onTag(req.params.tag);
        });
        router.get('/:id', function (req, e) {
            caseList.byId(req.params.id);
            caseDetails.byId(req.params.id);
        });
        router.get('/', function () {
            caseList.onRoot();
            caseDetails.onRoot();
        });
        router.get('', function () {
            router.navigate('/');
        });
    }
})(window.PerformanceJs);