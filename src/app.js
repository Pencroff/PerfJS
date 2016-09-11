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
        var routes = {
            '!': [caseList.onRoot, caseDetails.onRoot],
            '!:id': [caseList.byId, caseDetails.byId],
            '!search/:query': [caseList.search, search.onSearch],
            '!tag/:tag': [caseList.byTag, search.onTag],
        };
        router.get('/', function (req, e) {
            console.log('root');
            console.log(req, e);
            caseList.onRoot();
            caseDetails.onRoot();
        });
        router.get('/search/:query', function (req, e) {
            console.log('by query');
            console.log(req, e);
            caseList.search(req.params.query);
            search.onSearch(req.params.query);
        });
        router.get('/tag/:tag', function (req, e) {
            console.log('by id');
            console.log(req, e);
            caseList.byTag(req.params.tag);
            caseDetails.onTag(req.params.tag);
        });
        router.get('/:id', function (req, e) {
            console.log('by id');
            console.log(req, e);
            caseList.byId(req.params.id);
            caseDetails.byId(req.params.id);
        });

        // Grapnel.listen({
        //     '/:id' : function(req){
        //         console.log('by id');
        //         console.log(req, e);
        //     }
        // });

        // router.get('/*', function (req, e) {
        //     console.log('404');
        //     console.log(req, e);
        //     //router.navigate('/');
        // });

        router.navigate('/');
    }
})(window.PerformanceJs);