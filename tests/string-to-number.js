/**
 * Created by Pencroff on 17-Sep-16.
 */

window.test = {
    id: '2F731CB4-1931-49BA-A60E-5712CAD904F1',
    name: 'converting string to number [Integer]',
    description: 'Performance case for converting string to number',
    tags: ['string', 'number', 'integer', 'converting', 'basic'],
    url: 'tests/string-to-number.js',
    fill: function (suite) {
        var result = 0;
        var arr;
        suite.add('by unary plus', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (+arr[i]);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by minus zero', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (arr[i] - 0);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('multiplied by one', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (arr[i] * 1);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by double bitwise operators', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (~~arr[i]);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by bitwise shift operators', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += (arr[i] >>> 0);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by Number() constructor', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += Number(arr[i]);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by parseInt', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += parseInt(arr[i], 10);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by Math.floor', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += Math.floor(arr[i]);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.add('by Math.round', function () {
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += Math.round(arr[i]);
                i += 1;
            }
            arr.push(arr.shift());
        });
        suite.on('start cycle', function () {
            arr = getArray();
        });
        suite.on('cycle', function () {
            console.log('cycle', result);
            result = 0;
        });

        function getArray() {
            var len = 100;
            var arr = [];
            for (var i = 0; i < len; i += 1) {
                arr[i] = Math.random().toString(10).substr(2, Math.random() * 10 + 1);
            }
            return arr;
        }
    }
};