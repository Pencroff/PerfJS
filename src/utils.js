/**
 * Created by Pencroff on 04-Sep-16.
 */
(function (root) {
    root.utils = root.utils || {};
    var module = root.utils;
    module.toType = (function(global) {
        return function(obj) {
            if (obj === global) {
                return 'global';
            }
            return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
        };
    })(this);
    module.isPromise = function (v) {
        var result = false;
        var vType = module.toType(v);
        if ((vType === 'object' || vType === 'function')
            && module.toType(v.then) === 'function') {
            result = true;
        }
        return result;
    }
})(window.PerformanceJs);