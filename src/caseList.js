/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseList = root.caseList || {};
    var module = root.caseList;
    var templateFn = root.JST['caseList'];
    module.render = renderCaseList;
    function renderCaseList(list) {
        var caseListContainer = $('.c-test-list')[0];
        caseListContainer.innerHTML = list.map(function (item) {
            return templateFn(item);
        }).join('');
    }
})(window.PerformanceJs);