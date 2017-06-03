# Angular 2 Investigation

## Required functionality:

* Build process
    * Type script
    * Styles (SASS + PostCSS for autoprefixing, linting and etc.)
    * SVG (reusing current bundling process)
    * Tempplate bundling
    * Live / Hot (angular2-hmr) reloading
    * Processing root `*.html` files (reusing current bundling process)
    * Es-docs (reusing current bundling process)
* Components
    * Feature flags (could be builded from the scratch base on existing example for permissions)
    * Tree ([angular2-tree](https://angular2-tree.readme.io/) - as an example)
    * Video player (internal wrapper around video-js)
    * UI Select 
        * [ng2-select](https://github.com/valor-software/ng2-select)
        * [more...](http://stackoverflow.com/questions/37921979/ui-select-replacement-in-angular2)
    * Toast
        * [Angular2-Toaster](https://github.com/stabzs/Angular2-Toaster)
    * Validation - using native angular 2 validation
    * Ui grid
        * [kendo-grid](http://www.telerik.com/kendo-angular-ui/components/grid/configuration/)
        * [DataTable](http://www.primefaces.org/primeng/#/datatable)
        * [ag-Grid](https://www.ag-grid.com/best-angular-2-data-grid/#gsc.tab=0) - £495
        * [ui-grid-angular2](https://github.com/vladotesanovic/ui-grid-angular2)
    * angularjs-slider
        * [ng2-slider-component](https://github.com/Bogdan1975/ng2-slider-component)
    * Set UI components (no one support BEM, could be issue on CSS level)
        * [ng-bootstrap](https://ng-bootstrap.github.io/#/home)
        * [material2](https://github.com/angular/material2)
        * [PrimeNG](http://www.primefaces.org/primeng/#/) - they has very clear component structure on github and could be integrated to product just when required
        * [Kendo UI](http://www.telerik.com/kendo-angular-ui/) (Price: $999)
        * [more...](http://stackoverflow.com/questions/39395359/angular-2-ui-components-which-library)
* Features
    * i18n (internationalization) - `ng2-translate` looks good
    * Routing - internal ([link](http://stackoverflow.com/questions/38356158/angular2-router-vs-ui-router-ng2-vs-ngrx-router)) or ui-router-ng2
    * Review transcluding ([Link](https://toddmotto.com/transclusion-in-angular-2-with-ng-content))
    * Review linting options for TypeScript and CSS (SCSS) 

## Why use Angular 2 (for new app)

* Good performance and fix architectural issues of Angular 1
* Clear and declarative code structure
* Using TypeScript as default transpiller, could be supported and maintained by back-end developers
* Internal router, form validation and Ahead Of Time compilation should decrease app size and page loading time
* Hot reloading, will increase development speed (now each change takes 4-7 seconds for browser update)
* Front end team already understand component approach
* Mature enough for production projects ((Example)[https://m-beta.betsson.com/en/])

## Migration to Angular 2 for existing app

* Upgrade existing app to Anular 1.5 / 1.6 (if possible, it deppends from 3rd party libraries in origin part of app)
* Apply `ng-metadata` for keeping two version of app at the same time
* Step by step migrate to angulat 2 syntax (origin or ES6 app)
* Pros and cons
    * + soft and long term migration with maintaining new functionality
    * - app size (it should contain angular 1 and 2 in vendor.js file)
    * - complex app structure and relation between different app parts

## Angular 2 migration

* Build process
* Create campaign could be reused as a separate app based on angular 1
* Continue maintaining Angular 1 has pros and cons:
    * + mature framework, but not all required solutions available from comunity (like `bion-list`)
    * + developers familiar with it
    * + developed logic could be reused
    * - we should always track performance
    * - we should always use 50 - 60% of framework functionality in case of performance issue
    * - future migration will be harder and harder
    * - when maintaining and support from Google will finish?
    * how hard to find developer for first and second version?
* Efforts required for migration
    * build process
    * create campaign as a separate page and Angular1 app
    * base on [wireframes](http://dth6ag.axshare.com/#g=1&c=1&p=home) it looks like functionality for creatives and targeting should be re-done
        * we have 145 components (25 for create campaign)
        * factories require just copy and apply decorator (60 factories)
        * controllers and tempates require rethinking logic a bit, in case of small difference in component communication (120 components)
    * UI library
        * Use PrimeNG components in app with BEM and SVG icons

## JHipster

#### Proc

* It has a lot of options for different DB
* Proper structured tiers from DTO to API handler

#### Cons

* Additional dependency like `font awesome` and `bootstrap`. We are working with SVG and BEM
* Jasmine for testing, we already have bunch of tests based on Mocha + Chai (They provide advanced API)
* Tests location should be changed. We are keeping tests with components.
* Translations location should be changed. We are keeping languages files with components.

* Documentation for fron-end build process don't have deep details and require source code investigation
    > Used Angular CLI with manual changes in `webpack.config` for Angular 2 project, require investigation for changing if required

* Existing build process and live reloading not condigured for `https`

 #### Questions

* What role of `swagger-ui` folder in client root folder?
* Could we move location of angular app from `/src/main/webapp/` to something like `/web-app`
    > In this folder will be all dependencies for front-end, no mixing with back-end, like in default folder structure

