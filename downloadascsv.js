var csvUtility = angular.module('csvUtility', []);
csvUtility.directive('downloadCsv', function () {
  return {
    restrict: 'AE',
    replace: 'false',
    link: function (scope, elem, attrs) {
      var _debugging, _log, _file, _content, link, download,
          _ngProperty, _ngProperties, _excluded, excluded, _row;


      _debugging = true;
      _log = function (msg) {
        if (_debugging === true) {
          console.log(msg);
        }
      };


      _ngProperties = ['$$hashKey'];
      _ngProperty = function (prop, i) {
        if (_ngProperties.indexOf(prop, i) === -1) {
          return false;
        }
        return true;
      };

      _excluded = function (prop, i) {
        if (excluded.indexOf(prop, i) === -1) {
          return false;
        }
        return true;
      }

      download = function (_file, filename) {
        var blob = new Blob([_file], {
          type: 'text/csv;charset=utf-8;'
        });

        filename = filename || "report.csv";
        if (filename.match(/\.csv$/gi) === null) {
          filename += ".csv";
        }
        _log(navigator);
        if (window.chrome !== void 0) {
          _log("using Chrome ");
          // Method to use for Chrome 35 and above
          blob = URL.createObjectURL(blob);
          link = document.createElement("a");
          link.setAttribute("href", blob);
          link.setAttribute('download', filename);
          link.click();
          return true;
        } else if (  navigator.userAgent.toLowerCase().match(/msie/gi)  || navigator.appName.match(/Internet/gi) || navigator.msMaxTouchPoints !== void 0 ) {
          _log("using IE ");
          // Method for Internet Explorer
          // msMaxTouchPoints is the most best way to check for Internet Explorer 11 
          navigator.msSaveBlob(blob, filename);
          return true;

        } else {
          // Method for every other browser
          _log("using other browser");
          _file = "data:text/csv;charset=utf-8;" + _file;
          _file = encodeURI(_file);
          window.open(_file);
        }
      }

      angular.element(elem).on('click', function () {
        _content = [];
        excluded = [];
        _row = [];
        if (scope[attrs.rows] === "" || scope[attrs.rows] === void 0) {
          _log('No  data source specified ');
          return false;
        }
        if (scope[attrs.rows].length < 1) {
          _log('the data source is empty');
          return false;
        }
        if (attrs.excluded !== void 0 && attrs.excluded !== "") {
          _log('Some properties will be excluded');
          excluded = attrs.excluded.split(",");
        }
        if (attrs.headers === void 0 || attrs.headers !== "none") {
          _log('first row will contain headers for the rows.');
          for (var prop in scope[attrs.rows][0]) {
            // Using the property name to call the columns
            // Angular properties won't be added unless specified
            prop = prop.replace(/,/g, '');
            if ((attrs.ngproperties === void 0 || attrs.ngproperties !== 'include') && (_ngProperty(prop) === false && _excluded(prop) === false)) {
              _row.push(prop);
            }
          }
        }
        _content.push(_row);
        _row = [];
        for (var i in scope[attrs.rows]) {
          // Iterate over all elements of the array
          for (var prop in scope[attrs.rows][i]) {
            // Iterave over every property in each row 
            prop = prop.replace(/,/g, '');
            if ((attrs.ngproperties === void 0 || attrs.ngproperties !== 'include') && (_ngProperty(prop) === false && _excluded(prop) === false)) {
              var val = scope[attrs.rows][i][prop].replace(/,/g, '');
              _row.push(val);
            }
          }
          _content.push(_row);
          _row = [];
        }
        for (var i in _content) {
          _content[i] = _content[i].join(',');
        }
        _content = _content.join("\n");
        // _file += _content;
        // Will move the download function somewhere else, is taking too much space here
        download(_content, attrs.filename);
        return true;
      });
      return true;
    },
  };
})
