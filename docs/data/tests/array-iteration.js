/**
 * Created by Pencroff on 15-Sep-16.
 */

window.test = {
    id: '2DDD96CD-1F90-4792-9CE8-D6CA07CFC248',
    name: 'array iteration',
    description: 'Performance case for iteration array elements.Comparison for StackOverflow question: What is the fastest way to loop through an array in JavaScript? (<a href=\"https://goo.gl/VxozLR\" target=\"_blank\">link</a>)',
    tags: ['array', 'iteration', 'basic'],
    url: 'tests/array-iteration.js',
    fill: function (suite) {
        var result = 0;
        var main, arr;
        suite.add('by for loop', function () {
            arr = main.slice();
            for (var i = 0, len = arr.length; i < len; i++) {
                result += arr[i];
            }
        });
        suite.add('by for loop with memorization', function () {
            arr = main.slice();
            var len = arr.length;
            var i;
            for (i = 0; i < len; i += 1) {
                result += arr[i];
            }
        });
        suite.add('by while loop', function () {
            arr = main.slice();
            var len = arr.length;
            var i = 0;
            while (i < len) {
                result += arr[i];
                i += 1;
            }
        });
        suite.add('by while loop reverse', function () {
            arr = main.slice();
            var len = arr.length;
            while (len--) {
                result += arr[len];
            }
        });
        suite.add('by array shift', function () {
            arr = main.slice();
            var el;
            while (el = arr.shift()) {
                result += el;
            }
        });
        suite.add('by array forEach', function () {
            arr = main.slice();
            arr.forEach(function(el) {
                result += el;
            });
        });
        suite.add('by array map', function () {
            arr = main.slice();
            arr.map(function(el) {
                result += el;
            });
        });
        suite.add('lodash v4.15.0 - _.forEach', function () {
            arr = main.slice();
            _.forEach(arr, function (el) {
                result += el;
            })
        });
        suite.on('start cycle', function () {
            main = getArray();
        });
        suite.on('cycle', function () {
            console.log('cycle', result);
            result = 0;
        });

        function getArray() {
            var len = 100;
            var arr = [];
            for (var i = 0; i < len; i += 1) {
                arr[i] = Math.ceil(Math.random() * 100 + 1);
            }
            return arr;
        }
    }
};