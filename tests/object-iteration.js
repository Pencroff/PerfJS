/**
 * Created by Pencroff on 04-Sep-16.
 */

window.test = {
    id: '384A61CA-DA2E-4FD2-A113-080010D4A42B',
    name: 'object iteration',
    description: 'Performance test for iteration object properties',
    tags: ['object', 'iteration', 'basic'],
    url: 'tests/object-iteration.js',
    fill: function (suite) {
        return new Promise(function (resolve) {
            var result;
            var obj;
            suite.add('by Object.keys', function () {
                result = '';
                var arr = Object.keys(obj);
                var len = arr.length;
                var i;
                for (i = 0; i < len; i += 1) {
                    result += obj[arr[i]];
                }
            });
            suite.add('by for..in', function () {
                result = '';
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        result += obj[prop];
                    }
                }
            });
            suite.on('start cycle', function () {
                var len = 100;
                var i;
                obj = {};
                for (i = 0; i < len; i += 1) {
                    obj['prop'+i] = 'value' + i;
                }
            });
            suite.on('cycle', function () {
                console.log('cycle', result);
            });
            resolve(suite);
        });
    }
};
