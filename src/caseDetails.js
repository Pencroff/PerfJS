/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.caseDetails = root.caseDetails || {};
    var module = root.caseDetails;
    var templateFn = root.JST['caseDetails'];
    module.render = renderCaseDetails;

    function renderCaseDetails(item) {
        var container = $('.c-test-detail')[0];
        var domEl = $('.c-tab-heading');
        domEl.off('click');
        container.innerHTML = templateFn(item);
        domEl.on('click', function (e) {
            var targetEl = e.target;
            var nextIndex = targetEl.nextSibling ? 0 : 1;
            var contentPanels = $('.c-tabs__tab').removeClass('c-tabs__tab--active');
            $('.c-tab-heading')
                .removeClass('c-tab-heading--active')
                .forEach(function (el, index) {
                    if(index === nextIndex) {
                        $(el).addClass('c-tab-heading--active');
                        $(contentPanels[index]).addClass('c-tabs__tab--active');
                    }
                });
        });
    }
})(window.PerformanceJs);