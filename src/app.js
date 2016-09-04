/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.app = root.app || {};
    var module = root.app;

    module.run = run;

    function run() {
        var all = root.data;
        var selected = all[0];
        root.caseList.render(all);
        root.caseDetails.render(selected);
    }

})(window.PerformanceJs);