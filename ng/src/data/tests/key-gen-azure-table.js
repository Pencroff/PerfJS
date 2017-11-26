/**
 * Created by Sergey Daniloff on 26.11.2017.
 */
window.test = {
  id: 'C3441282-DA60-4E49-BD5D-76ACA43F92C3',
  name: 'key gen azure table',
  description: 'Key gen function for azure table (<a href=\"https://www.npmjs.com/package/winston-azure-sw\" target=\"_blank\">link</a>)',
  tags: ['string', 'id gen'],
  url: 'tests/key-gen-azure-table.js',
  fill: function (suite) {
    var res = '';
    function originFn() {
      var dt = new Date();
      var rtext = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (var i = 0; i < 5; i++)
        rtext += possible.charAt(Math.floor(Math.random() * possible.length));
      return dt.getTime() + '_' + dt.getMilliseconds() + '_' + rtext;
    }

    function newFn() {
      var dt = new Date();
      return dt.getTime() + '_' + dt.getMilliseconds() + '_' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    suite.add('origin', function () {
      res += originFn();
    });
    suite.add('new', function () {
      res += newFn();
    });
    suite.on('start cycle', function () {
      res = '';
    });
    suite.on('cycle', function () {
      console.log('cycle', res);
      res = '';
    });

  }
};
