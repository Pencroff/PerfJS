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
            ga('send', 'event', 'Navigation', 'search', 'Navigation search: ' + req.params.query);
            caseList.search(req.params.query);
            search.onSearch(req.params.query);
            gaTrack('/#!/search/' + req.params.query, 'PerfJS - search: ' + req.params.query);
            ga('send', 'pageview', '/#!/search?q=' + req.params.query);
        });
        router.get('/tag/:tag', function (req, e) {
            ga('send', 'event', 'Navigation', 'by tag', 'Navigation tag: ' + req.params.tag);
            caseList.byTag(req.params.tag);
            search.onTag(req.params.tag);
            gaTrack('/#!/tag/' + req.params.tag, 'PerfJS - tag: ' + req.params.tag);
        });
        router.get('/:id', function (req, e) {
            ga('send', 'event', 'Navigation', 'by id', 'Navigation id: ' + req.params.id);
            caseList.byId(req.params.id);
            var testName = caseDetails.byId(req.params.id);
            gaTrack('/#!/' + req.params.id, 'PerfJS - test: ' + testName);
        });
        router.get('/:id/:action', function (req, e) {
            var id = req.params.id;
            if (id !== 'tag' && id !== 'search') {
                ga('send', 'event', 'Test', req.params.action,
                    'Test: ' + req.params.id + ' - ' + req.params.action);
            }
        });
        router.get('/:id/:action/:caseId', function (req, e) {
            var id = req.params.id;
            if (id !== 'tag' && id !== 'search') {
                ga('send', 'event', 'Test', req.params.action,
                    'Test: ' + req.params.id + ' - ' + req.params.action + ': ' + req.params.caseId);
            }
        });
        router.get('/', function () {
            ga('send', 'event', 'Navigation', 'root', 'Navigation root');
            caseList.onRoot();
            caseDetails.onRoot();
        });
        router.get('', function () {
            router.navigate('/');
        });

        function gaTrack(path, title) {
            ga('set', { page: path, title: title });
            ga('send', 'pageview');
        }
    }
})(window.PerformanceJs);