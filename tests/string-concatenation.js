/**
 * Created by Pencroff on 02-Sep-16.
 */

window.test = {
    id: 'F33A9807-6D63-4773-AF70-7DA57E79A90C',
    name: 'string concatenation',
    description: 'Performance case for string concatenation',
    tags: ['string', 'concatenation', 'basic'],
    url: 'tests/string-concatenation.js',
    fill: function (suite) {
        var result;
        var arr;
        suite.add('by array join', function () {
            result = '';
            result += arr.join('');
        });
        suite.add('by manual concatenation', function () {
            result = '';
            var len = arr.length;
            var i;
            for (i = 0; i < len; i += 1) {
                result += arr[i];
            }
        });
        suite.add('by String.prototype.concat', function () {
            result = '';
            var len = arr.length;
            var i;
            for (i = 0; i < len; i += 1) {
                result = result.concat(arr[i]);
            }
        });
        suite.on('start cycle', function () {
            arr = getArray();
        });
        suite.on('cycle', function () {
            console.log('cycle', result);
        });

        function getArray() {
            var len = 100;
            var arr = [];
            for (var i = 0; i < len; i += 1) {
                arr[i] = Math.random().toString(36).substr(2, Math.random() * 10 + 1);
            }
            return arr;
        }
    }
};
