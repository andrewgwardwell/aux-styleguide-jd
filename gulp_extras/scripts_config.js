var npmFiles = require('gulp-npm-files');
var path_to_app = 'node_modules/app';
console.log(npmFiles(null, path_to_app + '/package.json'));


exports.config = [
        {
          "name": "app",
          "files": [
            "app/src/app/index.module.js",
            "app/src/app/directives/form/formEl.directive.js"
          ],
          template: "app/src/app/directives/form/tpls/formEl.html",
        },
        {
          "name": "app",
          "files": [
            "app/src/app/index.module.js",
            "app/src/app/directives/form/inputComboOne.directive.js"
          ],
          template: "app/src/app/directives/form/tpls/inputComboOne.html",
        },
        {
          "name": "app",
          "files": [
            "app/src/app/index.module.js",
            "app/src/app/directives/form/specCheckBox.directive.js"
          ],
          template: "app/src/app/directives/form/tpls/specCheckBox.html",
        }
];