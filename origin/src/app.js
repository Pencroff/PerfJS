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
            var query = req.params.query;
            ga('send', 'event', 'Navigation', 'search', 'Navigation search: ' + query);
            caseList.search(query);
            search.onSearch(query);
            var title = 'PerfJS - search: ' + query;
            gaTrack('/#!/search/' + query, title);
            document.title = title;
            e.stopPropagation();
        });
        router.get('/tag/:tag', function (req, e) {
            var tag = req.params.tag;
            ga('send', 'event', 'Navigation', 'by tag', 'Navigation tag: ' + tag);
            caseList.byTag(tag);
            search.onTag(tag);
            var title = 'PerfJS - tag: ' + tag;
            gaTrack('/#!/tag/' + tag, title);
            document.title = title;
            e.stopPropagation();
        });
        router.get('/:id', function (req, e) {
            var id = req.params.id;
            ga('send', 'event', 'Navigation', 'by id', 'Navigation id: ' + id);
            caseList.byId(id);
            var testName = caseDetails.byId(id);
            var title = 'PerfJS - test: ' + testName;
            gaTrack('/#!/' + id, title);
            document.title = title;
            e.stopPropagation();
        });
        router.get('/:id/:action', function (req, e) {
            ga('send', 'event', 'Test', req.params.action,
                'Test: ' + req.params.id + ' - ' + req.params.action);
            e.stopPropagation();
        });
        router.get('/:id/:action/:caseId', function (req, e) {
            ga('send', 'event', 'Test', req.params.action,
                'Test: ' + req.params.id + ' - ' + req.params.action + ': ' + req.params.caseId);
            e.stopPropagation();
        });
        router.get('/', function () {
            ga('send', 'event', 'Navigation', 'root', 'Navigation root');
            caseList.onRoot();
            caseDetails.onRoot();
            var title = 'PerfJS';
            gaTrack('/#!/', title);
            document.title = title;
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