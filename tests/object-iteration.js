/**
 * Created by Pencroff on 04-Sep-16.
 */

window.test = {
    id: '384A61CA-DA2E-4FD2-A113-080010D4A42B',
    name: 'object iteration',
    description: 'Performance test for iteration object properties. Comparison for StackOverflow question: How do I loop through or enumerate a JavaScript object? (<a href=\"http://goo.gl/0QEGHB\" target=\"_blank\">link</a>)',
    tags: ['object', 'iteration', 'basic'],
    url: 'tests/object-iteration.js',
    fill: function (suite) {
        return new Promise(function (resolve) {
            var result, a, b, c;
            var obj;
            suite.add('by Object.keys', function () {
                result = '';
                var arr = Object.keys(obj);
                var len = arr.length;
                var i, key;
                for (i = 0; i < len; i += 1) {
                    key = arr[i];
                    result += key + ': ' + obj[key] + ' ';
                }
                a = b;
                b = c;
                c = result;
            });
            suite.add('by Object.keys with native forEach', function () {
                result = '';
                Object.keys(obj).forEach(function(key) {
                    result += key + ': ' + obj[key] + ' ';
                });
                a = b;
                b = c;
                c = result;
            });
            suite.add('by for..in', function () {
                result = '';
                for (var key in obj) {
                    result += key + ': ' + obj[key] + ' ';
                }
                a = b;
                b = c;
                c = result;
            });
            suite.add('by for..in and hasOwnProperty', function () {
                result = '';
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        result += key + ': ' + obj[key] + ' ';
                    }
                }
                a = b;
                b = c;
                c = result;
            });
            suite.add('lodash v4.15.0 - _.forEach', function () {
                result = '';
                _.forEach(obj, function (value, key) {
                    result += key + ': ' + value + ' ';
                });
                a = b;
                b = c;
                c = result;
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
