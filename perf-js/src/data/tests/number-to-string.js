/**
 * Created by Pencroff on 17-Sep-16.
 */

window.test = {
    id: '9D6E020A-D9BF-4E33-B1FC-2B6C79AFFF70',
    name: 'converting number to string',
    description: 'Performance case for converting number to string',
    tags: ['number', 'string', 'converting', 'basic'],
    url: 'tests/number-to-string.js',
    fill: function (suite) {
        var result;
        var arr;
        suite.add('by String() constructor', function () {
            result = '';
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += String(arr[i]);
                i += 1;
            }
        });
        suite.add('by toString method', function () {
            result = '';
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += arr[i].toString();
                i += 1;
            }
        });
        suite.add('by concatenation with empty string - left', function () {
            result = '';
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += ('' + arr[i]);
                i += 1;
            }
        });
        suite.add('by concatenation with empty string - right', function () {
            result = '';
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (arr[i] + '');
                i += 1;
            }
        });
        suite.add('by template strings - ES2015', function () {
            result = '';
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += `${arr[i]}`;
                i += 1;
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
                arr[i] = parseInt(Math.random().toString(10).substr(2, Math.random() * 10 + 1), 10);
            }
            return arr;
        }
    }
};
