/**
 * Created by Pencroff on 16-Sep-16.
 */

window.test = {
    id: 'DFD11651-3FB9-40A9-A233-C7BA15D1620F',
    name: 'array cloning',
    description: 'Performance test for copy array elements. Most of the cases is just shallow copy, except JSON manipulation and lodash deep clone. Array contains number literals. Expected similar behavior with string literals. <a href=\"https://goo.gl/J60aIa\" target=\"_blank\">StackOverflow question</a>',
    tags: ['array', 'cloning', 'basic'],
    url: 'tests/array-copy.js',
    fill: function (suite) {
        var result = 0;
        var main, arr;
        suite.add('by spread operator - ES2015', function () {
            arr = [...main];
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by slice', function () {
            arr = main.slice();
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by splice', function () {
            arr = main.splice(0);
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by concat', function () {
            arr = main.concat();
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by Array.from - ES2015', function () {
            arr = Array.from(main);
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by JSON.stringify => JSON.parse', function () {
            arr = JSON.parse(JSON.stringify(main));
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by iteration', function () {
            arr = [];
            var len = main.length;
            var i = 0;
            while (i < len) {
                arr[i] = main[i];
                i += 1;
            }
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('by iteration with push', function () {
            arr = [];
            var len = main.length;
            var i = 0;
            while (i < len) {
                arr.push(main[i]);
                i += 1;
            }
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('lodash v4.15.0 - _.clone', function () {
            arr = _.clone(main);
            result += arr[0];
            main.push(main.shift());
        });
        suite.add('lodash v4.15.0 - _.cloneDeep', function () {
            arr = _.cloneDeep(main);
            result += arr[0];
            main.push(main.shift());
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