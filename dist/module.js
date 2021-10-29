define(["@grafana/data","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./css/esmap.css":
/*!*************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./css/esmap.css ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".leaflet-pane > svg path {\n  pointer-events: all;\n}\n\nsvg circle.node {\n  /* fill: #999; */\n  stroke: #777;\n  stroke-width: 1;\n  pointer-events: all;\n}\n\nsvg path.edge {\n  stroke-linecap: butt;\n  fill: none;\n  pointer-events: visiblePainted !important;\n}\n\nsvg path.animated-edge {\n  stroke-linecap: butt;\n  stroke-width: 5;\n  /* stroke: #aaa; */\n  fill: none;\n  cursor: crosshair;\n  stroke-dasharray: 90 10;\n  stroke-dashoffset: 100;\n  -webkit-animation-name: dash;\n          animation-name: dash;\n  -webkit-animation-duration: 5s;\n          animation-duration: 5s;\n  -webkit-animation-timing-function: steps(25, start);\n          animation-timing-function: steps(25, start);\n  -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n  -webkit-animation-direction: forwards;\n          animation-direction: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n\n@-webkit-keyframes dash {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\n\n@keyframes dash {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\nsvg path.control {\n  stroke-dasharray: 8 1;\n  stroke-width: 6;\n  stroke: rgba(255,136,0,0.53333);\n  fill: none;\n  cursor: crosshair;\n}\n\nsvg circle.controlPoint {\n  stroke: black;\n  stroke-width: 1;\n  fill: #f80;\n  cursor: move;\n}\n\ndiv.tooltip {\n  position: absolute;\n  text-align: left;\n  color: #f4f5f5;\n  width: auto;\n  height: auto;\n  padding: 8px 8px 0px 8px;\n  font: sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  background: #24292e;\n  border: none;\n  border-radius: 2px;\n  pointer-events: none;\n  line-height: 0.9;\n}", "",{"version":3,"sources":["esmap.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;EACpB,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,oBAAoB;EACpB,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,iBAAiB;EACjB,uBAAuB;EACvB,sBAAsB;EACtB,4BAAoB;UAApB,oBAAoB;EACpB,8BAAsB;UAAtB,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;EAC3C,2BAAmB;UAAnB,mBAAmB;EACnB,qCAA6B;UAA7B,6BAA6B;EAC7B,2CAAmC;UAAnC,mCAAmC;EACnC,qCAA6B;UAA7B,6BAA6B;AAC/B;;AAEA;EACE;IACE,oBAAoB;EACtB;AACF;;AAJA;EACE;IACE,oBAAoB;EACtB;AACF;AACA;EACE,qBAAqB;EACrB,eAAe;EACf,+BAAa;EACb,UAAU;EACV,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,UAAU;EACV,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,WAAW;EACX,YAAY;EACZ,wBAAwB;EACxB,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;EACpB,gBAAgB;AAClB","file":"esmap.css","sourcesContent":[".leaflet-pane > svg path {\n  pointer-events: all;\n}\n\nsvg circle.node {\n  /* fill: #999; */\n  stroke: #777;\n  stroke-width: 1;\n  pointer-events: all;\n}\n\nsvg path.edge {\n  stroke-linecap: butt;\n  fill: none;\n  pointer-events: visiblePainted !important;\n}\n\nsvg path.animated-edge {\n  stroke-linecap: butt;\n  stroke-width: 5;\n  /* stroke: #aaa; */\n  fill: none;\n  cursor: crosshair;\n  stroke-dasharray: 90 10;\n  stroke-dashoffset: 100;\n  animation-name: dash;\n  animation-duration: 5s;\n  animation-timing-function: steps(25, start);\n  animation-delay: 0s;\n  animation-direction: forwards;\n  animation-iteration-count: infinite;\n  animation-play-state: running;\n}\n\n@keyframes dash {\n  to {\n    stroke-dashoffset: 0;\n  }\n}\nsvg path.control {\n  stroke-dasharray: 8 1;\n  stroke-width: 6;\n  stroke: #f808;\n  fill: none;\n  cursor: crosshair;\n}\n\nsvg circle.controlPoint {\n  stroke: black;\n  stroke-width: 1;\n  fill: #f80;\n  cursor: move;\n}\n\ndiv.tooltip {\n  position: absolute;\n  text-align: left;\n  color: #f4f5f5;\n  width: auto;\n  height: auto;\n  padding: 8px 8px 0px 8px;\n  font: sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  background: #24292e;\n  border: none;\n  border-radius: 2px;\n  pointer-events: none;\n  line-height: 0.9;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./css/leaflet.css":
/*!***************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./css/leaflet.css ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* required styles */\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.leaflet-container {\n  overflow: hidden;\n}\n\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n  -webkit-user-drag: none;\n}\n\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::-moz-selection {\n  background: transparent;\n}\n.leaflet-tile::selection {\n  background: transparent;\n}\n\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n  image-rendering: -webkit-optimize-contrast;\n}\n\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n  width: 1600px;\n  height: 1600px;\n  -webkit-transform-origin: 0 0;\n}\n\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n  display: block;\n}\n\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg,\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n  max-width: none !important;\n  max-height: none !important;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n  touch-action: pan-x pan-y;\n}\n\n.leaflet-container.leaflet-touch-drag {\n  /* Fallback for FF which doesn't support pinch-zoom */\n  touch-action: none;\n  touch-action: pinch-zoom;\n}\n\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n  touch-action: none;\n}\n\n.leaflet-container {\n  -webkit-tap-highlight-color: transparent;\n}\n\n.leaflet-container a {\n  -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n\n.leaflet-tile {\n  filter: inherit;\n  visibility: hidden;\n}\n\n.leaflet-tile-loaded {\n  visibility: inherit;\n}\n\n.leaflet-zoom-box {\n  width: 0;\n  height: 0;\n  box-sizing: border-box;\n  z-index: 800;\n}\n\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n  -moz-user-select: none;\n}\n\n.leaflet-pane {\n  z-index: 400;\n}\n\n.leaflet-tile-pane {\n  z-index: 200;\n}\n\n.leaflet-overlay-pane {\n  z-index: 400;\n}\n\n.leaflet-shadow-pane {\n  z-index: 500;\n}\n\n.leaflet-marker-pane {\n  z-index: 600;\n}\n\n.leaflet-tooltip-pane {\n  z-index: 650;\n}\n\n.leaflet-popup-pane {\n  z-index: 700;\n}\n\n.leaflet-map-pane canvas {\n  z-index: 100;\n}\n\n.leaflet-map-pane svg {\n  z-index: 200;\n}\n\n.leaflet-vml-shape {\n  width: 1px;\n  height: 1px;\n}\n\n.lvml {\n  behavior: url(#default#VML);\n  display: inline-block;\n  position: absolute;\n}\n\n/* control positioning */\n.leaflet-control {\n  position: relative;\n  z-index: 800;\n  pointer-events: visiblePainted;\n  /* IE 9-10 doesn't have auto */\n  pointer-events: auto;\n}\n\n.leaflet-top,\n.leaflet-bottom {\n  position: absolute;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.leaflet-top {\n  top: 0;\n}\n\n.leaflet-right {\n  right: 0;\n}\n\n.leaflet-bottom {\n  bottom: 0;\n}\n\n.leaflet-left {\n  left: 0;\n}\n\n.leaflet-control {\n  float: left;\n  clear: both;\n}\n\n.leaflet-right .leaflet-control {\n  float: right;\n}\n\n.leaflet-top .leaflet-control {\n  margin-top: 10px;\n}\n\n.leaflet-bottom .leaflet-control {\n  margin-bottom: 10px;\n}\n\n.leaflet-left .leaflet-control {\n  margin-left: 10px;\n}\n\n.leaflet-right .leaflet-control {\n  margin-right: 10px;\n}\n\n/* zoom and fade animations */\n.leaflet-fade-anim .leaflet-tile {\n  will-change: opacity;\n}\n\n.leaflet-fade-anim .leaflet-popup {\n  opacity: 0;\n  transition: opacity 0.2s linear;\n}\n\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n  opacity: 1;\n}\n\n.leaflet-zoom-animated {\n  transform-origin: 0 0;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n  will-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n  transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n}\n\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n  transition: none;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n  visibility: hidden;\n}\n\n/* cursors */\n.leaflet-interactive {\n  cursor: pointer;\n}\n\n.leaflet-grab {\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n  cursor: crosshair;\n}\n\n.leaflet-popup-pane,\n.leaflet-control {\n  cursor: auto;\n}\n\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n  pointer-events: all;\n}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n  pointer-events: visiblePainted;\n  /* IE 9-10 doesn't have auto */\n  pointer-events: auto;\n}\n\n/* visual tweaks */\n.leaflet-container {\n  background: #ddd;\n  outline: 0;\n}\n\n.leaflet-container a {\n  color: #0078A8;\n}\n\n.leaflet-container a.leaflet-active {\n  outline: 2px solid orange;\n}\n\n.leaflet-zoom-box {\n  border: 2px dotted #38f;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* general typography */\n.leaflet-container {\n  font: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n}\n\n/* general toolbar styles */\n.leaflet-bar {\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);\n  border-radius: 4px;\n}\n\n.leaflet-bar a,\n.leaflet-bar a:hover {\n  background-color: #fff;\n  border-bottom: 1px solid #ccc;\n  width: 26px;\n  height: 26px;\n  line-height: 26px;\n  display: block;\n  text-align: center;\n  text-decoration: none;\n  color: black;\n}\n\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  display: block;\n}\n\n.leaflet-bar a:hover {\n  background-color: #f4f4f4;\n}\n\n.leaflet-bar a:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n\n.leaflet-bar a:last-child {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-bottom: none;\n}\n\n.leaflet-bar a.leaflet-disabled {\n  cursor: default;\n  background-color: #f4f4f4;\n  color: #bbb;\n}\n\n.leaflet-touch .leaflet-bar a {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n\n.leaflet-touch .leaflet-bar a:first-child {\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n}\n\n.leaflet-touch .leaflet-bar a:last-child {\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n/* zoom control */\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n  font: bold 18px \"Lucida Console\", Monaco, monospace;\n  text-indent: 1px;\n}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out {\n  font-size: 22px;\n}\n\n/* layers control */\n.leaflet-control-layers {\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);\n  background: #fff;\n  border-radius: 5px;\n}\n\n.leaflet-control-layers-toggle {\n  /* background-image: url(../images/layers.png); */\n  width: 36px;\n  height: 36px;\n}\n\n.leaflet-retina .leaflet-control-layers-toggle {\n  /* background-image: url(../images/layers-2x.png); */\n  background-size: 26px 26px;\n}\n\n.leaflet-touch .leaflet-control-layers-toggle {\n  width: 44px;\n  height: 44px;\n}\n\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n  display: none;\n}\n\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n  display: block;\n  position: relative;\n}\n\n.leaflet-control-layers-expanded {\n  padding: 6px 10px 6px 6px;\n  color: #333;\n  background: #fff;\n}\n\n.leaflet-control-layers-scrollbar {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  padding-right: 5px;\n}\n\n.leaflet-control-layers-selector {\n  margin-top: 2px;\n  position: relative;\n  top: 1px;\n}\n\n.leaflet-control-layers label {\n  display: block;\n}\n\n.leaflet-control-layers-separator {\n  height: 0;\n  border-top: 1px solid #ddd;\n  margin: 5px -10px 5px -6px;\n}\n\n/* Default icon URLs */\n/* .leaflet-default-icon-path {\n\tbackground-image: url(images/marker-icon.png); \n\t} */\n/* attribution and scale controls */\n.leaflet-container .leaflet-control-attribution {\n  background: #fff;\n  background: rgba(255, 255, 255, 0.7);\n  margin: 0;\n}\n\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n  padding: 0 5px;\n  color: #333;\n}\n\n.leaflet-control-attribution a {\n  text-decoration: none;\n}\n\n.leaflet-control-attribution a:hover {\n  text-decoration: underline;\n}\n\n.leaflet-container .leaflet-control-attribution,\n.leaflet-container .leaflet-control-scale {\n  font-size: 11px;\n}\n\n.leaflet-left .leaflet-control-scale {\n  margin-left: 5px;\n}\n\n.leaflet-bottom .leaflet-control-scale {\n  margin-bottom: 5px;\n}\n\n.leaflet-control-scale-line {\n  border: 2px solid #777;\n  border-top: none;\n  line-height: 1.1;\n  padding: 2px 5px 1px;\n  font-size: 11px;\n  white-space: nowrap;\n  overflow: hidden;\n  box-sizing: border-box;\n  background: #fff;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.leaflet-control-scale-line:not(:first-child) {\n  border-top: 2px solid #777;\n  border-bottom: none;\n  margin-top: -2px;\n}\n\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n  border-bottom: 2px solid #777;\n}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n  box-shadow: none;\n}\n\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n  border: 2px solid rgba(0, 0, 0, 0.2);\n  background-clip: padding-box;\n}\n\n/* popup */\n.leaflet-popup {\n  position: absolute;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.leaflet-popup-content-wrapper {\n  padding: 1px;\n  text-align: left;\n  border-radius: 12px;\n}\n\n.leaflet-popup-content {\n  margin: 13px 19px;\n  line-height: 1.4;\n}\n\n.leaflet-popup-content p {\n  margin: 18px 0;\n}\n\n.leaflet-popup-tip-container {\n  width: 40px;\n  height: 20px;\n  position: absolute;\n  left: 50%;\n  margin-left: -20px;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.leaflet-popup-tip {\n  width: 17px;\n  height: 17px;\n  padding: 1px;\n  margin: -10px auto 0;\n  transform: rotate(45deg);\n}\n\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n  background: white;\n  color: #333;\n  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);\n}\n\n.leaflet-container a.leaflet-popup-close-button {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 4px 4px 0 0;\n  border: none;\n  text-align: center;\n  width: 18px;\n  height: 14px;\n  font: 16px/14px Tahoma, Verdana, sans-serif;\n  color: #c3c3c3;\n  text-decoration: none;\n  font-weight: bold;\n  background: transparent;\n}\n\n.leaflet-container a.leaflet-popup-close-button:hover {\n  color: #999;\n}\n\n.leaflet-popup-scrolled {\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  border-top: 1px solid #ddd;\n}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n  -ms-zoom: 1;\n}\n\n.leaflet-oldie .leaflet-popup-tip {\n  width: 24px;\n  margin: 0 auto;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n  filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n}\n\n.leaflet-oldie .leaflet-popup-tip-container {\n  margin-top: -1px;\n}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n  border: 1px solid #999;\n}\n\n/* div icon */\n.leaflet-div-icon {\n  background: #fff;\n  border: 1px solid #666;\n}\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n  position: absolute;\n  padding: 6px;\n  background-color: #fff;\n  border: 1px solid #fff;\n  border-radius: 3px;\n  color: #222;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  pointer-events: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n}\n\n.leaflet-tooltip.leaflet-clickable {\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n  position: absolute;\n  pointer-events: none;\n  border: 6px solid transparent;\n  background: transparent;\n  content: \"\";\n}\n\n/* Directions */\n.leaflet-tooltip-bottom {\n  margin-top: 6px;\n}\n\n.leaflet-tooltip-top {\n  margin-top: -6px;\n}\n\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n  left: 50%;\n  margin-left: -6px;\n}\n\n.leaflet-tooltip-top:before {\n  bottom: 0;\n  margin-bottom: -12px;\n  border-top-color: #fff;\n}\n\n.leaflet-tooltip-bottom:before {\n  top: 0;\n  margin-top: -12px;\n  margin-left: -6px;\n  border-bottom-color: #fff;\n}\n\n.leaflet-tooltip-left {\n  margin-left: -6px;\n}\n\n.leaflet-tooltip-right {\n  margin-left: 6px;\n}\n\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n  top: 50%;\n  margin-top: -6px;\n}\n\n.leaflet-tooltip-left:before {\n  right: 0;\n  margin-right: -12px;\n  border-left-color: #fff;\n}\n\n.leaflet-tooltip-right:before {\n  left: 0;\n  margin-left: -12px;\n  border-right-color: #fff;\n}", "",{"version":3,"sources":["leaflet.css"],"names":[],"mappings":"AAAA,oBAAoB;AACpB;;;;;;;;;;EAUE,kBAAkB;EAClB,OAAO;EACP,MAAM;AACR;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,yBAAyB;EACzB,sBAAsB;EACtB,qBAAiB;MAAjB,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA,kDAAkD;AAClD;EACE,uBAAuB;AACzB;AAFA;EACE,uBAAuB;AACzB;;AAEA,mFAAmF;AACnF;EACE,0CAA0C;AAC5C;;AAEA,qEAAqE;AACrE;EACE,aAAa;EACb,cAAc;EACd,6BAA6B;AAC/B;;AAEA;;EAEE,cAAc;AAChB;;AAEA,gGAAgG;AAChG,qFAAqF;AACrF;;;;;;EAME,0BAA0B;EAC1B,2BAA2B;AAC7B;;AAEA;EAEE,yBAAyB;AAC3B;;AAEA;EAEE,qDAAqD;EACrD,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EAEE,kBAAkB;AACpB;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,oDAAoD;AACtD;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,QAAQ;EACR,SAAS;EAET,sBAAsB;EACtB,YAAY;AACd;;AAEA,uEAAuE;AACvE;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,WAAW;AACb;;AAEA;EACE,2BAA2B;EAC3B,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA,wBAAwB;AACxB;EACE,kBAAkB;EAClB,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,oBAAoB;AACtB;;AAEA;;EAEE,kBAAkB;EAClB,aAAa;EACb,oBAAoB;AACtB;;AAEA;EACE,MAAM;AACR;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,WAAW;EACX,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA,6BAA6B;AAC7B;EACE,oBAAoB;AACtB;;AAEA;EACE,UAAU;EAGV,+BAA+B;AACjC;;AAEA;EACE,UAAU;AACZ;;AAEA;EAGE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EAGE,uDAAuD;AACzD;;AAEA;;EAIE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA,YAAY;AACZ;EACE,eAAe;AACjB;;AAEA;EACE,oBAAoB;EAEpB,YAAY;AACd;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;;EAEE,YAAY;AACd;;AAEA;;;EAGE,YAAY;EACZ,wBAAwB;EAExB,gBAAgB;AAClB;;AAEA,oCAAoC;AACpC;;;;;EAKE,mBAAmB;AACrB;;AAEA;;;;EAIE,8BAA8B;EAC9B,8BAA8B;EAC9B,oBAAoB;AACtB;;AAEA,kBAAkB;AAClB;EACE,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,oCAAoC;AACtC;;AAEA,uBAAuB;AACvB;EACE,6DAA6D;AAC/D;;AAEA,2BAA2B;AAC3B;EACE,yCAAyC;EACzC,kBAAkB;AACpB;;AAEA;;EAEE,sBAAsB;EACtB,6BAA6B;EAC7B,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,cAAc;EACd,kBAAkB;EAClB,qBAAqB;EACrB,YAAY;AACd;;AAEA;;EAEE,4BAA4B;EAC5B,4BAA4B;EAC5B,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,2BAA2B;EAC3B,4BAA4B;AAC9B;;AAEA;EACE,8BAA8B;EAC9B,+BAA+B;EAC/B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;EAC3B,4BAA4B;AAC9B;;AAEA;EACE,8BAA8B;EAC9B,+BAA+B;AACjC;;AAEA,iBAAiB;AACjB;;EAEE,mDAAmD;EACnD,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA,mBAAmB;AACnB;EACE,wCAAwC;EACxC,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,iDAAiD;EACjD,WAAW;EACX,YAAY;AACd;;AAEA;EACE,oDAAoD;EACpD,0BAA0B;AAC5B;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,SAAS;EACT,0BAA0B;EAC1B,0BAA0B;AAC5B;;AAEA,sBAAsB;AACtB;;IAEI;AACJ,mCAAmC;AACnC;EACE,gBAAgB;EAChB,oCAAoC;EACpC,SAAS;AACX;;AAEA;;EAEE,cAAc;EACd,WAAW;AACb;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAEhB,sBAAsB;EACtB,gBAAgB;EAChB,oCAAoC;AACtC;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE,gBAAgB;AAClB;;AAEA;;EAEE,oCAAoC;EACpC,4BAA4B;AAC9B;;AAEA,UAAU;AACV;EACE,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,SAAS;EACT,kBAAkB;EAClB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,oBAAoB;EAIpB,wBAAwB;AAC1B;;AAEA;;EAEE,iBAAiB;EACjB,WAAW;EACX,yCAAyC;AAC3C;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,oBAAoB;EACpB,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,2CAA2C;EAC3C,cAAc;EACd,qBAAqB;EACrB,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;EACd,6BAA6B;EAC7B,0BAA0B;AAC5B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,cAAc;EACd,uHAAuH;EACvH,iHAAiH;AACnH;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;EAIE,sBAAsB;AACxB;;AAEA,aAAa;AACb;EACE,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA,YAAY;AACZ,mDAAmD;AACnD;EACE,kBAAkB;EAClB,YAAY;EACZ,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,WAAW;EACX,mBAAmB;EACnB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;EACjB,oBAAoB;EACpB,wCAAwC;AAC1C;;AAEA;EACE,eAAe;EACf,oBAAoB;AACtB;;AAEA;;;;EAIE,kBAAkB;EAClB,oBAAoB;EACpB,6BAA6B;EAC7B,uBAAuB;EACvB,WAAW;AACb;;AAEA,eAAe;AACf;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,SAAS;EACT,iBAAiB;AACnB;;AAEA;EACE,SAAS;EACT,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,MAAM;EACN,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,QAAQ;EACR,gBAAgB;AAClB;;AAEA;EACE,QAAQ;EACR,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,OAAO;EACP,kBAAkB;EAClB,wBAAwB;AAC1B","file":"leaflet.css","sourcesContent":["/* required styles */\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.leaflet-container {\n  overflow: hidden;\n}\n\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-user-drag: none;\n}\n\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::selection {\n  background: transparent;\n}\n\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n  image-rendering: -webkit-optimize-contrast;\n}\n\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n  width: 1600px;\n  height: 1600px;\n  -webkit-transform-origin: 0 0;\n}\n\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n  display: block;\n}\n\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg,\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n  max-width: none !important;\n  max-height: none !important;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n  -ms-touch-action: pan-x pan-y;\n  touch-action: pan-x pan-y;\n}\n\n.leaflet-container.leaflet-touch-drag {\n  -ms-touch-action: pinch-zoom;\n  /* Fallback for FF which doesn't support pinch-zoom */\n  touch-action: none;\n  touch-action: pinch-zoom;\n}\n\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n  -ms-touch-action: none;\n  touch-action: none;\n}\n\n.leaflet-container {\n  -webkit-tap-highlight-color: transparent;\n}\n\n.leaflet-container a {\n  -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n\n.leaflet-tile {\n  filter: inherit;\n  visibility: hidden;\n}\n\n.leaflet-tile-loaded {\n  visibility: inherit;\n}\n\n.leaflet-zoom-box {\n  width: 0;\n  height: 0;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  z-index: 800;\n}\n\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n  -moz-user-select: none;\n}\n\n.leaflet-pane {\n  z-index: 400;\n}\n\n.leaflet-tile-pane {\n  z-index: 200;\n}\n\n.leaflet-overlay-pane {\n  z-index: 400;\n}\n\n.leaflet-shadow-pane {\n  z-index: 500;\n}\n\n.leaflet-marker-pane {\n  z-index: 600;\n}\n\n.leaflet-tooltip-pane {\n  z-index: 650;\n}\n\n.leaflet-popup-pane {\n  z-index: 700;\n}\n\n.leaflet-map-pane canvas {\n  z-index: 100;\n}\n\n.leaflet-map-pane svg {\n  z-index: 200;\n}\n\n.leaflet-vml-shape {\n  width: 1px;\n  height: 1px;\n}\n\n.lvml {\n  behavior: url(#default#VML);\n  display: inline-block;\n  position: absolute;\n}\n\n/* control positioning */\n.leaflet-control {\n  position: relative;\n  z-index: 800;\n  pointer-events: visiblePainted;\n  /* IE 9-10 doesn't have auto */\n  pointer-events: auto;\n}\n\n.leaflet-top,\n.leaflet-bottom {\n  position: absolute;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.leaflet-top {\n  top: 0;\n}\n\n.leaflet-right {\n  right: 0;\n}\n\n.leaflet-bottom {\n  bottom: 0;\n}\n\n.leaflet-left {\n  left: 0;\n}\n\n.leaflet-control {\n  float: left;\n  clear: both;\n}\n\n.leaflet-right .leaflet-control {\n  float: right;\n}\n\n.leaflet-top .leaflet-control {\n  margin-top: 10px;\n}\n\n.leaflet-bottom .leaflet-control {\n  margin-bottom: 10px;\n}\n\n.leaflet-left .leaflet-control {\n  margin-left: 10px;\n}\n\n.leaflet-right .leaflet-control {\n  margin-right: 10px;\n}\n\n/* zoom and fade animations */\n.leaflet-fade-anim .leaflet-tile {\n  will-change: opacity;\n}\n\n.leaflet-fade-anim .leaflet-popup {\n  opacity: 0;\n  -webkit-transition: opacity 0.2s linear;\n  -moz-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear;\n}\n\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n  opacity: 1;\n}\n\n.leaflet-zoom-animated {\n  -webkit-transform-origin: 0 0;\n  -ms-transform-origin: 0 0;\n  transform-origin: 0 0;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n  will-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n  -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n  transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);\n}\n\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n  -webkit-transition: none;\n  -moz-transition: none;\n  transition: none;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n  visibility: hidden;\n}\n\n/* cursors */\n.leaflet-interactive {\n  cursor: pointer;\n}\n\n.leaflet-grab {\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n  cursor: crosshair;\n}\n\n.leaflet-popup-pane,\n.leaflet-control {\n  cursor: auto;\n}\n\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n  pointer-events: all;\n}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n  pointer-events: visiblePainted;\n  /* IE 9-10 doesn't have auto */\n  pointer-events: auto;\n}\n\n/* visual tweaks */\n.leaflet-container {\n  background: #ddd;\n  outline: 0;\n}\n\n.leaflet-container a {\n  color: #0078A8;\n}\n\n.leaflet-container a.leaflet-active {\n  outline: 2px solid orange;\n}\n\n.leaflet-zoom-box {\n  border: 2px dotted #38f;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n/* general typography */\n.leaflet-container {\n  font: 12px/1.5 \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n}\n\n/* general toolbar styles */\n.leaflet-bar {\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);\n  border-radius: 4px;\n}\n\n.leaflet-bar a,\n.leaflet-bar a:hover {\n  background-color: #fff;\n  border-bottom: 1px solid #ccc;\n  width: 26px;\n  height: 26px;\n  line-height: 26px;\n  display: block;\n  text-align: center;\n  text-decoration: none;\n  color: black;\n}\n\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  display: block;\n}\n\n.leaflet-bar a:hover {\n  background-color: #f4f4f4;\n}\n\n.leaflet-bar a:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n\n.leaflet-bar a:last-child {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-bottom: none;\n}\n\n.leaflet-bar a.leaflet-disabled {\n  cursor: default;\n  background-color: #f4f4f4;\n  color: #bbb;\n}\n\n.leaflet-touch .leaflet-bar a {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n\n.leaflet-touch .leaflet-bar a:first-child {\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n}\n\n.leaflet-touch .leaflet-bar a:last-child {\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n/* zoom control */\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n  font: bold 18px \"Lucida Console\", Monaco, monospace;\n  text-indent: 1px;\n}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out {\n  font-size: 22px;\n}\n\n/* layers control */\n.leaflet-control-layers {\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);\n  background: #fff;\n  border-radius: 5px;\n}\n\n.leaflet-control-layers-toggle {\n  /* background-image: url(../images/layers.png); */\n  width: 36px;\n  height: 36px;\n}\n\n.leaflet-retina .leaflet-control-layers-toggle {\n  /* background-image: url(../images/layers-2x.png); */\n  background-size: 26px 26px;\n}\n\n.leaflet-touch .leaflet-control-layers-toggle {\n  width: 44px;\n  height: 44px;\n}\n\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n  display: none;\n}\n\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n  display: block;\n  position: relative;\n}\n\n.leaflet-control-layers-expanded {\n  padding: 6px 10px 6px 6px;\n  color: #333;\n  background: #fff;\n}\n\n.leaflet-control-layers-scrollbar {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  padding-right: 5px;\n}\n\n.leaflet-control-layers-selector {\n  margin-top: 2px;\n  position: relative;\n  top: 1px;\n}\n\n.leaflet-control-layers label {\n  display: block;\n}\n\n.leaflet-control-layers-separator {\n  height: 0;\n  border-top: 1px solid #ddd;\n  margin: 5px -10px 5px -6px;\n}\n\n/* Default icon URLs */\n/* .leaflet-default-icon-path {\n\tbackground-image: url(images/marker-icon.png); \n\t} */\n/* attribution and scale controls */\n.leaflet-container .leaflet-control-attribution {\n  background: #fff;\n  background: rgba(255, 255, 255, 0.7);\n  margin: 0;\n}\n\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n  padding: 0 5px;\n  color: #333;\n}\n\n.leaflet-control-attribution a {\n  text-decoration: none;\n}\n\n.leaflet-control-attribution a:hover {\n  text-decoration: underline;\n}\n\n.leaflet-container .leaflet-control-attribution,\n.leaflet-container .leaflet-control-scale {\n  font-size: 11px;\n}\n\n.leaflet-left .leaflet-control-scale {\n  margin-left: 5px;\n}\n\n.leaflet-bottom .leaflet-control-scale {\n  margin-bottom: 5px;\n}\n\n.leaflet-control-scale-line {\n  border: 2px solid #777;\n  border-top: none;\n  line-height: 1.1;\n  padding: 2px 5px 1px;\n  font-size: 11px;\n  white-space: nowrap;\n  overflow: hidden;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background: #fff;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.leaflet-control-scale-line:not(:first-child) {\n  border-top: 2px solid #777;\n  border-bottom: none;\n  margin-top: -2px;\n}\n\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n  border-bottom: 2px solid #777;\n}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n  box-shadow: none;\n}\n\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n  border: 2px solid rgba(0, 0, 0, 0.2);\n  background-clip: padding-box;\n}\n\n/* popup */\n.leaflet-popup {\n  position: absolute;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.leaflet-popup-content-wrapper {\n  padding: 1px;\n  text-align: left;\n  border-radius: 12px;\n}\n\n.leaflet-popup-content {\n  margin: 13px 19px;\n  line-height: 1.4;\n}\n\n.leaflet-popup-content p {\n  margin: 18px 0;\n}\n\n.leaflet-popup-tip-container {\n  width: 40px;\n  height: 20px;\n  position: absolute;\n  left: 50%;\n  margin-left: -20px;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.leaflet-popup-tip {\n  width: 17px;\n  height: 17px;\n  padding: 1px;\n  margin: -10px auto 0;\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n  background: white;\n  color: #333;\n  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);\n}\n\n.leaflet-container a.leaflet-popup-close-button {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 4px 4px 0 0;\n  border: none;\n  text-align: center;\n  width: 18px;\n  height: 14px;\n  font: 16px/14px Tahoma, Verdana, sans-serif;\n  color: #c3c3c3;\n  text-decoration: none;\n  font-weight: bold;\n  background: transparent;\n}\n\n.leaflet-container a.leaflet-popup-close-button:hover {\n  color: #999;\n}\n\n.leaflet-popup-scrolled {\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  border-top: 1px solid #ddd;\n}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n  -ms-zoom: 1;\n}\n\n.leaflet-oldie .leaflet-popup-tip {\n  width: 24px;\n  margin: 0 auto;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n  filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n}\n\n.leaflet-oldie .leaflet-popup-tip-container {\n  margin-top: -1px;\n}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n  border: 1px solid #999;\n}\n\n/* div icon */\n.leaflet-div-icon {\n  background: #fff;\n  border: 1px solid #666;\n}\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n  position: absolute;\n  padding: 6px;\n  background-color: #fff;\n  border: 1px solid #fff;\n  border-radius: 3px;\n  color: #222;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  pointer-events: none;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n}\n\n.leaflet-tooltip.leaflet-clickable {\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n  position: absolute;\n  pointer-events: none;\n  border: 6px solid transparent;\n  background: transparent;\n  content: \"\";\n}\n\n/* Directions */\n.leaflet-tooltip-bottom {\n  margin-top: 6px;\n}\n\n.leaflet-tooltip-top {\n  margin-top: -6px;\n}\n\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n  left: 50%;\n  margin-left: -6px;\n}\n\n.leaflet-tooltip-top:before {\n  bottom: 0;\n  margin-bottom: -12px;\n  border-top-color: #fff;\n}\n\n.leaflet-tooltip-bottom:before {\n  top: 0;\n  margin-top: -12px;\n  margin-left: -6px;\n  border-bottom-color: #fff;\n}\n\n.leaflet-tooltip-left {\n  margin-left: -6px;\n}\n\n.leaflet-tooltip-right {\n  margin-left: 6px;\n}\n\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n  top: 50%;\n  margin-top: -6px;\n}\n\n.leaflet-tooltip-left:before {\n  right: 0;\n  margin-right: -12px;\n  border-left-color: #fff;\n}\n\n.leaflet-tooltip-right:before {\n  left: 0;\n  margin-left: -12px;\n  border-right-color: #fff;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./MapPanel.tsx":
/*!**********************!*\
  !*** ./MapPanel.tsx ***!
  \**********************/
/*! exports provided: MapPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPanel", function() { return MapPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dataParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dataParser */ "./dataParser.ts");
/* harmony import */ var components_Canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Canvas */ "./components/Canvas.tsx");






var MapPanel = function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MapPanel, _super); //= ({ options, data, width, height, id }) =>


  function MapPanel(props) {
    var _this = _super.call(this, props) || this;

    _this.updateMapJson = function (newDataL1, newDataL2, zoom, center) {
      var options = _this.props.options;
      var mapjsonL1 = options.mapjsonL1,
          mapjsonL2 = options.mapjsonL2,
          startLat = options.startLat,
          startLng = options.startLng,
          startZoom = options.startZoom;

      if (newDataL1 != null) {
        mapjsonL1 = JSON.stringify(newDataL1);
      }

      if (newDataL2 != null) {
        mapjsonL2 = JSON.stringify(newDataL2);
      }

      startZoom = zoom;
      startLat = center.lat;
      startLng = center.lng;

      _this.props.onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        mapjsonL1: mapjsonL1,
        mapjsonL2: mapjsonL2,
        startZoom: startZoom,
        startLat: startLat,
        startLng: startLng
      }));
    };

    _this.updateCenter = function (zoom, center) {
      var options = _this.props.options;
      var startLat = options.startLat,
          startLng = options.startLng,
          startZoom = options.startZoom;
      startZoom = zoom;
      startLat = center.lat;
      startLng = center.lng;

      _this.props.onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        startZoom: startZoom,
        startLat: startLat,
        startLng: startLng
      }));
    };

    return _this;
  }

  MapPanel.prototype.render = function () {
    var _a = this.props,
        options = _a.options,
        data = _a.data,
        width = _a.width,
        height = _a.height,
        id = _a.id;
    var params = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["urlUtil"].getUrlSearchParams();

    if (params.editPanel != null) {
      options.editMode = true; // call update map?
    } else {
      options.editMode = false;
    }

    var colorsL1 = {
      defaultColor: options.color1,
      nodeHighlight: options.nodeHighlightL1
    };
    var colorsL2 = {
      defaultColor: options.color2,
      nodeHighlight: options.nodeHighlightL2
    };
    var fieldsL1 = {
      srcField: options.srcFieldL1,
      dstField: options.dstFieldL1,
      valField: options.valFieldL1,
      endpointId: options.endpointIdL1
    };
    var fieldsL2 = {
      srcField: options.srcFieldL2,
      dstField: options.dstFieldL2,
      valField: options.valFieldL2,
      endpointId: options.endpointIdL2
    };
    var parsedDataL1 = {};
    var parsedDataL2 = {};
    var mapDataL1;
    var mapDataL2;

    try {
      parsedDataL1 = Object(dataParser__WEBPACK_IMPORTED_MODULE_3__["parseData"])(data, options.mapjsonL1, colorsL1, fieldsL1);
      mapDataL1 = parsedDataL1[3];

      if (options.mapjsonL2) {
        parsedDataL2 = Object(dataParser__WEBPACK_IMPORTED_MODULE_3__["parseData"])(data, options.mapjsonL2, colorsL2, fieldsL2);
        mapDataL2 = parsedDataL2[3];
      }
    } catch (error) {
      console.error('Parsing error : ', error);
    }

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(components_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"], {
      height: height,
      width: width,
      panelId: id,
      options: options,
      dataL1: parsedDataL1,
      dataL2: parsedDataL2,
      mapDataL1: mapDataL1,
      mapDataL2: mapDataL2,
      updateMapJson: this.updateMapJson,
      updateCenter: this.updateCenter,
      editMode: options.editMode
    });
  };

  return MapPanel;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./components/Canvas.tsx":
/*!*******************************!*\
  !*** ./components/Canvas.tsx ***!
  \*******************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RenderMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RenderMap.js */ "./components/RenderMap.js");
/* harmony import */ var _css_esmap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/esmap.css */ "./css/esmap.css");
/* harmony import */ var _css_esmap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_esmap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_leaflet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/leaflet.css */ "./css/leaflet.css");
/* harmony import */ var _css_leaflet_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_leaflet_css__WEBPACK_IMPORTED_MODULE_3__);



 // import { urlUtil } from '@grafana/data';

var Canvas = function Canvas(props) {
  // var print = props.options.mapjson;
  var panelId = props.panelId;
  var data = {
    layer1: props.dataL1,
    layer2: props.dataL2
  };
  var mapData = {
    layer1: props.mapDataL1,
    layer2: props.mapDataL2
  };
  var options = props.options;
  var updateMapJson = props.updateMapJson;
  var height = props.height;
  var width = props.width;
  var updateCenter = props.updateCenter;
  var editMode = props.editMode;
  var layer2 = props.options.layer2;
  var layer1 = props.options.layer1; // var params = urlUtil.getUrlSearchParams();
  // if (params.editPanel != null) {
  //   props.editMode = 1;
  //   // call update map?
  // } else {
  //   props.editMode = 0;
  // }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var map = new _RenderMap_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Map_' + panelId);
    var thisMap = map.renderMap(data, mapData, options, updateMapJson, updateCenter);
    return function () {
      // updateMapJson();
      // SUPER IMPORTANT!!! this removes the old map before rerendering
      if (thisMap) {
        thisMap.off();
        thisMap.remove();
      }
    };
  }, [width, height, panelId, editMode, layer2, layer1]); // adding options var here breaks it

  var mapHeight = props.height - 25;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'tooltip'
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: 'Map_' + props.panelId,
    style: {
      height: mapHeight,
      width: props.width
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    id: "edit_mode"
  }, "Turn Edit Mode Off"));
};

/***/ }),

/***/ "./components/RenderMap.js":
/*!*********************************!*\
  !*** ./components/RenderMap.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NetworkMap; });
/* harmony import */ var _d3_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./d3.min.js */ "./components/d3.min.js");
/* harmony import */ var _d3_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_d3_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/leaflet */ "./components/leaflet.js");
/* harmony import */ var components_leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(components_leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _esmap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./esmap.js */ "./components/esmap.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var NetworkMap = /*#__PURE__*/function () {
  function NetworkMap(id) {
    _classCallCheck(this, NetworkMap);

    this.containerID = id;
  }
  /**
   * Renders the Network Map in the panel.
   *
   * @param parsedData - the parsed data from parseData.js
   * @param header1, @param header2 - headers for the two x-axis labels, set in options panel
   * @param hoverColor - the color the lines will change to when hovering, set in options panel
   */


  _createClass(NetworkMap, [{
    key: "renderMap",
    value: function renderMap(parsedData, mapData, options, updateMapJson, updateCenter) {
      if (!parsedData || !mapData) {
        return;
      } // SUPER IMPORTANT! This clears old chart before drawing new one...
      // d3.select('#' + this.containerID)
      //   .selectAll('svg')
      //   .remove();


      _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('#' + this.containerID).select('.tooltip').remove(); // ----------------------------------------------------------
      // set variables

      var startLat = options.startLat;
      var startLng = options.startLng;
      var startZoom = options.startZoom;
      var div = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('body').append('div').attr('class', 'tooltip').style('opacity', 0); //--- Create Leaflet Map with custom tile layer

      var map = components_leaflet__WEBPACK_IMPORTED_MODULE_1__["map"](this.containerID, {
        zoomAnimation: false,
        fadeAnimation: false,
        zoomSnap: 0.25,
        zoomDelta: 0.25,
        scrollWheelZoom: false,
        doubleClickZoom: false
      }).setView([startLat, startLng], startZoom);
      components_leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"]('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        minZoom: 2,
        maxZoom: 10,
        ext: 'png'
      }).addTo(map); //--- Initialize the SVG layer

      components_leaflet__WEBPACK_IMPORTED_MODULE_1__["svg"]({
        clickable: true
      }).addTo(map); // we have to make the svg layer clickable

      var overlay = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"](map.getPanes().overlayPane);
      var svg = overlay.select('svg').attr('pointer-events', 'all'); //--- create network map within leaflet
      //---  note:  1 map could have multiple esmap svg layers
      //---         this can be used to allow leaflet to turn on and off layers at
      //---         different zoom levels in the future(imagine a regional and national map)

      var nm = new _esmap_js__WEBPACK_IMPORTED_MODULE_2__["EsMap"](map, svg, div, _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["curveNatural"], options, updateMapJson, updateCenter);
      var params = _grafana_data__WEBPACK_IMPORTED_MODULE_3__["urlUtil"].getUrlSearchParams();

      if (params.editPanel != null) {
        nm.editMode(1); // editMode = 1;

        _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('button#edit_mode').style('visibility', 'visible'); // call update map?
      } else {
        nm.editMode(0); // editMode = 0;

        _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('button#edit_mode').style('visibility', 'hidden');
      }

      function toggleEdit(e) {
        var d = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('button#edit_mode');

        if (nm.edit == 1) {
          nm.editMode(0);
          d.html('Turn Edit Mode On');
        } else {
          nm.editMode(1);
          d.html('Turn Edit Mode Off');
        }
      }

      var edit_mode = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"]('button#edit_mode').on('click', toggleEdit); // Draw the map json data!!!

      if (options.layer1) {
        var g1 = nm.addNetLayer('layer1', mapData.layer1);
      }

      if (options.layer2) {
        var g2 = nm.addNetLayer('layer2', mapData.layer2);
      } // twinkle(nm, g2, 'esnet');
      //----  helper


      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      } //---  helper


      function sleep(ms) {
        return new Promise(function (resolve) {
          return setTimeout(resolve, ms);
        });
      } //--- function that changes circuit style, showing how to do so directly using dom.


      function twinkle(_x, _x2, _x3) {
        return _twinkle.apply(this, arguments);
      }

      function _twinkle() {
        _twinkle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(map, g, name) {
          var edges, x, target, colorAZ, colorZA;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  edges = nm.data[name]['edges'];
                  x = 0;

                case 2:
                  if (!(x < 1000)) {
                    _context.next = 13;
                    break;
                  }

                  //-- pick random ckt and assign rand colors every 10ms
                  target = edges[getRandomInt(0, edges.length)].name;
                  colorAZ = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["interpolateRainbow"](Math.random());
                  colorZA = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["interpolateRainbow"](Math.random()); //--- possible remaining issue to contend with relates use of ID and uniqueness

                  g.select('path.edge-az-' + target).style('stroke', colorAZ);
                  g.select('path.edge-za-' + target).style('stroke', colorZA);
                  _context.next = 10;
                  return sleep(10);

                case 10:
                  x++;
                  _context.next = 2;
                  break;

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _twinkle.apply(this, arguments);
      }

      return map;
    }
  }]);

  return NetworkMap;
}();



/***/ }),

/***/ "./components/d3.min.js":
/*!******************************!*\
  !*** ./components/d3.min.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e37) { throw _e37; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e38) { didErr = true; err = _e38; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// https://d3js.org v7.0.1 Copyright 2010-2021 Mike Bostock
!function (t, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? n(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (t) {
  "use strict";

  function n(t, n) {
    return null == t || null == n ? NaN : t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }

  function e(t) {
    var e = t,
        r = t,
        i = t;

    function o(t, n) {
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : t.length;

      if (e < o) {
        if (0 !== r(n, n)) return o;

        do {
          var _r2 = e + o >>> 1;

          i(t[_r2], n) < 0 ? e = _r2 + 1 : o = _r2;
        } while (e < o);
      }

      return e;
    }

    return 1 === t.length && (e = function e(n, _e2) {
      return t(n) - _e2;
    }, r = n, i = function i(e, r) {
      return n(t(e), r);
    }), {
      left: o,
      center: function center(t, n) {
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : t.length;
        var a = o(t, n, r, i - 1);
        return a > r && e(t[a - 1], n) > -e(t[a], n) ? a - 1 : a;
      },
      right: function right(t, n) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : t.length;

        if (e < o) {
          if (0 !== r(n, n)) return o;

          do {
            var _r3 = e + o >>> 1;

            i(t[_r3], n) <= 0 ? e = _r3 + 1 : o = _r3;
          } while (e < o);
        }

        return e;
      }
    };
  }

  function r(t) {
    return null === t ? NaN : +t;
  }

  var i = e(n),
      o = i.right,
      a = i.left,
      u = e(r).center;
  var c = o;

  function f(t, n) {
    var e = 0;

    if (void 0 === n) {
      var _iterator = _createForOfIteratorHelper(t),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _n2 = _step.value;
          null != _n2 && (_n2 = +_n2) >= _n2 && ++e;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _r4 = -1;

      var _iterator2 = _createForOfIteratorHelper(t),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _i2 = _step2.value;
          null != (_i2 = n(_i2, ++_r4, t)) && (_i2 = +_i2) >= _i2 && ++e;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return e;
  }

  function s(t) {
    return 0 | t.length;
  }

  function l(t) {
    return !(t > 0);
  }

  function h(t) {
    return "object" != _typeof(t) || "length" in t ? t : Array.from(t);
  }

  function d(t, n) {
    var e,
        r = 0,
        i = 0,
        o = 0;

    if (void 0 === n) {
      var _iterator3 = _createForOfIteratorHelper(t),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _n3 = _step3.value;
          null != _n3 && (_n3 = +_n3) >= _n3 && (e = _n3 - i, i += e / ++r, o += e * (_n3 - i));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } else {
      var _a2 = -1;

      var _iterator4 = _createForOfIteratorHelper(t),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _u2 = _step4.value;
          null != (_u2 = n(_u2, ++_a2, t)) && (_u2 = +_u2) >= _u2 && (e = _u2 - i, i += e / ++r, o += e * (_u2 - i));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    if (r > 1) return o / (r - 1);
  }

  function p(t, n) {
    var e = d(t, n);
    return e ? Math.sqrt(e) : e;
  }

  function g(t, n) {
    var e, r;

    if (void 0 === n) {
      var _iterator5 = _createForOfIteratorHelper(t),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _n4 = _step5.value;
          null != _n4 && (void 0 === e ? _n4 >= _n4 && (e = r = _n4) : (e > _n4 && (e = _n4), r < _n4 && (r = _n4)));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } else {
      var _i3 = -1;

      var _iterator6 = _createForOfIteratorHelper(t),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _o2 = _step6.value;
          null != (_o2 = n(_o2, ++_i3, t)) && (void 0 === e ? _o2 >= _o2 && (e = r = _o2) : (e > _o2 && (e = _o2), r < _o2 && (r = _o2)));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }

    return [e, r];
  }

  var y = /*#__PURE__*/function () {
    function y() {
      _classCallCheck(this, y);

      this._partials = new Float64Array(32), this._n = 0;
    }

    _createClass(y, [{
      key: "add",
      value: function add(t) {
        var n = this._partials;
        var e = 0;

        for (var _r5 = 0; _r5 < this._n && _r5 < 32; _r5++) {
          var _i4 = n[_r5],
              _o3 = t + _i4,
              _a3 = Math.abs(t) < Math.abs(_i4) ? t - (_o3 - _i4) : _i4 - (_o3 - t);

          _a3 && (n[e++] = _a3), t = _o3;
        }

        return n[e] = t, this._n = e + 1, this;
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        var t = this._partials;
        var n,
            e,
            r,
            i = this._n,
            o = 0;

        if (i > 0) {
          for (o = t[--i]; i > 0 && (n = o, e = t[--i], o = n + e, r = e - (o - n), !r);) {
            ;
          }

          i > 0 && (r < 0 && t[i - 1] < 0 || r > 0 && t[i - 1] > 0) && (e = 2 * r, n = o + e, e == n - o && (o = n));
        }

        return o;
      }
    }]);

    return y;
  }();

  var v = /*#__PURE__*/function (_Map) {
    _inherits(v, _Map);

    var _super = _createSuper(v);

    function v(t) {
      var _this;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : w;

      _classCallCheck(this, v);

      if (_this = _super.call(this), Object.defineProperties(_assertThisInitialized(_this), {
        _intern: {
          value: new Map()
        },
        _key: {
          value: n
        }
      }), null != t) {
        var _iterator7 = _createForOfIteratorHelper(t),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                _n5 = _step7$value[0],
                _e3 = _step7$value[1];

            _this.set(_n5, _e3);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }

      return _possibleConstructorReturn(_this);
    }

    _createClass(v, [{
      key: "get",
      value: function get(t) {
        return _get(_getPrototypeOf(v.prototype), "get", this).call(this, b(this, t));
      }
    }, {
      key: "has",
      value: function has(t) {
        return _get(_getPrototypeOf(v.prototype), "has", this).call(this, b(this, t));
      }
    }, {
      key: "set",
      value: function set(t, n) {
        return _get(_getPrototypeOf(v.prototype), "set", this).call(this, m(this, t), n);
      }
    }, {
      key: "delete",
      value: function _delete(t) {
        return _get(_getPrototypeOf(v.prototype), "delete", this).call(this, x(this, t));
      }
    }]);

    return v;
  }( /*#__PURE__*/_wrapNativeSuper(Map));

  var _ = /*#__PURE__*/function (_Set) {
    _inherits(_, _Set);

    var _super2 = _createSuper(_);

    function _(t) {
      var _this2;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : w;

      _classCallCheck(this, _);

      if (_this2 = _super2.call(this), Object.defineProperties(_assertThisInitialized(_this2), {
        _intern: {
          value: new Map()
        },
        _key: {
          value: n
        }
      }), null != t) {
        var _iterator8 = _createForOfIteratorHelper(t),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _n6 = _step8.value;

            _this2.add(_n6);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }

      return _possibleConstructorReturn(_this2);
    }

    _createClass(_, [{
      key: "has",
      value: function has(t) {
        return _get(_getPrototypeOf(_.prototype), "has", this).call(this, b(this, t));
      }
    }, {
      key: "add",
      value: function add(t) {
        return _get(_getPrototypeOf(_.prototype), "add", this).call(this, m(this, t));
      }
    }, {
      key: "delete",
      value: function _delete(t) {
        return _get(_getPrototypeOf(_.prototype), "delete", this).call(this, x(this, t));
      }
    }]);

    return _;
  }( /*#__PURE__*/_wrapNativeSuper(Set));

  function b(_ref, e) {
    var t = _ref._intern,
        n = _ref._key;
    var r = n(e);
    return t.has(r) ? t.get(r) : e;
  }

  function m(_ref2, e) {
    var t = _ref2._intern,
        n = _ref2._key;
    var r = n(e);
    return t.has(r) ? t.get(r) : (t.set(r, e), e);
  }

  function x(_ref3, e) {
    var t = _ref3._intern,
        n = _ref3._key;
    var r = n(e);
    return t.has(r) && (e = t.get(e), t["delete"](r)), e;
  }

  function w(t) {
    return null !== t && "object" == _typeof(t) ? t.valueOf() : t;
  }

  function M(t) {
    return t;
  }

  function A(t) {
    for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      n[_key - 1] = arguments[_key];
    }

    return C(t, M, M, n);
  }

  function T(t) {
    for (var _len2 = arguments.length, n = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      n[_key2 - 1] = arguments[_key2];
    }

    return C(t, Array.from, M, n);
  }

  function S(t, n) {
    for (var _e4 = 1, _r6 = n.length; _e4 < _r6; ++_e4) {
      t = t.flatMap(function (t) {
        return t.pop().map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              n = _ref5[0],
              e = _ref5[1];

          return [].concat(_toConsumableArray(t), [n, e]);
        });
      });
    }

    return t;
  }

  function E(t, n) {
    for (var _len3 = arguments.length, e = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      e[_key3 - 2] = arguments[_key3];
    }

    return C(t, M, n, e);
  }

  function k(t, n) {
    for (var _len4 = arguments.length, e = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      e[_key4 - 2] = arguments[_key4];
    }

    return C(t, Array.from, n, e);
  }

  function N(t) {
    if (1 !== t.length) throw new Error("duplicate key");
    return t[0];
  }

  function C(t, n, e, r) {
    return function t(i, o) {
      if (o >= r.length) return e(i);
      var a = new v(),
          u = r[o++];
      var c = -1;

      var _iterator9 = _createForOfIteratorHelper(i),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var _t2 = _step9.value;

          var _n7 = u(_t2, ++c, i),
              _e5 = a.get(_n7);

          _e5 ? _e5.push(_t2) : a.set(_n7, [_t2]);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      var _iterator10 = _createForOfIteratorHelper(a),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _step10$value = _slicedToArray(_step10.value, 2),
              _n8 = _step10$value[0],
              _e6 = _step10$value[1];

          a.set(_n8, t(_e6, o));
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return n(a);
    }(t, 0);
  }

  function P(t, n) {
    return Array.from(n, function (n) {
      return t[n];
    });
  }

  function z(t) {
    for (var _len5 = arguments.length, n = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      n[_key5 - 1] = arguments[_key5];
    }

    if ("function" != typeof t[Symbol.iterator]) throw new TypeError("values is not iterable");
    t = Array.from(t);

    var _n9 = n,
        _n10 = _slicedToArray(_n9, 1),
        e = _n10[0];

    if (e && 1 === e.length || n.length > 1) {
      var _r7 = Uint32Array.from(t, function (t, n) {
        return n;
      });

      return n.length > 1 ? (n = n.map(function (n) {
        return t.map(n);
      }), _r7.sort(function (t, e) {
        var _iterator11 = _createForOfIteratorHelper(n),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _r8 = _step11.value;

            var _n11 = q(_r8[t], _r8[e]);

            if (_n11) return _n11;
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      })) : (e = t.map(e), _r7.sort(function (t, n) {
        return q(e[t], e[n]);
      })), P(t, _r7);
    }

    return t.sort(void 0 === e ? q : D(e));
  }

  function D(t) {
    if ("function" != typeof t) throw new TypeError("compare is not a function");
    return function (n, e) {
      var r = t(n, e);
      return r || 0 === r ? r : (0 === t(e, e)) - (0 === t(n, n));
    };
  }

  function q(t, n) {
    return (null == t || !(t >= t)) - (null == n || !(n >= n)) || (t < n ? -1 : t > n ? 1 : 0);
  }

  var R = Array.prototype.slice;

  function F(t) {
    return function () {
      return t;
    };
  }

  var O = Math.sqrt(50),
      I = Math.sqrt(10),
      U = Math.sqrt(2);

  function B(t, n, e) {
    var r,
        i,
        o,
        a,
        u = -1;
    if (e = +e, (t = +t) === (n = +n) && e > 0) return [t];
    if ((r = n < t) && (i = t, t = n, n = i), 0 === (a = Y(t, n, e)) || !isFinite(a)) return [];

    if (a > 0) {
      var _e7 = Math.round(t / a),
          _r9 = Math.round(n / a);

      for (_e7 * a < t && ++_e7, _r9 * a > n && --_r9, o = new Array(i = _r9 - _e7 + 1); ++u < i;) {
        o[u] = (_e7 + u) * a;
      }
    } else {
      a = -a;

      var _e8 = Math.round(t * a),
          _r10 = Math.round(n * a);

      for (_e8 / a < t && ++_e8, _r10 / a > n && --_r10, o = new Array(i = _r10 - _e8 + 1); ++u < i;) {
        o[u] = (_e8 + u) / a;
      }
    }

    return r && o.reverse(), o;
  }

  function Y(t, n, e) {
    var r = (n - t) / Math.max(0, e),
        i = Math.floor(Math.log(r) / Math.LN10),
        o = r / Math.pow(10, i);
    return i >= 0 ? (o >= O ? 10 : o >= I ? 5 : o >= U ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= O ? 10 : o >= I ? 5 : o >= U ? 2 : 1);
  }

  function L(t, n, e) {
    var r = Math.abs(n - t) / Math.max(0, e),
        i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
        o = r / i;
    return o >= O ? i *= 10 : o >= I ? i *= 5 : o >= U && (i *= 2), n < t ? -i : i;
  }

  function j(t, n, e) {
    var r;

    for (;;) {
      var _i5 = Y(t, n, e);

      if (_i5 === r || 0 === _i5 || !isFinite(_i5)) return [t, n];
      _i5 > 0 ? (t = Math.floor(t / _i5) * _i5, n = Math.ceil(n / _i5) * _i5) : _i5 < 0 && (t = Math.ceil(t * _i5) / _i5, n = Math.floor(n * _i5) / _i5), r = _i5;
    }
  }

  function H(t) {
    return Math.ceil(Math.log(f(t)) / Math.LN2) + 1;
  }

  function X() {
    var t = M,
        n = g,
        e = H;

    function r(r) {
      Array.isArray(r) || (r = Array.from(r));
      var i,
          o,
          a = r.length,
          u = new Array(a);

      for (i = 0; i < a; ++i) {
        u[i] = t(r[i], i, r);
      }

      var f = n(u),
          s = f[0],
          l = f[1],
          h = e(u, s, l);

      if (!Array.isArray(h)) {
        var _j, _j2;

        var _t3 = l,
            _e9 = +h;

        if (n === g && (_j = j(s, l, _e9), _j2 = _slicedToArray(_j, 2), s = _j2[0], l = _j2[1], _j), (h = B(s, l, _e9))[h.length - 1] >= l) if (_t3 >= l && n === g) {
          var _t4 = Y(s, l, _e9);

          isFinite(_t4) && (_t4 > 0 ? l = (Math.floor(l / _t4) + 1) * _t4 : _t4 < 0 && (l = (Math.ceil(l * -_t4) + 1) / -_t4));
        } else h.pop();
      }

      for (var d = h.length; h[0] <= s;) {
        h.shift(), --d;
      }

      for (; h[d - 1] > l;) {
        h.pop(), --d;
      }

      var p,
          y = new Array(d + 1);

      for (i = 0; i <= d; ++i) {
        (p = y[i] = []).x0 = i > 0 ? h[i - 1] : s, p.x1 = i < d ? h[i] : l;
      }

      for (i = 0; i < a; ++i) {
        null != (o = u[i]) && s <= o && o <= l && y[c(h, o, 0, d)].push(r[i]);
      }

      return y;
    }

    return r.value = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : F(n), r) : t;
    }, r.domain = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : F([t[0], t[1]]), r) : n;
    }, r.thresholds = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? F(R.call(t)) : F(t), r) : e;
    }, r;
  }

  function G(t, n) {
    var e;

    if (void 0 === n) {
      var _iterator12 = _createForOfIteratorHelper(t),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _n12 = _step12.value;
          null != _n12 && (e < _n12 || void 0 === e && _n12 >= _n12) && (e = _n12);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    } else {
      var _r11 = -1;

      var _iterator13 = _createForOfIteratorHelper(t),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var _i6 = _step13.value;
          null != (_i6 = n(_i6, ++_r11, t)) && (e < _i6 || void 0 === e && _i6 >= _i6) && (e = _i6);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    }

    return e;
  }

  function V(t, n) {
    var e;

    if (void 0 === n) {
      var _iterator14 = _createForOfIteratorHelper(t),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var _n13 = _step14.value;
          null != _n13 && (e > _n13 || void 0 === e && _n13 >= _n13) && (e = _n13);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    } else {
      var _r12 = -1;

      var _iterator15 = _createForOfIteratorHelper(t),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var _i7 = _step15.value;
          null != (_i7 = n(_i7, ++_r12, t)) && (e > _i7 || void 0 === e && _i7 >= _i7) && (e = _i7);
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
    }

    return e;
  }

  function $(t, n) {
    var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : t.length - 1;
    var i = arguments.length > 4 ? arguments[4] : undefined;

    for (i = void 0 === i ? q : D(i); r > e;) {
      if (r - e > 600) {
        var _o5 = r - e + 1,
            _a5 = n - e + 1,
            _u4 = Math.log(_o5),
            _c2 = .5 * Math.exp(2 * _u4 / 3),
            _f2 = .5 * Math.sqrt(_u4 * _c2 * (_o5 - _c2) / _o5) * (_a5 - _o5 / 2 < 0 ? -1 : 1);

        $(t, n, Math.max(e, Math.floor(n - _a5 * _c2 / _o5 + _f2)), Math.min(r, Math.floor(n + (_o5 - _a5) * _c2 / _o5 + _f2)), i);
      }

      var _o4 = t[n];
      var _a4 = e,
          _u3 = r;

      for (W(t, e, n), i(t[r], _o4) > 0 && W(t, e, r); _a4 < _u3;) {
        for (W(t, _a4, _u3), ++_a4, --_u3; i(t[_a4], _o4) < 0;) {
          ++_a4;
        }

        for (; i(t[_u3], _o4) > 0;) {
          --_u3;
        }
      }

      0 === i(t[e], _o4) ? W(t, e, _u3) : (++_u3, W(t, _u3, r)), _u3 <= n && (e = _u3 + 1), n <= _u3 && (r = _u3 - 1);
    }

    return t;
  }

  function W(t, n, e) {
    var r = t[n];
    t[n] = t[e], t[e] = r;
  }

  function Z(t, n, e) {
    if (r = (t = Float64Array.from( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, n) {
      var _iterator16, _step16, _n14, _e10, _iterator17, _step17, _r13;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(void 0 === n)) {
                _context.next = 22;
                break;
              }

              _iterator16 = _createForOfIteratorHelper(t);
              _context.prev = 2;

              _iterator16.s();

            case 4:
              if ((_step16 = _iterator16.n()).done) {
                _context.next = 12;
                break;
              }

              _n14 = _step16.value;
              _context.t0 = null != _n14 && (_n14 = +_n14) >= _n14;

              if (!_context.t0) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return _n14;

            case 10:
              _context.next = 4;
              break;

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t1 = _context["catch"](2);

              _iterator16.e(_context.t1);

            case 17:
              _context.prev = 17;

              _iterator16.f();

              return _context.finish(17);

            case 20:
              _context.next = 42;
              break;

            case 22:
              _e10 = -1;
              _iterator17 = _createForOfIteratorHelper(t);
              _context.prev = 24;

              _iterator17.s();

            case 26:
              if ((_step17 = _iterator17.n()).done) {
                _context.next = 34;
                break;
              }

              _r13 = _step17.value;
              _context.t2 = null != (_r13 = n(_r13, ++_e10, t)) && (_r13 = +_r13) >= _r13;

              if (!_context.t2) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return _r13;

            case 32:
              _context.next = 26;
              break;

            case 34:
              _context.next = 39;
              break;

            case 36:
              _context.prev = 36;
              _context.t3 = _context["catch"](24);

              _iterator17.e(_context.t3);

            case 39:
              _context.prev = 39;

              _iterator17.f();

              return _context.finish(39);

            case 42:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 14, 17, 20], [24, 36, 39, 42]]);
    })(t, e))).length) {
      if ((n = +n) <= 0 || r < 2) return V(t);
      if (n >= 1) return G(t);
      var r,
          i = (r - 1) * n,
          o = Math.floor(i),
          a = G($(t, o).subarray(0, o + 1));
      return a + (V(t.subarray(o + 1)) - a) * (i - o);
    }
  }

  function K(t, n) {
    var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : r;

    if (i = t.length) {
      if ((n = +n) <= 0 || i < 2) return +e(t[0], 0, t);
      if (n >= 1) return +e(t[i - 1], i - 1, t);
      var i,
          o = (i - 1) * n,
          a = Math.floor(o),
          u = +e(t[a], a, t);
      return u + (+e(t[a + 1], a + 1, t) - u) * (o - a);
    }
  }

  function Q(t, n) {
    var e,
        r = -1,
        i = -1;

    if (void 0 === n) {
      var _iterator18 = _createForOfIteratorHelper(t),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var _n15 = _step18.value;
          ++i, null != _n15 && (e < _n15 || void 0 === e && _n15 >= _n15) && (e = _n15, r = i);
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
    } else {
      var _iterator19 = _createForOfIteratorHelper(t),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var _o6 = _step19.value;
          null != (_o6 = n(_o6, ++i, t)) && (e < _o6 || void 0 === e && _o6 >= _o6) && (e = _o6, r = i);
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
    }

    return r;
  }

  function J(t) {
    return Array.from( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
      var _iterator20, _step20, _n16;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator20 = _createForOfIteratorHelper(t);
              _context2.prev = 1;

              _iterator20.s();

            case 3:
              if ((_step20 = _iterator20.n()).done) {
                _context2.next = 8;
                break;
              }

              _n16 = _step20.value;
              return _context2.delegateYield(_n16, "t0", 6);

            case 6:
              _context2.next = 3;
              break;

            case 8:
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t1 = _context2["catch"](1);

              _iterator20.e(_context2.t1);

            case 13:
              _context2.prev = 13;

              _iterator20.f();

              return _context2.finish(13);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10, 13, 16]]);
    })(t));
  }

  function tt(t, n) {
    var e,
        r = -1,
        i = -1;

    if (void 0 === n) {
      var _iterator21 = _createForOfIteratorHelper(t),
          _step21;

      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var _n17 = _step21.value;
          ++i, null != _n17 && (e > _n17 || void 0 === e && _n17 >= _n17) && (e = _n17, r = i);
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    } else {
      var _iterator22 = _createForOfIteratorHelper(t),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var _o7 = _step22.value;
          null != (_o7 = n(_o7, ++i, t)) && (e > _o7 || void 0 === e && _o7 >= _o7) && (e = _o7, r = i);
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }

    return r;
  }

  function nt(t, n) {
    return [t, n];
  }

  function et(t, n, e) {
    t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : i < 3 ? 1 : +e;

    for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i;) {
      o[r] = t + r * e;
    }

    return o;
  }

  function rt(t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n;
    if (1 === e.length) return tt(t, e);
    var r,
        i = -1,
        o = -1;

    var _iterator23 = _createForOfIteratorHelper(t),
        _step23;

    try {
      for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
        var _n18 = _step23.value;
        ++o, (i < 0 ? 0 === e(_n18, _n18) : e(_n18, r) < 0) && (r = _n18, i = o);
      }
    } catch (err) {
      _iterator23.e(err);
    } finally {
      _iterator23.f();
    }

    return i;
  }

  var it = ot(Math.random);

  function ot(t) {
    return function (n) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : n.length;
      var i = r - (e = +e);

      for (; i;) {
        var _r14 = t() * i-- | 0,
            _o8 = n[i + e];

        n[i + e] = n[_r14 + e], n[_r14 + e] = _o8;
      }

      return n;
    };
  }

  function at(t) {
    if (!(i = t.length)) return [];

    for (var n = -1, e = V(t, ut), r = new Array(e); ++n < e;) {
      for (var i, o = -1, a = r[n] = new Array(i); ++o < i;) {
        a[o] = t[o][n];
      }
    }

    return r;
  }

  function ut(t) {
    return t.length;
  }

  function ct(t) {
    return t instanceof Set ? t : new Set(t);
  }

  function ft(t, n) {
    var e = t[Symbol.iterator](),
        r = new Set();

    var _iterator24 = _createForOfIteratorHelper(n),
        _step24;

    try {
      for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
        var _t5 = _step24.value;
        if (r.has(_t5)) continue;

        var _n19 = void 0,
            _i8 = void 0;

        for (; _e$next = e.next(), _n19 = _e$next.value, _i8 = _e$next.done, _e$next;) {
          var _e$next;

          if (_i8) return !1;
          if (r.add(_n19), Object.is(_t5, _n19)) break;
        }
      }
    } catch (err) {
      _iterator24.e(err);
    } finally {
      _iterator24.f();
    }

    return !0;
  }

  function st(t) {
    return t;
  }

  var lt = 1e-6;

  function ht(t) {
    return "translate(" + t + ",0)";
  }

  function dt(t) {
    return "translate(0," + t + ")";
  }

  function pt(t) {
    return function (n) {
      return +t(n);
    };
  }

  function gt(t, n) {
    return n = Math.max(0, t.bandwidth() - 2 * n) / 2, t.round() && (n = Math.round(n)), function (e) {
      return +t(e) + n;
    };
  }

  function yt() {
    return !this.__axis;
  }

  function vt(t, n) {
    var e = [],
        r = null,
        i = null,
        o = 6,
        a = 6,
        u = 3,
        c = "undefined" != typeof window && window.devicePixelRatio > 1 ? 0 : .5,
        f = 1 === t || 4 === t ? -1 : 1,
        s = 4 === t || 2 === t ? "x" : "y",
        l = 1 === t || 3 === t ? ht : dt;

    function h(h) {
      var d = null == r ? n.ticks ? n.ticks.apply(n, e) : n.domain() : r,
          p = null == i ? n.tickFormat ? n.tickFormat.apply(n, e) : st : i,
          g = Math.max(o, 0) + u,
          y = n.range(),
          v = +y[0] + c,
          _ = +y[y.length - 1] + c,
          b = (n.bandwidth ? gt : pt)(n.copy(), c),
          m = h.selection ? h.selection() : h,
          x = m.selectAll(".domain").data([null]),
          w = m.selectAll(".tick").data(d, n).order(),
          M = w.exit(),
          A = w.enter().append("g").attr("class", "tick"),
          T = w.select("line"),
          S = w.select("text");

      x = x.merge(x.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), w = w.merge(A), T = T.merge(A.append("line").attr("stroke", "currentColor").attr(s + "2", f * o)), S = S.merge(A.append("text").attr("fill", "currentColor").attr(s, f * g).attr("dy", 1 === t ? "0em" : 3 === t ? "0.71em" : "0.32em")), h !== m && (x = x.transition(h), w = w.transition(h), T = T.transition(h), S = S.transition(h), M = M.transition(h).attr("opacity", lt).attr("transform", function (t) {
        return isFinite(t = b(t)) ? l(t + c) : this.getAttribute("transform");
      }), A.attr("opacity", lt).attr("transform", function (t) {
        var n = this.parentNode.__axis;
        return l((n && isFinite(n = n(t)) ? n : b(t)) + c);
      })), M.remove(), x.attr("d", 4 === t || 2 === t ? a ? "M" + f * a + "," + v + "H" + c + "V" + _ + "H" + f * a : "M" + c + "," + v + "V" + _ : a ? "M" + v + "," + f * a + "V" + c + "H" + _ + "V" + f * a : "M" + v + "," + c + "H" + _), w.attr("opacity", 1).attr("transform", function (t) {
        return l(b(t) + c);
      }), T.attr(s + "2", f * o), S.attr(s, f * g).text(p), m.filter(yt).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", 2 === t ? "start" : 4 === t ? "end" : "middle"), m.each(function () {
        this.__axis = b;
      });
    }

    return h.scale = function (t) {
      return arguments.length ? (n = t, h) : n;
    }, h.ticks = function () {
      return e = Array.from(arguments), h;
    }, h.tickArguments = function (t) {
      return arguments.length ? (e = null == t ? [] : Array.from(t), h) : e.slice();
    }, h.tickValues = function (t) {
      return arguments.length ? (r = null == t ? null : Array.from(t), h) : r && r.slice();
    }, h.tickFormat = function (t) {
      return arguments.length ? (i = t, h) : i;
    }, h.tickSize = function (t) {
      return arguments.length ? (o = a = +t, h) : o;
    }, h.tickSizeInner = function (t) {
      return arguments.length ? (o = +t, h) : o;
    }, h.tickSizeOuter = function (t) {
      return arguments.length ? (a = +t, h) : a;
    }, h.tickPadding = function (t) {
      return arguments.length ? (u = +t, h) : u;
    }, h.offset = function (t) {
      return arguments.length ? (c = +t, h) : c;
    }, h;
  }

  var _t = {
    value: function value() {}
  };

  function bt() {
    for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
      if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      r[t] = [];
    }

    return new mt(r);
  }

  function mt(t) {
    this._ = t;
  }

  function xt(t, n) {
    return t.trim().split(/^|\s+/).map(function (t) {
      var e = "",
          r = t.indexOf(".");
      if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {
        type: t,
        name: e
      };
    });
  }

  function wt(t, n) {
    for (var e, r = 0, i = t.length; r < i; ++r) {
      if ((e = t[r]).name === n) return e.value;
    }
  }

  function Mt(t, n, e) {
    for (var r = 0, i = t.length; r < i; ++r) {
      if (t[r].name === n) {
        t[r] = _t, t = t.slice(0, r).concat(t.slice(r + 1));
        break;
      }
    }

    return null != e && t.push({
      name: n,
      value: e
    }), t;
  }

  mt.prototype = bt.prototype = {
    constructor: mt,
    on: function on(t, n) {
      var e,
          r = this._,
          i = xt(t + "", r),
          o = -1,
          a = i.length;

      if (!(arguments.length < 2)) {
        if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);

        for (; ++o < a;) {
          if (e = (t = i[o]).type) r[e] = Mt(r[e], t.name, n);else if (null == n) for (e in r) {
            r[e] = Mt(r[e], t.name, null);
          }
        }

        return this;
      }

      for (; ++o < a;) {
        if ((e = (t = i[o]).type) && (e = wt(r[e], t.name))) return e;
      }
    },
    copy: function copy() {
      var t = {},
          n = this._;

      for (var e in n) {
        t[e] = n[e].slice();
      }

      return new mt(t);
    },
    call: function call(t, n) {
      if ((e = arguments.length - 2) > 0) for (var e, r, i = new Array(e), o = 0; o < e; ++o) {
        i[o] = arguments[o + 2];
      }
      if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);

      for (o = 0, e = (r = this._[t]).length; o < e; ++o) {
        r[o].value.apply(n, i);
      }
    },
    apply: function apply(t, n, e) {
      if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);

      for (var r = this._[t], i = 0, o = r.length; i < o; ++i) {
        r[i].value.apply(n, e);
      }
    }
  };
  var At = "http://www.w3.org/1999/xhtml",
      Tt = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: At,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function St(t) {
    var n = t += "",
        e = n.indexOf(":");
    return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), Tt.hasOwnProperty(n) ? {
      space: Tt[n],
      local: t
    } : t;
  }

  function Et(t) {
    return function () {
      var n = this.ownerDocument,
          e = this.namespaceURI;
      return e === At && n.documentElement.namespaceURI === At ? n.createElement(t) : n.createElementNS(e, t);
    };
  }

  function kt(t) {
    return function () {
      return this.ownerDocument.createElementNS(t.space, t.local);
    };
  }

  function Nt(t) {
    var n = St(t);
    return (n.local ? kt : Et)(n);
  }

  function Ct() {}

  function Pt(t) {
    return null == t ? Ct : function () {
      return this.querySelector(t);
    };
  }

  function zt(t) {
    return null == t ? [] : Array.isArray(t) ? t : Array.from(t);
  }

  function Dt() {
    return [];
  }

  function qt(t) {
    return null == t ? Dt : function () {
      return this.querySelectorAll(t);
    };
  }

  function Rt(t) {
    return function () {
      return this.matches(t);
    };
  }

  function Ft(t) {
    return function (n) {
      return n.matches(t);
    };
  }

  var Ot = Array.prototype.find;

  function It() {
    return this.firstElementChild;
  }

  var Ut = Array.prototype.filter;

  function Bt() {
    return Array.from(this.children);
  }

  function Yt(t) {
    return new Array(t.length);
  }

  function Lt(t, n) {
    this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
  }

  function jt(t) {
    return function () {
      return t;
    };
  }

  function Ht(t, n, e, r, i, o) {
    for (var a, u = 0, c = n.length, f = o.length; u < f; ++u) {
      (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new Lt(t, o[u]);
    }

    for (; u < c; ++u) {
      (a = n[u]) && (i[u] = a);
    }
  }

  function Xt(t, n, e, r, i, o, a) {
    var u,
        c,
        f,
        s = new Map(),
        l = n.length,
        h = o.length,
        d = new Array(l);

    for (u = 0; u < l; ++u) {
      (c = n[u]) && (d[u] = f = a.call(c, c.__data__, u, n) + "", s.has(f) ? i[u] = c : s.set(f, c));
    }

    for (u = 0; u < h; ++u) {
      f = a.call(t, o[u], u, o) + "", (c = s.get(f)) ? (r[u] = c, c.__data__ = o[u], s["delete"](f)) : e[u] = new Lt(t, o[u]);
    }

    for (u = 0; u < l; ++u) {
      (c = n[u]) && s.get(d[u]) === c && (i[u] = c);
    }
  }

  function Gt(t) {
    return t.__data__;
  }

  function Vt(t) {
    return "object" == _typeof(t) && "length" in t ? t : Array.from(t);
  }

  function $t(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }

  function Wt(t) {
    return function () {
      this.removeAttribute(t);
    };
  }

  function Zt(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }

  function Kt(t, n) {
    return function () {
      this.setAttribute(t, n);
    };
  }

  function Qt(t, n) {
    return function () {
      this.setAttributeNS(t.space, t.local, n);
    };
  }

  function Jt(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
  }

  function tn(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
    };
  }

  function nn(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
  }

  function en(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }

  function rn(t, n, e) {
    return function () {
      this.style.setProperty(t, n, e);
    };
  }

  function on(t, n, e) {
    return function () {
      var r = n.apply(this, arguments);
      null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
    };
  }

  function an(t, n) {
    return t.style.getPropertyValue(n) || nn(t).getComputedStyle(t, null).getPropertyValue(n);
  }

  function un(t) {
    return function () {
      delete this[t];
    };
  }

  function cn(t, n) {
    return function () {
      this[t] = n;
    };
  }

  function fn(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? delete this[t] : this[t] = e;
    };
  }

  function sn(t) {
    return t.trim().split(/^|\s+/);
  }

  function ln(t) {
    return t.classList || new hn(t);
  }

  function hn(t) {
    this._node = t, this._names = sn(t.getAttribute("class") || "");
  }

  function dn(t, n) {
    for (var e = ln(t), r = -1, i = n.length; ++r < i;) {
      e.add(n[r]);
    }
  }

  function pn(t, n) {
    for (var e = ln(t), r = -1, i = n.length; ++r < i;) {
      e.remove(n[r]);
    }
  }

  function gn(t) {
    return function () {
      dn(this, t);
    };
  }

  function yn(t) {
    return function () {
      pn(this, t);
    };
  }

  function vn(t, n) {
    return function () {
      (n.apply(this, arguments) ? dn : pn)(this, t);
    };
  }

  function _n() {
    this.textContent = "";
  }

  function bn(t) {
    return function () {
      this.textContent = t;
    };
  }

  function mn(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.textContent = null == n ? "" : n;
    };
  }

  function xn() {
    this.innerHTML = "";
  }

  function wn(t) {
    return function () {
      this.innerHTML = t;
    };
  }

  function Mn(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.innerHTML = null == n ? "" : n;
    };
  }

  function An() {
    this.nextSibling && this.parentNode.appendChild(this);
  }

  function Tn() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function Sn() {
    return null;
  }

  function En() {
    var t = this.parentNode;
    t && t.removeChild(this);
  }

  function kn() {
    var t = this.cloneNode(!1),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }

  function Nn() {
    var t = this.cloneNode(!0),
        n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }

  function Cn(t) {
    return t.trim().split(/^|\s+/).map(function (t) {
      var n = "",
          e = t.indexOf(".");
      return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
        type: t,
        name: n
      };
    });
  }

  function Pn(t) {
    return function () {
      var n = this.__on;

      if (n) {
        for (var e, r = 0, i = -1, o = n.length; r < o; ++r) {
          e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.options);
        }

        ++i ? n.length = i : delete this.__on;
      }
    };
  }

  function zn(t, n, e) {
    return function () {
      var r,
          i = this.__on,
          o = function (t) {
        return function (n) {
          t.call(this, n, this.__data__);
        };
      }(n);

      if (i) for (var a = 0, u = i.length; a < u; ++a) {
        if ((r = i[a]).type === t.type && r.name === t.name) return this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = e), void (r.value = n);
      }
      this.addEventListener(t.type, o, e), r = {
        type: t.type,
        name: t.name,
        value: n,
        listener: o,
        options: e
      }, i ? i.push(r) : this.__on = [r];
    };
  }

  function Dn(t, n, e) {
    var r = nn(t),
        i = r.CustomEvent;
    "function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
  }

  function qn(t, n) {
    return function () {
      return Dn(this, t, n);
    };
  }

  function Rn(t, n) {
    return function () {
      return Dn(this, t, n.apply(this, arguments));
    };
  }

  Lt.prototype = {
    constructor: Lt,
    appendChild: function appendChild(t) {
      return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function insertBefore(t, n) {
      return this._parent.insertBefore(t, n);
    },
    querySelector: function querySelector(t) {
      return this._parent.querySelector(t);
    },
    querySelectorAll: function querySelectorAll(t) {
      return this._parent.querySelectorAll(t);
    }
  }, hn.prototype = {
    add: function add(t) {
      this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function remove(t) {
      var n = this._names.indexOf(t);

      n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function contains(t) {
      return this._names.indexOf(t) >= 0;
    }
  };
  var Fn = [null];

  function On(t, n) {
    this._groups = t, this._parents = n;
  }

  function In() {
    return new On([[document.documentElement]], Fn);
  }

  function Un(t) {
    return "string" == typeof t ? new On([[document.querySelector(t)]], [document.documentElement]) : new On([[t]], Fn);
  }

  On.prototype = In.prototype = _defineProperty({
    constructor: On,
    select: function select(t) {
      "function" != typeof t && (t = Pt(t));

      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a, u = n[i], c = u.length, f = r[i] = new Array(c), s = 0; s < c; ++s) {
          (o = u[s]) && (a = t.call(o, o.__data__, s, u)) && ("__data__" in o && (a.__data__ = o.__data__), f[s] = a);
        }
      }

      return new On(r, this._parents);
    },
    selectAll: function selectAll(t) {
      t = "function" == typeof t ? function (t) {
        return function () {
          return zt(t.apply(this, arguments));
        };
      }(t) : qt(t);

      for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o) {
        for (var a, u = n[o], c = u.length, f = 0; f < c; ++f) {
          (a = u[f]) && (r.push(t.call(a, a.__data__, f, u)), i.push(a));
        }
      }

      return new On(r, i);
    },
    selectChild: function selectChild(t) {
      return this.select(null == t ? It : function (t) {
        return function () {
          return Ot.call(this.children, t);
        };
      }("function" == typeof t ? t : Ft(t)));
    },
    selectChildren: function selectChildren(t) {
      return this.selectAll(null == t ? Bt : function (t) {
        return function () {
          return Ut.call(this.children, t);
        };
      }("function" == typeof t ? t : Ft(t)));
    },
    filter: function filter(t) {
      "function" != typeof t && (t = Rt(t));

      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f) {
          (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
        }
      }

      return new On(r, this._parents);
    },
    data: function data(t, n) {
      if (!arguments.length) return Array.from(this, Gt);
      var e = n ? Xt : Ht,
          r = this._parents,
          i = this._groups;
      "function" != typeof t && (t = jt(t));

      for (var o = i.length, a = new Array(o), u = new Array(o), c = new Array(o), f = 0; f < o; ++f) {
        var s = r[f],
            l = i[f],
            h = l.length,
            d = Vt(t.call(s, s && s.__data__, f, r)),
            p = d.length,
            g = u[f] = new Array(p),
            y = a[f] = new Array(p),
            v = c[f] = new Array(h);
        e(s, l, g, y, v, d, n);

        for (var _, b, m = 0, x = 0; m < p; ++m) {
          if (_ = g[m]) {
            for (m >= x && (x = m + 1); !(b = y[x]) && ++x < p;) {
              ;
            }

            _._next = b || null;
          }
        }
      }

      return (a = new On(a, r))._enter = u, a._exit = c, a;
    },
    enter: function enter() {
      return new On(this._enter || this._groups.map(Yt), this._parents);
    },
    exit: function exit() {
      return new On(this._exit || this._groups.map(Yt), this._parents);
    },
    join: function join(t, n, e) {
      var r = this.enter(),
          i = this,
          o = this.exit();
      return "function" == typeof t ? (r = t(r)) && (r = r.selection()) : r = r.append(t + ""), null != n && (i = n(i)) && (i = i.selection()), null == e ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
    },
    merge: function merge(t) {
      for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, a = Math.min(i, o), u = new Array(i), c = 0; c < a; ++c) {
        for (var f, s = e[c], l = r[c], h = s.length, d = u[c] = new Array(h), p = 0; p < h; ++p) {
          (f = s[p] || l[p]) && (d[p] = f);
        }
      }

      for (; c < i; ++c) {
        u[c] = e[c];
      }

      return new On(u, this._parents);
    },
    selection: function selection() {
      return this;
    },
    order: function order() {
      for (var t = this._groups, n = -1, e = t.length; ++n < e;) {
        for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0;) {
          (r = i[o]) && (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), a = r);
        }
      }

      return this;
    },
    sort: function sort(t) {
      function n(n, e) {
        return n && e ? t(n.__data__, e.__data__) : !n - !e;
      }

      t || (t = $t);

      for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
        for (var a, u = e[o], c = u.length, f = i[o] = new Array(c), s = 0; s < c; ++s) {
          (a = u[s]) && (f[s] = a);
        }

        f.sort(n);
      }

      return new On(i, this._parents).order();
    },
    call: function call() {
      var t = arguments[0];
      return arguments[0] = this, t.apply(null, arguments), this;
    },
    nodes: function nodes() {
      return Array.from(this);
    },
    node: function node() {
      for (var t = this._groups, n = 0, e = t.length; n < e; ++n) {
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
          var a = r[i];
          if (a) return a;
        }
      }

      return null;
    },
    size: function size() {
      var t = 0;

      var _iterator25 = _createForOfIteratorHelper(this),
          _step25;

      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var _n20 = _step25.value;
          ++t;
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }

      return t;
    },
    empty: function empty() {
      return !this.node();
    },
    each: function each(t) {
      for (var n = this._groups, e = 0, r = n.length; e < r; ++e) {
        for (var i, o = n[e], a = 0, u = o.length; a < u; ++a) {
          (i = o[a]) && t.call(i, i.__data__, a, o);
        }
      }

      return this;
    },
    attr: function attr(t, n) {
      var e = St(t);

      if (arguments.length < 2) {
        var r = this.node();
        return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
      }

      return this.each((null == n ? e.local ? Zt : Wt : "function" == typeof n ? e.local ? tn : Jt : e.local ? Qt : Kt)(e, n));
    },
    style: function style(t, n, e) {
      return arguments.length > 1 ? this.each((null == n ? en : "function" == typeof n ? on : rn)(t, n, null == e ? "" : e)) : an(this.node(), t);
    },
    property: function property(t, n) {
      return arguments.length > 1 ? this.each((null == n ? un : "function" == typeof n ? fn : cn)(t, n)) : this.node()[t];
    },
    classed: function classed(t, n) {
      var e = sn(t + "");

      if (arguments.length < 2) {
        for (var r = ln(this.node()), i = -1, o = e.length; ++i < o;) {
          if (!r.contains(e[i])) return !1;
        }

        return !0;
      }

      return this.each(("function" == typeof n ? vn : n ? gn : yn)(e, n));
    },
    text: function text(t) {
      return arguments.length ? this.each(null == t ? _n : ("function" == typeof t ? mn : bn)(t)) : this.node().textContent;
    },
    html: function html(t) {
      return arguments.length ? this.each(null == t ? xn : ("function" == typeof t ? Mn : wn)(t)) : this.node().innerHTML;
    },
    raise: function raise() {
      return this.each(An);
    },
    lower: function lower() {
      return this.each(Tn);
    },
    append: function append(t) {
      var n = "function" == typeof t ? t : Nt(t);
      return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
      });
    },
    insert: function insert(t, n) {
      var e = "function" == typeof t ? t : Nt(t),
          r = null == n ? Sn : "function" == typeof n ? n : Pt(n);
      return this.select(function () {
        return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
      });
    },
    remove: function remove() {
      return this.each(En);
    },
    clone: function clone(t) {
      return this.select(t ? Nn : kn);
    },
    datum: function datum(t) {
      return arguments.length ? this.property("__data__", t) : this.node().__data__;
    },
    on: function on(t, n, e) {
      var r,
          i,
          o = Cn(t + ""),
          a = o.length;

      if (!(arguments.length < 2)) {
        for (u = n ? zn : Pn, r = 0; r < a; ++r) {
          this.each(u(o[r], n, e));
        }

        return this;
      }

      var u = this.node().__on;

      if (u) for (var c, f = 0, s = u.length; f < s; ++f) {
        for (r = 0, c = u[f]; r < a; ++r) {
          if ((i = o[r]).type === c.type && i.name === c.name) return c.value;
        }
      }
    },
    dispatch: function dispatch(t, n) {
      return this.each(("function" == typeof n ? Rn : qn)(t, n));
    }
  }, Symbol.iterator, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var t, n, e, r, i, o, a;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t = this._groups, n = 0, e = t.length;

          case 1:
            if (!(n < e)) {
              _context3.next = 14;
              break;
            }

            i = t[n], o = 0, a = i.length;

          case 3:
            if (!(o < a)) {
              _context3.next = 11;
              break;
            }

            _context3.t0 = r = i[o];

            if (!_context3.t0) {
              _context3.next = 8;
              break;
            }

            _context3.next = 8;
            return r;

          case 8:
            ++o;
            _context3.next = 3;
            break;

          case 11:
            ++n;
            _context3.next = 1;
            break;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  var Bn = 0;

  function Yn() {
    return new Ln();
  }

  function Ln() {
    this._ = "@" + (++Bn).toString(36);
  }

  function jn(t) {
    var n;

    for (; n = t.sourceEvent;) {
      t = n;
    }

    return t;
  }

  function Hn(t, n) {
    if (t = jn(t), void 0 === n && (n = t.currentTarget), n) {
      var e = n.ownerSVGElement || n;

      if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        return r.x = t.clientX, r.y = t.clientY, [(r = r.matrixTransform(n.getScreenCTM().inverse())).x, r.y];
      }

      if (n.getBoundingClientRect) {
        var i = n.getBoundingClientRect();
        return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop];
      }
    }

    return [t.pageX, t.pageY];
  }

  Ln.prototype = Yn.prototype = {
    constructor: Ln,
    get: function get(t) {
      for (var n = this._; !(n in t);) {
        if (!(t = t.parentNode)) return;
      }

      return t[n];
    },
    set: function set(t, n) {
      return t[this._] = n;
    },
    remove: function remove(t) {
      return this._ in t && delete t[this._];
    },
    toString: function toString() {
      return this._;
    }
  };
  var Xn = {
    passive: !1
  },
      Gn = {
    capture: !0,
    passive: !1
  };

  function Vn(t) {
    t.stopImmediatePropagation();
  }

  function $n(t) {
    t.preventDefault(), t.stopImmediatePropagation();
  }

  function Wn(t) {
    var n = t.document.documentElement,
        e = Un(t).on("dragstart.drag", $n, Gn);
    "onselectstart" in n ? e.on("selectstart.drag", $n, Gn) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
  }

  function Zn(t, n) {
    var e = t.document.documentElement,
        r = Un(t).on("dragstart.drag", null);
    n && (r.on("click.drag", $n, Gn), setTimeout(function () {
      r.on("click.drag", null);
    }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
  }

  var Kn = function Kn(t) {
    return function () {
      return t;
    };
  };

  function Qn(t, _ref6) {
    var n = _ref6.sourceEvent,
        e = _ref6.subject,
        r = _ref6.target,
        i = _ref6.identifier,
        o = _ref6.active,
        a = _ref6.x,
        u = _ref6.y,
        c = _ref6.dx,
        f = _ref6.dy,
        s = _ref6.dispatch;
    Object.defineProperties(this, {
      type: {
        value: t,
        enumerable: !0,
        configurable: !0
      },
      sourceEvent: {
        value: n,
        enumerable: !0,
        configurable: !0
      },
      subject: {
        value: e,
        enumerable: !0,
        configurable: !0
      },
      target: {
        value: r,
        enumerable: !0,
        configurable: !0
      },
      identifier: {
        value: i,
        enumerable: !0,
        configurable: !0
      },
      active: {
        value: o,
        enumerable: !0,
        configurable: !0
      },
      x: {
        value: a,
        enumerable: !0,
        configurable: !0
      },
      y: {
        value: u,
        enumerable: !0,
        configurable: !0
      },
      dx: {
        value: c,
        enumerable: !0,
        configurable: !0
      },
      dy: {
        value: f,
        enumerable: !0,
        configurable: !0
      },
      _: {
        value: s
      }
    });
  }

  function Jn(t) {
    return !t.ctrlKey && !t.button;
  }

  function te() {
    return this.parentNode;
  }

  function ne(t, n) {
    return null == n ? {
      x: t.x,
      y: t.y
    } : n;
  }

  function ee() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }

  function re(t, n, e) {
    t.prototype = n.prototype = e, e.constructor = t;
  }

  function ie(t, n) {
    var e = Object.create(t.prototype);

    for (var r in n) {
      e[r] = n[r];
    }

    return e;
  }

  function oe() {}

  Qn.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);

    return t === this._ ? this : t;
  };

  var ae = .7,
      ue = 1 / ae,
      ce = "\\s*([+-]?\\d+)\\s*",
      fe = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      se = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      le = /^#([0-9a-f]{3,8})$/,
      he = new RegExp("^rgb\\(" + [ce, ce, ce] + "\\)$"),
      de = new RegExp("^rgb\\(" + [se, se, se] + "\\)$"),
      pe = new RegExp("^rgba\\(" + [ce, ce, ce, fe] + "\\)$"),
      ge = new RegExp("^rgba\\(" + [se, se, se, fe] + "\\)$"),
      ye = new RegExp("^hsl\\(" + [fe, se, se] + "\\)$"),
      ve = new RegExp("^hsla\\(" + [fe, se, se, fe] + "\\)$"),
      _e = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };

  function be() {
    return this.rgb().formatHex();
  }

  function me() {
    return this.rgb().formatRgb();
  }

  function xe(t) {
    var n, e;
    return t = (t + "").trim().toLowerCase(), (n = le.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), 6 === e ? we(n) : 3 === e ? new Se(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : 8 === e ? Me(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) : 4 === e ? Me(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) : (n = he.exec(t)) ? new Se(n[1], n[2], n[3], 1) : (n = de.exec(t)) ? new Se(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = pe.exec(t)) ? Me(n[1], n[2], n[3], n[4]) : (n = ge.exec(t)) ? Me(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = ye.exec(t)) ? Ce(n[1], n[2] / 100, n[3] / 100, 1) : (n = ve.exec(t)) ? Ce(n[1], n[2] / 100, n[3] / 100, n[4]) : _e.hasOwnProperty(t) ? we(_e[t]) : "transparent" === t ? new Se(NaN, NaN, NaN, 0) : null;
  }

  function we(t) {
    return new Se(t >> 16 & 255, t >> 8 & 255, 255 & t, 1);
  }

  function Me(t, n, e, r) {
    return r <= 0 && (t = n = e = NaN), new Se(t, n, e, r);
  }

  function Ae(t) {
    return t instanceof oe || (t = xe(t)), t ? new Se((t = t.rgb()).r, t.g, t.b, t.opacity) : new Se();
  }

  function Te(t, n, e, r) {
    return 1 === arguments.length ? Ae(t) : new Se(t, n, e, null == r ? 1 : r);
  }

  function Se(t, n, e, r) {
    this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
  }

  function Ee() {
    return "#" + Ne(this.r) + Ne(this.g) + Ne(this.b);
  }

  function ke() {
    var t = this.opacity;
    return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")");
  }

  function Ne(t) {
    return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16);
  }

  function Ce(t, n, e, r) {
    return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new De(t, n, e, r);
  }

  function Pe(t) {
    if (t instanceof De) return new De(t.h, t.s, t.l, t.opacity);
    if (t instanceof oe || (t = xe(t)), !t) return new De();
    if (t instanceof De) return t;
    var n = (t = t.rgb()).r / 255,
        e = t.g / 255,
        r = t.b / 255,
        i = Math.min(n, e, r),
        o = Math.max(n, e, r),
        a = NaN,
        u = o - i,
        c = (o + i) / 2;
    return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4, u /= c < .5 ? o + i : 2 - o - i, a *= 60) : u = c > 0 && c < 1 ? 0 : a, new De(a, u, c, t.opacity);
  }

  function ze(t, n, e, r) {
    return 1 === arguments.length ? Pe(t) : new De(t, n, e, null == r ? 1 : r);
  }

  function De(t, n, e, r) {
    this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
  }

  function qe(t, n, e) {
    return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n);
  }

  re(oe, xe, {
    copy: function copy(t) {
      return Object.assign(new this.constructor(), this, t);
    },
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: be,
    formatHex: be,
    formatHsl: function formatHsl() {
      return Pe(this).formatHsl();
    },
    formatRgb: me,
    toString: me
  }), re(Se, Te, ie(oe, {
    brighter: function brighter(t) {
      return t = null == t ? ue : Math.pow(ue, t), new Se(this.r * t, this.g * t, this.b * t, this.opacity);
    },
    darker: function darker(t) {
      return t = null == t ? ae : Math.pow(ae, t), new Se(this.r * t, this.g * t, this.b * t, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: Ee,
    formatHex: Ee,
    formatRgb: ke,
    toString: ke
  })), re(De, ze, ie(oe, {
    brighter: function brighter(t) {
      return t = null == t ? ue : Math.pow(ue, t), new De(this.h, this.s, this.l * t, this.opacity);
    },
    darker: function darker(t) {
      return t = null == t ? ae : Math.pow(ae, t), new De(this.h, this.s, this.l * t, this.opacity);
    },
    rgb: function rgb() {
      var t = this.h % 360 + 360 * (this.h < 0),
          n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
          e = this.l,
          r = e + (e < .5 ? e : 1 - e) * n,
          i = 2 * e - r;
      return new Se(qe(t >= 240 ? t - 240 : t + 120, i, r), qe(t, i, r), qe(t < 120 ? t + 240 : t - 120, i, r), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function formatHsl() {
      var t = this.opacity;
      return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")");
    }
  }));
  var Re = Math.PI / 180,
      Fe = 180 / Math.PI,
      Oe = .96422,
      Ie = .82521,
      Ue = 4 / 29,
      Be = 6 / 29,
      Ye = 3 * Be * Be;

  function Le(t) {
    if (t instanceof He) return new He(t.l, t.a, t.b, t.opacity);
    if (t instanceof Ke) return Qe(t);
    t instanceof Se || (t = Ae(t));
    var n,
        e,
        r = $e(t.r),
        i = $e(t.g),
        o = $e(t.b),
        a = Xe((.2225045 * r + .7168786 * i + .0606169 * o) / 1);
    return r === i && i === o ? n = e = a : (n = Xe((.4360747 * r + .3850649 * i + .1430804 * o) / Oe), e = Xe((.0139322 * r + .0971045 * i + .7141733 * o) / Ie)), new He(116 * a - 16, 500 * (n - a), 200 * (a - e), t.opacity);
  }

  function je(t, n, e, r) {
    return 1 === arguments.length ? Le(t) : new He(t, n, e, null == r ? 1 : r);
  }

  function He(t, n, e, r) {
    this.l = +t, this.a = +n, this.b = +e, this.opacity = +r;
  }

  function Xe(t) {
    return t > .008856451679035631 ? Math.pow(t, 1 / 3) : t / Ye + Ue;
  }

  function Ge(t) {
    return t > Be ? t * t * t : Ye * (t - Ue);
  }

  function Ve(t) {
    return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055);
  }

  function $e(t) {
    return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);
  }

  function We(t) {
    if (t instanceof Ke) return new Ke(t.h, t.c, t.l, t.opacity);
    if (t instanceof He || (t = Le(t)), 0 === t.a && 0 === t.b) return new Ke(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
    var n = Math.atan2(t.b, t.a) * Fe;
    return new Ke(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
  }

  function Ze(t, n, e, r) {
    return 1 === arguments.length ? We(t) : new Ke(t, n, e, null == r ? 1 : r);
  }

  function Ke(t, n, e, r) {
    this.h = +t, this.c = +n, this.l = +e, this.opacity = +r;
  }

  function Qe(t) {
    if (isNaN(t.h)) return new He(t.l, 0, 0, t.opacity);
    var n = t.h * Re;
    return new He(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
  }

  re(He, je, ie(oe, {
    brighter: function brighter(t) {
      return new He(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
    },
    darker: function darker(t) {
      return new He(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var t = (this.l + 16) / 116,
          n = isNaN(this.a) ? t : t + this.a / 500,
          e = isNaN(this.b) ? t : t - this.b / 200;
      return new Se(Ve(3.1338561 * (n = Oe * Ge(n)) - 1.6168667 * (t = 1 * Ge(t)) - .4906146 * (e = Ie * Ge(e))), Ve(-.9787684 * n + 1.9161415 * t + .033454 * e), Ve(.0719453 * n - .2289914 * t + 1.4052427 * e), this.opacity);
    }
  })), re(Ke, Ze, ie(oe, {
    brighter: function brighter(t) {
      return new Ke(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity);
    },
    darker: function darker(t) {
      return new Ke(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity);
    },
    rgb: function rgb() {
      return Qe(this).rgb();
    }
  }));
  var Je = -.14861,
      tr = 1.78277,
      nr = -.29227,
      er = -.90649,
      rr = 1.97294,
      ir = rr * er,
      or = rr * tr,
      ar = tr * nr - er * Je;

  function ur(t) {
    if (t instanceof fr) return new fr(t.h, t.s, t.l, t.opacity);
    t instanceof Se || (t = Ae(t));
    var n = t.r / 255,
        e = t.g / 255,
        r = t.b / 255,
        i = (ar * r + ir * n - or * e) / (ar + ir - or),
        o = r - i,
        a = (rr * (e - i) - nr * o) / er,
        u = Math.sqrt(a * a + o * o) / (rr * i * (1 - i)),
        c = u ? Math.atan2(a, o) * Fe - 120 : NaN;
    return new fr(c < 0 ? c + 360 : c, u, i, t.opacity);
  }

  function cr(t, n, e, r) {
    return 1 === arguments.length ? ur(t) : new fr(t, n, e, null == r ? 1 : r);
  }

  function fr(t, n, e, r) {
    this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
  }

  function sr(t, n, e, r, i) {
    var o = t * t,
        a = o * t;
    return ((1 - 3 * t + 3 * o - a) * n + (4 - 6 * o + 3 * a) * e + (1 + 3 * t + 3 * o - 3 * a) * r + a * i) / 6;
  }

  function lr(t) {
    var n = t.length - 1;
    return function (e) {
      var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n),
          i = t[r],
          o = t[r + 1],
          a = r > 0 ? t[r - 1] : 2 * i - o,
          u = r < n - 1 ? t[r + 2] : 2 * o - i;
      return sr((e - r / n) * n, a, i, o, u);
    };
  }

  function hr(t) {
    var n = t.length;
    return function (e) {
      var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
          i = t[(r + n - 1) % n],
          o = t[r % n],
          a = t[(r + 1) % n],
          u = t[(r + 2) % n];
      return sr((e - r / n) * n, i, o, a, u);
    };
  }

  re(fr, cr, ie(oe, {
    brighter: function brighter(t) {
      return t = null == t ? ue : Math.pow(ue, t), new fr(this.h, this.s, this.l * t, this.opacity);
    },
    darker: function darker(t) {
      return t = null == t ? ae : Math.pow(ae, t), new fr(this.h, this.s, this.l * t, this.opacity);
    },
    rgb: function rgb() {
      var t = isNaN(this.h) ? 0 : (this.h + 120) * Re,
          n = +this.l,
          e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
          r = Math.cos(t),
          i = Math.sin(t);
      return new Se(255 * (n + e * (Je * r + tr * i)), 255 * (n + e * (nr * r + er * i)), 255 * (n + e * (rr * r)), this.opacity);
    }
  }));

  var dr = function dr(t) {
    return function () {
      return t;
    };
  };

  function pr(t, n) {
    return function (e) {
      return t + e * n;
    };
  }

  function gr(t, n) {
    var e = n - t;
    return e ? pr(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : dr(isNaN(t) ? n : t);
  }

  function yr(t) {
    return 1 == (t = +t) ? vr : function (n, e) {
      return e - n ? function (t, n, e) {
        return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function (r) {
          return Math.pow(t + r * n, e);
        };
      }(n, e, t) : dr(isNaN(n) ? e : n);
    };
  }

  function vr(t, n) {
    var e = n - t;
    return e ? pr(t, e) : dr(isNaN(t) ? n : t);
  }

  var _r = function t(n) {
    var e = yr(n);

    function r(t, n) {
      var r = e((t = Te(t)).r, (n = Te(n)).r),
          i = e(t.g, n.g),
          o = e(t.b, n.b),
          a = vr(t.opacity, n.opacity);
      return function (n) {
        return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = a(n), t + "";
      };
    }

    return r.gamma = t, r;
  }(1);

  function br(t) {
    return function (n) {
      var e,
          r,
          i = n.length,
          o = new Array(i),
          a = new Array(i),
          u = new Array(i);

      for (e = 0; e < i; ++e) {
        r = Te(n[e]), o[e] = r.r || 0, a[e] = r.g || 0, u[e] = r.b || 0;
      }

      return o = t(o), a = t(a), u = t(u), r.opacity = 1, function (t) {
        return r.r = o(t), r.g = a(t), r.b = u(t), r + "";
      };
    };
  }

  var mr = br(lr),
      xr = br(hr);

  function wr(t, n) {
    n || (n = []);
    var e,
        r = t ? Math.min(n.length, t.length) : 0,
        i = n.slice();
    return function (o) {
      for (e = 0; e < r; ++e) {
        i[e] = t[e] * (1 - o) + n[e] * o;
      }

      return i;
    };
  }

  function Mr(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
  }

  function Ar(t, n) {
    var e,
        r = n ? n.length : 0,
        i = t ? Math.min(r, t.length) : 0,
        o = new Array(i),
        a = new Array(r);

    for (e = 0; e < i; ++e) {
      o[e] = Pr(t[e], n[e]);
    }

    for (; e < r; ++e) {
      a[e] = n[e];
    }

    return function (t) {
      for (e = 0; e < i; ++e) {
        a[e] = o[e](t);
      }

      return a;
    };
  }

  function Tr(t, n) {
    var e = new Date();
    return t = +t, n = +n, function (r) {
      return e.setTime(t * (1 - r) + n * r), e;
    };
  }

  function Sr(t, n) {
    return t = +t, n = +n, function (e) {
      return t * (1 - e) + n * e;
    };
  }

  function Er(t, n) {
    var e,
        r = {},
        i = {};

    for (e in null !== t && "object" == _typeof(t) || (t = {}), null !== n && "object" == _typeof(n) || (n = {}), n) {
      e in t ? r[e] = Pr(t[e], n[e]) : i[e] = n[e];
    }

    return function (t) {
      for (e in r) {
        i[e] = r[e](t);
      }

      return i;
    };
  }

  var kr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      Nr = new RegExp(kr.source, "g");

  function Cr(t, n) {
    var e,
        r,
        i,
        o = kr.lastIndex = Nr.lastIndex = 0,
        a = -1,
        u = [],
        c = [];

    for (t += "", n += ""; (e = kr.exec(t)) && (r = Nr.exec(n));) {
      (i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, c.push({
        i: a,
        x: Sr(e, r)
      })), o = Nr.lastIndex;
    }

    return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? c[0] ? function (t) {
      return function (n) {
        return t(n) + "";
      };
    }(c[0].x) : function (t) {
      return function () {
        return t;
      };
    }(n) : (n = c.length, function (t) {
      for (var e, r = 0; r < n; ++r) {
        u[(e = c[r]).i] = e.x(t);
      }

      return u.join("");
    });
  }

  function Pr(t, n) {
    var e,
        r = _typeof(n);

    return null == n || "boolean" === r ? dr(n) : ("number" === r ? Sr : "string" === r ? (e = xe(n)) ? (n = e, _r) : Cr : n instanceof xe ? _r : n instanceof Date ? Tr : Mr(n) ? wr : Array.isArray(n) ? Ar : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? Er : Sr)(t, n);
  }

  function zr(t, n) {
    return t = +t, n = +n, function (e) {
      return Math.round(t * (1 - e) + n * e);
    };
  }

  var Dr,
      qr = 180 / Math.PI,
      Rr = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function Fr(t, n, e, r, i, o) {
    var a, u, c;
    return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (c = t * e + n * r) && (e -= t * c, r -= n * c), (u = Math.sqrt(e * e + r * r)) && (e /= u, r /= u, c /= u), t * r < n * e && (t = -t, n = -n, c = -c, a = -a), {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * qr,
      skewX: Math.atan(c) * qr,
      scaleX: a,
      scaleY: u
    };
  }

  function Or(t, n, e, r) {
    function i(t) {
      return t.length ? t.pop() + " " : "";
    }

    return function (o, a) {
      var u = [],
          c = [];
      return o = t(o), a = t(a), function (t, r, i, o, a, u) {
        if (t !== i || r !== o) {
          var c = a.push("translate(", null, n, null, e);
          u.push({
            i: c - 4,
            x: Sr(t, i)
          }, {
            i: c - 2,
            x: Sr(r, o)
          });
        } else (i || o) && a.push("translate(" + i + n + o + e);
      }(o.translateX, o.translateY, a.translateX, a.translateY, u, c), function (t, n, e, o) {
        t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
          i: e.push(i(e) + "rotate(", null, r) - 2,
          x: Sr(t, n)
        })) : n && e.push(i(e) + "rotate(" + n + r);
      }(o.rotate, a.rotate, u, c), function (t, n, e, o) {
        t !== n ? o.push({
          i: e.push(i(e) + "skewX(", null, r) - 2,
          x: Sr(t, n)
        }) : n && e.push(i(e) + "skewX(" + n + r);
      }(o.skewX, a.skewX, u, c), function (t, n, e, r, o, a) {
        if (t !== e || n !== r) {
          var u = o.push(i(o) + "scale(", null, ",", null, ")");
          a.push({
            i: u - 4,
            x: Sr(t, e)
          }, {
            i: u - 2,
            x: Sr(n, r)
          });
        } else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")");
      }(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, c), o = a = null, function (t) {
        for (var n, e = -1, r = c.length; ++e < r;) {
          u[(n = c[e]).i] = n.x(t);
        }

        return u.join("");
      };
    };
  }

  var Ir = Or(function (t) {
    var n = new ("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(t + "");
    return n.isIdentity ? Rr : Fr(n.a, n.b, n.c, n.d, n.e, n.f);
  }, "px, ", "px)", "deg)"),
      Ur = Or(function (t) {
    return null == t ? Rr : (Dr || (Dr = document.createElementNS("http://www.w3.org/2000/svg", "g")), Dr.setAttribute("transform", t), (t = Dr.transform.baseVal.consolidate()) ? Fr((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : Rr);
  }, ", ", ")", ")");

  function Br(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2;
  }

  var Yr = function t(n, e, r) {
    function i(t, i) {
      var o,
          a,
          u = t[0],
          c = t[1],
          f = t[2],
          s = i[0],
          l = i[1],
          h = i[2],
          d = s - u,
          p = l - c,
          g = d * d + p * p;
      if (g < 1e-12) a = Math.log(h / f) / n, o = function o(t) {
        return [u + t * d, c + t * p, f * Math.exp(n * t * a)];
      };else {
        var y = Math.sqrt(g),
            v = (h * h - f * f + r * g) / (2 * f * e * y),
            _ = (h * h - f * f - r * g) / (2 * h * e * y),
            b = Math.log(Math.sqrt(v * v + 1) - v),
            m = Math.log(Math.sqrt(_ * _ + 1) - _);

        a = (m - b) / n, o = function o(t) {
          var r = t * a,
              i = Br(b),
              o = f / (e * y) * (i * function (t) {
            return ((t = Math.exp(2 * t)) - 1) / (t + 1);
          }(n * r + b) - function (t) {
            return ((t = Math.exp(t)) - 1 / t) / 2;
          }(b));

          return [u + o * d, c + o * p, f * i / Br(n * r + b)];
        };
      }
      return o.duration = 1e3 * a * n / Math.SQRT2, o;
    }

    return i.rho = function (n) {
      var e = Math.max(.001, +n),
          r = e * e;
      return t(e, r, r * r);
    }, i;
  }(Math.SQRT2, 2, 4);

  function Lr(t) {
    return function (n, e) {
      var r = t((n = ze(n)).h, (e = ze(e)).h),
          i = vr(n.s, e.s),
          o = vr(n.l, e.l),
          a = vr(n.opacity, e.opacity);
      return function (t) {
        return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = a(t), n + "";
      };
    };
  }

  var jr = Lr(gr),
      Hr = Lr(vr);

  function Xr(t) {
    return function (n, e) {
      var r = t((n = Ze(n)).h, (e = Ze(e)).h),
          i = vr(n.c, e.c),
          o = vr(n.l, e.l),
          a = vr(n.opacity, e.opacity);
      return function (t) {
        return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = a(t), n + "";
      };
    };
  }

  var Gr = Xr(gr),
      Vr = Xr(vr);

  function $r(t) {
    return function n(e) {
      function r(n, r) {
        var i = t((n = cr(n)).h, (r = cr(r)).h),
            o = vr(n.s, r.s),
            a = vr(n.l, r.l),
            u = vr(n.opacity, r.opacity);
        return function (t) {
          return n.h = i(t), n.s = o(t), n.l = a(Math.pow(t, e)), n.opacity = u(t), n + "";
        };
      }

      return e = +e, r.gamma = n, r;
    }(1);
  }

  var Wr = $r(gr),
      Zr = $r(vr);

  function Kr(t, n) {
    void 0 === n && (n = t, t = Pr);

    for (var e = 0, r = n.length - 1, i = n[0], o = new Array(r < 0 ? 0 : r); e < r;) {
      o[e] = t(i, i = n[++e]);
    }

    return function (t) {
      var n = Math.max(0, Math.min(r - 1, Math.floor(t *= r)));
      return o[n](t - n);
    };
  }

  var Qr,
      Jr,
      ti = 0,
      ni = 0,
      ei = 0,
      ri = 0,
      ii = 0,
      oi = 0,
      ai = "object" == (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && performance.now ? performance : Date,
      ui = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
    setTimeout(t, 17);
  };

  function ci() {
    return ii || (ui(fi), ii = ai.now() + oi);
  }

  function fi() {
    ii = 0;
  }

  function si() {
    this._call = this._time = this._next = null;
  }

  function li(t, n, e) {
    var r = new si();
    return r.restart(t, n, e), r;
  }

  function hi() {
    ci(), ++ti;

    for (var t, n = Qr; n;) {
      (t = ii - n._time) >= 0 && n._call.call(void 0, t), n = n._next;
    }

    --ti;
  }

  function di() {
    ii = (ri = ai.now()) + oi, ti = ni = 0;

    try {
      hi();
    } finally {
      ti = 0, function () {
        var t,
            n,
            e = Qr,
            r = 1 / 0;

        for (; e;) {
          e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Qr = n);
        }

        Jr = t, gi(r);
      }(), ii = 0;
    }
  }

  function pi() {
    var t = ai.now(),
        n = t - ri;
    n > 1e3 && (oi -= n, ri = t);
  }

  function gi(t) {
    ti || (ni && (ni = clearTimeout(ni)), t - ii > 24 ? (t < 1 / 0 && (ni = setTimeout(di, t - ai.now() - oi)), ei && (ei = clearInterval(ei))) : (ei || (ri = ai.now(), ei = setInterval(pi, 1e3)), ti = 1, ui(di)));
  }

  function yi(t, n, e) {
    var r = new si();
    return n = null == n ? 0 : +n, r.restart(function (e) {
      r.stop(), t(e + n);
    }, n, e), r;
  }

  si.prototype = li.prototype = {
    constructor: si,
    restart: function restart(t, n, e) {
      if ("function" != typeof t) throw new TypeError("callback is not a function");
      e = (null == e ? ci() : +e) + (null == n ? 0 : +n), this._next || Jr === this || (Jr ? Jr._next = this : Qr = this, Jr = this), this._call = t, this._time = e, gi();
    },
    stop: function stop() {
      this._call && (this._call = null, this._time = 1 / 0, gi());
    }
  };
  var vi = bt("start", "end", "cancel", "interrupt"),
      _i = [];

  function bi(t, n, e, r, i, o) {
    var a = t.__transition;

    if (a) {
      if (e in a) return;
    } else t.__transition = {};

    !function (t, n, e) {
      var r,
          i = t.__transition;

      function o(t) {
        e.state = 1, e.timer.restart(a, e.delay, e.time), e.delay <= t && a(t - e.delay);
      }

      function a(o) {
        var f, s, l, h;
        if (1 !== e.state) return c();

        for (f in i) {
          if ((h = i[f]).name === e.name) {
            if (3 === h.state) return yi(a);
            4 === h.state ? (h.state = 6, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete i[f]) : +f < n && (h.state = 6, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete i[f]);
          }
        }

        if (yi(function () {
          3 === e.state && (e.state = 4, e.timer.restart(u, e.delay, e.time), u(o));
        }), e.state = 2, e.on.call("start", t, t.__data__, e.index, e.group), 2 === e.state) {
          for (e.state = 3, r = new Array(l = e.tween.length), f = 0, s = -1; f < l; ++f) {
            (h = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (r[++s] = h);
          }

          r.length = s + 1;
        }
      }

      function u(n) {
        for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(c), e.state = 5, 1), o = -1, a = r.length; ++o < a;) {
          r[o].call(t, i);
        }

        5 === e.state && (e.on.call("end", t, t.__data__, e.index, e.group), c());
      }

      function c() {
        for (var r in e.state = 6, e.timer.stop(), delete i[n], i) {
          return;
        }

        delete t.__transition;
      }

      i[n] = e, e.timer = li(o, 0, e.time);
    }(t, e, {
      name: n,
      index: r,
      group: i,
      on: vi,
      tween: _i,
      time: o.time,
      delay: o.delay,
      duration: o.duration,
      ease: o.ease,
      timer: null,
      state: 0
    });
  }

  function mi(t, n) {
    var e = wi(t, n);
    if (e.state > 0) throw new Error("too late; already scheduled");
    return e;
  }

  function xi(t, n) {
    var e = wi(t, n);
    if (e.state > 3) throw new Error("too late; already running");
    return e;
  }

  function wi(t, n) {
    var e = t.__transition;
    if (!e || !(e = e[n])) throw new Error("transition not found");
    return e;
  }

  function Mi(t, n) {
    var e,
        r,
        i,
        o = t.__transition,
        a = !0;

    if (o) {
      for (i in n = null == n ? null : n + "", o) {
        (e = o[i]).name === n ? (r = e.state > 2 && e.state < 5, e.state = 6, e.timer.stop(), e.on.call(r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group), delete o[i]) : a = !1;
      }

      a && delete t.__transition;
    }
  }

  function Ai(t, n) {
    var e, r;
    return function () {
      var i = xi(this, t),
          o = i.tween;
      if (o !== e) for (var a = 0, u = (r = e = o).length; a < u; ++a) {
        if (r[a].name === n) {
          (r = r.slice()).splice(a, 1);
          break;
        }
      }
      i.tween = r;
    };
  }

  function Ti(t, n, e) {
    var r, i;
    if ("function" != typeof e) throw new Error();
    return function () {
      var o = xi(this, t),
          a = o.tween;

      if (a !== r) {
        i = (r = a).slice();

        for (var u = {
          name: n,
          value: e
        }, c = 0, f = i.length; c < f; ++c) {
          if (i[c].name === n) {
            i[c] = u;
            break;
          }
        }

        c === f && i.push(u);
      }

      o.tween = i;
    };
  }

  function Si(t, n, e) {
    var r = t._id;
    return t.each(function () {
      var t = xi(this, r);
      (t.value || (t.value = {}))[n] = e.apply(this, arguments);
    }), function (t) {
      return wi(t, r).value[n];
    };
  }

  function Ei(t, n) {
    var e;
    return ("number" == typeof n ? Sr : n instanceof xe ? _r : (e = xe(n)) ? (n = e, _r) : Cr)(t, n);
  }

  function ki(t) {
    return function () {
      this.removeAttribute(t);
    };
  }

  function Ni(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }

  function Ci(t, n, e) {
    var r,
        i,
        o = e + "";
    return function () {
      var a = this.getAttribute(t);
      return a === o ? null : a === r ? i : i = n(r = a, e);
    };
  }

  function Pi(t, n, e) {
    var r,
        i,
        o = e + "";
    return function () {
      var a = this.getAttributeNS(t.space, t.local);
      return a === o ? null : a === r ? i : i = n(r = a, e);
    };
  }

  function zi(t, n, e) {
    var r, i, o;
    return function () {
      var a,
          u,
          c = e(this);
      if (null != c) return (a = this.getAttribute(t)) === (u = c + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, c));
      this.removeAttribute(t);
    };
  }

  function Di(t, n, e) {
    var r, i, o;
    return function () {
      var a,
          u,
          c = e(this);
      if (null != c) return (a = this.getAttributeNS(t.space, t.local)) === (u = c + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, c));
      this.removeAttributeNS(t.space, t.local);
    };
  }

  function qi(t, n) {
    return function (e) {
      this.setAttribute(t, n.call(this, e));
    };
  }

  function Ri(t, n) {
    return function (e) {
      this.setAttributeNS(t.space, t.local, n.call(this, e));
    };
  }

  function Fi(t, n) {
    var e, r;

    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && Ri(t, i)), e;
    }

    return i._value = n, i;
  }

  function Oi(t, n) {
    var e, r;

    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && qi(t, i)), e;
    }

    return i._value = n, i;
  }

  function Ii(t, n) {
    return function () {
      mi(this, t).delay = +n.apply(this, arguments);
    };
  }

  function Ui(t, n) {
    return n = +n, function () {
      mi(this, t).delay = n;
    };
  }

  function Bi(t, n) {
    return function () {
      xi(this, t).duration = +n.apply(this, arguments);
    };
  }

  function Yi(t, n) {
    return n = +n, function () {
      xi(this, t).duration = n;
    };
  }

  function Li(t, n) {
    if ("function" != typeof n) throw new Error();
    return function () {
      xi(this, t).ease = n;
    };
  }

  function ji(t, n, e) {
    var r,
        i,
        o = function (t) {
      return (t + "").trim().split(/^|\s+/).every(function (t) {
        var n = t.indexOf(".");
        return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
      });
    }(n) ? mi : xi;
    return function () {
      var a = o(this, t),
          u = a.on;
      u !== r && (i = (r = u).copy()).on(n, e), a.on = i;
    };
  }

  var Hi = In.prototype.constructor;

  function Xi(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }

  function Gi(t, n, e) {
    return function (r) {
      this.style.setProperty(t, n.call(this, r), e);
    };
  }

  function Vi(t, n, e) {
    var r, i;

    function o() {
      var o = n.apply(this, arguments);
      return o !== i && (r = (i = o) && Gi(t, o, e)), r;
    }

    return o._value = n, o;
  }

  function $i(t) {
    return function (n) {
      this.textContent = t.call(this, n);
    };
  }

  function Wi(t) {
    var n, e;

    function r() {
      var r = t.apply(this, arguments);
      return r !== e && (n = (e = r) && $i(r)), n;
    }

    return r._value = t, r;
  }

  var Zi = 0;

  function Ki(t, n, e, r) {
    this._groups = t, this._parents = n, this._name = e, this._id = r;
  }

  function Qi(t) {
    return In().transition(t);
  }

  function Ji() {
    return ++Zi;
  }

  var to = In.prototype;
  Ki.prototype = Qi.prototype = _defineProperty({
    constructor: Ki,
    select: function select(t) {
      var n = this._name,
          e = this._id;
      "function" != typeof t && (t = Pt(t));

      for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a) {
        for (var u, c, f = r[a], s = f.length, l = o[a] = new Array(s), h = 0; h < s; ++h) {
          (u = f[h]) && (c = t.call(u, u.__data__, h, f)) && ("__data__" in u && (c.__data__ = u.__data__), l[h] = c, bi(l[h], n, e, h, l, wi(u, e)));
        }
      }

      return new Ki(o, this._parents, n, e);
    },
    selectAll: function selectAll(t) {
      var n = this._name,
          e = this._id;
      "function" != typeof t && (t = qt(t));

      for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u) {
        for (var c, f = r[u], s = f.length, l = 0; l < s; ++l) {
          if (c = f[l]) {
            for (var h, d = t.call(c, c.__data__, l, f), p = wi(c, e), g = 0, y = d.length; g < y; ++g) {
              (h = d[g]) && bi(h, n, e, g, d, p);
            }

            o.push(d), a.push(c);
          }
        }
      }

      return new Ki(o, a, n, e);
    },
    selectChild: to.selectChild,
    selectChildren: to.selectChildren,
    filter: function filter(t) {
      "function" != typeof t && (t = Rt(t));

      for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f) {
          (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
        }
      }

      return new Ki(r, this._parents, this._name, this._id);
    },
    merge: function merge(t) {
      if (t._id !== this._id) throw new Error();

      for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u) {
        for (var c, f = n[u], s = e[u], l = f.length, h = a[u] = new Array(l), d = 0; d < l; ++d) {
          (c = f[d] || s[d]) && (h[d] = c);
        }
      }

      for (; u < r; ++u) {
        a[u] = n[u];
      }

      return new Ki(a, this._parents, this._name, this._id);
    },
    selection: function selection() {
      return new Hi(this._groups, this._parents);
    },
    transition: function transition() {
      for (var t = this._name, n = this._id, e = Ji(), r = this._groups, i = r.length, o = 0; o < i; ++o) {
        for (var a, u = r[o], c = u.length, f = 0; f < c; ++f) {
          if (a = u[f]) {
            var s = wi(a, n);
            bi(a, t, e, f, u, {
              time: s.time + s.delay + s.duration,
              delay: 0,
              duration: s.duration,
              ease: s.ease
            });
          }
        }
      }

      return new Ki(r, this._parents, t, e);
    },
    call: to.call,
    nodes: to.nodes,
    node: to.node,
    size: to.size,
    empty: to.empty,
    each: to.each,
    on: function on(t, n) {
      var e = this._id;
      return arguments.length < 2 ? wi(this.node(), e).on.on(t) : this.each(ji(e, t, n));
    },
    attr: function attr(t, n) {
      var e = St(t),
          r = "transform" === e ? Ur : Ei;
      return this.attrTween(t, "function" == typeof n ? (e.local ? Di : zi)(e, r, Si(this, "attr." + t, n)) : null == n ? (e.local ? Ni : ki)(e) : (e.local ? Pi : Ci)(e, r, n));
    },
    attrTween: function attrTween(t, n) {
      var e = "attr." + t;
      if (arguments.length < 2) return (e = this.tween(e)) && e._value;
      if (null == n) return this.tween(e, null);
      if ("function" != typeof n) throw new Error();
      var r = St(t);
      return this.tween(e, (r.local ? Fi : Oi)(r, n));
    },
    style: function style(t, n, e) {
      var r = "transform" == (t += "") ? Ir : Ei;
      return null == n ? this.styleTween(t, function (t, n) {
        var e, r, i;
        return function () {
          var o = an(this, t),
              a = (this.style.removeProperty(t), an(this, t));
          return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a);
        };
      }(t, r)).on("end.style." + t, Xi(t)) : "function" == typeof n ? this.styleTween(t, function (t, n, e) {
        var r, i, o;
        return function () {
          var a = an(this, t),
              u = e(this),
              c = u + "";
          return null == u && (this.style.removeProperty(t), c = u = an(this, t)), a === c ? null : a === r && c === i ? o : (i = c, o = n(r = a, u));
        };
      }(t, r, Si(this, "style." + t, n))).each(function (t, n) {
        var e,
            r,
            i,
            o,
            a = "style." + n,
            u = "end." + a;
        return function () {
          var c = xi(this, t),
              f = c.on,
              s = null == c.value[a] ? o || (o = Xi(n)) : void 0;
          f === e && i === s || (r = (e = f).copy()).on(u, i = s), c.on = r;
        };
      }(this._id, t)) : this.styleTween(t, function (t, n, e) {
        var r,
            i,
            o = e + "";
        return function () {
          var a = an(this, t);
          return a === o ? null : a === r ? i : i = n(r = a, e);
        };
      }(t, r, n), e).on("end.style." + t, null);
    },
    styleTween: function styleTween(t, n, e) {
      var r = "style." + (t += "");
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == n) return this.tween(r, null);
      if ("function" != typeof n) throw new Error();
      return this.tween(r, Vi(t, n, null == e ? "" : e));
    },
    text: function text(t) {
      return this.tween("text", "function" == typeof t ? function (t) {
        return function () {
          var n = t(this);
          this.textContent = null == n ? "" : n;
        };
      }(Si(this, "text", t)) : function (t) {
        return function () {
          this.textContent = t;
        };
      }(null == t ? "" : t + ""));
    },
    textTween: function textTween(t) {
      var n = "text";
      if (arguments.length < 1) return (n = this.tween(n)) && n._value;
      if (null == t) return this.tween(n, null);
      if ("function" != typeof t) throw new Error();
      return this.tween(n, Wi(t));
    },
    remove: function remove() {
      return this.on("end.remove", function (t) {
        return function () {
          var n = this.parentNode;

          for (var e in this.__transition) {
            if (+e !== t) return;
          }

          n && n.removeChild(this);
        };
      }(this._id));
    },
    tween: function tween(t, n) {
      var e = this._id;

      if (t += "", arguments.length < 2) {
        for (var r, i = wi(this.node(), e).tween, o = 0, a = i.length; o < a; ++o) {
          if ((r = i[o]).name === t) return r.value;
        }

        return null;
      }

      return this.each((null == n ? Ai : Ti)(e, t, n));
    },
    delay: function delay(t) {
      var n = this._id;
      return arguments.length ? this.each(("function" == typeof t ? Ii : Ui)(n, t)) : wi(this.node(), n).delay;
    },
    duration: function duration(t) {
      var n = this._id;
      return arguments.length ? this.each(("function" == typeof t ? Bi : Yi)(n, t)) : wi(this.node(), n).duration;
    },
    ease: function ease(t) {
      var n = this._id;
      return arguments.length ? this.each(Li(n, t)) : wi(this.node(), n).ease;
    },
    easeVarying: function easeVarying(t) {
      if ("function" != typeof t) throw new Error();
      return this.each(function (t, n) {
        return function () {
          var e = n.apply(this, arguments);
          if ("function" != typeof e) throw new Error();
          xi(this, t).ease = e;
        };
      }(this._id, t));
    },
    end: function end() {
      var t,
          n,
          e = this,
          r = e._id,
          i = e.size();
      return new Promise(function (o, a) {
        var u = {
          value: a
        },
            c = {
          value: function value() {
            0 == --i && o();
          }
        };
        e.each(function () {
          var e = xi(this, r),
              i = e.on;
          i !== t && ((n = (t = i).copy())._.cancel.push(u), n._.interrupt.push(u), n._.end.push(c)), e.on = n;
        }), 0 === i && o();
      });
    }
  }, Symbol.iterator, to[Symbol.iterator]);

  function no(t) {
    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
  }

  function eo(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var ro = function t(n) {
    function e(t) {
      return Math.pow(t, n);
    }

    return n = +n, e.exponent = t, e;
  }(3),
      io = function t(n) {
    function e(t) {
      return 1 - Math.pow(1 - t, n);
    }

    return n = +n, e.exponent = t, e;
  }(3),
      oo = function t(n) {
    function e(t) {
      return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2;
    }

    return n = +n, e.exponent = t, e;
  }(3),
      ao = Math.PI,
      uo = ao / 2;

  function co(t) {
    return (1 - Math.cos(ao * t)) / 2;
  }

  function fo(t) {
    return 1.0009775171065494 * (Math.pow(2, -10 * t) - .0009765625);
  }

  function so(t) {
    return ((t *= 2) <= 1 ? fo(1 - t) : 2 - fo(t - 1)) / 2;
  }

  function lo(t) {
    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
  }

  var ho = 4 / 11,
      po = 7.5625;

  function go(t) {
    return (t = +t) < ho ? po * t * t : t < .7272727272727273 ? po * (t -= .5454545454545454) * t + .75 : t < .9090909090909091 ? po * (t -= .8181818181818182) * t + .9375 : po * (t -= .9545454545454546) * t + .984375;
  }

  var yo = 1.70158,
      vo = function t(n) {
    function e(t) {
      return (t = +t) * t * (n * (t - 1) + t);
    }

    return n = +n, e.overshoot = t, e;
  }(yo),
      _o = function t(n) {
    function e(t) {
      return --t * t * ((t + 1) * n + t) + 1;
    }

    return n = +n, e.overshoot = t, e;
  }(yo),
      bo = function t(n) {
    function e(t) {
      return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2;
    }

    return n = +n, e.overshoot = t, e;
  }(yo),
      mo = 2 * Math.PI,
      xo = function t(n, e) {
    var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mo);

    function i(t) {
      return n * fo(- --t) * Math.sin((r - t) / e);
    }

    return i.amplitude = function (n) {
      return t(n, e * mo);
    }, i.period = function (e) {
      return t(n, e);
    }, i;
  }(1, .3),
      wo = function t(n, e) {
    var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mo);

    function i(t) {
      return 1 - n * fo(t = +t) * Math.sin((t + r) / e);
    }

    return i.amplitude = function (n) {
      return t(n, e * mo);
    }, i.period = function (e) {
      return t(n, e);
    }, i;
  }(1, .3),
      Mo = function t(n, e) {
    var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= mo);

    function i(t) {
      return ((t = 2 * t - 1) < 0 ? n * fo(-t) * Math.sin((r - t) / e) : 2 - n * fo(t) * Math.sin((r + t) / e)) / 2;
    }

    return i.amplitude = function (n) {
      return t(n, e * mo);
    }, i.period = function (e) {
      return t(n, e);
    }, i;
  }(1, .3),
      Ao = {
    time: null,
    delay: 0,
    duration: 250,
    ease: eo
  };

  function To(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]);) {
      if (!(t = t.parentNode)) throw new Error("transition ".concat(n, " not found"));
    }

    return e;
  }

  In.prototype.interrupt = function (t) {
    return this.each(function () {
      Mi(this, t);
    });
  }, In.prototype.transition = function (t) {
    var n, e;
    t instanceof Ki ? (n = t._id, t = t._name) : (n = Ji(), (e = Ao).time = ci(), t = null == t ? null : t + "");

    for (var r = this._groups, i = r.length, o = 0; o < i; ++o) {
      for (var a, u = r[o], c = u.length, f = 0; f < c; ++f) {
        (a = u[f]) && bi(a, t, n, f, u, e || To(a, n));
      }
    }

    return new Ki(r, this._parents, t, n);
  };
  var So = [null];

  var Eo = function Eo(t) {
    return function () {
      return t;
    };
  };

  function ko(t, _ref7) {
    var n = _ref7.sourceEvent,
        e = _ref7.target,
        r = _ref7.selection,
        i = _ref7.mode,
        o = _ref7.dispatch;
    Object.defineProperties(this, {
      type: {
        value: t,
        enumerable: !0,
        configurable: !0
      },
      sourceEvent: {
        value: n,
        enumerable: !0,
        configurable: !0
      },
      target: {
        value: e,
        enumerable: !0,
        configurable: !0
      },
      selection: {
        value: r,
        enumerable: !0,
        configurable: !0
      },
      mode: {
        value: i,
        enumerable: !0,
        configurable: !0
      },
      _: {
        value: o
      }
    });
  }

  function No(t) {
    t.stopImmediatePropagation();
  }

  function Co(t) {
    t.preventDefault(), t.stopImmediatePropagation();
  }

  var Po = {
    name: "drag"
  },
      zo = {
    name: "space"
  },
      Do = {
    name: "handle"
  },
      qo = {
    name: "center"
  };
  var Ro = Math.abs,
      Fo = Math.max,
      Oo = Math.min;

  function Io(t) {
    return [+t[0], +t[1]];
  }

  function Uo(t) {
    return [Io(t[0]), Io(t[1])];
  }

  var Bo = {
    name: "x",
    handles: ["w", "e"].map($o),
    input: function input(t, n) {
      return null == t ? null : [[+t[0], n[0][1]], [+t[1], n[1][1]]];
    },
    output: function output(t) {
      return t && [t[0][0], t[1][0]];
    }
  },
      Yo = {
    name: "y",
    handles: ["n", "s"].map($o),
    input: function input(t, n) {
      return null == t ? null : [[n[0][0], +t[0]], [n[1][0], +t[1]]];
    },
    output: function output(t) {
      return t && [t[0][1], t[1][1]];
    }
  },
      Lo = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map($o),
    input: function input(t) {
      return null == t ? null : Uo(t);
    },
    output: function output(t) {
      return t;
    }
  },
      jo = {
    overlay: "crosshair",
    selection: "move",
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  },
      Ho = {
    e: "w",
    w: "e",
    nw: "ne",
    ne: "nw",
    se: "sw",
    sw: "se"
  },
      Xo = {
    n: "s",
    s: "n",
    nw: "sw",
    ne: "se",
    se: "ne",
    sw: "nw"
  },
      Go = {
    overlay: 1,
    selection: 1,
    n: null,
    e: 1,
    s: null,
    w: -1,
    nw: -1,
    ne: 1,
    se: 1,
    sw: -1
  },
      Vo = {
    overlay: 1,
    selection: 1,
    n: -1,
    e: null,
    s: 1,
    w: null,
    nw: -1,
    ne: -1,
    se: 1,
    sw: 1
  };

  function $o(t) {
    return {
      type: t
    };
  }

  function Wo(t) {
    return !t.ctrlKey && !t.button;
  }

  function Zo() {
    var t = this.ownerSVGElement || this;
    return t.hasAttribute("viewBox") ? [[(t = t.viewBox.baseVal).x, t.y], [t.x + t.width, t.y + t.height]] : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]];
  }

  function Ko() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }

  function Qo(t) {
    for (; !t.__brush;) {
      if (!(t = t.parentNode)) return;
    }

    return t.__brush;
  }

  function Jo(t) {
    return t[0][0] === t[1][0] || t[0][1] === t[1][1];
  }

  function ta(t) {
    var n,
        e = Zo,
        r = Wo,
        i = Ko,
        o = !0,
        a = bt("start", "brush", "end"),
        u = 6;

    function c(n) {
      var e = n.property("__brush", g).selectAll(".overlay").data([$o("overlay")]);
      e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", jo.overlay).merge(e).each(function () {
        var t = Qo(this).extent;
        Un(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1]);
      }), n.selectAll(".selection").data([$o("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", jo.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
      var r = n.selectAll(".handle").data(t.handles, function (t) {
        return t.type;
      });
      r.exit().remove(), r.enter().append("rect").attr("class", function (t) {
        return "handle handle--" + t.type;
      }).attr("cursor", function (t) {
        return jo[t.type];
      }), n.each(f).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", h).filter(i).on("touchstart.brush", h).on("touchmove.brush", d).on("touchend.brush touchcancel.brush", p).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function f() {
      var t = Un(this),
          n = Qo(this).selection;
      n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]), t.selectAll(".handle").style("display", null).attr("x", function (t) {
        return "e" === t.type[t.type.length - 1] ? n[1][0] - u / 2 : n[0][0] - u / 2;
      }).attr("y", function (t) {
        return "s" === t.type[0] ? n[1][1] - u / 2 : n[0][1] - u / 2;
      }).attr("width", function (t) {
        return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + u : u;
      }).attr("height", function (t) {
        return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + u : u;
      })) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }

    function s(t, n, e) {
      var r = t.__brush.emitter;
      return !r || e && r.clean ? new l(t, n, e) : r;
    }

    function l(t, n, e) {
      this.that = t, this.args = n, this.state = t.__brush, this.active = 0, this.clean = e;
    }

    function h(e) {
      if ((!n || e.touches) && r.apply(this, arguments)) {
        var i,
            a,
            u,
            c,
            l,
            h,
            d,
            p,
            g,
            y,
            v,
            _ = this,
            b = e.target.__data__.type,
            m = "selection" === (o && e.metaKey ? b = "overlay" : b) ? Po : o && e.altKey ? qo : Do,
            x = t === Yo ? null : Go[b],
            w = t === Bo ? null : Vo[b],
            M = Qo(_),
            A = M.extent,
            T = M.selection,
            S = A[0][0],
            E = A[0][1],
            k = A[1][0],
            N = A[1][1],
            C = 0,
            P = 0,
            z = x && w && o && e.shiftKey,
            D = Array.from(e.touches || [e], function (t) {
          var n = t.identifier;
          return (t = Hn(t, _)).point0 = t.slice(), t.identifier = n, t;
        });

        Mi(_);
        var q = s(_, arguments, !0).beforestart();

        if ("overlay" === b) {
          T && (g = !0);
          var _n21 = [D[0], D[1] || D[0]];
          M.selection = T = [[i = t === Yo ? S : Oo(_n21[0][0], _n21[1][0]), u = t === Bo ? E : Oo(_n21[0][1], _n21[1][1])], [l = t === Yo ? k : Fo(_n21[0][0], _n21[1][0]), d = t === Bo ? N : Fo(_n21[0][1], _n21[1][1])]], D.length > 1 && U(e);
        } else i = T[0][0], u = T[0][1], l = T[1][0], d = T[1][1];

        a = i, c = u, h = l, p = d;
        var R = Un(_).attr("pointer-events", "none"),
            F = R.selectAll(".overlay").attr("cursor", jo[b]);
        if (e.touches) q.moved = I, q.ended = B;else {
          var O = Un(e.view).on("mousemove.brush", I, !0).on("mouseup.brush", B, !0);
          o && O.on("keydown.brush", Y, !0).on("keyup.brush", L, !0), Wn(e.view);
        }
        f.call(_), q.start(e, m.name);
      }

      function I(t) {
        var _iterator26 = _createForOfIteratorHelper(t.changedTouches || [t]),
            _step26;

        try {
          for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
            var _n22 = _step26.value;

            var _iterator28 = _createForOfIteratorHelper(D),
                _step28;

            try {
              for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                var _t7 = _step28.value;
                _t7.identifier === _n22.identifier && (_t7.cur = Hn(_n22, _));
              }
            } catch (err) {
              _iterator28.e(err);
            } finally {
              _iterator28.f();
            }
          }
        } catch (err) {
          _iterator26.e(err);
        } finally {
          _iterator26.f();
        }

        if (z && !y && !v && 1 === D.length) {
          var _t6 = D[0];
          Ro(_t6.cur[0] - _t6[0]) > Ro(_t6.cur[1] - _t6[1]) ? v = !0 : y = !0;
        }

        var _iterator27 = _createForOfIteratorHelper(D),
            _step27;

        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            var _t8 = _step27.value;
            _t8.cur && (_t8[0] = _t8.cur[0], _t8[1] = _t8.cur[1]);
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }

        g = !0, Co(t), U(t);
      }

      function U(t) {
        var n = D[0],
            e = n.point0;
        var r;

        switch (C = n[0] - e[0], P = n[1] - e[1], m) {
          case zo:
          case Po:
            x && (C = Fo(S - i, Oo(k - l, C)), a = i + C, h = l + C), w && (P = Fo(E - u, Oo(N - d, P)), c = u + P, p = d + P);
            break;

          case Do:
            D[1] ? (x && (a = Fo(S, Oo(k, D[0][0])), h = Fo(S, Oo(k, D[1][0])), x = 1), w && (c = Fo(E, Oo(N, D[0][1])), p = Fo(E, Oo(N, D[1][1])), w = 1)) : (x < 0 ? (C = Fo(S - i, Oo(k - i, C)), a = i + C, h = l) : x > 0 && (C = Fo(S - l, Oo(k - l, C)), a = i, h = l + C), w < 0 ? (P = Fo(E - u, Oo(N - u, P)), c = u + P, p = d) : w > 0 && (P = Fo(E - d, Oo(N - d, P)), c = u, p = d + P));
            break;

          case qo:
            x && (a = Fo(S, Oo(k, i - C * x)), h = Fo(S, Oo(k, l + C * x))), w && (c = Fo(E, Oo(N, u - P * w)), p = Fo(E, Oo(N, d + P * w)));
        }

        h < a && (x *= -1, r = i, i = l, l = r, r = a, a = h, h = r, b in Ho && F.attr("cursor", jo[b = Ho[b]])), p < c && (w *= -1, r = u, u = d, d = r, r = c, c = p, p = r, b in Xo && F.attr("cursor", jo[b = Xo[b]])), M.selection && (T = M.selection), y && (a = T[0][0], h = T[1][0]), v && (c = T[0][1], p = T[1][1]), T[0][0] === a && T[0][1] === c && T[1][0] === h && T[1][1] === p || (M.selection = [[a, c], [h, p]], f.call(_), q.brush(t, m.name));
      }

      function B(t) {
        if (No(t), t.touches) {
          if (t.touches.length) return;
          n && clearTimeout(n), n = setTimeout(function () {
            n = null;
          }, 500);
        } else Zn(t.view, g), O.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);

        R.attr("pointer-events", "all"), F.attr("cursor", jo.overlay), M.selection && (T = M.selection), Jo(T) && (M.selection = null, f.call(_)), q.end(t, m.name);
      }

      function Y(t) {
        switch (t.keyCode) {
          case 16:
            z = x && w;
            break;

          case 18:
            m === Do && (x && (l = h - C * x, i = a + C * x), w && (d = p - P * w, u = c + P * w), m = qo, U(t));
            break;

          case 32:
            m !== Do && m !== qo || (x < 0 ? l = h - C : x > 0 && (i = a - C), w < 0 ? d = p - P : w > 0 && (u = c - P), m = zo, F.attr("cursor", jo.selection), U(t));
            break;

          default:
            return;
        }

        Co(t);
      }

      function L(t) {
        switch (t.keyCode) {
          case 16:
            z && (y = v = z = !1, U(t));
            break;

          case 18:
            m === qo && (x < 0 ? l = h : x > 0 && (i = a), w < 0 ? d = p : w > 0 && (u = c), m = Do, U(t));
            break;

          case 32:
            m === zo && (t.altKey ? (x && (l = h - C * x, i = a + C * x), w && (d = p - P * w, u = c + P * w), m = qo) : (x < 0 ? l = h : x > 0 && (i = a), w < 0 ? d = p : w > 0 && (u = c), m = Do), F.attr("cursor", jo[b]), U(t));
            break;

          default:
            return;
        }

        Co(t);
      }
    }

    function d(t) {
      s(this, arguments).moved(t);
    }

    function p(t) {
      s(this, arguments).ended(t);
    }

    function g() {
      var n = this.__brush || {
        selection: null
      };
      return n.extent = Uo(e.apply(this, arguments)), n.dim = t, n;
    }

    return c.move = function (n, e, r) {
      n.tween ? n.on("start.brush", function (t) {
        s(this, arguments).beforestart().start(t);
      }).on("interrupt.brush end.brush", function (t) {
        s(this, arguments).end(t);
      }).tween("brush", function () {
        var n = this,
            r = n.__brush,
            i = s(n, arguments),
            o = r.selection,
            a = t.input("function" == typeof e ? e.apply(this, arguments) : e, r.extent),
            u = Pr(o, a);

        function c(t) {
          r.selection = 1 === t && null === a ? null : u(t), f.call(n), i.brush();
        }

        return null !== o && null !== a ? c : c(1);
      }) : n.each(function () {
        var n = this,
            i = arguments,
            o = n.__brush,
            a = t.input("function" == typeof e ? e.apply(n, i) : e, o.extent),
            u = s(n, i).beforestart();
        Mi(n), o.selection = null === a ? null : a, f.call(n), u.start(r).brush(r).end(r);
      });
    }, c.clear = function (t, n) {
      c.move(t, null, n);
    }, l.prototype = {
      beforestart: function beforestart() {
        return 1 == ++this.active && (this.state.emitter = this, this.starting = !0), this;
      },
      start: function start(t, n) {
        return this.starting ? (this.starting = !1, this.emit("start", t, n)) : this.emit("brush", t), this;
      },
      brush: function brush(t, n) {
        return this.emit("brush", t, n), this;
      },
      end: function end(t, n) {
        return 0 == --this.active && (delete this.state.emitter, this.emit("end", t, n)), this;
      },
      emit: function emit(n, e, r) {
        var i = Un(this.that).datum();
        a.call(n, this.that, new ko(n, {
          sourceEvent: e,
          target: c,
          selection: t.output(this.state.selection),
          mode: r,
          dispatch: a
        }), i);
      }
    }, c.extent = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Eo(Uo(t)), c) : e;
    }, c.filter = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Eo(!!t), c) : r;
    }, c.touchable = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Eo(!!t), c) : i;
    }, c.handleSize = function (t) {
      return arguments.length ? (u = +t, c) : u;
    }, c.keyModifiers = function (t) {
      return arguments.length ? (o = !!t, c) : o;
    }, c.on = function () {
      var t = a.on.apply(a, arguments);
      return t === a ? c : t;
    }, c;
  }

  var na = Math.abs,
      ea = Math.cos,
      ra = Math.sin,
      ia = Math.PI,
      oa = ia / 2,
      aa = 2 * ia,
      ua = Math.max,
      ca = 1e-12;

  function fa(t, n) {
    return Array.from({
      length: n - t
    }, function (n, e) {
      return t + e;
    });
  }

  function sa(t) {
    return function (n, e) {
      return t(n.source.value + n.target.value, e.source.value + e.target.value);
    };
  }

  function la(t, n) {
    var e = 0,
        r = null,
        i = null,
        o = null;

    function a(a) {
      var u,
          c = a.length,
          f = new Array(c),
          s = fa(0, c),
          l = new Array(c * c),
          h = new Array(c),
          d = 0;
      a = Float64Array.from({
        length: c * c
      }, n ? function (t, n) {
        return a[n % c][n / c | 0];
      } : function (t, n) {
        return a[n / c | 0][n % c];
      });

      for (var _n23 = 0; _n23 < c; ++_n23) {
        var _e11 = 0;

        for (var _r15 = 0; _r15 < c; ++_r15) {
          _e11 += a[_n23 * c + _r15] + t * a[_r15 * c + _n23];
        }

        d += f[_n23] = _e11;
      }

      u = (d = ua(0, aa - e * c) / d) ? e : aa / c;
      {
        var _n24 = 0;
        r && s.sort(function (t, n) {
          return r(f[t], f[n]);
        });

        var _iterator29 = _createForOfIteratorHelper(s),
            _step29;

        try {
          var _loop = function _loop() {
            var e = _step29.value;
            var r = _n24;

            if (t) {
              var _t9 = fa(1 + ~c, c).filter(function (t) {
                return t < 0 ? a[~t * c + e] : a[e * c + t];
              });

              i && _t9.sort(function (t, n) {
                return i(t < 0 ? -a[~t * c + e] : a[e * c + t], n < 0 ? -a[~n * c + e] : a[e * c + n]);
              });

              var _iterator30 = _createForOfIteratorHelper(_t9),
                  _step30;

              try {
                for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                  var _r16 = _step30.value;

                  if (_r16 < 0) {
                    (l[~_r16 * c + e] || (l[~_r16 * c + e] = {
                      source: null,
                      target: null
                    })).target = {
                      index: e,
                      startAngle: _n24,
                      endAngle: _n24 += a[~_r16 * c + e] * d,
                      value: a[~_r16 * c + e]
                    };
                  } else {
                    (l[e * c + _r16] || (l[e * c + _r16] = {
                      source: null,
                      target: null
                    })).source = {
                      index: e,
                      startAngle: _n24,
                      endAngle: _n24 += a[e * c + _r16] * d,
                      value: a[e * c + _r16]
                    };
                  }
                }
              } catch (err) {
                _iterator30.e(err);
              } finally {
                _iterator30.f();
              }

              h[e] = {
                index: e,
                startAngle: r,
                endAngle: _n24,
                value: f[e]
              };
            } else {
              var _t10 = fa(0, c).filter(function (t) {
                return a[e * c + t] || a[t * c + e];
              });

              i && _t10.sort(function (t, n) {
                return i(a[e * c + t], a[e * c + n]);
              });

              var _iterator31 = _createForOfIteratorHelper(_t10),
                  _step31;

              try {
                for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
                  var _r17 = _step31.value;

                  var _t11 = void 0;

                  if (e < _r17 ? (_t11 = l[e * c + _r17] || (l[e * c + _r17] = {
                    source: null,
                    target: null
                  }), _t11.source = {
                    index: e,
                    startAngle: _n24,
                    endAngle: _n24 += a[e * c + _r17] * d,
                    value: a[e * c + _r17]
                  }) : (_t11 = l[_r17 * c + e] || (l[_r17 * c + e] = {
                    source: null,
                    target: null
                  }), _t11.target = {
                    index: e,
                    startAngle: _n24,
                    endAngle: _n24 += a[e * c + _r17] * d,
                    value: a[e * c + _r17]
                  }, e === _r17 && (_t11.source = _t11.target)), _t11.source && _t11.target && _t11.source.value < _t11.target.value) {
                    var _n25 = _t11.source;
                    _t11.source = _t11.target, _t11.target = _n25;
                  }
                }
              } catch (err) {
                _iterator31.e(err);
              } finally {
                _iterator31.f();
              }

              h[e] = {
                index: e,
                startAngle: r,
                endAngle: _n24,
                value: f[e]
              };
            }

            _n24 += u;
          };

          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }
      }
      return (l = Object.values(l)).groups = h, o ? l.sort(o) : l;
    }

    return a.padAngle = function (t) {
      return arguments.length ? (e = ua(0, t), a) : e;
    }, a.sortGroups = function (t) {
      return arguments.length ? (r = t, a) : r;
    }, a.sortSubgroups = function (t) {
      return arguments.length ? (i = t, a) : i;
    }, a.sortChords = function (t) {
      return arguments.length ? (null == t ? o = null : (o = sa(t))._ = t, a) : o && o._;
    }, a;
  }

  var ha = Math.PI,
      da = 2 * ha,
      pa = 1e-6,
      ga = da - pa;

  function ya() {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
  }

  function va() {
    return new ya();
  }

  ya.prototype = va.prototype = {
    constructor: ya,
    moveTo: function moveTo(t, n) {
      this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n);
    },
    closePath: function closePath() {
      null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
    },
    lineTo: function lineTo(t, n) {
      this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n);
    },
    quadraticCurveTo: function quadraticCurveTo(t, n, e, r) {
      this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r);
    },
    bezierCurveTo: function bezierCurveTo(t, n, e, r, i, o) {
      this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o);
    },
    arcTo: function arcTo(t, n, e, r, i) {
      t = +t, n = +n, e = +e, r = +r, i = +i;
      var o = this._x1,
          a = this._y1,
          u = e - t,
          c = r - n,
          f = o - t,
          s = a - n,
          l = f * f + s * s;
      if (i < 0) throw new Error("negative radius: " + i);
      if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);else if (l > pa) {
        if (Math.abs(s * u - c * f) > pa && i) {
          var h = e - o,
              d = r - a,
              p = u * u + c * c,
              g = h * h + d * d,
              y = Math.sqrt(p),
              v = Math.sqrt(l),
              _ = i * Math.tan((ha - Math.acos((p + l - g) / (2 * y * v))) / 2),
              b = _ / v,
              m = _ / y;

          Math.abs(b - 1) > pa && (this._ += "L" + (t + b * f) + "," + (n + b * s)), this._ += "A" + i + "," + i + ",0,0," + +(s * h > f * d) + "," + (this._x1 = t + m * u) + "," + (this._y1 = n + m * c);
        } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
      } else ;
    },
    arc: function arc(t, n, e, r, i, o) {
      t = +t, n = +n, o = !!o;
      var a = (e = +e) * Math.cos(r),
          u = e * Math.sin(r),
          c = t + a,
          f = n + u,
          s = 1 ^ o,
          l = o ? r - i : i - r;
      if (e < 0) throw new Error("negative radius: " + e);
      null === this._x1 ? this._ += "M" + c + "," + f : (Math.abs(this._x1 - c) > pa || Math.abs(this._y1 - f) > pa) && (this._ += "L" + c + "," + f), e && (l < 0 && (l = l % da + da), l > ga ? this._ += "A" + e + "," + e + ",0,1," + s + "," + (t - a) + "," + (n - u) + "A" + e + "," + e + ",0,1," + s + "," + (this._x1 = c) + "," + (this._y1 = f) : l > pa && (this._ += "A" + e + "," + e + ",0," + +(l >= ha) + "," + s + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))));
    },
    rect: function rect(t, n, e, r) {
      this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z";
    },
    toString: function toString() {
      return this._;
    }
  };
  var _a = Array.prototype.slice;

  function ba(t) {
    return function () {
      return t;
    };
  }

  function ma(t) {
    return t.source;
  }

  function xa(t) {
    return t.target;
  }

  function wa(t) {
    return t.radius;
  }

  function Ma(t) {
    return t.startAngle;
  }

  function Aa(t) {
    return t.endAngle;
  }

  function Ta() {
    return 0;
  }

  function Sa() {
    return 10;
  }

  function Ea(t) {
    var n = ma,
        e = xa,
        r = wa,
        i = wa,
        o = Ma,
        a = Aa,
        u = Ta,
        c = null;

    function f() {
      var f,
          s = n.apply(this, arguments),
          l = e.apply(this, arguments),
          h = u.apply(this, arguments) / 2,
          d = _a.call(arguments),
          p = +r.apply(this, (d[0] = s, d)),
          g = o.apply(this, d) - oa,
          y = a.apply(this, d) - oa,
          v = +i.apply(this, (d[0] = l, d)),
          _ = o.apply(this, d) - oa,
          b = a.apply(this, d) - oa;

      if (c || (c = f = va()), h > ca && (na(y - g) > 2 * h + ca ? y > g ? (g += h, y -= h) : (g -= h, y += h) : g = y = (g + y) / 2, na(b - _) > 2 * h + ca ? b > _ ? (_ += h, b -= h) : (_ -= h, b += h) : _ = b = (_ + b) / 2), c.moveTo(p * ea(g), p * ra(g)), c.arc(0, 0, p, g, y), g !== _ || y !== b) if (t) {
        var m = +t.apply(this, arguments),
            x = v - m,
            w = (_ + b) / 2;
        c.quadraticCurveTo(0, 0, x * ea(_), x * ra(_)), c.lineTo(v * ea(w), v * ra(w)), c.lineTo(x * ea(b), x * ra(b));
      } else c.quadraticCurveTo(0, 0, v * ea(_), v * ra(_)), c.arc(0, 0, v, _, b);
      if (c.quadraticCurveTo(0, 0, p * ea(g), p * ra(g)), c.closePath(), f) return c = null, f + "" || null;
    }

    return t && (f.headRadius = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : ba(+n), f) : t;
    }), f.radius = function (t) {
      return arguments.length ? (r = i = "function" == typeof t ? t : ba(+t), f) : r;
    }, f.sourceRadius = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : ba(+t), f) : r;
    }, f.targetRadius = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : ba(+t), f) : i;
    }, f.startAngle = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : ba(+t), f) : o;
    }, f.endAngle = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : ba(+t), f) : a;
    }, f.padAngle = function (t) {
      return arguments.length ? (u = "function" == typeof t ? t : ba(+t), f) : u;
    }, f.source = function (t) {
      return arguments.length ? (n = t, f) : n;
    }, f.target = function (t) {
      return arguments.length ? (e = t, f) : e;
    }, f.context = function (t) {
      return arguments.length ? (c = null == t ? null : t, f) : c;
    }, f;
  }

  var ka = Array.prototype.slice;

  function Na(t, n) {
    return t - n;
  }

  var Ca = function Ca(t) {
    return function () {
      return t;
    };
  };

  function Pa(t, n) {
    for (var e, r = -1, i = n.length; ++r < i;) {
      if (e = za(t, n[r])) return e;
    }

    return 0;
  }

  function za(t, n) {
    for (var e = n[0], r = n[1], i = -1, o = 0, a = t.length, u = a - 1; o < a; u = o++) {
      var c = t[o],
          f = c[0],
          s = c[1],
          l = t[u],
          h = l[0],
          d = l[1];
      if (Da(c, l, n)) return 0;
      s > r != d > r && e < (h - f) * (r - s) / (d - s) + f && (i = -i);
    }

    return i;
  }

  function Da(t, n, e) {
    var r, i, o, a;
    return function (t, n, e) {
      return (n[0] - t[0]) * (e[1] - t[1]) == (e[0] - t[0]) * (n[1] - t[1]);
    }(t, n, e) && (i = t[r = +(t[0] === n[0])], o = e[r], a = n[r], i <= o && o <= a || a <= o && o <= i);
  }

  function qa() {}

  var Ra = [[], [[[1, 1.5], [.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [.5, 1]]], [[[1, .5], [1.5, 1]]], [[[1, 1.5], [.5, 1]], [[1, .5], [1.5, 1]]], [[[1, .5], [1, 1.5]]], [[[1, .5], [.5, 1]]], [[[.5, 1], [1, .5]]], [[[1, 1.5], [1, .5]]], [[[.5, 1], [1, .5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, .5]]], [[[.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[.5, 1], [1, 1.5]]], []];

  function Fa() {
    var t = 1,
        n = 1,
        e = H,
        r = u;

    function i(t) {
      var n = e(t);
      if (Array.isArray(n)) n = n.slice().sort(Na);else {
        var _e12 = g(t),
            _r18 = L(_e12[0], _e12[1], n);

        n = B(Math.floor(_e12[0] / _r18) * _r18, Math.floor(_e12[1] / _r18 - 1) * _r18, n);
      }
      return n.map(function (n) {
        return o(t, n);
      });
    }

    function o(e, i) {
      var o = [],
          u = [];
      return function (e, r, i) {
        var o,
            u,
            c,
            f,
            s,
            l,
            h = new Array(),
            d = new Array();
        o = u = -1, f = e[0] >= r, Ra[f << 1].forEach(p);

        for (; ++o < t - 1;) {
          c = f, f = e[o + 1] >= r, Ra[c | f << 1].forEach(p);
        }

        Ra[f << 0].forEach(p);

        for (; ++u < n - 1;) {
          for (o = -1, f = e[u * t + t] >= r, s = e[u * t] >= r, Ra[f << 1 | s << 2].forEach(p); ++o < t - 1;) {
            c = f, f = e[u * t + t + o + 1] >= r, l = s, s = e[u * t + o + 1] >= r, Ra[c | f << 1 | s << 2 | l << 3].forEach(p);
          }

          Ra[f | s << 3].forEach(p);
        }

        o = -1, s = e[u * t] >= r, Ra[s << 2].forEach(p);

        for (; ++o < t - 1;) {
          l = s, s = e[u * t + o + 1] >= r, Ra[s << 2 | l << 3].forEach(p);
        }

        function p(t) {
          var n,
              e,
              r = [t[0][0] + o, t[0][1] + u],
              c = [t[1][0] + o, t[1][1] + u],
              f = a(r),
              s = a(c);
          (n = d[f]) ? (e = h[s]) ? (delete d[n.end], delete h[e.start], n === e ? (n.ring.push(c), i(n.ring)) : h[n.start] = d[e.end] = {
            start: n.start,
            end: e.end,
            ring: n.ring.concat(e.ring)
          }) : (delete d[n.end], n.ring.push(c), d[n.end = s] = n) : (n = h[s]) ? (e = d[f]) ? (delete h[n.start], delete d[e.end], n === e ? (n.ring.push(c), i(n.ring)) : h[e.start] = d[n.end] = {
            start: e.start,
            end: n.end,
            ring: e.ring.concat(n.ring)
          }) : (delete h[n.start], n.ring.unshift(r), h[n.start = f] = n) : h[f] = d[s] = {
            start: f,
            end: s,
            ring: [r, c]
          };
        }

        Ra[s << 3].forEach(p);
      }(e, i, function (t) {
        r(t, e, i), function (t) {
          for (var n = 0, e = t.length, r = t[e - 1][1] * t[0][0] - t[e - 1][0] * t[0][1]; ++n < e;) {
            r += t[n - 1][1] * t[n][0] - t[n - 1][0] * t[n][1];
          }

          return r;
        }(t) > 0 ? o.push([t]) : u.push(t);
      }), u.forEach(function (t) {
        for (var n, e = 0, r = o.length; e < r; ++e) {
          if (-1 !== Pa((n = o[e])[0], t)) return void n.push(t);
        }
      }), {
        type: "MultiPolygon",
        value: i,
        coordinates: o
      };
    }

    function a(n) {
      return 2 * n[0] + n[1] * (t + 1) * 4;
    }

    function u(e, r, i) {
      e.forEach(function (e) {
        var o,
            a = e[0],
            u = e[1],
            c = 0 | a,
            f = 0 | u,
            s = r[f * t + c];
        a > 0 && a < t && c === a && (o = r[f * t + c - 1], e[0] = a + (i - o) / (s - o) - .5), u > 0 && u < n && f === u && (o = r[(f - 1) * t + c], e[1] = u + (i - o) / (s - o) - .5);
      });
    }

    return i.contour = o, i.size = function (e) {
      if (!arguments.length) return [t, n];
      var r = Math.floor(e[0]),
          o = Math.floor(e[1]);
      if (!(r >= 0 && o >= 0)) throw new Error("invalid size");
      return t = r, n = o, i;
    }, i.thresholds = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? Ca(ka.call(t)) : Ca(t), i) : e;
    }, i.smooth = function (t) {
      return arguments.length ? (r = t ? u : qa, i) : r === u;
    }, i;
  }

  function Oa(t, n, e) {
    for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < i; ++a) {
      for (var u = 0, c = 0; u < r + e; ++u) {
        u < r && (c += t.data[u + a * r]), u >= e && (u >= o && (c -= t.data[u - o + a * r]), n.data[u - e + a * r] = c / Math.min(u + 1, r - 1 + o - u, o));
      }
    }
  }

  function Ia(t, n, e) {
    for (var r = t.width, i = t.height, o = 1 + (e << 1), a = 0; a < r; ++a) {
      for (var u = 0, c = 0; u < i + e; ++u) {
        u < i && (c += t.data[a + u * r]), u >= e && (u >= o && (c -= t.data[a + (u - o) * r]), n.data[a + (u - e) * r] = c / Math.min(u + 1, i - 1 + o - u, o));
      }
    }
  }

  function Ua(t) {
    return t[0];
  }

  function Ba(t) {
    return t[1];
  }

  function Ya() {
    return 1;
  }

  var La = 134217729;

  function ja(t, n, e, r, i) {
    var o,
        a,
        u,
        c,
        f = n[0],
        s = r[0],
        l = 0,
        h = 0;
    s > f == s > -f ? (o = f, f = n[++l]) : (o = s, s = r[++h]);
    var d = 0;
    if (l < t && h < e) for (s > f == s > -f ? (a = f + o, u = o - (a - f), f = n[++l]) : (a = s + o, u = o - (a - s), s = r[++h]), o = a, 0 !== u && (i[d++] = u); l < t && h < e;) {
      s > f == s > -f ? (a = o + f, c = a - o, u = o - (a - c) + (f - c), f = n[++l]) : (a = o + s, c = a - o, u = o - (a - c) + (s - c), s = r[++h]), o = a, 0 !== u && (i[d++] = u);
    }

    for (; l < t;) {
      a = o + f, c = a - o, u = o - (a - c) + (f - c), f = n[++l], o = a, 0 !== u && (i[d++] = u);
    }

    for (; h < e;) {
      a = o + s, c = a - o, u = o - (a - c) + (s - c), s = r[++h], o = a, 0 !== u && (i[d++] = u);
    }

    return 0 === o && 0 !== d || (i[d++] = o), d;
  }

  function Ha(t) {
    return new Float64Array(t);
  }

  var Xa = Ha(4),
      Ga = Ha(8),
      Va = Ha(12),
      $a = Ha(16),
      Wa = Ha(4);

  function Za(t, n, e, r, i, o) {
    var a = (n - o) * (e - i),
        u = (t - i) * (r - o),
        c = a - u;
    if (0 === a || 0 === u || a > 0 != u > 0) return c;
    var f = Math.abs(a + u);
    return Math.abs(c) >= 33306690738754716e-32 * f ? c : -function (t, n, e, r, i, o, a) {
      var u, c, f, s, l, h, d, p, g, y, v, _, b, m, x, w, M, A;

      var T = t - i,
          S = e - i,
          E = n - o,
          k = r - o;
      m = T * k, h = La * T, d = h - (h - T), p = T - d, h = La * k, g = h - (h - k), y = k - g, x = p * y - (m - d * g - p * g - d * y), w = E * S, h = La * E, d = h - (h - E), p = E - d, h = La * S, g = h - (h - S), y = S - g, M = p * y - (w - d * g - p * g - d * y), v = x - M, l = x - v, Xa[0] = x - (v + l) + (l - M), _ = m + v, l = _ - m, b = m - (_ - l) + (v - l), v = b - w, l = b - v, Xa[1] = b - (v + l) + (l - w), A = _ + v, l = A - _, Xa[2] = _ - (A - l) + (v - l), Xa[3] = A;

      var N = function (t, n) {
        var e = n[0];

        for (var _r19 = 1; _r19 < t; _r19++) {
          e += n[_r19];
        }

        return e;
      }(4, Xa),
          C = 22204460492503146e-32 * a;

      if (N >= C || -N >= C) return N;
      if (l = t - T, u = t - (T + l) + (l - i), l = e - S, f = e - (S + l) + (l - i), l = n - E, c = n - (E + l) + (l - o), l = r - k, s = r - (k + l) + (l - o), 0 === u && 0 === c && 0 === f && 0 === s) return N;
      if (C = 11093356479670487e-47 * a + 33306690738754706e-32 * Math.abs(N), N += T * s + k * u - (E * f + S * c), N >= C || -N >= C) return N;
      m = u * k, h = La * u, d = h - (h - u), p = u - d, h = La * k, g = h - (h - k), y = k - g, x = p * y - (m - d * g - p * g - d * y), w = c * S, h = La * c, d = h - (h - c), p = c - d, h = La * S, g = h - (h - S), y = S - g, M = p * y - (w - d * g - p * g - d * y), v = x - M, l = x - v, Wa[0] = x - (v + l) + (l - M), _ = m + v, l = _ - m, b = m - (_ - l) + (v - l), v = b - w, l = b - v, Wa[1] = b - (v + l) + (l - w), A = _ + v, l = A - _, Wa[2] = _ - (A - l) + (v - l), Wa[3] = A;
      var P = ja(4, Xa, 4, Wa, Ga);
      m = T * s, h = La * T, d = h - (h - T), p = T - d, h = La * s, g = h - (h - s), y = s - g, x = p * y - (m - d * g - p * g - d * y), w = E * f, h = La * E, d = h - (h - E), p = E - d, h = La * f, g = h - (h - f), y = f - g, M = p * y - (w - d * g - p * g - d * y), v = x - M, l = x - v, Wa[0] = x - (v + l) + (l - M), _ = m + v, l = _ - m, b = m - (_ - l) + (v - l), v = b - w, l = b - v, Wa[1] = b - (v + l) + (l - w), A = _ + v, l = A - _, Wa[2] = _ - (A - l) + (v - l), Wa[3] = A;
      var z = ja(P, Ga, 4, Wa, Va);
      m = u * s, h = La * u, d = h - (h - u), p = u - d, h = La * s, g = h - (h - s), y = s - g, x = p * y - (m - d * g - p * g - d * y), w = c * f, h = La * c, d = h - (h - c), p = c - d, h = La * f, g = h - (h - f), y = f - g, M = p * y - (w - d * g - p * g - d * y), v = x - M, l = x - v, Wa[0] = x - (v + l) + (l - M), _ = m + v, l = _ - m, b = m - (_ - l) + (v - l), v = b - w, l = b - v, Wa[1] = b - (v + l) + (l - w), A = _ + v, l = A - _, Wa[2] = _ - (A - l) + (v - l), Wa[3] = A;
      var D = ja(z, Va, 4, Wa, $a);
      return $a[D - 1];
    }(t, n, e, r, i, o, f);
  }

  var Ka = Math.pow(2, -52),
      Qa = new Uint32Array(512);

  var Ja = /*#__PURE__*/function () {
    function Ja(t) {
      _classCallCheck(this, Ja);

      var n = t.length >> 1;
      if (n > 0 && "number" != typeof t[0]) throw new Error("Expected coords to contain numbers.");
      this.coords = t;
      var e = Math.max(2 * n - 5, 0);
      this._triangles = new Uint32Array(3 * e), this._halfedges = new Int32Array(3 * e), this._hashSize = Math.ceil(Math.sqrt(n)), this._hullPrev = new Uint32Array(n), this._hullNext = new Uint32Array(n), this._hullTri = new Uint32Array(n), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(n), this._dists = new Float64Array(n), this.update();
    }

    _createClass(Ja, [{
      key: "update",
      value: function update() {
        var t = this.coords,
            n = this._hullPrev,
            e = this._hullNext,
            r = this._hullTri,
            i = this._hullHash,
            o = t.length >> 1;
        var a = 1 / 0,
            u = 1 / 0,
            c = -1 / 0,
            f = -1 / 0;

        for (var _n26 = 0; _n26 < o; _n26++) {
          var _e13 = t[2 * _n26],
              _r20 = t[2 * _n26 + 1];
          _e13 < a && (a = _e13), _r20 < u && (u = _r20), _e13 > c && (c = _e13), _r20 > f && (f = _r20), this._ids[_n26] = _n26;
        }

        var s = (a + c) / 2,
            l = (u + f) / 2;
        var h,
            d,
            p,
            g = 1 / 0;

        for (var _n27 = 0; _n27 < o; _n27++) {
          var _e14 = tu(s, l, t[2 * _n27], t[2 * _n27 + 1]);

          _e14 < g && (h = _n27, g = _e14);
        }

        var y = t[2 * h],
            v = t[2 * h + 1];
        g = 1 / 0;

        for (var _n28 = 0; _n28 < o; _n28++) {
          if (_n28 === h) continue;

          var _e15 = tu(y, v, t[2 * _n28], t[2 * _n28 + 1]);

          _e15 < g && _e15 > 0 && (d = _n28, g = _e15);
        }

        var _ = t[2 * d],
            b = t[2 * d + 1],
            m = 1 / 0;

        for (var _n29 = 0; _n29 < o; _n29++) {
          if (_n29 === h || _n29 === d) continue;

          var _e16 = eu(y, v, _, b, t[2 * _n29], t[2 * _n29 + 1]);

          _e16 < m && (p = _n29, m = _e16);
        }

        var x = t[2 * p],
            w = t[2 * p + 1];

        if (m === 1 / 0) {
          for (var _n31 = 0; _n31 < o; _n31++) {
            this._dists[_n31] = t[2 * _n31] - t[0] || t[2 * _n31 + 1] - t[1];
          }

          ru(this._ids, this._dists, 0, o - 1);

          var _n30 = new Uint32Array(o);

          var _e17 = 0;

          for (var _t12 = 0, _r21 = -1 / 0; _t12 < o; _t12++) {
            var _i9 = this._ids[_t12];
            this._dists[_i9] > _r21 && (_n30[_e17++] = _i9, _r21 = this._dists[_i9]);
          }

          return this.hull = _n30.subarray(0, _e17), this.triangles = new Uint32Array(0), void (this.halfedges = new Uint32Array(0));
        }

        if (Za(y, v, _, b, x, w) < 0) {
          var _t13 = d,
              _n32 = _,
              _e18 = b;
          d = p, _ = x, b = w, p = _t13, x = _n32, w = _e18;
        }

        var M = function (t, n, e, r, i, o) {
          var a = e - t,
              u = r - n,
              c = i - t,
              f = o - n,
              s = a * a + u * u,
              l = c * c + f * f,
              h = .5 / (a * f - u * c);
          return {
            x: t + (f * s - u * l) * h,
            y: n + (a * l - c * s) * h
          };
        }(y, v, _, b, x, w);

        this._cx = M.x, this._cy = M.y;

        for (var _n33 = 0; _n33 < o; _n33++) {
          this._dists[_n33] = tu(t[2 * _n33], t[2 * _n33 + 1], M.x, M.y);
        }

        ru(this._ids, this._dists, 0, o - 1), this._hullStart = h;
        var A = 3;
        e[h] = n[p] = d, e[d] = n[h] = p, e[p] = n[d] = h, r[h] = 0, r[d] = 1, r[p] = 2, i.fill(-1), i[this._hashKey(y, v)] = h, i[this._hashKey(_, b)] = d, i[this._hashKey(x, w)] = p, this.trianglesLen = 0, this._addTriangle(h, d, p, -1, -1, -1);

        for (var _o9, _a6, _u5 = 0; _u5 < this._ids.length; _u5++) {
          var _c3 = this._ids[_u5],
              _f3 = t[2 * _c3],
              _s2 = t[2 * _c3 + 1];
          if (_u5 > 0 && Math.abs(_f3 - _o9) <= Ka && Math.abs(_s2 - _a6) <= Ka) continue;
          if (_o9 = _f3, _a6 = _s2, _c3 === h || _c3 === d || _c3 === p) continue;
          var _l2 = 0;

          for (var _t14 = 0, _n34 = this._hashKey(_f3, _s2); _t14 < this._hashSize && (_l2 = i[(_n34 + _t14) % this._hashSize], -1 === _l2 || _l2 === e[_l2]); _t14++) {
            ;
          }

          _l2 = n[_l2];

          var _g2 = void 0,
              _y2 = _l2;

          for (; _g2 = e[_y2], Za(_f3, _s2, t[2 * _y2], t[2 * _y2 + 1], t[2 * _g2], t[2 * _g2 + 1]) >= 0;) {
            if (_y2 = _g2, _y2 === _l2) {
              _y2 = -1;
              break;
            }
          }

          if (-1 === _y2) continue;

          var _v2 = this._addTriangle(_y2, _c3, e[_y2], -1, -1, r[_y2]);

          r[_c3] = this._legalize(_v2 + 2), r[_y2] = _v2, A++;
          var _2 = e[_y2];

          for (; _g2 = e[_2], Za(_f3, _s2, t[2 * _2], t[2 * _2 + 1], t[2 * _g2], t[2 * _g2 + 1]) < 0;) {
            _v2 = this._addTriangle(_2, _c3, _g2, r[_c3], -1, r[_2]), r[_c3] = this._legalize(_v2 + 2), e[_2] = _2, A--, _2 = _g2;
          }

          if (_y2 === _l2) for (; _g2 = n[_y2], Za(_f3, _s2, t[2 * _g2], t[2 * _g2 + 1], t[2 * _y2], t[2 * _y2 + 1]) < 0;) {
            _v2 = this._addTriangle(_g2, _c3, _y2, -1, r[_y2], r[_g2]), this._legalize(_v2 + 2), r[_g2] = _v2, e[_y2] = _y2, A--, _y2 = _g2;
          }
          this._hullStart = n[_c3] = _y2, e[_y2] = n[_2] = _c3, e[_c3] = _2, i[this._hashKey(_f3, _s2)] = _c3, i[this._hashKey(t[2 * _y2], t[2 * _y2 + 1])] = _y2;
        }

        this.hull = new Uint32Array(A);

        for (var _t15 = 0, _n35 = this._hullStart; _t15 < A; _t15++) {
          this.hull[_t15] = _n35, _n35 = e[_n35];
        }

        this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
      }
    }, {
      key: "_hashKey",
      value: function _hashKey(t, n) {
        return Math.floor(function (t, n) {
          var e = t / (Math.abs(t) + Math.abs(n));
          return (n > 0 ? 3 - e : 1 + e) / 4;
        }(t - this._cx, n - this._cy) * this._hashSize) % this._hashSize;
      }
    }, {
      key: "_legalize",
      value: function _legalize(t) {
        var n = this._triangles,
            e = this._halfedges,
            r = this.coords;
        var i = 0,
            o = 0;

        for (;;) {
          var _a7 = e[t],
              _u6 = t - t % 3;

          if (o = _u6 + (t + 2) % 3, -1 === _a7) {
            if (0 === i) break;
            t = Qa[--i];
            continue;
          }

          var _c4 = _a7 - _a7 % 3,
              _f4 = _u6 + (t + 1) % 3,
              _s3 = _c4 + (_a7 + 2) % 3,
              _l3 = n[o],
              _h2 = n[t],
              _d2 = n[_f4],
              _p2 = n[_s3];

          if (nu(r[2 * _l3], r[2 * _l3 + 1], r[2 * _h2], r[2 * _h2 + 1], r[2 * _d2], r[2 * _d2 + 1], r[2 * _p2], r[2 * _p2 + 1])) {
            n[t] = _p2, n[_a7] = _l3;
            var _r22 = e[_s3];

            if (-1 === _r22) {
              var _n36 = this._hullStart;

              do {
                if (this._hullTri[_n36] === _s3) {
                  this._hullTri[_n36] = t;
                  break;
                }

                _n36 = this._hullPrev[_n36];
              } while (_n36 !== this._hullStart);
            }

            this._link(t, _r22), this._link(_a7, e[o]), this._link(o, _s3);

            var _u7 = _c4 + (_a7 + 1) % 3;

            i < Qa.length && (Qa[i++] = _u7);
          } else {
            if (0 === i) break;
            t = Qa[--i];
          }
        }

        return o;
      }
    }, {
      key: "_link",
      value: function _link(t, n) {
        this._halfedges[t] = n, -1 !== n && (this._halfedges[n] = t);
      }
    }, {
      key: "_addTriangle",
      value: function _addTriangle(t, n, e, r, i, o) {
        var a = this.trianglesLen;
        return this._triangles[a] = t, this._triangles[a + 1] = n, this._triangles[a + 2] = e, this._link(a, r), this._link(a + 1, i), this._link(a + 2, o), this.trianglesLen += 3, a;
      }
    }], [{
      key: "from",
      value: function from(t) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ou;
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : au;
        var r = t.length,
            i = new Float64Array(2 * r);

        for (var _o10 = 0; _o10 < r; _o10++) {
          var _r23 = t[_o10];
          i[2 * _o10] = n(_r23), i[2 * _o10 + 1] = e(_r23);
        }

        return new Ja(i);
      }
    }]);

    return Ja;
  }();

  function tu(t, n, e, r) {
    var i = t - e,
        o = n - r;
    return i * i + o * o;
  }

  function nu(t, n, e, r, i, o, a, u) {
    var c = t - a,
        f = n - u,
        s = e - a,
        l = r - u,
        h = i - a,
        d = o - u,
        p = s * s + l * l,
        g = h * h + d * d;
    return c * (l * g - p * d) - f * (s * g - p * h) + (c * c + f * f) * (s * d - l * h) < 0;
  }

  function eu(t, n, e, r, i, o) {
    var a = e - t,
        u = r - n,
        c = i - t,
        f = o - n,
        s = a * a + u * u,
        l = c * c + f * f,
        h = .5 / (a * f - u * c),
        d = (f * s - u * l) * h,
        p = (a * l - c * s) * h;
    return d * d + p * p;
  }

  function ru(t, n, e, r) {
    if (r - e <= 20) for (var _i10 = e + 1; _i10 <= r; _i10++) {
      var _r24 = t[_i10],
          _o11 = n[_r24];

      var _a8 = _i10 - 1;

      for (; _a8 >= e && n[t[_a8]] > _o11;) {
        t[_a8 + 1] = t[_a8--];
      }

      t[_a8 + 1] = _r24;
    } else {
      var _i11 = e + 1,
          _o12 = r;

      iu(t, e + r >> 1, _i11), n[t[e]] > n[t[r]] && iu(t, e, r), n[t[_i11]] > n[t[r]] && iu(t, _i11, r), n[t[e]] > n[t[_i11]] && iu(t, e, _i11);
      var _a9 = t[_i11],
          _u8 = n[_a9];

      for (;;) {
        do {
          _i11++;
        } while (n[t[_i11]] < _u8);

        do {
          _o12--;
        } while (n[t[_o12]] > _u8);

        if (_o12 < _i11) break;
        iu(t, _i11, _o12);
      }

      t[e + 1] = t[_o12], t[_o12] = _a9, r - _i11 + 1 >= _o12 - e ? (ru(t, n, _i11, r), ru(t, n, e, _o12 - 1)) : (ru(t, n, e, _o12 - 1), ru(t, n, _i11, r));
    }
  }

  function iu(t, n, e) {
    var r = t[n];
    t[n] = t[e], t[e] = r;
  }

  function ou(t) {
    return t[0];
  }

  function au(t) {
    return t[1];
  }

  var uu = 1e-6;

  var cu = /*#__PURE__*/function () {
    function cu() {
      _classCallCheck(this, cu);

      this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
    }

    _createClass(cu, [{
      key: "moveTo",
      value: function moveTo(t, n) {
        this._ += "M".concat(this._x0 = this._x1 = +t, ",").concat(this._y0 = this._y1 = +n);
      }
    }, {
      key: "closePath",
      value: function closePath() {
        null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
      }
    }, {
      key: "lineTo",
      value: function lineTo(t, n) {
        this._ += "L".concat(this._x1 = +t, ",").concat(this._y1 = +n);
      }
    }, {
      key: "arc",
      value: function arc(t, n, e) {
        var r = (t = +t) + (e = +e),
            i = n = +n;
        if (e < 0) throw new Error("negative radius");
        null === this._x1 ? this._ += "M".concat(r, ",").concat(i) : (Math.abs(this._x1 - r) > uu || Math.abs(this._y1 - i) > uu) && (this._ += "L" + r + "," + i), e && (this._ += "A".concat(e, ",").concat(e, ",0,1,1,").concat(t - e, ",").concat(n, "A").concat(e, ",").concat(e, ",0,1,1,").concat(this._x1 = r, ",").concat(this._y1 = i));
      }
    }, {
      key: "rect",
      value: function rect(t, n, e, r) {
        this._ += "M".concat(this._x0 = this._x1 = +t, ",").concat(this._y0 = this._y1 = +n, "h").concat(+e, "v").concat(+r, "h").concat(-e, "Z");
      }
    }, {
      key: "value",
      value: function value() {
        return this._ || null;
      }
    }]);

    return cu;
  }();

  var fu = /*#__PURE__*/function () {
    function fu() {
      _classCallCheck(this, fu);

      this._ = [];
    }

    _createClass(fu, [{
      key: "moveTo",
      value: function moveTo(t, n) {
        this._.push([t, n]);
      }
    }, {
      key: "closePath",
      value: function closePath() {
        this._.push(this._[0].slice());
      }
    }, {
      key: "lineTo",
      value: function lineTo(t, n) {
        this._.push([t, n]);
      }
    }, {
      key: "value",
      value: function value() {
        return this._.length ? this._ : null;
      }
    }]);

    return fu;
  }();

  var su = /*#__PURE__*/function () {
    function su(t) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 960, 500],
          _ref9 = _slicedToArray(_ref8, 4),
          n = _ref9[0],
          e = _ref9[1],
          r = _ref9[2],
          i = _ref9[3];

      _classCallCheck(this, su);

      if (!((r = +r) >= (n = +n) && (i = +i) >= (e = +e))) throw new Error("invalid bounds");
      this.delaunay = t, this._circumcenters = new Float64Array(2 * t.points.length), this.vectors = new Float64Array(2 * t.points.length), this.xmax = r, this.xmin = n, this.ymax = i, this.ymin = e, this._init();
    }

    _createClass(su, [{
      key: "update",
      value: function update() {
        return this.delaunay.update(), this._init(), this;
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this$delaunay = this.delaunay,
            t = _this$delaunay.points,
            n = _this$delaunay.hull,
            e = _this$delaunay.triangles,
            r = this.vectors,
            i = this.circumcenters = this._circumcenters.subarray(0, e.length / 3 * 2);

        for (var _n37, _r25, _o13 = 0, _a10 = 0, _u9 = e.length; _o13 < _u9; _o13 += 3, _a10 += 2) {
          var _u10 = 2 * e[_o13],
              _c5 = 2 * e[_o13 + 1],
              _f5 = 2 * e[_o13 + 2],
              _s4 = t[_u10],
              _l4 = t[_u10 + 1],
              _h3 = t[_c5],
              _d3 = t[_c5 + 1],
              _p3 = t[_f5],
              _g3 = t[_f5 + 1],
              _y3 = _h3 - _s4,
              _v3 = _d3 - _l4,
              _3 = _p3 - _s4,
              _b2 = _g3 - _l4,
              _m2 = 2 * (_y3 * _b2 - _v3 * _3);

          if (Math.abs(_m2) < 1e-9) {
            var _i12 = 1e9;

            var _o14 = 2 * e[0];

            _i12 *= Math.sign((t[_o14] - _s4) * _b2 - (t[_o14 + 1] - _l4) * _3), _n37 = (_s4 + _p3) / 2 - _i12 * _b2, _r25 = (_l4 + _g3) / 2 + _i12 * _3;
          } else {
            var _t16 = 1 / _m2,
                _e19 = _y3 * _y3 + _v3 * _v3,
                _i13 = _3 * _3 + _b2 * _b2;

            _n37 = _s4 + (_b2 * _e19 - _v3 * _i13) * _t16, _r25 = _l4 + (_y3 * _i13 - _3 * _e19) * _t16;
          }

          i[_a10] = _n37, i[_a10 + 1] = _r25;
        }

        var o,
            a,
            u,
            c = n[n.length - 1],
            f = 4 * c,
            s = t[2 * c],
            l = t[2 * c + 1];
        r.fill(0);

        for (var _e20 = 0; _e20 < n.length; ++_e20) {
          c = n[_e20], o = f, a = s, u = l, f = 4 * c, s = t[2 * c], l = t[2 * c + 1], r[o + 2] = r[f] = u - l, r[o + 3] = r[f + 1] = s - a;
        }
      }
    }, {
      key: "render",
      value: function render(t) {
        var n = null == t ? t = new cu() : void 0,
            _this$delaunay2 = this.delaunay,
            e = _this$delaunay2.halfedges,
            r = _this$delaunay2.inedges,
            i = _this$delaunay2.hull,
            o = this.circumcenters,
            a = this.vectors;
        if (i.length <= 1) return null;

        for (var _n38 = 0, _r26 = e.length; _n38 < _r26; ++_n38) {
          var _r27 = e[_n38];
          if (_r27 < _n38) continue;

          var _i14 = 2 * Math.floor(_n38 / 3),
              _a11 = 2 * Math.floor(_r27 / 3),
              _u11 = o[_i14],
              _c6 = o[_i14 + 1],
              _f6 = o[_a11],
              _s5 = o[_a11 + 1];

          this._renderSegment(_u11, _c6, _f6, _s5, t);
        }

        var u,
            c = i[i.length - 1];

        for (var _n39 = 0; _n39 < i.length; ++_n39) {
          u = c, c = i[_n39];

          var _e21 = 2 * Math.floor(r[c] / 3),
              _f7 = o[_e21],
              _s6 = o[_e21 + 1],
              _l5 = 4 * u,
              _h4 = this._project(_f7, _s6, a[_l5 + 2], a[_l5 + 3]);

          _h4 && this._renderSegment(_f7, _s6, _h4[0], _h4[1], t);
        }

        return n && n.value();
      }
    }, {
      key: "renderBounds",
      value: function renderBounds(t) {
        var n = null == t ? t = new cu() : void 0;
        return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), n && n.value();
      }
    }, {
      key: "renderCell",
      value: function renderCell(t, n) {
        var e = null == n ? n = new cu() : void 0,
            r = this._clip(t);

        if (null === r || !r.length) return;
        n.moveTo(r[0], r[1]);
        var i = r.length;

        for (; r[0] === r[i - 2] && r[1] === r[i - 1] && i > 1;) {
          i -= 2;
        }

        for (var _t17 = 2; _t17 < i; _t17 += 2) {
          r[_t17] === r[_t17 - 2] && r[_t17 + 1] === r[_t17 - 1] || n.lineTo(r[_t17], r[_t17 + 1]);
        }

        return n.closePath(), e && e.value();
      }
    }, {
      key: "cellPolygons",
      value: /*#__PURE__*/regeneratorRuntime.mark(function cellPolygons() {
        var t, _n40, _e22, _t18;

        return regeneratorRuntime.wrap(function cellPolygons$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                t = this.delaunay.points;
                _n40 = 0, _e22 = t.length / 2;

              case 2:
                if (!(_n40 < _e22)) {
                  _context4.next = 12;
                  break;
                }

                _t18 = this.cellPolygon(_n40);
                _context4.t0 = _t18;

                if (!_context4.t0) {
                  _context4.next = 9;
                  break;
                }

                _t18.index = _n40;
                _context4.next = 9;
                return _t18;

              case 9:
                ++_n40;
                _context4.next = 2;
                break;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, cellPolygons, this);
      })
    }, {
      key: "cellPolygon",
      value: function cellPolygon(t) {
        var n = new fu();
        return this.renderCell(t, n), n.value();
      }
    }, {
      key: "_renderSegment",
      value: function _renderSegment(t, n, e, r, i) {
        var o;

        var a = this._regioncode(t, n),
            u = this._regioncode(e, r);

        0 === a && 0 === u ? (i.moveTo(t, n), i.lineTo(e, r)) : (o = this._clipSegment(t, n, e, r, a, u)) && (i.moveTo(o[0], o[1]), i.lineTo(o[2], o[3]));
      }
    }, {
      key: "contains",
      value: function contains(t, n, e) {
        return (n = +n) == n && (e = +e) == e && this.delaunay._step(t, n, e) === t;
      }
    }, {
      key: "neighbors",
      value: /*#__PURE__*/regeneratorRuntime.mark(function neighbors(t) {
        var n, _iterator32, _step32, _e23, _t19, _r28, _i15, _o15, _a12;

        return regeneratorRuntime.wrap(function neighbors$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                n = this._clip(t);

                if (!n) {
                  _context5.next = 33;
                  break;
                }

                _iterator32 = _createForOfIteratorHelper(this.delaunay.neighbors(t));
                _context5.prev = 3;

                _iterator32.s();

              case 5:
                if ((_step32 = _iterator32.n()).done) {
                  _context5.next = 25;
                  break;
                }

                _e23 = _step32.value;
                _t19 = this._clip(_e23);

                if (!_t19) {
                  _context5.next = 23;
                  break;
                }

                _r28 = 0, _i15 = n.length;

              case 10:
                if (!(_r28 < _i15)) {
                  _context5.next = 23;
                  break;
                }

                _o15 = 0, _a12 = _t19.length;

              case 12:
                if (!(_o15 < _a12)) {
                  _context5.next = 20;
                  break;
                }

                if (!(n[_r28] == _t19[_o15] && n[_r28 + 1] == _t19[_o15 + 1] && n[(_r28 + 2) % _i15] == _t19[(_o15 + _a12 - 2) % _a12] && n[(_r28 + 3) % _i15] == _t19[(_o15 + _a12 - 1) % _a12])) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 16;
                return _e23;

              case 16:
                return _context5.abrupt("break", 23);

              case 17:
                _o15 += 2;
                _context5.next = 12;
                break;

              case 20:
                _r28 += 2;
                _context5.next = 10;
                break;

              case 23:
                _context5.next = 5;
                break;

              case 25:
                _context5.next = 30;
                break;

              case 27:
                _context5.prev = 27;
                _context5.t0 = _context5["catch"](3);

                _iterator32.e(_context5.t0);

              case 30:
                _context5.prev = 30;

                _iterator32.f();

                return _context5.finish(30);

              case 33:
              case "end":
                return _context5.stop();
            }
          }
        }, neighbors, this, [[3, 27, 30, 33]]);
      })
    }, {
      key: "_cell",
      value: function _cell(t) {
        var n = this.circumcenters,
            _this$delaunay3 = this.delaunay,
            e = _this$delaunay3.inedges,
            r = _this$delaunay3.halfedges,
            i = _this$delaunay3.triangles,
            o = e[t];
        if (-1 === o) return null;
        var a = [];
        var u = o;

        do {
          var _e24 = Math.floor(u / 3);

          if (a.push(n[2 * _e24], n[2 * _e24 + 1]), u = u % 3 == 2 ? u - 2 : u + 1, i[u] !== t) break;
          u = r[u];
        } while (u !== o && -1 !== u);

        return a;
      }
    }, {
      key: "_clip",
      value: function _clip(t) {
        if (0 === t && 1 === this.delaunay.hull.length) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];

        var n = this._cell(t);

        if (null === n) return null;
        var e = this.vectors,
            r = 4 * t;
        return e[r] || e[r + 1] ? this._clipInfinite(t, n, e[r], e[r + 1], e[r + 2], e[r + 3]) : this._clipFinite(t, n);
      }
    }, {
      key: "_clipFinite",
      value: function _clipFinite(t, n) {
        var e = n.length;

        var r,
            i,
            o,
            a,
            u = null,
            c = n[e - 2],
            f = n[e - 1],
            s = this._regioncode(c, f),
            l = 0;

        for (var _h5 = 0; _h5 < e; _h5 += 2) {
          if (r = c, i = f, c = n[_h5], f = n[_h5 + 1], o = s, s = this._regioncode(c, f), 0 === o && 0 === s) a = l, l = 0, u ? u.push(c, f) : u = [c, f];else {
            var _n41 = void 0,
                _e25 = void 0,
                _h6 = void 0,
                _d4 = void 0,
                _p4 = void 0;

            if (0 === o) {
              if (null === (_n41 = this._clipSegment(r, i, c, f, o, s))) continue;
              var _n42 = _n41;

              var _n43 = _slicedToArray(_n42, 4);

              _e25 = _n43[0];
              _h6 = _n43[1];
              _d4 = _n43[2];
              _p4 = _n43[3];
            } else {
              var _n44, _n45;

              if (null === (_n41 = this._clipSegment(c, f, r, i, s, o))) continue;
              (_n44 = _n41, _n45 = _slicedToArray(_n44, 4), _d4 = _n45[0], _p4 = _n45[1], _e25 = _n45[2], _h6 = _n45[3], _n44), a = l, l = this._edgecode(_e25, _h6), a && l && this._edge(t, a, l, u, u.length), u ? u.push(_e25, _h6) : u = [_e25, _h6];
            }

            a = l, l = this._edgecode(_d4, _p4), a && l && this._edge(t, a, l, u, u.length), u ? u.push(_d4, _p4) : u = [_d4, _p4];
          }
        }

        if (u) a = l, l = this._edgecode(u[0], u[1]), a && l && this._edge(t, a, l, u, u.length);else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
        return u;
      }
    }, {
      key: "_clipSegment",
      value: function _clipSegment(t, n, e, r, i, o) {
        for (;;) {
          if (0 === i && 0 === o) return [t, n, e, r];
          if (i & o) return null;

          var _a13 = void 0,
              _u12 = void 0,
              _c7 = i || o;

          8 & _c7 ? (_a13 = t + (e - t) * (this.ymax - n) / (r - n), _u12 = this.ymax) : 4 & _c7 ? (_a13 = t + (e - t) * (this.ymin - n) / (r - n), _u12 = this.ymin) : 2 & _c7 ? (_u12 = n + (r - n) * (this.xmax - t) / (e - t), _a13 = this.xmax) : (_u12 = n + (r - n) * (this.xmin - t) / (e - t), _a13 = this.xmin), i ? (t = _a13, n = _u12, i = this._regioncode(t, n)) : (e = _a13, r = _u12, o = this._regioncode(e, r));
        }
      }
    }, {
      key: "_clipInfinite",
      value: function _clipInfinite(t, n, e, r, i, o) {
        var a,
            u = Array.from(n);
        if ((a = this._project(u[0], u[1], e, r)) && u.unshift(a[0], a[1]), (a = this._project(u[u.length - 2], u[u.length - 1], i, o)) && u.push(a[0], a[1]), u = this._clipFinite(t, u)) for (var _n46, _e26 = 0, _r29 = u.length, _i16 = this._edgecode(u[_r29 - 2], u[_r29 - 1]); _e26 < _r29; _e26 += 2) {
          _n46 = _i16, _i16 = this._edgecode(u[_e26], u[_e26 + 1]), _n46 && _i16 && (_e26 = this._edge(t, _n46, _i16, u, _e26), _r29 = u.length);
        } else this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (u = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
        return u;
      }
    }, {
      key: "_edge",
      value: function _edge(t, n, e, r, i) {
        for (; n !== e;) {
          var _e27 = void 0,
              _o16 = void 0;

          switch (n) {
            case 5:
              n = 4;
              continue;

            case 4:
              n = 6, _e27 = this.xmax, _o16 = this.ymin;
              break;

            case 6:
              n = 2;
              continue;

            case 2:
              n = 10, _e27 = this.xmax, _o16 = this.ymax;
              break;

            case 10:
              n = 8;
              continue;

            case 8:
              n = 9, _e27 = this.xmin, _o16 = this.ymax;
              break;

            case 9:
              n = 1;
              continue;

            case 1:
              n = 5, _e27 = this.xmin, _o16 = this.ymin;
          }

          r[i] === _e27 && r[i + 1] === _o16 || !this.contains(t, _e27, _o16) || (r.splice(i, 0, _e27, _o16), i += 2);
        }

        if (r.length > 4) for (var _t20 = 0; _t20 < r.length; _t20 += 2) {
          var _n47 = (_t20 + 2) % r.length,
              _e28 = (_t20 + 4) % r.length;

          (r[_t20] === r[_n47] && r[_n47] === r[_e28] || r[_t20 + 1] === r[_n47 + 1] && r[_n47 + 1] === r[_e28 + 1]) && (r.splice(_n47, 2), _t20 -= 2);
        }
        return i;
      }
    }, {
      key: "_project",
      value: function _project(t, n, e, r) {
        var i,
            o,
            a,
            u = 1 / 0;

        if (r < 0) {
          if (n <= this.ymin) return null;
          (i = (this.ymin - n) / r) < u && (a = this.ymin, o = t + (u = i) * e);
        } else if (r > 0) {
          if (n >= this.ymax) return null;
          (i = (this.ymax - n) / r) < u && (a = this.ymax, o = t + (u = i) * e);
        }

        if (e > 0) {
          if (t >= this.xmax) return null;
          (i = (this.xmax - t) / e) < u && (o = this.xmax, a = n + (u = i) * r);
        } else if (e < 0) {
          if (t <= this.xmin) return null;
          (i = (this.xmin - t) / e) < u && (o = this.xmin, a = n + (u = i) * r);
        }

        return [o, a];
      }
    }, {
      key: "_edgecode",
      value: function _edgecode(t, n) {
        return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (n === this.ymin ? 4 : n === this.ymax ? 8 : 0);
      }
    }, {
      key: "_regioncode",
      value: function _regioncode(t, n) {
        return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (n < this.ymin ? 4 : n > this.ymax ? 8 : 0);
      }
    }]);

    return su;
  }();

  var lu = 2 * Math.PI,
      hu = Math.pow;

  function du(t) {
    return t[0];
  }

  function pu(t) {
    return t[1];
  }

  function gu(t, n, e) {
    return [t + Math.sin(t + n) * e, n + Math.cos(t - n) * e];
  }

  var yu = /*#__PURE__*/function () {
    function yu(t) {
      _classCallCheck(this, yu);

      this._delaunator = new Ja(t), this.inedges = new Int32Array(t.length / 2), this._hullIndex = new Int32Array(t.length / 2), this.points = this._delaunator.coords, this._init();
    }

    _createClass(yu, [{
      key: "update",
      value: function update() {
        return this._delaunator.update(), this._init(), this;
      }
    }, {
      key: "_init",
      value: function _init() {
        var t = this._delaunator,
            n = this.points;

        if (t.hull && t.hull.length > 2 && function (t) {
          var n = t.triangles,
              e = t.coords;

          for (var _t21 = 0; _t21 < n.length; _t21 += 3) {
            var _r30 = 2 * n[_t21],
                _i17 = 2 * n[_t21 + 1],
                _o17 = 2 * n[_t21 + 2];

            if ((e[_o17] - e[_r30]) * (e[_i17 + 1] - e[_r30 + 1]) - (e[_i17] - e[_r30]) * (e[_o17 + 1] - e[_r30 + 1]) > 1e-10) return !1;
          }

          return !0;
        }(t)) {
          this.collinear = Int32Array.from({
            length: n.length / 2
          }, function (t, n) {
            return n;
          }).sort(function (t, e) {
            return n[2 * t] - n[2 * e] || n[2 * t + 1] - n[2 * e + 1];
          });

          var _t22 = this.collinear[0],
              _e29 = this.collinear[this.collinear.length - 1],
              _r31 = [n[2 * _t22], n[2 * _t22 + 1], n[2 * _e29], n[2 * _e29 + 1]],
              _i18 = 1e-8 * Math.hypot(_r31[3] - _r31[1], _r31[2] - _r31[0]);

          for (var _t23 = 0, _e30 = n.length / 2; _t23 < _e30; ++_t23) {
            var _e31 = gu(n[2 * _t23], n[2 * _t23 + 1], _i18);

            n[2 * _t23] = _e31[0], n[2 * _t23 + 1] = _e31[1];
          }

          this._delaunator = new Ja(n);
        } else delete this.collinear;

        var e = this.halfedges = this._delaunator.halfedges,
            r = this.hull = this._delaunator.hull,
            i = this.triangles = this._delaunator.triangles,
            o = this.inedges.fill(-1),
            a = this._hullIndex.fill(-1);

        for (var _t24 = 0, _n48 = e.length; _t24 < _n48; ++_t24) {
          var _n49 = i[_t24 % 3 == 2 ? _t24 - 2 : _t24 + 1];
          -1 !== e[_t24] && -1 !== o[_n49] || (o[_n49] = _t24);
        }

        for (var _t25 = 0, _n50 = r.length; _t25 < _n50; ++_t25) {
          a[r[_t25]] = _t25;
        }

        r.length <= 2 && r.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = r[0], o[r[0]] = 1, 2 === r.length && (o[r[1]] = 0, this.triangles[1] = r[1], this.triangles[2] = r[1]));
      }
    }, {
      key: "voronoi",
      value: function voronoi(t) {
        return new su(this, t);
      }
    }, {
      key: "neighbors",
      value: /*#__PURE__*/regeneratorRuntime.mark(function neighbors(t) {
        var n, e, r, i, o, a, _n51, u, c, f, _n52;

        return regeneratorRuntime.wrap(function neighbors$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                n = this.inedges, e = this.hull, r = this._hullIndex, i = this.halfedges, o = this.triangles, a = this.collinear;

                if (!a) {
                  _context6.next = 13;
                  break;
                }

                _n51 = a.indexOf(t);
                _context6.t0 = _n51 > 0;

                if (!_context6.t0) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 7;
                return a[_n51 - 1];

              case 7:
                _context6.t1 = _n51 < a.length - 1;

                if (!_context6.t1) {
                  _context6.next = 12;
                  break;
                }

                _context6.next = 11;
                return a[_n51 + 1];

              case 11:
                _context6.t1 = _context6.sent;

              case 12:
                return _context6.abrupt("return", void _context6.t1);

              case 13:
                u = n[t];

                if (!(-1 === u)) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("return");

              case 16:
                c = u, f = -1;

              case 17:
                _context6.next = 19;
                return f = o[c];

              case 19:
                c = c % 3 == 2 ? c - 2 : c + 1;

                if (!(o[c] !== t)) {
                  _context6.next = 22;
                  break;
                }

                return _context6.abrupt("return");

              case 22:
                if (!(c = i[c], -1 === c)) {
                  _context6.next = 30;
                  break;
                }

                _n52 = e[(r[t] + 1) % e.length];
                _context6.t2 = _n52 !== f;

                if (!_context6.t2) {
                  _context6.next = 29;
                  break;
                }

                _context6.next = 28;
                return _n52;

              case 28:
                _context6.t2 = _context6.sent;

              case 29:
                return _context6.abrupt("return", void _context6.t2);

              case 30:
                if (c !== u) {
                  _context6.next = 17;
                  break;
                }

              case 31:
              case "end":
                return _context6.stop();
            }
          }
        }, neighbors, this);
      })
    }, {
      key: "find",
      value: function find(t, n) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        if ((t = +t) != t || (n = +n) != n) return -1;
        var r = e;
        var i;

        for (; (i = this._step(e, t, n)) >= 0 && i !== e && i !== r;) {
          e = i;
        }

        return i;
      }
    }, {
      key: "_step",
      value: function _step(t, n, e) {
        var r = this.inedges,
            i = this.hull,
            o = this._hullIndex,
            a = this.halfedges,
            u = this.triangles,
            c = this.points;
        if (-1 === r[t] || !c.length) return (t + 1) % (c.length >> 1);
        var f = t,
            s = hu(n - c[2 * t], 2) + hu(e - c[2 * t + 1], 2);
        var l = r[t];
        var h = l;

        do {
          var _r32 = u[h];

          var _l6 = hu(n - c[2 * _r32], 2) + hu(e - c[2 * _r32 + 1], 2);

          if (_l6 < s && (s = _l6, f = _r32), h = h % 3 == 2 ? h - 2 : h + 1, u[h] !== t) break;

          if (h = a[h], -1 === h) {
            if (h = i[(o[t] + 1) % i.length], h !== _r32 && hu(n - c[2 * h], 2) + hu(e - c[2 * h + 1], 2) < s) return h;
            break;
          }
        } while (h !== l);

        return f;
      }
    }, {
      key: "render",
      value: function render(t) {
        var n = null == t ? t = new cu() : void 0,
            e = this.points,
            r = this.halfedges,
            i = this.triangles;

        for (var _n53 = 0, _o18 = r.length; _n53 < _o18; ++_n53) {
          var _o19 = r[_n53];
          if (_o19 < _n53) continue;

          var _a14 = 2 * i[_n53],
              _u13 = 2 * i[_o19];

          t.moveTo(e[_a14], e[_a14 + 1]), t.lineTo(e[_u13], e[_u13 + 1]);
        }

        return this.renderHull(t), n && n.value();
      }
    }, {
      key: "renderPoints",
      value: function renderPoints(t, n) {
        void 0 !== n || t && "function" == typeof t.moveTo || (n = t, t = null), n = null == n ? 2 : +n;
        var e = null == t ? t = new cu() : void 0,
            r = this.points;

        for (var _e32 = 0, _i19 = r.length; _e32 < _i19; _e32 += 2) {
          var _i20 = r[_e32],
              _o20 = r[_e32 + 1];
          t.moveTo(_i20 + n, _o20), t.arc(_i20, _o20, n, 0, lu);
        }

        return e && e.value();
      }
    }, {
      key: "renderHull",
      value: function renderHull(t) {
        var n = null == t ? t = new cu() : void 0,
            e = this.hull,
            r = this.points,
            i = 2 * e[0],
            o = e.length;
        t.moveTo(r[i], r[i + 1]);

        for (var _n54 = 1; _n54 < o; ++_n54) {
          var _i21 = 2 * e[_n54];

          t.lineTo(r[_i21], r[_i21 + 1]);
        }

        return t.closePath(), n && n.value();
      }
    }, {
      key: "hullPolygon",
      value: function hullPolygon() {
        var t = new fu();
        return this.renderHull(t), t.value();
      }
    }, {
      key: "renderTriangle",
      value: function renderTriangle(t, n) {
        var e = null == n ? n = new cu() : void 0,
            r = this.points,
            i = this.triangles,
            o = 2 * i[t *= 3],
            a = 2 * i[t + 1],
            u = 2 * i[t + 2];
        return n.moveTo(r[o], r[o + 1]), n.lineTo(r[a], r[a + 1]), n.lineTo(r[u], r[u + 1]), n.closePath(), e && e.value();
      }
    }, {
      key: "trianglePolygons",
      value: /*#__PURE__*/regeneratorRuntime.mark(function trianglePolygons() {
        var t, _n55, _e33;

        return regeneratorRuntime.wrap(function trianglePolygons$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                t = this.triangles;
                _n55 = 0, _e33 = t.length / 3;

              case 2:
                if (!(_n55 < _e33)) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 5;
                return this.trianglePolygon(_n55);

              case 5:
                ++_n55;
                _context7.next = 2;
                break;

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, trianglePolygons, this);
      })
    }, {
      key: "trianglePolygon",
      value: function trianglePolygon(t) {
        var n = new fu();
        return this.renderTriangle(t, n), n.value();
      }
    }], [{
      key: "from",
      value: function from(t) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : du;
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pu;
        var r = arguments.length > 3 ? arguments[3] : undefined;
        return new yu("length" in t ? function (t, n, e, r) {
          var i = t.length,
              o = new Float64Array(2 * i);

          for (var _a15 = 0; _a15 < i; ++_a15) {
            var _i22 = t[_a15];
            o[2 * _a15] = n.call(r, _i22, _a15, t), o[2 * _a15 + 1] = e.call(r, _i22, _a15, t);
          }

          return o;
        }(t, n, e, r) : Float64Array.from( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(t, n, e, r) {
          var i, _iterator33, _step33, _o21;

          return regeneratorRuntime.wrap(function _callee4$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  i = 0;
                  _iterator33 = _createForOfIteratorHelper(t);
                  _context8.prev = 2;

                  _iterator33.s();

                case 4:
                  if ((_step33 = _iterator33.n()).done) {
                    _context8.next = 13;
                    break;
                  }

                  _o21 = _step33.value;
                  _context8.next = 8;
                  return n.call(r, _o21, i, t);

                case 8:
                  _context8.next = 10;
                  return e.call(r, _o21, i, t);

                case 10:
                  ++i;

                case 11:
                  _context8.next = 4;
                  break;

                case 13:
                  _context8.next = 18;
                  break;

                case 15:
                  _context8.prev = 15;
                  _context8.t0 = _context8["catch"](2);

                  _iterator33.e(_context8.t0);

                case 18:
                  _context8.prev = 18;

                  _iterator33.f();

                  return _context8.finish(18);

                case 21:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee4, null, [[2, 15, 18, 21]]);
        })(t, n, e, r)));
      }
    }]);

    return yu;
  }();

  var vu = {},
      _u = {};

  function bu(t) {
    return new Function("d", "return {" + t.map(function (t, n) {
      return JSON.stringify(t) + ": d[" + n + '] || ""';
    }).join(",") + "}");
  }

  function mu(t) {
    var n = Object.create(null),
        e = [];
    return t.forEach(function (t) {
      for (var r in t) {
        r in n || e.push(n[r] = r);
      }
    }), e;
  }

  function xu(t, n) {
    var e = t + "",
        r = e.length;
    return r < n ? new Array(n - r + 1).join(0) + e : e;
  }

  function wu(t) {
    var n = t.getUTCHours(),
        e = t.getUTCMinutes(),
        r = t.getUTCSeconds(),
        i = t.getUTCMilliseconds();
    return isNaN(t) ? "Invalid Date" : function (t) {
      return t < 0 ? "-" + xu(-t, 6) : t > 9999 ? "+" + xu(t, 6) : xu(t, 4);
    }(t.getUTCFullYear()) + "-" + xu(t.getUTCMonth() + 1, 2) + "-" + xu(t.getUTCDate(), 2) + (i ? "T" + xu(n, 2) + ":" + xu(e, 2) + ":" + xu(r, 2) + "." + xu(i, 3) + "Z" : r ? "T" + xu(n, 2) + ":" + xu(e, 2) + ":" + xu(r, 2) + "Z" : e || n ? "T" + xu(n, 2) + ":" + xu(e, 2) + "Z" : "");
  }

  function Mu(t) {
    var n = new RegExp('["' + t + "\n\r]"),
        e = t.charCodeAt(0);

    function r(t, n) {
      var r,
          i = [],
          o = t.length,
          a = 0,
          u = 0,
          c = o <= 0,
          f = !1;

      function s() {
        if (c) return _u;
        if (f) return f = !1, vu;
        var n,
            r,
            i = a;

        if (34 === t.charCodeAt(i)) {
          for (; a++ < o && 34 !== t.charCodeAt(a) || 34 === t.charCodeAt(++a);) {
            ;
          }

          return (n = a) >= o ? c = !0 : 10 === (r = t.charCodeAt(a++)) ? f = !0 : 13 === r && (f = !0, 10 === t.charCodeAt(a) && ++a), t.slice(i + 1, n - 1).replace(/""/g, '"');
        }

        for (; a < o;) {
          if (10 === (r = t.charCodeAt(n = a++))) f = !0;else if (13 === r) f = !0, 10 === t.charCodeAt(a) && ++a;else if (r !== e) continue;
          return t.slice(i, n);
        }

        return c = !0, t.slice(i, o);
      }

      for (10 === t.charCodeAt(o - 1) && --o, 13 === t.charCodeAt(o - 1) && --o; (r = s()) !== _u;) {
        for (var l = []; r !== vu && r !== _u;) {
          l.push(r), r = s();
        }

        n && null == (l = n(l, u++)) || i.push(l);
      }

      return i;
    }

    function i(n, e) {
      return n.map(function (n) {
        return e.map(function (t) {
          return a(n[t]);
        }).join(t);
      });
    }

    function o(n) {
      return n.map(a).join(t);
    }

    function a(t) {
      return null == t ? "" : t instanceof Date ? wu(t) : n.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t;
    }

    return {
      parse: function parse(t, n) {
        var e,
            i,
            o = r(t, function (t, r) {
          if (e) return e(t, r - 1);
          i = t, e = n ? function (t, n) {
            var e = bu(t);
            return function (r, i) {
              return n(e(r), i, t);
            };
          }(t, n) : bu(t);
        });
        return o.columns = i || [], o;
      },
      parseRows: r,
      format: function format(n, e) {
        return null == e && (e = mu(n)), [e.map(a).join(t)].concat(i(n, e)).join("\n");
      },
      formatBody: function formatBody(t, n) {
        return null == n && (n = mu(t)), i(t, n).join("\n");
      },
      formatRows: function formatRows(t) {
        return t.map(o).join("\n");
      },
      formatRow: o,
      formatValue: a
    };
  }

  var Au = Mu(","),
      Tu = Au.parse,
      Su = Au.parseRows,
      Eu = Au.format,
      ku = Au.formatBody,
      Nu = Au.formatRows,
      Cu = Au.formatRow,
      Pu = Au.formatValue,
      zu = Mu("\t"),
      Du = zu.parse,
      qu = zu.parseRows,
      Ru = zu.format,
      Fu = zu.formatBody,
      Ou = zu.formatRows,
      Iu = zu.formatRow,
      Uu = zu.formatValue;
  var Bu = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();

  function Yu(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    return t.blob();
  }

  function Lu(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    return t.arrayBuffer();
  }

  function ju(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    return t.text();
  }

  function Hu(t, n) {
    return fetch(t, n).then(ju);
  }

  function Xu(t) {
    return function (n, e, r) {
      return 2 === arguments.length && "function" == typeof e && (r = e, e = void 0), Hu(n, e).then(function (n) {
        return t(n, r);
      });
    };
  }

  var Gu = Xu(Tu),
      Vu = Xu(Du);

  function $u(t) {
    if (!t.ok) throw new Error(t.status + " " + t.statusText);
    if (204 !== t.status && 205 !== t.status) return t.json();
  }

  function Wu(t) {
    return function (n, e) {
      return Hu(n, e).then(function (n) {
        return new DOMParser().parseFromString(n, t);
      });
    };
  }

  var Zu = Wu("application/xml"),
      Ku = Wu("text/html"),
      Qu = Wu("image/svg+xml");

  function Ju(t, n, e, r) {
    if (isNaN(n) || isNaN(e)) return t;
    var i,
        o,
        a,
        u,
        c,
        f,
        s,
        l,
        h,
        d = t._root,
        p = {
      data: r
    },
        g = t._x0,
        y = t._y0,
        v = t._x1,
        _ = t._y1;
    if (!d) return t._root = p, t;

    for (; d.length;) {
      if ((f = n >= (o = (g + v) / 2)) ? g = o : v = o, (s = e >= (a = (y + _) / 2)) ? y = a : _ = a, i = d, !(d = d[l = s << 1 | f])) return i[l] = p, t;
    }

    if (u = +t._x.call(null, d.data), c = +t._y.call(null, d.data), n === u && e === c) return p.next = d, i ? i[l] = p : t._root = p, t;

    do {
      i = i ? i[l] = new Array(4) : t._root = new Array(4), (f = n >= (o = (g + v) / 2)) ? g = o : v = o, (s = e >= (a = (y + _) / 2)) ? y = a : _ = a;
    } while ((l = s << 1 | f) == (h = (c >= a) << 1 | u >= o));

    return i[h] = d, i[l] = p, t;
  }

  function tc(t, n, e, r, i) {
    this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i;
  }

  function nc(t) {
    return t[0];
  }

  function ec(t) {
    return t[1];
  }

  function rc(t, n, e) {
    var r = new ic(null == n ? nc : n, null == e ? ec : e, NaN, NaN, NaN, NaN);
    return null == t ? r : r.addAll(t);
  }

  function ic(t, n, e, r, i, o) {
    this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
  }

  function oc(t) {
    for (var n = {
      data: t.data
    }, e = n; t = t.next;) {
      e = e.next = {
        data: t.data
      };
    }

    return n;
  }

  var ac = rc.prototype = ic.prototype;

  function uc(t) {
    return function () {
      return t;
    };
  }

  function cc(t) {
    return 1e-6 * (t() - .5);
  }

  function fc(t) {
    return t.x + t.vx;
  }

  function sc(t) {
    return t.y + t.vy;
  }

  function lc(t) {
    return t.index;
  }

  function hc(t, n) {
    var e = t.get(n);
    if (!e) throw new Error("node not found: " + n);
    return e;
  }

  ac.copy = function () {
    var t,
        n,
        e = new ic(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        r = this._root;
    if (!r) return e;
    if (!r.length) return e._root = oc(r), e;

    for (t = [{
      source: r,
      target: e._root = new Array(4)
    }]; r = t.pop();) {
      for (var i = 0; i < 4; ++i) {
        (n = r.source[i]) && (n.length ? t.push({
          source: n,
          target: r.target[i] = new Array(4)
        }) : r.target[i] = oc(n));
      }
    }

    return e;
  }, ac.add = function (t) {
    var n = +this._x.call(null, t),
        e = +this._y.call(null, t);
    return Ju(this.cover(n, e), n, e, t);
  }, ac.addAll = function (t) {
    var n,
        e,
        r,
        i,
        o = t.length,
        a = new Array(o),
        u = new Array(o),
        c = 1 / 0,
        f = 1 / 0,
        s = -1 / 0,
        l = -1 / 0;

    for (e = 0; e < o; ++e) {
      isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r, u[e] = i, r < c && (c = r), r > s && (s = r), i < f && (f = i), i > l && (l = i));
    }

    if (c > s || f > l) return this;

    for (this.cover(c, f).cover(s, l), e = 0; e < o; ++e) {
      Ju(this, a[e], u[e], t[e]);
    }

    return this;
  }, ac.cover = function (t, n) {
    if (isNaN(t = +t) || isNaN(n = +n)) return this;
    var e = this._x0,
        r = this._y0,
        i = this._x1,
        o = this._y1;
    if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;else {
      for (var a, u, c = i - e || 1, f = this._root; e > t || t >= i || r > n || n >= o;) {
        switch (u = (n < r) << 1 | t < e, (a = new Array(4))[u] = f, f = a, c *= 2, u) {
          case 0:
            i = e + c, o = r + c;
            break;

          case 1:
            e = i - c, o = r + c;
            break;

          case 2:
            i = e + c, r = o - c;
            break;

          case 3:
            e = i - c, r = o - c;
        }
      }

      this._root && this._root.length && (this._root = f);
    }
    return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this;
  }, ac.data = function () {
    var t = [];
    return this.visit(function (n) {
      if (!n.length) do {
        t.push(n.data);
      } while (n = n.next);
    }), t;
  }, ac.extent = function (t) {
    return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }, ac.find = function (t, n, e) {
    var r,
        i,
        o,
        a,
        u,
        c,
        f,
        s = this._x0,
        l = this._y0,
        h = this._x1,
        d = this._y1,
        p = [],
        g = this._root;

    for (g && p.push(new tc(g, s, l, h, d)), null == e ? e = 1 / 0 : (s = t - e, l = n - e, h = t + e, d = n + e, e *= e); c = p.pop();) {
      if (!(!(g = c.node) || (i = c.x0) > h || (o = c.y0) > d || (a = c.x1) < s || (u = c.y1) < l)) if (g.length) {
        var y = (i + a) / 2,
            v = (o + u) / 2;
        p.push(new tc(g[3], y, v, a, u), new tc(g[2], i, v, y, u), new tc(g[1], y, o, a, v), new tc(g[0], i, o, y, v)), (f = (n >= v) << 1 | t >= y) && (c = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - f], p[p.length - 1 - f] = c);
      } else {
        var _ = t - +this._x.call(null, g.data),
            b = n - +this._y.call(null, g.data),
            m = _ * _ + b * b;

        if (m < e) {
          var x = Math.sqrt(e = m);
          s = t - x, l = n - x, h = t + x, d = n + x, r = g.data;
        }
      }
    }

    return r;
  }, ac.remove = function (t) {
    if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t))) return this;
    var n,
        e,
        r,
        i,
        o,
        a,
        u,
        c,
        f,
        s,
        l,
        h,
        d = this._root,
        p = this._x0,
        g = this._y0,
        y = this._x1,
        v = this._y1;
    if (!d) return this;
    if (d.length) for (;;) {
      if ((f = o >= (u = (p + y) / 2)) ? p = u : y = u, (s = a >= (c = (g + v) / 2)) ? g = c : v = c, n = d, !(d = d[l = s << 1 | f])) return this;
      if (!d.length) break;
      (n[l + 1 & 3] || n[l + 2 & 3] || n[l + 3 & 3]) && (e = n, h = l);
    }

    for (; d.data !== t;) {
      if (r = d, !(d = d.next)) return this;
    }

    return (i = d.next) && delete d.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[l] = i : delete n[l], (d = n[0] || n[1] || n[2] || n[3]) && d === (n[3] || n[2] || n[1] || n[0]) && !d.length && (e ? e[h] = d : this._root = d), this) : (this._root = i, this);
  }, ac.removeAll = function (t) {
    for (var n = 0, e = t.length; n < e; ++n) {
      this.remove(t[n]);
    }

    return this;
  }, ac.root = function () {
    return this._root;
  }, ac.size = function () {
    var t = 0;
    return this.visit(function (n) {
      if (!n.length) do {
        ++t;
      } while (n = n.next);
    }), t;
  }, ac.visit = function (t) {
    var n,
        e,
        r,
        i,
        o,
        a,
        u = [],
        c = this._root;

    for (c && u.push(new tc(c, this._x0, this._y0, this._x1, this._y1)); n = u.pop();) {
      if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && c.length) {
        var f = (r + o) / 2,
            s = (i + a) / 2;
        (e = c[3]) && u.push(new tc(e, f, s, o, a)), (e = c[2]) && u.push(new tc(e, r, s, f, a)), (e = c[1]) && u.push(new tc(e, f, i, o, s)), (e = c[0]) && u.push(new tc(e, r, i, f, s));
      }
    }

    return this;
  }, ac.visitAfter = function (t) {
    var n,
        e = [],
        r = [];

    for (this._root && e.push(new tc(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
      var i = n.node;

      if (i.length) {
        var o,
            a = n.x0,
            u = n.y0,
            c = n.x1,
            f = n.y1,
            s = (a + c) / 2,
            l = (u + f) / 2;
        (o = i[0]) && e.push(new tc(o, a, u, s, l)), (o = i[1]) && e.push(new tc(o, s, u, c, l)), (o = i[2]) && e.push(new tc(o, a, l, s, f)), (o = i[3]) && e.push(new tc(o, s, l, c, f));
      }

      r.push(n);
    }

    for (; n = r.pop();) {
      t(n.node, n.x0, n.y0, n.x1, n.y1);
    }

    return this;
  }, ac.x = function (t) {
    return arguments.length ? (this._x = t, this) : this._x;
  }, ac.y = function (t) {
    return arguments.length ? (this._y = t, this) : this._y;
  };
  var dc = 4294967296;

  function pc(t) {
    return t.x;
  }

  function gc(t) {
    return t.y;
  }

  var yc = Math.PI * (3 - Math.sqrt(5));

  function vc(t, n) {
    if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
    var e,
        r = t.slice(0, e);
    return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
  }

  function _c(t) {
    return (t = vc(Math.abs(t))) ? t[1] : NaN;
  }

  var bc,
      mc = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function xc(t) {
    if (!(n = mc.exec(t))) throw new Error("invalid format: " + t);
    var n;
    return new wc({
      fill: n[1],
      align: n[2],
      sign: n[3],
      symbol: n[4],
      zero: n[5],
      width: n[6],
      comma: n[7],
      precision: n[8] && n[8].slice(1),
      trim: n[9],
      type: n[10]
    });
  }

  function wc(t) {
    this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 === t.align ? ">" : t.align + "", this.sign = void 0 === t.sign ? "-" : t.sign + "", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this.zero = !!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !!t.comma, this.precision = void 0 === t.precision ? void 0 : +t.precision, this.trim = !!t.trim, this.type = void 0 === t.type ? "" : t.type + "";
  }

  function Mc(t, n) {
    var e = vc(t, n);
    if (!e) return t + "";
    var r = e[0],
        i = e[1];
    return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
  }

  xc.prototype = wc.prototype, wc.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type;
  };
  var Ac = {
    "%": function _(t, n) {
      return (100 * t).toFixed(n);
    },
    b: function b(t) {
      return Math.round(t).toString(2);
    },
    c: function c(t) {
      return t + "";
    },
    d: function d(t) {
      return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
    },
    e: function e(t, n) {
      return t.toExponential(n);
    },
    f: function f(t, n) {
      return t.toFixed(n);
    },
    g: function g(t, n) {
      return t.toPrecision(n);
    },
    o: function o(t) {
      return Math.round(t).toString(8);
    },
    p: function p(t, n) {
      return Mc(100 * t, n);
    },
    r: Mc,
    s: function s(t, n) {
      var e = vc(t, n);
      if (!e) return t + "";
      var r = e[0],
          i = e[1],
          o = i - (bc = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
          a = r.length;
      return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + vc(t, Math.max(0, n + o - 1))[0];
    },
    X: function X(t) {
      return Math.round(t).toString(16).toUpperCase();
    },
    x: function x(t) {
      return Math.round(t).toString(16);
    }
  };

  function Tc(t) {
    return t;
  }

  var Sc,
      Ec = Array.prototype.map,
      kc = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

  function Nc(t) {
    var n,
        e,
        r = void 0 === t.grouping || void 0 === t.thousands ? Tc : (n = Ec.call(t.grouping, Number), e = t.thousands + "", function (t, r) {
      for (var i = t.length, o = [], a = 0, u = n[0], c = 0; i > 0 && u > 0 && (c + u + 1 > r && (u = Math.max(1, r - c)), o.push(t.substring(i -= u, i + u)), !((c += u + 1) > r));) {
        u = n[a = (a + 1) % n.length];
      }

      return o.reverse().join(e);
    }),
        i = void 0 === t.currency ? "" : t.currency[0] + "",
        o = void 0 === t.currency ? "" : t.currency[1] + "",
        a = void 0 === t.decimal ? "." : t.decimal + "",
        u = void 0 === t.numerals ? Tc : function (t) {
      return function (n) {
        return n.replace(/[0-9]/g, function (n) {
          return t[+n];
        });
      };
    }(Ec.call(t.numerals, String)),
        c = void 0 === t.percent ? "%" : t.percent + "",
        f = void 0 === t.minus ? "−" : t.minus + "",
        s = void 0 === t.nan ? "NaN" : t.nan + "";

    function l(t) {
      var n = (t = xc(t)).fill,
          e = t.align,
          l = t.sign,
          h = t.symbol,
          d = t.zero,
          p = t.width,
          g = t.comma,
          y = t.precision,
          v = t.trim,
          _ = t.type;
      "n" === _ ? (g = !0, _ = "g") : Ac[_] || (void 0 === y && (y = 12), v = !0, _ = "g"), (d || "0" === n && "=" === e) && (d = !0, n = "0", e = "=");
      var b = "$" === h ? i : "#" === h && /[boxX]/.test(_) ? "0" + _.toLowerCase() : "",
          m = "$" === h ? o : /[%p]/.test(_) ? c : "",
          x = Ac[_],
          w = /[defgprs%]/.test(_);

      function M(t) {
        var i,
            o,
            c,
            h = b,
            M = m;
        if ("c" === _) M = x(t) + M, t = "";else {
          var A = (t = +t) < 0 || 1 / t < 0;
          if (t = isNaN(t) ? s : x(Math.abs(t), y), v && (t = function (t) {
            t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r) {
              switch (t[r]) {
                case ".":
                  i = n = r;
                  break;

                case "0":
                  0 === i && (i = r), n = r;
                  break;

                default:
                  if (!+t[r]) break t;
                  i > 0 && (i = 0);
              }
            }

            return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t;
          }(t)), A && 0 == +t && "+" !== l && (A = !1), h = (A ? "(" === l ? l : f : "-" === l || "(" === l ? "" : l) + h, M = ("s" === _ ? kc[8 + bc / 3] : "") + M + (A && "(" === l ? ")" : ""), w) for (i = -1, o = t.length; ++i < o;) {
            if (48 > (c = t.charCodeAt(i)) || c > 57) {
              M = (46 === c ? a + t.slice(i + 1) : t.slice(i)) + M, t = t.slice(0, i);
              break;
            }
          }
        }
        g && !d && (t = r(t, 1 / 0));
        var T = h.length + t.length + M.length,
            S = T < p ? new Array(p - T + 1).join(n) : "";

        switch (g && d && (t = r(S + t, S.length ? p - M.length : 1 / 0), S = ""), e) {
          case "<":
            t = h + t + M + S;
            break;

          case "=":
            t = h + S + t + M;
            break;

          case "^":
            t = S.slice(0, T = S.length >> 1) + h + t + M + S.slice(T);
            break;

          default:
            t = S + h + t + M;
        }

        return u(t);
      }

      return y = void 0 === y ? 6 : /[gprs]/.test(_) ? Math.max(1, Math.min(21, y)) : Math.max(0, Math.min(20, y)), M.toString = function () {
        return t + "";
      }, M;
    }

    return {
      format: l,
      formatPrefix: function formatPrefix(t, n) {
        var e = l(((t = xc(t)).type = "f", t)),
            r = 3 * Math.max(-8, Math.min(8, Math.floor(_c(n) / 3))),
            i = Math.pow(10, -r),
            o = kc[8 + r / 3];
        return function (t) {
          return e(i * t) + o;
        };
      }
    };
  }

  function Cc(n) {
    return Sc = Nc(n), t.format = Sc.format, t.formatPrefix = Sc.formatPrefix, Sc;
  }

  function Pc(t) {
    return Math.max(0, -_c(Math.abs(t)));
  }

  function zc(t, n) {
    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(_c(n) / 3))) - _c(Math.abs(t)));
  }

  function Dc(t, n) {
    return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, _c(n) - _c(t)) + 1;
  }

  t.format = void 0, t.formatPrefix = void 0, Cc({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  var qc = 1e-6,
      Rc = 1e-12,
      Fc = Math.PI,
      Oc = Fc / 2,
      Ic = Fc / 4,
      Uc = 2 * Fc,
      Bc = 180 / Fc,
      Yc = Fc / 180,
      Lc = Math.abs,
      jc = Math.atan,
      Hc = Math.atan2,
      Xc = Math.cos,
      Gc = Math.ceil,
      Vc = Math.exp,
      $c = Math.hypot,
      Wc = Math.log,
      Zc = Math.pow,
      Kc = Math.sin,
      Qc = Math.sign || function (t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  },
      Jc = Math.sqrt,
      tf = Math.tan;

  function nf(t) {
    return t > 1 ? 0 : t < -1 ? Fc : Math.acos(t);
  }

  function ef(t) {
    return t > 1 ? Oc : t < -1 ? -Oc : Math.asin(t);
  }

  function rf(t) {
    return (t = Kc(t / 2)) * t;
  }

  function of() {}

  function af(t, n) {
    t && cf.hasOwnProperty(t.type) && cf[t.type](t, n);
  }

  var uf = {
    Feature: function Feature(t, n) {
      af(t.geometry, n);
    },
    FeatureCollection: function FeatureCollection(t, n) {
      for (var e = t.features, r = -1, i = e.length; ++r < i;) {
        af(e[r].geometry, n);
      }
    }
  },
      cf = {
    Sphere: function Sphere(t, n) {
      n.sphere();
    },
    Point: function Point(t, n) {
      t = t.coordinates, n.point(t[0], t[1], t[2]);
    },
    MultiPoint: function MultiPoint(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        t = e[r], n.point(t[0], t[1], t[2]);
      }
    },
    LineString: function LineString(t, n) {
      ff(t.coordinates, n, 0);
    },
    MultiLineString: function MultiLineString(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        ff(e[r], n, 0);
      }
    },
    Polygon: function Polygon(t, n) {
      sf(t.coordinates, n);
    },
    MultiPolygon: function MultiPolygon(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        sf(e[r], n);
      }
    },
    GeometryCollection: function GeometryCollection(t, n) {
      for (var e = t.geometries, r = -1, i = e.length; ++r < i;) {
        af(e[r], n);
      }
    }
  };

  function ff(t, n, e) {
    var r,
        i = -1,
        o = t.length - e;

    for (n.lineStart(); ++i < o;) {
      r = t[i], n.point(r[0], r[1], r[2]);
    }

    n.lineEnd();
  }

  function sf(t, n) {
    var e = -1,
        r = t.length;

    for (n.polygonStart(); ++e < r;) {
      ff(t[e], n, 1);
    }

    n.polygonEnd();
  }

  function lf(t, n) {
    t && uf.hasOwnProperty(t.type) ? uf[t.type](t, n) : af(t, n);
  }

  var hf,
      df,
      pf,
      gf,
      yf,
      vf,
      _f,
      bf,
      mf,
      xf,
      wf,
      Mf,
      Af,
      Tf,
      Sf,
      Ef,
      kf = new y(),
      Nf = new y(),
      Cf = {
    point: of,
    lineStart: of,
    lineEnd: of,
    polygonStart: function polygonStart() {
      kf = new y(), Cf.lineStart = Pf, Cf.lineEnd = zf;
    },
    polygonEnd: function polygonEnd() {
      var t = +kf;
      Nf.add(t < 0 ? Uc + t : t), this.lineStart = this.lineEnd = this.point = of;
    },
    sphere: function sphere() {
      Nf.add(Uc);
    }
  };

  function Pf() {
    Cf.point = Df;
  }

  function zf() {
    qf(hf, df);
  }

  function Df(t, n) {
    Cf.point = qf, hf = t, df = n, pf = t *= Yc, gf = Xc(n = (n *= Yc) / 2 + Ic), yf = Kc(n);
  }

  function qf(t, n) {
    var e = (t *= Yc) - pf,
        r = e >= 0 ? 1 : -1,
        i = r * e,
        o = Xc(n = (n *= Yc) / 2 + Ic),
        a = Kc(n),
        u = yf * a,
        c = gf * o + u * Xc(i),
        f = u * r * Kc(i);
    kf.add(Hc(f, c)), pf = t, gf = o, yf = a;
  }

  function Rf(t) {
    return [Hc(t[1], t[0]), ef(t[2])];
  }

  function Ff(t) {
    var n = t[0],
        e = t[1],
        r = Xc(e);
    return [r * Xc(n), r * Kc(n), Kc(e)];
  }

  function Of(t, n) {
    return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
  }

  function If(t, n) {
    return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
  }

  function Uf(t, n) {
    t[0] += n[0], t[1] += n[1], t[2] += n[2];
  }

  function Bf(t, n) {
    return [t[0] * n, t[1] * n, t[2] * n];
  }

  function Yf(t) {
    var n = Jc(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
    t[0] /= n, t[1] /= n, t[2] /= n;
  }

  var Lf,
      jf,
      Hf,
      Xf,
      Gf,
      Vf,
      $f,
      Wf,
      Zf,
      Kf,
      Qf,
      Jf,
      ts,
      ns,
      es,
      rs,
      is = {
    point: os,
    lineStart: us,
    lineEnd: cs,
    polygonStart: function polygonStart() {
      is.point = fs, is.lineStart = ss, is.lineEnd = ls, Tf = new y(), Cf.polygonStart();
    },
    polygonEnd: function polygonEnd() {
      Cf.polygonEnd(), is.point = os, is.lineStart = us, is.lineEnd = cs, kf < 0 ? (vf = -(bf = 180), _f = -(mf = 90)) : Tf > qc ? mf = 90 : Tf < -1e-6 && (_f = -90), Ef[0] = vf, Ef[1] = bf;
    },
    sphere: function sphere() {
      vf = -(bf = 180), _f = -(mf = 90);
    }
  };

  function os(t, n) {
    Sf.push(Ef = [vf = t, bf = t]), n < _f && (_f = n), n > mf && (mf = n);
  }

  function as(t, n) {
    var e = Ff([t * Yc, n * Yc]);

    if (Af) {
      var r = If(Af, e),
          i = If([r[1], -r[0], 0], r);
      Yf(i), i = Rf(i);
      var o,
          a = t - xf,
          u = a > 0 ? 1 : -1,
          c = i[0] * Bc * u,
          f = Lc(a) > 180;
      f ^ (u * xf < c && c < u * t) ? (o = i[1] * Bc) > mf && (mf = o) : f ^ (u * xf < (c = (c + 360) % 360 - 180) && c < u * t) ? (o = -i[1] * Bc) < _f && (_f = o) : (n < _f && (_f = n), n > mf && (mf = n)), f ? t < xf ? hs(vf, t) > hs(vf, bf) && (bf = t) : hs(t, bf) > hs(vf, bf) && (vf = t) : bf >= vf ? (t < vf && (vf = t), t > bf && (bf = t)) : t > xf ? hs(vf, t) > hs(vf, bf) && (bf = t) : hs(t, bf) > hs(vf, bf) && (vf = t);
    } else Sf.push(Ef = [vf = t, bf = t]);

    n < _f && (_f = n), n > mf && (mf = n), Af = e, xf = t;
  }

  function us() {
    is.point = as;
  }

  function cs() {
    Ef[0] = vf, Ef[1] = bf, is.point = os, Af = null;
  }

  function fs(t, n) {
    if (Af) {
      var e = t - xf;
      Tf.add(Lc(e) > 180 ? e + (e > 0 ? 360 : -360) : e);
    } else wf = t, Mf = n;

    Cf.point(t, n), as(t, n);
  }

  function ss() {
    Cf.lineStart();
  }

  function ls() {
    fs(wf, Mf), Cf.lineEnd(), Lc(Tf) > qc && (vf = -(bf = 180)), Ef[0] = vf, Ef[1] = bf, Af = null;
  }

  function hs(t, n) {
    return (n -= t) < 0 ? n + 360 : n;
  }

  function ds(t, n) {
    return t[0] - n[0];
  }

  function ps(t, n) {
    return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
  }

  var gs = {
    sphere: of,
    point: ys,
    lineStart: _s,
    lineEnd: xs,
    polygonStart: function polygonStart() {
      gs.lineStart = ws, gs.lineEnd = Ms;
    },
    polygonEnd: function polygonEnd() {
      gs.lineStart = _s, gs.lineEnd = xs;
    }
  };

  function ys(t, n) {
    t *= Yc;
    var e = Xc(n *= Yc);
    vs(e * Xc(t), e * Kc(t), Kc(n));
  }

  function vs(t, n, e) {
    ++Lf, Hf += (t - Hf) / Lf, Xf += (n - Xf) / Lf, Gf += (e - Gf) / Lf;
  }

  function _s() {
    gs.point = bs;
  }

  function bs(t, n) {
    t *= Yc;
    var e = Xc(n *= Yc);
    ns = e * Xc(t), es = e * Kc(t), rs = Kc(n), gs.point = ms, vs(ns, es, rs);
  }

  function ms(t, n) {
    t *= Yc;
    var e = Xc(n *= Yc),
        r = e * Xc(t),
        i = e * Kc(t),
        o = Kc(n),
        a = Hc(Jc((a = es * o - rs * i) * a + (a = rs * r - ns * o) * a + (a = ns * i - es * r) * a), ns * r + es * i + rs * o);
    jf += a, Vf += a * (ns + (ns = r)), $f += a * (es + (es = i)), Wf += a * (rs + (rs = o)), vs(ns, es, rs);
  }

  function xs() {
    gs.point = ys;
  }

  function ws() {
    gs.point = As;
  }

  function Ms() {
    Ts(Jf, ts), gs.point = ys;
  }

  function As(t, n) {
    Jf = t, ts = n, t *= Yc, n *= Yc, gs.point = Ts;
    var e = Xc(n);
    ns = e * Xc(t), es = e * Kc(t), rs = Kc(n), vs(ns, es, rs);
  }

  function Ts(t, n) {
    t *= Yc;
    var e = Xc(n *= Yc),
        r = e * Xc(t),
        i = e * Kc(t),
        o = Kc(n),
        a = es * o - rs * i,
        u = rs * r - ns * o,
        c = ns * i - es * r,
        f = $c(a, u, c),
        s = ef(f),
        l = f && -s / f;
    Zf.add(l * a), Kf.add(l * u), Qf.add(l * c), jf += s, Vf += s * (ns + (ns = r)), $f += s * (es + (es = i)), Wf += s * (rs + (rs = o)), vs(ns, es, rs);
  }

  function Ss(t) {
    return function () {
      return t;
    };
  }

  function Es(t, n) {
    function e(e, r) {
      return e = t(e, r), n(e[0], e[1]);
    }

    return t.invert && n.invert && (e.invert = function (e, r) {
      return (e = n.invert(e, r)) && t.invert(e[0], e[1]);
    }), e;
  }

  function ks(t, n) {
    return [Lc(t) > Fc ? t + Math.round(-t / Uc) * Uc : t, n];
  }

  function Ns(t, n, e) {
    return (t %= Uc) ? n || e ? Es(Ps(t), zs(n, e)) : Ps(t) : n || e ? zs(n, e) : ks;
  }

  function Cs(t) {
    return function (n, e) {
      return [(n += t) > Fc ? n - Uc : n < -Fc ? n + Uc : n, e];
    };
  }

  function Ps(t) {
    var n = Cs(t);
    return n.invert = Cs(-t), n;
  }

  function zs(t, n) {
    var e = Xc(t),
        r = Kc(t),
        i = Xc(n),
        o = Kc(n);

    function a(t, n) {
      var a = Xc(n),
          u = Xc(t) * a,
          c = Kc(t) * a,
          f = Kc(n),
          s = f * e + u * r;
      return [Hc(c * i - s * o, u * e - f * r), ef(s * i + c * o)];
    }

    return a.invert = function (t, n) {
      var a = Xc(n),
          u = Xc(t) * a,
          c = Kc(t) * a,
          f = Kc(n),
          s = f * i - c * o;
      return [Hc(c * i + f * o, u * e + s * r), ef(s * e - u * r)];
    }, a;
  }

  function Ds(t) {
    function n(n) {
      return (n = t(n[0] * Yc, n[1] * Yc))[0] *= Bc, n[1] *= Bc, n;
    }

    return t = Ns(t[0] * Yc, t[1] * Yc, t.length > 2 ? t[2] * Yc : 0), n.invert = function (n) {
      return (n = t.invert(n[0] * Yc, n[1] * Yc))[0] *= Bc, n[1] *= Bc, n;
    }, n;
  }

  function qs(t, n, e, r, i, o) {
    if (e) {
      var a = Xc(n),
          u = Kc(n),
          c = r * e;
      null == i ? (i = n + r * Uc, o = n - c / 2) : (i = Rs(a, i), o = Rs(a, o), (r > 0 ? i < o : i > o) && (i += r * Uc));

      for (var f, s = i; r > 0 ? s > o : s < o; s -= c) {
        f = Rf([a, -u * Xc(s), -u * Kc(s)]), t.point(f[0], f[1]);
      }
    }
  }

  function Rs(t, n) {
    (n = Ff(n))[0] -= t, Yf(n);
    var e = nf(-n[1]);
    return ((-n[2] < 0 ? -e : e) + Uc - qc) % Uc;
  }

  function Fs() {
    var t,
        n = [];
    return {
      point: function point(n, e, r) {
        t.push([n, e, r]);
      },
      lineStart: function lineStart() {
        n.push(t = []);
      },
      lineEnd: of,
      rejoin: function rejoin() {
        n.length > 1 && n.push(n.pop().concat(n.shift()));
      },
      result: function result() {
        var e = n;
        return n = [], t = null, e;
      }
    };
  }

  function Os(t, n) {
    return Lc(t[0] - n[0]) < qc && Lc(t[1] - n[1]) < qc;
  }

  function Is(t, n, e, r) {
    this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
  }

  function Us(t, n, e, r, i) {
    var o,
        a,
        u = [],
        c = [];

    if (t.forEach(function (t) {
      if (!((n = t.length - 1) <= 0)) {
        var n,
            e,
            r = t[0],
            a = t[n];

        if (Os(r, a)) {
          if (!r[2] && !a[2]) {
            for (i.lineStart(), o = 0; o < n; ++o) {
              i.point((r = t[o])[0], r[1]);
            }

            return void i.lineEnd();
          }

          a[0] += 2e-6;
        }

        u.push(e = new Is(r, t, null, !0)), c.push(e.o = new Is(r, null, e, !1)), u.push(e = new Is(a, t, null, !1)), c.push(e.o = new Is(a, null, e, !0));
      }
    }), u.length) {
      for (c.sort(n), Bs(u), Bs(c), o = 0, a = c.length; o < a; ++o) {
        c[o].e = e = !e;
      }

      for (var f, s, l = u[0];;) {
        for (var h = l, d = !0; h.v;) {
          if ((h = h.n) === l) return;
        }

        f = h.z, i.lineStart();

        do {
          if (h.v = h.o.v = !0, h.e) {
            if (d) for (o = 0, a = f.length; o < a; ++o) {
              i.point((s = f[o])[0], s[1]);
            } else r(h.x, h.n.x, 1, i);
            h = h.n;
          } else {
            if (d) for (f = h.p.z, o = f.length - 1; o >= 0; --o) {
              i.point((s = f[o])[0], s[1]);
            } else r(h.x, h.p.x, -1, i);
            h = h.p;
          }

          f = (h = h.o).z, d = !d;
        } while (!h.v);

        i.lineEnd();
      }
    }
  }

  function Bs(t) {
    if (n = t.length) {
      for (var n, e, r = 0, i = t[0]; ++r < n;) {
        i.n = e = t[r], e.p = i, i = e;
      }

      i.n = e = t[0], e.p = i;
    }
  }

  function Ys(t) {
    return Lc(t[0]) <= Fc ? t[0] : Qc(t[0]) * ((Lc(t[0]) + Fc) % Uc - Fc);
  }

  function Ls(t, n) {
    var e = Ys(n),
        r = n[1],
        i = Kc(r),
        o = [Kc(e), -Xc(e), 0],
        a = 0,
        u = 0,
        c = new y();
    1 === i ? r = Oc + qc : -1 === i && (r = -Oc - qc);

    for (var f = 0, s = t.length; f < s; ++f) {
      if (h = (l = t[f]).length) for (var l, h, d = l[h - 1], p = Ys(d), g = d[1] / 2 + Ic, v = Kc(g), _ = Xc(g), b = 0; b < h; ++b, p = x, v = M, _ = A, d = m) {
        var m = l[b],
            x = Ys(m),
            w = m[1] / 2 + Ic,
            M = Kc(w),
            A = Xc(w),
            T = x - p,
            S = T >= 0 ? 1 : -1,
            E = S * T,
            k = E > Fc,
            N = v * M;

        if (c.add(Hc(N * S * Kc(E), _ * A + N * Xc(E))), a += k ? T + S * Uc : T, k ^ p >= e ^ x >= e) {
          var C = If(Ff(d), Ff(m));
          Yf(C);
          var P = If(o, C);
          Yf(P);
          var z = (k ^ T >= 0 ? -1 : 1) * ef(P[2]);
          (r > z || r === z && (C[0] || C[1])) && (u += k ^ T >= 0 ? 1 : -1);
        }
      }
    }

    return (a < -1e-6 || a < qc && c < -1e-12) ^ 1 & u;
  }

  function js(t, n, e, r) {
    return function (i) {
      var o,
          a,
          u,
          c = n(i),
          f = Fs(),
          s = n(f),
          l = !1,
          h = {
        point: d,
        lineStart: g,
        lineEnd: y,
        polygonStart: function polygonStart() {
          h.point = v, h.lineStart = _, h.lineEnd = b, a = [], o = [];
        },
        polygonEnd: function polygonEnd() {
          h.point = d, h.lineStart = g, h.lineEnd = y, a = J(a);
          var t = Ls(o, r);
          a.length ? (l || (i.polygonStart(), l = !0), Us(a, Xs, t, e, i)) : t && (l || (i.polygonStart(), l = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), l && (i.polygonEnd(), l = !1), a = o = null;
        },
        sphere: function sphere() {
          i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd();
        }
      };

      function d(n, e) {
        t(n, e) && i.point(n, e);
      }

      function p(t, n) {
        c.point(t, n);
      }

      function g() {
        h.point = p, c.lineStart();
      }

      function y() {
        h.point = d, c.lineEnd();
      }

      function v(t, n) {
        u.push([t, n]), s.point(t, n);
      }

      function _() {
        s.lineStart(), u = [];
      }

      function b() {
        v(u[0][0], u[0][1]), s.lineEnd();
        var t,
            n,
            e,
            r,
            c = s.clean(),
            h = f.result(),
            d = h.length;
        if (u.pop(), o.push(u), u = null, d) if (1 & c) {
          if ((n = (e = h[0]).length - 1) > 0) {
            for (l || (i.polygonStart(), l = !0), i.lineStart(), t = 0; t < n; ++t) {
              i.point((r = e[t])[0], r[1]);
            }

            i.lineEnd();
          }
        } else d > 1 && 2 & c && h.push(h.pop().concat(h.shift())), a.push(h.filter(Hs));
      }

      return h;
    };
  }

  function Hs(t) {
    return t.length > 1;
  }

  function Xs(t, n) {
    return ((t = t.x)[0] < 0 ? t[1] - Oc - qc : Oc - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Oc - qc : Oc - n[1]);
  }

  ks.invert = ks;
  var Gs = js(function () {
    return !0;
  }, function (t) {
    var n,
        e = NaN,
        r = NaN,
        i = NaN;
    return {
      lineStart: function lineStart() {
        t.lineStart(), n = 1;
      },
      point: function point(o, a) {
        var u = o > 0 ? Fc : -Fc,
            c = Lc(o - e);
        Lc(c - Fc) < qc ? (t.point(e, r = (r + a) / 2 > 0 ? Oc : -Oc), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), n = 0) : i !== u && c >= Fc && (Lc(e - i) < qc && (e -= i * qc), Lc(o - u) < qc && (o -= u * qc), r = function (t, n, e, r) {
          var i,
              o,
              a = Kc(t - e);
          return Lc(a) > qc ? jc((Kc(n) * (o = Xc(r)) * Kc(e) - Kc(r) * (i = Xc(n)) * Kc(t)) / (i * o * a)) : (n + r) / 2;
        }(e, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), n = 0), t.point(e = o, r = a), i = u;
      },
      lineEnd: function lineEnd() {
        t.lineEnd(), e = r = NaN;
      },
      clean: function clean() {
        return 2 - n;
      }
    };
  }, function (t, n, e, r) {
    var i;
    if (null == t) i = e * Oc, r.point(-Fc, i), r.point(0, i), r.point(Fc, i), r.point(Fc, 0), r.point(Fc, -i), r.point(0, -i), r.point(-Fc, -i), r.point(-Fc, 0), r.point(-Fc, i);else if (Lc(t[0] - n[0]) > qc) {
      var o = t[0] < n[0] ? Fc : -Fc;
      i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i);
    } else r.point(n[0], n[1]);
  }, [-Fc, -Oc]);

  function Vs(t) {
    var n = Xc(t),
        e = 6 * Yc,
        r = n > 0,
        i = Lc(n) > qc;

    function o(t, e) {
      return Xc(t) * Xc(e) > n;
    }

    function a(t, e, r) {
      var i = [1, 0, 0],
          o = If(Ff(t), Ff(e)),
          a = Of(o, o),
          u = o[0],
          c = a - u * u;
      if (!c) return !r && t;
      var f = n * a / c,
          s = -n * u / c,
          l = If(i, o),
          h = Bf(i, f);
      Uf(h, Bf(o, s));
      var d = l,
          p = Of(h, d),
          g = Of(d, d),
          y = p * p - g * (Of(h, h) - 1);

      if (!(y < 0)) {
        var v = Jc(y),
            _ = Bf(d, (-p - v) / g);

        if (Uf(_, h), _ = Rf(_), !r) return _;
        var b,
            m = t[0],
            x = e[0],
            w = t[1],
            M = e[1];
        x < m && (b = m, m = x, x = b);
        var A = x - m,
            T = Lc(A - Fc) < qc;

        if (!T && M < w && (b = w, w = M, M = b), T || A < qc ? T ? w + M > 0 ^ _[1] < (Lc(_[0] - m) < qc ? w : M) : w <= _[1] && _[1] <= M : A > Fc ^ (m <= _[0] && _[0] <= x)) {
          var S = Bf(d, (-p + v) / g);
          return Uf(S, h), [_, Rf(S)];
        }
      }
    }

    function u(n, e) {
      var i = r ? t : Fc - t,
          o = 0;
      return n < -i ? o |= 1 : n > i && (o |= 2), e < -i ? o |= 4 : e > i && (o |= 8), o;
    }

    return js(o, function (t) {
      var n, e, c, f, s;
      return {
        lineStart: function lineStart() {
          f = c = !1, s = 1;
        },
        point: function point(l, h) {
          var d,
              p = [l, h],
              g = o(l, h),
              y = r ? g ? 0 : u(l, h) : g ? u(l + (l < 0 ? Fc : -Fc), h) : 0;
          if (!n && (f = c = g) && t.lineStart(), g !== c && (!(d = a(n, p)) || Os(n, d) || Os(p, d)) && (p[2] = 1), g !== c) s = 0, g ? (t.lineStart(), d = a(p, n), t.point(d[0], d[1])) : (d = a(n, p), t.point(d[0], d[1], 2), t.lineEnd()), n = d;else if (i && n && r ^ g) {
            var v;
            y & e || !(v = a(p, n, !0)) || (s = 0, r ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1], 3)));
          }
          !g || n && Os(n, p) || t.point(p[0], p[1]), n = p, c = g, e = y;
        },
        lineEnd: function lineEnd() {
          c && t.lineEnd(), n = null;
        },
        clean: function clean() {
          return s | (f && c) << 1;
        }
      };
    }, function (n, r, i, o) {
      qs(o, t, e, i, n, r);
    }, r ? [0, -t] : [-Fc, t - Fc]);
  }

  var $s,
      Ws,
      Zs,
      Ks,
      Qs = 1e9,
      Js = -Qs;

  function tl(t, n, e, r) {
    function i(i, o) {
      return t <= i && i <= e && n <= o && o <= r;
    }

    function o(i, o, u, f) {
      var s = 0,
          l = 0;
      if (null == i || (s = a(i, u)) !== (l = a(o, u)) || c(i, o) < 0 ^ u > 0) do {
        f.point(0 === s || 3 === s ? t : e, s > 1 ? r : n);
      } while ((s = (s + u + 4) % 4) !== l);else f.point(o[0], o[1]);
    }

    function a(r, i) {
      return Lc(r[0] - t) < qc ? i > 0 ? 0 : 3 : Lc(r[0] - e) < qc ? i > 0 ? 2 : 1 : Lc(r[1] - n) < qc ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2;
    }

    function u(t, n) {
      return c(t.x, n.x);
    }

    function c(t, n) {
      var e = a(t, 1),
          r = a(n, 1);
      return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0];
    }

    return function (a) {
      var c,
          f,
          s,
          l,
          h,
          d,
          p,
          g,
          y,
          v,
          _,
          b = a,
          m = Fs(),
          x = {
        point: w,
        lineStart: function lineStart() {
          x.point = M, f && f.push(s = []);
          v = !0, y = !1, p = g = NaN;
        },
        lineEnd: function lineEnd() {
          c && (M(l, h), d && y && m.rejoin(), c.push(m.result()));
          x.point = w, y && b.lineEnd();
        },
        polygonStart: function polygonStart() {
          b = m, c = [], f = [], _ = !0;
        },
        polygonEnd: function polygonEnd() {
          var n = function () {
            for (var n = 0, e = 0, i = f.length; e < i; ++e) {
              for (var o, a, u = f[e], c = 1, s = u.length, l = u[0], h = l[0], d = l[1]; c < s; ++c) {
                o = h, a = d, h = (l = u[c])[0], d = l[1], a <= r ? d > r && (h - o) * (r - a) > (d - a) * (t - o) && ++n : d <= r && (h - o) * (r - a) < (d - a) * (t - o) && --n;
              }
            }

            return n;
          }(),
              e = _ && n,
              i = (c = J(c)).length;

          (e || i) && (a.polygonStart(), e && (a.lineStart(), o(null, null, 1, a), a.lineEnd()), i && Us(c, u, n, o, a), a.polygonEnd());
          b = a, c = f = s = null;
        }
      };

      function w(t, n) {
        i(t, n) && b.point(t, n);
      }

      function M(o, a) {
        var u = i(o, a);
        if (f && s.push([o, a]), v) l = o, h = a, d = u, v = !1, u && (b.lineStart(), b.point(o, a));else if (u && y) b.point(o, a);else {
          var c = [p = Math.max(Js, Math.min(Qs, p)), g = Math.max(Js, Math.min(Qs, g))],
              m = [o = Math.max(Js, Math.min(Qs, o)), a = Math.max(Js, Math.min(Qs, a))];
          !function (t, n, e, r, i, o) {
            var a,
                u = t[0],
                c = t[1],
                f = 0,
                s = 1,
                l = n[0] - u,
                h = n[1] - c;

            if (a = e - u, l || !(a > 0)) {
              if (a /= l, l < 0) {
                if (a < f) return;
                a < s && (s = a);
              } else if (l > 0) {
                if (a > s) return;
                a > f && (f = a);
              }

              if (a = i - u, l || !(a < 0)) {
                if (a /= l, l < 0) {
                  if (a > s) return;
                  a > f && (f = a);
                } else if (l > 0) {
                  if (a < f) return;
                  a < s && (s = a);
                }

                if (a = r - c, h || !(a > 0)) {
                  if (a /= h, h < 0) {
                    if (a < f) return;
                    a < s && (s = a);
                  } else if (h > 0) {
                    if (a > s) return;
                    a > f && (f = a);
                  }

                  if (a = o - c, h || !(a < 0)) {
                    if (a /= h, h < 0) {
                      if (a > s) return;
                      a > f && (f = a);
                    } else if (h > 0) {
                      if (a < f) return;
                      a < s && (s = a);
                    }

                    return f > 0 && (t[0] = u + f * l, t[1] = c + f * h), s < 1 && (n[0] = u + s * l, n[1] = c + s * h), !0;
                  }
                }
              }
            }
          }(c, m, t, n, e, r) ? u && (b.lineStart(), b.point(o, a), _ = !1) : (y || (b.lineStart(), b.point(c[0], c[1])), b.point(m[0], m[1]), u || b.lineEnd(), _ = !1);
        }
        p = o, g = a, y = u;
      }

      return x;
    };
  }

  var nl = {
    sphere: of,
    point: of,
    lineStart: function lineStart() {
      nl.point = rl, nl.lineEnd = el;
    },
    lineEnd: of,
    polygonStart: of,
    polygonEnd: of
  };

  function el() {
    nl.point = nl.lineEnd = of;
  }

  function rl(t, n) {
    Ws = t *= Yc, Zs = Kc(n *= Yc), Ks = Xc(n), nl.point = il;
  }

  function il(t, n) {
    t *= Yc;
    var e = Kc(n *= Yc),
        r = Xc(n),
        i = Lc(t - Ws),
        o = Xc(i),
        a = r * Kc(i),
        u = Ks * e - Zs * r * o,
        c = Zs * e + Ks * r * o;
    $s.add(Hc(Jc(a * a + u * u), c)), Ws = t, Zs = e, Ks = r;
  }

  function ol(t) {
    return $s = new y(), lf(t, nl), +$s;
  }

  var al = [null, null],
      ul = {
    type: "LineString",
    coordinates: al
  };

  function cl(t, n) {
    return al[0] = t, al[1] = n, ol(ul);
  }

  var fl = {
    Feature: function Feature(t, n) {
      return ll(t.geometry, n);
    },
    FeatureCollection: function FeatureCollection(t, n) {
      for (var e = t.features, r = -1, i = e.length; ++r < i;) {
        if (ll(e[r].geometry, n)) return !0;
      }

      return !1;
    }
  },
      sl = {
    Sphere: function Sphere() {
      return !0;
    },
    Point: function Point(t, n) {
      return hl(t.coordinates, n);
    },
    MultiPoint: function MultiPoint(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        if (hl(e[r], n)) return !0;
      }

      return !1;
    },
    LineString: function LineString(t, n) {
      return dl(t.coordinates, n);
    },
    MultiLineString: function MultiLineString(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        if (dl(e[r], n)) return !0;
      }

      return !1;
    },
    Polygon: function Polygon(t, n) {
      return pl(t.coordinates, n);
    },
    MultiPolygon: function MultiPolygon(t, n) {
      for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) {
        if (pl(e[r], n)) return !0;
      }

      return !1;
    },
    GeometryCollection: function GeometryCollection(t, n) {
      for (var e = t.geometries, r = -1, i = e.length; ++r < i;) {
        if (ll(e[r], n)) return !0;
      }

      return !1;
    }
  };

  function ll(t, n) {
    return !(!t || !sl.hasOwnProperty(t.type)) && sl[t.type](t, n);
  }

  function hl(t, n) {
    return 0 === cl(t, n);
  }

  function dl(t, n) {
    for (var e, r, i, o = 0, a = t.length; o < a; o++) {
      if (0 === (r = cl(t[o], n))) return !0;
      if (o > 0 && (i = cl(t[o], t[o - 1])) > 0 && e <= i && r <= i && (e + r - i) * (1 - Math.pow((e - r) / i, 2)) < Rc * i) return !0;
      e = r;
    }

    return !1;
  }

  function pl(t, n) {
    return !!Ls(t.map(gl), yl(n));
  }

  function gl(t) {
    return (t = t.map(yl)).pop(), t;
  }

  function yl(t) {
    return [t[0] * Yc, t[1] * Yc];
  }

  function vl(t, n, e) {
    var r = et(t, n - qc, e).concat(n);
    return function (t) {
      return r.map(function (n) {
        return [t, n];
      });
    };
  }

  function _l(t, n, e) {
    var r = et(t, n - qc, e).concat(n);
    return function (t) {
      return r.map(function (n) {
        return [n, t];
      });
    };
  }

  function bl() {
    var t,
        n,
        e,
        r,
        i,
        o,
        a,
        u,
        c,
        f,
        s,
        l,
        h = 10,
        d = h,
        p = 90,
        g = 360,
        y = 2.5;

    function v() {
      return {
        type: "MultiLineString",
        coordinates: _()
      };
    }

    function _() {
      return et(Gc(r / p) * p, e, p).map(s).concat(et(Gc(u / g) * g, a, g).map(l)).concat(et(Gc(n / h) * h, t, h).filter(function (t) {
        return Lc(t % p) > qc;
      }).map(c)).concat(et(Gc(o / d) * d, i, d).filter(function (t) {
        return Lc(t % g) > qc;
      }).map(f));
    }

    return v.lines = function () {
      return _().map(function (t) {
        return {
          type: "LineString",
          coordinates: t
        };
      });
    }, v.outline = function () {
      return {
        type: "Polygon",
        coordinates: [s(r).concat(l(a).slice(1), s(e).reverse().slice(1), l(u).reverse().slice(1))]
      };
    }, v.extent = function (t) {
      return arguments.length ? v.extentMajor(t).extentMinor(t) : v.extentMinor();
    }, v.extentMajor = function (t) {
      return arguments.length ? (r = +t[0][0], e = +t[1][0], u = +t[0][1], a = +t[1][1], r > e && (t = r, r = e, e = t), u > a && (t = u, u = a, a = t), v.precision(y)) : [[r, u], [e, a]];
    }, v.extentMinor = function (e) {
      return arguments.length ? (n = +e[0][0], t = +e[1][0], o = +e[0][1], i = +e[1][1], n > t && (e = n, n = t, t = e), o > i && (e = o, o = i, i = e), v.precision(y)) : [[n, o], [t, i]];
    }, v.step = function (t) {
      return arguments.length ? v.stepMajor(t).stepMinor(t) : v.stepMinor();
    }, v.stepMajor = function (t) {
      return arguments.length ? (p = +t[0], g = +t[1], v) : [p, g];
    }, v.stepMinor = function (t) {
      return arguments.length ? (h = +t[0], d = +t[1], v) : [h, d];
    }, v.precision = function (h) {
      return arguments.length ? (y = +h, c = vl(o, i, 90), f = _l(n, t, y), s = vl(u, a, 90), l = _l(r, e, y), v) : y;
    }, v.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]]);
  }

  var ml,
      xl,
      wl,
      Ml,
      Al = function Al(t) {
    return t;
  },
      Tl = new y(),
      Sl = new y(),
      El = {
    point: of,
    lineStart: of,
    lineEnd: of,
    polygonStart: function polygonStart() {
      El.lineStart = kl, El.lineEnd = Pl;
    },
    polygonEnd: function polygonEnd() {
      El.lineStart = El.lineEnd = El.point = of, Tl.add(Lc(Sl)), Sl = new y();
    },
    result: function result() {
      var t = Tl / 2;
      return Tl = new y(), t;
    }
  };

  function kl() {
    El.point = Nl;
  }

  function Nl(t, n) {
    El.point = Cl, ml = wl = t, xl = Ml = n;
  }

  function Cl(t, n) {
    Sl.add(Ml * t - wl * n), wl = t, Ml = n;
  }

  function Pl() {
    Cl(ml, xl);
  }

  var zl = El,
      Dl = 1 / 0,
      ql = Dl,
      Rl = -Dl,
      Fl = Rl;
  var Ol,
      Il,
      Ul,
      Bl,
      Yl = {
    point: function point(t, n) {
      t < Dl && (Dl = t);
      t > Rl && (Rl = t);
      n < ql && (ql = n);
      n > Fl && (Fl = n);
    },
    lineStart: of,
    lineEnd: of,
    polygonStart: of,
    polygonEnd: of,
    result: function result() {
      var t = [[Dl, ql], [Rl, Fl]];
      return Rl = Fl = -(ql = Dl = 1 / 0), t;
    }
  },
      Ll = 0,
      jl = 0,
      Hl = 0,
      Xl = 0,
      Gl = 0,
      Vl = 0,
      $l = 0,
      Wl = 0,
      Zl = 0,
      Kl = {
    point: Ql,
    lineStart: Jl,
    lineEnd: eh,
    polygonStart: function polygonStart() {
      Kl.lineStart = rh, Kl.lineEnd = ih;
    },
    polygonEnd: function polygonEnd() {
      Kl.point = Ql, Kl.lineStart = Jl, Kl.lineEnd = eh;
    },
    result: function result() {
      var t = Zl ? [$l / Zl, Wl / Zl] : Vl ? [Xl / Vl, Gl / Vl] : Hl ? [Ll / Hl, jl / Hl] : [NaN, NaN];
      return Ll = jl = Hl = Xl = Gl = Vl = $l = Wl = Zl = 0, t;
    }
  };

  function Ql(t, n) {
    Ll += t, jl += n, ++Hl;
  }

  function Jl() {
    Kl.point = th;
  }

  function th(t, n) {
    Kl.point = nh, Ql(Ul = t, Bl = n);
  }

  function nh(t, n) {
    var e = t - Ul,
        r = n - Bl,
        i = Jc(e * e + r * r);
    Xl += i * (Ul + t) / 2, Gl += i * (Bl + n) / 2, Vl += i, Ql(Ul = t, Bl = n);
  }

  function eh() {
    Kl.point = Ql;
  }

  function rh() {
    Kl.point = oh;
  }

  function ih() {
    ah(Ol, Il);
  }

  function oh(t, n) {
    Kl.point = ah, Ql(Ol = Ul = t, Il = Bl = n);
  }

  function ah(t, n) {
    var e = t - Ul,
        r = n - Bl,
        i = Jc(e * e + r * r);
    Xl += i * (Ul + t) / 2, Gl += i * (Bl + n) / 2, Vl += i, $l += (i = Bl * t - Ul * n) * (Ul + t), Wl += i * (Bl + n), Zl += 3 * i, Ql(Ul = t, Bl = n);
  }

  var uh = Kl;

  function ch(t) {
    this._context = t;
  }

  ch.prototype = {
    _radius: 4.5,
    pointRadius: function pointRadius(t) {
      return this._radius = t, this;
    },
    polygonStart: function polygonStart() {
      this._line = 0;
    },
    polygonEnd: function polygonEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      0 === this._line && this._context.closePath(), this._point = NaN;
    },
    point: function point(t, n) {
      switch (this._point) {
        case 0:
          this._context.moveTo(t, n), this._point = 1;
          break;

        case 1:
          this._context.lineTo(t, n);

          break;

        default:
          this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, Uc);
      }
    },
    result: of
  };
  var fh,
      sh,
      lh,
      hh,
      dh,
      ph = new y(),
      gh = {
    point: of,
    lineStart: function lineStart() {
      gh.point = yh;
    },
    lineEnd: function lineEnd() {
      fh && vh(sh, lh), gh.point = of;
    },
    polygonStart: function polygonStart() {
      fh = !0;
    },
    polygonEnd: function polygonEnd() {
      fh = null;
    },
    result: function result() {
      var t = +ph;
      return ph = new y(), t;
    }
  };

  function yh(t, n) {
    gh.point = vh, sh = hh = t, lh = dh = n;
  }

  function vh(t, n) {
    hh -= t, dh -= n, ph.add(Jc(hh * hh + dh * dh)), hh = t, dh = n;
  }

  var _h = gh;

  function bh() {
    this._string = [];
  }

  function mh(t) {
    return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z";
  }

  function xh(t) {
    return function (n) {
      var e = new wh();

      for (var r in t) {
        e[r] = t[r];
      }

      return e.stream = n, e;
    };
  }

  function wh() {}

  function Mh(t, n, e) {
    var r = t.clipExtent && t.clipExtent();
    return t.scale(150).translate([0, 0]), null != r && t.clipExtent(null), lf(e, t.stream(Yl)), n(Yl.result()), null != r && t.clipExtent(r), t;
  }

  function Ah(t, n, e) {
    return Mh(t, function (e) {
      var r = n[1][0] - n[0][0],
          i = n[1][1] - n[0][1],
          o = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1])),
          a = +n[0][0] + (r - o * (e[1][0] + e[0][0])) / 2,
          u = +n[0][1] + (i - o * (e[1][1] + e[0][1])) / 2;
      t.scale(150 * o).translate([a, u]);
    }, e);
  }

  function Th(t, n, e) {
    return Ah(t, [[0, 0], n], e);
  }

  function Sh(t, n, e) {
    return Mh(t, function (e) {
      var r = +n,
          i = r / (e[1][0] - e[0][0]),
          o = (r - i * (e[1][0] + e[0][0])) / 2,
          a = -i * e[0][1];
      t.scale(150 * i).translate([o, a]);
    }, e);
  }

  function Eh(t, n, e) {
    return Mh(t, function (e) {
      var r = +n,
          i = r / (e[1][1] - e[0][1]),
          o = -i * e[0][0],
          a = (r - i * (e[1][1] + e[0][1])) / 2;
      t.scale(150 * i).translate([o, a]);
    }, e);
  }

  bh.prototype = {
    _radius: 4.5,
    _circle: mh(4.5),
    pointRadius: function pointRadius(t) {
      return (t = +t) !== this._radius && (this._radius = t, this._circle = null), this;
    },
    polygonStart: function polygonStart() {
      this._line = 0;
    },
    polygonEnd: function polygonEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      0 === this._line && this._string.push("Z"), this._point = NaN;
    },
    point: function point(t, n) {
      switch (this._point) {
        case 0:
          this._string.push("M", t, ",", n), this._point = 1;
          break;

        case 1:
          this._string.push("L", t, ",", n);

          break;

        default:
          null == this._circle && (this._circle = mh(this._radius)), this._string.push("M", t, ",", n, this._circle);
      }
    },
    result: function result() {
      if (this._string.length) {
        var t = this._string.join("");

        return this._string = [], t;
      }

      return null;
    }
  }, wh.prototype = {
    constructor: wh,
    point: function point(t, n) {
      this.stream.point(t, n);
    },
    sphere: function sphere() {
      this.stream.sphere();
    },
    lineStart: function lineStart() {
      this.stream.lineStart();
    },
    lineEnd: function lineEnd() {
      this.stream.lineEnd();
    },
    polygonStart: function polygonStart() {
      this.stream.polygonStart();
    },
    polygonEnd: function polygonEnd() {
      this.stream.polygonEnd();
    }
  };
  var kh = Xc(30 * Yc);

  function Nh(t, n) {
    return +n ? function (t, n) {
      function e(r, i, o, a, u, c, f, s, l, h, d, p, g, y) {
        var v = f - r,
            _ = s - i,
            b = v * v + _ * _;

        if (b > 4 * n && g--) {
          var m = a + h,
              x = u + d,
              w = c + p,
              M = Jc(m * m + x * x + w * w),
              A = ef(w /= M),
              T = Lc(Lc(w) - 1) < qc || Lc(o - l) < qc ? (o + l) / 2 : Hc(x, m),
              S = t(T, A),
              E = S[0],
              k = S[1],
              N = E - r,
              C = k - i,
              P = _ * N - v * C;
          (P * P / b > n || Lc((v * N + _ * C) / b - .5) > .3 || a * h + u * d + c * p < kh) && (e(r, i, o, a, u, c, E, k, T, m /= M, x /= M, w, g, y), y.point(E, k), e(E, k, T, m, x, w, f, s, l, h, d, p, g, y));
        }
      }

      return function (n) {
        var r,
            i,
            o,
            a,
            u,
            c,
            f,
            s,
            l,
            h,
            d,
            p,
            g = {
          point: y,
          lineStart: v,
          lineEnd: b,
          polygonStart: function polygonStart() {
            n.polygonStart(), g.lineStart = m;
          },
          polygonEnd: function polygonEnd() {
            n.polygonEnd(), g.lineStart = v;
          }
        };

        function y(e, r) {
          e = t(e, r), n.point(e[0], e[1]);
        }

        function v() {
          s = NaN, g.point = _, n.lineStart();
        }

        function _(r, i) {
          var o = Ff([r, i]),
              a = t(r, i);
          e(s, l, f, h, d, p, s = a[0], l = a[1], f = r, h = o[0], d = o[1], p = o[2], 16, n), n.point(s, l);
        }

        function b() {
          g.point = y, n.lineEnd();
        }

        function m() {
          v(), g.point = x, g.lineEnd = w;
        }

        function x(t, n) {
          _(r = t, n), i = s, o = l, a = h, u = d, c = p, g.point = _;
        }

        function w() {
          e(s, l, f, h, d, p, i, o, r, a, u, c, 16, n), g.lineEnd = b, b();
        }

        return g;
      };
    }(t, n) : function (t) {
      return xh({
        point: function point(n, e) {
          n = t(n, e), this.stream.point(n[0], n[1]);
        }
      });
    }(t);
  }

  var Ch = xh({
    point: function point(t, n) {
      this.stream.point(t * Yc, n * Yc);
    }
  });

  function Ph(t, n, e, r, i, o) {
    if (!o) return function (t, n, e, r, i) {
      function o(o, a) {
        return [n + t * (o *= r), e - t * (a *= i)];
      }

      return o.invert = function (o, a) {
        return [(o - n) / t * r, (e - a) / t * i];
      }, o;
    }(t, n, e, r, i);
    var a = Xc(o),
        u = Kc(o),
        c = a * t,
        f = u * t,
        s = a / t,
        l = u / t,
        h = (u * e - a * n) / t,
        d = (u * n + a * e) / t;

    function p(t, o) {
      return [c * (t *= r) - f * (o *= i) + n, e - f * t - c * o];
    }

    return p.invert = function (t, n) {
      return [r * (s * t - l * n + h), i * (d - l * t - s * n)];
    }, p;
  }

  function zh(t) {
    return Dh(function () {
      return t;
    })();
  }

  function Dh(t) {
    var n,
        e,
        r,
        i,
        o,
        a,
        u,
        c,
        f,
        s,
        l = 150,
        h = 480,
        d = 250,
        p = 0,
        g = 0,
        y = 0,
        v = 0,
        _ = 0,
        b = 0,
        m = 1,
        x = 1,
        w = null,
        M = Gs,
        A = null,
        T = Al,
        S = .5;

    function E(t) {
      return c(t[0] * Yc, t[1] * Yc);
    }

    function k(t) {
      return (t = c.invert(t[0], t[1])) && [t[0] * Bc, t[1] * Bc];
    }

    function N() {
      var t = Ph(l, 0, 0, m, x, b).apply(null, n(p, g)),
          r = Ph(l, h - t[0], d - t[1], m, x, b);
      return e = Ns(y, v, _), u = Es(n, r), c = Es(e, u), a = Nh(u, S), C();
    }

    function C() {
      return f = s = null, E;
    }

    return E.stream = function (t) {
      return f && s === t ? f : f = Ch(function (t) {
        return xh({
          point: function point(n, e) {
            var r = t(n, e);
            return this.stream.point(r[0], r[1]);
          }
        });
      }(e)(M(a(T(s = t)))));
    }, E.preclip = function (t) {
      return arguments.length ? (M = t, w = void 0, C()) : M;
    }, E.postclip = function (t) {
      return arguments.length ? (T = t, A = r = i = o = null, C()) : T;
    }, E.clipAngle = function (t) {
      return arguments.length ? (M = +t ? Vs(w = t * Yc) : (w = null, Gs), C()) : w * Bc;
    }, E.clipExtent = function (t) {
      return arguments.length ? (T = null == t ? (A = r = i = o = null, Al) : tl(A = +t[0][0], r = +t[0][1], i = +t[1][0], o = +t[1][1]), C()) : null == A ? null : [[A, r], [i, o]];
    }, E.scale = function (t) {
      return arguments.length ? (l = +t, N()) : l;
    }, E.translate = function (t) {
      return arguments.length ? (h = +t[0], d = +t[1], N()) : [h, d];
    }, E.center = function (t) {
      return arguments.length ? (p = t[0] % 360 * Yc, g = t[1] % 360 * Yc, N()) : [p * Bc, g * Bc];
    }, E.rotate = function (t) {
      return arguments.length ? (y = t[0] % 360 * Yc, v = t[1] % 360 * Yc, _ = t.length > 2 ? t[2] % 360 * Yc : 0, N()) : [y * Bc, v * Bc, _ * Bc];
    }, E.angle = function (t) {
      return arguments.length ? (b = t % 360 * Yc, N()) : b * Bc;
    }, E.reflectX = function (t) {
      return arguments.length ? (m = t ? -1 : 1, N()) : m < 0;
    }, E.reflectY = function (t) {
      return arguments.length ? (x = t ? -1 : 1, N()) : x < 0;
    }, E.precision = function (t) {
      return arguments.length ? (a = Nh(u, S = t * t), C()) : Jc(S);
    }, E.fitExtent = function (t, n) {
      return Ah(E, t, n);
    }, E.fitSize = function (t, n) {
      return Th(E, t, n);
    }, E.fitWidth = function (t, n) {
      return Sh(E, t, n);
    }, E.fitHeight = function (t, n) {
      return Eh(E, t, n);
    }, function () {
      return n = t.apply(this, arguments), E.invert = n.invert && k, N();
    };
  }

  function qh(t) {
    var n = 0,
        e = Fc / 3,
        r = Dh(t),
        i = r(n, e);
    return i.parallels = function (t) {
      return arguments.length ? r(n = t[0] * Yc, e = t[1] * Yc) : [n * Bc, e * Bc];
    }, i;
  }

  function Rh(t, n) {
    var e = Kc(t),
        r = (e + Kc(n)) / 2;
    if (Lc(r) < qc) return function (t) {
      var n = Xc(t);

      function e(t, e) {
        return [t * n, Kc(e) / n];
      }

      return e.invert = function (t, e) {
        return [t / n, ef(e * n)];
      }, e;
    }(t);
    var i = 1 + e * (2 * r - e),
        o = Jc(i) / r;

    function a(t, n) {
      var e = Jc(i - 2 * r * Kc(n)) / r;
      return [e * Kc(t *= r), o - e * Xc(t)];
    }

    return a.invert = function (t, n) {
      var e = o - n,
          a = Hc(t, Lc(e)) * Qc(e);
      return e * r < 0 && (a -= Fc * Qc(t) * Qc(e)), [a / r, ef((i - (t * t + e * e) * r * r) / (2 * r))];
    }, a;
  }

  function Fh() {
    return qh(Rh).scale(155.424).center([0, 33.6442]);
  }

  function Oh() {
    return Fh().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7]);
  }

  function Ih(t) {
    return function (n, e) {
      var r = Xc(n),
          i = Xc(e),
          o = t(r * i);
      return o === 1 / 0 ? [2, 0] : [o * i * Kc(n), o * Kc(e)];
    };
  }

  function Uh(t) {
    return function (n, e) {
      var r = Jc(n * n + e * e),
          i = t(r),
          o = Kc(i),
          a = Xc(i);
      return [Hc(n * o, r * a), ef(r && e * o / r)];
    };
  }

  var Bh = Ih(function (t) {
    return Jc(2 / (1 + t));
  });
  Bh.invert = Uh(function (t) {
    return 2 * ef(t / 2);
  });
  var Yh = Ih(function (t) {
    return (t = nf(t)) && t / Kc(t);
  });

  function Lh(t, n) {
    return [t, Wc(tf((Oc + n) / 2))];
  }

  function jh(t) {
    var n,
        e,
        r,
        i = zh(t),
        o = i.center,
        a = i.scale,
        u = i.translate,
        c = i.clipExtent,
        f = null;

    function s() {
      var o = Fc * a(),
          u = i(Ds(i.rotate()).invert([0, 0]));
      return c(null == f ? [[u[0] - o, u[1] - o], [u[0] + o, u[1] + o]] : t === Lh ? [[Math.max(u[0] - o, f), n], [Math.min(u[0] + o, e), r]] : [[f, Math.max(u[1] - o, n)], [e, Math.min(u[1] + o, r)]]);
    }

    return i.scale = function (t) {
      return arguments.length ? (a(t), s()) : a();
    }, i.translate = function (t) {
      return arguments.length ? (u(t), s()) : u();
    }, i.center = function (t) {
      return arguments.length ? (o(t), s()) : o();
    }, i.clipExtent = function (t) {
      return arguments.length ? (null == t ? f = n = e = r = null : (f = +t[0][0], n = +t[0][1], e = +t[1][0], r = +t[1][1]), s()) : null == f ? null : [[f, n], [e, r]];
    }, s();
  }

  function Hh(t) {
    return tf((Oc + t) / 2);
  }

  function Xh(t, n) {
    var e = Xc(t),
        r = t === n ? Kc(t) : Wc(e / Xc(n)) / Wc(Hh(n) / Hh(t)),
        i = e * Zc(Hh(t), r) / r;
    if (!r) return Lh;

    function o(t, n) {
      i > 0 ? n < -Oc + qc && (n = -Oc + qc) : n > Oc - qc && (n = Oc - qc);
      var e = i / Zc(Hh(n), r);
      return [e * Kc(r * t), i - e * Xc(r * t)];
    }

    return o.invert = function (t, n) {
      var e = i - n,
          o = Qc(r) * Jc(t * t + e * e),
          a = Hc(t, Lc(e)) * Qc(e);
      return e * r < 0 && (a -= Fc * Qc(t) * Qc(e)), [a / r, 2 * jc(Zc(i / o, 1 / r)) - Oc];
    }, o;
  }

  function Gh(t, n) {
    return [t, n];
  }

  function Vh(t, n) {
    var e = Xc(t),
        r = t === n ? Kc(t) : (e - Xc(n)) / (n - t),
        i = e / r + t;
    if (Lc(r) < qc) return Gh;

    function o(t, n) {
      var e = i - n,
          o = r * t;
      return [e * Kc(o), i - e * Xc(o)];
    }

    return o.invert = function (t, n) {
      var e = i - n,
          o = Hc(t, Lc(e)) * Qc(e);
      return e * r < 0 && (o -= Fc * Qc(t) * Qc(e)), [o / r, i - Qc(r) * Jc(t * t + e * e)];
    }, o;
  }

  Yh.invert = Uh(function (t) {
    return t;
  }), Lh.invert = function (t, n) {
    return [t, 2 * jc(Vc(n)) - Oc];
  }, Gh.invert = Gh;
  var $h = 1.340264,
      Wh = -.081106,
      Zh = 893e-6,
      Kh = .003796,
      Qh = Jc(3) / 2;

  function Jh(t, n) {
    var e = ef(Qh * Kc(n)),
        r = e * e,
        i = r * r * r;
    return [t * Xc(e) / (Qh * ($h + 3 * Wh * r + i * (7 * Zh + 9 * Kh * r))), e * ($h + Wh * r + i * (Zh + Kh * r))];
  }

  function td(t, n) {
    var e = Xc(n),
        r = Xc(t) * e;
    return [e * Kc(t) / r, Kc(n) / r];
  }

  function nd(t, n) {
    var e = n * n,
        r = e * e;
    return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) - .013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 - .005916 * r)))];
  }

  function ed(t, n) {
    return [Xc(n) * Kc(t), Kc(n)];
  }

  function rd(t, n) {
    var e = Xc(n),
        r = 1 + Xc(t) * e;
    return [e * Kc(t) / r, Kc(n) / r];
  }

  function id(t, n) {
    return [Wc(tf((Oc + n) / 2)), -t];
  }

  function od(t, n) {
    return t.parent === n.parent ? 1 : 2;
  }

  function ad(t, n) {
    return t + n.x;
  }

  function ud(t, n) {
    return Math.max(t, n.y);
  }

  function cd(t) {
    var n = 0,
        e = t.children,
        r = e && e.length;
    if (r) for (; --r >= 0;) {
      n += e[r].value;
    } else n = 1;
    t.value = n;
  }

  function fd(t, n) {
    t instanceof Map ? (t = [void 0, t], void 0 === n && (n = ld)) : void 0 === n && (n = sd);

    for (var e, r, i, o, a, u = new pd(t), c = [u]; e = c.pop();) {
      if ((i = n(e.data)) && (a = (i = Array.from(i)).length)) for (e.children = i, o = a - 1; o >= 0; --o) {
        c.push(r = i[o] = new pd(i[o])), r.parent = e, r.depth = e.depth + 1;
      }
    }

    return u.eachBefore(dd);
  }

  function sd(t) {
    return t.children;
  }

  function ld(t) {
    return Array.isArray(t) ? t[1] : null;
  }

  function hd(t) {
    void 0 !== t.data.value && (t.value = t.data.value), t.data = t.data.data;
  }

  function dd(t) {
    var n = 0;

    do {
      t.height = n;
    } while ((t = t.parent) && t.height < ++n);
  }

  function pd(t) {
    this.data = t, this.depth = this.height = 0, this.parent = null;
  }

  function gd(t) {
    for (var n, e, r = 0, i = (t = function (t) {
      for (var n, e, r = t.length; r;) {
        e = Math.random() * r-- | 0, n = t[r], t[r] = t[e], t[e] = n;
      }

      return t;
    }(Array.from(t))).length, o = []; r < i;) {
      n = t[r], e && _d(e, n) ? ++r : (e = md(o = yd(o, n)), r = 0);
    }

    return e;
  }

  function yd(t, n) {
    var e, r;
    if (bd(n, t)) return [n];

    for (e = 0; e < t.length; ++e) {
      if (vd(n, t[e]) && bd(xd(t[e], n), t)) return [t[e], n];
    }

    for (e = 0; e < t.length - 1; ++e) {
      for (r = e + 1; r < t.length; ++r) {
        if (vd(xd(t[e], t[r]), n) && vd(xd(t[e], n), t[r]) && vd(xd(t[r], n), t[e]) && bd(wd(t[e], t[r], n), t)) return [t[e], t[r], n];
      }
    }

    throw new Error();
  }

  function vd(t, n) {
    var e = t.r - n.r,
        r = n.x - t.x,
        i = n.y - t.y;
    return e < 0 || e * e < r * r + i * i;
  }

  function _d(t, n) {
    var e = t.r - n.r + 1e-9 * Math.max(t.r, n.r, 1),
        r = n.x - t.x,
        i = n.y - t.y;
    return e > 0 && e * e > r * r + i * i;
  }

  function bd(t, n) {
    for (var e = 0; e < n.length; ++e) {
      if (!_d(t, n[e])) return !1;
    }

    return !0;
  }

  function md(t) {
    switch (t.length) {
      case 1:
        return function (t) {
          return {
            x: t.x,
            y: t.y,
            r: t.r
          };
        }(t[0]);

      case 2:
        return xd(t[0], t[1]);

      case 3:
        return wd(t[0], t[1], t[2]);
    }
  }

  function xd(t, n) {
    var e = t.x,
        r = t.y,
        i = t.r,
        o = n.x,
        a = n.y,
        u = n.r,
        c = o - e,
        f = a - r,
        s = u - i,
        l = Math.sqrt(c * c + f * f);
    return {
      x: (e + o + c / l * s) / 2,
      y: (r + a + f / l * s) / 2,
      r: (l + i + u) / 2
    };
  }

  function wd(t, n, e) {
    var r = t.x,
        i = t.y,
        o = t.r,
        a = n.x,
        u = n.y,
        c = n.r,
        f = e.x,
        s = e.y,
        l = e.r,
        h = r - a,
        d = r - f,
        p = i - u,
        g = i - s,
        y = c - o,
        v = l - o,
        _ = r * r + i * i - o * o,
        b = _ - a * a - u * u + c * c,
        m = _ - f * f - s * s + l * l,
        x = d * p - h * g,
        w = (p * m - g * b) / (2 * x) - r,
        M = (g * y - p * v) / x,
        A = (d * b - h * m) / (2 * x) - i,
        T = (h * v - d * y) / x,
        S = M * M + T * T - 1,
        E = 2 * (o + w * M + A * T),
        k = w * w + A * A - o * o,
        N = -(S ? (E + Math.sqrt(E * E - 4 * S * k)) / (2 * S) : k / E);

    return {
      x: r + w + M * N,
      y: i + A + T * N,
      r: N
    };
  }

  function Md(t, n, e) {
    var r,
        i,
        o,
        a,
        u = t.x - n.x,
        c = t.y - n.y,
        f = u * u + c * c;
    f ? (i = n.r + e.r, i *= i, a = t.r + e.r, i > (a *= a) ? (r = (f + a - i) / (2 * f), o = Math.sqrt(Math.max(0, a / f - r * r)), e.x = t.x - r * u - o * c, e.y = t.y - r * c + o * u) : (r = (f + i - a) / (2 * f), o = Math.sqrt(Math.max(0, i / f - r * r)), e.x = n.x + r * u - o * c, e.y = n.y + r * c + o * u)) : (e.x = n.x + e.r, e.y = n.y);
  }

  function Ad(t, n) {
    var e = t.r + n.r - 1e-6,
        r = n.x - t.x,
        i = n.y - t.y;
    return e > 0 && e * e > r * r + i * i;
  }

  function Td(t) {
    var n = t._,
        e = t.next._,
        r = n.r + e.r,
        i = (n.x * e.r + e.x * n.r) / r,
        o = (n.y * e.r + e.y * n.r) / r;
    return i * i + o * o;
  }

  function Sd(t) {
    this._ = t, this.next = null, this.previous = null;
  }

  function Ed(t) {
    if (!(i = (t = function (t) {
      return "object" == _typeof(t) && "length" in t ? t : Array.from(t);
    }(t)).length)) return 0;
    var n, e, r, i, o, a, u, c, f, s, l;
    if ((n = t[0]).x = 0, n.y = 0, !(i > 1)) return n.r;
    if (e = t[1], n.x = -e.r, e.x = n.r, e.y = 0, !(i > 2)) return n.r + e.r;
    Md(e, n, r = t[2]), n = new Sd(n), e = new Sd(e), r = new Sd(r), n.next = r.previous = e, e.next = n.previous = r, r.next = e.previous = n;

    t: for (u = 3; u < i; ++u) {
      Md(n._, e._, r = t[u]), r = new Sd(r), c = e.next, f = n.previous, s = e._.r, l = n._.r;

      do {
        if (s <= l) {
          if (Ad(c._, r._)) {
            e = c, n.next = e, e.previous = n, --u;
            continue t;
          }

          s += c._.r, c = c.next;
        } else {
          if (Ad(f._, r._)) {
            (n = f).next = e, e.previous = n, --u;
            continue t;
          }

          l += f._.r, f = f.previous;
        }
      } while (c !== f.next);

      for (r.previous = n, r.next = e, n.next = e.previous = e = r, o = Td(n); (r = r.next) !== e;) {
        (a = Td(r)) < o && (n = r, o = a);
      }

      e = n.next;
    }

    for (n = [e._], r = e; (r = r.next) !== e;) {
      n.push(r._);
    }

    for (r = gd(n), u = 0; u < i; ++u) {
      (n = t[u]).x -= r.x, n.y -= r.y;
    }

    return r.r;
  }

  function kd(t) {
    return null == t ? null : Nd(t);
  }

  function Nd(t) {
    if ("function" != typeof t) throw new Error();
    return t;
  }

  function Cd() {
    return 0;
  }

  function Pd(t) {
    return function () {
      return t;
    };
  }

  function zd(t) {
    return Math.sqrt(t.value);
  }

  function Dd(t) {
    return function (n) {
      n.children || (n.r = Math.max(0, +t(n) || 0));
    };
  }

  function qd(t, n) {
    return function (e) {
      if (r = e.children) {
        var r,
            i,
            o,
            a = r.length,
            u = t(e) * n || 0;
        if (u) for (i = 0; i < a; ++i) {
          r[i].r += u;
        }
        if (o = Ed(r), u) for (i = 0; i < a; ++i) {
          r[i].r -= u;
        }
        e.r = o + u;
      }
    };
  }

  function Rd(t) {
    return function (n) {
      var e = n.parent;
      n.r *= t, e && (n.x = e.x + t * n.x, n.y = e.y + t * n.y);
    };
  }

  function Fd(t) {
    t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1);
  }

  function Od(t, n, e, r, i) {
    for (var o, a = t.children, u = -1, c = a.length, f = t.value && (r - n) / t.value; ++u < c;) {
      (o = a[u]).y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * f;
    }
  }

  Jh.invert = function (t, n) {
    for (var e, r = n, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i = (r -= e = (r * ($h + Wh * i + o * (Zh + Kh * i)) - n) / ($h + 3 * Wh * i + o * (7 * Zh + 9 * Kh * i))) * r) * i * i, !(Lc(e) < Rc)); ++a) {
      ;
    }

    return [Qh * t * ($h + 3 * Wh * i + o * (7 * Zh + 9 * Kh * i)) / Xc(r), ef(Kc(r) / Qh)];
  }, td.invert = Uh(jc), nd.invert = function (t, n) {
    var e,
        r = n,
        i = 25;

    do {
      var o = r * r,
          a = o * o;
      r -= e = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 * a))) - n) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 * 11 * a)));
    } while (Lc(e) > qc && --i > 0);

    return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r];
  }, ed.invert = Uh(ef), rd.invert = Uh(function (t) {
    return 2 * jc(t);
  }), id.invert = function (t, n) {
    return [-n, 2 * jc(Vc(t)) - Oc];
  }, pd.prototype = fd.prototype = _defineProperty({
    constructor: pd,
    count: function count() {
      return this.eachAfter(cd);
    },
    each: function each(t, n) {
      var e = -1;

      var _iterator34 = _createForOfIteratorHelper(this),
          _step34;

      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var _r33 = _step34.value;
          t.call(n, _r33, ++e, this);
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }

      return this;
    },
    eachAfter: function eachAfter(t, n) {
      for (var e, r, i, o = this, a = [o], u = [], c = -1; o = a.pop();) {
        if (u.push(o), e = o.children) for (r = 0, i = e.length; r < i; ++r) {
          a.push(e[r]);
        }
      }

      for (; o = u.pop();) {
        t.call(n, o, ++c, this);
      }

      return this;
    },
    eachBefore: function eachBefore(t, n) {
      for (var e, r, i = this, o = [i], a = -1; i = o.pop();) {
        if (t.call(n, i, ++a, this), e = i.children) for (r = e.length - 1; r >= 0; --r) {
          o.push(e[r]);
        }
      }

      return this;
    },
    find: function find(t, n) {
      var e = -1;

      var _iterator35 = _createForOfIteratorHelper(this),
          _step35;

      try {
        for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
          var _r34 = _step35.value;
          if (t.call(n, _r34, ++e, this)) return _r34;
        }
      } catch (err) {
        _iterator35.e(err);
      } finally {
        _iterator35.f();
      }
    },
    sum: function sum(t) {
      return this.eachAfter(function (n) {
        for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;) {
          e += r[i].value;
        }

        n.value = e;
      });
    },
    sort: function sort(t) {
      return this.eachBefore(function (n) {
        n.children && n.children.sort(t);
      });
    },
    path: function path(t) {
      for (var n = this, e = function (t, n) {
        if (t === n) return t;
        var e = t.ancestors(),
            r = n.ancestors(),
            i = null;
        t = e.pop(), n = r.pop();

        for (; t === n;) {
          i = t, t = e.pop(), n = r.pop();
        }

        return i;
      }(n, t), r = [n]; n !== e;) {
        n = n.parent, r.push(n);
      }

      for (var i = r.length; t !== e;) {
        r.splice(i, 0, t), t = t.parent;
      }

      return r;
    },
    ancestors: function ancestors() {
      for (var t = this, n = [t]; t = t.parent;) {
        n.push(t);
      }

      return n;
    },
    descendants: function descendants() {
      return Array.from(this);
    },
    leaves: function leaves() {
      var t = [];
      return this.eachBefore(function (n) {
        n.children || t.push(n);
      }), t;
    },
    links: function links() {
      var t = this,
          n = [];
      return t.each(function (e) {
        e !== t && n.push({
          source: e.parent,
          target: e
        });
      }), n;
    },
    copy: function copy() {
      return fd(this).eachBefore(hd);
    }
  }, Symbol.iterator, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var t, n, e, r, i, o;
    return regeneratorRuntime.wrap(function _callee5$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            i = this, o = [i];

          case 1:
            t = o.reverse(), o = [];

          case 2:
            if (!(i = t.pop())) {
              _context9.next = 9;
              break;
            }

            _context9.next = 5;
            return i;

          case 5:
            if (!(n = i.children)) {
              _context9.next = 7;
              break;
            }

            for (e = 0, r = n.length; e < r; ++e) {
              o.push(n[e]);
            }

          case 7:
            _context9.next = 2;
            break;

          case 9:
            if (o.length) {
              _context9.next = 1;
              break;
            }

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee5, this);
  }));
  var Id = {
    depth: -1
  },
      Ud = {};

  function Bd(t) {
    return t.id;
  }

  function Yd(t) {
    return t.parentId;
  }

  function Ld(t, n) {
    return t.parent === n.parent ? 1 : 2;
  }

  function jd(t) {
    var n = t.children;
    return n ? n[0] : t.t;
  }

  function Hd(t) {
    var n = t.children;
    return n ? n[n.length - 1] : t.t;
  }

  function Xd(t, n, e) {
    var r = e / (n.i - t.i);
    n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e;
  }

  function Gd(t, n, e) {
    return t.a.parent === n.parent ? t.a : e;
  }

  function Vd(t, n) {
    this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = n;
  }

  function $d(t, n, e, r, i) {
    for (var o, a = t.children, u = -1, c = a.length, f = t.value && (i - e) / t.value; ++u < c;) {
      (o = a[u]).x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o.value * f;
    }
  }

  Vd.prototype = Object.create(pd.prototype);
  var Wd = (1 + Math.sqrt(5)) / 2;

  function Zd(t, n, e, r, i, o) {
    for (var a, u, c, f, s, l, h, d, p, g, y, v = [], _ = n.children, b = 0, m = 0, x = _.length, w = n.value; b < x;) {
      c = i - e, f = o - r;

      do {
        s = _[m++].value;
      } while (!s && m < x);

      for (l = h = s, y = s * s * (g = Math.max(f / c, c / f) / (w * t)), p = Math.max(h / y, y / l); m < x; ++m) {
        if (s += u = _[m].value, u < l && (l = u), u > h && (h = u), y = s * s * g, (d = Math.max(h / y, y / l)) > p) {
          s -= u;
          break;
        }

        p = d;
      }

      v.push(a = {
        value: s,
        dice: c < f,
        children: _.slice(b, m)
      }), a.dice ? Od(a, e, r, i, w ? r += f * s / w : o) : $d(a, e, r, w ? e += c * s / w : i, o), w -= s, b = m;
    }

    return v;
  }

  var Kd = function t(n) {
    function e(t, e, r, i, o) {
      Zd(n, t, e, r, i, o);
    }

    return e.ratio = function (n) {
      return t((n = +n) > 1 ? n : 1);
    }, e;
  }(Wd);

  var Qd = function t(n) {
    function e(t, e, r, i, o) {
      if ((a = t._squarify) && a.ratio === n) for (var a, u, c, f, s, l = -1, h = a.length, d = t.value; ++l < h;) {
        for (c = (u = a[l]).children, f = u.value = 0, s = c.length; f < s; ++f) {
          u.value += c[f].value;
        }

        u.dice ? Od(u, e, r, i, d ? r += (o - r) * u.value / d : o) : $d(u, e, r, d ? e += (i - e) * u.value / d : i, o), d -= u.value;
      } else t._squarify = a = Zd(n, t, e, r, i, o), a.ratio = n;
    }

    return e.ratio = function (n) {
      return t((n = +n) > 1 ? n : 1);
    }, e;
  }(Wd);

  function Jd(t, n, e) {
    return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0]);
  }

  function tp(t, n) {
    return t[0] - n[0] || t[1] - n[1];
  }

  function np(t) {
    var n = t.length,
        e = [0, 1];
    var r,
        i = 2;

    for (r = 2; r < n; ++r) {
      for (; i > 1 && Jd(t[e[i - 2]], t[e[i - 1]], t[r]) <= 0;) {
        --i;
      }

      e[i++] = r;
    }

    return e.slice(0, i);
  }

  var ep = Math.random,
      rp = function t(n) {
    function e(t, e) {
      return t = null == t ? 0 : +t, e = null == e ? 1 : +e, 1 === arguments.length ? (e = t, t = 0) : e -= t, function () {
        return n() * e + t;
      };
    }

    return e.source = t, e;
  }(ep),
      ip = function t(n) {
    function e(t, e) {
      return arguments.length < 2 && (e = t, t = 0), t = Math.floor(t), e = Math.floor(e) - t, function () {
        return Math.floor(n() * e + t);
      };
    }

    return e.source = t, e;
  }(ep),
      op = function t(n) {
    function e(t, e) {
      var r, i;
      return t = null == t ? 0 : +t, e = null == e ? 1 : +e, function () {
        var o;
        if (null != r) o = r, r = null;else do {
          r = 2 * n() - 1, o = 2 * n() - 1, i = r * r + o * o;
        } while (!i || i > 1);
        return t + e * o * Math.sqrt(-2 * Math.log(i) / i);
      };
    }

    return e.source = t, e;
  }(ep),
      ap = function t(n) {
    var e = op.source(n);

    function r() {
      var t = e.apply(this, arguments);
      return function () {
        return Math.exp(t());
      };
    }

    return r.source = t, r;
  }(ep),
      up = function t(n) {
    function e(t) {
      return (t = +t) <= 0 ? function () {
        return 0;
      } : function () {
        for (var e = 0, r = t; r > 1; --r) {
          e += n();
        }

        return e + r * n();
      };
    }

    return e.source = t, e;
  }(ep),
      cp = function t(n) {
    var e = up.source(n);

    function r(t) {
      if (0 == (t = +t)) return n;
      var r = e(t);
      return function () {
        return r() / t;
      };
    }

    return r.source = t, r;
  }(ep),
      fp = function t(n) {
    function e(t) {
      return function () {
        return -Math.log1p(-n()) / t;
      };
    }

    return e.source = t, e;
  }(ep),
      sp = function t(n) {
    function e(t) {
      if ((t = +t) < 0) throw new RangeError("invalid alpha");
      return t = 1 / -t, function () {
        return Math.pow(1 - n(), t);
      };
    }

    return e.source = t, e;
  }(ep),
      lp = function t(n) {
    function e(t) {
      if ((t = +t) < 0 || t > 1) throw new RangeError("invalid p");
      return function () {
        return Math.floor(n() + t);
      };
    }

    return e.source = t, e;
  }(ep),
      hp = function t(n) {
    function e(t) {
      if ((t = +t) < 0 || t > 1) throw new RangeError("invalid p");
      return 0 === t ? function () {
        return 1 / 0;
      } : 1 === t ? function () {
        return 1;
      } : (t = Math.log1p(-t), function () {
        return 1 + Math.floor(Math.log1p(-n()) / t);
      });
    }

    return e.source = t, e;
  }(ep),
      dp = function t(n) {
    var e = op.source(n)();

    function r(t, r) {
      if ((t = +t) < 0) throw new RangeError("invalid k");
      if (0 === t) return function () {
        return 0;
      };
      if (r = null == r ? 1 : +r, 1 === t) return function () {
        return -Math.log1p(-n()) * r;
      };
      var i = (t < 1 ? t + 1 : t) - 1 / 3,
          o = 1 / (3 * Math.sqrt(i)),
          a = t < 1 ? function () {
        return Math.pow(n(), 1 / t);
      } : function () {
        return 1;
      };
      return function () {
        do {
          do {
            var t = e(),
                u = 1 + o * t;
          } while (u <= 0);

          u *= u * u;
          var c = 1 - n();
        } while (c >= 1 - .0331 * t * t * t * t && Math.log(c) >= .5 * t * t + i * (1 - u + Math.log(u)));

        return i * u * a() * r;
      };
    }

    return r.source = t, r;
  }(ep),
      pp = function t(n) {
    var e = dp.source(n);

    function r(t, n) {
      var r = e(t),
          i = e(n);
      return function () {
        var t = r();
        return 0 === t ? 0 : t / (t + i());
      };
    }

    return r.source = t, r;
  }(ep),
      gp = function t(n) {
    var e = hp.source(n),
        r = pp.source(n);

    function i(t, n) {
      return t = +t, (n = +n) >= 1 ? function () {
        return t;
      } : n <= 0 ? function () {
        return 0;
      } : function () {
        for (var i = 0, o = t, a = n; o * a > 16 && o * (1 - a) > 16;) {
          var u = Math.floor((o + 1) * a),
              c = r(u, o - u + 1)();
          c <= a ? (i += u, o -= u, a = (a - c) / (1 - c)) : (o = u - 1, a /= c);
        }

        for (var f = a < .5, s = e(f ? a : 1 - a), l = s(), h = 0; l <= o; ++h) {
          l += s();
        }

        return i + (f ? h : o - h);
      };
    }

    return i.source = t, i;
  }(ep),
      yp = function t(n) {
    function e(t, e, r) {
      var i;
      return 0 == (t = +t) ? i = function i(t) {
        return -Math.log(t);
      } : (t = 1 / t, i = function i(n) {
        return Math.pow(n, t);
      }), e = null == e ? 0 : +e, r = null == r ? 1 : +r, function () {
        return e + r * i(-Math.log1p(-n()));
      };
    }

    return e.source = t, e;
  }(ep),
      vp = function t(n) {
    function e(t, e) {
      return t = null == t ? 0 : +t, e = null == e ? 1 : +e, function () {
        return t + e * Math.tan(Math.PI * n());
      };
    }

    return e.source = t, e;
  }(ep),
      _p = function t(n) {
    function e(t, e) {
      return t = null == t ? 0 : +t, e = null == e ? 1 : +e, function () {
        var r = n();
        return t + e * Math.log(r / (1 - r));
      };
    }

    return e.source = t, e;
  }(ep),
      bp = function t(n) {
    var e = dp.source(n),
        r = gp.source(n);

    function i(t) {
      return function () {
        for (var i = 0, o = t; o > 16;) {
          var a = Math.floor(.875 * o),
              u = e(a)();
          if (u > o) return i + r(a - 1, o / u)();
          i += a, o -= u;
        }

        for (var c = -Math.log1p(-n()), f = 0; c <= o; ++f) {
          c -= Math.log1p(-n());
        }

        return i + f;
      };
    }

    return i.source = t, i;
  }(ep);

  var mp = 1 / 4294967296;

  function xp(t, n) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.range(t);
        break;

      default:
        this.range(n).domain(t);
    }

    return this;
  }

  function wp(t, n) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        "function" == typeof t ? this.interpolator(t) : this.range(t);
        break;

      default:
        this.domain(t), "function" == typeof n ? this.interpolator(n) : this.range(n);
    }

    return this;
  }

  var Mp = Symbol("implicit");

  function Ap() {
    var t = new v(),
        n = [],
        e = [],
        r = Mp;

    function i(i) {
      var o = t.get(i);

      if (void 0 === o) {
        if (r !== Mp) return r;
        t.set(i, o = n.push(i) - 1);
      }

      return e[o % e.length];
    }

    return i.domain = function (e) {
      if (!arguments.length) return n.slice();
      n = [], t = new v();

      var _iterator36 = _createForOfIteratorHelper(e),
          _step36;

      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var _r35 = _step36.value;
          t.has(_r35) || t.set(_r35, n.push(_r35) - 1);
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }

      return i;
    }, i.range = function (t) {
      return arguments.length ? (e = Array.from(t), i) : e.slice();
    }, i.unknown = function (t) {
      return arguments.length ? (r = t, i) : r;
    }, i.copy = function () {
      return Ap(n, e).unknown(r);
    }, xp.apply(i, arguments), i;
  }

  function Tp() {
    var t,
        n,
        e = Ap().unknown(void 0),
        r = e.domain,
        i = e.range,
        o = 0,
        a = 1,
        u = !1,
        c = 0,
        f = 0,
        s = .5;

    function l() {
      var e = r().length,
          l = a < o,
          h = l ? a : o,
          d = l ? o : a;
      t = (d - h) / Math.max(1, e - c + 2 * f), u && (t = Math.floor(t)), h += (d - h - t * (e - c)) * s, n = t * (1 - c), u && (h = Math.round(h), n = Math.round(n));
      var p = et(e).map(function (n) {
        return h + t * n;
      });
      return i(l ? p.reverse() : p);
    }

    return delete e.unknown, e.domain = function (t) {
      return arguments.length ? (r(t), l()) : r();
    }, e.range = function (t) {
      var _t26, _t27;

      return arguments.length ? ((_t26 = t, _t27 = _slicedToArray(_t26, 2), o = _t27[0], a = _t27[1], _t26), o = +o, a = +a, l()) : [o, a];
    }, e.rangeRound = function (t) {
      var _t28, _t29;

      return (_t28 = t, _t29 = _slicedToArray(_t28, 2), o = _t29[0], a = _t29[1], _t28), o = +o, a = +a, u = !0, l();
    }, e.bandwidth = function () {
      return n;
    }, e.step = function () {
      return t;
    }, e.round = function (t) {
      return arguments.length ? (u = !!t, l()) : u;
    }, e.padding = function (t) {
      return arguments.length ? (c = Math.min(1, f = +t), l()) : c;
    }, e.paddingInner = function (t) {
      return arguments.length ? (c = Math.min(1, t), l()) : c;
    }, e.paddingOuter = function (t) {
      return arguments.length ? (f = +t, l()) : f;
    }, e.align = function (t) {
      return arguments.length ? (s = Math.max(0, Math.min(1, t)), l()) : s;
    }, e.copy = function () {
      return Tp(r(), [o, a]).round(u).paddingInner(c).paddingOuter(f).align(s);
    }, xp.apply(l(), arguments);
  }

  function Sp(t) {
    var n = t.copy;
    return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function () {
      return Sp(n());
    }, t;
  }

  function Ep(t) {
    return +t;
  }

  var kp = [0, 1];

  function Np(t) {
    return t;
  }

  function Cp(t, n) {
    return (n -= t = +t) ? function (e) {
      return (e - t) / n;
    } : function (t) {
      return function () {
        return t;
      };
    }(isNaN(n) ? NaN : .5);
  }

  function Pp(t, n, e) {
    var r = t[0],
        i = t[1],
        o = n[0],
        a = n[1];
    return i < r ? (r = Cp(i, r), o = e(a, o)) : (r = Cp(r, i), o = e(o, a)), function (t) {
      return o(r(t));
    };
  }

  function zp(t, n, e) {
    var r = Math.min(t.length, n.length) - 1,
        i = new Array(r),
        o = new Array(r),
        a = -1;

    for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a < r;) {
      i[a] = Cp(t[a], t[a + 1]), o[a] = e(n[a], n[a + 1]);
    }

    return function (n) {
      var e = c(t, n, 1, r) - 1;
      return o[e](i[e](n));
    };
  }

  function Dp(t, n) {
    return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
  }

  function qp() {
    var t,
        n,
        e,
        r,
        i,
        o,
        a = kp,
        u = kp,
        c = Pr,
        f = Np;

    function s() {
      var t = Math.min(a.length, u.length);
      return f !== Np && (f = function (t, n) {
        var e;
        return t > n && (e = t, t = n, n = e), function (e) {
          return Math.max(t, Math.min(n, e));
        };
      }(a[0], a[t - 1])), r = t > 2 ? zp : Pp, i = o = null, l;
    }

    function l(n) {
      return null == n || isNaN(n = +n) ? e : (i || (i = r(a.map(t), u, c)))(t(f(n)));
    }

    return l.invert = function (e) {
      return f(n((o || (o = r(u, a.map(t), Sr)))(e)));
    }, l.domain = function (t) {
      return arguments.length ? (a = Array.from(t, Ep), s()) : a.slice();
    }, l.range = function (t) {
      return arguments.length ? (u = Array.from(t), s()) : u.slice();
    }, l.rangeRound = function (t) {
      return u = Array.from(t), c = zr, s();
    }, l.clamp = function (t) {
      return arguments.length ? (f = !!t || Np, s()) : f !== Np;
    }, l.interpolate = function (t) {
      return arguments.length ? (c = t, s()) : c;
    }, l.unknown = function (t) {
      return arguments.length ? (e = t, l) : e;
    }, function (e, r) {
      return t = e, n = r, s();
    };
  }

  function Rp() {
    return qp()(Np, Np);
  }

  function Fp(n, e, r, i) {
    var o,
        a = L(n, e, r);

    switch ((i = xc(null == i ? ",f" : i)).type) {
      case "s":
        var u = Math.max(Math.abs(n), Math.abs(e));
        return null != i.precision || isNaN(o = zc(a, u)) || (i.precision = o), t.formatPrefix(i, u);

      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        null != i.precision || isNaN(o = Dc(a, Math.max(Math.abs(n), Math.abs(e)))) || (i.precision = o - ("e" === i.type));
        break;

      case "f":
      case "%":
        null != i.precision || isNaN(o = Pc(a)) || (i.precision = o - 2 * ("%" === i.type));
    }

    return t.format(i);
  }

  function Op(t) {
    var n = t.domain;
    return t.ticks = function (t) {
      var e = n();
      return B(e[0], e[e.length - 1], null == t ? 10 : t);
    }, t.tickFormat = function (t, e) {
      var r = n();
      return Fp(r[0], r[r.length - 1], null == t ? 10 : t, e);
    }, t.nice = function (e) {
      null == e && (e = 10);
      var r,
          i,
          o = n(),
          a = 0,
          u = o.length - 1,
          c = o[a],
          f = o[u],
          s = 10;

      for (f < c && (i = c, c = f, f = i, i = a, a = u, u = i); s-- > 0;) {
        if ((i = Y(c, f, e)) === r) return o[a] = c, o[u] = f, n(o);
        if (i > 0) c = Math.floor(c / i) * i, f = Math.ceil(f / i) * i;else {
          if (!(i < 0)) break;
          c = Math.ceil(c * i) / i, f = Math.floor(f * i) / i;
        }
        r = i;
      }

      return t;
    }, t;
  }

  function Ip(t, n) {
    var e,
        r = 0,
        i = (t = t.slice()).length - 1,
        o = t[r],
        a = t[i];
    return a < o && (e = r, r = i, i = e, e = o, o = a, a = e), t[r] = n.floor(o), t[i] = n.ceil(a), t;
  }

  function Up(t) {
    return Math.log(t);
  }

  function Bp(t) {
    return Math.exp(t);
  }

  function Yp(t) {
    return -Math.log(-t);
  }

  function Lp(t) {
    return -Math.exp(-t);
  }

  function jp(t) {
    return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
  }

  function Hp(t) {
    return function (n) {
      return -t(-n);
    };
  }

  function Xp(n) {
    var e,
        r,
        i = n(Up, Bp),
        o = i.domain,
        a = 10;

    function u() {
      return e = function (t) {
        return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function (n) {
          return Math.log(n) / t;
        });
      }(a), r = function (t) {
        return 10 === t ? jp : t === Math.E ? Math.exp : function (n) {
          return Math.pow(t, n);
        };
      }(a), o()[0] < 0 ? (e = Hp(e), r = Hp(r), n(Yp, Lp)) : n(Up, Bp), i;
    }

    return i.base = function (t) {
      return arguments.length ? (a = +t, u()) : a;
    }, i.domain = function (t) {
      return arguments.length ? (o(t), u()) : o();
    }, i.ticks = function (t) {
      var n,
          i = o(),
          u = i[0],
          c = i[i.length - 1];
      (n = c < u) && (h = u, u = c, c = h);
      var f,
          s,
          l,
          h = e(u),
          d = e(c),
          p = null == t ? 10 : +t,
          g = [];

      if (!(a % 1) && d - h < p) {
        if (h = Math.floor(h), d = Math.ceil(d), u > 0) {
          for (; h <= d; ++h) {
            for (s = 1, f = r(h); s < a; ++s) {
              if (!((l = f * s) < u)) {
                if (l > c) break;
                g.push(l);
              }
            }
          }
        } else for (; h <= d; ++h) {
          for (s = a - 1, f = r(h); s >= 1; --s) {
            if (!((l = f * s) < u)) {
              if (l > c) break;
              g.push(l);
            }
          }
        }

        2 * g.length < p && (g = B(u, c, p));
      } else g = B(h, d, Math.min(d - h, p)).map(r);

      return n ? g.reverse() : g;
    }, i.tickFormat = function (n, o) {
      if (null == o && (o = 10 === a ? ".0e" : ","), "function" != typeof o && (o = t.format(o)), n === 1 / 0) return o;
      null == n && (n = 10);
      var u = Math.max(1, a * n / i.ticks().length);
      return function (t) {
        var n = t / r(Math.round(e(t)));
        return n * a < a - .5 && (n *= a), n <= u ? o(t) : "";
      };
    }, i.nice = function () {
      return o(Ip(o(), {
        floor: function floor(t) {
          return r(Math.floor(e(t)));
        },
        ceil: function ceil(t) {
          return r(Math.ceil(e(t)));
        }
      }));
    }, i;
  }

  function Gp(t) {
    return function (n) {
      return Math.sign(n) * Math.log1p(Math.abs(n / t));
    };
  }

  function Vp(t) {
    return function (n) {
      return Math.sign(n) * Math.expm1(Math.abs(n)) * t;
    };
  }

  function $p(t) {
    var n = 1,
        e = t(Gp(n), Vp(n));
    return e.constant = function (e) {
      return arguments.length ? t(Gp(n = +e), Vp(n)) : n;
    }, Op(e);
  }

  function Wp(t) {
    return function (n) {
      return n < 0 ? -Math.pow(-n, t) : Math.pow(n, t);
    };
  }

  function Zp(t) {
    return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t);
  }

  function Kp(t) {
    return t < 0 ? -t * t : t * t;
  }

  function Qp(t) {
    var n = t(Np, Np),
        e = 1;

    function r() {
      return 1 === e ? t(Np, Np) : .5 === e ? t(Zp, Kp) : t(Wp(e), Wp(1 / e));
    }

    return n.exponent = function (t) {
      return arguments.length ? (e = +t, r()) : e;
    }, Op(n);
  }

  function Jp() {
    var t = Qp(qp());
    return t.copy = function () {
      return Dp(t, Jp()).exponent(t.exponent());
    }, xp.apply(t, arguments), t;
  }

  function tg(t) {
    return Math.sign(t) * t * t;
  }

  function ng(t) {
    return Math.sign(t) * Math.sqrt(Math.abs(t));
  }

  var eg = new Date(),
      rg = new Date();

  function ig(t, n, e, r) {
    function i(n) {
      return t(n = 0 === arguments.length ? new Date() : new Date(+n)), n;
    }

    return i.floor = function (n) {
      return t(n = new Date(+n)), n;
    }, i.ceil = function (e) {
      return t(e = new Date(e - 1)), n(e, 1), t(e), e;
    }, i.round = function (t) {
      var n = i(t),
          e = i.ceil(t);
      return t - n < e - t ? n : e;
    }, i.offset = function (t, e) {
      return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t;
    }, i.range = function (e, r, o) {
      var a,
          u = [];
      if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0)) return u;

      do {
        u.push(a = new Date(+e)), n(e, o), t(e);
      } while (a < e && e < r);

      return u;
    }, i.filter = function (e) {
      return ig(function (n) {
        if (n >= n) for (; t(n), !e(n);) {
          n.setTime(n - 1);
        }
      }, function (t, r) {
        if (t >= t) if (r < 0) for (; ++r <= 0;) {
          for (; n(t, -1), !e(t);) {
            ;
          }
        } else for (; --r >= 0;) {
          for (; n(t, 1), !e(t);) {
            ;
          }
        }
      });
    }, e && (i.count = function (n, r) {
      return eg.setTime(+n), rg.setTime(+r), t(eg), t(rg), Math.floor(e(eg, rg));
    }, i.every = function (t) {
      return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function (n) {
        return r(n) % t == 0;
      } : function (n) {
        return i.count(0, n) % t == 0;
      }) : i : null;
    }), i;
  }

  var og = ig(function () {}, function (t, n) {
    t.setTime(+t + n);
  }, function (t, n) {
    return n - t;
  });

  og.every = function (t) {
    return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? ig(function (n) {
      n.setTime(Math.floor(n / t) * t);
    }, function (n, e) {
      n.setTime(+n + e * t);
    }, function (n, e) {
      return (e - n) / t;
    }) : og : null;
  };

  var ag = og,
      ug = og.range;
  var cg = 1e3,
      fg = 6e4,
      sg = 36e5,
      lg = 864e5,
      hg = 6048e5,
      dg = 2592e6,
      pg = 31536e6;

  var gg = ig(function (t) {
    t.setTime(t - t.getMilliseconds());
  }, function (t, n) {
    t.setTime(+t + n * cg);
  }, function (t, n) {
    return (n - t) / cg;
  }, function (t) {
    return t.getUTCSeconds();
  }),
      yg = gg,
      vg = gg.range,
      _g = ig(function (t) {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * cg);
  }, function (t, n) {
    t.setTime(+t + n * fg);
  }, function (t, n) {
    return (n - t) / fg;
  }, function (t) {
    return t.getMinutes();
  }),
      bg = _g,
      mg = _g.range,
      xg = ig(function (t) {
    t.setTime(t - t.getMilliseconds() - t.getSeconds() * cg - t.getMinutes() * fg);
  }, function (t, n) {
    t.setTime(+t + n * sg);
  }, function (t, n) {
    return (n - t) / sg;
  }, function (t) {
    return t.getHours();
  }),
      wg = xg,
      Mg = xg.range,
      Ag = ig(function (t) {
    return t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    return t.setDate(t.getDate() + n);
  }, function (t, n) {
    return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * fg) / lg;
  }, function (t) {
    return t.getDate() - 1;
  }),
      Tg = Ag,
      Sg = Ag.range;

  function Eg(t) {
    return ig(function (n) {
      n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0);
    }, function (t, n) {
      t.setDate(t.getDate() + 7 * n);
    }, function (t, n) {
      return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * fg) / hg;
    });
  }

  var kg = Eg(0),
      Ng = Eg(1),
      Cg = Eg(2),
      Pg = Eg(3),
      zg = Eg(4),
      Dg = Eg(5),
      qg = Eg(6),
      Rg = kg.range,
      Fg = Ng.range,
      Og = Cg.range,
      Ig = Pg.range,
      Ug = zg.range,
      Bg = Dg.range,
      Yg = qg.range,
      Lg = ig(function (t) {
    t.setDate(1), t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setMonth(t.getMonth() + n);
  }, function (t, n) {
    return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear());
  }, function (t) {
    return t.getMonth();
  }),
      jg = Lg,
      Hg = Lg.range,
      Xg = ig(function (t) {
    t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setFullYear(t.getFullYear() + n);
  }, function (t, n) {
    return n.getFullYear() - t.getFullYear();
  }, function (t) {
    return t.getFullYear();
  });

  Xg.every = function (t) {
    return isFinite(t = Math.floor(t)) && t > 0 ? ig(function (n) {
      n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0);
    }, function (n, e) {
      n.setFullYear(n.getFullYear() + e * t);
    }) : null;
  };

  var Gg = Xg,
      Vg = Xg.range,
      $g = ig(function (t) {
    t.setUTCSeconds(0, 0);
  }, function (t, n) {
    t.setTime(+t + n * fg);
  }, function (t, n) {
    return (n - t) / fg;
  }, function (t) {
    return t.getUTCMinutes();
  }),
      Wg = $g,
      Zg = $g.range,
      Kg = ig(function (t) {
    t.setUTCMinutes(0, 0, 0);
  }, function (t, n) {
    t.setTime(+t + n * sg);
  }, function (t, n) {
    return (n - t) / sg;
  }, function (t) {
    return t.getUTCHours();
  }),
      Qg = Kg,
      Jg = Kg.range,
      ty = ig(function (t) {
    t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCDate(t.getUTCDate() + n);
  }, function (t, n) {
    return (n - t) / lg;
  }, function (t) {
    return t.getUTCDate() - 1;
  }),
      ny = ty,
      ey = ty.range;

  function ry(t) {
    return ig(function (n) {
      n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0);
    }, function (t, n) {
      t.setUTCDate(t.getUTCDate() + 7 * n);
    }, function (t, n) {
      return (n - t) / hg;
    });
  }

  var iy = ry(0),
      oy = ry(1),
      ay = ry(2),
      uy = ry(3),
      cy = ry(4),
      fy = ry(5),
      sy = ry(6),
      ly = iy.range,
      hy = oy.range,
      dy = ay.range,
      py = uy.range,
      gy = cy.range,
      yy = fy.range,
      vy = sy.range,
      _y = ig(function (t) {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCMonth(t.getUTCMonth() + n);
  }, function (t, n) {
    return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear());
  }, function (t) {
    return t.getUTCMonth();
  }),
      by = _y,
      my = _y.range,
      xy = ig(function (t) {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCFullYear(t.getUTCFullYear() + n);
  }, function (t, n) {
    return n.getUTCFullYear() - t.getUTCFullYear();
  }, function (t) {
    return t.getUTCFullYear();
  });

  xy.every = function (t) {
    return isFinite(t = Math.floor(t)) && t > 0 ? ig(function (n) {
      n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0);
    }, function (n, e) {
      n.setUTCFullYear(n.getUTCFullYear() + e * t);
    }) : null;
  };

  var wy = xy,
      My = xy.range;

  function Ay(t, n, r, i, o, a) {
    var u = [[yg, 1, cg], [yg, 5, 5e3], [yg, 15, 15e3], [yg, 30, 3e4], [a, 1, fg], [a, 5, 3e5], [a, 15, 9e5], [a, 30, 18e5], [o, 1, sg], [o, 3, 108e5], [o, 6, 216e5], [o, 12, 432e5], [i, 1, lg], [i, 2, 1728e5], [r, 1, hg], [n, 1, dg], [n, 3, 7776e6], [t, 1, pg]];

    function c(n, r, i) {
      var o = Math.abs(r - n) / i,
          a = e(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 3),
            t = _ref11[2];

        return t;
      }).right(u, o);
      if (a === u.length) return t.every(L(n / pg, r / pg, i));
      if (0 === a) return ag.every(Math.max(L(n, r, i), 1));

      var _u14 = _slicedToArray(u[o / u[a - 1][2] < u[a][2] / o ? a - 1 : a], 2),
          c = _u14[0],
          f = _u14[1];

      return c.every(f);
    }

    return [function (t, n, e) {
      var _ref12;

      var r = n < t;
      r && (_ref12 = [n, t], t = _ref12[0], n = _ref12[1], _ref12);
      var i = e && "function" == typeof e.range ? e : c(t, n, e),
          o = i ? i.range(t, +n + 1) : [];
      return r ? o.reverse() : o;
    }, c];
  }

  var _Ay = Ay(wy, by, iy, ny, Qg, Wg),
      _Ay2 = _slicedToArray(_Ay, 2),
      Ty = _Ay2[0],
      Sy = _Ay2[1],
      _Ay3 = Ay(Gg, jg, kg, Tg, wg, bg),
      _Ay4 = _slicedToArray(_Ay3, 2),
      Ey = _Ay4[0],
      ky = _Ay4[1];

  function Ny(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
      return n.setFullYear(t.y), n;
    }

    return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
  }

  function Cy(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
      return n.setUTCFullYear(t.y), n;
    }

    return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
  }

  function Py(t, n, e) {
    return {
      y: t,
      m: n,
      d: e,
      H: 0,
      M: 0,
      S: 0,
      L: 0
    };
  }

  function zy(t) {
    var n = t.dateTime,
        e = t.date,
        r = t.time,
        i = t.periods,
        o = t.days,
        _a16 = t.shortDays,
        u = t.months,
        c = t.shortMonths,
        f = By(i),
        s = Yy(i),
        l = By(o),
        h = Yy(o),
        d = By(_a16),
        p = Yy(_a16),
        g = By(u),
        y = Yy(u),
        v = By(c),
        _ = Yy(c),
        b = {
      a: function a(t) {
        return _a16[t.getDay()];
      },
      A: function A(t) {
        return o[t.getDay()];
      },
      b: function b(t) {
        return c[t.getMonth()];
      },
      B: function B(t) {
        return u[t.getMonth()];
      },
      c: null,
      d: cv,
      e: cv,
      f: dv,
      g: Av,
      G: Sv,
      H: fv,
      I: sv,
      j: lv,
      L: hv,
      m: pv,
      M: gv,
      p: function p(t) {
        return i[+(t.getHours() >= 12)];
      },
      q: function q(t) {
        return 1 + ~~(t.getMonth() / 3);
      },
      Q: Wv,
      s: Zv,
      S: yv,
      u: vv,
      U: _v,
      V: mv,
      w: xv,
      W: wv,
      x: null,
      X: null,
      y: Mv,
      Y: Tv,
      Z: Ev,
      "%": $v
    },
        m = {
      a: function a(t) {
        return _a16[t.getUTCDay()];
      },
      A: function A(t) {
        return o[t.getUTCDay()];
      },
      b: function b(t) {
        return c[t.getUTCMonth()];
      },
      B: function B(t) {
        return u[t.getUTCMonth()];
      },
      c: null,
      d: kv,
      e: kv,
      f: Dv,
      g: Hv,
      G: Gv,
      H: Nv,
      I: Cv,
      j: Pv,
      L: zv,
      m: qv,
      M: Rv,
      p: function p(t) {
        return i[+(t.getUTCHours() >= 12)];
      },
      q: function q(t) {
        return 1 + ~~(t.getUTCMonth() / 3);
      },
      Q: Wv,
      s: Zv,
      S: Fv,
      u: Ov,
      U: Iv,
      V: Bv,
      w: Yv,
      W: Lv,
      x: null,
      X: null,
      y: jv,
      Y: Xv,
      Z: Vv,
      "%": $v
    },
        x = {
      a: function a(t, n, e) {
        var r = d.exec(n.slice(e));
        return r ? (t.w = p.get(r[0].toLowerCase()), e + r[0].length) : -1;
      },
      A: function A(t, n, e) {
        var r = l.exec(n.slice(e));
        return r ? (t.w = h.get(r[0].toLowerCase()), e + r[0].length) : -1;
      },
      b: function b(t, n, e) {
        var r = v.exec(n.slice(e));
        return r ? (t.m = _.get(r[0].toLowerCase()), e + r[0].length) : -1;
      },
      B: function B(t, n, e) {
        var r = g.exec(n.slice(e));
        return r ? (t.m = y.get(r[0].toLowerCase()), e + r[0].length) : -1;
      },
      c: function c(t, e, r) {
        return A(t, n, e, r);
      },
      d: Qy,
      e: Qy,
      f: iv,
      g: $y,
      G: Vy,
      H: tv,
      I: tv,
      j: Jy,
      L: rv,
      m: Ky,
      M: nv,
      p: function p(t, n, e) {
        var r = f.exec(n.slice(e));
        return r ? (t.p = s.get(r[0].toLowerCase()), e + r[0].length) : -1;
      },
      q: Zy,
      Q: av,
      s: uv,
      S: ev,
      u: jy,
      U: Hy,
      V: Xy,
      w: Ly,
      W: Gy,
      x: function x(t, n, r) {
        return A(t, e, n, r);
      },
      X: function X(t, n, e) {
        return A(t, r, n, e);
      },
      y: $y,
      Y: Vy,
      Z: Wy,
      "%": ov
    };

    function w(t, n) {
      return function (e) {
        var r,
            i,
            o,
            a = [],
            u = -1,
            c = 0,
            f = t.length;

        for (e instanceof Date || (e = new Date(+e)); ++u < f;) {
          37 === t.charCodeAt(u) && (a.push(t.slice(c, u)), null != (i = qy[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), a.push(r), c = u + 1);
        }

        return a.push(t.slice(c, u)), a.join("");
      };
    }

    function M(t, n) {
      return function (e) {
        var r,
            i,
            o = Py(1900, void 0, 1);
        if (A(o, t, e += "", 0) != e.length) return null;
        if ("Q" in o) return new Date(o.Q);
        if ("s" in o) return new Date(1e3 * o.s + ("L" in o ? o.L : 0));

        if (n && !("Z" in o) && (o.Z = 0), "p" in o && (o.H = o.H % 12 + 12 * o.p), void 0 === o.m && (o.m = "q" in o ? o.q : 0), "V" in o) {
          if (o.V < 1 || o.V > 53) return null;
          "w" in o || (o.w = 1), "Z" in o ? (i = (r = Cy(Py(o.y, 0, 1))).getUTCDay(), r = i > 4 || 0 === i ? oy.ceil(r) : oy(r), r = ny.offset(r, 7 * (o.V - 1)), o.y = r.getUTCFullYear(), o.m = r.getUTCMonth(), o.d = r.getUTCDate() + (o.w + 6) % 7) : (i = (r = Ny(Py(o.y, 0, 1))).getDay(), r = i > 4 || 0 === i ? Ng.ceil(r) : Ng(r), r = Tg.offset(r, 7 * (o.V - 1)), o.y = r.getFullYear(), o.m = r.getMonth(), o.d = r.getDate() + (o.w + 6) % 7);
        } else ("W" in o || "U" in o) && ("w" in o || (o.w = "u" in o ? o.u % 7 : "W" in o ? 1 : 0), i = "Z" in o ? Cy(Py(o.y, 0, 1)).getUTCDay() : Ny(Py(o.y, 0, 1)).getDay(), o.m = 0, o.d = "W" in o ? (o.w + 6) % 7 + 7 * o.W - (i + 5) % 7 : o.w + 7 * o.U - (i + 6) % 7);

        return "Z" in o ? (o.H += o.Z / 100 | 0, o.M += o.Z % 100, Cy(o)) : Ny(o);
      };
    }

    function A(t, n, e, r) {
      for (var i, o, a = 0, u = n.length, c = e.length; a < u;) {
        if (r >= c) return -1;

        if (37 === (i = n.charCodeAt(a++))) {
          if (i = n.charAt(a++), !(o = x[i in qy ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0) return -1;
        } else if (i != e.charCodeAt(r++)) return -1;
      }

      return r;
    }

    return b.x = w(e, b), b.X = w(r, b), b.c = w(n, b), m.x = w(e, m), m.X = w(r, m), m.c = w(n, m), {
      format: function format(t) {
        var n = w(t += "", b);
        return n.toString = function () {
          return t;
        }, n;
      },
      parse: function parse(t) {
        var n = M(t += "", !1);
        return n.toString = function () {
          return t;
        }, n;
      },
      utcFormat: function utcFormat(t) {
        var n = w(t += "", m);
        return n.toString = function () {
          return t;
        }, n;
      },
      utcParse: function utcParse(t) {
        var n = M(t += "", !0);
        return n.toString = function () {
          return t;
        }, n;
      }
    };
  }

  var Dy,
      qy = {
    "-": "",
    _: " ",
    0: "0"
  },
      Ry = /^\s*\d+/,
      Fy = /^%/,
      Oy = /[\\^$*+?|[\]().{}]/g;

  function Iy(t, n, e) {
    var r = t < 0 ? "-" : "",
        i = (r ? -t : t) + "",
        o = i.length;
    return r + (o < e ? new Array(e - o + 1).join(n) + i : i);
  }

  function Uy(t) {
    return t.replace(Oy, "\\$&");
  }

  function By(t) {
    return new RegExp("^(?:" + t.map(Uy).join("|") + ")", "i");
  }

  function Yy(t) {
    return new Map(t.map(function (t, n) {
      return [t.toLowerCase(), n];
    }));
  }

  function Ly(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 1));
    return r ? (t.w = +r[0], e + r[0].length) : -1;
  }

  function jy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 1));
    return r ? (t.u = +r[0], e + r[0].length) : -1;
  }

  function Hy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.U = +r[0], e + r[0].length) : -1;
  }

  function Xy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.V = +r[0], e + r[0].length) : -1;
  }

  function Gy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.W = +r[0], e + r[0].length) : -1;
  }

  function Vy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 4));
    return r ? (t.y = +r[0], e + r[0].length) : -1;
  }

  function $y(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1;
  }

  function Wy(t, n, e) {
    var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
    return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1;
  }

  function Zy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 1));
    return r ? (t.q = 3 * r[0] - 3, e + r[0].length) : -1;
  }

  function Ky(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.m = r[0] - 1, e + r[0].length) : -1;
  }

  function Qy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.d = +r[0], e + r[0].length) : -1;
  }

  function Jy(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 3));
    return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1;
  }

  function tv(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.H = +r[0], e + r[0].length) : -1;
  }

  function nv(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.M = +r[0], e + r[0].length) : -1;
  }

  function ev(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 2));
    return r ? (t.S = +r[0], e + r[0].length) : -1;
  }

  function rv(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 3));
    return r ? (t.L = +r[0], e + r[0].length) : -1;
  }

  function iv(t, n, e) {
    var r = Ry.exec(n.slice(e, e + 6));
    return r ? (t.L = Math.floor(r[0] / 1e3), e + r[0].length) : -1;
  }

  function ov(t, n, e) {
    var r = Fy.exec(n.slice(e, e + 1));
    return r ? e + r[0].length : -1;
  }

  function av(t, n, e) {
    var r = Ry.exec(n.slice(e));
    return r ? (t.Q = +r[0], e + r[0].length) : -1;
  }

  function uv(t, n, e) {
    var r = Ry.exec(n.slice(e));
    return r ? (t.s = +r[0], e + r[0].length) : -1;
  }

  function cv(t, n) {
    return Iy(t.getDate(), n, 2);
  }

  function fv(t, n) {
    return Iy(t.getHours(), n, 2);
  }

  function sv(t, n) {
    return Iy(t.getHours() % 12 || 12, n, 2);
  }

  function lv(t, n) {
    return Iy(1 + Tg.count(Gg(t), t), n, 3);
  }

  function hv(t, n) {
    return Iy(t.getMilliseconds(), n, 3);
  }

  function dv(t, n) {
    return hv(t, n) + "000";
  }

  function pv(t, n) {
    return Iy(t.getMonth() + 1, n, 2);
  }

  function gv(t, n) {
    return Iy(t.getMinutes(), n, 2);
  }

  function yv(t, n) {
    return Iy(t.getSeconds(), n, 2);
  }

  function vv(t) {
    var n = t.getDay();
    return 0 === n ? 7 : n;
  }

  function _v(t, n) {
    return Iy(kg.count(Gg(t) - 1, t), n, 2);
  }

  function bv(t) {
    var n = t.getDay();
    return n >= 4 || 0 === n ? zg(t) : zg.ceil(t);
  }

  function mv(t, n) {
    return t = bv(t), Iy(zg.count(Gg(t), t) + (4 === Gg(t).getDay()), n, 2);
  }

  function xv(t) {
    return t.getDay();
  }

  function wv(t, n) {
    return Iy(Ng.count(Gg(t) - 1, t), n, 2);
  }

  function Mv(t, n) {
    return Iy(t.getFullYear() % 100, n, 2);
  }

  function Av(t, n) {
    return Iy((t = bv(t)).getFullYear() % 100, n, 2);
  }

  function Tv(t, n) {
    return Iy(t.getFullYear() % 1e4, n, 4);
  }

  function Sv(t, n) {
    var e = t.getDay();
    return Iy((t = e >= 4 || 0 === e ? zg(t) : zg.ceil(t)).getFullYear() % 1e4, n, 4);
  }

  function Ev(t) {
    var n = t.getTimezoneOffset();
    return (n > 0 ? "-" : (n *= -1, "+")) + Iy(n / 60 | 0, "0", 2) + Iy(n % 60, "0", 2);
  }

  function kv(t, n) {
    return Iy(t.getUTCDate(), n, 2);
  }

  function Nv(t, n) {
    return Iy(t.getUTCHours(), n, 2);
  }

  function Cv(t, n) {
    return Iy(t.getUTCHours() % 12 || 12, n, 2);
  }

  function Pv(t, n) {
    return Iy(1 + ny.count(wy(t), t), n, 3);
  }

  function zv(t, n) {
    return Iy(t.getUTCMilliseconds(), n, 3);
  }

  function Dv(t, n) {
    return zv(t, n) + "000";
  }

  function qv(t, n) {
    return Iy(t.getUTCMonth() + 1, n, 2);
  }

  function Rv(t, n) {
    return Iy(t.getUTCMinutes(), n, 2);
  }

  function Fv(t, n) {
    return Iy(t.getUTCSeconds(), n, 2);
  }

  function Ov(t) {
    var n = t.getUTCDay();
    return 0 === n ? 7 : n;
  }

  function Iv(t, n) {
    return Iy(iy.count(wy(t) - 1, t), n, 2);
  }

  function Uv(t) {
    var n = t.getUTCDay();
    return n >= 4 || 0 === n ? cy(t) : cy.ceil(t);
  }

  function Bv(t, n) {
    return t = Uv(t), Iy(cy.count(wy(t), t) + (4 === wy(t).getUTCDay()), n, 2);
  }

  function Yv(t) {
    return t.getUTCDay();
  }

  function Lv(t, n) {
    return Iy(oy.count(wy(t) - 1, t), n, 2);
  }

  function jv(t, n) {
    return Iy(t.getUTCFullYear() % 100, n, 2);
  }

  function Hv(t, n) {
    return Iy((t = Uv(t)).getUTCFullYear() % 100, n, 2);
  }

  function Xv(t, n) {
    return Iy(t.getUTCFullYear() % 1e4, n, 4);
  }

  function Gv(t, n) {
    var e = t.getUTCDay();
    return Iy((t = e >= 4 || 0 === e ? cy(t) : cy.ceil(t)).getUTCFullYear() % 1e4, n, 4);
  }

  function Vv() {
    return "+0000";
  }

  function $v() {
    return "%";
  }

  function Wv(t) {
    return +t;
  }

  function Zv(t) {
    return Math.floor(+t / 1e3);
  }

  function Kv(n) {
    return Dy = zy(n), t.timeFormat = Dy.format, t.timeParse = Dy.parse, t.utcFormat = Dy.utcFormat, t.utcParse = Dy.utcParse, Dy;
  }

  t.timeFormat = void 0, t.timeParse = void 0, t.utcFormat = void 0, t.utcParse = void 0, Kv({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  var Qv = "%Y-%m-%dT%H:%M:%S.%LZ";
  var Jv = Date.prototype.toISOString ? function (t) {
    return t.toISOString();
  } : t.utcFormat(Qv);
  var t_ = +new Date("2000-01-01T00:00:00.000Z") ? function (t) {
    var n = new Date(t);
    return isNaN(n) ? null : n;
  } : t.utcParse(Qv);

  function n_(t) {
    return new Date(t);
  }

  function e_(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }

  function r_(t, n, e, r, i, o, a, u, c, f) {
    var s = Rp(),
        l = s.invert,
        h = s.domain,
        d = f(".%L"),
        p = f(":%S"),
        g = f("%I:%M"),
        y = f("%I %p"),
        v = f("%a %d"),
        _ = f("%b %d"),
        b = f("%B"),
        m = f("%Y");

    function x(t) {
      return (c(t) < t ? d : u(t) < t ? p : a(t) < t ? g : o(t) < t ? y : r(t) < t ? i(t) < t ? v : _ : e(t) < t ? b : m)(t);
    }

    return s.invert = function (t) {
      return new Date(l(t));
    }, s.domain = function (t) {
      return arguments.length ? h(Array.from(t, e_)) : h().map(n_);
    }, s.ticks = function (n) {
      var e = h();
      return t(e[0], e[e.length - 1], null == n ? 10 : n);
    }, s.tickFormat = function (t, n) {
      return null == n ? x : f(n);
    }, s.nice = function (t) {
      var e = h();
      return t && "function" == typeof t.range || (t = n(e[0], e[e.length - 1], null == t ? 10 : t)), t ? h(Ip(e, t)) : s;
    }, s.copy = function () {
      return Dp(s, r_(t, n, e, r, i, o, a, u, c, f));
    }, s;
  }

  function i_() {
    var t,
        n,
        e,
        r,
        i,
        o = 0,
        a = 1,
        u = Np,
        c = !1;

    function f(n) {
      return null == n || isNaN(n = +n) ? i : u(0 === e ? .5 : (n = (r(n) - t) * e, c ? Math.max(0, Math.min(1, n)) : n));
    }

    function s(t) {
      return function (n) {
        var _n56, _n57;

        var e, r;
        return arguments.length ? ((_n56 = n, _n57 = _slicedToArray(_n56, 2), e = _n57[0], r = _n57[1], _n56), u = t(e, r), f) : [u(0), u(1)];
      };
    }

    return f.domain = function (i) {
      var _i23, _i24;

      return arguments.length ? ((_i23 = i, _i24 = _slicedToArray(_i23, 2), o = _i24[0], a = _i24[1], _i23), t = r(o = +o), n = r(a = +a), e = t === n ? 0 : 1 / (n - t), f) : [o, a];
    }, f.clamp = function (t) {
      return arguments.length ? (c = !!t, f) : c;
    }, f.interpolator = function (t) {
      return arguments.length ? (u = t, f) : u;
    }, f.range = s(Pr), f.rangeRound = s(zr), f.unknown = function (t) {
      return arguments.length ? (i = t, f) : i;
    }, function (i) {
      return r = i, t = i(o), n = i(a), e = t === n ? 0 : 1 / (n - t), f;
    };
  }

  function o_(t, n) {
    return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown());
  }

  function a_() {
    var t = Qp(i_());
    return t.copy = function () {
      return o_(t, a_()).exponent(t.exponent());
    }, wp.apply(t, arguments);
  }

  function u_() {
    var t,
        n,
        e,
        r,
        i,
        o,
        a,
        u = 0,
        c = .5,
        f = 1,
        s = 1,
        l = Np,
        h = !1;

    function d(t) {
      return isNaN(t = +t) ? a : (t = .5 + ((t = +o(t)) - n) * (s * t < s * n ? r : i), l(h ? Math.max(0, Math.min(1, t)) : t));
    }

    function p(t) {
      return function (n) {
        var _n58, _n59;

        var e, r, i;
        return arguments.length ? ((_n58 = n, _n59 = _slicedToArray(_n58, 3), e = _n59[0], r = _n59[1], i = _n59[2], _n58), l = Kr(t, [e, r, i]), d) : [l(0), l(.5), l(1)];
      };
    }

    return d.domain = function (a) {
      var _a17, _a18;

      return arguments.length ? ((_a17 = a, _a18 = _slicedToArray(_a17, 3), u = _a18[0], c = _a18[1], f = _a18[2], _a17), t = o(u = +u), n = o(c = +c), e = o(f = +f), r = t === n ? 0 : .5 / (n - t), i = n === e ? 0 : .5 / (e - n), s = n < t ? -1 : 1, d) : [u, c, f];
    }, d.clamp = function (t) {
      return arguments.length ? (h = !!t, d) : h;
    }, d.interpolator = function (t) {
      return arguments.length ? (l = t, d) : l;
    }, d.range = p(Pr), d.rangeRound = p(zr), d.unknown = function (t) {
      return arguments.length ? (a = t, d) : a;
    }, function (a) {
      return o = a, t = a(u), n = a(c), e = a(f), r = t === n ? 0 : .5 / (n - t), i = n === e ? 0 : .5 / (e - n), s = n < t ? -1 : 1, d;
    };
  }

  function c_() {
    var t = Qp(u_());
    return t.copy = function () {
      return o_(t, c_()).exponent(t.exponent());
    }, wp.apply(t, arguments);
  }

  function f_(t) {
    for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n;) {
      e[r] = "#" + t.slice(6 * r, 6 * ++r);
    }

    return e;
  }

  var s_ = f_("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
      l_ = f_("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),
      h_ = f_("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),
      d_ = f_("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),
      p_ = f_("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),
      g_ = f_("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),
      y_ = f_("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),
      v_ = f_("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),
      __ = f_("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"),
      b_ = f_("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"),
      m_ = function m_(t) {
    return mr(t[t.length - 1]);
  },
      x_ = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(f_),
      w_ = m_(x_),
      M_ = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(f_),
      A_ = m_(M_),
      T_ = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(f_),
      S_ = m_(T_),
      E_ = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(f_),
      k_ = m_(E_),
      N_ = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(f_),
      C_ = m_(N_),
      P_ = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(f_),
      z_ = m_(P_),
      D_ = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(f_),
      q_ = m_(D_),
      R_ = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(f_),
      F_ = m_(R_),
      O_ = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(f_),
      I_ = m_(O_),
      U_ = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(f_),
      B_ = m_(U_),
      Y_ = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(f_),
      L_ = m_(Y_),
      j_ = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(f_),
      H_ = m_(j_),
      X_ = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(f_),
      G_ = m_(X_),
      V_ = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(f_),
      $_ = m_(V_),
      W_ = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(f_),
      Z_ = m_(W_),
      K_ = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(f_),
      Q_ = m_(K_),
      J_ = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(f_),
      tb = m_(J_),
      nb = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(f_),
      eb = m_(nb),
      rb = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(f_),
      ib = m_(rb),
      ob = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(f_),
      ab = m_(ob),
      ub = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(f_),
      cb = m_(ub),
      fb = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(f_),
      sb = m_(fb),
      lb = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(f_),
      hb = m_(lb),
      db = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(f_),
      pb = m_(db),
      gb = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(f_),
      yb = m_(gb),
      vb = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(f_),
      _b = m_(vb),
      bb = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(f_),
      mb = m_(bb);

  var xb = Zr(cr(300, .5, 0), cr(-240, .5, 1)),
      wb = Zr(cr(-100, .75, .35), cr(80, 1.5, .8)),
      Mb = Zr(cr(260, .75, .35), cr(80, 1.5, .8)),
      Ab = cr();
  var Tb = Te(),
      Sb = Math.PI / 3,
      Eb = 2 * Math.PI / 3;

  function kb(t) {
    var n = t.length;
    return function (e) {
      return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
    };
  }

  var Nb = kb(f_("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),
      Cb = kb(f_("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
      Pb = kb(f_("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
      zb = kb(f_("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

  function Db(t) {
    return function () {
      return t;
    };
  }

  var qb = Math.abs,
      Rb = Math.atan2,
      Fb = Math.cos,
      Ob = Math.max,
      Ib = Math.min,
      Ub = Math.sin,
      Bb = Math.sqrt,
      Yb = 1e-12,
      Lb = Math.PI,
      jb = Lb / 2,
      Hb = 2 * Lb;

  function Xb(t) {
    return t > 1 ? 0 : t < -1 ? Lb : Math.acos(t);
  }

  function Gb(t) {
    return t >= 1 ? jb : t <= -1 ? -jb : Math.asin(t);
  }

  function Vb(t) {
    return t.innerRadius;
  }

  function $b(t) {
    return t.outerRadius;
  }

  function Wb(t) {
    return t.startAngle;
  }

  function Zb(t) {
    return t.endAngle;
  }

  function Kb(t) {
    return t && t.padAngle;
  }

  function Qb(t, n, e, r, i, o, a, u) {
    var c = e - t,
        f = r - n,
        s = a - i,
        l = u - o,
        h = l * c - s * f;
    if (!(h * h < Yb)) return [t + (h = (s * (n - o) - l * (t - i)) / h) * c, n + h * f];
  }

  function Jb(t, n, e, r, i, o, a) {
    var u = t - e,
        c = n - r,
        f = (a ? o : -o) / Bb(u * u + c * c),
        s = f * c,
        l = -f * u,
        h = t + s,
        d = n + l,
        p = e + s,
        g = r + l,
        y = (h + p) / 2,
        v = (d + g) / 2,
        _ = p - h,
        b = g - d,
        m = _ * _ + b * b,
        x = i - o,
        w = h * g - p * d,
        M = (b < 0 ? -1 : 1) * Bb(Ob(0, x * x * m - w * w)),
        A = (w * b - _ * M) / m,
        T = (-w * _ - b * M) / m,
        S = (w * b + _ * M) / m,
        E = (-w * _ + b * M) / m,
        k = A - y,
        N = T - v,
        C = S - y,
        P = E - v;

    return k * k + N * N > C * C + P * P && (A = S, T = E), {
      cx: A,
      cy: T,
      x01: -s,
      y01: -l,
      x11: A * (i / x - 1),
      y11: T * (i / x - 1)
    };
  }

  var tm = Array.prototype.slice;

  function nm(t) {
    return "object" == _typeof(t) && "length" in t ? t : Array.from(t);
  }

  function em(t) {
    this._context = t;
  }

  function rm(t) {
    return new em(t);
  }

  function im(t) {
    return t[0];
  }

  function om(t) {
    return t[1];
  }

  function am(t, n) {
    var e = Db(!0),
        r = null,
        i = rm,
        o = null;

    function a(a) {
      var u,
          c,
          f,
          s = (a = nm(a)).length,
          l = !1;

      for (null == r && (o = i(f = va())), u = 0; u <= s; ++u) {
        !(u < s && e(c = a[u], u, a)) === l && ((l = !l) ? o.lineStart() : o.lineEnd()), l && o.point(+t(c, u, a), +n(c, u, a));
      }

      if (f) return o = null, f + "" || null;
    }

    return t = "function" == typeof t ? t : void 0 === t ? im : Db(t), n = "function" == typeof n ? n : void 0 === n ? om : Db(n), a.x = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(+n), a) : t;
    }, a.y = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Db(+t), a) : n;
    }, a.defined = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Db(!!t), a) : e;
    }, a.curve = function (t) {
      return arguments.length ? (i = t, null != r && (o = i(r)), a) : i;
    }, a.context = function (t) {
      return arguments.length ? (null == t ? r = o = null : o = i(r = t), a) : r;
    }, a;
  }

  function um(t, n, e) {
    var r = null,
        i = Db(!0),
        o = null,
        a = rm,
        u = null;

    function c(c) {
      var f,
          s,
          l,
          h,
          d,
          p = (c = nm(c)).length,
          g = !1,
          y = new Array(p),
          v = new Array(p);

      for (null == o && (u = a(d = va())), f = 0; f <= p; ++f) {
        if (!(f < p && i(h = c[f], f, c)) === g) if (g = !g) s = f, u.areaStart(), u.lineStart();else {
          for (u.lineEnd(), u.lineStart(), l = f - 1; l >= s; --l) {
            u.point(y[l], v[l]);
          }

          u.lineEnd(), u.areaEnd();
        }
        g && (y[f] = +t(h, f, c), v[f] = +n(h, f, c), u.point(r ? +r(h, f, c) : y[f], e ? +e(h, f, c) : v[f]));
      }

      if (d) return u = null, d + "" || null;
    }

    function f() {
      return am().defined(i).curve(a).context(o);
    }

    return t = "function" == typeof t ? t : void 0 === t ? im : Db(+t), n = "function" == typeof n ? n : Db(void 0 === n ? 0 : +n), e = "function" == typeof e ? e : void 0 === e ? om : Db(+e), c.x = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(+n), r = null, c) : t;
    }, c.x0 = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(+n), c) : t;
    }, c.x1 = function (t) {
      return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Db(+t), c) : r;
    }, c.y = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Db(+t), e = null, c) : n;
    }, c.y0 = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Db(+t), c) : n;
    }, c.y1 = function (t) {
      return arguments.length ? (e = null == t ? null : "function" == typeof t ? t : Db(+t), c) : e;
    }, c.lineX0 = c.lineY0 = function () {
      return f().x(t).y(n);
    }, c.lineY1 = function () {
      return f().x(t).y(e);
    }, c.lineX1 = function () {
      return f().x(r).y(n);
    }, c.defined = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Db(!!t), c) : i;
    }, c.curve = function (t) {
      return arguments.length ? (a = t, null != o && (u = a(o)), c) : a;
    }, c.context = function (t) {
      return arguments.length ? (null == t ? o = u = null : u = a(o = t), c) : o;
    }, c;
  }

  function cm(t, n) {
    return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }

  function fm(t) {
    return t;
  }

  em.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;

        case 1:
          this._point = 2;

        default:
          this._context.lineTo(t, n);

      }
    }
  };
  var sm = hm(rm);

  function lm(t) {
    this._curve = t;
  }

  function hm(t) {
    function n(n) {
      return new lm(t(n));
    }

    return n._curve = t, n;
  }

  function dm(t) {
    var n = t.curve;
    return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function (t) {
      return arguments.length ? n(hm(t)) : n()._curve;
    }, t;
  }

  function pm() {
    return dm(am().curve(sm));
  }

  function gm() {
    var t = um().curve(sm),
        n = t.curve,
        e = t.lineX0,
        r = t.lineX1,
        i = t.lineY0,
        o = t.lineY1;
    return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius = t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle = function () {
      return dm(e());
    }, delete t.lineX0, t.lineEndAngle = function () {
      return dm(r());
    }, delete t.lineX1, t.lineInnerRadius = function () {
      return dm(i());
    }, delete t.lineY0, t.lineOuterRadius = function () {
      return dm(o());
    }, delete t.lineY1, t.curve = function (t) {
      return arguments.length ? n(hm(t)) : n()._curve;
    }, t;
  }

  function ym(t, n) {
    return [(n = +n) * Math.cos(t -= Math.PI / 2), n * Math.sin(t)];
  }

  function vm(t) {
    return t.source;
  }

  function _m(t) {
    return t.target;
  }

  function bm(t) {
    var n = vm,
        e = _m,
        r = im,
        i = om,
        o = null;

    function a() {
      var a,
          u = tm.call(arguments),
          c = n.apply(this, u),
          f = e.apply(this, u);
      if (o || (o = a = va()), t(o, +r.apply(this, (u[0] = c, u)), +i.apply(this, u), +r.apply(this, (u[0] = f, u)), +i.apply(this, u)), a) return o = null, a + "" || null;
    }

    return a.source = function (t) {
      return arguments.length ? (n = t, a) : n;
    }, a.target = function (t) {
      return arguments.length ? (e = t, a) : e;
    }, a.x = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Db(+t), a) : r;
    }, a.y = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Db(+t), a) : i;
    }, a.context = function (t) {
      return arguments.length ? (o = null == t ? null : t, a) : o;
    }, a;
  }

  function mm(t, n, e, r, i) {
    t.moveTo(n, e), t.bezierCurveTo(n = (n + r) / 2, e, n, i, r, i);
  }

  function xm(t, n, e, r, i) {
    t.moveTo(n, e), t.bezierCurveTo(n, e = (e + i) / 2, r, e, r, i);
  }

  function wm(t, n, e, r, i) {
    var o = ym(n, e),
        a = ym(n, e = (e + i) / 2),
        u = ym(r, e),
        c = ym(r, i);
    t.moveTo(o[0], o[1]), t.bezierCurveTo(a[0], a[1], u[0], u[1], c[0], c[1]);
  }

  lm.prototype = {
    areaStart: function areaStart() {
      this._curve.areaStart();
    },
    areaEnd: function areaEnd() {
      this._curve.areaEnd();
    },
    lineStart: function lineStart() {
      this._curve.lineStart();
    },
    lineEnd: function lineEnd() {
      this._curve.lineEnd();
    },
    point: function point(t, n) {
      this._curve.point(n * Math.sin(t), n * -Math.cos(t));
    }
  };
  var Mm = {
    draw: function draw(t, n) {
      var e = Math.sqrt(n / Lb);
      t.moveTo(e, 0), t.arc(0, 0, e, 0, Hb);
    }
  },
      Am = {
    draw: function draw(t, n) {
      var e = Math.sqrt(n / 5) / 2;
      t.moveTo(-3 * e, -e), t.lineTo(-e, -e), t.lineTo(-e, -3 * e), t.lineTo(e, -3 * e), t.lineTo(e, -e), t.lineTo(3 * e, -e), t.lineTo(3 * e, e), t.lineTo(e, e), t.lineTo(e, 3 * e), t.lineTo(-e, 3 * e), t.lineTo(-e, e), t.lineTo(-3 * e, e), t.closePath();
    }
  },
      Tm = Math.sqrt(1 / 3),
      Sm = 2 * Tm,
      Em = {
    draw: function draw(t, n) {
      var e = Math.sqrt(n / Sm),
          r = e * Tm;
      t.moveTo(0, -e), t.lineTo(r, 0), t.lineTo(0, e), t.lineTo(-r, 0), t.closePath();
    }
  },
      km = Math.sin(Lb / 10) / Math.sin(7 * Lb / 10),
      Nm = Math.sin(Hb / 10) * km,
      Cm = -Math.cos(Hb / 10) * km,
      Pm = {
    draw: function draw(t, n) {
      var e = Math.sqrt(.8908130915292852 * n),
          r = Nm * e,
          i = Cm * e;
      t.moveTo(0, -e), t.lineTo(r, i);

      for (var o = 1; o < 5; ++o) {
        var a = Hb * o / 5,
            u = Math.cos(a),
            c = Math.sin(a);
        t.lineTo(c * e, -u * e), t.lineTo(u * r - c * i, c * r + u * i);
      }

      t.closePath();
    }
  },
      zm = {
    draw: function draw(t, n) {
      var e = Math.sqrt(n),
          r = -e / 2;
      t.rect(r, r, e, e);
    }
  },
      Dm = Math.sqrt(3),
      qm = {
    draw: function draw(t, n) {
      var e = -Math.sqrt(n / (3 * Dm));
      t.moveTo(0, 2 * e), t.lineTo(-Dm * e, -e), t.lineTo(Dm * e, -e), t.closePath();
    }
  },
      Rm = -.5,
      Fm = Math.sqrt(3) / 2,
      Om = 1 / Math.sqrt(12),
      Im = 3 * (Om / 2 + 1),
      Um = {
    draw: function draw(t, n) {
      var e = Math.sqrt(n / Im),
          r = e / 2,
          i = e * Om,
          o = r,
          a = e * Om + e,
          u = -o,
          c = a;
      t.moveTo(r, i), t.lineTo(o, a), t.lineTo(u, c), t.lineTo(Rm * r - Fm * i, Fm * r + Rm * i), t.lineTo(Rm * o - Fm * a, Fm * o + Rm * a), t.lineTo(Rm * u - Fm * c, Fm * u + Rm * c), t.lineTo(Rm * r + Fm * i, Rm * i - Fm * r), t.lineTo(Rm * o + Fm * a, Rm * a - Fm * o), t.lineTo(Rm * u + Fm * c, Rm * c - Fm * u), t.closePath();
    }
  },
      Bm = [Mm, Am, Em, zm, Pm, qm, Um];

  function Ym() {}

  function Lm(t, n, e) {
    t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6);
  }

  function jm(t) {
    this._context = t;
  }

  function Hm(t) {
    this._context = t;
  }

  function Xm(t) {
    this._context = t;
  }

  jm.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 3:
          Lm(this, this._x1, this._y1);

        case 2:
          this._context.lineTo(this._x1, this._y1);

      }

      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);

        default:
          Lm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
  }, Hm.prototype = {
    areaStart: Ym,
    areaEnd: Ym,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x2, this._y2), this._context.closePath();
          break;

        case 2:
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
          break;

        case 3:
          this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
      }
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._x2 = t, this._y2 = n;
          break;

        case 1:
          this._point = 2, this._x3 = t, this._y3 = n;
          break;

        case 2:
          this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
          break;

        default:
          Lm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
  }, Xm.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;
          var e = (this._x0 + 4 * this._x1 + t) / 6,
              r = (this._y0 + 4 * this._y1 + n) / 6;
          this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
          break;

        case 3:
          this._point = 4;

        default:
          Lm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
  };

  var Gm = /*#__PURE__*/function () {
    function Gm(t, n) {
      _classCallCheck(this, Gm);

      this._context = t, this._x = n;
    }

    _createClass(Gm, [{
      key: "areaStart",
      value: function areaStart() {
        this._line = 0;
      }
    }, {
      key: "areaEnd",
      value: function areaEnd() {
        this._line = NaN;
      }
    }, {
      key: "lineStart",
      value: function lineStart() {
        this._point = 0;
      }
    }, {
      key: "lineEnd",
      value: function lineEnd() {
        (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
      }
    }, {
      key: "point",
      value: function point(t, n) {
        switch (t = +t, n = +n, this._point) {
          case 0:
            this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
            break;

          case 1:
            this._point = 2;

          default:
            this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, n, t, n) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + n) / 2, t, this._y0, t, n);
        }

        this._x0 = t, this._y0 = n;
      }
    }]);

    return Gm;
  }();

  function Vm(t, n) {
    this._basis = new jm(t), this._beta = n;
  }

  Vm.prototype = {
    lineStart: function lineStart() {
      this._x = [], this._y = [], this._basis.lineStart();
    },
    lineEnd: function lineEnd() {
      var t = this._x,
          n = this._y,
          e = t.length - 1;
      if (e > 0) for (var r, i = t[0], o = n[0], a = t[e] - i, u = n[e] - o, c = -1; ++c <= e;) {
        r = c / e, this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * a), this._beta * n[c] + (1 - this._beta) * (o + r * u));
      }
      this._x = this._y = null, this._basis.lineEnd();
    },
    point: function point(t, n) {
      this._x.push(+t), this._y.push(+n);
    }
  };

  var $m = function t(n) {
    function e(t) {
      return 1 === n ? new jm(t) : new Vm(t, n);
    }

    return e.beta = function (n) {
      return t(+n);
    }, e;
  }(.85);

  function Wm(t, n, e) {
    t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2);
  }

  function Zm(t, n) {
    this._context = t, this._k = (1 - n) / 6;
  }

  Zm.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);

          break;

        case 3:
          Wm(this, this._x1, this._y1);
      }

      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;

        case 1:
          this._point = 2, this._x1 = t, this._y1 = n;
          break;

        case 2:
          this._point = 3;

        default:
          Wm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var Km = function t(n) {
    function e(t) {
      return new Zm(t, n);
    }

    return e.tension = function (n) {
      return t(+n);
    }, e;
  }(0);

  function Qm(t, n) {
    this._context = t, this._k = (1 - n) / 6;
  }

  Qm.prototype = {
    areaStart: Ym,
    areaEnd: Ym,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;

        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;

        case 3:
          this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
      }
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._x3 = t, this._y3 = n;
          break;

        case 1:
          this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
          break;

        case 2:
          this._point = 3, this._x5 = t, this._y5 = n;
          break;

        default:
          Wm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var Jm = function t(n) {
    function e(t) {
      return new Qm(t, n);
    }

    return e.tension = function (n) {
      return t(+n);
    }, e;
  }(0);

  function tx(t, n) {
    this._context = t, this._k = (1 - n) / 6;
  }

  tx.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
          break;

        case 3:
          this._point = 4;

        default:
          Wm(this, t, n);
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var nx = function t(n) {
    function e(t) {
      return new tx(t, n);
    }

    return e.tension = function (n) {
      return t(+n);
    }, e;
  }(0);

  function ex(t, n, e) {
    var r = t._x1,
        i = t._y1,
        o = t._x2,
        a = t._y2;

    if (t._l01_a > Yb) {
      var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
          c = 3 * t._l01_a * (t._l01_a + t._l12_a);
      r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c, i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c;
    }

    if (t._l23_a > Yb) {
      var f = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
          s = 3 * t._l23_a * (t._l23_a + t._l12_a);
      o = (o * f + t._x1 * t._l23_2a - n * t._l12_2a) / s, a = (a * f + t._y1 * t._l23_2a - e * t._l12_2a) / s;
    }

    t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2);
  }

  function rx(t, n) {
    this._context = t, this._alpha = n;
  }

  rx.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);

          break;

        case 3:
          this.point(this._x2, this._y2);
      }

      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      if (t = +t, n = +n, this._point) {
        var e = this._x2 - t,
            r = this._y2 - n;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;

        default:
          ex(this, t, n);
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var ix = function t(n) {
    function e(t) {
      return n ? new rx(t, n) : new Zm(t, 0);
    }

    return e.alpha = function (n) {
      return t(+n);
    }, e;
  }(.5);

  function ox(t, n) {
    this._context = t, this._alpha = n;
  }

  ox.prototype = {
    areaStart: Ym,
    areaEnd: Ym,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;

        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;

        case 3:
          this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
      }
    },
    point: function point(t, n) {
      if (t = +t, n = +n, this._point) {
        var e = this._x2 - t,
            r = this._y2 - n;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1, this._x3 = t, this._y3 = n;
          break;

        case 1:
          this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
          break;

        case 2:
          this._point = 3, this._x5 = t, this._y5 = n;
          break;

        default:
          ex(this, t, n);
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var ax = function t(n) {
    function e(t) {
      return n ? new ox(t, n) : new Qm(t, 0);
    }

    return e.alpha = function (n) {
      return t(+n);
    }, e;
  }(.5);

  function ux(t, n) {
    this._context = t, this._alpha = n;
  }

  ux.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      if (t = +t, n = +n, this._point) {
        var e = this._x2 - t,
            r = this._y2 - n;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
          break;

        case 3:
          this._point = 4;

        default:
          ex(this, t, n);
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
  };

  var cx = function t(n) {
    function e(t) {
      return n ? new ux(t, n) : new tx(t, 0);
    }

    return e.alpha = function (n) {
      return t(+n);
    }, e;
  }(.5);

  function fx(t) {
    this._context = t;
  }

  function sx(t) {
    return t < 0 ? -1 : 1;
  }

  function lx(t, n, e) {
    var r = t._x1 - t._x0,
        i = n - t._x1,
        o = (t._y1 - t._y0) / (r || i < 0 && -0),
        a = (e - t._y1) / (i || r < 0 && -0),
        u = (o * i + a * r) / (r + i);
    return (sx(o) + sx(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0;
  }

  function hx(t, n) {
    var e = t._x1 - t._x0;
    return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n;
  }

  function dx(t, n, e) {
    var r = t._x0,
        i = t._y0,
        o = t._x1,
        a = t._y1,
        u = (o - r) / 3;

    t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a);
  }

  function px(t) {
    this._context = t;
  }

  function gx(t) {
    this._context = new yx(t);
  }

  function yx(t) {
    this._context = t;
  }

  function vx(t) {
    this._context = t;
  }

  function _x(t) {
    var n,
        e,
        r = t.length - 1,
        i = new Array(r),
        o = new Array(r),
        a = new Array(r);

    for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n) {
      i[n] = 1, o[n] = 4, a[n] = 4 * t[n] + 2 * t[n + 1];
    }

    for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], n = 1; n < r; ++n) {
      e = i[n] / o[n - 1], o[n] -= e, a[n] -= e * a[n - 1];
    }

    for (i[r - 1] = a[r - 1] / o[r - 1], n = r - 2; n >= 0; --n) {
      i[n] = (a[n] - i[n + 1]) / o[n];
    }

    for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n) {
      o[n] = 2 * t[n + 1] - i[n + 1];
    }

    return [i, o];
  }

  function bx(t, n) {
    this._context = t, this._t = n;
  }

  function mx(t, n) {
    if ((i = t.length) > 1) for (var e, r, i, o = 1, a = t[n[0]], u = a.length; o < i; ++o) {
      for (r = a, a = t[n[o]], e = 0; e < u; ++e) {
        a[e][1] += a[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1];
      }
    }
  }

  function xx(t) {
    for (var n = t.length, e = new Array(n); --n >= 0;) {
      e[n] = n;
    }

    return e;
  }

  function wx(t, n) {
    return t[n];
  }

  function Mx(t) {
    var n = [];
    return n.key = t, n;
  }

  function Ax(t) {
    var n = t.map(Tx);
    return xx(t).sort(function (t, e) {
      return n[t] - n[e];
    });
  }

  function Tx(t) {
    for (var n, e = -1, r = 0, i = t.length, o = -1 / 0; ++e < i;) {
      (n = +t[e][1]) > o && (o = n, r = e);
    }

    return r;
  }

  function Sx(t) {
    var n = t.map(Ex);
    return xx(t).sort(function (t, e) {
      return n[t] - n[e];
    });
  }

  function Ex(t) {
    for (var n, e = 0, r = -1, i = t.length; ++r < i;) {
      (n = +t[r][1]) && (e += n);
    }

    return e;
  }

  fx.prototype = {
    areaStart: Ym,
    areaEnd: Ym,
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      this._point && this._context.closePath();
    },
    point: function point(t, n) {
      t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n));
    }
  }, px.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);

          break;

        case 3:
          dx(this, this._t0, hx(this, this._t0));
      }

      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function point(t, n) {
      var e = NaN;

      if (n = +n, (t = +t) !== this._x1 || n !== this._y1) {
        switch (this._point) {
          case 0:
            this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
            break;

          case 1:
            this._point = 2;
            break;

          case 2:
            this._point = 3, dx(this, hx(this, e = lx(this, t, n)), e);
            break;

          default:
            dx(this, this._t0, e = lx(this, t, n));
        }

        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e;
      }
    }
  }, (gx.prototype = Object.create(px.prototype)).point = function (t, n) {
    px.prototype.point.call(this, n, t);
  }, yx.prototype = {
    moveTo: function moveTo(t, n) {
      this._context.moveTo(n, t);
    },
    closePath: function closePath() {
      this._context.closePath();
    },
    lineTo: function lineTo(t, n) {
      this._context.lineTo(n, t);
    },
    bezierCurveTo: function bezierCurveTo(t, n, e, r, i, o) {
      this._context.bezierCurveTo(n, t, r, e, o, i);
    }
  }, vx.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x = [], this._y = [];
    },
    lineEnd: function lineEnd() {
      var t = this._x,
          n = this._y,
          e = t.length;
      if (e) if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e) this._context.lineTo(t[1], n[1]);else for (var r = _x(t), i = _x(n), o = 0, a = 1; a < e; ++o, ++a) {
        this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], n[a]);
      }
      (this._line || 0 !== this._line && 1 === e) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
    },
    point: function point(t, n) {
      this._x.push(+t), this._y.push(+n);
    }
  }, bx.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x = this._y = NaN, this._point = 0;
    },
    lineEnd: function lineEnd() {
      0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
    },
    point: function point(t, n) {
      switch (t = +t, n = +n, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
          break;

        case 1:
          this._point = 2;

        default:
          if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);else {
            var e = this._x * (1 - this._t) + t * this._t;
            this._context.lineTo(e, this._y), this._context.lineTo(e, n);
          }
      }

      this._x = t, this._y = n;
    }
  };

  var kx = function kx(t) {
    return function () {
      return t;
    };
  };

  function Nx(t, _ref13) {
    var n = _ref13.sourceEvent,
        e = _ref13.target,
        r = _ref13.transform,
        i = _ref13.dispatch;
    Object.defineProperties(this, {
      type: {
        value: t,
        enumerable: !0,
        configurable: !0
      },
      sourceEvent: {
        value: n,
        enumerable: !0,
        configurable: !0
      },
      target: {
        value: e,
        enumerable: !0,
        configurable: !0
      },
      transform: {
        value: r,
        enumerable: !0,
        configurable: !0
      },
      _: {
        value: i
      }
    });
  }

  function Cx(t, n, e) {
    this.k = t, this.x = n, this.y = e;
  }

  Cx.prototype = {
    constructor: Cx,
    scale: function scale(t) {
      return 1 === t ? this : new Cx(this.k * t, this.x, this.y);
    },
    translate: function translate(t, n) {
      return 0 === t & 0 === n ? this : new Cx(this.k, this.x + this.k * t, this.y + this.k * n);
    },
    apply: function apply(t) {
      return [t[0] * this.k + this.x, t[1] * this.k + this.y];
    },
    applyX: function applyX(t) {
      return t * this.k + this.x;
    },
    applyY: function applyY(t) {
      return t * this.k + this.y;
    },
    invert: function invert(t) {
      return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
    },
    invertX: function invertX(t) {
      return (t - this.x) / this.k;
    },
    invertY: function invertY(t) {
      return (t - this.y) / this.k;
    },
    rescaleX: function rescaleX(t) {
      return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
    },
    rescaleY: function rescaleY(t) {
      return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
    },
    toString: function toString() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var Px = new Cx(1, 0, 0);

  function zx(t) {
    for (; !t.__zoom;) {
      if (!(t = t.parentNode)) return Px;
    }

    return t.__zoom;
  }

  function Dx(t) {
    t.stopImmediatePropagation();
  }

  function qx(t) {
    t.preventDefault(), t.stopImmediatePropagation();
  }

  function Rx(t) {
    return !(t.ctrlKey && "wheel" !== t.type || t.button);
  }

  function Fx() {
    var t = this;
    return t instanceof SVGElement ? (t = t.ownerSVGElement || t).hasAttribute("viewBox") ? [[(t = t.viewBox.baseVal).x, t.y], [t.x + t.width, t.y + t.height]] : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]] : [[0, 0], [t.clientWidth, t.clientHeight]];
  }

  function Ox() {
    return this.__zoom || Px;
  }

  function Ix(t) {
    return -t.deltaY * (1 === t.deltaMode ? .05 : t.deltaMode ? 1 : .002) * (t.ctrlKey ? 10 : 1);
  }

  function Ux() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }

  function Bx(t, n, e) {
    var r = t.invertX(n[0][0]) - e[0][0],
        i = t.invertX(n[1][0]) - e[1][0],
        o = t.invertY(n[0][1]) - e[0][1],
        a = t.invertY(n[1][1]) - e[1][1];
    return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a));
  }

  zx.prototype = Cx.prototype, t.Adder = y, t.Delaunay = yu, t.FormatSpecifier = wc, t.InternMap = v, t.InternSet = _, t.Node = pd, t.Voronoi = su, t.ZoomTransform = Cx, t.active = function (t, n) {
    var e,
        r,
        i = t.__transition;
    if (i) for (r in n = null == n ? null : n + "", i) {
      if ((e = i[r]).state > 1 && e.name === n) return new Ki([[t]], So, n, +r);
    }
    return null;
  }, t.arc = function () {
    var t = Vb,
        n = $b,
        e = Db(0),
        r = null,
        i = Wb,
        o = Zb,
        a = Kb,
        u = null;

    function c() {
      var c,
          f,
          s = +t.apply(this, arguments),
          l = +n.apply(this, arguments),
          h = i.apply(this, arguments) - jb,
          d = o.apply(this, arguments) - jb,
          p = qb(d - h),
          g = d > h;
      if (u || (u = c = va()), l < s && (f = l, l = s, s = f), l > Yb) {
        if (p > Hb - Yb) u.moveTo(l * Fb(h), l * Ub(h)), u.arc(0, 0, l, h, d, !g), s > Yb && (u.moveTo(s * Fb(d), s * Ub(d)), u.arc(0, 0, s, d, h, g));else {
          var y,
              v,
              _ = h,
              b = d,
              m = h,
              x = d,
              w = p,
              M = p,
              A = a.apply(this, arguments) / 2,
              T = A > Yb && (r ? +r.apply(this, arguments) : Bb(s * s + l * l)),
              S = Ib(qb(l - s) / 2, +e.apply(this, arguments)),
              E = S,
              k = S;

          if (T > Yb) {
            var N = Gb(T / s * Ub(A)),
                C = Gb(T / l * Ub(A));
            (w -= 2 * N) > Yb ? (m += N *= g ? 1 : -1, x -= N) : (w = 0, m = x = (h + d) / 2), (M -= 2 * C) > Yb ? (_ += C *= g ? 1 : -1, b -= C) : (M = 0, _ = b = (h + d) / 2);
          }

          var P = l * Fb(_),
              z = l * Ub(_),
              D = s * Fb(x),
              q = s * Ub(x);

          if (S > Yb) {
            var R,
                F = l * Fb(b),
                O = l * Ub(b),
                I = s * Fb(m),
                U = s * Ub(m);

            if (p < Lb && (R = Qb(P, z, I, U, F, O, D, q))) {
              var B = P - R[0],
                  Y = z - R[1],
                  L = F - R[0],
                  j = O - R[1],
                  H = 1 / Ub(Xb((B * L + Y * j) / (Bb(B * B + Y * Y) * Bb(L * L + j * j))) / 2),
                  X = Bb(R[0] * R[0] + R[1] * R[1]);
              E = Ib(S, (s - X) / (H - 1)), k = Ib(S, (l - X) / (H + 1));
            }
          }

          M > Yb ? k > Yb ? (y = Jb(I, U, P, z, l, k, g), v = Jb(F, O, D, q, l, k, g), u.moveTo(y.cx + y.x01, y.cy + y.y01), k < S ? u.arc(y.cx, y.cy, k, Rb(y.y01, y.x01), Rb(v.y01, v.x01), !g) : (u.arc(y.cx, y.cy, k, Rb(y.y01, y.x01), Rb(y.y11, y.x11), !g), u.arc(0, 0, l, Rb(y.cy + y.y11, y.cx + y.x11), Rb(v.cy + v.y11, v.cx + v.x11), !g), u.arc(v.cx, v.cy, k, Rb(v.y11, v.x11), Rb(v.y01, v.x01), !g))) : (u.moveTo(P, z), u.arc(0, 0, l, _, b, !g)) : u.moveTo(P, z), s > Yb && w > Yb ? E > Yb ? (y = Jb(D, q, F, O, s, -E, g), v = Jb(P, z, I, U, s, -E, g), u.lineTo(y.cx + y.x01, y.cy + y.y01), E < S ? u.arc(y.cx, y.cy, E, Rb(y.y01, y.x01), Rb(v.y01, v.x01), !g) : (u.arc(y.cx, y.cy, E, Rb(y.y01, y.x01), Rb(y.y11, y.x11), !g), u.arc(0, 0, s, Rb(y.cy + y.y11, y.cx + y.x11), Rb(v.cy + v.y11, v.cx + v.x11), g), u.arc(v.cx, v.cy, E, Rb(v.y11, v.x11), Rb(v.y01, v.x01), !g))) : u.arc(0, 0, s, x, m, g) : u.lineTo(D, q);
        }
      } else u.moveTo(0, 0);
      if (u.closePath(), c) return u = null, c + "" || null;
    }

    return c.centroid = function () {
      var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2,
          r = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Lb / 2;
      return [Fb(r) * e, Ub(r) * e];
    }, c.innerRadius = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(+n), c) : t;
    }, c.outerRadius = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Db(+t), c) : n;
    }, c.cornerRadius = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Db(+t), c) : e;
    }, c.padRadius = function (t) {
      return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Db(+t), c) : r;
    }, c.startAngle = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Db(+t), c) : i;
    }, c.endAngle = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : Db(+t), c) : o;
    }, c.padAngle = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : Db(+t), c) : a;
    }, c.context = function (t) {
      return arguments.length ? (u = null == t ? null : t, c) : u;
    }, c;
  }, t.area = um, t.areaRadial = gm, t.ascending = n, t.autoType = function (t) {
    for (var n in t) {
      var e,
          r,
          i = t[n].trim();
      if (i) {
        if ("true" === i) i = !0;else if ("false" === i) i = !1;else if ("NaN" === i) i = NaN;else if (isNaN(e = +i)) {
          if (!(r = i.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/))) continue;
          Bu && r[4] && !r[7] && (i = i.replace(/-/g, "/").replace(/T/, " ")), i = new Date(i);
        } else i = e;
      } else i = null;
      t[n] = i;
    }

    return t;
  }, t.axisBottom = function (t) {
    return vt(3, t);
  }, t.axisLeft = function (t) {
    return vt(4, t);
  }, t.axisRight = function (t) {
    return vt(2, t);
  }, t.axisTop = function (t) {
    return vt(1, t);
  }, t.bin = X, t.bisect = c, t.bisectCenter = u, t.bisectLeft = a, t.bisectRight = o, t.bisector = e, t.blob = function (t, n) {
    return fetch(t, n).then(Yu);
  }, t.brush = function () {
    return ta(Lo);
  }, t.brushSelection = function (t) {
    var n = t.__brush;
    return n ? n.dim.output(n.selection) : null;
  }, t.brushX = function () {
    return ta(Bo);
  }, t.brushY = function () {
    return ta(Yo);
  }, t.buffer = function (t, n) {
    return fetch(t, n).then(Lu);
  }, t.chord = function () {
    return la(!1, !1);
  }, t.chordDirected = function () {
    return la(!0, !1);
  }, t.chordTranspose = function () {
    return la(!1, !0);
  }, t.cluster = function () {
    var t = od,
        n = 1,
        e = 1,
        r = !1;

    function i(i) {
      var o,
          a = 0;
      i.eachAfter(function (n) {
        var e = n.children;
        e ? (n.x = function (t) {
          return t.reduce(ad, 0) / t.length;
        }(e), n.y = function (t) {
          return 1 + t.reduce(ud, 0);
        }(e)) : (n.x = o ? a += t(n, o) : 0, n.y = 0, o = n);
      });

      var u = function (t) {
        for (var n; n = t.children;) {
          t = n[0];
        }

        return t;
      }(i),
          c = function (t) {
        for (var n; n = t.children;) {
          t = n[n.length - 1];
        }

        return t;
      }(i),
          f = u.x - t(u, c) / 2,
          s = c.x + t(c, u) / 2;

      return i.eachAfter(r ? function (t) {
        t.x = (t.x - i.x) * n, t.y = (i.y - t.y) * e;
      } : function (t) {
        t.x = (t.x - f) / (s - f) * n, t.y = (1 - (i.y ? t.y / i.y : 1)) * e;
      });
    }

    return i.separation = function (n) {
      return arguments.length ? (t = n, i) : t;
    }, i.size = function (t) {
      return arguments.length ? (r = !1, n = +t[0], e = +t[1], i) : r ? null : [n, e];
    }, i.nodeSize = function (t) {
      return arguments.length ? (r = !0, n = +t[0], e = +t[1], i) : r ? [n, e] : null;
    }, i;
  }, t.color = xe, t.contourDensity = function () {
    var t = Ua,
        n = Ba,
        e = Ya,
        r = 960,
        i = 500,
        o = 20,
        a = 2,
        u = 3 * o,
        c = r + 2 * u >> a,
        f = i + 2 * u >> a,
        s = Ca(20);

    function l(r) {
      var i = new Float32Array(c * f),
          l = new Float32Array(c * f),
          d = Math.pow(2, -a);
      r.forEach(function (r, o, a) {
        var s = (t(r, o, a) + u) * d,
            l = (n(r, o, a) + u) * d,
            h = +e(r, o, a);

        if (s >= 0 && s < c && l >= 0 && l < f) {
          var p = Math.floor(s),
              g = Math.floor(l),
              y = s - p - .5,
              v = l - g - .5;
          i[p + g * c] += (1 - y) * (1 - v) * h, i[p + 1 + g * c] += y * (1 - v) * h, i[p + 1 + (g + 1) * c] += y * v * h, i[p + (g + 1) * c] += (1 - y) * v * h;
        }
      }), Oa({
        width: c,
        height: f,
        data: i
      }, {
        width: c,
        height: f,
        data: l
      }, o >> a), Ia({
        width: c,
        height: f,
        data: l
      }, {
        width: c,
        height: f,
        data: i
      }, o >> a), Oa({
        width: c,
        height: f,
        data: i
      }, {
        width: c,
        height: f,
        data: l
      }, o >> a), Ia({
        width: c,
        height: f,
        data: l
      }, {
        width: c,
        height: f,
        data: i
      }, o >> a), Oa({
        width: c,
        height: f,
        data: i
      }, {
        width: c,
        height: f,
        data: l
      }, o >> a), Ia({
        width: c,
        height: f,
        data: l
      }, {
        width: c,
        height: f,
        data: i
      }, o >> a);
      var p = s(i);

      if (!Array.isArray(p)) {
        var g = G(i);
        p = L(0, g, p), (p = et(0, Math.floor(g / p) * p, p)).shift();
      }

      return Fa().thresholds(p).size([c, f])(i).map(h);
    }

    function h(t) {
      return t.value *= Math.pow(2, -2 * a), t.coordinates.forEach(d), t;
    }

    function d(t) {
      t.forEach(p);
    }

    function p(t) {
      t.forEach(g);
    }

    function g(t) {
      t[0] = t[0] * Math.pow(2, a) - u, t[1] = t[1] * Math.pow(2, a) - u;
    }

    function y() {
      return c = r + 2 * (u = 3 * o) >> a, f = i + 2 * u >> a, l;
    }

    return l.x = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Ca(+n), l) : t;
    }, l.y = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Ca(+t), l) : n;
    }, l.weight = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Ca(+t), l) : e;
    }, l.size = function (t) {
      if (!arguments.length) return [r, i];
      var n = +t[0],
          e = +t[1];
      if (!(n >= 0 && e >= 0)) throw new Error("invalid size");
      return r = n, i = e, y();
    }, l.cellSize = function (t) {
      if (!arguments.length) return 1 << a;
      if (!((t = +t) >= 1)) throw new Error("invalid cell size");
      return a = Math.floor(Math.log(t) / Math.LN2), y();
    }, l.thresholds = function (t) {
      return arguments.length ? (s = "function" == typeof t ? t : Array.isArray(t) ? Ca(ka.call(t)) : Ca(t), l) : s;
    }, l.bandwidth = function (t) {
      if (!arguments.length) return Math.sqrt(o * (o + 1));
      if (!((t = +t) >= 0)) throw new Error("invalid bandwidth");
      return o = Math.round((Math.sqrt(4 * t * t + 1) - 1) / 2), y();
    }, l;
  }, t.contours = Fa, t.count = f, t.create = function (t) {
    return Un(Nt(t).call(document.documentElement));
  }, t.creator = Nt, t.cross = function () {
    for (var _len6 = arguments.length, t = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      t[_key6] = arguments[_key6];
    }

    var n = "function" == typeof t[t.length - 1] && function (t) {
      return function (n) {
        return t.apply(void 0, _toConsumableArray(n));
      };
    }(t.pop()),
        e = (t = t.map(h)).map(s),
        r = t.length - 1,
        i = new Array(r + 1).fill(0),
        o = [];

    if (r < 0 || e.some(l)) return o;

    for (;;) {
      o.push(i.map(function (n, e) {
        return t[e][n];
      }));
      var _a19 = r;

      for (; ++i[_a19] === e[_a19];) {
        if (0 === _a19) return n ? o.map(n) : o;
        i[_a19--] = 0;
      }
    }
  }, t.csv = Gu, t.csvFormat = Eu, t.csvFormatBody = ku, t.csvFormatRow = Cu, t.csvFormatRows = Nu, t.csvFormatValue = Pu, t.csvParse = Tu, t.csvParseRows = Su, t.cubehelix = cr, t.cumsum = function (t, n) {
    var e = 0,
        r = 0;
    return Float64Array.from(t, void 0 === n ? function (t) {
      return e += +t || 0;
    } : function (i) {
      return e += +n(i, r++, t) || 0;
    });
  }, t.curveBasis = function (t) {
    return new jm(t);
  }, t.curveBasisClosed = function (t) {
    return new Hm(t);
  }, t.curveBasisOpen = function (t) {
    return new Xm(t);
  }, t.curveBumpX = function (t) {
    return new Gm(t, !0);
  }, t.curveBumpY = function (t) {
    return new Gm(t, !1);
  }, t.curveBundle = $m, t.curveCardinal = Km, t.curveCardinalClosed = Jm, t.curveCardinalOpen = nx, t.curveCatmullRom = ix, t.curveCatmullRomClosed = ax, t.curveCatmullRomOpen = cx, t.curveLinear = rm, t.curveLinearClosed = function (t) {
    return new fx(t);
  }, t.curveMonotoneX = function (t) {
    return new px(t);
  }, t.curveMonotoneY = function (t) {
    return new gx(t);
  }, t.curveNatural = function (t) {
    return new vx(t);
  }, t.curveStep = function (t) {
    return new bx(t, .5);
  }, t.curveStepAfter = function (t) {
    return new bx(t, 1);
  }, t.curveStepBefore = function (t) {
    return new bx(t, 0);
  }, t.descending = function (t, n) {
    return null == t || null == n ? NaN : n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }, t.deviation = p, t.difference = function (t) {
    t = new Set(t);

    for (var _len7 = arguments.length, n = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      n[_key7 - 1] = arguments[_key7];
    }

    for (var _i25 = 0, _n60 = n; _i25 < _n60.length; _i25++) {
      var _e34 = _n60[_i25];

      var _iterator37 = _createForOfIteratorHelper(_e34),
          _step37;

      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          var _n61 = _step37.value;
          t["delete"](_n61);
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }
    }

    return t;
  }, t.disjoint = function (t, n) {
    var e = n[Symbol.iterator](),
        r = new Set();

    var _iterator38 = _createForOfIteratorHelper(t),
        _step38;

    try {
      for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
        var _n62 = _step38.value;
        if (r.has(_n62)) return !1;

        var _t30 = void 0,
            _i26 = void 0;

        for (; (_e$next2 = e.next(), _t30 = _e$next2.value, _i26 = _e$next2.done, _e$next2) && !_i26;) {
          var _e$next2;

          if (Object.is(_n62, _t30)) return !1;
          r.add(_t30);
        }
      }
    } catch (err) {
      _iterator38.e(err);
    } finally {
      _iterator38.f();
    }

    return !0;
  }, t.dispatch = bt, t.drag = function () {
    var t,
        n,
        e,
        r,
        i = Jn,
        o = te,
        a = ne,
        u = ee,
        c = {},
        f = bt("start", "drag", "end"),
        s = 0,
        l = 0;

    function h(t) {
      t.on("mousedown.drag", d).filter(u).on("touchstart.drag", y).on("touchmove.drag", v, Xn).on("touchend.drag touchcancel.drag", _).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function d(a, u) {
      if (!r && i.call(this, a, u)) {
        var c = b(this, o.call(this, a, u), a, u, "mouse");
        c && (Un(a.view).on("mousemove.drag", p, Gn).on("mouseup.drag", g, Gn), Wn(a.view), Vn(a), e = !1, t = a.clientX, n = a.clientY, c("start", a));
      }
    }

    function p(r) {
      if ($n(r), !e) {
        var i = r.clientX - t,
            o = r.clientY - n;
        e = i * i + o * o > l;
      }

      c.mouse("drag", r);
    }

    function g(t) {
      Un(t.view).on("mousemove.drag mouseup.drag", null), Zn(t.view, e), $n(t), c.mouse("end", t);
    }

    function y(t, n) {
      if (i.call(this, t, n)) {
        var e,
            r,
            a = t.changedTouches,
            u = o.call(this, t, n),
            c = a.length;

        for (e = 0; e < c; ++e) {
          (r = b(this, u, t, n, a[e].identifier, a[e])) && (Vn(t), r("start", t, a[e]));
        }
      }
    }

    function v(t) {
      var n,
          e,
          r = t.changedTouches,
          i = r.length;

      for (n = 0; n < i; ++n) {
        (e = c[r[n].identifier]) && ($n(t), e("drag", t, r[n]));
      }
    }

    function _(t) {
      var n,
          e,
          i = t.changedTouches,
          o = i.length;

      for (r && clearTimeout(r), r = setTimeout(function () {
        r = null;
      }, 500), n = 0; n < o; ++n) {
        (e = c[i[n].identifier]) && (Vn(t), e("end", t, i[n]));
      }
    }

    function b(t, n, e, r, i, o) {
      var u,
          l,
          d,
          p = f.copy(),
          g = Hn(o || e, n);
      if (null != (d = a.call(t, new Qn("beforestart", {
        sourceEvent: e,
        target: h,
        identifier: i,
        active: s,
        x: g[0],
        y: g[1],
        dx: 0,
        dy: 0,
        dispatch: p
      }), r))) return u = d.x - g[0] || 0, l = d.y - g[1] || 0, function e(o, a, f) {
        var y,
            v = g;

        switch (o) {
          case "start":
            c[i] = e, y = s++;
            break;

          case "end":
            delete c[i], --s;

          case "drag":
            g = Hn(f || a, n), y = s;
        }

        p.call(o, t, new Qn(o, {
          sourceEvent: a,
          subject: d,
          target: h,
          identifier: i,
          active: y,
          x: g[0] + u,
          y: g[1] + l,
          dx: g[0] - v[0],
          dy: g[1] - v[1],
          dispatch: p
        }), r);
      };
    }

    return h.filter = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Kn(!!t), h) : i;
    }, h.container = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : Kn(t), h) : o;
    }, h.subject = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : Kn(t), h) : a;
    }, h.touchable = function (t) {
      return arguments.length ? (u = "function" == typeof t ? t : Kn(!!t), h) : u;
    }, h.on = function () {
      var t = f.on.apply(f, arguments);
      return t === f ? h : t;
    }, h.clickDistance = function (t) {
      return arguments.length ? (l = (t = +t) * t, h) : Math.sqrt(l);
    }, h;
  }, t.dragDisable = Wn, t.dragEnable = Zn, t.dsv = function (t, n, e, r) {
    3 === arguments.length && "function" == typeof e && (r = e, e = void 0);
    var i = Mu(t);
    return Hu(n, e).then(function (t) {
      return i.parse(t, r);
    });
  }, t.dsvFormat = Mu, t.easeBack = bo, t.easeBackIn = vo, t.easeBackInOut = bo, t.easeBackOut = _o, t.easeBounce = go, t.easeBounceIn = function (t) {
    return 1 - go(1 - t);
  }, t.easeBounceInOut = function (t) {
    return ((t *= 2) <= 1 ? 1 - go(1 - t) : go(t - 1) + 1) / 2;
  }, t.easeBounceOut = go, t.easeCircle = lo, t.easeCircleIn = function (t) {
    return 1 - Math.sqrt(1 - t * t);
  }, t.easeCircleInOut = lo, t.easeCircleOut = function (t) {
    return Math.sqrt(1 - --t * t);
  }, t.easeCubic = eo, t.easeCubicIn = function (t) {
    return t * t * t;
  }, t.easeCubicInOut = eo, t.easeCubicOut = function (t) {
    return --t * t * t + 1;
  }, t.easeElastic = wo, t.easeElasticIn = xo, t.easeElasticInOut = Mo, t.easeElasticOut = wo, t.easeExp = so, t.easeExpIn = function (t) {
    return fo(1 - +t);
  }, t.easeExpInOut = so, t.easeExpOut = function (t) {
    return 1 - fo(t);
  }, t.easeLinear = function (t) {
    return +t;
  }, t.easePoly = oo, t.easePolyIn = ro, t.easePolyInOut = oo, t.easePolyOut = io, t.easeQuad = no, t.easeQuadIn = function (t) {
    return t * t;
  }, t.easeQuadInOut = no, t.easeQuadOut = function (t) {
    return t * (2 - t);
  }, t.easeSin = co, t.easeSinIn = function (t) {
    return 1 == +t ? 1 : 1 - Math.cos(t * uo);
  }, t.easeSinInOut = co, t.easeSinOut = function (t) {
    return Math.sin(t * uo);
  }, t.every = function (t, n) {
    if ("function" != typeof n) throw new TypeError("test is not a function");
    var e = -1;

    var _iterator39 = _createForOfIteratorHelper(t),
        _step39;

    try {
      for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
        var _r36 = _step39.value;
        if (!n(_r36, ++e, t)) return !1;
      }
    } catch (err) {
      _iterator39.e(err);
    } finally {
      _iterator39.f();
    }

    return !0;
  }, t.extent = g, t.fcumsum = function (t, n) {
    var e = new y();
    var r = -1;
    return Float64Array.from(t, void 0 === n ? function (t) {
      return e.add(+t || 0);
    } : function (i) {
      return e.add(+n(i, ++r, t) || 0);
    });
  }, t.filter = function (t, n) {
    if ("function" != typeof n) throw new TypeError("test is not a function");
    var e = [];
    var r = -1;

    var _iterator40 = _createForOfIteratorHelper(t),
        _step40;

    try {
      for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
        var _i27 = _step40.value;
        n(_i27, ++r, t) && e.push(_i27);
      }
    } catch (err) {
      _iterator40.e(err);
    } finally {
      _iterator40.f();
    }

    return e;
  }, t.flatGroup = function (t) {
    for (var _len8 = arguments.length, n = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
      n[_key8 - 1] = arguments[_key8];
    }

    return S(T.apply(void 0, [t].concat(n)), n);
  }, t.flatRollup = function (t, n) {
    for (var _len9 = arguments.length, e = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
      e[_key9 - 2] = arguments[_key9];
    }

    return S(k.apply(void 0, [t, n].concat(e)), e);
  }, t.forceCenter = function (t, n) {
    var e,
        r = 1;

    function i() {
      var i,
          o,
          a = e.length,
          u = 0,
          c = 0;

      for (i = 0; i < a; ++i) {
        u += (o = e[i]).x, c += o.y;
      }

      for (u = (u / a - t) * r, c = (c / a - n) * r, i = 0; i < a; ++i) {
        (o = e[i]).x -= u, o.y -= c;
      }
    }

    return null == t && (t = 0), null == n && (n = 0), i.initialize = function (t) {
      e = t;
    }, i.x = function (n) {
      return arguments.length ? (t = +n, i) : t;
    }, i.y = function (t) {
      return arguments.length ? (n = +t, i) : n;
    }, i.strength = function (t) {
      return arguments.length ? (r = +t, i) : r;
    }, i;
  }, t.forceCollide = function (t) {
    var n,
        e,
        r,
        i = 1,
        o = 1;

    function a() {
      for (var t, a, c, f, s, l, h, d = n.length, p = 0; p < o; ++p) {
        for (a = rc(n, fc, sc).visitAfter(u), t = 0; t < d; ++t) {
          c = n[t], l = e[c.index], h = l * l, f = c.x + c.vx, s = c.y + c.vy, a.visit(g);
        }
      }

      function g(t, n, e, o, a) {
        var u = t.data,
            d = t.r,
            p = l + d;
        if (!u) return n > f + p || o < f - p || e > s + p || a < s - p;

        if (u.index > c.index) {
          var g = f - u.x - u.vx,
              y = s - u.y - u.vy,
              v = g * g + y * y;
          v < p * p && (0 === g && (v += (g = cc(r)) * g), 0 === y && (v += (y = cc(r)) * y), v = (p - (v = Math.sqrt(v))) / v * i, c.vx += (g *= v) * (p = (d *= d) / (h + d)), c.vy += (y *= v) * p, u.vx -= g * (p = 1 - p), u.vy -= y * p);
        }
      }
    }

    function u(t) {
      if (t.data) return t.r = e[t.data.index];

      for (var n = t.r = 0; n < 4; ++n) {
        t[n] && t[n].r > t.r && (t.r = t[n].r);
      }
    }

    function c() {
      if (n) {
        var r,
            i,
            o = n.length;

        for (e = new Array(o), r = 0; r < o; ++r) {
          i = n[r], e[i.index] = +t(i, r, n);
        }
      }
    }

    return "function" != typeof t && (t = uc(null == t ? 1 : +t)), a.initialize = function (t, e) {
      n = t, r = e, c();
    }, a.iterations = function (t) {
      return arguments.length ? (o = +t, a) : o;
    }, a.strength = function (t) {
      return arguments.length ? (i = +t, a) : i;
    }, a.radius = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : uc(+n), c(), a) : t;
    }, a;
  }, t.forceLink = function (t) {
    var n,
        e,
        r,
        i,
        o,
        a,
        u = lc,
        c = function c(t) {
      return 1 / Math.min(i[t.source.index], i[t.target.index]);
    },
        f = uc(30),
        s = 1;

    function l(r) {
      for (var i = 0, u = t.length; i < s; ++i) {
        for (var c, f, l, h, d, p, g, y = 0; y < u; ++y) {
          f = (c = t[y]).source, h = (l = c.target).x + l.vx - f.x - f.vx || cc(a), d = l.y + l.vy - f.y - f.vy || cc(a), h *= p = ((p = Math.sqrt(h * h + d * d)) - e[y]) / p * r * n[y], d *= p, l.vx -= h * (g = o[y]), l.vy -= d * g, f.vx += h * (g = 1 - g), f.vy += d * g;
        }
      }
    }

    function h() {
      if (r) {
        var a,
            c,
            f = r.length,
            s = t.length,
            l = new Map(r.map(function (t, n) {
          return [u(t, n, r), t];
        }));

        for (a = 0, i = new Array(f); a < s; ++a) {
          (c = t[a]).index = a, "object" != _typeof(c.source) && (c.source = hc(l, c.source)), "object" != _typeof(c.target) && (c.target = hc(l, c.target)), i[c.source.index] = (i[c.source.index] || 0) + 1, i[c.target.index] = (i[c.target.index] || 0) + 1;
        }

        for (a = 0, o = new Array(s); a < s; ++a) {
          c = t[a], o[a] = i[c.source.index] / (i[c.source.index] + i[c.target.index]);
        }

        n = new Array(s), d(), e = new Array(s), p();
      }
    }

    function d() {
      if (r) for (var e = 0, i = t.length; e < i; ++e) {
        n[e] = +c(t[e], e, t);
      }
    }

    function p() {
      if (r) for (var n = 0, i = t.length; n < i; ++n) {
        e[n] = +f(t[n], n, t);
      }
    }

    return null == t && (t = []), l.initialize = function (t, n) {
      r = t, a = n, h();
    }, l.links = function (n) {
      return arguments.length ? (t = n, h(), l) : t;
    }, l.id = function (t) {
      return arguments.length ? (u = t, l) : u;
    }, l.iterations = function (t) {
      return arguments.length ? (s = +t, l) : s;
    }, l.strength = function (t) {
      return arguments.length ? (c = "function" == typeof t ? t : uc(+t), d(), l) : c;
    }, l.distance = function (t) {
      return arguments.length ? (f = "function" == typeof t ? t : uc(+t), p(), l) : f;
    }, l;
  }, t.forceManyBody = function () {
    var t,
        n,
        e,
        r,
        i,
        o = uc(-30),
        a = 1,
        u = 1 / 0,
        c = .81;

    function f(e) {
      var i,
          o = t.length,
          a = rc(t, pc, gc).visitAfter(l);

      for (r = e, i = 0; i < o; ++i) {
        n = t[i], a.visit(h);
      }
    }

    function s() {
      if (t) {
        var n,
            e,
            r = t.length;

        for (i = new Array(r), n = 0; n < r; ++n) {
          e = t[n], i[e.index] = +o(e, n, t);
        }
      }
    }

    function l(t) {
      var n,
          e,
          r,
          o,
          a,
          u = 0,
          c = 0;

      if (t.length) {
        for (r = o = a = 0; a < 4; ++a) {
          (n = t[a]) && (e = Math.abs(n.value)) && (u += n.value, c += e, r += e * n.x, o += e * n.y);
        }

        t.x = r / c, t.y = o / c;
      } else {
        (n = t).x = n.data.x, n.y = n.data.y;

        do {
          u += i[n.data.index];
        } while (n = n.next);
      }

      t.value = u;
    }

    function h(t, o, f, s) {
      if (!t.value) return !0;
      var l = t.x - n.x,
          h = t.y - n.y,
          d = s - o,
          p = l * l + h * h;
      if (d * d / c < p) return p < u && (0 === l && (p += (l = cc(e)) * l), 0 === h && (p += (h = cc(e)) * h), p < a && (p = Math.sqrt(a * p)), n.vx += l * t.value * r / p, n.vy += h * t.value * r / p), !0;

      if (!(t.length || p >= u)) {
        (t.data !== n || t.next) && (0 === l && (p += (l = cc(e)) * l), 0 === h && (p += (h = cc(e)) * h), p < a && (p = Math.sqrt(a * p)));

        do {
          t.data !== n && (d = i[t.data.index] * r / p, n.vx += l * d, n.vy += h * d);
        } while (t = t.next);
      }
    }

    return f.initialize = function (n, r) {
      t = n, e = r, s();
    }, f.strength = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : uc(+t), s(), f) : o;
    }, f.distanceMin = function (t) {
      return arguments.length ? (a = t * t, f) : Math.sqrt(a);
    }, f.distanceMax = function (t) {
      return arguments.length ? (u = t * t, f) : Math.sqrt(u);
    }, f.theta = function (t) {
      return arguments.length ? (c = t * t, f) : Math.sqrt(c);
    }, f;
  }, t.forceRadial = function (t, n, e) {
    var r,
        i,
        o,
        a = uc(.1);

    function u(t) {
      for (var a = 0, u = r.length; a < u; ++a) {
        var c = r[a],
            f = c.x - n || 1e-6,
            s = c.y - e || 1e-6,
            l = Math.sqrt(f * f + s * s),
            h = (o[a] - l) * i[a] * t / l;
        c.vx += f * h, c.vy += s * h;
      }
    }

    function c() {
      if (r) {
        var n,
            e = r.length;

        for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n) {
          o[n] = +t(r[n], n, r), i[n] = isNaN(o[n]) ? 0 : +a(r[n], n, r);
        }
      }
    }

    return "function" != typeof t && (t = uc(+t)), null == n && (n = 0), null == e && (e = 0), u.initialize = function (t) {
      r = t, c();
    }, u.strength = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : uc(+t), c(), u) : a;
    }, u.radius = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : uc(+n), c(), u) : t;
    }, u.x = function (t) {
      return arguments.length ? (n = +t, u) : n;
    }, u.y = function (t) {
      return arguments.length ? (e = +t, u) : e;
    }, u;
  }, t.forceSimulation = function (t) {
    var n,
        e = 1,
        r = .001,
        i = 1 - Math.pow(r, 1 / 300),
        o = 0,
        a = .6,
        u = new Map(),
        c = li(l),
        f = bt("tick", "end"),
        s = function () {
      var t = 1;
      return function () {
        return (t = (1664525 * t + 1013904223) % dc) / dc;
      };
    }();

    function l() {
      h(), f.call("tick", n), e < r && (c.stop(), f.call("end", n));
    }

    function h(r) {
      var c,
          f,
          s = t.length;
      void 0 === r && (r = 1);

      for (var l = 0; l < r; ++l) {
        for (e += (o - e) * i, u.forEach(function (t) {
          t(e);
        }), c = 0; c < s; ++c) {
          null == (f = t[c]).fx ? f.x += f.vx *= a : (f.x = f.fx, f.vx = 0), null == f.fy ? f.y += f.vy *= a : (f.y = f.fy, f.vy = 0);
        }
      }

      return n;
    }

    function d() {
      for (var n, e = 0, r = t.length; e < r; ++e) {
        if ((n = t[e]).index = e, null != n.fx && (n.x = n.fx), null != n.fy && (n.y = n.fy), isNaN(n.x) || isNaN(n.y)) {
          var i = 10 * Math.sqrt(.5 + e),
              o = e * yc;
          n.x = i * Math.cos(o), n.y = i * Math.sin(o);
        }

        (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
      }
    }

    function p(n) {
      return n.initialize && n.initialize(t, s), n;
    }

    return null == t && (t = []), d(), n = {
      tick: h,
      restart: function restart() {
        return c.restart(l), n;
      },
      stop: function stop() {
        return c.stop(), n;
      },
      nodes: function nodes(e) {
        return arguments.length ? (t = e, d(), u.forEach(p), n) : t;
      },
      alpha: function alpha(t) {
        return arguments.length ? (e = +t, n) : e;
      },
      alphaMin: function alphaMin(t) {
        return arguments.length ? (r = +t, n) : r;
      },
      alphaDecay: function alphaDecay(t) {
        return arguments.length ? (i = +t, n) : +i;
      },
      alphaTarget: function alphaTarget(t) {
        return arguments.length ? (o = +t, n) : o;
      },
      velocityDecay: function velocityDecay(t) {
        return arguments.length ? (a = 1 - t, n) : 1 - a;
      },
      randomSource: function randomSource(t) {
        return arguments.length ? (s = t, u.forEach(p), n) : s;
      },
      force: function force(t, e) {
        return arguments.length > 1 ? (null == e ? u["delete"](t) : u.set(t, p(e)), n) : u.get(t);
      },
      find: function find(n, e, r) {
        var i,
            o,
            a,
            u,
            c,
            f = 0,
            s = t.length;

        for (null == r ? r = 1 / 0 : r *= r, f = 0; f < s; ++f) {
          (a = (i = n - (u = t[f]).x) * i + (o = e - u.y) * o) < r && (c = u, r = a);
        }

        return c;
      },
      on: function on(t, e) {
        return arguments.length > 1 ? (f.on(t, e), n) : f.on(t);
      }
    };
  }, t.forceX = function (t) {
    var n,
        e,
        r,
        i = uc(.1);

    function o(t) {
      for (var i, o = 0, a = n.length; o < a; ++o) {
        (i = n[o]).vx += (r[o] - i.x) * e[o] * t;
      }
    }

    function a() {
      if (n) {
        var o,
            a = n.length;

        for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o) {
          e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n);
        }
      }
    }

    return "function" != typeof t && (t = uc(null == t ? 0 : +t)), o.initialize = function (t) {
      n = t, a();
    }, o.strength = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : uc(+t), a(), o) : i;
    }, o.x = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : uc(+n), a(), o) : t;
    }, o;
  }, t.forceY = function (t) {
    var n,
        e,
        r,
        i = uc(.1);

    function o(t) {
      for (var i, o = 0, a = n.length; o < a; ++o) {
        (i = n[o]).vy += (r[o] - i.y) * e[o] * t;
      }
    }

    function a() {
      if (n) {
        var o,
            a = n.length;

        for (e = new Array(a), r = new Array(a), o = 0; o < a; ++o) {
          e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n);
        }
      }
    }

    return "function" != typeof t && (t = uc(null == t ? 0 : +t)), o.initialize = function (t) {
      n = t, a();
    }, o.strength = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : uc(+t), a(), o) : i;
    }, o.y = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : uc(+n), a(), o) : t;
    }, o;
  }, t.formatDefaultLocale = Cc, t.formatLocale = Nc, t.formatSpecifier = xc, t.fsum = function (t, n) {
    var e = new y();

    if (void 0 === n) {
      var _iterator41 = _createForOfIteratorHelper(t),
          _step41;

      try {
        for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
          var _n63 = _step41.value;
          (_n63 = +_n63) && e.add(_n63);
        }
      } catch (err) {
        _iterator41.e(err);
      } finally {
        _iterator41.f();
      }
    } else {
      var _r37 = -1;

      var _iterator42 = _createForOfIteratorHelper(t),
          _step42;

      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var _i28 = _step42.value;
          (_i28 = +n(_i28, ++_r37, t)) && e.add(_i28);
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
    }

    return +e;
  }, t.geoAlbers = Oh, t.geoAlbersUsa = function () {
    var t,
        n,
        e,
        r,
        i,
        o,
        a = Oh(),
        u = Fh().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
        c = Fh().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
        f = {
      point: function point(t, n) {
        o = [t, n];
      }
    };

    function s(t) {
      var n = t[0],
          a = t[1];
      return o = null, e.point(n, a), o || (r.point(n, a), o) || (i.point(n, a), o);
    }

    function l() {
      return t = n = null, s;
    }

    return s.invert = function (t) {
      var n = a.scale(),
          e = a.translate(),
          r = (t[0] - e[0]) / n,
          i = (t[1] - e[1]) / n;
      return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? c : a).invert(t);
    }, s.stream = function (e) {
      return t && n === e ? t : (r = [a.stream(n = e), u.stream(e), c.stream(e)], i = r.length, t = {
        point: function point(t, n) {
          for (var e = -1; ++e < i;) {
            r[e].point(t, n);
          }
        },
        sphere: function sphere() {
          for (var t = -1; ++t < i;) {
            r[t].sphere();
          }
        },
        lineStart: function lineStart() {
          for (var t = -1; ++t < i;) {
            r[t].lineStart();
          }
        },
        lineEnd: function lineEnd() {
          for (var t = -1; ++t < i;) {
            r[t].lineEnd();
          }
        },
        polygonStart: function polygonStart() {
          for (var t = -1; ++t < i;) {
            r[t].polygonStart();
          }
        },
        polygonEnd: function polygonEnd() {
          for (var t = -1; ++t < i;) {
            r[t].polygonEnd();
          }
        }
      });
      var r, i;
    }, s.precision = function (t) {
      return arguments.length ? (a.precision(t), u.precision(t), c.precision(t), l()) : a.precision();
    }, s.scale = function (t) {
      return arguments.length ? (a.scale(t), u.scale(.35 * t), c.scale(t), s.translate(a.translate())) : a.scale();
    }, s.translate = function (t) {
      if (!arguments.length) return a.translate();
      var n = a.scale(),
          o = +t[0],
          s = +t[1];
      return e = a.translate(t).clipExtent([[o - .455 * n, s - .238 * n], [o + .455 * n, s + .238 * n]]).stream(f), r = u.translate([o - .307 * n, s + .201 * n]).clipExtent([[o - .425 * n + qc, s + .12 * n + qc], [o - .214 * n - qc, s + .234 * n - qc]]).stream(f), i = c.translate([o - .205 * n, s + .212 * n]).clipExtent([[o - .214 * n + qc, s + .166 * n + qc], [o - .115 * n - qc, s + .234 * n - qc]]).stream(f), l();
    }, s.fitExtent = function (t, n) {
      return Ah(s, t, n);
    }, s.fitSize = function (t, n) {
      return Th(s, t, n);
    }, s.fitWidth = function (t, n) {
      return Sh(s, t, n);
    }, s.fitHeight = function (t, n) {
      return Eh(s, t, n);
    }, s.scale(1070);
  }, t.geoArea = function (t) {
    return Nf = new y(), lf(t, Cf), 2 * Nf;
  }, t.geoAzimuthalEqualArea = function () {
    return zh(Bh).scale(124.75).clipAngle(179.999);
  }, t.geoAzimuthalEqualAreaRaw = Bh, t.geoAzimuthalEquidistant = function () {
    return zh(Yh).scale(79.4188).clipAngle(179.999);
  }, t.geoAzimuthalEquidistantRaw = Yh, t.geoBounds = function (t) {
    var n, e, r, i, o, a, u;

    if (mf = bf = -(vf = _f = 1 / 0), Sf = [], lf(t, is), e = Sf.length) {
      for (Sf.sort(ds), n = 1, o = [r = Sf[0]]; n < e; ++n) {
        ps(r, (i = Sf[n])[0]) || ps(r, i[1]) ? (hs(r[0], i[1]) > hs(r[0], r[1]) && (r[1] = i[1]), hs(i[0], r[1]) > hs(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
      }

      for (a = -1 / 0, n = 0, r = o[e = o.length - 1]; n <= e; r = i, ++n) {
        i = o[n], (u = hs(r[1], i[0])) > a && (a = u, vf = i[0], bf = r[1]);
      }
    }

    return Sf = Ef = null, vf === 1 / 0 || _f === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[vf, _f], [bf, mf]];
  }, t.geoCentroid = function (t) {
    Lf = jf = Hf = Xf = Gf = Vf = $f = Wf = 0, Zf = new y(), Kf = new y(), Qf = new y(), lf(t, gs);
    var n = +Zf,
        e = +Kf,
        r = +Qf,
        i = $c(n, e, r);
    return i < Rc && (n = Vf, e = $f, r = Wf, jf < qc && (n = Hf, e = Xf, r = Gf), (i = $c(n, e, r)) < Rc) ? [NaN, NaN] : [Hc(e, n) * Bc, ef(r / i) * Bc];
  }, t.geoCircle = function () {
    var t,
        n,
        e = Ss([0, 0]),
        r = Ss(90),
        i = Ss(6),
        o = {
      point: function point(e, r) {
        t.push(e = n(e, r)), e[0] *= Bc, e[1] *= Bc;
      }
    };

    function a() {
      var a = e.apply(this, arguments),
          u = r.apply(this, arguments) * Yc,
          c = i.apply(this, arguments) * Yc;
      return t = [], n = Ns(-a[0] * Yc, -a[1] * Yc, 0).invert, qs(o, u, c, 1), a = {
        type: "Polygon",
        coordinates: [t]
      }, t = n = null, a;
    }

    return a.center = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Ss([+t[0], +t[1]]), a) : e;
    }, a.radius = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Ss(+t), a) : r;
    }, a.precision = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Ss(+t), a) : i;
    }, a;
  }, t.geoClipAntimeridian = Gs, t.geoClipCircle = Vs, t.geoClipExtent = function () {
    var t,
        n,
        e,
        r = 0,
        i = 0,
        o = 960,
        a = 500;
    return e = {
      stream: function stream(e) {
        return t && n === e ? t : t = tl(r, i, o, a)(n = e);
      },
      extent: function extent(u) {
        return arguments.length ? (r = +u[0][0], i = +u[0][1], o = +u[1][0], a = +u[1][1], t = n = null, e) : [[r, i], [o, a]];
      }
    };
  }, t.geoClipRectangle = tl, t.geoConicConformal = function () {
    return qh(Xh).scale(109.5).parallels([30, 30]);
  }, t.geoConicConformalRaw = Xh, t.geoConicEqualArea = Fh, t.geoConicEqualAreaRaw = Rh, t.geoConicEquidistant = function () {
    return qh(Vh).scale(131.154).center([0, 13.9389]);
  }, t.geoConicEquidistantRaw = Vh, t.geoContains = function (t, n) {
    return (t && fl.hasOwnProperty(t.type) ? fl[t.type] : ll)(t, n);
  }, t.geoDistance = cl, t.geoEqualEarth = function () {
    return zh(Jh).scale(177.158);
  }, t.geoEqualEarthRaw = Jh, t.geoEquirectangular = function () {
    return zh(Gh).scale(152.63);
  }, t.geoEquirectangularRaw = Gh, t.geoGnomonic = function () {
    return zh(td).scale(144.049).clipAngle(60);
  }, t.geoGnomonicRaw = td, t.geoGraticule = bl, t.geoGraticule10 = function () {
    return bl()();
  }, t.geoIdentity = function () {
    var t,
        n,
        e,
        r,
        i,
        o,
        a,
        u = 1,
        c = 0,
        f = 0,
        s = 1,
        l = 1,
        h = 0,
        d = null,
        p = 1,
        g = 1,
        y = xh({
      point: function point(t, n) {
        var e = b([t, n]);
        this.stream.point(e[0], e[1]);
      }
    }),
        v = Al;

    function _() {
      return p = u * s, g = u * l, o = a = null, b;
    }

    function b(e) {
      var r = e[0] * p,
          i = e[1] * g;

      if (h) {
        var o = i * t - r * n;
        r = r * t + i * n, i = o;
      }

      return [r + c, i + f];
    }

    return b.invert = function (e) {
      var r = e[0] - c,
          i = e[1] - f;

      if (h) {
        var o = i * t + r * n;
        r = r * t - i * n, i = o;
      }

      return [r / p, i / g];
    }, b.stream = function (t) {
      return o && a === t ? o : o = y(v(a = t));
    }, b.postclip = function (t) {
      return arguments.length ? (v = t, d = e = r = i = null, _()) : v;
    }, b.clipExtent = function (t) {
      return arguments.length ? (v = null == t ? (d = e = r = i = null, Al) : tl(d = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]), _()) : null == d ? null : [[d, e], [r, i]];
    }, b.scale = function (t) {
      return arguments.length ? (u = +t, _()) : u;
    }, b.translate = function (t) {
      return arguments.length ? (c = +t[0], f = +t[1], _()) : [c, f];
    }, b.angle = function (e) {
      return arguments.length ? (n = Kc(h = e % 360 * Yc), t = Xc(h), _()) : h * Bc;
    }, b.reflectX = function (t) {
      return arguments.length ? (s = t ? -1 : 1, _()) : s < 0;
    }, b.reflectY = function (t) {
      return arguments.length ? (l = t ? -1 : 1, _()) : l < 0;
    }, b.fitExtent = function (t, n) {
      return Ah(b, t, n);
    }, b.fitSize = function (t, n) {
      return Th(b, t, n);
    }, b.fitWidth = function (t, n) {
      return Sh(b, t, n);
    }, b.fitHeight = function (t, n) {
      return Eh(b, t, n);
    }, b;
  }, t.geoInterpolate = function (t, n) {
    var e = t[0] * Yc,
        r = t[1] * Yc,
        i = n[0] * Yc,
        o = n[1] * Yc,
        a = Xc(r),
        u = Kc(r),
        c = Xc(o),
        f = Kc(o),
        s = a * Xc(e),
        l = a * Kc(e),
        h = c * Xc(i),
        d = c * Kc(i),
        p = 2 * ef(Jc(rf(o - r) + a * c * rf(i - e))),
        g = Kc(p),
        y = p ? function (t) {
      var n = Kc(t *= p) / g,
          e = Kc(p - t) / g,
          r = e * s + n * h,
          i = e * l + n * d,
          o = e * u + n * f;
      return [Hc(i, r) * Bc, Hc(o, Jc(r * r + i * i)) * Bc];
    } : function () {
      return [e * Bc, r * Bc];
    };
    return y.distance = p, y;
  }, t.geoLength = ol, t.geoMercator = function () {
    return jh(Lh).scale(961 / Uc);
  }, t.geoMercatorRaw = Lh, t.geoNaturalEarth1 = function () {
    return zh(nd).scale(175.295);
  }, t.geoNaturalEarth1Raw = nd, t.geoOrthographic = function () {
    return zh(ed).scale(249.5).clipAngle(90.000001);
  }, t.geoOrthographicRaw = ed, t.geoPath = function (t, n) {
    var e,
        r,
        i = 4.5;

    function o(t) {
      return t && ("function" == typeof i && r.pointRadius(+i.apply(this, arguments)), lf(t, e(r))), r.result();
    }

    return o.area = function (t) {
      return lf(t, e(zl)), zl.result();
    }, o.measure = function (t) {
      return lf(t, e(_h)), _h.result();
    }, o.bounds = function (t) {
      return lf(t, e(Yl)), Yl.result();
    }, o.centroid = function (t) {
      return lf(t, e(uh)), uh.result();
    }, o.projection = function (n) {
      return arguments.length ? (e = null == n ? (t = null, Al) : (t = n).stream, o) : t;
    }, o.context = function (t) {
      return arguments.length ? (r = null == t ? (n = null, new bh()) : new ch(n = t), "function" != typeof i && r.pointRadius(i), o) : n;
    }, o.pointRadius = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : (r.pointRadius(+t), +t), o) : i;
    }, o.projection(t).context(n);
  }, t.geoProjection = zh, t.geoProjectionMutator = Dh, t.geoRotation = Ds, t.geoStereographic = function () {
    return zh(rd).scale(250).clipAngle(142);
  }, t.geoStereographicRaw = rd, t.geoStream = lf, t.geoTransform = function (t) {
    return {
      stream: xh(t)
    };
  }, t.geoTransverseMercator = function () {
    var t = jh(id),
        n = t.center,
        e = t.rotate;
    return t.center = function (t) {
      return arguments.length ? n([-t[1], t[0]]) : [(t = n())[1], -t[0]];
    }, t.rotate = function (t) {
      return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = e())[0], t[1], t[2] - 90];
    }, e([0, 0, 90]).scale(159.155);
  }, t.geoTransverseMercatorRaw = id, t.gray = function (t, n) {
    return new He(t, 0, 0, null == n ? 1 : n);
  }, t.greatest = function (t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n;
    var r,
        i = !1;

    if (1 === e.length) {
      var _o22;

      var _iterator43 = _createForOfIteratorHelper(t),
          _step43;

      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var _a20 = _step43.value;

          var _t31 = e(_a20);

          (i ? n(_t31, _o22) > 0 : 0 === n(_t31, _t31)) && (r = _a20, _o22 = _t31, i = !0);
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }
    } else {
      var _iterator44 = _createForOfIteratorHelper(t),
          _step44;

      try {
        for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
          var _n64 = _step44.value;
          (i ? e(_n64, r) > 0 : 0 === e(_n64, _n64)) && (r = _n64, i = !0);
        }
      } catch (err) {
        _iterator44.e(err);
      } finally {
        _iterator44.f();
      }
    }

    return r;
  }, t.greatestIndex = function (t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n;
    if (1 === e.length) return Q(t, e);
    var r,
        i = -1,
        o = -1;

    var _iterator45 = _createForOfIteratorHelper(t),
        _step45;

    try {
      for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
        var _n65 = _step45.value;
        ++o, (i < 0 ? 0 === e(_n65, _n65) : e(_n65, r) > 0) && (r = _n65, i = o);
      }
    } catch (err) {
      _iterator45.e(err);
    } finally {
      _iterator45.f();
    }

    return i;
  }, t.group = A, t.groupSort = function (t, e, r) {
    return (1 === e.length ? z(E(t, e, r), function (_ref14, _ref15) {
      var _ref16 = _slicedToArray(_ref14, 2),
          t = _ref16[0],
          e = _ref16[1];

      var _ref17 = _slicedToArray(_ref15, 2),
          r = _ref17[0],
          i = _ref17[1];

      return n(e, i) || n(t, r);
    }) : z(A(t, r), function (_ref18, _ref19) {
      var _ref20 = _slicedToArray(_ref18, 2),
          t = _ref20[0],
          r = _ref20[1];

      var _ref21 = _slicedToArray(_ref19, 2),
          i = _ref21[0],
          o = _ref21[1];

      return e(r, o) || n(t, i);
    })).map(function (_ref22) {
      var _ref23 = _slicedToArray(_ref22, 1),
          t = _ref23[0];

      return t;
    });
  }, t.groups = T, t.hcl = Ze, t.hierarchy = fd, t.histogram = X, t.hsl = ze, t.html = Ku, t.image = function (t, n) {
    return new Promise(function (e, r) {
      var i = new Image();

      for (var o in n) {
        i[o] = n[o];
      }

      i.onerror = r, i.onload = function () {
        e(i);
      }, i.src = t;
    });
  }, t.index = function (t) {
    for (var _len10 = arguments.length, n = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      n[_key10 - 1] = arguments[_key10];
    }

    return C(t, M, N, n);
  }, t.indexes = function (t) {
    for (var _len11 = arguments.length, n = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
      n[_key11 - 1] = arguments[_key11];
    }

    return C(t, Array.from, N, n);
  }, t.interpolate = Pr, t.interpolateArray = function (t, n) {
    return (Mr(n) ? wr : Ar)(t, n);
  }, t.interpolateBasis = lr, t.interpolateBasisClosed = hr, t.interpolateBlues = sb, t.interpolateBrBG = w_, t.interpolateBuGn = B_, t.interpolateBuPu = L_, t.interpolateCividis = function (t) {
    return t = Math.max(0, Math.min(1, t)), "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - 2710.57 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - 67.37 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - 2475.67 * t))))))) + ")";
  }, t.interpolateCool = Mb, t.interpolateCubehelix = Wr, t.interpolateCubehelixDefault = xb, t.interpolateCubehelixLong = Zr, t.interpolateDate = Tr, t.interpolateDiscrete = function (t) {
    var n = t.length;
    return function (e) {
      return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
    };
  }, t.interpolateGnBu = H_, t.interpolateGreens = hb, t.interpolateGreys = pb, t.interpolateHcl = Gr, t.interpolateHclLong = Vr, t.interpolateHsl = jr, t.interpolateHslLong = Hr, t.interpolateHue = function (t, n) {
    var e = gr(+t, +n);
    return function (t) {
      var n = e(t);
      return n - 360 * Math.floor(n / 360);
    };
  }, t.interpolateInferno = Pb, t.interpolateLab = function (t, n) {
    var e = vr((t = je(t)).l, (n = je(n)).l),
        r = vr(t.a, n.a),
        i = vr(t.b, n.b),
        o = vr(t.opacity, n.opacity);
    return function (n) {
      return t.l = e(n), t.a = r(n), t.b = i(n), t.opacity = o(n), t + "";
    };
  }, t.interpolateMagma = Cb, t.interpolateNumber = Sr, t.interpolateNumberArray = wr, t.interpolateObject = Er, t.interpolateOrRd = G_, t.interpolateOranges = mb, t.interpolatePRGn = A_, t.interpolatePiYG = S_, t.interpolatePlasma = zb, t.interpolatePuBu = Z_, t.interpolatePuBuGn = $_, t.interpolatePuOr = k_, t.interpolatePuRd = Q_, t.interpolatePurples = yb, t.interpolateRainbow = function (t) {
    (t < 0 || t > 1) && (t -= Math.floor(t));
    var n = Math.abs(t - .5);
    return Ab.h = 360 * t - 100, Ab.s = 1.5 - 1.5 * n, Ab.l = .8 - .9 * n, Ab + "";
  }, t.interpolateRdBu = C_, t.interpolateRdGy = z_, t.interpolateRdPu = tb, t.interpolateRdYlBu = q_, t.interpolateRdYlGn = F_, t.interpolateReds = _b, t.interpolateRgb = _r, t.interpolateRgbBasis = mr, t.interpolateRgbBasisClosed = xr, t.interpolateRound = zr, t.interpolateSinebow = function (t) {
    var n;
    return t = (.5 - t) * Math.PI, Tb.r = 255 * (n = Math.sin(t)) * n, Tb.g = 255 * (n = Math.sin(t + Sb)) * n, Tb.b = 255 * (n = Math.sin(t + Eb)) * n, Tb + "";
  }, t.interpolateSpectral = I_, t.interpolateString = Cr, t.interpolateTransformCss = Ir, t.interpolateTransformSvg = Ur, t.interpolateTurbo = function (t) {
    return t = Math.max(0, Math.min(1, t)), "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - 14825.05 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + 707.56 * t))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - 6838.66 * t))))))) + ")";
  }, t.interpolateViridis = Nb, t.interpolateWarm = wb, t.interpolateYlGn = ib, t.interpolateYlGnBu = eb, t.interpolateYlOrBr = ab, t.interpolateYlOrRd = cb, t.interpolateZoom = Yr, t.interrupt = Mi, t.intersection = function (t) {
    for (var _len12 = arguments.length, n = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      n[_key12 - 1] = arguments[_key12];
    }

    t = new Set(t), n = n.map(ct);

    var _iterator46 = _createForOfIteratorHelper(t),
        _step46;

    try {
      t: for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
        var _e35 = _step46.value;

        var _iterator47 = _createForOfIteratorHelper(n),
            _step47;

        try {
          for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
            var _r38 = _step47.value;

            if (!_r38.has(_e35)) {
              t["delete"](_e35);
              continue t;
            }
          }
        } catch (err) {
          _iterator47.e(err);
        } finally {
          _iterator47.f();
        }
      }
    } catch (err) {
      _iterator46.e(err);
    } finally {
      _iterator46.f();
    }

    return t;
  }, t.interval = function (t, n, e) {
    var r = new si(),
        i = n;
    return null == n ? (r.restart(t, n, e), r) : (r._restart = r.restart, r.restart = function (t, n, e) {
      n = +n, e = null == e ? ci() : +e, r._restart(function o(a) {
        a += i, r._restart(o, i += n, e), t(a);
      }, n, e);
    }, r.restart(t, n, e), r);
  }, t.isoFormat = Jv, t.isoParse = t_, t.json = function (t, n) {
    return fetch(t, n).then($u);
  }, t.lab = je, t.lch = function (t, n, e, r) {
    return 1 === arguments.length ? We(t) : new Ke(e, n, t, null == r ? 1 : r);
  }, t.least = function (t) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n;
    var r,
        i = !1;

    if (1 === e.length) {
      var _o23;

      var _iterator48 = _createForOfIteratorHelper(t),
          _step48;

      try {
        for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
          var _a21 = _step48.value;

          var _t32 = e(_a21);

          (i ? n(_t32, _o23) < 0 : 0 === n(_t32, _t32)) && (r = _a21, _o23 = _t32, i = !0);
        }
      } catch (err) {
        _iterator48.e(err);
      } finally {
        _iterator48.f();
      }
    } else {
      var _iterator49 = _createForOfIteratorHelper(t),
          _step49;

      try {
        for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
          var _n66 = _step49.value;
          (i ? e(_n66, r) < 0 : 0 === e(_n66, _n66)) && (r = _n66, i = !0);
        }
      } catch (err) {
        _iterator49.e(err);
      } finally {
        _iterator49.f();
      }
    }

    return r;
  }, t.leastIndex = rt, t.line = am, t.lineRadial = pm, t.linkHorizontal = function () {
    return bm(mm);
  }, t.linkRadial = function () {
    var t = bm(wm);
    return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t;
  }, t.linkVertical = function () {
    return bm(xm);
  }, t.local = Yn, t.map = function (t, n) {
    if ("function" != typeof t[Symbol.iterator]) throw new TypeError("values is not iterable");
    if ("function" != typeof n) throw new TypeError("mapper is not a function");
    return Array.from(t, function (e, r) {
      return n(e, r, t);
    });
  }, t.matcher = Rt, t.max = G, t.maxIndex = Q, t.mean = function (t, n) {
    var e = 0,
        r = 0;

    if (void 0 === n) {
      var _iterator50 = _createForOfIteratorHelper(t),
          _step50;

      try {
        for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
          var _n67 = _step50.value;
          null != _n67 && (_n67 = +_n67) >= _n67 && (++e, r += _n67);
        }
      } catch (err) {
        _iterator50.e(err);
      } finally {
        _iterator50.f();
      }
    } else {
      var _i29 = -1;

      var _iterator51 = _createForOfIteratorHelper(t),
          _step51;

      try {
        for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
          var _o24 = _step51.value;
          null != (_o24 = n(_o24, ++_i29, t)) && (_o24 = +_o24) >= _o24 && (++e, r += _o24);
        }
      } catch (err) {
        _iterator51.e(err);
      } finally {
        _iterator51.f();
      }
    }

    if (e) return r / e;
  }, t.median = function (t, n) {
    return Z(t, .5, n);
  }, t.merge = J, t.min = V, t.minIndex = tt, t.mode = function (t, n) {
    var e = new v();

    if (void 0 === n) {
      var _iterator52 = _createForOfIteratorHelper(t),
          _step52;

      try {
        for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
          var _n68 = _step52.value;
          null != _n68 && _n68 >= _n68 && e.set(_n68, (e.get(_n68) || 0) + 1);
        }
      } catch (err) {
        _iterator52.e(err);
      } finally {
        _iterator52.f();
      }
    } else {
      var _r39 = -1;

      var _iterator53 = _createForOfIteratorHelper(t),
          _step53;

      try {
        for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
          var _i30 = _step53.value;
          null != (_i30 = n(_i30, ++_r39, t)) && _i30 >= _i30 && e.set(_i30, (e.get(_i30) || 0) + 1);
        }
      } catch (err) {
        _iterator53.e(err);
      } finally {
        _iterator53.f();
      }
    }

    var r,
        i = 0;

    var _iterator54 = _createForOfIteratorHelper(e),
        _step54;

    try {
      for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
        var _step54$value = _slicedToArray(_step54.value, 2),
            _t33 = _step54$value[0],
            _n69 = _step54$value[1];

        _n69 > i && (i = _n69, r = _t33);
      }
    } catch (err) {
      _iterator54.e(err);
    } finally {
      _iterator54.f();
    }

    return r;
  }, t.namespace = St, t.namespaces = Tt, t.nice = j, t.now = ci, t.pack = function () {
    var t = null,
        n = 1,
        e = 1,
        r = Cd;

    function i(i) {
      return i.x = n / 2, i.y = e / 2, t ? i.eachBefore(Dd(t)).eachAfter(qd(r, .5)).eachBefore(Rd(1)) : i.eachBefore(Dd(zd)).eachAfter(qd(Cd, 1)).eachAfter(qd(r, i.r / Math.min(n, e))).eachBefore(Rd(Math.min(n, e) / (2 * i.r))), i;
    }

    return i.radius = function (n) {
      return arguments.length ? (t = kd(n), i) : t;
    }, i.size = function (t) {
      return arguments.length ? (n = +t[0], e = +t[1], i) : [n, e];
    }, i.padding = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Pd(+t), i) : r;
    }, i;
  }, t.packEnclose = gd, t.packSiblings = function (t) {
    return Ed(t), t;
  }, t.pairs = function (t) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nt;
    var e = [];
    var r,
        i = !1;

    var _iterator55 = _createForOfIteratorHelper(t),
        _step55;

    try {
      for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
        var _o25 = _step55.value;
        i && e.push(n(r, _o25)), r = _o25, i = !0;
      }
    } catch (err) {
      _iterator55.e(err);
    } finally {
      _iterator55.f();
    }

    return e;
  }, t.partition = function () {
    var t = 1,
        n = 1,
        e = 0,
        r = !1;

    function i(i) {
      var o = i.height + 1;
      return i.x0 = i.y0 = e, i.x1 = t, i.y1 = n / o, i.eachBefore(function (t, n) {
        return function (r) {
          r.children && Od(r, r.x0, t * (r.depth + 1) / n, r.x1, t * (r.depth + 2) / n);
          var i = r.x0,
              o = r.y0,
              a = r.x1 - e,
              u = r.y1 - e;
          a < i && (i = a = (i + a) / 2), u < o && (o = u = (o + u) / 2), r.x0 = i, r.y0 = o, r.x1 = a, r.y1 = u;
        };
      }(n, o)), r && i.eachBefore(Fd), i;
    }

    return i.round = function (t) {
      return arguments.length ? (r = !!t, i) : r;
    }, i.size = function (e) {
      return arguments.length ? (t = +e[0], n = +e[1], i) : [t, n];
    }, i.padding = function (t) {
      return arguments.length ? (e = +t, i) : e;
    }, i;
  }, t.path = va, t.permute = P, t.pie = function () {
    var t = fm,
        n = cm,
        e = null,
        r = Db(0),
        i = Db(Hb),
        o = Db(0);

    function a(a) {
      var u,
          c,
          f,
          s,
          l,
          h = (a = nm(a)).length,
          d = 0,
          p = new Array(h),
          g = new Array(h),
          y = +r.apply(this, arguments),
          v = Math.min(Hb, Math.max(-Hb, i.apply(this, arguments) - y)),
          _ = Math.min(Math.abs(v) / h, o.apply(this, arguments)),
          b = _ * (v < 0 ? -1 : 1);

      for (u = 0; u < h; ++u) {
        (l = g[p[u] = u] = +t(a[u], u, a)) > 0 && (d += l);
      }

      for (null != n ? p.sort(function (t, e) {
        return n(g[t], g[e]);
      }) : null != e && p.sort(function (t, n) {
        return e(a[t], a[n]);
      }), u = 0, f = d ? (v - h * b) / d : 0; u < h; ++u, y = s) {
        c = p[u], s = y + ((l = g[c]) > 0 ? l * f : 0) + b, g[c] = {
          data: a[c],
          index: u,
          value: l,
          startAngle: y,
          endAngle: s,
          padAngle: _
        };
      }

      return g;
    }

    return a.value = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(+n), a) : t;
    }, a.sortValues = function (t) {
      return arguments.length ? (n = t, e = null, a) : n;
    }, a.sort = function (t) {
      return arguments.length ? (e = t, n = null, a) : e;
    }, a.startAngle = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Db(+t), a) : r;
    }, a.endAngle = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : Db(+t), a) : i;
    }, a.padAngle = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : Db(+t), a) : o;
    }, a;
  }, t.piecewise = Kr, t.pointRadial = ym, t.pointer = Hn, t.pointers = function (t, n) {
    return t.target && (t = jn(t), void 0 === n && (n = t.currentTarget), t = t.touches || [t]), Array.from(t, function (t) {
      return Hn(t, n);
    });
  }, t.polygonArea = function (t) {
    for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r;) {
      n = i, i = t[e], o += n[1] * i[0] - n[0] * i[1];
    }

    return o / 2;
  }, t.polygonCentroid = function (t) {
    for (var n, e, r = -1, i = t.length, o = 0, a = 0, u = t[i - 1], c = 0; ++r < i;) {
      n = u, u = t[r], c += e = n[0] * u[1] - u[0] * n[1], o += (n[0] + u[0]) * e, a += (n[1] + u[1]) * e;
    }

    return [o / (c *= 3), a / c];
  }, t.polygonContains = function (t, n) {
    for (var e, r, i = t.length, o = t[i - 1], a = n[0], u = n[1], c = o[0], f = o[1], s = !1, l = 0; l < i; ++l) {
      e = (o = t[l])[0], (r = o[1]) > u != f > u && a < (c - e) * (u - r) / (f - r) + e && (s = !s), c = e, f = r;
    }

    return s;
  }, t.polygonHull = function (t) {
    if ((e = t.length) < 3) return null;
    var n,
        e,
        r = new Array(e),
        i = new Array(e);

    for (n = 0; n < e; ++n) {
      r[n] = [+t[n][0], +t[n][1], n];
    }

    for (r.sort(tp), n = 0; n < e; ++n) {
      i[n] = [r[n][0], -r[n][1]];
    }

    var o = np(r),
        a = np(i),
        u = a[0] === o[0],
        c = a[a.length - 1] === o[o.length - 1],
        f = [];

    for (n = o.length - 1; n >= 0; --n) {
      f.push(t[r[o[n]][2]]);
    }

    for (n = +u; n < a.length - c; ++n) {
      f.push(t[r[a[n]][2]]);
    }

    return f;
  }, t.polygonLength = function (t) {
    for (var n, e, r = -1, i = t.length, o = t[i - 1], a = o[0], u = o[1], c = 0; ++r < i;) {
      n = a, e = u, n -= a = (o = t[r])[0], e -= u = o[1], c += Math.hypot(n, e);
    }

    return c;
  }, t.precisionFixed = Pc, t.precisionPrefix = zc, t.precisionRound = Dc, t.quadtree = rc, t.quantile = Z, t.quantileSorted = K, t.quantize = function (t, n) {
    for (var e = new Array(n), r = 0; r < n; ++r) {
      e[r] = t(r / (n - 1));
    }

    return e;
  }, t.quickselect = $, t.radialArea = gm, t.radialLine = pm, t.randomBates = cp, t.randomBernoulli = lp, t.randomBeta = pp, t.randomBinomial = gp, t.randomCauchy = vp, t.randomExponential = fp, t.randomGamma = dp, t.randomGeometric = hp, t.randomInt = ip, t.randomIrwinHall = up, t.randomLcg = function () {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random();
    var n = 0 | (0 <= t && t < 1 ? t / mp : Math.abs(t));
    return function () {
      return n = 1664525 * n + 1013904223 | 0, mp * (n >>> 0);
    };
  }, t.randomLogNormal = ap, t.randomLogistic = _p, t.randomNormal = op, t.randomPareto = sp, t.randomPoisson = bp, t.randomUniform = rp, t.randomWeibull = yp, t.range = et, t.reduce = function (t, n, e) {
    if ("function" != typeof n) throw new TypeError("reducer is not a function");
    var r = t[Symbol.iterator]();
    var i,
        o,
        a = -1;

    if (arguments.length < 3) {
      var _r$next;

      if ((_r$next = r.next(), i = _r$next.done, e = _r$next.value, _r$next), i) return;
      ++a;
    }

    for (; (_r$next2 = r.next(), i = _r$next2.done, o = _r$next2.value, _r$next2), !i;) {
      var _r$next2;

      e = n(e, o, ++a, t);
    }

    return e;
  }, t.reverse = function (t) {
    if ("function" != typeof t[Symbol.iterator]) throw new TypeError("values is not iterable");
    return Array.from(t).reverse();
  }, t.rgb = Te, t.ribbon = function () {
    return Ea();
  }, t.ribbonArrow = function () {
    return Ea(Sa);
  }, t.rollup = E, t.rollups = k, t.scaleBand = Tp, t.scaleDiverging = function t() {
    var n = Op(u_()(Np));
    return n.copy = function () {
      return o_(n, t());
    }, wp.apply(n, arguments);
  }, t.scaleDivergingLog = function t() {
    var n = Xp(u_()).domain([.1, 1, 10]);
    return n.copy = function () {
      return o_(n, t()).base(n.base());
    }, wp.apply(n, arguments);
  }, t.scaleDivergingPow = c_, t.scaleDivergingSqrt = function () {
    return c_.apply(null, arguments).exponent(.5);
  }, t.scaleDivergingSymlog = function t() {
    var n = $p(u_());
    return n.copy = function () {
      return o_(n, t()).constant(n.constant());
    }, wp.apply(n, arguments);
  }, t.scaleIdentity = function t(n) {
    var e;

    function r(t) {
      return null == t || isNaN(t = +t) ? e : t;
    }

    return r.invert = r, r.domain = r.range = function (t) {
      return arguments.length ? (n = Array.from(t, Ep), r) : n.slice();
    }, r.unknown = function (t) {
      return arguments.length ? (e = t, r) : e;
    }, r.copy = function () {
      return t(n).unknown(e);
    }, n = arguments.length ? Array.from(n, Ep) : [0, 1], Op(r);
  }, t.scaleImplicit = Mp, t.scaleLinear = function t() {
    var n = Rp();
    return n.copy = function () {
      return Dp(n, t());
    }, xp.apply(n, arguments), Op(n);
  }, t.scaleLog = function t() {
    var n = Xp(qp()).domain([1, 10]);
    return n.copy = function () {
      return Dp(n, t()).base(n.base());
    }, xp.apply(n, arguments), n;
  }, t.scaleOrdinal = Ap, t.scalePoint = function () {
    return Sp(Tp.apply(null, arguments).paddingInner(1));
  }, t.scalePow = Jp, t.scaleQuantile = function t() {
    var e,
        r = [],
        i = [],
        o = [];

    function a() {
      var t = 0,
          n = Math.max(1, i.length);

      for (o = new Array(n - 1); ++t < n;) {
        o[t - 1] = K(r, t / n);
      }

      return u;
    }

    function u(t) {
      return null == t || isNaN(t = +t) ? e : i[c(o, t)];
    }

    return u.invertExtent = function (t) {
      var n = i.indexOf(t);
      return n < 0 ? [NaN, NaN] : [n > 0 ? o[n - 1] : r[0], n < o.length ? o[n] : r[r.length - 1]];
    }, u.domain = function (t) {
      if (!arguments.length) return r.slice();
      r = [];

      var _iterator56 = _createForOfIteratorHelper(t),
          _step56;

      try {
        for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
          var _n70 = _step56.value;
          null == _n70 || isNaN(_n70 = +_n70) || r.push(_n70);
        }
      } catch (err) {
        _iterator56.e(err);
      } finally {
        _iterator56.f();
      }

      return r.sort(n), a();
    }, u.range = function (t) {
      return arguments.length ? (i = Array.from(t), a()) : i.slice();
    }, u.unknown = function (t) {
      return arguments.length ? (e = t, u) : e;
    }, u.quantiles = function () {
      return o.slice();
    }, u.copy = function () {
      return t().domain(r).range(i).unknown(e);
    }, xp.apply(u, arguments);
  }, t.scaleQuantize = function t() {
    var n,
        e = 0,
        r = 1,
        i = 1,
        o = [.5],
        a = [0, 1];

    function u(t) {
      return null != t && t <= t ? a[c(o, t, 0, i)] : n;
    }

    function f() {
      var t = -1;

      for (o = new Array(i); ++t < i;) {
        o[t] = ((t + 1) * r - (t - i) * e) / (i + 1);
      }

      return u;
    }

    return u.domain = function (t) {
      var _t34, _t35;

      return arguments.length ? ((_t34 = t, _t35 = _slicedToArray(_t34, 2), e = _t35[0], r = _t35[1], _t34), e = +e, r = +r, f()) : [e, r];
    }, u.range = function (t) {
      return arguments.length ? (i = (a = Array.from(t)).length - 1, f()) : a.slice();
    }, u.invertExtent = function (t) {
      var n = a.indexOf(t);
      return n < 0 ? [NaN, NaN] : n < 1 ? [e, o[0]] : n >= i ? [o[i - 1], r] : [o[n - 1], o[n]];
    }, u.unknown = function (t) {
      return arguments.length ? (n = t, u) : u;
    }, u.thresholds = function () {
      return o.slice();
    }, u.copy = function () {
      return t().domain([e, r]).range(a).unknown(n);
    }, xp.apply(Op(u), arguments);
  }, t.scaleRadial = function t() {
    var n,
        e = Rp(),
        r = [0, 1],
        i = !1;

    function o(t) {
      var r = ng(e(t));
      return isNaN(r) ? n : i ? Math.round(r) : r;
    }

    return o.invert = function (t) {
      return e.invert(tg(t));
    }, o.domain = function (t) {
      return arguments.length ? (e.domain(t), o) : e.domain();
    }, o.range = function (t) {
      return arguments.length ? (e.range((r = Array.from(t, Ep)).map(tg)), o) : r.slice();
    }, o.rangeRound = function (t) {
      return o.range(t).round(!0);
    }, o.round = function (t) {
      return arguments.length ? (i = !!t, o) : i;
    }, o.clamp = function (t) {
      return arguments.length ? (e.clamp(t), o) : e.clamp();
    }, o.unknown = function (t) {
      return arguments.length ? (n = t, o) : n;
    }, o.copy = function () {
      return t(e.domain(), r).round(i).clamp(e.clamp()).unknown(n);
    }, xp.apply(o, arguments), Op(o);
  }, t.scaleSequential = function t() {
    var n = Op(i_()(Np));
    return n.copy = function () {
      return o_(n, t());
    }, wp.apply(n, arguments);
  }, t.scaleSequentialLog = function t() {
    var n = Xp(i_()).domain([1, 10]);
    return n.copy = function () {
      return o_(n, t()).base(n.base());
    }, wp.apply(n, arguments);
  }, t.scaleSequentialPow = a_, t.scaleSequentialQuantile = function t() {
    var e = [],
        r = Np;

    function i(t) {
      if (null != t && !isNaN(t = +t)) return r((c(e, t, 1) - 1) / (e.length - 1));
    }

    return i.domain = function (t) {
      if (!arguments.length) return e.slice();
      e = [];

      var _iterator57 = _createForOfIteratorHelper(t),
          _step57;

      try {
        for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
          var _n71 = _step57.value;
          null == _n71 || isNaN(_n71 = +_n71) || e.push(_n71);
        }
      } catch (err) {
        _iterator57.e(err);
      } finally {
        _iterator57.f();
      }

      return e.sort(n), i;
    }, i.interpolator = function (t) {
      return arguments.length ? (r = t, i) : r;
    }, i.range = function () {
      return e.map(function (t, n) {
        return r(n / (e.length - 1));
      });
    }, i.quantiles = function (t) {
      return Array.from({
        length: t + 1
      }, function (n, r) {
        return Z(e, r / t);
      });
    }, i.copy = function () {
      return t(r).domain(e);
    }, wp.apply(i, arguments);
  }, t.scaleSequentialSqrt = function () {
    return a_.apply(null, arguments).exponent(.5);
  }, t.scaleSequentialSymlog = function t() {
    var n = $p(i_());
    return n.copy = function () {
      return o_(n, t()).constant(n.constant());
    }, wp.apply(n, arguments);
  }, t.scaleSqrt = function () {
    return Jp.apply(null, arguments).exponent(.5);
  }, t.scaleSymlog = function t() {
    var n = $p(qp());
    return n.copy = function () {
      return Dp(n, t()).constant(n.constant());
    }, xp.apply(n, arguments);
  }, t.scaleThreshold = function t() {
    var n,
        e = [.5],
        r = [0, 1],
        i = 1;

    function o(t) {
      return null != t && t <= t ? r[c(e, t, 0, i)] : n;
    }

    return o.domain = function (t) {
      return arguments.length ? (e = Array.from(t), i = Math.min(e.length, r.length - 1), o) : e.slice();
    }, o.range = function (t) {
      return arguments.length ? (r = Array.from(t), i = Math.min(e.length, r.length - 1), o) : r.slice();
    }, o.invertExtent = function (t) {
      var n = r.indexOf(t);
      return [e[n - 1], e[n]];
    }, o.unknown = function (t) {
      return arguments.length ? (n = t, o) : n;
    }, o.copy = function () {
      return t().domain(e).range(r).unknown(n);
    }, xp.apply(o, arguments);
  }, t.scaleTime = function () {
    return xp.apply(r_(Ey, ky, Gg, jg, kg, Tg, wg, bg, yg, t.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
  }, t.scaleUtc = function () {
    return xp.apply(r_(Ty, Sy, wy, by, iy, ny, Qg, Wg, yg, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
  }, t.scan = function (t, n) {
    var e = rt(t, n);
    return e < 0 ? void 0 : e;
  }, t.schemeAccent = l_, t.schemeBlues = fb, t.schemeBrBG = x_, t.schemeBuGn = U_, t.schemeBuPu = Y_, t.schemeCategory10 = s_, t.schemeDark2 = h_, t.schemeGnBu = j_, t.schemeGreens = lb, t.schemeGreys = db, t.schemeOrRd = X_, t.schemeOranges = bb, t.schemePRGn = M_, t.schemePaired = d_, t.schemePastel1 = p_, t.schemePastel2 = g_, t.schemePiYG = T_, t.schemePuBu = W_, t.schemePuBuGn = V_, t.schemePuOr = E_, t.schemePuRd = K_, t.schemePurples = gb, t.schemeRdBu = N_, t.schemeRdGy = P_, t.schemeRdPu = J_, t.schemeRdYlBu = D_, t.schemeRdYlGn = R_, t.schemeReds = vb, t.schemeSet1 = y_, t.schemeSet2 = v_, t.schemeSet3 = __, t.schemeSpectral = O_, t.schemeTableau10 = b_, t.schemeYlGn = rb, t.schemeYlGnBu = nb, t.schemeYlOrBr = ob, t.schemeYlOrRd = ub, t.select = Un, t.selectAll = function (t) {
    return "string" == typeof t ? new On([document.querySelectorAll(t)], [document.documentElement]) : new On([zt(t)], Fn);
  }, t.selection = In, t.selector = Pt, t.selectorAll = qt, t.shuffle = it, t.shuffler = ot, t.some = function (t, n) {
    if ("function" != typeof n) throw new TypeError("test is not a function");
    var e = -1;

    var _iterator58 = _createForOfIteratorHelper(t),
        _step58;

    try {
      for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
        var _r40 = _step58.value;
        if (n(_r40, ++e, t)) return !0;
      }
    } catch (err) {
      _iterator58.e(err);
    } finally {
      _iterator58.f();
    }

    return !1;
  }, t.sort = z, t.stack = function () {
    var t = Db([]),
        n = xx,
        e = mx,
        r = wx;

    function i(i) {
      var o,
          a,
          u = Array.from(t.apply(this, arguments), Mx),
          c = u.length,
          f = -1;

      var _iterator59 = _createForOfIteratorHelper(i),
          _step59;

      try {
        for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
          var _t36 = _step59.value;

          for (o = 0, ++f; o < c; ++o) {
            (u[o][f] = [0, +r(_t36, u[o].key, f, i)]).data = _t36;
          }
        }
      } catch (err) {
        _iterator59.e(err);
      } finally {
        _iterator59.f();
      }

      for (o = 0, a = nm(n(u)); o < c; ++o) {
        u[a[o]].index = o;
      }

      return e(u, a), u;
    }

    return i.keys = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(Array.from(n)), i) : t;
    }, i.value = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Db(+t), i) : r;
    }, i.order = function (t) {
      return arguments.length ? (n = null == t ? xx : "function" == typeof t ? t : Db(Array.from(t)), i) : n;
    }, i.offset = function (t) {
      return arguments.length ? (e = null == t ? mx : t, i) : e;
    }, i;
  }, t.stackOffsetDiverging = function (t, n) {
    if ((u = t.length) > 0) for (var e, r, i, o, a, u, c = 0, f = t[n[0]].length; c < f; ++c) {
      for (o = a = 0, e = 0; e < u; ++e) {
        (i = (r = t[n[e]][c])[1] - r[0]) > 0 ? (r[0] = o, r[1] = o += i) : i < 0 ? (r[1] = a, r[0] = a += i) : (r[0] = 0, r[1] = i);
      }
    }
  }, t.stackOffsetExpand = function (t, n) {
    if ((r = t.length) > 0) {
      for (var e, r, i, o = 0, a = t[0].length; o < a; ++o) {
        for (i = e = 0; e < r; ++e) {
          i += t[e][o][1] || 0;
        }

        if (i) for (e = 0; e < r; ++e) {
          t[e][o][1] /= i;
        }
      }

      mx(t, n);
    }
  }, t.stackOffsetNone = mx, t.stackOffsetSilhouette = function (t, n) {
    if ((e = t.length) > 0) {
      for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
        for (var a = 0, u = 0; a < e; ++a) {
          u += t[a][r][1] || 0;
        }

        i[r][1] += i[r][0] = -u / 2;
      }

      mx(t, n);
    }
  }, t.stackOffsetWiggle = function (t, n) {
    if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
      for (var e, r, i, o = 0, a = 1; a < r; ++a) {
        for (var u = 0, c = 0, f = 0; u < i; ++u) {
          for (var s = t[n[u]], l = s[a][1] || 0, h = (l - (s[a - 1][1] || 0)) / 2, d = 0; d < u; ++d) {
            var p = t[n[d]];
            h += (p[a][1] || 0) - (p[a - 1][1] || 0);
          }

          c += l, f += h * l;
        }

        e[a - 1][1] += e[a - 1][0] = o, c && (o -= f / c);
      }

      e[a - 1][1] += e[a - 1][0] = o, mx(t, n);
    }
  }, t.stackOrderAppearance = Ax, t.stackOrderAscending = Sx, t.stackOrderDescending = function (t) {
    return Sx(t).reverse();
  }, t.stackOrderInsideOut = function (t) {
    var n,
        e,
        r = t.length,
        i = t.map(Ex),
        o = Ax(t),
        a = 0,
        u = 0,
        c = [],
        f = [];

    for (n = 0; n < r; ++n) {
      e = o[n], a < u ? (a += i[e], c.push(e)) : (u += i[e], f.push(e));
    }

    return f.reverse().concat(c);
  }, t.stackOrderNone = xx, t.stackOrderReverse = function (t) {
    return xx(t).reverse();
  }, t.stratify = function () {
    var t = Bd,
        n = Yd;

    function e(e) {
      var r,
          i,
          o,
          a,
          u,
          c,
          f,
          s = Array.from(e),
          l = s.length,
          h = new Map();

      for (i = 0; i < l; ++i) {
        r = s[i], u = s[i] = new pd(r), null != (c = t(r, i, e)) && (c += "") && (f = u.id = c, h.set(f, h.has(f) ? Ud : u)), null != (c = n(r, i, e)) && (c += "") && (u.parent = c);
      }

      for (i = 0; i < l; ++i) {
        if (c = (u = s[i]).parent) {
          if (!(a = h.get(c))) throw new Error("missing: " + c);
          if (a === Ud) throw new Error("ambiguous: " + c);
          a.children ? a.children.push(u) : a.children = [u], u.parent = a;
        } else {
          if (o) throw new Error("multiple roots");
          o = u;
        }
      }

      if (!o) throw new Error("no root");
      if (o.parent = Id, o.eachBefore(function (t) {
        t.depth = t.parent.depth + 1, --l;
      }).eachBefore(dd), o.parent = null, l > 0) throw new Error("cycle");
      return o;
    }

    return e.id = function (n) {
      return arguments.length ? (t = Nd(n), e) : t;
    }, e.parentId = function (t) {
      return arguments.length ? (n = Nd(t), e) : n;
    }, e;
  }, t.style = an, t.subset = function (t, n) {
    return ft(n, t);
  }, t.sum = function (t, n) {
    var e = 0;

    if (void 0 === n) {
      var _iterator60 = _createForOfIteratorHelper(t),
          _step60;

      try {
        for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
          var _n72 = _step60.value;
          (_n72 = +_n72) && (e += _n72);
        }
      } catch (err) {
        _iterator60.e(err);
      } finally {
        _iterator60.f();
      }
    } else {
      var _r41 = -1;

      var _iterator61 = _createForOfIteratorHelper(t),
          _step61;

      try {
        for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
          var _i31 = _step61.value;
          (_i31 = +n(_i31, ++_r41, t)) && (e += _i31);
        }
      } catch (err) {
        _iterator61.e(err);
      } finally {
        _iterator61.f();
      }
    }

    return e;
  }, t.superset = ft, t.svg = Qu, t.symbol = function (t, n) {
    var e = null;

    function r() {
      var r;
      if (e || (e = r = va()), t.apply(this, arguments).draw(e, +n.apply(this, arguments)), r) return e = null, r + "" || null;
    }

    return t = "function" == typeof t ? t : Db(t || Mm), n = "function" == typeof n ? n : Db(void 0 === n ? 64 : +n), r.type = function (n) {
      return arguments.length ? (t = "function" == typeof n ? n : Db(n), r) : t;
    }, r.size = function (t) {
      return arguments.length ? (n = "function" == typeof t ? t : Db(+t), r) : n;
    }, r.context = function (t) {
      return arguments.length ? (e = null == t ? null : t, r) : e;
    }, r;
  }, t.symbolCircle = Mm, t.symbolCross = Am, t.symbolDiamond = Em, t.symbolSquare = zm, t.symbolStar = Pm, t.symbolTriangle = qm, t.symbolWye = Um, t.symbols = Bm, t.text = Hu, t.thresholdFreedmanDiaconis = function (t, n, e) {
    return Math.ceil((e - n) / (2 * (Z(t, .75) - Z(t, .25)) * Math.pow(f(t), -1 / 3)));
  }, t.thresholdScott = function (t, n, e) {
    return Math.ceil((e - n) / (3.5 * p(t) * Math.pow(f(t), -1 / 3)));
  }, t.thresholdSturges = H, t.tickFormat = Fp, t.tickIncrement = Y, t.tickStep = L, t.ticks = B, t.timeDay = Tg, t.timeDays = Sg, t.timeFormatDefaultLocale = Kv, t.timeFormatLocale = zy, t.timeFriday = Dg, t.timeFridays = Bg, t.timeHour = wg, t.timeHours = Mg, t.timeInterval = ig, t.timeMillisecond = ag, t.timeMilliseconds = ug, t.timeMinute = bg, t.timeMinutes = mg, t.timeMonday = Ng, t.timeMondays = Fg, t.timeMonth = jg, t.timeMonths = Hg, t.timeSaturday = qg, t.timeSaturdays = Yg, t.timeSecond = yg, t.timeSeconds = vg, t.timeSunday = kg, t.timeSundays = Rg, t.timeThursday = zg, t.timeThursdays = Ug, t.timeTickInterval = ky, t.timeTicks = Ey, t.timeTuesday = Cg, t.timeTuesdays = Og, t.timeWednesday = Pg, t.timeWednesdays = Ig, t.timeWeek = kg, t.timeWeeks = Rg, t.timeYear = Gg, t.timeYears = Vg, t.timeout = yi, t.timer = li, t.timerFlush = hi, t.transition = Qi, t.transpose = at, t.tree = function () {
    var t = Ld,
        n = 1,
        e = 1,
        r = null;

    function i(i) {
      var c = function (t) {
        for (var n, e, r, i, o, a = new Vd(t, 0), u = [a]; n = u.pop();) {
          if (r = n._.children) for (n.children = new Array(o = r.length), i = o - 1; i >= 0; --i) {
            u.push(e = n.children[i] = new Vd(r[i], i)), e.parent = n;
          }
        }

        return (a.parent = new Vd(null, 0)).children = [a], a;
      }(i);

      if (c.eachAfter(o), c.parent.m = -c.z, c.eachBefore(a), r) i.eachBefore(u);else {
        var f = i,
            s = i,
            l = i;
        i.eachBefore(function (t) {
          t.x < f.x && (f = t), t.x > s.x && (s = t), t.depth > l.depth && (l = t);
        });
        var h = f === s ? 1 : t(f, s) / 2,
            d = h - f.x,
            p = n / (s.x + h + d),
            g = e / (l.depth || 1);
        i.eachBefore(function (t) {
          t.x = (t.x + d) * p, t.y = t.depth * g;
        });
      }
      return i;
    }

    function o(n) {
      var e = n.children,
          r = n.parent.children,
          i = n.i ? r[n.i - 1] : null;

      if (e) {
        !function (t) {
          for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;) {
            (n = i[o]).z += e, n.m += e, e += n.s + (r += n.c);
          }
        }(n);
        var o = (e[0].z + e[e.length - 1].z) / 2;
        i ? (n.z = i.z + t(n._, i._), n.m = n.z - o) : n.z = o;
      } else i && (n.z = i.z + t(n._, i._));

      n.parent.A = function (n, e, r) {
        if (e) {
          for (var i, o = n, a = n, u = e, c = o.parent.children[0], f = o.m, s = a.m, l = u.m, h = c.m; u = Hd(u), o = jd(o), u && o;) {
            c = jd(c), (a = Hd(a)).a = n, (i = u.z + l - o.z - f + t(u._, o._)) > 0 && (Xd(Gd(u, n, r), n, i), f += i, s += i), l += u.m, f += o.m, h += c.m, s += a.m;
          }

          u && !Hd(a) && (a.t = u, a.m += l - s), o && !jd(c) && (c.t = o, c.m += f - h, r = n);
        }

        return r;
      }(n, i, n.parent.A || r[0]);
    }

    function a(t) {
      t._.x = t.z + t.parent.m, t.m += t.parent.m;
    }

    function u(t) {
      t.x *= n, t.y = t.depth * e;
    }

    return i.separation = function (n) {
      return arguments.length ? (t = n, i) : t;
    }, i.size = function (t) {
      return arguments.length ? (r = !1, n = +t[0], e = +t[1], i) : r ? null : [n, e];
    }, i.nodeSize = function (t) {
      return arguments.length ? (r = !0, n = +t[0], e = +t[1], i) : r ? [n, e] : null;
    }, i;
  }, t.treemap = function () {
    var t = Kd,
        n = !1,
        e = 1,
        r = 1,
        i = [0],
        o = Cd,
        a = Cd,
        u = Cd,
        c = Cd,
        f = Cd;

    function s(t) {
      return t.x0 = t.y0 = 0, t.x1 = e, t.y1 = r, t.eachBefore(l), i = [0], n && t.eachBefore(Fd), t;
    }

    function l(n) {
      var e = i[n.depth],
          r = n.x0 + e,
          s = n.y0 + e,
          l = n.x1 - e,
          h = n.y1 - e;
      l < r && (r = l = (r + l) / 2), h < s && (s = h = (s + h) / 2), n.x0 = r, n.y0 = s, n.x1 = l, n.y1 = h, n.children && (e = i[n.depth + 1] = o(n) / 2, r += f(n) - e, s += a(n) - e, (l -= u(n) - e) < r && (r = l = (r + l) / 2), (h -= c(n) - e) < s && (s = h = (s + h) / 2), t(n, r, s, l, h));
    }

    return s.round = function (t) {
      return arguments.length ? (n = !!t, s) : n;
    }, s.size = function (t) {
      return arguments.length ? (e = +t[0], r = +t[1], s) : [e, r];
    }, s.tile = function (n) {
      return arguments.length ? (t = Nd(n), s) : t;
    }, s.padding = function (t) {
      return arguments.length ? s.paddingInner(t).paddingOuter(t) : s.paddingInner();
    }, s.paddingInner = function (t) {
      return arguments.length ? (o = "function" == typeof t ? t : Pd(+t), s) : o;
    }, s.paddingOuter = function (t) {
      return arguments.length ? s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t) : s.paddingTop();
    }, s.paddingTop = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : Pd(+t), s) : a;
    }, s.paddingRight = function (t) {
      return arguments.length ? (u = "function" == typeof t ? t : Pd(+t), s) : u;
    }, s.paddingBottom = function (t) {
      return arguments.length ? (c = "function" == typeof t ? t : Pd(+t), s) : c;
    }, s.paddingLeft = function (t) {
      return arguments.length ? (f = "function" == typeof t ? t : Pd(+t), s) : f;
    }, s;
  }, t.treemapBinary = function (t, n, e, r, i) {
    var o,
        a,
        u = t.children,
        c = u.length,
        f = new Array(c + 1);

    for (f[0] = a = o = 0; o < c; ++o) {
      f[o + 1] = a += u[o].value;
    }

    !function t(n, e, r, i, o, a, c) {
      if (n >= e - 1) {
        var s = u[n];
        return s.x0 = i, s.y0 = o, s.x1 = a, void (s.y1 = c);
      }

      var l = f[n],
          h = r / 2 + l,
          d = n + 1,
          p = e - 1;

      for (; d < p;) {
        var g = d + p >>> 1;
        f[g] < h ? d = g + 1 : p = g;
      }

      h - f[d - 1] < f[d] - h && n + 1 < d && --d;
      var y = f[d] - l,
          v = r - y;

      if (a - i > c - o) {
        var _ = r ? (i * v + a * y) / r : a;

        t(n, d, y, i, o, _, c), t(d, e, v, _, o, a, c);
      } else {
        var b = r ? (o * v + c * y) / r : c;
        t(n, d, y, i, o, a, b), t(d, e, v, i, b, a, c);
      }
    }(0, c, t.value, n, e, r, i);
  }, t.treemapDice = Od, t.treemapResquarify = Qd, t.treemapSlice = $d, t.treemapSliceDice = function (t, n, e, r, i) {
    (1 & t.depth ? $d : Od)(t, n, e, r, i);
  }, t.treemapSquarify = Kd, t.tsv = Vu, t.tsvFormat = Ru, t.tsvFormatBody = Fu, t.tsvFormatRow = Iu, t.tsvFormatRows = Ou, t.tsvFormatValue = Uu, t.tsvParse = Du, t.tsvParseRows = qu, t.union = function () {
    var n = new Set();

    for (var _len13 = arguments.length, t = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      t[_key13] = arguments[_key13];
    }

    for (var _i32 = 0, _t37 = t; _i32 < _t37.length; _i32++) {
      var _e36 = _t37[_i32];

      var _iterator62 = _createForOfIteratorHelper(_e36),
          _step62;

      try {
        for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
          var _t38 = _step62.value;
          n.add(_t38);
        }
      } catch (err) {
        _iterator62.e(err);
      } finally {
        _iterator62.f();
      }
    }

    return n;
  }, t.utcDay = ny, t.utcDays = ey, t.utcFriday = fy, t.utcFridays = yy, t.utcHour = Qg, t.utcHours = Jg, t.utcMillisecond = ag, t.utcMilliseconds = ug, t.utcMinute = Wg, t.utcMinutes = Zg, t.utcMonday = oy, t.utcMondays = hy, t.utcMonth = by, t.utcMonths = my, t.utcSaturday = sy, t.utcSaturdays = vy, t.utcSecond = yg, t.utcSeconds = vg, t.utcSunday = iy, t.utcSundays = ly, t.utcThursday = cy, t.utcThursdays = gy, t.utcTickInterval = Sy, t.utcTicks = Ty, t.utcTuesday = ay, t.utcTuesdays = dy, t.utcWednesday = uy, t.utcWednesdays = py, t.utcWeek = iy, t.utcWeeks = ly, t.utcYear = wy, t.utcYears = My, t.variance = d, t.version = "7.0.1", t.window = nn, t.xml = Zu, t.zip = function () {
    return at(arguments);
  }, t.zoom = function () {
    var t,
        n,
        e,
        r = Rx,
        i = Fx,
        o = Bx,
        a = Ix,
        u = Ux,
        c = [0, 1 / 0],
        f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]],
        s = 250,
        l = Yr,
        h = bt("start", "zoom", "end"),
        d = 500,
        p = 0,
        g = 10;

    function y(t) {
      t.property("__zoom", Ox).on("wheel.zoom", M, {
        passive: !1
      }).on("mousedown.zoom", A).on("dblclick.zoom", T).filter(u).on("touchstart.zoom", S).on("touchmove.zoom", E).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function v(t, n) {
      return (n = Math.max(c[0], Math.min(c[1], n))) === t.k ? t : new Cx(n, t.x, t.y);
    }

    function _(t, n, e) {
      var r = n[0] - e[0] * t.k,
          i = n[1] - e[1] * t.k;
      return r === t.x && i === t.y ? t : new Cx(t.k, r, i);
    }

    function b(t) {
      return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
    }

    function m(t, n, e, r) {
      t.on("start.zoom", function () {
        x(this, arguments).event(r).start();
      }).on("interrupt.zoom end.zoom", function () {
        x(this, arguments).event(r).end();
      }).tween("zoom", function () {
        var t = this,
            o = arguments,
            a = x(t, o).event(r),
            u = i.apply(t, o),
            c = null == e ? b(u) : "function" == typeof e ? e.apply(t, o) : e,
            f = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]),
            s = t.__zoom,
            h = "function" == typeof n ? n.apply(t, o) : n,
            d = l(s.invert(c).concat(f / s.k), h.invert(c).concat(f / h.k));
        return function (t) {
          if (1 === t) t = h;else {
            var n = d(t),
                e = f / n[2];
            t = new Cx(e, c[0] - n[0] * e, c[1] - n[1] * e);
          }
          a.zoom(null, t);
        };
      });
    }

    function x(t, n, e) {
      return !e && t.__zooming || new w(t, n);
    }

    function w(t, n) {
      this.that = t, this.args = n, this.active = 0, this.sourceEvent = null, this.extent = i.apply(t, n), this.taps = 0;
    }

    function M(t) {
      for (var _len14 = arguments.length, n = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
        n[_key14 - 1] = arguments[_key14];
      }

      if (r.apply(this, arguments)) {
        var e = x(this, n).event(t),
            i = this.__zoom,
            u = Math.max(c[0], Math.min(c[1], i.k * Math.pow(2, a.apply(this, arguments)))),
            s = Hn(t);
        if (e.wheel) e.mouse[0][0] === s[0] && e.mouse[0][1] === s[1] || (e.mouse[1] = i.invert(e.mouse[0] = s)), clearTimeout(e.wheel);else {
          if (i.k === u) return;
          e.mouse = [s, i.invert(s)], Mi(this), e.start();
        }
        qx(t), e.wheel = setTimeout(l, 150), e.zoom("mouse", o(_(v(i, u), e.mouse[0], e.mouse[1]), e.extent, f));
      }

      function l() {
        e.wheel = null, e.end();
      }
    }

    function A(t) {
      for (var _len15 = arguments.length, n = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        n[_key15 - 1] = arguments[_key15];
      }

      if (!e && r.apply(this, arguments)) {
        var i = t.currentTarget,
            a = x(this, n, !0).event(t),
            u = Un(t.view).on("mousemove.zoom", h, !0).on("mouseup.zoom", d, !0),
            c = Hn(t, i),
            s = t.clientX,
            l = t.clientY;
        Wn(t.view), Dx(t), a.mouse = [c, this.__zoom.invert(c)], Mi(this), a.start();
      }

      function h(t) {
        if (qx(t), !a.moved) {
          var n = t.clientX - s,
              e = t.clientY - l;
          a.moved = n * n + e * e > p;
        }

        a.event(t).zoom("mouse", o(_(a.that.__zoom, a.mouse[0] = Hn(t, i), a.mouse[1]), a.extent, f));
      }

      function d(t) {
        u.on("mousemove.zoom mouseup.zoom", null), Zn(t.view, a.moved), qx(t), a.event(t).end();
      }
    }

    function T(t) {
      for (var _len16 = arguments.length, n = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        n[_key16 - 1] = arguments[_key16];
      }

      if (r.apply(this, arguments)) {
        var e = this.__zoom,
            a = Hn(t.changedTouches ? t.changedTouches[0] : t, this),
            u = e.invert(a),
            c = e.k * (t.shiftKey ? .5 : 2),
            l = o(_(v(e, c), a, u), i.apply(this, n), f);
        qx(t), s > 0 ? Un(this).transition().duration(s).call(m, l, a, t) : Un(this).call(y.transform, l, a, t);
      }
    }

    function S(e) {
      for (var _len17 = arguments.length, i = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        i[_key17 - 1] = arguments[_key17];
      }

      if (r.apply(this, arguments)) {
        var o,
            a,
            u,
            c,
            f = e.touches,
            s = f.length,
            l = x(this, i, e.changedTouches.length === s).event(e);

        for (Dx(e), a = 0; a < s; ++a) {
          c = [c = Hn(u = f[a], this), this.__zoom.invert(c), u.identifier], l.touch0 ? l.touch1 || l.touch0[2] === c[2] || (l.touch1 = c, l.taps = 0) : (l.touch0 = c, o = !0, l.taps = 1 + !!t);
        }

        t && (t = clearTimeout(t)), o && (l.taps < 2 && (n = c[0], t = setTimeout(function () {
          t = null;
        }, d)), Mi(this), l.start());
      }
    }

    function E(t) {
      if (this.__zooming) {
        for (var _len18 = arguments.length, n = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
          n[_key18 - 1] = arguments[_key18];
        }

        var e,
            r,
            i,
            a,
            u = x(this, n).event(t),
            c = t.changedTouches,
            s = c.length;

        for (qx(t), e = 0; e < s; ++e) {
          i = Hn(r = c[e], this), u.touch0 && u.touch0[2] === r.identifier ? u.touch0[0] = i : u.touch1 && u.touch1[2] === r.identifier && (u.touch1[0] = i);
        }

        if (r = u.that.__zoom, u.touch1) {
          var l = u.touch0[0],
              h = u.touch0[1],
              d = u.touch1[0],
              p = u.touch1[1],
              g = (g = d[0] - l[0]) * g + (g = d[1] - l[1]) * g,
              y = (y = p[0] - h[0]) * y + (y = p[1] - h[1]) * y;
          r = v(r, Math.sqrt(g / y)), i = [(l[0] + d[0]) / 2, (l[1] + d[1]) / 2], a = [(h[0] + p[0]) / 2, (h[1] + p[1]) / 2];
        } else {
          if (!u.touch0) return;
          i = u.touch0[0], a = u.touch0[1];
        }

        u.zoom("touch", o(_(r, i, a), u.extent, f));
      }
    }

    function k(t) {
      for (var _len19 = arguments.length, r = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
        r[_key19 - 1] = arguments[_key19];
      }

      if (this.__zooming) {
        var i,
            o,
            a = x(this, r).event(t),
            u = t.changedTouches,
            c = u.length;

        for (Dx(t), e && clearTimeout(e), e = setTimeout(function () {
          e = null;
        }, d), i = 0; i < c; ++i) {
          o = u[i], a.touch0 && a.touch0[2] === o.identifier ? delete a.touch0 : a.touch1 && a.touch1[2] === o.identifier && delete a.touch1;
        }

        if (a.touch1 && !a.touch0 && (a.touch0 = a.touch1, delete a.touch1), a.touch0) a.touch0[1] = this.__zoom.invert(a.touch0[0]);else if (a.end(), 2 === a.taps && (o = Hn(o, this), Math.hypot(n[0] - o[0], n[1] - o[1]) < g)) {
          var f = Un(this).on("dblclick.zoom");
          f && f.apply(this, arguments);
        }
      }
    }

    return y.transform = function (t, n, e, r) {
      var i = t.selection ? t.selection() : t;
      i.property("__zoom", Ox), t !== i ? m(t, n, e, r) : i.interrupt().each(function () {
        x(this, arguments).event(r).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end();
      });
    }, y.scaleBy = function (t, n, e, r) {
      y.scaleTo(t, function () {
        var t = this.__zoom.k,
            e = "function" == typeof n ? n.apply(this, arguments) : n;
        return t * e;
      }, e, r);
    }, y.scaleTo = function (t, n, e, r) {
      y.transform(t, function () {
        var t = i.apply(this, arguments),
            r = this.__zoom,
            a = null == e ? b(t) : "function" == typeof e ? e.apply(this, arguments) : e,
            u = r.invert(a),
            c = "function" == typeof n ? n.apply(this, arguments) : n;
        return o(_(v(r, c), a, u), t, f);
      }, e, r);
    }, y.translateBy = function (t, n, e, r) {
      y.transform(t, function () {
        return o(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof e ? e.apply(this, arguments) : e), i.apply(this, arguments), f);
      }, null, r);
    }, y.translateTo = function (t, n, e, r, a) {
      y.transform(t, function () {
        var t = i.apply(this, arguments),
            a = this.__zoom,
            u = null == r ? b(t) : "function" == typeof r ? r.apply(this, arguments) : r;
        return o(Px.translate(u[0], u[1]).scale(a.k).translate("function" == typeof n ? -n.apply(this, arguments) : -n, "function" == typeof e ? -e.apply(this, arguments) : -e), t, f);
      }, r, a);
    }, w.prototype = {
      event: function event(t) {
        return t && (this.sourceEvent = t), this;
      },
      start: function start() {
        return 1 == ++this.active && (this.that.__zooming = this, this.emit("start")), this;
      },
      zoom: function zoom(t, n) {
        return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this;
      },
      end: function end() {
        return 0 == --this.active && (delete this.that.__zooming, this.emit("end")), this;
      },
      emit: function emit(t) {
        var n = Un(this.that).datum();
        h.call(t, this.that, new Nx(t, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: t,
          transform: this.that.__zoom,
          dispatch: h
        }), n);
      }
    }, y.wheelDelta = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : kx(+t), y) : a;
    }, y.filter = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : kx(!!t), y) : r;
    }, y.touchable = function (t) {
      return arguments.length ? (u = "function" == typeof t ? t : kx(!!t), y) : u;
    }, y.extent = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : kx([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), y) : i;
    }, y.scaleExtent = function (t) {
      return arguments.length ? (c[0] = +t[0], c[1] = +t[1], y) : [c[0], c[1]];
    }, y.translateExtent = function (t) {
      return arguments.length ? (f[0][0] = +t[0][0], f[1][0] = +t[1][0], f[0][1] = +t[0][1], f[1][1] = +t[1][1], y) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
    }, y.constrain = function (t) {
      return arguments.length ? (o = t, y) : o;
    }, y.duration = function (t) {
      return arguments.length ? (s = +t, y) : s;
    }, y.interpolate = function (t) {
      return arguments.length ? (l = t, y) : l;
    }, y.on = function () {
      var t = h.on.apply(h, arguments);
      return t === h ? y : t;
    }, y.clickDistance = function (t) {
      return arguments.length ? (p = (t = +t) * t, y) : Math.sqrt(p);
    }, y.tapDistance = function (t) {
      return arguments.length ? (g = +t, y) : g;
    }, y;
  }, t.zoomIdentity = Px, t.zoomTransform = zx, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});

/***/ }),

/***/ "./components/esmap.js":
/*!*****************************!*\
  !*** ./components/esmap.js ***!
  \*****************************/
/*! exports provided: EsMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EsMap", function() { return EsMap; });
/* harmony import */ var _d3_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./d3.min.js */ "./components/d3.min.js");
/* harmony import */ var _d3_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_d3_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function createSvgMarker(svg) {
  //--- setup markers
  var defs = svg.append('svg:defs').attr('id', 'markers'); //--- could not  this just be in a template somewhere?

  var marker = defs.selectAll('marker').data([{
    id: 2,
    name: 'arrow',
    path: 'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z',
    viewbox: '0 0 20 20'
  }]).enter().append('svg:marker').attr('id', function (d) {
    return d.name;
  }).attr('markerHeight', 5).attr('markerWidth', 4).attr('markerUnits', 'strokeWidth').attr('orient', 'auto').attr('refX', 10).attr('refY', 10).attr('viewBox', function (d) {
    return d.viewbox;
  }).append('svg:path').attr('d', function (d) {
    return d.path;
  }).attr('fill', function (d, i) {
    return '#333';
  }).attr('stroke', '#555') // color
  .attr('stroke-width', 0.5);
  return marker;
}

function renderEdges(g, data, ref) {
  var div = ref.div;
  var edgeWidth = ref.options.edgeWidth;
  var azLines = g.selectAll('path.edge-az').data(data.edges);
  azLines.enter() //-- A to Z path
  .append('path').merge(azLines).attr('d', function (d) {
    return d.azPath;
  }).attr('stroke', function (d) {
    return d.azColor;
  }).attr('marker-mid', function (d, i) {
    return 'url(#arrow)';
  }).attr('stroke-width', edgeWidth).attr('class', function (d) {
    return 'edge edge-az edge-az-' + d.name;
  }).attr('text', function (d) {
    return d.AZname;
  }).attr('pointer-events', 'visiblePainted').on('mouseover', function (event, d) {
    _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class', function (d) {
      return 'animated-edge edge-az edge-az-' + d.name;
    });
    div.html(function () {
      var text = '<p><b>' + d.AZname + '</b></p><p><b>Volume: </b> ' + d.AZdisplayValue + '</p>';
      return text;
    }).style('left', event.pageX + 10 + 'px').style('top', event.pageY - 28 + 'px').transition().duration(500).style('opacity', 0.8);
  }).on('mouseout', function (d, i) {
    _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class', function (d) {
      return 'edge edge-az edge-az-' + d.name;
    });
    div.transition().duration(500).style('opacity', 0);
  });
  azLines.exit().remove();
  var zaLines = g.selectAll('path.edge-za').data(data.edges);
  zaLines.enter() //-- Z to A path
  .append('path').merge(zaLines).attr('d', function (d) {
    return d.zaPath;
  }).attr('stroke', function (d) {
    return d.zaColor;
  }).attr('marker-mid', function (d, i) {
    return 'url(#arrow)';
  }).attr('stroke-width', edgeWidth).attr('class', function (d) {
    return 'edge edge-za edge-za-' + d.name;
  }).attr('text', function (d) {
    return d.ZAname;
  }).attr('pointer-events', 'visiblePainted').on('mouseover', function (event, d) {
    div.html(function () {
      var text = '<p><b>' + d.ZAname + '</b></p><p><b>Volume: </b> ' + d.ZAdisplayValue + '</p>';
      return text;
    }) // .attr('class', 'tooltip')
    .style('left', event.pageX + 'px').style('top', event.pageY - 28 + 'px').transition().duration(500).style('opacity', 0.8);
    _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class', function (d) {
      return 'animated-edge edge-za edge-za-' + d.name;
    });
  }).on('mouseout', function (d, i) {
    _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class', function (d) {
      return 'edge edge-za edge-za-' + d.name;
    });
    div.transition().duration(500).style('opacity', 0);
  });
  zaLines.exit().remove();
}

function addControlPoint(evt, obj, ref) {
  console.log('add control point');
  var mapDiv = ref.leafletMap.getContainer();
  var ll = ref.leafletMap.containerPointToLatLng(L.point(_d3_min_js__WEBPACK_IMPORTED_MODULE_0__["pointer"](evt, mapDiv))); // we know the mouse is on one of the segmets
  // figure out difference in able between each pair of points and the click point
  // if the delta is nearly 0 we have a match
  // https://stackoverflow.com/questions/21608853/add-a-vertex-in-the-middle-of-a-path-with-d3js

  var latLngs = obj.__data__.latLngs;
  var target = [ll.lat, ll.lng];
  var idx = 0;
  var splicePoint = 0;
  var found = 0;
  var minDelta = 1000;

  for (idx = 0; idx < latLngs.length - 1; idx++) {
    var angleA = Math.abs(Math.atan((latLngs[idx][1] - target[1]) / (latLngs[idx][0] - target[0])));
    var angleB = Math.abs(Math.atan((latLngs[idx][1] - latLngs[idx + 1][1]) / (latLngs[idx][0] - latLngs[idx + 1][0])));
    var delta = Math.abs(angleA - angleB);

    if (delta < 0.1 && delta < minDelta) {
      // with slop click point lays on the line between current and next point
      console.log('split between: ' + idx + ' and ' + (idx + 1));
      minDelta = delta;
      splicePoint = idx + 1;
      found = 1;
    }
  }

  if (found == 1) {
    // insert target into the array at idx
    var tmp = latLngs.slice(0, splicePoint);
    tmp.push(target);
    latLngs = tmp.concat(latLngs.slice(splicePoint));
    obj.__data__.latLngs = latLngs;
    ref.update();
  }
}

function renderEdgeControl(g, data, ref) {
  var lines = g.selectAll('path').data(data.edges);
  lines.enter().append('path').merge(lines).attr('d', function (d) {
    return d.controlPointPath;
  }).attr('class', 'control') // still need to figure out how to not zoom when doubleclicking here
  .on('dblclick', function (d) {
    addControlPoint(d, this, ref);
  }) //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
  .on('mouseenter', function () {
    ref.leafletMap.dragging.disable();
  }).on('mouseout', function () {
    ref.leafletMap.dragging.enable();
  });
  lines.exit().remove();
  g.selectAll('g').remove();

  function dragged(evt, d) {
    var mapDiv = ref.leafletMap.getContainer(); //--- set the control points to the new Lat lng

    var ll = ref.leafletMap.containerPointToLatLng(L.point(_d3_min_js__WEBPACK_IMPORTED_MODULE_0__["pointer"](evt, mapDiv)));
    d[0] = ll.lat;
    d[1] = ll.lng; //--- rerender stuff

    ref.update(); //--- this is where we can update json????
    // var zoom = ref.leafletMap.getZoom();
    // var center = L.latLng(ref.leafletMap.getCenter());
    // ref.updateMapJson(data, zoom, center);
    // find a way to persist zoom and center lat/lng
  }

  function endDrag(evt, d) {
    var zoom = ref.leafletMap.getZoom();
    var center = L.latLng(ref.leafletMap.getCenter());
    console.log(ref.data);
    console.log(data);
    ref.updateMapJson(ref.data['layer1'], ref.data['layer2'], zoom, center);
  }

  data.edges.forEach(function (d) {
    var my_g = g.append('g');
    var feature = my_g.selectAll('circle').data(d.latLngs);
    feature.enter().append('circle').attr('r', 4).attr('class', 'control controlPoint').merge(feature).call(_d3_min_js__WEBPACK_IMPORTED_MODULE_0__["drag"]().on('drag', dragged).on('end', endDrag));
    my_g.selectAll('circle').attr('transform', function (d) {
      var ll = L.latLng(d);
      var pt = ref.leafletMap.latLngToLayerPoint(ll);
      return 'translate(' + pt.x + ',' + pt.y + ')';
    }) //--- when mouse is on the dot, make sure d3 gets the event and dont let map pan
    .on('mouseenter', function () {
      ref.leafletMap.dragging.disable();
    }).on('mouseout', function () {
      ref.leafletMap.dragging.enable();
    });
    feature.exit().remove();
  }); // ref.updateMapJson(data); not here
}

function renderNodes(g, data, ref) {
  var feature = g.selectAll('circle').data(data.nodes);
  var div = ref.div;
  feature.enter().append('circle').attr('r', ref.options.nodeWidth).attr('class', 'node').attr('text', function (d) {
    return d.name;
  }).attr('fill', function (d) {
    return d.color;
  }).on('mouseover', function (event, d) {
    div.html(function () {
      var text = "<p><b>".concat(d.name, "</b></p>\n            <p><b>In Volume: </b> ").concat(d.inValue, "</p>\n            <p><b>Out Volume: </b> ").concat(d.outValue, "</p>");
      return text;
    }).style('left', event.pageX + 'px').style('top', event.pageY - 28 + 'px').transition().duration(500).style('opacity', 0.8);
  }).on('mouseout', function (d) {
    div.transition().duration(500).style('opacity', 0);
  });
  g.selectAll('circle').attr('transform', function (d) {
    var ll = L.latLng(d.latLng);
    var pt = ref.leafletMap.latLngToLayerPoint(ll);
    return 'translate(' + pt.x + ',' + pt.y + ')';
  });
  feature.exit().remove();
}

function calcTranslation(distance, targetPoint, pointA, pointB) {
  var segmentAngle = Math.atan2(pointB[1] - pointA[1], pointB[0] - pointA[0]);
  return [targetPoint[0] + Math.sin(segmentAngle) * distance, targetPoint[1] + -Math.cos(segmentAngle) * distance];
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]

  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)

  return theta;
}

function getBisectAngle(pointA, pointB, pointC) {
  var angle1 = angle.apply(void 0, _toConsumableArray(pointB).concat(_toConsumableArray(pointA)));
  var angle2 = angle.apply(void 0, _toConsumableArray(pointB).concat(_toConsumableArray(pointC)));
  var relativeAngle = angle1 - angle2;
  var bisectAngle = angle1 - relativeAngle * 0.5; //console.log(angle1 +" "+angle2+ "--> " + bisectAngle);

  if (angle1 > angle2) {
    bisectAngle += 180;
  }

  return bisectAngle;
}
/*
 CX @ Origin X
 CY @ Origin Y
 X  @ Point X to be rotated
 Y  @ Point Y to be rotated
 anticlock_wise @ to rotate point in clockwise direction or anticlockwise , default clockwise
 return @ {x,y}
*/


function rotate(cx, cy, x, y, angle) {
  var anticlock_wise = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (angle == 0) {
    return {
      x: parseFloat(x),
      y: parseFloat(y)
    };
  }

  if (anticlock_wise) {
    var radians = Math.PI / 180 * angle;
  } else {
    var radians = Math.PI / -180 * angle;
  }

  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  var nx = cos * (x - cx) + sin * (y - cy) + cx;
  var ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
} //---- Takes a set of points representing the points between endpoint A and endpoint Z
//---- it then cacluates the point positions for an offset path parallel to the original
//---- useful when laying out circuits that look like divided highways


function offsetPoints(origPoints, offset) {
  var points = origPoints.slice();
  var x = 0; //--- for the first and last point, offset 90 degrees from the line

  points[0] = calcTranslation(offset, points[0], points[0], points[1]);
  x = points.length - 1;
  points[x] = calcTranslation(-offset, points[x], points[x], points[x - 1]);

  for (x = 1; x < points.length - 1; x++) {
    //--- for these, split the difference to basically miter cut
    var bisAngle = getBisectAngle(points[x - 1], points[x], points[x + 1]);
    points[x] = rotate.apply(void 0, _toConsumableArray(points[x]).concat([points[x][0] + offset, points[x][1], bisAngle]));
  }

  return points;
}

var EsMap = /*#__PURE__*/function () {
  function EsMap(leafletMap, svg, div, curve, options, updateMapJson, updateCenter) {
    _classCallCheck(this, EsMap);

    this.leafletMap = leafletMap;
    this.svg = svg;
    this.data = {};
    this.mapLayers = {};
    this.offset = options.pathOffset;
    this.lineGen = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["line"]().curve(curve);
    this.edit = 0;
    this.div = div;
    this.options = options;
    this.updateMapJson = updateMapJson;
    this.updateCenter = updateCenter;
    createSvgMarker(this.svg); //

    var ref = this;
    this.leafletMap.on('moveend', function () {
      ref.update();
    });
    this.leafletMap.on('viewreset', function () {
      ref.update();
    });
  }

  _createClass(EsMap, [{
    key: "editMode",
    value: function editMode(setting) {
      if (setting === null || setting === undefined) {
        return this.edit;
      }

      if (setting > 0) {
        this.edit = 1;
      } else {
        this.edit = 0;
      }

      this.update();
      return this.edit;
    }
  }, {
    key: "updateCoordinates",
    value: function updateCoordinates(data) {
      var ref = this;
      var idx = 0;
      var newEdges = [];
      data.edges.forEach(function (d) {
        var reject = 0;
        d.points = [];
        d.rejected = 0;

        if (typeof d.latLngs === 'undefined' || d.latLngs === null) {
          d.rejected = 1;
          return;
        } //--- setup control points


        d.latLngs.forEach(function (coord) {
          if (!Array.isArray(coord)) {
            reject = 1;
            return;
          }

          var ll = L.latLng(coord);
          var pt = ref.leafletMap.latLngToLayerPoint(ll); //--- setup the control points

          d.points.push([pt.x, pt.y]);
        });

        if (d.points.length < 2) {
          reject = 1; //--- skip if not at least 2 coordinates in the array
        }

        if (reject) {
          //--- issue found we should remove this from the list
          idx = data.edges.indexOf(d);
          console.log('marking as rejected: ' + d.name);
          d.rejected = 1;
          return;
        }

        newEdges.push(d); //console.log("sddetup the paths for " + d.name +" reject? "+reject);
        //--- setup the controlPoint path

        d.controlPointPath = _d3_min_js__WEBPACK_IMPORTED_MODULE_0__["line"]()(d.points); //--- setup the azPath

        d.azPath = ref.lineGen(offsetPoints(d.points, ref.offset)); //--- setup the zaPath

        d.zaPath = ref.lineGen(offsetPoints(d.points.reverse(), ref.offset));
      }); //---swap out edge list with the filtered list

      data.edges = newEdges;
    } //--- loop through data and map objects and refresh them

  }, {
    key: "update",
    value: function update() {
      this.leafletMap.dragging.enable();

      for (var _i = 0, _Object$entries = Object.entries(this.data); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            _data = _Object$entries$_i[1];

        this.updateCoordinates(_data);
      }

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.mapLayers); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _name = _Object$entries2$_i[0],
            g = _Object$entries2$_i[1];

        var edge_g = g.select('g.edge');
        var node_g = g.select('g.node');
        var cp_g = g.select('g.cp');
        var data = this.data[_name];

        if (this.edit == 1) {
          renderEdgeControl(cp_g, data, this);
          var zoom = this.leafletMap.getZoom();
          var center = L.latLng(this.leafletMap.getCenter());
          this.updateCenter(zoom, center);
        } else {
          //  delete all the control point g children
          cp_g.selectAll('*').remove();
        }

        renderNodes(node_g, data, this);
        renderEdges(edge_g, data, this);
      }
    }
  }, {
    key: "addNetLayer",
    value: function addNetLayer(name, data) {
      var ref = this;
      ref.data[name] = data; //maybe use this to serialize

      var map_g = this.svg.append('g').attr('class', 'esmap');
      ref.mapLayers[name] = map_g;
      var edge_g = map_g.append('g').attr('class', 'edge');
      var node_g = map_g.append('g').attr('class', 'node');
      var cp_g = map_g.append('g').attr('class', 'cp'); //--- render layer and ensure events are hooked up to map

      this.update();
      return map_g;
    }
  }]);

  return EsMap;
}();

/***/ }),

/***/ "./components/leaflet.js":
/*!*******************************!*\
  !*** ./components/leaflet.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!function (t, i) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? i(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (t) {
  "use strict";

  function h(t) {
    for (var i, e, n = 1, o = arguments.length; n < o; n++) {
      for (i in e = arguments[n]) {
        t[i] = e[i];
      }
    }

    return t;
  }

  var s = Object.create || function (t) {
    return i.prototype = t, new i();
  };

  function i() {}

  function p(t, i) {
    var e = Array.prototype.slice;
    if (t.bind) return t.bind.apply(t, e.call(arguments, 1));
    var n = e.call(arguments, 2);
    return function () {
      return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments);
    };
  }

  var e = 0;

  function m(t) {
    return t._leaflet_id = t._leaflet_id || ++e, t._leaflet_id;
  }

  function n(t, i, e) {
    var n,
        o,
        s = function s() {
      n = !1, o && (r.apply(e, o), o = !1);
    },
        r = function r() {
      n ? o = arguments : (t.apply(e, arguments), setTimeout(s, i), n = !0);
    };

    return r;
  }

  function o(t, i, e) {
    var n = i[1],
        o = i[0],
        s = n - o;
    return t === n && e ? t : ((t - o) % s + s) % s + o;
  }

  function a() {
    return !1;
  }

  function r(t, i) {
    var e = Math.pow(10, void 0 === i ? 6 : i);
    return Math.round(t * e) / e;
  }

  function u(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
  }

  function l(t) {
    return u(t).split(/\s+/);
  }

  function c(t, i) {
    for (var e in Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? s(t.options) : {}), i) {
      t.options[e] = i[e];
    }

    return t.options;
  }

  function _(t, i, e) {
    var n = [];

    for (var o in t) {
      n.push(encodeURIComponent(e ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
    }

    return (i && -1 !== i.indexOf("?") ? "&" : "?") + n.join("&");
  }

  var d = /\{ *([\w_-]+) *\}/g;

  function f(t, n) {
    return t.replace(d, function (t, i) {
      var e = n[i];
      if (void 0 === e) throw new Error("No value provided for variable " + t);
      return "function" == typeof e && (e = e(n)), e;
    });
  }

  var g = Array.isArray || function (t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  };

  function v(t, i) {
    for (var e = 0; e < t.length; e++) {
      if (t[e] === i) return e;
    }

    return -1;
  }

  var y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  function x(t) {
    return window["webkit" + t] || window["moz" + t] || window["ms" + t];
  }

  var w = 0;

  function P(t) {
    var i = +new Date(),
        e = Math.max(0, 16 - (i - w));
    return w = i + e, window.setTimeout(t, e);
  }

  var b = window.requestAnimationFrame || x("RequestAnimationFrame") || P,
      T = window.cancelAnimationFrame || x("CancelAnimationFrame") || x("CancelRequestAnimationFrame") || function (t) {
    window.clearTimeout(t);
  };

  function M(t, i, e) {
    if (!e || b !== P) return b.call(window, p(t, i));
    t.call(i);
  }

  function z(t) {
    t && T.call(window, t);
  }

  var C = {
    extend: h,
    create: s,
    bind: p,
    lastId: e,
    stamp: m,
    throttle: n,
    wrapNum: o,
    falseFn: a,
    formatNum: r,
    trim: u,
    splitWords: l,
    setOptions: c,
    getParamString: _,
    template: f,
    isArray: g,
    indexOf: v,
    emptyImageUrl: y,
    requestFn: b,
    cancelFn: T,
    requestAnimFrame: M,
    cancelAnimFrame: z
  };

  function S() {}

  S.extend = function (t) {
    function i() {
      this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
    }

    var e = i.__super__ = this.prototype,
        n = s(e);

    for (var o in (n.constructor = i).prototype = n, this) {
      Object.prototype.hasOwnProperty.call(this, o) && "prototype" !== o && "__super__" !== o && (i[o] = this[o]);
    }

    return t.statics && (h(i, t.statics), delete t.statics), t.includes && (function (t) {
      if ("undefined" == typeof L || !L || !L.Mixin) return;
      t = g(t) ? t : [t];

      for (var i = 0; i < t.length; i++) {
        t[i] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }(t.includes), h.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = h(s(n.options), t.options)), h(n, t), n._initHooks = [], n.callInitHooks = function () {
      if (!this._initHooksCalled) {
        e.callInitHooks && e.callInitHooks.call(this), this._initHooksCalled = !0;

        for (var t = 0, i = n._initHooks.length; t < i; t++) {
          n._initHooks[t].call(this);
        }
      }
    }, i;
  }, S.include = function (t) {
    return h(this.prototype, t), this;
  }, S.mergeOptions = function (t) {
    return h(this.prototype.options, t), this;
  }, S.addInitHook = function (t) {
    var i = Array.prototype.slice.call(arguments, 1),
        e = "function" == typeof t ? t : function () {
      this[t].apply(this, i);
    };
    return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(e), this;
  };
  var Z = {
    on: function on(t, i, e) {
      if ("object" == _typeof(t)) for (var n in t) {
        this._on(n, t[n], i);
      } else for (var o = 0, s = (t = l(t)).length; o < s; o++) {
        this._on(t[o], i, e);
      }
      return this;
    },
    off: function off(t, i, e) {
      if (t) {
        if ("object" == _typeof(t)) for (var n in t) {
          this._off(n, t[n], i);
        } else for (var o = 0, s = (t = l(t)).length; o < s; o++) {
          this._off(t[o], i, e);
        }
      } else delete this._events;
      return this;
    },
    _on: function _on(t, i, e) {
      this._events = this._events || {};
      var n = this._events[t];
      n || (n = [], this._events[t] = n), e === this && (e = void 0);

      for (var o = {
        fn: i,
        ctx: e
      }, s = n, r = 0, a = s.length; r < a; r++) {
        if (s[r].fn === i && s[r].ctx === e) return;
      }

      s.push(o);
    },
    _off: function _off(t, i, e) {
      var n, o, s;
      if (this._events && (n = this._events[t])) if (i) {
        if (e === this && (e = void 0), n) for (o = 0, s = n.length; o < s; o++) {
          var r = n[o];
          if (r.ctx === e && r.fn === i) return r.fn = a, this._firingCount && (this._events[t] = n = n.slice()), void n.splice(o, 1);
        }
      } else {
        for (o = 0, s = n.length; o < s; o++) {
          n[o].fn = a;
        }

        delete this._events[t];
      }
    },
    fire: function fire(t, i, e) {
      if (!this.listens(t, e)) return this;
      var n = h({}, i, {
        type: t,
        target: this,
        sourceTarget: i && i.sourceTarget || this
      });

      if (this._events) {
        var o = this._events[t];

        if (o) {
          this._firingCount = this._firingCount + 1 || 1;

          for (var s = 0, r = o.length; s < r; s++) {
            var a = o[s];
            a.fn.call(a.ctx || this, n);
          }

          this._firingCount--;
        }
      }

      return e && this._propagateEvent(n), this;
    },
    listens: function listens(t, i) {
      var e = this._events && this._events[t];
      if (e && e.length) return !0;
      if (i) for (var n in this._eventParents) {
        if (this._eventParents[n].listens(t, i)) return !0;
      }
      return !1;
    },
    once: function once(t, i, e) {
      if ("object" == _typeof(t)) {
        for (var n in t) {
          this.once(n, t[n], i);
        }

        return this;
      }

      var o = p(function () {
        this.off(t, i, e).off(t, o, e);
      }, this);
      return this.on(t, i, e).on(t, o, e);
    },
    addEventParent: function addEventParent(t) {
      return this._eventParents = this._eventParents || {}, this._eventParents[m(t)] = t, this;
    },
    removeEventParent: function removeEventParent(t) {
      return this._eventParents && delete this._eventParents[m(t)], this;
    },
    _propagateEvent: function _propagateEvent(t) {
      for (var i in this._eventParents) {
        this._eventParents[i].fire(t.type, h({
          layer: t.target,
          propagatedFrom: t.target
        }, t), !0);
      }
    }
  };
  Z.addEventListener = Z.on, Z.removeEventListener = Z.clearAllEventListeners = Z.off, Z.addOneTimeEventListener = Z.once, Z.fireEvent = Z.fire, Z.hasEventListeners = Z.listens;
  var E = S.extend(Z);

  function k(t, i, e) {
    this.x = e ? Math.round(t) : t, this.y = e ? Math.round(i) : i;
  }

  var B = Math.trunc || function (t) {
    return 0 < t ? Math.floor(t) : Math.ceil(t);
  };

  function A(t, i, e) {
    return t instanceof k ? t : g(t) ? new k(t[0], t[1]) : null == t ? t : "object" == _typeof(t) && "x" in t && "y" in t ? new k(t.x, t.y) : new k(t, i, e);
  }

  function I(t, i) {
    if (t) for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) {
      this.extend(e[n]);
    }
  }

  function O(t, i) {
    return !t || t instanceof I ? t : new I(t, i);
  }

  function R(t, i) {
    if (t) for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) {
      this.extend(e[n]);
    }
  }

  function N(t, i) {
    return t instanceof R ? t : new R(t, i);
  }

  function D(t, i, e) {
    if (isNaN(t) || isNaN(i)) throw new Error("Invalid LatLng object: (" + t + ", " + i + ")");
    this.lat = +t, this.lng = +i, void 0 !== e && (this.alt = +e);
  }

  function j(t, i, e) {
    return t instanceof D ? t : g(t) && "object" != _typeof(t[0]) ? 3 === t.length ? new D(t[0], t[1], t[2]) : 2 === t.length ? new D(t[0], t[1]) : null : null == t ? t : "object" == _typeof(t) && "lat" in t ? new D(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === i ? null : new D(t, i, e);
  }

  k.prototype = {
    clone: function clone() {
      return new k(this.x, this.y);
    },
    add: function add(t) {
      return this.clone()._add(A(t));
    },
    _add: function _add(t) {
      return this.x += t.x, this.y += t.y, this;
    },
    subtract: function subtract(t) {
      return this.clone()._subtract(A(t));
    },
    _subtract: function _subtract(t) {
      return this.x -= t.x, this.y -= t.y, this;
    },
    divideBy: function divideBy(t) {
      return this.clone()._divideBy(t);
    },
    _divideBy: function _divideBy(t) {
      return this.x /= t, this.y /= t, this;
    },
    multiplyBy: function multiplyBy(t) {
      return this.clone()._multiplyBy(t);
    },
    _multiplyBy: function _multiplyBy(t) {
      return this.x *= t, this.y *= t, this;
    },
    scaleBy: function scaleBy(t) {
      return new k(this.x * t.x, this.y * t.y);
    },
    unscaleBy: function unscaleBy(t) {
      return new k(this.x / t.x, this.y / t.y);
    },
    round: function round() {
      return this.clone()._round();
    },
    _round: function _round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    },
    floor: function floor() {
      return this.clone()._floor();
    },
    _floor: function _floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    },
    ceil: function ceil() {
      return this.clone()._ceil();
    },
    _ceil: function _ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    },
    trunc: function trunc() {
      return this.clone()._trunc();
    },
    _trunc: function _trunc() {
      return this.x = B(this.x), this.y = B(this.y), this;
    },
    distanceTo: function distanceTo(t) {
      var i = (t = A(t)).x - this.x,
          e = t.y - this.y;
      return Math.sqrt(i * i + e * e);
    },
    equals: function equals(t) {
      return (t = A(t)).x === this.x && t.y === this.y;
    },
    contains: function contains(t) {
      return t = A(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
    },
    toString: function toString() {
      return "Point(" + r(this.x) + ", " + r(this.y) + ")";
    }
  }, I.prototype = {
    extend: function extend(t) {
      return t = A(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this;
    },
    getCenter: function getCenter(t) {
      return new k((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t);
    },
    getBottomLeft: function getBottomLeft() {
      return new k(this.min.x, this.max.y);
    },
    getTopRight: function getTopRight() {
      return new k(this.max.x, this.min.y);
    },
    getTopLeft: function getTopLeft() {
      return this.min;
    },
    getBottomRight: function getBottomRight() {
      return this.max;
    },
    getSize: function getSize() {
      return this.max.subtract(this.min);
    },
    contains: function contains(t) {
      var i, e;
      return (t = ("number" == typeof t[0] || t instanceof k ? A : O)(t)) instanceof I ? (i = t.min, e = t.max) : i = e = t, i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y;
    },
    intersects: function intersects(t) {
      t = O(t);
      var i = this.min,
          e = this.max,
          n = t.min,
          o = t.max,
          s = o.x >= i.x && n.x <= e.x,
          r = o.y >= i.y && n.y <= e.y;
      return s && r;
    },
    overlaps: function overlaps(t) {
      t = O(t);
      var i = this.min,
          e = this.max,
          n = t.min,
          o = t.max,
          s = o.x > i.x && n.x < e.x,
          r = o.y > i.y && n.y < e.y;
      return s && r;
    },
    isValid: function isValid() {
      return !(!this.min || !this.max);
    }
  }, R.prototype = {
    extend: function extend(t) {
      var i,
          e,
          n = this._southWest,
          o = this._northEast;
      if (t instanceof D) e = i = t;else {
        if (!(t instanceof R)) return t ? this.extend(j(t) || N(t)) : this;
        if (i = t._southWest, e = t._northEast, !i || !e) return this;
      }
      return n || o ? (n.lat = Math.min(i.lat, n.lat), n.lng = Math.min(i.lng, n.lng), o.lat = Math.max(e.lat, o.lat), o.lng = Math.max(e.lng, o.lng)) : (this._southWest = new D(i.lat, i.lng), this._northEast = new D(e.lat, e.lng)), this;
    },
    pad: function pad(t) {
      var i = this._southWest,
          e = this._northEast,
          n = Math.abs(i.lat - e.lat) * t,
          o = Math.abs(i.lng - e.lng) * t;
      return new R(new D(i.lat - n, i.lng - o), new D(e.lat + n, e.lng + o));
    },
    getCenter: function getCenter() {
      return new D((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
    },
    getSouthWest: function getSouthWest() {
      return this._southWest;
    },
    getNorthEast: function getNorthEast() {
      return this._northEast;
    },
    getNorthWest: function getNorthWest() {
      return new D(this.getNorth(), this.getWest());
    },
    getSouthEast: function getSouthEast() {
      return new D(this.getSouth(), this.getEast());
    },
    getWest: function getWest() {
      return this._southWest.lng;
    },
    getSouth: function getSouth() {
      return this._southWest.lat;
    },
    getEast: function getEast() {
      return this._northEast.lng;
    },
    getNorth: function getNorth() {
      return this._northEast.lat;
    },
    contains: function contains(t) {
      t = ("number" == typeof t[0] || t instanceof D || "lat" in t ? j : N)(t);
      var i,
          e,
          n = this._southWest,
          o = this._northEast;
      return t instanceof R ? (i = t.getSouthWest(), e = t.getNorthEast()) : i = e = t, i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng;
    },
    intersects: function intersects(t) {
      t = N(t);
      var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          s = o.lat >= i.lat && n.lat <= e.lat,
          r = o.lng >= i.lng && n.lng <= e.lng;
      return s && r;
    },
    overlaps: function overlaps(t) {
      t = N(t);
      var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          s = o.lat > i.lat && n.lat < e.lat,
          r = o.lng > i.lng && n.lng < e.lng;
      return s && r;
    },
    toBBoxString: function toBBoxString() {
      return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
    },
    equals: function equals(t, i) {
      return !!t && (t = N(t), this._southWest.equals(t.getSouthWest(), i) && this._northEast.equals(t.getNorthEast(), i));
    },
    isValid: function isValid() {
      return !(!this._southWest || !this._northEast);
    }
  };
  var W,
      H = {
    latLngToPoint: function latLngToPoint(t, i) {
      var e = this.projection.project(t),
          n = this.scale(i);
      return this.transformation._transform(e, n);
    },
    pointToLatLng: function pointToLatLng(t, i) {
      var e = this.scale(i),
          n = this.transformation.untransform(t, e);
      return this.projection.unproject(n);
    },
    project: function project(t) {
      return this.projection.project(t);
    },
    unproject: function unproject(t) {
      return this.projection.unproject(t);
    },
    scale: function scale(t) {
      return 256 * Math.pow(2, t);
    },
    zoom: function zoom(t) {
      return Math.log(t / 256) / Math.LN2;
    },
    getProjectedBounds: function getProjectedBounds(t) {
      if (this.infinite) return null;
      var i = this.projection.bounds,
          e = this.scale(t);
      return new I(this.transformation.transform(i.min, e), this.transformation.transform(i.max, e));
    },
    infinite: !(D.prototype = {
      equals: function equals(t, i) {
        return !!t && (t = j(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === i ? 1e-9 : i));
      },
      toString: function toString(t) {
        return "LatLng(" + r(this.lat, t) + ", " + r(this.lng, t) + ")";
      },
      distanceTo: function distanceTo(t) {
        return F.distance(this, j(t));
      },
      wrap: function wrap() {
        return F.wrapLatLng(this);
      },
      toBounds: function toBounds(t) {
        var i = 180 * t / 40075017,
            e = i / Math.cos(Math.PI / 180 * this.lat);
        return N([this.lat - i, this.lng - e], [this.lat + i, this.lng + e]);
      },
      clone: function clone() {
        return new D(this.lat, this.lng, this.alt);
      }
    }),
    wrapLatLng: function wrapLatLng(t) {
      var i = this.wrapLng ? o(t.lng, this.wrapLng, !0) : t.lng;
      return new D(this.wrapLat ? o(t.lat, this.wrapLat, !0) : t.lat, i, t.alt);
    },
    wrapLatLngBounds: function wrapLatLngBounds(t) {
      var i = t.getCenter(),
          e = this.wrapLatLng(i),
          n = i.lat - e.lat,
          o = i.lng - e.lng;
      if (0 == n && 0 == o) return t;
      var s = t.getSouthWest(),
          r = t.getNorthEast();
      return new R(new D(s.lat - n, s.lng - o), new D(r.lat - n, r.lng - o));
    }
  },
      F = h({}, H, {
    wrapLng: [-180, 180],
    R: 6371e3,
    distance: function distance(t, i) {
      var e = Math.PI / 180,
          n = t.lat * e,
          o = i.lat * e,
          s = Math.sin((i.lat - t.lat) * e / 2),
          r = Math.sin((i.lng - t.lng) * e / 2),
          a = s * s + Math.cos(n) * Math.cos(o) * r * r,
          h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return this.R * h;
    }
  }),
      U = 6378137,
      V = {
    R: U,
    MAX_LATITUDE: 85.0511287798,
    project: function project(t) {
      var i = Math.PI / 180,
          e = this.MAX_LATITUDE,
          n = Math.max(Math.min(e, t.lat), -e),
          o = Math.sin(n * i);
      return new k(this.R * t.lng * i, this.R * Math.log((1 + o) / (1 - o)) / 2);
    },
    unproject: function unproject(t) {
      var i = 180 / Math.PI;
      return new D((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i, t.x * i / this.R);
    },
    bounds: new I([-(W = U * Math.PI), -W], [W, W])
  };

  function q(t, i, e, n) {
    if (g(t)) return this._a = t[0], this._b = t[1], this._c = t[2], void (this._d = t[3]);
    this._a = t, this._b = i, this._c = e, this._d = n;
  }

  function G(t, i, e, n) {
    return new q(t, i, e, n);
  }

  q.prototype = {
    transform: function transform(t, i) {
      return this._transform(t.clone(), i);
    },
    _transform: function _transform(t, i) {
      return i = i || 1, t.x = i * (this._a * t.x + this._b), t.y = i * (this._c * t.y + this._d), t;
    },
    untransform: function untransform(t, i) {
      return i = i || 1, new k((t.x / i - this._b) / this._a, (t.y / i - this._d) / this._c);
    }
  };
  var K,
      Y = h({}, F, {
    code: "EPSG:3857",
    projection: V,
    transformation: G(K = .5 / (Math.PI * V.R), .5, -K, .5)
  }),
      X = h({}, Y, {
    code: "EPSG:900913"
  });

  function J(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }

  function $(t, i) {
    for (var e, n, o, s, r = "", a = 0, h = t.length; a < h; a++) {
      for (e = 0, n = (o = t[a]).length; e < n; e++) {
        r += (e ? "L" : "M") + (s = o[e]).x + " " + s.y;
      }

      r += i ? Zt ? "z" : "x" : "";
    }

    return r || "M0 0";
  }

  var Q = document.documentElement.style,
      tt = ("ActiveXObject" in window),
      it = tt && !document.addEventListener,
      et = "msLaunchUri" in navigator && !("documentMode" in document),
      nt = kt("webkit"),
      ot = kt("android"),
      st = kt("android 2") || kt("android 3"),
      rt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
      at = ot && kt("Google") && rt < 537 && !("AudioNode" in window),
      ht = !!window.opera,
      ut = !et && kt("chrome"),
      lt = kt("gecko") && !nt && !ht && !tt,
      ct = !ut && kt("safari"),
      _t = kt("phantom"),
      dt = ("OTransition" in Q),
      pt = 0 === navigator.platform.indexOf("Win"),
      mt = tt && "transition" in Q,
      ft = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !st,
      gt = ("MozPerspective" in Q),
      vt = !window.L_DISABLE_3D && (mt || ft || gt) && !dt && !_t,
      yt = "undefined" != typeof orientation || kt("mobile"),
      xt = yt && nt,
      wt = yt && ft,
      Pt = !window.PointerEvent && window.MSPointerEvent,
      Lt = !(!window.PointerEvent && !Pt),
      bt = !window.L_NO_TOUCH && (Lt || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
      Tt = yt && ht,
      Mt = yt && lt,
      zt = 1 < (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI),
      Ct = function () {
    var t = !1;

    try {
      var i = Object.defineProperty({}, "passive", {
        get: function get() {
          t = !0;
        }
      });
      window.addEventListener("testPassiveEventSupport", a, i), window.removeEventListener("testPassiveEventSupport", a, i);
    } catch (t) {}

    return t;
  }(),
      St = !!document.createElement("canvas").getContext,
      Zt = !(!document.createElementNS || !J("svg").createSVGRect),
      Et = !Zt && function () {
    try {
      var t = document.createElement("div");
      t.innerHTML = '<v:shape adj="1"/>';
      var i = t.firstChild;
      return i.style.behavior = "url(#default#VML)", i && "object" == _typeof(i.adj);
    } catch (t) {
      return !1;
    }
  }();

  function kt(t) {
    return 0 <= navigator.userAgent.toLowerCase().indexOf(t);
  }

  var Bt = {
    ie: tt,
    ielt9: it,
    edge: et,
    webkit: nt,
    android: ot,
    android23: st,
    androidStock: at,
    opera: ht,
    chrome: ut,
    gecko: lt,
    safari: ct,
    phantom: _t,
    opera12: dt,
    win: pt,
    ie3d: mt,
    webkit3d: ft,
    gecko3d: gt,
    any3d: vt,
    mobile: yt,
    mobileWebkit: xt,
    mobileWebkit3d: wt,
    msPointer: Pt,
    pointer: Lt,
    touch: bt,
    mobileOpera: Tt,
    mobileGecko: Mt,
    retina: zt,
    passiveEvents: Ct,
    canvas: St,
    svg: Zt,
    vml: Et
  },
      At = Pt ? "MSPointerDown" : "pointerdown",
      It = Pt ? "MSPointerMove" : "pointermove",
      Ot = Pt ? "MSPointerUp" : "pointerup",
      Rt = Pt ? "MSPointerCancel" : "pointercancel",
      Nt = {},
      Dt = !1;

  function jt(t, i, e, n) {
    function o(t) {
      Ut(t, r);
    }

    var s, r, a, h, u, l, c, _;

    function d(t) {
      t.pointerType === (t.MSPOINTER_TYPE_MOUSE || "mouse") && 0 === t.buttons || Ut(t, h);
    }

    return "touchstart" === i ? (u = t, l = e, c = n, _ = p(function (t) {
      t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Ri(t), Ut(t, l);
    }), u["_leaflet_touchstart" + c] = _, u.addEventListener(At, _, !1), Dt || (document.addEventListener(At, Wt, !0), document.addEventListener(It, Ht, !0), document.addEventListener(Ot, Ft, !0), document.addEventListener(Rt, Ft, !0), Dt = !0)) : "touchmove" === i ? (h = e, (a = t)["_leaflet_touchmove" + n] = d, a.addEventListener(It, d, !1)) : "touchend" === i && (r = e, (s = t)["_leaflet_touchend" + n] = o, s.addEventListener(Ot, o, !1), s.addEventListener(Rt, o, !1)), this;
  }

  function Wt(t) {
    Nt[t.pointerId] = t;
  }

  function Ht(t) {
    Nt[t.pointerId] && (Nt[t.pointerId] = t);
  }

  function Ft(t) {
    delete Nt[t.pointerId];
  }

  function Ut(t, i) {
    for (var e in t.touches = [], Nt) {
      t.touches.push(Nt[e]);
    }

    t.changedTouches = [t], i(t);
  }

  var Vt = Pt ? "MSPointerDown" : Lt ? "pointerdown" : "touchstart",
      qt = Pt ? "MSPointerUp" : Lt ? "pointerup" : "touchend",
      Gt = "_leaflet_";
  var Kt,
      Yt,
      Xt,
      Jt,
      $t,
      Qt,
      ti = fi(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
      ii = fi(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
      ei = "webkitTransition" === ii || "OTransition" === ii ? ii + "End" : "transitionend";

  function ni(t) {
    return "string" == typeof t ? document.getElementById(t) : t;
  }

  function oi(t, i) {
    var e,
        n = t.style[i] || t.currentStyle && t.currentStyle[i];
    return n && "auto" !== n || !document.defaultView || (n = (e = document.defaultView.getComputedStyle(t, null)) ? e[i] : null), "auto" === n ? null : n;
  }

  function si(t, i, e) {
    var n = document.createElement(t);
    return n.className = i || "", e && e.appendChild(n), n;
  }

  function ri(t) {
    var i = t.parentNode;
    i && i.removeChild(t);
  }

  function ai(t) {
    for (; t.firstChild;) {
      t.removeChild(t.firstChild);
    }
  }

  function hi(t) {
    var i = t.parentNode;
    i && i.lastChild !== t && i.appendChild(t);
  }

  function ui(t) {
    var i = t.parentNode;
    i && i.firstChild !== t && i.insertBefore(t, i.firstChild);
  }

  function li(t, i) {
    if (void 0 !== t.classList) return t.classList.contains(i);
    var e = pi(t);
    return 0 < e.length && new RegExp("(^|\\s)" + i + "(\\s|$)").test(e);
  }

  function ci(t, i) {
    var e;
    if (void 0 !== t.classList) for (var n = l(i), o = 0, s = n.length; o < s; o++) {
      t.classList.add(n[o]);
    } else li(t, i) || di(t, ((e = pi(t)) ? e + " " : "") + i);
  }

  function _i(t, i) {
    void 0 !== t.classList ? t.classList.remove(i) : di(t, u((" " + pi(t) + " ").replace(" " + i + " ", " ")));
  }

  function di(t, i) {
    void 0 === t.className.baseVal ? t.className = i : t.className.baseVal = i;
  }

  function pi(t) {
    return t.correspondingElement && (t = t.correspondingElement), void 0 === t.className.baseVal ? t.className : t.className.baseVal;
  }

  function mi(t, i) {
    "opacity" in t.style ? t.style.opacity = i : "filter" in t.style && function (t, i) {
      var e = !1,
          n = "DXImageTransform.Microsoft.Alpha";

      try {
        e = t.filters.item(n);
      } catch (t) {
        if (1 === i) return;
      }

      i = Math.round(100 * i), e ? (e.Enabled = 100 !== i, e.Opacity = i) : t.style.filter += " progid:" + n + "(opacity=" + i + ")";
    }(t, i);
  }

  function fi(t) {
    for (var i = document.documentElement.style, e = 0; e < t.length; e++) {
      if (t[e] in i) return t[e];
    }

    return !1;
  }

  function gi(t, i, e) {
    var n = i || new k(0, 0);
    t.style[ti] = (mt ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (e ? " scale(" + e + ")" : "");
  }

  function vi(t, i) {
    t._leaflet_pos = i, vt ? gi(t, i) : (t.style.left = i.x + "px", t.style.top = i.y + "px");
  }

  function yi(t) {
    return t._leaflet_pos || new k(0, 0);
  }

  function xi() {
    zi(window, "dragstart", Ri);
  }

  function wi() {
    Si(window, "dragstart", Ri);
  }

  function Pi(t) {
    for (; -1 === t.tabIndex;) {
      t = t.parentNode;
    }

    t.style && (Li(), Qt = ($t = t).style.outline, t.style.outline = "none", zi(window, "keydown", Li));
  }

  function Li() {
    $t && ($t.style.outline = Qt, Qt = $t = void 0, Si(window, "keydown", Li));
  }

  function bi(t) {
    for (; !((t = t.parentNode).offsetWidth && t.offsetHeight || t === document.body);) {
      ;
    }

    return t;
  }

  function Ti(t) {
    var i = t.getBoundingClientRect();
    return {
      x: i.width / t.offsetWidth || 1,
      y: i.height / t.offsetHeight || 1,
      boundingClientRect: i
    };
  }

  Jt = "onselectstart" in document ? (Xt = function Xt() {
    zi(window, "selectstart", Ri);
  }, function () {
    Si(window, "selectstart", Ri);
  }) : (Yt = fi(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]), Xt = function Xt() {
    var t;
    Yt && (t = document.documentElement.style, Kt = t[Yt], t[Yt] = "none");
  }, function () {
    Yt && (document.documentElement.style[Yt] = Kt, Kt = void 0);
  });
  var Mi = {
    TRANSFORM: ti,
    TRANSITION: ii,
    TRANSITION_END: ei,
    get: ni,
    getStyle: oi,
    create: si,
    remove: ri,
    empty: ai,
    toFront: hi,
    toBack: ui,
    hasClass: li,
    addClass: ci,
    removeClass: _i,
    setClass: di,
    getClass: pi,
    setOpacity: mi,
    testProp: fi,
    setTransform: gi,
    setPosition: vi,
    getPosition: yi,
    disableTextSelection: Xt,
    enableTextSelection: Jt,
    disableImageDrag: xi,
    enableImageDrag: wi,
    preventOutline: Pi,
    restoreOutline: Li,
    getSizedParentNode: bi,
    getScale: Ti
  };

  function zi(t, i, e, n) {
    if ("object" == _typeof(i)) for (var o in i) {
      ki(t, o, i[o], e);
    } else for (var s = 0, r = (i = l(i)).length; s < r; s++) {
      ki(t, i[s], e, n);
    }
    return this;
  }

  var Ci = "_leaflet_events";

  function Si(t, i, e, n) {
    if ("object" == _typeof(i)) for (var o in i) {
      Bi(t, o, i[o], e);
    } else if (i) for (var s = 0, r = (i = l(i)).length; s < r; s++) {
      Bi(t, i[s], e, n);
    } else {
      for (var a in t[Ci]) {
        Bi(t, a, t[Ci][a]);
      }

      delete t[Ci];
    }
    return this;
  }

  function Zi() {
    return Lt && !et && !ct;
  }

  var Ei = {
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    wheel: !("onwheel" in window) && "mousewheel"
  };

  function ki(i, t, e, n) {
    var o = t + m(e) + (n ? "_" + m(n) : "");
    if (i[Ci] && i[Ci][o]) return this;

    var s,
        r,
        a,
        h,
        u,
        l,
        c = function c(t) {
      return e.call(n || i, t || window.event);
    },
        _ = c;

    function d(t) {
      if (Lt) {
        if (!t.isPrimary) return;
        if ("mouse" === t.pointerType) return;
      } else if (1 < t.touches.length) return;

      var i = Date.now(),
          e = i - (h || i);
      u = t.touches ? t.touches[0] : t, l = 0 < e && e <= 250, h = i;
    }

    function p(t) {
      if (l && !u.cancelBubble) {
        if (Lt) {
          if ("mouse" === t.pointerType) return;
          var i,
              e,
              n = {};

          for (e in u) {
            i = u[e], n[e] = i && i.bind ? i.bind(u) : i;
          }

          u = n;
        }

        u.type = "dblclick", u.button = 0, r(u), h = null;
      }
    }

    Lt && 0 === t.indexOf("touch") ? jt(i, t, c, o) : bt && "dblclick" === t && !Zi() ? (r = c, l = !1, (s = i)[Gt + Vt + (a = o)] = d, s[Gt + qt + a] = p, s[Gt + "dblclick" + a] = r, s.addEventListener(Vt, d, !!Ct && {
      passive: !1
    }), s.addEventListener(qt, p, !!Ct && {
      passive: !1
    }), s.addEventListener("dblclick", r, !1)) : "addEventListener" in i ? "touchstart" === t || "touchmove" === t || "wheel" === t || "mousewheel" === t ? i.addEventListener(Ei[t] || t, c, !!Ct && {
      passive: !1
    }) : "mouseenter" === t || "mouseleave" === t ? (c = function c(t) {
      t = t || window.event, Vi(i, t) && _(t);
    }, i.addEventListener(Ei[t], c, !1)) : i.addEventListener(t, _, !1) : "attachEvent" in i && i.attachEvent("on" + t, c), i[Ci] = i[Ci] || {}, i[Ci][o] = c;
  }

  function Bi(t, i, e, n) {
    var o,
        s,
        r,
        a,
        h,
        u,
        l,
        c,
        _ = i + m(e) + (n ? "_" + m(n) : ""),
        d = t[Ci] && t[Ci][_];

    if (!d) return this;
    Lt && 0 === i.indexOf("touch") ? (c = (u = t)["_leaflet_" + (l = i) + _], "touchstart" === l ? u.removeEventListener(At, c, !1) : "touchmove" === l ? u.removeEventListener(It, c, !1) : "touchend" === l && (u.removeEventListener(Ot, c, !1), u.removeEventListener(Rt, c, !1))) : bt && "dblclick" === i && !Zi() ? (r = (o = t)[Gt + Vt + (s = _)], a = o[Gt + qt + s], h = o[Gt + "dblclick" + s], o.removeEventListener(Vt, r, !!Ct && {
      passive: !1
    }), o.removeEventListener(qt, a, !!Ct && {
      passive: !1
    }), o.removeEventListener("dblclick", h, !1)) : "removeEventListener" in t ? t.removeEventListener(Ei[i] || i, d, !1) : "detachEvent" in t && t.detachEvent("on" + i, d), t[Ci][_] = null;
  }

  function Ai(t) {
    return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, Ui(t), this;
  }

  function Ii(t) {
    return ki(t, "wheel", Ai), this;
  }

  function Oi(t) {
    return zi(t, "mousedown touchstart dblclick", Ai), ki(t, "click", Fi), this;
  }

  function Ri(t) {
    return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
  }

  function Ni(t) {
    return Ri(t), Ai(t), this;
  }

  function Di(t, i) {
    if (!i) return new k(t.clientX, t.clientY);
    var e = Ti(i),
        n = e.boundingClientRect;
    return new k((t.clientX - n.left) / e.x - i.clientLeft, (t.clientY - n.top) / e.y - i.clientTop);
  }

  var ji = pt && ut ? 2 * window.devicePixelRatio : lt ? window.devicePixelRatio : 1;

  function Wi(t) {
    return et ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / ji : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0;
  }

  var Hi = {};

  function Fi(t) {
    Hi[t.type] = !0;
  }

  function Ui(t) {
    var i = Hi[t.type];
    return Hi[t.type] = !1, i;
  }

  function Vi(t, i) {
    var e = i.relatedTarget;
    if (!e) return !0;

    try {
      for (; e && e !== t;) {
        e = e.parentNode;
      }
    } catch (t) {
      return !1;
    }

    return e !== t;
  }

  var qi = {
    on: zi,
    off: Si,
    stopPropagation: Ai,
    disableScrollPropagation: Ii,
    disableClickPropagation: Oi,
    preventDefault: Ri,
    stop: Ni,
    getMousePosition: Di,
    getWheelDelta: Wi,
    fakeStop: Fi,
    skipped: Ui,
    isExternalTarget: Vi,
    addListener: zi,
    removeListener: Si
  },
      Gi = E.extend({
    run: function run(t, i, e, n) {
      this.stop(), this._el = t, this._inProgress = !0, this._duration = e || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = yi(t), this._offset = i.subtract(this._startPos), this._startTime = +new Date(), this.fire("start"), this._animate();
    },
    stop: function stop() {
      this._inProgress && (this._step(!0), this._complete());
    },
    _animate: function _animate() {
      this._animId = M(this._animate, this), this._step();
    },
    _step: function _step(t) {
      var i = new Date() - this._startTime,
          e = 1e3 * this._duration;
      i < e ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1), this._complete());
    },
    _runFrame: function _runFrame(t, i) {
      var e = this._startPos.add(this._offset.multiplyBy(t));

      i && e._round(), vi(this._el, e), this.fire("step");
    },
    _complete: function _complete() {
      z(this._animId), this._inProgress = !1, this.fire("end");
    },
    _easeOut: function _easeOut(t) {
      return 1 - Math.pow(1 - t, this._easeOutPower);
    }
  }),
      Ki = E.extend({
    options: {
      crs: Y,
      center: void 0,
      zoom: void 0,
      minZoom: void 0,
      maxZoom: void 0,
      layers: [],
      maxBounds: void 0,
      renderer: void 0,
      zoomAnimation: !0,
      zoomAnimationThreshold: 4,
      fadeAnimation: !0,
      markerZoomAnimation: !0,
      transform3DLimit: 8388608,
      zoomSnap: 1,
      zoomDelta: 1,
      trackResize: !0
    },
    initialize: function initialize(t, i) {
      i = c(this, i), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = p(this._onResize, this), this._initEvents(), i.maxBounds && this.setMaxBounds(i.maxBounds), void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)), i.center && void 0 !== i.zoom && this.setView(j(i.center), i.zoom, {
        reset: !0
      }), this.callInitHooks(), this._zoomAnimated = ii && vt && !Tt && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), zi(this._proxy, ei, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
    },
    setView: function setView(t, i, e) {
      if ((i = void 0 === i ? this._zoom : this._limitZoom(i), t = this._limitCenter(j(t), i, this.options.maxBounds), e = e || {}, this._stop(), this._loaded && !e.reset && !0 !== e) && (void 0 !== e.animate && (e.zoom = h({
        animate: e.animate
      }, e.zoom), e.pan = h({
        animate: e.animate,
        duration: e.duration
      }, e.pan)), this._zoom !== i ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, e.zoom) : this._tryAnimatedPan(t, e.pan))) return clearTimeout(this._sizeTimer), this;
      return this._resetView(t, i), this;
    },
    setZoom: function setZoom(t, i) {
      return this._loaded ? this.setView(this.getCenter(), t, {
        zoom: i
      }) : (this._zoom = t, this);
    },
    zoomIn: function zoomIn(t, i) {
      return t = t || (vt ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, i);
    },
    zoomOut: function zoomOut(t, i) {
      return t = t || (vt ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, i);
    },
    setZoomAround: function setZoomAround(t, i, e) {
      var n = this.getZoomScale(i),
          o = this.getSize().divideBy(2),
          s = (t instanceof k ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
          r = this.containerPointToLatLng(o.add(s));
      return this.setView(r, i, {
        zoom: e
      });
    },
    _getBoundsCenterZoom: function _getBoundsCenterZoom(t, i) {
      i = i || {}, t = t.getBounds ? t.getBounds() : N(t);
      var e = A(i.paddingTopLeft || i.padding || [0, 0]),
          n = A(i.paddingBottomRight || i.padding || [0, 0]),
          o = this.getBoundsZoom(t, !1, e.add(n));
      if ((o = "number" == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) === 1 / 0) return {
        center: t.getCenter(),
        zoom: o
      };
      var s = n.subtract(e).divideBy(2),
          r = this.project(t.getSouthWest(), o),
          a = this.project(t.getNorthEast(), o);
      return {
        center: this.unproject(r.add(a).divideBy(2).add(s), o),
        zoom: o
      };
    },
    fitBounds: function fitBounds(t, i) {
      if (!(t = N(t)).isValid()) throw new Error("Bounds are not valid.");

      var e = this._getBoundsCenterZoom(t, i);

      return this.setView(e.center, e.zoom, i);
    },
    fitWorld: function fitWorld(t) {
      return this.fitBounds([[-90, -180], [90, 180]], t);
    },
    panTo: function panTo(t, i) {
      return this.setView(t, this._zoom, {
        pan: i
      });
    },
    panBy: function panBy(t, i) {
      return i = i || {}, (t = A(t).round()).x || t.y ? (!0 === i.animate || this.getSize().contains(t) ? (this._panAnim || (this._panAnim = new Gi(), this._panAnim.on({
        step: this._onPanTransitionStep,
        end: this._onPanTransitionEnd
      }, this)), i.noMoveStart || this.fire("movestart"), !1 !== i.animate ? (ci(this._mapPane, "leaflet-pan-anim"), e = this._getMapPanePos().subtract(t).round(), this._panAnim.run(this._mapPane, e, i.duration || .25, i.easeLinearity)) : (this._rawPanBy(t), this.fire("move").fire("moveend"))) : this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this) : this.fire("moveend");
      var e;
    },
    flyTo: function flyTo(s, r, t) {
      if (!1 === (t = t || {}).animate || !vt) return this.setView(s, r, t);

      this._stop();

      var a = this.project(this.getCenter()),
          h = this.project(s),
          i = this.getSize(),
          u = this._zoom;
      s = j(s), r = void 0 === r ? u : r;
      var l = Math.max(i.x, i.y),
          n = l * this.getZoomScale(u, r),
          c = h.distanceTo(a) || 1,
          _ = 1.42,
          o = _ * _;

      function e(t) {
        var i = (n * n - l * l + (t ? -1 : 1) * o * o * c * c) / (2 * (t ? n : l) * o * c),
            e = Math.sqrt(i * i + 1) - i;
        return e < 1e-9 ? -18 : Math.log(e);
      }

      function d(t) {
        return (Math.exp(t) - Math.exp(-t)) / 2;
      }

      function p(t) {
        return (Math.exp(t) + Math.exp(-t)) / 2;
      }

      var m = e(0);

      function f(t) {
        return l * (p(m) * (d(i = m + _ * t) / p(i)) - d(m)) / o;
        var i;
      }

      var g = Date.now(),
          v = (e(1) - m) / _,
          y = t.duration ? 1e3 * t.duration : 1e3 * v * .8;

      return this._moveStart(!0, t.noMoveStart), function t() {
        var i,
            e,
            n = (Date.now() - g) / y,
            o = (i = n, (1 - Math.pow(1 - i, 1.5)) * v);
        n <= 1 ? (this._flyToFrame = M(t, this), this._move(this.unproject(a.add(h.subtract(a).multiplyBy(f(o) / c)), u), this.getScaleZoom(l / (e = o, l * (p(m) / p(m + _ * e))), u), {
          flyTo: !0
        })) : this._move(s, r)._moveEnd(!0);
      }.call(this), this;
    },
    flyToBounds: function flyToBounds(t, i) {
      var e = this._getBoundsCenterZoom(t, i);

      return this.flyTo(e.center, e.zoom, i);
    },
    setMaxBounds: function setMaxBounds(t) {
      return (t = N(t)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds));
    },
    setMinZoom: function setMinZoom(t) {
      var i = this.options.minZoom;
      return this.options.minZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
    },
    setMaxZoom: function setMaxZoom(t) {
      var i = this.options.maxZoom;
      return this.options.maxZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
    },
    panInsideBounds: function panInsideBounds(t, i) {
      this._enforcingBounds = !0;

      var e = this.getCenter(),
          n = this._limitCenter(e, this._zoom, N(t));

      return e.equals(n) || this.panTo(n, i), this._enforcingBounds = !1, this;
    },
    panInside: function panInside(t, i) {
      var e,
          n,
          o = A((i = i || {}).paddingTopLeft || i.padding || [0, 0]),
          s = A(i.paddingBottomRight || i.padding || [0, 0]),
          r = this.getCenter(),
          a = this.project(r),
          h = this.project(t),
          u = this.getPixelBounds(),
          l = u.getSize().divideBy(2),
          c = O([u.min.add(o), u.max.subtract(s)]);
      return c.contains(h) || (this._enforcingBounds = !0, e = a.subtract(h), n = A(h.x + e.x, h.y + e.y), (h.x < c.min.x || h.x > c.max.x) && (n.x = a.x - e.x, 0 < e.x ? n.x += l.x - o.x : n.x -= l.x - s.x), (h.y < c.min.y || h.y > c.max.y) && (n.y = a.y - e.y, 0 < e.y ? n.y += l.y - o.y : n.y -= l.y - s.y), this.panTo(this.unproject(n), i), this._enforcingBounds = !1), this;
    },
    invalidateSize: function invalidateSize(t) {
      if (!this._loaded) return this;
      t = h({
        animate: !1,
        pan: !0
      }, !0 === t ? {
        animate: !0
      } : t);
      var i = this.getSize();
      this._sizeChanged = !0, this._lastCenter = null;
      var e = this.getSize(),
          n = i.divideBy(2).round(),
          o = e.divideBy(2).round(),
          s = n.subtract(o);
      return s.x || s.y ? (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(p(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
        oldSize: i,
        newSize: e
      })) : this;
    },
    stop: function stop() {
      return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
    },
    locate: function locate(t) {
      if (t = this._locateOptions = h({
        timeout: 1e4,
        watch: !1
      }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
        code: 0,
        message: "Geolocation not supported."
      }), this;
      var i = p(this._handleGeolocationResponse, this),
          e = p(this._handleGeolocationError, this);
      return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(i, e, t) : navigator.geolocation.getCurrentPosition(i, e, t), this;
    },
    stopLocate: function stopLocate() {
      return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
    },
    _handleGeolocationError: function _handleGeolocationError(t) {
      var i = t.code,
          e = t.message || (1 === i ? "permission denied" : 2 === i ? "position unavailable" : "timeout");
      this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
        code: i,
        message: "Geolocation error: " + e + "."
      });
    },
    _handleGeolocationResponse: function _handleGeolocationResponse(t) {
      var i,
          e = new D(t.coords.latitude, t.coords.longitude),
          n = e.toBounds(2 * t.coords.accuracy),
          o = this._locateOptions;
      o.setView && (i = this.getBoundsZoom(n), this.setView(e, o.maxZoom ? Math.min(i, o.maxZoom) : i));
      var s = {
        latlng: e,
        bounds: n,
        timestamp: t.timestamp
      };

      for (var r in t.coords) {
        "number" == typeof t.coords[r] && (s[r] = t.coords[r]);
      }

      this.fire("locationfound", s);
    },
    addHandler: function addHandler(t, i) {
      if (!i) return this;
      var e = this[t] = new i(this);
      return this._handlers.push(e), this.options[t] && e.enable(), this;
    },
    remove: function remove() {
      if (this._initEvents(!0), this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");

      try {
        delete this._container._leaflet_id, delete this._containerId;
      } catch (t) {
        this._container._leaflet_id = void 0, this._containerId = void 0;
      }

      var t;

      for (t in void 0 !== this._locationWatchId && this.stopLocate(), this._stop(), ri(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (z(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) {
        this._layers[t].remove();
      }

      for (t in this._panes) {
        ri(this._panes[t]);
      }

      return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
    },
    createPane: function createPane(t, i) {
      var e = si("div", "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), i || this._mapPane);
      return t && (this._panes[t] = e), e;
    },
    getCenter: function getCenter() {
      return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint());
    },
    getZoom: function getZoom() {
      return this._zoom;
    },
    getBounds: function getBounds() {
      var t = this.getPixelBounds();
      return new R(this.unproject(t.getBottomLeft()), this.unproject(t.getTopRight()));
    },
    getMinZoom: function getMinZoom() {
      return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom;
    },
    getMaxZoom: function getMaxZoom() {
      return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
    },
    getBoundsZoom: function getBoundsZoom(t, i, e) {
      t = N(t), e = A(e || [0, 0]);

      var n = this.getZoom() || 0,
          o = this.getMinZoom(),
          s = this.getMaxZoom(),
          r = t.getNorthWest(),
          a = t.getSouthEast(),
          h = this.getSize().subtract(e),
          u = O(this.project(a, n), this.project(r, n)).getSize(),
          l = vt ? this.options.zoomSnap : 1,
          c = h.x / u.x,
          _ = h.y / u.y,
          d = i ? Math.max(c, _) : Math.min(c, _),
          n = this.getScaleZoom(d, n);

      return l && (n = Math.round(n / (l / 100)) * (l / 100), n = i ? Math.ceil(n / l) * l : Math.floor(n / l) * l), Math.max(o, Math.min(s, n));
    },
    getSize: function getSize() {
      return this._size && !this._sizeChanged || (this._size = new k(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
    },
    getPixelBounds: function getPixelBounds(t, i) {
      var e = this._getTopLeftPoint(t, i);

      return new I(e, e.add(this.getSize()));
    },
    getPixelOrigin: function getPixelOrigin() {
      return this._checkIfLoaded(), this._pixelOrigin;
    },
    getPixelWorldBounds: function getPixelWorldBounds(t) {
      return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t);
    },
    getPane: function getPane(t) {
      return "string" == typeof t ? this._panes[t] : t;
    },
    getPanes: function getPanes() {
      return this._panes;
    },
    getContainer: function getContainer() {
      return this._container;
    },
    getZoomScale: function getZoomScale(t, i) {
      var e = this.options.crs;
      return i = void 0 === i ? this._zoom : i, e.scale(t) / e.scale(i);
    },
    getScaleZoom: function getScaleZoom(t, i) {
      var e = this.options.crs;
      i = void 0 === i ? this._zoom : i;
      var n = e.zoom(t * e.scale(i));
      return isNaN(n) ? 1 / 0 : n;
    },
    project: function project(t, i) {
      return i = void 0 === i ? this._zoom : i, this.options.crs.latLngToPoint(j(t), i);
    },
    unproject: function unproject(t, i) {
      return i = void 0 === i ? this._zoom : i, this.options.crs.pointToLatLng(A(t), i);
    },
    layerPointToLatLng: function layerPointToLatLng(t) {
      var i = A(t).add(this.getPixelOrigin());
      return this.unproject(i);
    },
    latLngToLayerPoint: function latLngToLayerPoint(t) {
      return this.project(j(t))._round()._subtract(this.getPixelOrigin());
    },
    wrapLatLng: function wrapLatLng(t) {
      return this.options.crs.wrapLatLng(j(t));
    },
    wrapLatLngBounds: function wrapLatLngBounds(t) {
      return this.options.crs.wrapLatLngBounds(N(t));
    },
    distance: function distance(t, i) {
      return this.options.crs.distance(j(t), j(i));
    },
    containerPointToLayerPoint: function containerPointToLayerPoint(t) {
      return A(t).subtract(this._getMapPanePos());
    },
    layerPointToContainerPoint: function layerPointToContainerPoint(t) {
      return A(t).add(this._getMapPanePos());
    },
    containerPointToLatLng: function containerPointToLatLng(t) {
      var i = this.containerPointToLayerPoint(A(t));
      return this.layerPointToLatLng(i);
    },
    latLngToContainerPoint: function latLngToContainerPoint(t) {
      return this.layerPointToContainerPoint(this.latLngToLayerPoint(j(t)));
    },
    mouseEventToContainerPoint: function mouseEventToContainerPoint(t) {
      return Di(t, this._container);
    },
    mouseEventToLayerPoint: function mouseEventToLayerPoint(t) {
      return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
    },
    mouseEventToLatLng: function mouseEventToLatLng(t) {
      return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
    },
    _initContainer: function _initContainer(t) {
      var i = this._container = ni(t);
      if (!i) throw new Error("Map container not found.");
      if (i._leaflet_id) throw new Error("Map container is already initialized.");
      zi(i, "scroll", this._onScroll, this), this._containerId = m(i);
    },
    _initLayout: function _initLayout() {
      var t = this._container;
      this._fadeAnimated = this.options.fadeAnimation && vt, ci(t, "leaflet-container" + (bt ? " leaflet-touch" : "") + (zt ? " leaflet-retina" : "") + (it ? " leaflet-oldie" : "") + (ct ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
      var i = oi(t, "position");
      "absolute" !== i && "relative" !== i && "fixed" !== i && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
    },
    _initPanes: function _initPanes() {
      var t = this._panes = {};
      this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), vi(this._mapPane, new k(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (ci(t.markerPane, "leaflet-zoom-hide"), ci(t.shadowPane, "leaflet-zoom-hide"));
    },
    _resetView: function _resetView(t, i) {
      vi(this._mapPane, new k(0, 0));
      var e = !this._loaded;
      this._loaded = !0, i = this._limitZoom(i), this.fire("viewprereset");
      var n = this._zoom !== i;
      this._moveStart(n, !1)._move(t, i)._moveEnd(n), this.fire("viewreset"), e && this.fire("load");
    },
    _moveStart: function _moveStart(t, i) {
      return t && this.fire("zoomstart"), i || this.fire("movestart"), this;
    },
    _move: function _move(t, i, e) {
      void 0 === i && (i = this._zoom);
      var n = this._zoom !== i;
      return this._zoom = i, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), (n || e && e.pinch) && this.fire("zoom", e), this.fire("move", e);
    },
    _moveEnd: function _moveEnd(t) {
      return t && this.fire("zoomend"), this.fire("moveend");
    },
    _stop: function _stop() {
      return z(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
    },
    _rawPanBy: function _rawPanBy(t) {
      vi(this._mapPane, this._getMapPanePos().subtract(t));
    },
    _getZoomSpan: function _getZoomSpan() {
      return this.getMaxZoom() - this.getMinZoom();
    },
    _panInsideMaxBounds: function _panInsideMaxBounds() {
      this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
    },
    _checkIfLoaded: function _checkIfLoaded() {
      if (!this._loaded) throw new Error("Set map center and zoom first.");
    },
    _initEvents: function _initEvents(t) {
      this._targets = {};
      var i = t ? Si : zi;
      i((this._targets[m(this._container)] = this)._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && i(window, "resize", this._onResize, this), vt && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
    },
    _onResize: function _onResize() {
      z(this._resizeRequest), this._resizeRequest = M(function () {
        this.invalidateSize({
          debounceMoveend: !0
        });
      }, this);
    },
    _onScroll: function _onScroll() {
      this._container.scrollTop = 0, this._container.scrollLeft = 0;
    },
    _onMoveEnd: function _onMoveEnd() {
      var t = this._getMapPanePos();

      Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
    },
    _findEventTargets: function _findEventTargets(t, i) {
      for (var e, n = [], o = "mouseout" === i || "mouseover" === i, s = t.target || t.srcElement, r = !1; s;) {
        if ((e = this._targets[m(s)]) && ("click" === i || "preclick" === i) && !t._simulated && this._draggableMoved(e)) {
          r = !0;
          break;
        }

        if (e && e.listens(i, !0)) {
          if (o && !Vi(s, t)) break;
          if (n.push(e), o) break;
        }

        if (s === this._container) break;
        s = s.parentNode;
      }

      return n.length || r || o || !Vi(s, t) || (n = [this]), n;
    },
    _handleDOMEvent: function _handleDOMEvent(t) {
      var i;
      this._loaded && !Ui(t) && ("mousedown" !== (i = t.type) && "keypress" !== i && "keyup" !== i && "keydown" !== i || Pi(t.target || t.srcElement), this._fireDOMEvent(t, i));
    },
    _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
    _fireDOMEvent: function _fireDOMEvent(t, i, e) {
      var n;

      if ("click" === t.type && ((n = h({}, t)).type = "preclick", this._fireDOMEvent(n, n.type, e)), !t._stopped && (e = (e || []).concat(this._findEventTargets(t, i))).length) {
        var o = e[0];
        "contextmenu" === i && o.listens(i, !0) && Ri(t);
        var s,
            r = {
          originalEvent: t
        };
        "keypress" !== t.type && "keydown" !== t.type && "keyup" !== t.type && (s = o.getLatLng && (!o._radius || o._radius <= 10), r.containerPoint = s ? this.latLngToContainerPoint(o.getLatLng()) : this.mouseEventToContainerPoint(t), r.layerPoint = this.containerPointToLayerPoint(r.containerPoint), r.latlng = s ? o.getLatLng() : this.layerPointToLatLng(r.layerPoint));

        for (var a = 0; a < e.length; a++) {
          if (e[a].fire(i, r, !0), r.originalEvent._stopped || !1 === e[a].options.bubblingMouseEvents && -1 !== v(this._mouseEvents, i)) return;
        }
      }
    },
    _draggableMoved: function _draggableMoved(t) {
      return (t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
    },
    _clearHandlers: function _clearHandlers() {
      for (var t = 0, i = this._handlers.length; t < i; t++) {
        this._handlers[t].disable();
      }
    },
    whenReady: function whenReady(t, i) {
      return this._loaded ? t.call(i || this, {
        target: this
      }) : this.on("load", t, i), this;
    },
    _getMapPanePos: function _getMapPanePos() {
      return yi(this._mapPane) || new k(0, 0);
    },
    _moved: function _moved() {
      var t = this._getMapPanePos();

      return t && !t.equals([0, 0]);
    },
    _getTopLeftPoint: function _getTopLeftPoint(t, i) {
      return (t && void 0 !== i ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin()).subtract(this._getMapPanePos());
    },
    _getNewPixelOrigin: function _getNewPixelOrigin(t, i) {
      var e = this.getSize()._divideBy(2);

      return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round();
    },
    _latLngToNewLayerPoint: function _latLngToNewLayerPoint(t, i, e) {
      var n = this._getNewPixelOrigin(e, i);

      return this.project(t, i)._subtract(n);
    },
    _latLngBoundsToNewLayerBounds: function _latLngBoundsToNewLayerBounds(t, i, e) {
      var n = this._getNewPixelOrigin(e, i);

      return O([this.project(t.getSouthWest(), i)._subtract(n), this.project(t.getNorthWest(), i)._subtract(n), this.project(t.getSouthEast(), i)._subtract(n), this.project(t.getNorthEast(), i)._subtract(n)]);
    },
    _getCenterLayerPoint: function _getCenterLayerPoint() {
      return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
    },
    _getCenterOffset: function _getCenterOffset(t) {
      return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
    },
    _limitCenter: function _limitCenter(t, i, e) {
      if (!e) return t;

      var n = this.project(t, i),
          o = this.getSize().divideBy(2),
          s = new I(n.subtract(o), n.add(o)),
          r = this._getBoundsOffset(s, e, i);

      return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), i);
    },
    _limitOffset: function _limitOffset(t, i) {
      if (!i) return t;
      var e = this.getPixelBounds(),
          n = new I(e.min.add(t), e.max.add(t));
      return t.add(this._getBoundsOffset(n, i));
    },
    _getBoundsOffset: function _getBoundsOffset(t, i, e) {
      var n = O(this.project(i.getNorthEast(), e), this.project(i.getSouthWest(), e)),
          o = n.min.subtract(t.min),
          s = n.max.subtract(t.max);
      return new k(this._rebound(o.x, -s.x), this._rebound(o.y, -s.y));
    },
    _rebound: function _rebound(t, i) {
      return 0 < t + i ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i));
    },
    _limitZoom: function _limitZoom(t) {
      var i = this.getMinZoom(),
          e = this.getMaxZoom(),
          n = vt ? this.options.zoomSnap : 1;
      return n && (t = Math.round(t / n) * n), Math.max(i, Math.min(e, t));
    },
    _onPanTransitionStep: function _onPanTransitionStep() {
      this.fire("move");
    },
    _onPanTransitionEnd: function _onPanTransitionEnd() {
      _i(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
    },
    _tryAnimatedPan: function _tryAnimatedPan(t, i) {
      var e = this._getCenterOffset(t)._trunc();

      return !(!0 !== (i && i.animate) && !this.getSize().contains(e)) && (this.panBy(e, i), !0);
    },
    _createAnimProxy: function _createAnimProxy() {
      var t = this._proxy = si("div", "leaflet-proxy leaflet-zoom-animated");
      this._panes.mapPane.appendChild(t), this.on("zoomanim", function (t) {
        var i = ti,
            e = this._proxy.style[i];
        gi(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)), e === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
      }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
    },
    _destroyAnimProxy: function _destroyAnimProxy() {
      ri(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
    },
    _animMoveEnd: function _animMoveEnd() {
      var t = this.getCenter(),
          i = this.getZoom();
      gi(this._proxy, this.project(t, i), this.getZoomScale(i, 1));
    },
    _catchTransitionEnd: function _catchTransitionEnd(t) {
      this._animatingZoom && 0 <= t.propertyName.indexOf("transform") && this._onZoomTransitionEnd();
    },
    _nothingToAnimate: function _nothingToAnimate() {
      return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
    },
    _tryAnimatedZoom: function _tryAnimatedZoom(t, i, e) {
      if (this._animatingZoom) return !0;
      if (e = e || {}, !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold) return !1;

      var n = this.getZoomScale(i),
          o = this._getCenterOffset(t)._divideBy(1 - 1 / n);

      return !(!0 !== e.animate && !this.getSize().contains(o)) && (M(function () {
        this._moveStart(!0, !1)._animateZoom(t, i, !0);
      }, this), !0);
    },
    _animateZoom: function _animateZoom(t, i, e, n) {
      this._mapPane && (e && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = i, ci(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
        center: t,
        zoom: i,
        noUpdate: n
      }), setTimeout(p(this._onZoomTransitionEnd, this), 250));
    },
    _onZoomTransitionEnd: function _onZoomTransitionEnd() {
      this._animatingZoom && (this._mapPane && _i(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), M(function () {
        this._moveEnd(!0);
      }, this));
    }
  });

  function Yi(t) {
    return new Xi(t);
  }

  var Xi = S.extend({
    options: {
      position: "topright"
    },
    initialize: function initialize(t) {
      c(this, t);
    },
    getPosition: function getPosition() {
      return this.options.position;
    },
    setPosition: function setPosition(t) {
      var i = this._map;
      return i && i.removeControl(this), this.options.position = t, i && i.addControl(this), this;
    },
    getContainer: function getContainer() {
      return this._container;
    },
    addTo: function addTo(t) {
      this.remove(), this._map = t;
      var i = this._container = this.onAdd(t),
          e = this.getPosition(),
          n = t._controlCorners[e];
      return ci(i, "leaflet-control"), -1 !== e.indexOf("bottom") ? n.insertBefore(i, n.firstChild) : n.appendChild(i), this._map.on("unload", this.remove, this), this;
    },
    remove: function remove() {
      return this._map && (ri(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null), this;
    },
    _refocusOnMap: function _refocusOnMap(t) {
      this._map && t && 0 < t.screenX && 0 < t.screenY && this._map.getContainer().focus();
    }
  });
  Ki.include({
    addControl: function addControl(t) {
      return t.addTo(this), this;
    },
    removeControl: function removeControl(t) {
      return t.remove(), this;
    },
    _initControlPos: function _initControlPos() {
      var n = this._controlCorners = {},
          o = "leaflet-",
          s = this._controlContainer = si("div", o + "control-container", this._container);

      function t(t, i) {
        var e = o + t + " " + o + i;
        n[t + i] = si("div", e, s);
      }

      t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right");
    },
    _clearControlPos: function _clearControlPos() {
      for (var t in this._controlCorners) {
        ri(this._controlCorners[t]);
      }

      ri(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
    }
  });
  var Ji = Xi.extend({
    options: {
      collapsed: !0,
      position: "topright",
      autoZIndex: !0,
      hideSingleBase: !1,
      sortLayers: !1,
      sortFunction: function sortFunction(t, i, e, n) {
        return e < n ? -1 : n < e ? 1 : 0;
      }
    },
    initialize: function initialize(t, i, e) {
      for (var n in c(this, e), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, t) {
        this._addLayer(t[n], n);
      }

      for (n in i) {
        this._addLayer(i[n], n, !0);
      }
    },
    onAdd: function onAdd(t) {
      this._initLayout(), this._update(), (this._map = t).on("zoomend", this._checkDisabledLayers, this);

      for (var i = 0; i < this._layers.length; i++) {
        this._layers[i].layer.on("add remove", this._onLayerChange, this);
      }

      return this._container;
    },
    addTo: function addTo(t) {
      return Xi.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
    },
    onRemove: function onRemove() {
      this._map.off("zoomend", this._checkDisabledLayers, this);

      for (var t = 0; t < this._layers.length; t++) {
        this._layers[t].layer.off("add remove", this._onLayerChange, this);
      }
    },
    addBaseLayer: function addBaseLayer(t, i) {
      return this._addLayer(t, i), this._map ? this._update() : this;
    },
    addOverlay: function addOverlay(t, i) {
      return this._addLayer(t, i, !0), this._map ? this._update() : this;
    },
    removeLayer: function removeLayer(t) {
      t.off("add remove", this._onLayerChange, this);

      var i = this._getLayer(m(t));

      return i && this._layers.splice(this._layers.indexOf(i), 1), this._map ? this._update() : this;
    },
    expand: function expand() {
      ci(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
      var t = this._map.getSize().y - (this._container.offsetTop + 50);
      return t < this._section.clientHeight ? (ci(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : _i(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
    },
    collapse: function collapse() {
      return _i(this._container, "leaflet-control-layers-expanded"), this;
    },
    _initLayout: function _initLayout() {
      var t = "leaflet-control-layers",
          i = this._container = si("div", t),
          e = this.options.collapsed;
      i.setAttribute("aria-haspopup", !0), Oi(i), Ii(i);
      var n = this._section = si("section", t + "-list");
      e && (this._map.on("click", this.collapse, this), ot || zi(i, {
        mouseenter: this.expand,
        mouseleave: this.collapse
      }, this));
      var o = this._layersLink = si("a", t + "-toggle", i);
      o.href = "#", o.title = "Layers", bt ? (zi(o, "click", Ni), zi(o, "click", this.expand, this)) : zi(o, "focus", this.expand, this), e || this.expand(), this._baseLayersList = si("div", t + "-base", n), this._separator = si("div", t + "-separator", n), this._overlaysList = si("div", t + "-overlays", n), i.appendChild(n);
    },
    _getLayer: function _getLayer(t) {
      for (var i = 0; i < this._layers.length; i++) {
        if (this._layers[i] && m(this._layers[i].layer) === t) return this._layers[i];
      }
    },
    _addLayer: function _addLayer(t, i, e) {
      this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
        layer: t,
        name: i,
        overlay: e
      }), this.options.sortLayers && this._layers.sort(p(function (t, i) {
        return this.options.sortFunction(t.layer, i.layer, t.name, i.name);
      }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
    },
    _update: function _update() {
      if (!this._container) return this;
      ai(this._baseLayersList), ai(this._overlaysList), this._layerControlInputs = [];

      for (var t, i, e, n = 0, o = 0; o < this._layers.length; o++) {
        e = this._layers[o], this._addItem(e), i = i || e.overlay, t = t || !e.overlay, n += e.overlay ? 0 : 1;
      }

      return this.options.hideSingleBase && (t = t && 1 < n, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = i && t ? "" : "none", this;
    },
    _onLayerChange: function _onLayerChange(t) {
      this._handlingClick || this._update();

      var i = this._getLayer(m(t.target)),
          e = i.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;

      e && this._map.fire(e, i);
    },
    _createRadioElement: function _createRadioElement(t, i) {
      var e = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>",
          n = document.createElement("div");
      return n.innerHTML = e, n.firstChild;
    },
    _addItem: function _addItem(t) {
      var i,
          e = document.createElement("label"),
          n = this._map.hasLayer(t.layer);

      t.overlay ? ((i = document.createElement("input")).type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = n) : i = this._createRadioElement("leaflet-base-layers_" + m(this), n), this._layerControlInputs.push(i), i.layerId = m(t.layer), zi(i, "click", this._onInputClick, this);
      var o = document.createElement("span");
      o.innerHTML = " " + t.name;
      var s = document.createElement("div");
      return e.appendChild(s), s.appendChild(i), s.appendChild(o), (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e), this._checkDisabledLayers(), e;
    },
    _onInputClick: function _onInputClick() {
      var t,
          i,
          e = this._layerControlInputs,
          n = [],
          o = [];
      this._handlingClick = !0;

      for (var s = e.length - 1; 0 <= s; s--) {
        t = e[s], i = this._getLayer(t.layerId).layer, t.checked ? n.push(i) : t.checked || o.push(i);
      }

      for (s = 0; s < o.length; s++) {
        this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
      }

      for (s = 0; s < n.length; s++) {
        this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
      }

      this._handlingClick = !1, this._refocusOnMap();
    },
    _checkDisabledLayers: function _checkDisabledLayers() {
      for (var t, i, e = this._layerControlInputs, n = this._map.getZoom(), o = e.length - 1; 0 <= o; o--) {
        t = e[o], i = this._getLayer(t.layerId).layer, t.disabled = void 0 !== i.options.minZoom && n < i.options.minZoom || void 0 !== i.options.maxZoom && n > i.options.maxZoom;
      }
    },
    _expandIfNotCollapsed: function _expandIfNotCollapsed() {
      return this._map && !this.options.collapsed && this.expand(), this;
    },
    _expand: function _expand() {
      return this.expand();
    },
    _collapse: function _collapse() {
      return this.collapse();
    }
  }),
      $i = Xi.extend({
    options: {
      position: "topleft",
      zoomInText: "+",
      zoomInTitle: "Zoom in",
      zoomOutText: "&#x2212;",
      zoomOutTitle: "Zoom out"
    },
    onAdd: function onAdd(t) {
      var i = "leaflet-control-zoom",
          e = si("div", i + " leaflet-bar"),
          n = this.options;
      return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + "-in", e, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + "-out", e, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), e;
    },
    onRemove: function onRemove(t) {
      t.off("zoomend zoomlevelschange", this._updateDisabled, this);
    },
    disable: function disable() {
      return this._disabled = !0, this._updateDisabled(), this;
    },
    enable: function enable() {
      return this._disabled = !1, this._updateDisabled(), this;
    },
    _zoomIn: function _zoomIn(t) {
      !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _zoomOut: function _zoomOut(t) {
      !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
    },
    _createButton: function _createButton(t, i, e, n, o) {
      var s = si("a", e, n);
      return s.innerHTML = t, s.href = "#", s.title = i, s.setAttribute("role", "button"), s.setAttribute("aria-label", i), Oi(s), zi(s, "click", Ni), zi(s, "click", o, this), zi(s, "click", this._refocusOnMap, this), s;
    },
    _updateDisabled: function _updateDisabled() {
      var t = this._map,
          i = "leaflet-disabled";
      _i(this._zoomInButton, i), _i(this._zoomOutButton, i), !this._disabled && t._zoom !== t.getMinZoom() || ci(this._zoomOutButton, i), !this._disabled && t._zoom !== t.getMaxZoom() || ci(this._zoomInButton, i);
    }
  });
  Ki.mergeOptions({
    zoomControl: !0
  }), Ki.addInitHook(function () {
    this.options.zoomControl && (this.zoomControl = new $i(), this.addControl(this.zoomControl));
  });
  var Qi = Xi.extend({
    options: {
      position: "bottomleft",
      maxWidth: 100,
      metric: !0,
      imperial: !0
    },
    onAdd: function onAdd(t) {
      var i = "leaflet-control-scale",
          e = si("div", i),
          n = this.options;
      return this._addScales(n, i + "-line", e), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), e;
    },
    onRemove: function onRemove(t) {
      t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
    },
    _addScales: function _addScales(t, i, e) {
      t.metric && (this._mScale = si("div", i, e)), t.imperial && (this._iScale = si("div", i, e));
    },
    _update: function _update() {
      var t = this._map,
          i = t.getSize().y / 2,
          e = t.distance(t.containerPointToLatLng([0, i]), t.containerPointToLatLng([this.options.maxWidth, i]));

      this._updateScales(e);
    },
    _updateScales: function _updateScales(t) {
      this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
    },
    _updateMetric: function _updateMetric(t) {
      var i = this._getRoundNum(t),
          e = i < 1e3 ? i + " m" : i / 1e3 + " km";

      this._updateScale(this._mScale, e, i / t);
    },
    _updateImperial: function _updateImperial(t) {
      var i,
          e,
          n,
          o = 3.2808399 * t;
      5280 < o ? (i = o / 5280, e = this._getRoundNum(i), this._updateScale(this._iScale, e + " mi", e / i)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o));
    },
    _updateScale: function _updateScale(t, i, e) {
      t.style.width = Math.round(this.options.maxWidth * e) + "px", t.innerHTML = i;
    },
    _getRoundNum: function _getRoundNum(t) {
      var i = Math.pow(10, (Math.floor(t) + "").length - 1),
          e = t / i;
      return i * (e = 10 <= e ? 10 : 5 <= e ? 5 : 3 <= e ? 3 : 2 <= e ? 2 : 1);
    }
  }),
      te = Xi.extend({
    options: {
      position: "bottomright",
      prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
    },
    initialize: function initialize(t) {
      c(this, t), this._attributions = {};
    },
    onAdd: function onAdd(t) {
      for (var i in (t.attributionControl = this)._container = si("div", "leaflet-control-attribution"), Oi(this._container), t._layers) {
        t._layers[i].getAttribution && this.addAttribution(t._layers[i].getAttribution());
      }

      return this._update(), this._container;
    },
    setPrefix: function setPrefix(t) {
      return this.options.prefix = t, this._update(), this;
    },
    addAttribution: function addAttribution(t) {
      return t && (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update()), this;
    },
    removeAttribution: function removeAttribution(t) {
      return t && this._attributions[t] && (this._attributions[t]--, this._update()), this;
    },
    _update: function _update() {
      if (this._map) {
        var t = [];

        for (var i in this._attributions) {
          this._attributions[i] && t.push(i);
        }

        var e = [];
        this.options.prefix && e.push(this.options.prefix), t.length && e.push(t.join(", ")), this._container.innerHTML = e.join(" | ");
      }
    }
  });
  Ki.mergeOptions({
    attributionControl: !0
  }), Ki.addInitHook(function () {
    this.options.attributionControl && new te().addTo(this);
  });
  Xi.Layers = Ji, Xi.Zoom = $i, Xi.Scale = Qi, Xi.Attribution = te, Yi.layers = function (t, i, e) {
    return new Ji(t, i, e);
  }, Yi.zoom = function (t) {
    return new $i(t);
  }, Yi.scale = function (t) {
    return new Qi(t);
  }, Yi.attribution = function (t) {
    return new te(t);
  };
  var ie = S.extend({
    initialize: function initialize(t) {
      this._map = t;
    },
    enable: function enable() {
      return this._enabled || (this._enabled = !0, this.addHooks()), this;
    },
    disable: function disable() {
      return this._enabled && (this._enabled = !1, this.removeHooks()), this;
    },
    enabled: function enabled() {
      return !!this._enabled;
    }
  });

  ie.addTo = function (t, i) {
    return t.addHandler(i, this), this;
  };

  var ee,
      ne = {
    Events: Z
  },
      oe = bt ? "touchstart mousedown" : "mousedown",
      se = {
    mousedown: "mouseup",
    touchstart: "touchend",
    pointerdown: "touchend",
    MSPointerDown: "touchend"
  },
      re = {
    mousedown: "mousemove",
    touchstart: "touchmove",
    pointerdown: "touchmove",
    MSPointerDown: "touchmove"
  },
      ae = E.extend({
    options: {
      clickTolerance: 3
    },
    initialize: function initialize(t, i, e, n) {
      c(this, n), this._element = t, this._dragStartTarget = i || t, this._preventOutline = e;
    },
    enable: function enable() {
      this._enabled || (zi(this._dragStartTarget, oe, this._onDown, this), this._enabled = !0);
    },
    disable: function disable() {
      this._enabled && (ae._dragging === this && this.finishDrag(), Si(this._dragStartTarget, oe, this._onDown, this), this._enabled = !1, this._moved = !1);
    },
    _onDown: function _onDown(t) {
      var i, e;
      !t._simulated && this._enabled && (this._moved = !1, li(this._element, "leaflet-zoom-anim") || ae._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || ((ae._dragging = this)._preventOutline && Pi(this._element), xi(), Xt(), this._moving || (this.fire("down"), i = t.touches ? t.touches[0] : t, e = bi(this._element), this._startPoint = new k(i.clientX, i.clientY), this._parentScale = Ti(e), zi(document, re[t.type], this._onMove, this), zi(document, se[t.type], this._onUp, this))));
    },
    _onMove: function _onMove(t) {
      var i, e;
      !t._simulated && this._enabled && (t.touches && 1 < t.touches.length ? this._moved = !0 : ((e = new k((i = t.touches && 1 === t.touches.length ? t.touches[0] : t).clientX, i.clientY)._subtract(this._startPoint)).x || e.y) && (Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance || (e.x /= this._parentScale.x, e.y /= this._parentScale.y, Ri(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = yi(this._element).subtract(e), ci(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ci(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(e), this._moving = !0, z(this._animRequest), this._lastEvent = t, this._animRequest = M(this._updatePosition, this, !0))));
    },
    _updatePosition: function _updatePosition() {
      var t = {
        originalEvent: this._lastEvent
      };
      this.fire("predrag", t), vi(this._element, this._newPos), this.fire("drag", t);
    },
    _onUp: function _onUp(t) {
      !t._simulated && this._enabled && this.finishDrag();
    },
    finishDrag: function finishDrag() {
      for (var t in _i(document.body, "leaflet-dragging"), this._lastTarget && (_i(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), re) {
        Si(document, re[t], this._onMove, this), Si(document, se[t], this._onUp, this);
      }

      wi(), Jt(), this._moved && this._moving && (z(this._animRequest), this.fire("dragend", {
        distance: this._newPos.distanceTo(this._startPos)
      })), this._moving = !1, ae._dragging = !1;
    }
  });

  function he(t, i) {
    if (!i || !t.length) return t.slice();
    var e = i * i;
    return t = function (t, i) {
      var e = t.length,
          n = new ((typeof Uint8Array === "undefined" ? "undefined" : _typeof(Uint8Array)) != void 0 + "" ? Uint8Array : Array)(e);
      n[0] = n[e - 1] = 1, function t(i, e, n, o, s) {
        var r,
            a,
            h,
            u = 0;

        for (a = o + 1; a <= s - 1; a++) {
          h = de(i[a], i[o], i[s], !0), u < h && (r = a, u = h);
        }

        n < u && (e[r] = 1, t(i, e, n, o, r), t(i, e, n, r, s));
      }(t, n, i, 0, e - 1);
      var o,
          s = [];

      for (o = 0; o < e; o++) {
        n[o] && s.push(t[o]);
      }

      return s;
    }(t = function (t, i) {
      for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++) {
        (function (t, i) {
          var e = i.x - t.x,
              n = i.y - t.y;
          return e * e + n * n;
        })(t[n], t[o]) > i && (e.push(t[n]), o = n);
      }

      o < s - 1 && e.push(t[s - 1]);
      return e;
    }(t, e), e);
  }

  function ue(t, i, e) {
    return Math.sqrt(de(t, i, e, !0));
  }

  function le(t, i, e, n, o) {
    var s,
        r,
        a,
        h = n ? ee : _e(t, e),
        u = _e(i, e);

    for (ee = u;;) {
      if (!(h | u)) return [t, i];
      if (h & u) return !1;
      a = _e(r = ce(t, i, s = h || u, e, o), e), s === h ? (t = r, h = a) : (i = r, u = a);
    }
  }

  function ce(t, i, e, n, o) {
    var s,
        r,
        a = i.x - t.x,
        h = i.y - t.y,
        u = n.min,
        l = n.max;
    return 8 & e ? (s = t.x + a * (l.y - t.y) / h, r = l.y) : 4 & e ? (s = t.x + a * (u.y - t.y) / h, r = u.y) : 2 & e ? (s = l.x, r = t.y + h * (l.x - t.x) / a) : 1 & e && (s = u.x, r = t.y + h * (u.x - t.x) / a), new k(s, r, o);
  }

  function _e(t, i) {
    var e = 0;
    return t.x < i.min.x ? e |= 1 : t.x > i.max.x && (e |= 2), t.y < i.min.y ? e |= 4 : t.y > i.max.y && (e |= 8), e;
  }

  function de(t, i, e, n) {
    var o,
        s = i.x,
        r = i.y,
        a = e.x - s,
        h = e.y - r,
        u = a * a + h * h;
    return 0 < u && (1 < (o = ((t.x - s) * a + (t.y - r) * h) / u) ? (s = e.x, r = e.y) : 0 < o && (s += a * o, r += h * o)), a = t.x - s, h = t.y - r, n ? a * a + h * h : new k(s, r);
  }

  function pe(t) {
    return !g(t[0]) || "object" != _typeof(t[0][0]) && void 0 !== t[0][0];
  }

  function me(t) {
    return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), pe(t);
  }

  var fe = {
    simplify: he,
    pointToSegmentDistance: ue,
    closestPointOnSegment: function closestPointOnSegment(t, i, e) {
      return de(t, i, e);
    },
    clipSegment: le,
    _getEdgeIntersection: ce,
    _getBitCode: _e,
    _sqClosestPointOnSegment: de,
    isFlat: pe,
    _flat: me
  };

  function ge(t, i, e) {
    for (var n, o, s, r, a, h, u, l = [1, 4, 2, 8], c = 0, _ = t.length; c < _; c++) {
      t[c]._code = _e(t[c], i);
    }

    for (s = 0; s < 4; s++) {
      for (h = l[s], n = [], c = 0, o = (_ = t.length) - 1; c < _; o = c++) {
        r = t[c], a = t[o], r._code & h ? a._code & h || ((u = ce(a, r, h, i, e))._code = _e(u, i), n.push(u)) : (a._code & h && ((u = ce(a, r, h, i, e))._code = _e(u, i), n.push(u)), n.push(r));
      }

      t = n;
    }

    return t;
  }

  var ve,
      ye = {
    clipPolygon: ge
  },
      xe = {
    project: function project(t) {
      return new k(t.lng, t.lat);
    },
    unproject: function unproject(t) {
      return new D(t.y, t.x);
    },
    bounds: new I([-180, -90], [180, 90])
  },
      we = {
    R: 6378137,
    R_MINOR: 6356752.314245179,
    bounds: new I([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
    project: function project(t) {
      var i = Math.PI / 180,
          e = this.R,
          n = t.lat * i,
          o = this.R_MINOR / e,
          s = Math.sqrt(1 - o * o),
          r = s * Math.sin(n),
          a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2),
          n = -e * Math.log(Math.max(a, 1e-10));
      return new k(t.lng * i * e, n);
    },
    unproject: function unproject(t) {
      for (var i, e = 180 / Math.PI, n = this.R, o = this.R_MINOR / n, s = Math.sqrt(1 - o * o), r = Math.exp(-t.y / n), a = Math.PI / 2 - 2 * Math.atan(r), h = 0, u = .1; h < 15 && 1e-7 < Math.abs(u); h++) {
        i = s * Math.sin(a), i = Math.pow((1 - i) / (1 + i), s / 2), a += u = Math.PI / 2 - 2 * Math.atan(r * i) - a;
      }

      return new D(a * e, t.x * e / n);
    }
  },
      Pe = {
    LonLat: xe,
    Mercator: we,
    SphericalMercator: V
  },
      Le = h({}, F, {
    code: "EPSG:3395",
    projection: we,
    transformation: G(ve = .5 / (Math.PI * we.R), .5, -ve, .5)
  }),
      be = h({}, F, {
    code: "EPSG:4326",
    projection: xe,
    transformation: G(1 / 180, 1, -1 / 180, .5)
  }),
      Te = h({}, H, {
    projection: xe,
    transformation: G(1, 0, -1, 0),
    scale: function scale(t) {
      return Math.pow(2, t);
    },
    zoom: function zoom(t) {
      return Math.log(t) / Math.LN2;
    },
    distance: function distance(t, i) {
      var e = i.lng - t.lng,
          n = i.lat - t.lat;
      return Math.sqrt(e * e + n * n);
    },
    infinite: !0
  });
  H.Earth = F, H.EPSG3395 = Le, H.EPSG3857 = Y, H.EPSG900913 = X, H.EPSG4326 = be, H.Simple = Te;
  var Me = E.extend({
    options: {
      pane: "overlayPane",
      attribution: null,
      bubblingMouseEvents: !0
    },
    addTo: function addTo(t) {
      return t.addLayer(this), this;
    },
    remove: function remove() {
      return this.removeFrom(this._map || this._mapToAdd);
    },
    removeFrom: function removeFrom(t) {
      return t && t.removeLayer(this), this;
    },
    getPane: function getPane(t) {
      return this._map.getPane(t ? this.options[t] || t : this.options.pane);
    },
    addInteractiveTarget: function addInteractiveTarget(t) {
      return this._map._targets[m(t)] = this;
    },
    removeInteractiveTarget: function removeInteractiveTarget(t) {
      return delete this._map._targets[m(t)], this;
    },
    getAttribution: function getAttribution() {
      return this.options.attribution;
    },
    _layerAdd: function _layerAdd(t) {
      var i,
          e = t.target;
      e.hasLayer(this) && (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents && (i = this.getEvents(), e.on(i, this), this.once("remove", function () {
        e.off(i, this);
      }, this)), this.onAdd(e), this.getAttribution && e.attributionControl && e.attributionControl.addAttribution(this.getAttribution()), this.fire("add"), e.fire("layeradd", {
        layer: this
      }));
    }
  });
  Ki.include({
    addLayer: function addLayer(t) {
      if (!t._layerAdd) throw new Error("The provided object is not a Layer.");
      var i = m(t);
      return this._layers[i] || ((this._layers[i] = t)._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t)), this;
    },
    removeLayer: function removeLayer(t) {
      var i = m(t);
      return this._layers[i] && (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[i], this._loaded && (this.fire("layerremove", {
        layer: t
      }), t.fire("remove")), t._map = t._mapToAdd = null), this;
    },
    hasLayer: function hasLayer(t) {
      return !!t && m(t) in this._layers;
    },
    eachLayer: function eachLayer(t, i) {
      for (var e in this._layers) {
        t.call(i, this._layers[e]);
      }

      return this;
    },
    _addLayers: function _addLayers(t) {
      for (var i = 0, e = (t = t ? g(t) ? t : [t] : []).length; i < e; i++) {
        this.addLayer(t[i]);
      }
    },
    _addZoomLimit: function _addZoomLimit(t) {
      !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[m(t)] = t, this._updateZoomLevels());
    },
    _removeZoomLimit: function _removeZoomLimit(t) {
      var i = m(t);
      this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i], this._updateZoomLevels());
    },
    _updateZoomLevels: function _updateZoomLevels() {
      var t = 1 / 0,
          i = -1 / 0,
          e = this._getZoomSpan();

      for (var n in this._zoomBoundLayers) {
        var o = this._zoomBoundLayers[n].options,
            t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom),
            i = void 0 === o.maxZoom ? i : Math.max(i, o.maxZoom);
      }

      this._layersMaxZoom = i === -1 / 0 ? void 0 : i, this._layersMinZoom = t === 1 / 0 ? void 0 : t, e !== this._getZoomSpan() && this.fire("zoomlevelschange"), void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
    }
  });
  var ze = Me.extend({
    initialize: function initialize(t, i) {
      var e, n;
      if (c(this, i), this._layers = {}, t) for (e = 0, n = t.length; e < n; e++) {
        this.addLayer(t[e]);
      }
    },
    addLayer: function addLayer(t) {
      var i = this.getLayerId(t);
      return this._layers[i] = t, this._map && this._map.addLayer(t), this;
    },
    removeLayer: function removeLayer(t) {
      var i = t in this._layers ? t : this.getLayerId(t);
      return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]), delete this._layers[i], this;
    },
    hasLayer: function hasLayer(t) {
      return !!t && ("number" == typeof t ? t : this.getLayerId(t)) in this._layers;
    },
    clearLayers: function clearLayers() {
      return this.eachLayer(this.removeLayer, this);
    },
    invoke: function invoke(t) {
      var i,
          e,
          n = Array.prototype.slice.call(arguments, 1);

      for (i in this._layers) {
        (e = this._layers[i])[t] && e[t].apply(e, n);
      }

      return this;
    },
    onAdd: function onAdd(t) {
      this.eachLayer(t.addLayer, t);
    },
    onRemove: function onRemove(t) {
      this.eachLayer(t.removeLayer, t);
    },
    eachLayer: function eachLayer(t, i) {
      for (var e in this._layers) {
        t.call(i, this._layers[e]);
      }

      return this;
    },
    getLayer: function getLayer(t) {
      return this._layers[t];
    },
    getLayers: function getLayers() {
      var t = [];
      return this.eachLayer(t.push, t), t;
    },
    setZIndex: function setZIndex(t) {
      return this.invoke("setZIndex", t);
    },
    getLayerId: m
  }),
      Ce = ze.extend({
    addLayer: function addLayer(t) {
      return this.hasLayer(t) ? this : (t.addEventParent(this), ze.prototype.addLayer.call(this, t), this.fire("layeradd", {
        layer: t
      }));
    },
    removeLayer: function removeLayer(t) {
      return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), ze.prototype.removeLayer.call(this, t), this.fire("layerremove", {
        layer: t
      })) : this;
    },
    setStyle: function setStyle(t) {
      return this.invoke("setStyle", t);
    },
    bringToFront: function bringToFront() {
      return this.invoke("bringToFront");
    },
    bringToBack: function bringToBack() {
      return this.invoke("bringToBack");
    },
    getBounds: function getBounds() {
      var t = new R();

      for (var i in this._layers) {
        var e = this._layers[i];
        t.extend(e.getBounds ? e.getBounds() : e.getLatLng());
      }

      return t;
    }
  }),
      Se = S.extend({
    options: {
      popupAnchor: [0, 0],
      tooltipAnchor: [0, 0]
    },
    initialize: function initialize(t) {
      c(this, t);
    },
    createIcon: function createIcon(t) {
      return this._createIcon("icon", t);
    },
    createShadow: function createShadow(t) {
      return this._createIcon("shadow", t);
    },
    _createIcon: function _createIcon(t, i) {
      var e = this._getIconUrl(t);

      if (!e) {
        if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
        return null;
      }

      var n = this._createImg(e, i && "IMG" === i.tagName ? i : null);

      return this._setIconStyles(n, t), n;
    },
    _setIconStyles: function _setIconStyles(t, i) {
      var e = this.options,
          n = e[i + "Size"];
      "number" == typeof n && (n = [n, n]);
      var o = A(n),
          s = A("shadow" === i && e.shadowAnchor || e.iconAnchor || o && o.divideBy(2, !0));
      t.className = "leaflet-marker-" + i + " " + (e.className || ""), s && (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
    },
    _createImg: function _createImg(t, i) {
      return (i = i || document.createElement("img")).src = t, i;
    },
    _getIconUrl: function _getIconUrl(t) {
      return zt && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
    }
  });
  var Ze = Se.extend({
    options: {
      iconUrl: "marker-icon.png",
      iconRetinaUrl: "marker-icon-2x.png",
      shadowUrl: "marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    },
    _getIconUrl: function _getIconUrl(t) {
      return Ze.imagePath || (Ze.imagePath = this._detectIconPath()), (this.options.imagePath || Ze.imagePath) + Se.prototype._getIconUrl.call(this, t);
    },
    _detectIconPath: function _detectIconPath() {
      var t = si("div", "leaflet-default-icon-path", document.body),
          i = oi(t, "background-image") || oi(t, "backgroundImage");
      return document.body.removeChild(t), i = null === i || 0 !== i.indexOf("url") ? "" : i.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "");
    }
  }),
      Ee = ie.extend({
    initialize: function initialize(t) {
      this._marker = t;
    },
    addHooks: function addHooks() {
      var t = this._marker._icon;
      this._draggable || (this._draggable = new ae(t, t, !0)), this._draggable.on({
        dragstart: this._onDragStart,
        predrag: this._onPreDrag,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this).enable(), ci(t, "leaflet-marker-draggable");
    },
    removeHooks: function removeHooks() {
      this._draggable.off({
        dragstart: this._onDragStart,
        predrag: this._onPreDrag,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this).disable(), this._marker._icon && _i(this._marker._icon, "leaflet-marker-draggable");
    },
    moved: function moved() {
      return this._draggable && this._draggable._moved;
    },
    _adjustPan: function _adjustPan(t) {
      var i,
          e = this._marker,
          n = e._map,
          o = this._marker.options.autoPanSpeed,
          s = this._marker.options.autoPanPadding,
          r = yi(e._icon),
          a = n.getPixelBounds(),
          h = n.getPixelOrigin(),
          u = O(a.min._subtract(h).add(s), a.max._subtract(h).subtract(s));
      u.contains(r) || (i = A((Math.max(u.max.x, r.x) - u.max.x) / (a.max.x - u.max.x) - (Math.min(u.min.x, r.x) - u.min.x) / (a.min.x - u.min.x), (Math.max(u.max.y, r.y) - u.max.y) / (a.max.y - u.max.y) - (Math.min(u.min.y, r.y) - u.min.y) / (a.min.y - u.min.y)).multiplyBy(o), n.panBy(i, {
        animate: !1
      }), this._draggable._newPos._add(i), this._draggable._startPos._add(i), vi(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = M(this._adjustPan.bind(this, t)));
    },
    _onDragStart: function _onDragStart() {
      this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
    },
    _onPreDrag: function _onPreDrag(t) {
      this._marker.options.autoPan && (z(this._panRequest), this._panRequest = M(this._adjustPan.bind(this, t)));
    },
    _onDrag: function _onDrag(t) {
      var i = this._marker,
          e = i._shadow,
          n = yi(i._icon),
          o = i._map.layerPointToLatLng(n);

      e && vi(e, n), i._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, i.fire("move", t).fire("drag", t);
    },
    _onDragEnd: function _onDragEnd(t) {
      z(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
    }
  }),
      ke = Me.extend({
    options: {
      icon: new Ze(),
      interactive: !0,
      keyboard: !0,
      title: "",
      alt: "",
      zIndexOffset: 0,
      opacity: 1,
      riseOnHover: !1,
      riseOffset: 250,
      pane: "markerPane",
      shadowPane: "shadowPane",
      bubblingMouseEvents: !1,
      draggable: !1,
      autoPan: !1,
      autoPanPadding: [50, 50],
      autoPanSpeed: 10
    },
    initialize: function initialize(t, i) {
      c(this, i), this._latlng = j(t);
    },
    onAdd: function onAdd(t) {
      this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
    },
    onRemove: function onRemove(t) {
      this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
    },
    getEvents: function getEvents() {
      return {
        zoom: this.update,
        viewreset: this.update
      };
    },
    getLatLng: function getLatLng() {
      return this._latlng;
    },
    setLatLng: function setLatLng(t) {
      var i = this._latlng;
      return this._latlng = j(t), this.update(), this.fire("move", {
        oldLatLng: i,
        latlng: this._latlng
      });
    },
    setZIndexOffset: function setZIndexOffset(t) {
      return this.options.zIndexOffset = t, this.update();
    },
    getIcon: function getIcon() {
      return this.options.icon;
    },
    setIcon: function setIcon(t) {
      return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
    },
    getElement: function getElement() {
      return this._icon;
    },
    update: function update() {
      var t;
      return this._icon && this._map && (t = this._map.latLngToLayerPoint(this._latlng).round(), this._setPos(t)), this;
    },
    _initIcon: function _initIcon() {
      var t = this.options,
          i = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
          e = t.icon.createIcon(this._icon),
          n = !1;
      e !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (e.title = t.title), "IMG" === e.tagName && (e.alt = t.alt || "")), ci(e, i), t.keyboard && (e.tabIndex = "0"), this._icon = e, t.riseOnHover && this.on({
        mouseover: this._bringToFront,
        mouseout: this._resetZIndex
      });
      var o = t.icon.createShadow(this._shadow),
          s = !1;
      o !== this._shadow && (this._removeShadow(), s = !0), o && (ci(o, i), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && s && this.getPane(t.shadowPane).appendChild(this._shadow);
    },
    _removeIcon: function _removeIcon() {
      this.options.riseOnHover && this.off({
        mouseover: this._bringToFront,
        mouseout: this._resetZIndex
      }), ri(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
    },
    _removeShadow: function _removeShadow() {
      this._shadow && ri(this._shadow), this._shadow = null;
    },
    _setPos: function _setPos(t) {
      this._icon && vi(this._icon, t), this._shadow && vi(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
    },
    _updateZIndex: function _updateZIndex(t) {
      this._icon && (this._icon.style.zIndex = this._zIndex + t);
    },
    _animateZoom: function _animateZoom(t) {
      var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();

      this._setPos(i);
    },
    _initInteraction: function _initInteraction() {
      var t;
      this.options.interactive && (ci(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Ee && (t = this.options.draggable, this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Ee(this), t && this.dragging.enable()));
    },
    setOpacity: function setOpacity(t) {
      return this.options.opacity = t, this._map && this._updateOpacity(), this;
    },
    _updateOpacity: function _updateOpacity() {
      var t = this.options.opacity;
      this._icon && mi(this._icon, t), this._shadow && mi(this._shadow, t);
    },
    _bringToFront: function _bringToFront() {
      this._updateZIndex(this.options.riseOffset);
    },
    _resetZIndex: function _resetZIndex() {
      this._updateZIndex(0);
    },
    _getPopupAnchor: function _getPopupAnchor() {
      return this.options.icon.options.popupAnchor;
    },
    _getTooltipAnchor: function _getTooltipAnchor() {
      return this.options.icon.options.tooltipAnchor;
    }
  });
  var Be = Me.extend({
    options: {
      stroke: !0,
      color: "#3388ff",
      weight: 3,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
      dashArray: null,
      dashOffset: null,
      fill: !1,
      fillColor: null,
      fillOpacity: .2,
      fillRule: "evenodd",
      interactive: !0,
      bubblingMouseEvents: !0
    },
    beforeAdd: function beforeAdd(t) {
      this._renderer = t.getRenderer(this);
    },
    onAdd: function onAdd() {
      this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
    },
    onRemove: function onRemove() {
      this._renderer._removePath(this);
    },
    redraw: function redraw() {
      return this._map && this._renderer._updatePath(this), this;
    },
    setStyle: function setStyle(t) {
      return c(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
    },
    bringToFront: function bringToFront() {
      return this._renderer && this._renderer._bringToFront(this), this;
    },
    bringToBack: function bringToBack() {
      return this._renderer && this._renderer._bringToBack(this), this;
    },
    getElement: function getElement() {
      return this._path;
    },
    _reset: function _reset() {
      this._project(), this._update();
    },
    _clickTolerance: function _clickTolerance() {
      return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance;
    }
  }),
      Ae = Be.extend({
    options: {
      fill: !0,
      radius: 10
    },
    initialize: function initialize(t, i) {
      c(this, i), this._latlng = j(t), this._radius = this.options.radius;
    },
    setLatLng: function setLatLng(t) {
      var i = this._latlng;
      return this._latlng = j(t), this.redraw(), this.fire("move", {
        oldLatLng: i,
        latlng: this._latlng
      });
    },
    getLatLng: function getLatLng() {
      return this._latlng;
    },
    setRadius: function setRadius(t) {
      return this.options.radius = this._radius = t, this.redraw();
    },
    getRadius: function getRadius() {
      return this._radius;
    },
    setStyle: function setStyle(t) {
      var i = t && t.radius || this._radius;
      return Be.prototype.setStyle.call(this, t), this.setRadius(i), this;
    },
    _project: function _project() {
      this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
    },
    _updateBounds: function _updateBounds() {
      var t = this._radius,
          i = this._radiusY || t,
          e = this._clickTolerance(),
          n = [t + e, i + e];

      this._pxBounds = new I(this._point.subtract(n), this._point.add(n));
    },
    _update: function _update() {
      this._map && this._updatePath();
    },
    _updatePath: function _updatePath() {
      this._renderer._updateCircle(this);
    },
    _empty: function _empty() {
      return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
    },
    _containsPoint: function _containsPoint(t) {
      return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
    }
  });
  var Ie = Ae.extend({
    initialize: function initialize(t, i, e) {
      if ("number" == typeof i && (i = h({}, e, {
        radius: i
      })), c(this, i), this._latlng = j(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
      this._mRadius = this.options.radius;
    },
    setRadius: function setRadius(t) {
      return this._mRadius = t, this.redraw();
    },
    getRadius: function getRadius() {
      return this._mRadius;
    },
    getBounds: function getBounds() {
      var t = [this._radius, this._radiusY || this._radius];
      return new R(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)));
    },
    setStyle: Be.prototype.setStyle,
    _project: function _project() {
      var t,
          i,
          e,
          n,
          o,
          s,
          r,
          a,
          h = this._latlng.lng,
          u = this._latlng.lat,
          l = this._map,
          c = l.options.crs;
      c.distance === F.distance ? (t = Math.PI / 180, i = this._mRadius / F.R / t, e = l.project([u + i, h]), n = l.project([u - i, h]), o = e.add(n).divideBy(2), s = l.unproject(o).lat, r = Math.acos((Math.cos(i * t) - Math.sin(u * t) * Math.sin(s * t)) / (Math.cos(u * t) * Math.cos(s * t))) / t, !isNaN(r) && 0 !== r || (r = i / Math.cos(Math.PI / 180 * u)), this._point = o.subtract(l.getPixelOrigin()), this._radius = isNaN(r) ? 0 : o.x - l.project([s, h - r]).x, this._radiusY = o.y - e.y) : (a = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0])), this._point = l.latLngToLayerPoint(this._latlng), this._radius = this._point.x - l.latLngToLayerPoint(a).x), this._updateBounds();
    }
  });
  var Oe = Be.extend({
    options: {
      smoothFactor: 1,
      noClip: !1
    },
    initialize: function initialize(t, i) {
      c(this, i), this._setLatLngs(t);
    },
    getLatLngs: function getLatLngs() {
      return this._latlngs;
    },
    setLatLngs: function setLatLngs(t) {
      return this._setLatLngs(t), this.redraw();
    },
    isEmpty: function isEmpty() {
      return !this._latlngs.length;
    },
    closestLayerPoint: function closestLayerPoint(t) {
      for (var i, e, n = 1 / 0, o = null, s = de, r = 0, a = this._parts.length; r < a; r++) {
        for (var h = this._parts[r], u = 1, l = h.length; u < l; u++) {
          var c = s(t, i = h[u - 1], e = h[u], !0);
          c < n && (n = c, o = s(t, i, e));
        }
      }

      return o && (o.distance = Math.sqrt(n)), o;
    },
    getCenter: function getCenter() {
      if (!this._map) throw new Error("Must add layer to map before using getCenter()");
      var t,
          i,
          e,
          n,
          o,
          s,
          r,
          a = this._rings[0],
          h = a.length;
      if (!h) return null;

      for (i = t = 0; t < h - 1; t++) {
        i += a[t].distanceTo(a[t + 1]) / 2;
      }

      if (0 === i) return this._map.layerPointToLatLng(a[0]);

      for (n = t = 0; t < h - 1; t++) {
        if (o = a[t], s = a[t + 1], i < (n += e = o.distanceTo(s))) return r = (n - i) / e, this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)]);
      }
    },
    getBounds: function getBounds() {
      return this._bounds;
    },
    addLatLng: function addLatLng(t, i) {
      return i = i || this._defaultShape(), t = j(t), i.push(t), this._bounds.extend(t), this.redraw();
    },
    _setLatLngs: function _setLatLngs(t) {
      this._bounds = new R(), this._latlngs = this._convertLatLngs(t);
    },
    _defaultShape: function _defaultShape() {
      return pe(this._latlngs) ? this._latlngs : this._latlngs[0];
    },
    _convertLatLngs: function _convertLatLngs(t) {
      for (var i = [], e = pe(t), n = 0, o = t.length; n < o; n++) {
        e ? (i[n] = j(t[n]), this._bounds.extend(i[n])) : i[n] = this._convertLatLngs(t[n]);
      }

      return i;
    },
    _project: function _project() {
      var t = new I();
      this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
    },
    _updateBounds: function _updateBounds() {
      var t = this._clickTolerance(),
          i = new k(t, t);

      this._pxBounds = new I([this._rawPxBounds.min.subtract(i), this._rawPxBounds.max.add(i)]);
    },
    _projectLatlngs: function _projectLatlngs(t, i, e) {
      var n,
          o,
          s = t[0] instanceof D,
          r = t.length;

      if (s) {
        for (o = [], n = 0; n < r; n++) {
          o[n] = this._map.latLngToLayerPoint(t[n]), e.extend(o[n]);
        }

        i.push(o);
      } else for (n = 0; n < r; n++) {
        this._projectLatlngs(t[n], i, e);
      }
    },
    _clipPoints: function _clipPoints() {
      var t = this._renderer._bounds;
      if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) if (this.options.noClip) this._parts = this._rings;else for (var i, e, n, o, s = this._parts, r = 0, a = 0, h = this._rings.length; r < h; r++) {
        for (i = 0, e = (o = this._rings[r]).length; i < e - 1; i++) {
          (n = le(o[i], o[i + 1], t, i, !0)) && (s[a] = s[a] || [], s[a].push(n[0]), n[1] === o[i + 1] && i !== e - 2 || (s[a].push(n[1]), a++));
        }
      }
    },
    _simplifyPoints: function _simplifyPoints() {
      for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; e < n; e++) {
        t[e] = he(t[e], i);
      }
    },
    _update: function _update() {
      this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
    },
    _updatePath: function _updatePath() {
      this._renderer._updatePoly(this);
    },
    _containsPoint: function _containsPoint(t, i) {
      var e,
          n,
          o,
          s,
          r,
          a,
          h = this._clickTolerance();

      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;

      for (e = 0, s = this._parts.length; e < s; e++) {
        for (n = 0, o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++) {
          if ((i || 0 !== n) && ue(t, a[o], a[n]) <= h) return !0;
        }
      }

      return !1;
    }
  });
  Oe._flat = me;
  var Re = Oe.extend({
    options: {
      fill: !0
    },
    isEmpty: function isEmpty() {
      return !this._latlngs.length || !this._latlngs[0].length;
    },
    getCenter: function getCenter() {
      if (!this._map) throw new Error("Must add layer to map before using getCenter()");
      var t,
          i,
          e,
          n,
          o,
          s,
          r,
          a,
          h,
          u = this._rings[0],
          l = u.length;
      if (!l) return null;

      for (t = s = r = a = 0, i = l - 1; t < l; i = t++) {
        e = u[t], n = u[i], o = e.y * n.x - n.y * e.x, r += (e.x + n.x) * o, a += (e.y + n.y) * o, s += 3 * o;
      }

      return h = 0 === s ? u[0] : [r / s, a / s], this._map.layerPointToLatLng(h);
    },
    _convertLatLngs: function _convertLatLngs(t) {
      var i = Oe.prototype._convertLatLngs.call(this, t),
          e = i.length;

      return 2 <= e && i[0] instanceof D && i[0].equals(i[e - 1]) && i.pop(), i;
    },
    _setLatLngs: function _setLatLngs(t) {
      Oe.prototype._setLatLngs.call(this, t), pe(this._latlngs) && (this._latlngs = [this._latlngs]);
    },
    _defaultShape: function _defaultShape() {
      return pe(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
    },
    _clipPoints: function _clipPoints() {
      var t = this._renderer._bounds,
          i = this.options.weight,
          e = new k(i, i),
          t = new I(t.min.subtract(e), t.max.add(e));
      if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) if (this.options.noClip) this._parts = this._rings;else for (var n, o = 0, s = this._rings.length; o < s; o++) {
        (n = ge(this._rings[o], t, !0)).length && this._parts.push(n);
      }
    },
    _updatePath: function _updatePath() {
      this._renderer._updatePoly(this, !0);
    },
    _containsPoint: function _containsPoint(t) {
      var i,
          e,
          n,
          o,
          s,
          r,
          a,
          h,
          u = !1;
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;

      for (o = 0, a = this._parts.length; o < a; o++) {
        for (s = 0, r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++) {
          e = i[s], n = i[r], e.y > t.y != n.y > t.y && t.x < (n.x - e.x) * (t.y - e.y) / (n.y - e.y) + e.x && (u = !u);
        }
      }

      return u || Oe.prototype._containsPoint.call(this, t, !0);
    }
  });
  var Ne = Ce.extend({
    initialize: function initialize(t, i) {
      c(this, i), this._layers = {}, t && this.addData(t);
    },
    addData: function addData(t) {
      var i,
          e,
          n,
          o = g(t) ? t : t.features;

      if (o) {
        for (i = 0, e = o.length; i < e; i++) {
          ((n = o[i]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
        }

        return this;
      }

      var s = this.options;
      if (s.filter && !s.filter(t)) return this;
      var r = De(t, s);
      return r ? (r.feature = qe(t), r.defaultOptions = r.options, this.resetStyle(r), s.onEachFeature && s.onEachFeature(t, r), this.addLayer(r)) : this;
    },
    resetStyle: function resetStyle(t) {
      return void 0 === t ? this.eachLayer(this.resetStyle, this) : (t.options = h({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
    },
    setStyle: function setStyle(i) {
      return this.eachLayer(function (t) {
        this._setLayerStyle(t, i);
      }, this);
    },
    _setLayerStyle: function _setLayerStyle(t, i) {
      t.setStyle && ("function" == typeof i && (i = i(t.feature)), t.setStyle(i));
    }
  });

  function De(t, i) {
    var e,
        n,
        o,
        s,
        r = "Feature" === t.type ? t.geometry : t,
        a = r ? r.coordinates : null,
        h = [],
        u = i && i.pointToLayer,
        l = i && i.coordsToLatLng || We;
    if (!a && !r) return null;

    switch (r.type) {
      case "Point":
        return je(u, t, e = l(a), i);

      case "MultiPoint":
        for (o = 0, s = a.length; o < s; o++) {
          e = l(a[o]), h.push(je(u, t, e, i));
        }

        return new Ce(h);

      case "LineString":
      case "MultiLineString":
        return n = He(a, "LineString" === r.type ? 0 : 1, l), new Oe(n, i);

      case "Polygon":
      case "MultiPolygon":
        return n = He(a, "Polygon" === r.type ? 1 : 2, l), new Re(n, i);

      case "GeometryCollection":
        for (o = 0, s = r.geometries.length; o < s; o++) {
          var c = De({
            geometry: r.geometries[o],
            type: "Feature",
            properties: t.properties
          }, i);
          c && h.push(c);
        }

        return new Ce(h);

      default:
        throw new Error("Invalid GeoJSON object.");
    }
  }

  function je(t, i, e, n) {
    return t ? t(i, e) : new ke(e, n && n.markersInheritOptions && n);
  }

  function We(t) {
    return new D(t[1], t[0], t[2]);
  }

  function He(t, i, e) {
    for (var n, o = [], s = 0, r = t.length; s < r; s++) {
      n = i ? He(t[s], i - 1, e) : (e || We)(t[s]), o.push(n);
    }

    return o;
  }

  function Fe(t, i) {
    return i = "number" == typeof i ? i : 6, void 0 !== t.alt ? [r(t.lng, i), r(t.lat, i), r(t.alt, i)] : [r(t.lng, i), r(t.lat, i)];
  }

  function Ue(t, i, e, n) {
    for (var o = [], s = 0, r = t.length; s < r; s++) {
      o.push(i ? Ue(t[s], i - 1, e, n) : Fe(t[s], n));
    }

    return !i && e && o.push(o[0]), o;
  }

  function Ve(t, i) {
    return t.feature ? h({}, t.feature, {
      geometry: i
    }) : qe(i);
  }

  function qe(t) {
    return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
      type: "Feature",
      properties: {},
      geometry: t
    };
  }

  var Ge = {
    toGeoJSON: function toGeoJSON(t) {
      return Ve(this, {
        type: "Point",
        coordinates: Fe(this.getLatLng(), t)
      });
    }
  };

  function Ke(t, i) {
    return new Ne(t, i);
  }

  ke.include(Ge), Ie.include(Ge), Ae.include(Ge), Oe.include({
    toGeoJSON: function toGeoJSON(t) {
      var i = !pe(this._latlngs);
      return Ve(this, {
        type: (i ? "Multi" : "") + "LineString",
        coordinates: Ue(this._latlngs, i ? 1 : 0, !1, t)
      });
    }
  }), Re.include({
    toGeoJSON: function toGeoJSON(t) {
      var i = !pe(this._latlngs),
          e = i && !pe(this._latlngs[0]),
          n = Ue(this._latlngs, e ? 2 : i ? 1 : 0, !0, t);
      return i || (n = [n]), Ve(this, {
        type: (e ? "Multi" : "") + "Polygon",
        coordinates: n
      });
    }
  }), ze.include({
    toMultiPoint: function toMultiPoint(i) {
      var e = [];
      return this.eachLayer(function (t) {
        e.push(t.toGeoJSON(i).geometry.coordinates);
      }), Ve(this, {
        type: "MultiPoint",
        coordinates: e
      });
    },
    toGeoJSON: function toGeoJSON(n) {
      var t = this.feature && this.feature.geometry && this.feature.geometry.type;
      if ("MultiPoint" === t) return this.toMultiPoint(n);
      var o = "GeometryCollection" === t,
          s = [];
      return this.eachLayer(function (t) {
        var i, e;
        t.toGeoJSON && (i = t.toGeoJSON(n), o ? s.push(i.geometry) : "FeatureCollection" === (e = qe(i)).type ? s.push.apply(s, e.features) : s.push(e));
      }), o ? Ve(this, {
        geometries: s,
        type: "GeometryCollection"
      }) : {
        type: "FeatureCollection",
        features: s
      };
    }
  });
  var Ye = Ke,
      Xe = Me.extend({
    options: {
      opacity: 1,
      alt: "",
      interactive: !1,
      crossOrigin: !1,
      errorOverlayUrl: "",
      zIndex: 1,
      className: ""
    },
    initialize: function initialize(t, i, e) {
      this._url = t, this._bounds = N(i), c(this, e);
    },
    onAdd: function onAdd() {
      this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (ci(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
    },
    onRemove: function onRemove() {
      ri(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
    },
    setOpacity: function setOpacity(t) {
      return this.options.opacity = t, this._image && this._updateOpacity(), this;
    },
    setStyle: function setStyle(t) {
      return t.opacity && this.setOpacity(t.opacity), this;
    },
    bringToFront: function bringToFront() {
      return this._map && hi(this._image), this;
    },
    bringToBack: function bringToBack() {
      return this._map && ui(this._image), this;
    },
    setUrl: function setUrl(t) {
      return this._url = t, this._image && (this._image.src = t), this;
    },
    setBounds: function setBounds(t) {
      return this._bounds = N(t), this._map && this._reset(), this;
    },
    getEvents: function getEvents() {
      var t = {
        zoom: this._reset,
        viewreset: this._reset
      };
      return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
    },
    setZIndex: function setZIndex(t) {
      return this.options.zIndex = t, this._updateZIndex(), this;
    },
    getBounds: function getBounds() {
      return this._bounds;
    },
    getElement: function getElement() {
      return this._image;
    },
    _initImage: function _initImage() {
      var t = "IMG" === this._url.tagName,
          i = this._image = t ? this._url : si("img");
      ci(i, "leaflet-image-layer"), this._zoomAnimated && ci(i, "leaflet-zoom-animated"), this.options.className && ci(i, this.options.className), i.onselectstart = a, i.onmousemove = a, i.onload = p(this.fire, this, "load"), i.onerror = p(this._overlayOnError, this, "error"), !this.options.crossOrigin && "" !== this.options.crossOrigin || (i.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t ? this._url = i.src : (i.src = this._url, i.alt = this.options.alt);
    },
    _animateZoom: function _animateZoom(t) {
      var i = this._map.getZoomScale(t.zoom),
          e = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;

      gi(this._image, e, i);
    },
    _reset: function _reset() {
      var t = this._image,
          i = new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
          e = i.getSize();
      vi(t, i.min), t.style.width = e.x + "px", t.style.height = e.y + "px";
    },
    _updateOpacity: function _updateOpacity() {
      mi(this._image, this.options.opacity);
    },
    _updateZIndex: function _updateZIndex() {
      this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex);
    },
    _overlayOnError: function _overlayOnError() {
      this.fire("error");
      var t = this.options.errorOverlayUrl;
      t && this._url !== t && (this._url = t, this._image.src = t);
    }
  }),
      Je = Xe.extend({
    options: {
      autoplay: !0,
      loop: !0,
      keepAspectRatio: !0,
      muted: !1
    },
    _initImage: function _initImage() {
      var t = "VIDEO" === this._url.tagName,
          i = this._image = t ? this._url : si("video");

      if (ci(i, "leaflet-image-layer"), this._zoomAnimated && ci(i, "leaflet-zoom-animated"), this.options.className && ci(i, this.options.className), i.onselectstart = a, i.onmousemove = a, i.onloadeddata = p(this.fire, this, "load"), t) {
        for (var e = i.getElementsByTagName("source"), n = [], o = 0; o < e.length; o++) {
          n.push(e[o].src);
        }

        this._url = 0 < e.length ? n : [i.src];
      } else {
        g(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(i.style, "objectFit") && (i.style.objectFit = "fill"), i.autoplay = !!this.options.autoplay, i.loop = !!this.options.loop, i.muted = !!this.options.muted;

        for (var s = 0; s < this._url.length; s++) {
          var r = si("source");
          r.src = this._url[s], i.appendChild(r);
        }
      }
    }
  });
  var $e = Xe.extend({
    _initImage: function _initImage() {
      var t = this._image = this._url;
      ci(t, "leaflet-image-layer"), this._zoomAnimated && ci(t, "leaflet-zoom-animated"), this.options.className && ci(t, this.options.className), t.onselectstart = a, t.onmousemove = a;
    }
  });
  var Qe = Me.extend({
    options: {
      offset: [0, 7],
      className: "",
      pane: "popupPane"
    },
    initialize: function initialize(t, i) {
      c(this, t), this._source = i;
    },
    onAdd: function onAdd(t) {
      this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && mi(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && mi(this._container, 1), this.bringToFront();
    },
    onRemove: function onRemove(t) {
      t._fadeAnimated ? (mi(this._container, 0), this._removeTimeout = setTimeout(p(ri, void 0, this._container), 200)) : ri(this._container);
    },
    getLatLng: function getLatLng() {
      return this._latlng;
    },
    setLatLng: function setLatLng(t) {
      return this._latlng = j(t), this._map && (this._updatePosition(), this._adjustPan()), this;
    },
    getContent: function getContent() {
      return this._content;
    },
    setContent: function setContent(t) {
      return this._content = t, this.update(), this;
    },
    getElement: function getElement() {
      return this._container;
    },
    update: function update() {
      this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
    },
    getEvents: function getEvents() {
      var t = {
        zoom: this._updatePosition,
        viewreset: this._updatePosition
      };
      return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
    },
    isOpen: function isOpen() {
      return !!this._map && this._map.hasLayer(this);
    },
    bringToFront: function bringToFront() {
      return this._map && hi(this._container), this;
    },
    bringToBack: function bringToBack() {
      return this._map && ui(this._container), this;
    },
    _prepareOpen: function _prepareOpen(t, i, e) {
      if (i instanceof Me || (e = i, i = t), i instanceof Ce) for (var n in t._layers) {
        i = t._layers[n];
        break;
      }
      if (!e) if (i.getCenter) e = i.getCenter();else {
        if (!i.getLatLng) throw new Error("Unable to get source layer LatLng.");
        e = i.getLatLng();
      }
      return this._source = i, this.update(), e;
    },
    _updateContent: function _updateContent() {
      if (this._content) {
        var t = this._contentNode,
            i = "function" == typeof this._content ? this._content(this._source || this) : this._content;
        if ("string" == typeof i) t.innerHTML = i;else {
          for (; t.hasChildNodes();) {
            t.removeChild(t.firstChild);
          }

          t.appendChild(i);
        }
        this.fire("contentupdate");
      }
    },
    _updatePosition: function _updatePosition() {
      var t, i, e, n, o;
      this._map && (t = this._map.latLngToLayerPoint(this._latlng), i = A(this.options.offset), e = this._getAnchor(), this._zoomAnimated ? vi(this._container, t.add(e)) : i = i.add(t).add(e), n = this._containerBottom = -i.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x, this._container.style.bottom = n + "px", this._container.style.left = o + "px");
    },
    _getAnchor: function _getAnchor() {
      return [0, 0];
    }
  }),
      tn = Qe.extend({
    options: {
      maxWidth: 300,
      minWidth: 50,
      maxHeight: null,
      autoPan: !0,
      autoPanPaddingTopLeft: null,
      autoPanPaddingBottomRight: null,
      autoPanPadding: [5, 5],
      keepInView: !1,
      closeButton: !0,
      autoClose: !0,
      closeOnEscapeKey: !0,
      className: ""
    },
    openOn: function openOn(t) {
      return t.openPopup(this), this;
    },
    onAdd: function onAdd(t) {
      Qe.prototype.onAdd.call(this, t), t.fire("popupopen", {
        popup: this
      }), this._source && (this._source.fire("popupopen", {
        popup: this
      }, !0), this._source instanceof Be || this._source.on("preclick", Ai));
    },
    onRemove: function onRemove(t) {
      Qe.prototype.onRemove.call(this, t), t.fire("popupclose", {
        popup: this
      }), this._source && (this._source.fire("popupclose", {
        popup: this
      }, !0), this._source instanceof Be || this._source.off("preclick", Ai));
    },
    getEvents: function getEvents() {
      var t = Qe.prototype.getEvents.call(this);
      return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t;
    },
    _close: function _close() {
      this._map && this._map.closePopup(this);
    },
    _initLayout: function _initLayout() {
      var t,
          i = "leaflet-popup",
          e = this._container = si("div", i + " " + (this.options.className || "") + " leaflet-zoom-animated"),
          n = this._wrapper = si("div", i + "-content-wrapper", e);
      this._contentNode = si("div", i + "-content", n), Oi(e), Ii(this._contentNode), zi(e, "contextmenu", Ai), this._tipContainer = si("div", i + "-tip-container", e), this._tip = si("div", i + "-tip", this._tipContainer), this.options.closeButton && ((t = this._closeButton = si("a", i + "-close-button", e)).href = "#close", t.innerHTML = "&#215;", zi(t, "click", this._onCloseButtonClick, this));
    },
    _updateLayout: function _updateLayout() {
      var t = this._contentNode,
          i = t.style;
      i.width = "", i.whiteSpace = "nowrap";
      var e = t.offsetWidth,
          e = Math.min(e, this.options.maxWidth);
      e = Math.max(e, this.options.minWidth), i.width = e + 1 + "px", i.whiteSpace = "", i.height = "";
      var n = t.offsetHeight,
          o = this.options.maxHeight,
          s = "leaflet-popup-scrolled";
      o && o < n ? (i.height = o + "px", ci(t, s)) : _i(t, s), this._containerWidth = this._container.offsetWidth;
    },
    _animateZoom: function _animateZoom(t) {
      var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
          e = this._getAnchor();

      vi(this._container, i.add(e));
    },
    _adjustPan: function _adjustPan() {
      var t, i, e, n, o, s, r, a, h, u, l, c;
      this.options.autoPan && (this._map._panAnim && this._map._panAnim.stop(), t = this._map, i = parseInt(oi(this._container, "marginBottom"), 10) || 0, e = this._container.offsetHeight + i, n = this._containerWidth, (o = new k(this._containerLeft, -e - this._containerBottom))._add(yi(this._container)), s = t.layerPointToContainerPoint(o), r = A(this.options.autoPanPadding), a = A(this.options.autoPanPaddingTopLeft || r), h = A(this.options.autoPanPaddingBottomRight || r), u = t.getSize(), c = l = 0, s.x + n + h.x > u.x && (l = s.x + n - u.x + h.x), s.x - l - a.x < 0 && (l = s.x - a.x), s.y + e + h.y > u.y && (c = s.y + e - u.y + h.y), s.y - c - a.y < 0 && (c = s.y - a.y), (l || c) && t.fire("autopanstart").panBy([l, c]));
    },
    _onCloseButtonClick: function _onCloseButtonClick(t) {
      this._close(), Ni(t);
    },
    _getAnchor: function _getAnchor() {
      return A(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
    }
  });
  Ki.mergeOptions({
    closePopupOnClick: !0
  }), Ki.include({
    openPopup: function openPopup(t, i, e) {
      return t instanceof tn || (t = new tn(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = t, this.addLayer(t));
    },
    closePopup: function closePopup(t) {
      return t && t !== this._popup || (t = this._popup, this._popup = null), t && this.removeLayer(t), this;
    }
  }), Me.include({
    bindPopup: function bindPopup(t, i) {
      return t instanceof tn ? (c(t, i), (this._popup = t)._source = this) : (this._popup && !i || (this._popup = new tn(i, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on({
        click: this._openPopup,
        keypress: this._onKeyPress,
        remove: this.closePopup,
        move: this._movePopup
      }), this._popupHandlersAdded = !0), this;
    },
    unbindPopup: function unbindPopup() {
      return this._popup && (this.off({
        click: this._openPopup,
        keypress: this._onKeyPress,
        remove: this.closePopup,
        move: this._movePopup
      }), this._popupHandlersAdded = !1, this._popup = null), this;
    },
    openPopup: function openPopup(t, i) {
      return this._popup && this._map && (i = this._popup._prepareOpen(this, t, i), this._map.openPopup(this._popup, i)), this;
    },
    closePopup: function closePopup() {
      return this._popup && this._popup._close(), this;
    },
    togglePopup: function togglePopup(t) {
      return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)), this;
    },
    isPopupOpen: function isPopupOpen() {
      return !!this._popup && this._popup.isOpen();
    },
    setPopupContent: function setPopupContent(t) {
      return this._popup && this._popup.setContent(t), this;
    },
    getPopup: function getPopup() {
      return this._popup;
    },
    _openPopup: function _openPopup(t) {
      var i = t.layer || t.target;
      this._popup && this._map && (Ni(t), i instanceof Be ? this.openPopup(t.layer || t.target, t.latlng) : this._map.hasLayer(this._popup) && this._popup._source === i ? this.closePopup() : this.openPopup(i, t.latlng));
    },
    _movePopup: function _movePopup(t) {
      this._popup.setLatLng(t.latlng);
    },
    _onKeyPress: function _onKeyPress(t) {
      13 === t.originalEvent.keyCode && this._openPopup(t);
    }
  });
  var en = Qe.extend({
    options: {
      pane: "tooltipPane",
      offset: [0, 0],
      direction: "auto",
      permanent: !1,
      sticky: !1,
      interactive: !1,
      opacity: .9
    },
    onAdd: function onAdd(t) {
      Qe.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
        tooltip: this
      }), this._source && this._source.fire("tooltipopen", {
        tooltip: this
      }, !0);
    },
    onRemove: function onRemove(t) {
      Qe.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
        tooltip: this
      }), this._source && this._source.fire("tooltipclose", {
        tooltip: this
      }, !0);
    },
    getEvents: function getEvents() {
      var t = Qe.prototype.getEvents.call(this);
      return bt && !this.options.permanent && (t.preclick = this._close), t;
    },
    _close: function _close() {
      this._map && this._map.closeTooltip(this);
    },
    _initLayout: function _initLayout() {
      var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
      this._contentNode = this._container = si("div", t);
    },
    _updateLayout: function _updateLayout() {},
    _adjustPan: function _adjustPan() {},
    _setPosition: function _setPosition(t) {
      var i,
          e = this._map,
          n = this._container,
          o = e.latLngToContainerPoint(e.getCenter()),
          s = e.layerPointToContainerPoint(t),
          r = this.options.direction,
          a = n.offsetWidth,
          h = n.offsetHeight,
          u = A(this.options.offset),
          l = this._getAnchor(),
          c = "top" === r ? (i = a / 2, h) : "bottom" === r ? (i = a / 2, 0) : (i = "center" === r ? a / 2 : "right" === r ? 0 : "left" === r ? a : s.x < o.x ? (r = "right", 0) : (r = "left", a + 2 * (u.x + l.x)), h / 2);

      t = t.subtract(A(i, c, !0)).add(u).add(l), _i(n, "leaflet-tooltip-right"), _i(n, "leaflet-tooltip-left"), _i(n, "leaflet-tooltip-top"), _i(n, "leaflet-tooltip-bottom"), ci(n, "leaflet-tooltip-" + r), vi(n, t);
    },
    _updatePosition: function _updatePosition() {
      var t = this._map.latLngToLayerPoint(this._latlng);

      this._setPosition(t);
    },
    setOpacity: function setOpacity(t) {
      this.options.opacity = t, this._container && mi(this._container, t);
    },
    _animateZoom: function _animateZoom(t) {
      var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);

      this._setPosition(i);
    },
    _getAnchor: function _getAnchor() {
      return A(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
    }
  });
  Ki.include({
    openTooltip: function openTooltip(t, i, e) {
      return t instanceof en || (t = new en(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : this.addLayer(t);
    },
    closeTooltip: function closeTooltip(t) {
      return t && this.removeLayer(t), this;
    }
  }), Me.include({
    bindTooltip: function bindTooltip(t, i) {
      return t instanceof en ? (c(t, i), (this._tooltip = t)._source = this) : (this._tooltip && !i || (this._tooltip = new en(i, this)), this._tooltip.setContent(t)), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
    },
    unbindTooltip: function unbindTooltip() {
      return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
    },
    _initTooltipInteractions: function _initTooltipInteractions(t) {
      var i, e;
      !t && this._tooltipHandlersAdded || (i = t ? "off" : "on", e = {
        remove: this.closeTooltip,
        move: this._moveTooltip
      }, this._tooltip.options.permanent ? e.add = this._openTooltip : (e.mouseover = this._openTooltip, e.mouseout = this.closeTooltip, this._tooltip.options.sticky && (e.mousemove = this._moveTooltip), bt && (e.click = this._openTooltip)), this[i](e), this._tooltipHandlersAdded = !t);
    },
    openTooltip: function openTooltip(t, i) {
      return this._tooltip && this._map && (i = this._tooltip._prepareOpen(this, t, i), this._map.openTooltip(this._tooltip, i), this._tooltip.options.interactive && this._tooltip._container && (ci(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))), this;
    },
    closeTooltip: function closeTooltip() {
      return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (_i(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))), this;
    },
    toggleTooltip: function toggleTooltip(t) {
      return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)), this;
    },
    isTooltipOpen: function isTooltipOpen() {
      return this._tooltip.isOpen();
    },
    setTooltipContent: function setTooltipContent(t) {
      return this._tooltip && this._tooltip.setContent(t), this;
    },
    getTooltip: function getTooltip() {
      return this._tooltip;
    },
    _openTooltip: function _openTooltip(t) {
      var i = t.layer || t.target;
      this._tooltip && this._map && this.openTooltip(i, this._tooltip.options.sticky ? t.latlng : void 0);
    },
    _moveTooltip: function _moveTooltip(t) {
      var i,
          e,
          n = t.latlng;
      this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), e = this._map.containerPointToLayerPoint(i), n = this._map.layerPointToLatLng(e)), this._tooltip.setLatLng(n);
    }
  });
  var nn = Se.extend({
    options: {
      iconSize: [12, 12],
      html: !1,
      bgPos: null,
      className: "leaflet-div-icon"
    },
    createIcon: function createIcon(t) {
      var i,
          e = t && "DIV" === t.tagName ? t : document.createElement("div"),
          n = this.options;
      return n.html instanceof Element ? (ai(e), e.appendChild(n.html)) : e.innerHTML = !1 !== n.html ? n.html : "", n.bgPos && (i = A(n.bgPos), e.style.backgroundPosition = -i.x + "px " + -i.y + "px"), this._setIconStyles(e, "icon"), e;
    },
    createShadow: function createShadow() {
      return null;
    }
  });
  Se.Default = Ze;
  var on = Me.extend({
    options: {
      tileSize: 256,
      opacity: 1,
      updateWhenIdle: yt,
      updateWhenZooming: !0,
      updateInterval: 200,
      zIndex: 1,
      bounds: null,
      minZoom: 0,
      maxZoom: void 0,
      maxNativeZoom: void 0,
      minNativeZoom: void 0,
      noWrap: !1,
      pane: "tilePane",
      className: "",
      keepBuffer: 2
    },
    initialize: function initialize(t) {
      c(this, t);
    },
    onAdd: function onAdd() {
      this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update();
    },
    beforeAdd: function beforeAdd(t) {
      t._addZoomLimit(this);
    },
    onRemove: function onRemove(t) {
      this._removeAllTiles(), ri(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
    },
    bringToFront: function bringToFront() {
      return this._map && (hi(this._container), this._setAutoZIndex(Math.max)), this;
    },
    bringToBack: function bringToBack() {
      return this._map && (ui(this._container), this._setAutoZIndex(Math.min)), this;
    },
    getContainer: function getContainer() {
      return this._container;
    },
    setOpacity: function setOpacity(t) {
      return this.options.opacity = t, this._updateOpacity(), this;
    },
    setZIndex: function setZIndex(t) {
      return this.options.zIndex = t, this._updateZIndex(), this;
    },
    isLoading: function isLoading() {
      return this._loading;
    },
    redraw: function redraw() {
      return this._map && (this._removeAllTiles(), this._update()), this;
    },
    getEvents: function getEvents() {
      var t = {
        viewprereset: this._invalidateAll,
        viewreset: this._resetView,
        zoom: this._resetView,
        moveend: this._onMoveEnd
      };
      return this.options.updateWhenIdle || (this._onMove || (this._onMove = n(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
    },
    createTile: function createTile() {
      return document.createElement("div");
    },
    getTileSize: function getTileSize() {
      var t = this.options.tileSize;
      return t instanceof k ? t : new k(t, t);
    },
    _updateZIndex: function _updateZIndex() {
      this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex);
    },
    _setAutoZIndex: function _setAutoZIndex(t) {
      for (var i, e = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, s = e.length; o < s; o++) {
        i = e[o].style.zIndex, e[o] !== this._container && i && (n = t(n, +i));
      }

      isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex());
    },
    _updateOpacity: function _updateOpacity() {
      if (this._map && !it) {
        mi(this._container, this.options.opacity);
        var t = +new Date(),
            i = !1,
            e = !1;

        for (var n in this._tiles) {
          var o,
              s = this._tiles[n];
          s.current && s.loaded && (o = Math.min(1, (t - s.loaded) / 200), mi(s.el, o), o < 1 ? i = !0 : (s.active ? e = !0 : this._onOpaqueTile(s), s.active = !0));
        }

        e && !this._noPrune && this._pruneTiles(), i && (z(this._fadeFrame), this._fadeFrame = M(this._updateOpacity, this));
      }
    },
    _onOpaqueTile: a,
    _initContainer: function _initContainer() {
      this._container || (this._container = si("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
    },
    _updateLevels: function _updateLevels() {
      var t = this._tileZoom,
          i = this.options.maxZoom;

      if (void 0 !== t) {
        for (var e in this._levels) {
          e = Number(e), this._levels[e].el.children.length || e === t ? (this._levels[e].el.style.zIndex = i - Math.abs(t - e), this._onUpdateLevel(e)) : (ri(this._levels[e].el), this._removeTilesAtZoom(e), this._onRemoveLevel(e), delete this._levels[e]);
        }

        var n = this._levels[t],
            o = this._map;
        return n || ((n = this._levels[t] = {}).el = si("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = i, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), a(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n;
      }
    },
    _onUpdateLevel: a,
    _onRemoveLevel: a,
    _onCreateLevel: a,
    _pruneTiles: function _pruneTiles() {
      if (this._map) {
        var t,
            i,
            e,
            n = this._map.getZoom();

        if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles();else {
          for (t in this._tiles) {
            (e = this._tiles[t]).retain = e.current;
          }

          for (t in this._tiles) {
            (e = this._tiles[t]).current && !e.active && (i = e.coords, this._retainParent(i.x, i.y, i.z, i.z - 5) || this._retainChildren(i.x, i.y, i.z, i.z + 2));
          }

          for (t in this._tiles) {
            this._tiles[t].retain || this._removeTile(t);
          }
        }
      }
    },
    _removeTilesAtZoom: function _removeTilesAtZoom(t) {
      for (var i in this._tiles) {
        this._tiles[i].coords.z === t && this._removeTile(i);
      }
    },
    _removeAllTiles: function _removeAllTiles() {
      for (var t in this._tiles) {
        this._removeTile(t);
      }
    },
    _invalidateAll: function _invalidateAll() {
      for (var t in this._levels) {
        ri(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
      }

      this._removeAllTiles(), this._tileZoom = void 0;
    },
    _retainParent: function _retainParent(t, i, e, n) {
      var o = Math.floor(t / 2),
          s = Math.floor(i / 2),
          r = e - 1,
          a = new k(+o, +s);
      a.z = +r;

      var h = this._tileCoordsToKey(a),
          u = this._tiles[h];

      return u && u.active ? u.retain = !0 : (u && u.loaded && (u.retain = !0), n < r && this._retainParent(o, s, r, n));
    },
    _retainChildren: function _retainChildren(t, i, e, n) {
      for (var o = 2 * t; o < 2 * t + 2; o++) {
        for (var s = 2 * i; s < 2 * i + 2; s++) {
          var r = new k(o, s);
          r.z = e + 1;

          var a = this._tileCoordsToKey(r),
              h = this._tiles[a];

          h && h.active ? h.retain = !0 : (h && h.loaded && (h.retain = !0), e + 1 < n && this._retainChildren(o, s, e + 1, n));
        }
      }
    },
    _resetView: function _resetView(t) {
      var i = t && (t.pinch || t.flyTo);

      this._setView(this._map.getCenter(), this._map.getZoom(), i, i);
    },
    _animateZoom: function _animateZoom(t) {
      this._setView(t.center, t.zoom, !0, t.noUpdate);
    },
    _clampZoom: function _clampZoom(t) {
      var i = this.options;
      return void 0 !== i.minNativeZoom && t < i.minNativeZoom ? i.minNativeZoom : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t ? i.maxNativeZoom : t;
    },
    _setView: function _setView(t, i, e, n) {
      var o = Math.round(i),
          o = void 0 !== this.options.maxZoom && o > this.options.maxZoom || void 0 !== this.options.minZoom && o < this.options.minZoom ? void 0 : this._clampZoom(o),
          s = this.options.updateWhenZooming && o !== this._tileZoom;
      n && !s || (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), void 0 !== o && this._update(t), e || this._pruneTiles(), this._noPrune = !!e), this._setZoomTransforms(t, i);
    },
    _setZoomTransforms: function _setZoomTransforms(t, i) {
      for (var e in this._levels) {
        this._setZoomTransform(this._levels[e], t, i);
      }
    },
    _setZoomTransform: function _setZoomTransform(t, i, e) {
      var n = this._map.getZoomScale(e, t.zoom),
          o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round();

      vt ? gi(t.el, o, n) : vi(t.el, o);
    },
    _resetGrid: function _resetGrid() {
      var t = this._map,
          i = t.options.crs,
          e = this._tileSize = this.getTileSize(),
          n = this._tileZoom,
          o = this._map.getPixelWorldBounds(this._tileZoom);

      o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = i.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)], this._wrapY = i.wrapLat && !this.options.noWrap && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)];
    },
    _onMoveEnd: function _onMoveEnd() {
      this._map && !this._map._animatingZoom && this._update();
    },
    _getTiledPixelBounds: function _getTiledPixelBounds(t) {
      var i = this._map,
          e = i._animatingZoom ? Math.max(i._animateToZoom, i.getZoom()) : i.getZoom(),
          n = i.getZoomScale(e, this._tileZoom),
          o = i.project(t, this._tileZoom).floor(),
          s = i.getSize().divideBy(2 * n);
      return new I(o.subtract(s), o.add(s));
    },
    _update: function _update(t) {
      var i = this._map;

      if (i) {
        var e = this._clampZoom(i.getZoom());

        if (void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom) {
          var n = this._getTiledPixelBounds(t),
              o = this._pxBoundsToTileRange(n),
              s = o.getCenter(),
              r = [],
              a = this.options.keepBuffer,
              h = new I(o.getBottomLeft().subtract([a, -a]), o.getTopRight().add([a, -a]));

          if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y))) throw new Error("Attempted to load an infinite number of tiles");

          for (var u in this._tiles) {
            var l = this._tiles[u].coords;
            l.z === this._tileZoom && h.contains(new k(l.x, l.y)) || (this._tiles[u].current = !1);
          }

          if (1 < Math.abs(e - this._tileZoom)) this._setView(t, e);else {
            for (var c = o.min.y; c <= o.max.y; c++) {
              for (var _ = o.min.x; _ <= o.max.x; _++) {
                var d,
                    p = new k(_, c);
                p.z = this._tileZoom, this._isValidTile(p) && ((d = this._tiles[this._tileCoordsToKey(p)]) ? d.current = !0 : r.push(p));
              }
            }

            if (r.sort(function (t, i) {
              return t.distanceTo(s) - i.distanceTo(s);
            }), 0 !== r.length) {
              this._loading || (this._loading = !0, this.fire("loading"));

              for (var m = document.createDocumentFragment(), _ = 0; _ < r.length; _++) {
                this._addTile(r[_], m);
              }

              this._level.el.appendChild(m);
            }
          }
        }
      }
    },
    _isValidTile: function _isValidTile(t) {
      var i = this._map.options.crs;

      if (!i.infinite) {
        var e = this._globalTileRange;
        if (!i.wrapLng && (t.x < e.min.x || t.x > e.max.x) || !i.wrapLat && (t.y < e.min.y || t.y > e.max.y)) return !1;
      }

      if (!this.options.bounds) return !0;

      var n = this._tileCoordsToBounds(t);

      return N(this.options.bounds).overlaps(n);
    },
    _keyToBounds: function _keyToBounds(t) {
      return this._tileCoordsToBounds(this._keyToTileCoords(t));
    },
    _tileCoordsToNwSe: function _tileCoordsToNwSe(t) {
      var i = this._map,
          e = this.getTileSize(),
          n = t.scaleBy(e),
          o = n.add(e);
      return [i.unproject(n, t.z), i.unproject(o, t.z)];
    },
    _tileCoordsToBounds: function _tileCoordsToBounds(t) {
      var i = this._tileCoordsToNwSe(t),
          e = new R(i[0], i[1]);

      return this.options.noWrap || (e = this._map.wrapLatLngBounds(e)), e;
    },
    _tileCoordsToKey: function _tileCoordsToKey(t) {
      return t.x + ":" + t.y + ":" + t.z;
    },
    _keyToTileCoords: function _keyToTileCoords(t) {
      var i = t.split(":"),
          e = new k(+i[0], +i[1]);
      return e.z = +i[2], e;
    },
    _removeTile: function _removeTile(t) {
      var i = this._tiles[t];
      i && (ri(i.el), delete this._tiles[t], this.fire("tileunload", {
        tile: i.el,
        coords: this._keyToTileCoords(t)
      }));
    },
    _initTile: function _initTile(t) {
      ci(t, "leaflet-tile");
      var i = this.getTileSize();
      t.style.width = i.x + "px", t.style.height = i.y + "px", t.onselectstart = a, t.onmousemove = a, it && this.options.opacity < 1 && mi(t, this.options.opacity), ot && !st && (t.style.WebkitBackfaceVisibility = "hidden");
    },
    _addTile: function _addTile(t, i) {
      var e = this._getTilePos(t),
          n = this._tileCoordsToKey(t),
          o = this.createTile(this._wrapCoords(t), p(this._tileReady, this, t));

      this._initTile(o), this.createTile.length < 2 && M(p(this._tileReady, this, t, null, o)), vi(o, e), this._tiles[n] = {
        el: o,
        coords: t,
        current: !0
      }, i.appendChild(o), this.fire("tileloadstart", {
        tile: o,
        coords: t
      });
    },
    _tileReady: function _tileReady(t, i, e) {
      i && this.fire("tileerror", {
        error: i,
        tile: e,
        coords: t
      });

      var n = this._tileCoordsToKey(t);

      (e = this._tiles[n]) && (e.loaded = +new Date(), this._map._fadeAnimated ? (mi(e.el, 0), z(this._fadeFrame), this._fadeFrame = M(this._updateOpacity, this)) : (e.active = !0, this._pruneTiles()), i || (ci(e.el, "leaflet-tile-loaded"), this.fire("tileload", {
        tile: e.el,
        coords: t
      })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), it || !this._map._fadeAnimated ? M(this._pruneTiles, this) : setTimeout(p(this._pruneTiles, this), 250)));
    },
    _getTilePos: function _getTilePos(t) {
      return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
    },
    _wrapCoords: function _wrapCoords(t) {
      var i = new k(this._wrapX ? o(t.x, this._wrapX) : t.x, this._wrapY ? o(t.y, this._wrapY) : t.y);
      return i.z = t.z, i;
    },
    _pxBoundsToTileRange: function _pxBoundsToTileRange(t) {
      var i = this.getTileSize();
      return new I(t.min.unscaleBy(i).floor(), t.max.unscaleBy(i).ceil().subtract([1, 1]));
    },
    _noTilesToLoad: function _noTilesToLoad() {
      for (var t in this._tiles) {
        if (!this._tiles[t].loaded) return !1;
      }

      return !0;
    }
  });
  var sn = on.extend({
    options: {
      minZoom: 0,
      maxZoom: 18,
      subdomains: "abc",
      errorTileUrl: "",
      zoomOffset: 0,
      tms: !1,
      zoomReverse: !1,
      detectRetina: !1,
      crossOrigin: !1
    },
    initialize: function initialize(t, i) {
      this._url = t, (i = c(this, i)).detectRetina && zt && 0 < i.maxZoom && (i.tileSize = Math.floor(i.tileSize / 2), i.zoomReverse ? (i.zoomOffset--, i.minZoom++) : (i.zoomOffset++, i.maxZoom--), i.minZoom = Math.max(0, i.minZoom)), "string" == typeof i.subdomains && (i.subdomains = i.subdomains.split("")), ot || this.on("tileunload", this._onTileRemove);
    },
    setUrl: function setUrl(t, i) {
      return this._url === t && void 0 === i && (i = !0), this._url = t, i || this.redraw(), this;
    },
    createTile: function createTile(t, i) {
      var e = document.createElement("img");
      return zi(e, "load", p(this._tileOnLoad, this, i, e)), zi(e, "error", p(this._tileOnError, this, i, e)), !this.options.crossOrigin && "" !== this.options.crossOrigin || (e.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), e.alt = "", e.setAttribute("role", "presentation"), e.src = this.getTileUrl(t), e;
    },
    getTileUrl: function getTileUrl(t) {
      var i,
          e = {
        r: zt ? "@2x" : "",
        s: this._getSubdomain(t),
        x: t.x,
        y: t.y,
        z: this._getZoomForUrl()
      };
      return this._map && !this._map.options.crs.infinite && (i = this._globalTileRange.max.y - t.y, this.options.tms && (e.y = i), e["-y"] = i), f(this._url, h(e, this.options));
    },
    _tileOnLoad: function _tileOnLoad(t, i) {
      it ? setTimeout(p(t, this, null, i), 0) : t(null, i);
    },
    _tileOnError: function _tileOnError(t, i, e) {
      var n = this.options.errorTileUrl;
      n && i.getAttribute("src") !== n && (i.src = n), t(e, i);
    },
    _onTileRemove: function _onTileRemove(t) {
      t.tile.onload = null;
    },
    _getZoomForUrl: function _getZoomForUrl() {
      var t = this._tileZoom,
          i = this.options.maxZoom;
      return this.options.zoomReverse && (t = i - t), t + this.options.zoomOffset;
    },
    _getSubdomain: function _getSubdomain(t) {
      var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
      return this.options.subdomains[i];
    },
    _abortLoading: function _abortLoading() {
      var t, i;

      for (t in this._tiles) {
        this._tiles[t].coords.z !== this._tileZoom && ((i = this._tiles[t].el).onload = a, i.onerror = a, i.complete || (i.src = y, ri(i), delete this._tiles[t]));
      }
    },
    _removeTile: function _removeTile(t) {
      var i = this._tiles[t];
      if (i) return at || i.el.setAttribute("src", y), on.prototype._removeTile.call(this, t);
    },
    _tileReady: function _tileReady(t, i, e) {
      if (this._map && (!e || e.getAttribute("src") !== y)) return on.prototype._tileReady.call(this, t, i, e);
    }
  });

  function rn(t, i) {
    return new sn(t, i);
  }

  var an = sn.extend({
    defaultWmsParams: {
      service: "WMS",
      request: "GetMap",
      layers: "",
      styles: "",
      format: "image/jpeg",
      transparent: !1,
      version: "1.1.1"
    },
    options: {
      crs: null,
      uppercase: !1
    },
    initialize: function initialize(t, i) {
      this._url = t;
      var e = h({}, this.defaultWmsParams);

      for (var n in i) {
        n in this.options || (e[n] = i[n]);
      }

      var o = (i = c(this, i)).detectRetina && zt ? 2 : 1,
          s = this.getTileSize();
      e.width = s.x * o, e.height = s.y * o, this.wmsParams = e;
    },
    onAdd: function onAdd(t) {
      this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
      var i = 1.3 <= this._wmsVersion ? "crs" : "srs";
      this.wmsParams[i] = this._crs.code, sn.prototype.onAdd.call(this, t);
    },
    getTileUrl: function getTileUrl(t) {
      var i = this._tileCoordsToNwSe(t),
          e = this._crs,
          n = O(e.project(i[0]), e.project(i[1])),
          o = n.min,
          s = n.max,
          r = (1.3 <= this._wmsVersion && this._crs === be ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(","),
          a = sn.prototype.getTileUrl.call(this, t);

      return a + _(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + r;
    },
    setParams: function setParams(t, i) {
      return h(this.wmsParams, t), i || this.redraw(), this;
    }
  });
  sn.WMS = an, rn.wms = function (t, i) {
    return new an(t, i);
  };
  var hn = Me.extend({
    options: {
      padding: .1,
      tolerance: 0
    },
    initialize: function initialize(t) {
      c(this, t), m(this), this._layers = this._layers || {};
    },
    onAdd: function onAdd() {
      this._container || (this._initContainer(), this._zoomAnimated && ci(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
    },
    onRemove: function onRemove() {
      this.off("update", this._updatePaths, this), this._destroyContainer();
    },
    getEvents: function getEvents() {
      var t = {
        viewreset: this._reset,
        zoom: this._onZoom,
        moveend: this._update,
        zoomend: this._onZoomEnd
      };
      return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
    },
    _onAnimZoom: function _onAnimZoom(t) {
      this._updateTransform(t.center, t.zoom);
    },
    _onZoom: function _onZoom() {
      this._updateTransform(this._map.getCenter(), this._map.getZoom());
    },
    _updateTransform: function _updateTransform(t, i) {
      var e = this._map.getZoomScale(i, this._zoom),
          n = yi(this._container),
          o = this._map.getSize().multiplyBy(.5 + this.options.padding),
          s = this._map.project(this._center, i),
          r = this._map.project(t, i).subtract(s),
          a = o.multiplyBy(-e).add(n).add(o).subtract(r);

      vt ? gi(this._container, a, e) : vi(this._container, a);
    },
    _reset: function _reset() {
      for (var t in this._update(), this._updateTransform(this._center, this._zoom), this._layers) {
        this._layers[t]._reset();
      }
    },
    _onZoomEnd: function _onZoomEnd() {
      for (var t in this._layers) {
        this._layers[t]._project();
      }
    },
    _updatePaths: function _updatePaths() {
      for (var t in this._layers) {
        this._layers[t]._update();
      }
    },
    _update: function _update() {
      var t = this.options.padding,
          i = this._map.getSize(),
          e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();

      this._bounds = new I(e, e.add(i.multiplyBy(1 + 2 * t)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
    }
  }),
      un = hn.extend({
    getEvents: function getEvents() {
      var t = hn.prototype.getEvents.call(this);
      return t.viewprereset = this._onViewPreReset, t;
    },
    _onViewPreReset: function _onViewPreReset() {
      this._postponeUpdatePaths = !0;
    },
    onAdd: function onAdd() {
      hn.prototype.onAdd.call(this), this._draw();
    },
    _initContainer: function _initContainer() {
      var t = this._container = document.createElement("canvas");
      zi(t, "mousemove", this._onMouseMove, this), zi(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), zi(t, "mouseout", this._handleMouseOut, this), this._ctx = t.getContext("2d");
    },
    _destroyContainer: function _destroyContainer() {
      z(this._redrawRequest), delete this._ctx, ri(this._container), Si(this._container), delete this._container;
    },
    _updatePaths: function _updatePaths() {
      if (!this._postponeUpdatePaths) {
        for (var t in this._redrawBounds = null, this._layers) {
          this._layers[t]._update();
        }

        this._redraw();
      }
    },
    _update: function _update() {
      var t, i, e, n;
      this._map._animatingZoom && this._bounds || (hn.prototype._update.call(this), t = this._bounds, i = this._container, e = t.getSize(), n = zt ? 2 : 1, vi(i, t.min), i.width = n * e.x, i.height = n * e.y, i.style.width = e.x + "px", i.style.height = e.y + "px", zt && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update"));
    },
    _reset: function _reset() {
      hn.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
    },
    _initPath: function _initPath(t) {
      this._updateDashArray(t);

      var i = (this._layers[m(t)] = t)._order = {
        layer: t,
        prev: this._drawLast,
        next: null
      };
      this._drawLast && (this._drawLast.next = i), this._drawLast = i, this._drawFirst = this._drawFirst || this._drawLast;
    },
    _addPath: function _addPath(t) {
      this._requestRedraw(t);
    },
    _removePath: function _removePath(t) {
      var i = t._order,
          e = i.next,
          n = i.prev;
      e ? e.prev = n : this._drawLast = n, n ? n.next = e : this._drawFirst = e, delete t._order, delete this._layers[m(t)], this._requestRedraw(t);
    },
    _updatePath: function _updatePath(t) {
      this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
    },
    _updateStyle: function _updateStyle(t) {
      this._updateDashArray(t), this._requestRedraw(t);
    },
    _updateDashArray: function _updateDashArray(t) {
      if ("string" == typeof t.options.dashArray) {
        for (var i, e = t.options.dashArray.split(/[, ]+/), n = [], o = 0; o < e.length; o++) {
          if (i = Number(e[o]), isNaN(i)) return;
          n.push(i);
        }

        t.options._dashArray = n;
      } else t.options._dashArray = t.options.dashArray;
    },
    _requestRedraw: function _requestRedraw(t) {
      this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || M(this._redraw, this));
    },
    _extendRedrawBounds: function _extendRedrawBounds(t) {
      var i;
      t._pxBounds && (i = (t.options.weight || 0) + 1, this._redrawBounds = this._redrawBounds || new I(), this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])), this._redrawBounds.extend(t._pxBounds.max.add([i, i])));
    },
    _redraw: function _redraw() {
      this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
    },
    _clear: function _clear() {
      var t,
          i = this._redrawBounds;
      i ? (t = i.getSize(), this._ctx.clearRect(i.min.x, i.min.y, t.x, t.y)) : (this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore());
    },
    _draw: function _draw() {
      var t,
          i,
          e = this._redrawBounds;
      this._ctx.save(), e && (i = e.getSize(), this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip()), this._drawing = !0;

      for (var n = this._drawFirst; n; n = n.next) {
        t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
      }

      this._drawing = !1, this._ctx.restore();
    },
    _updatePoly: function _updatePoly(t, i) {
      if (this._drawing) {
        var e,
            n,
            o,
            s,
            r = t._parts,
            a = r.length,
            h = this._ctx;

        if (a) {
          for (h.beginPath(), e = 0; e < a; e++) {
            for (n = 0, o = r[e].length; n < o; n++) {
              s = r[e][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
            }

            i && h.closePath();
          }

          this._fillStroke(h, t);
        }
      }
    },
    _updateCircle: function _updateCircle(t) {
      var i, e, n, o;
      this._drawing && !t._empty() && (i = t._point, e = this._ctx, n = Math.max(Math.round(t._radius), 1), 1 != (o = (Math.max(Math.round(t._radiusY), 1) || n) / n) && (e.save(), e.scale(1, o)), e.beginPath(), e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1), 1 != o && e.restore(), this._fillStroke(e, t));
    },
    _fillStroke: function _fillStroke(t, i) {
      var e = i.options;
      e.fill && (t.globalAlpha = e.fillOpacity, t.fillStyle = e.fillColor || e.color, t.fill(e.fillRule || "evenodd")), e.stroke && 0 !== e.weight && (t.setLineDash && t.setLineDash(i.options && i.options._dashArray || []), t.globalAlpha = e.opacity, t.lineWidth = e.weight, t.strokeStyle = e.color, t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.stroke());
    },
    _onClick: function _onClick(t) {
      for (var i, e, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next) {
        (i = o.layer).options.interactive && i._containsPoint(n) && (("click" === t.type || "preclick" !== t.type) && this._map._draggableMoved(i) || (e = i));
      }

      e && (Fi(t), this._fireEvent([e], t));
    },
    _onMouseMove: function _onMouseMove(t) {
      var i;
      !this._map || this._map.dragging.moving() || this._map._animatingZoom || (i = this._map.mouseEventToLayerPoint(t), this._handleMouseHover(t, i));
    },
    _handleMouseOut: function _handleMouseOut(t) {
      var i = this._hoveredLayer;
      i && (_i(this._container, "leaflet-interactive"), this._fireEvent([i], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
    },
    _handleMouseHover: function _handleMouseHover(t, i) {
      if (!this._mouseHoverThrottled) {
        for (var e, n, o = this._drawFirst; o; o = o.next) {
          (e = o.layer).options.interactive && e._containsPoint(i) && (n = e);
        }

        n !== this._hoveredLayer && (this._handleMouseOut(t), n && (ci(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._hoveredLayer && this._fireEvent([this._hoveredLayer], t), this._mouseHoverThrottled = !0, setTimeout(p(function () {
          this._mouseHoverThrottled = !1;
        }, this), 32);
      }
    },
    _fireEvent: function _fireEvent(t, i, e) {
      this._map._fireDOMEvent(i, e || i.type, t);
    },
    _bringToFront: function _bringToFront(t) {
      var i,
          e,
          n = t._order;
      n && (i = n.next, e = n.prev, i && ((i.prev = e) ? e.next = i : i && (this._drawFirst = i), n.prev = this._drawLast, (this._drawLast.next = n).next = null, this._drawLast = n, this._requestRedraw(t)));
    },
    _bringToBack: function _bringToBack(t) {
      var i,
          e,
          n = t._order;
      n && (i = n.next, (e = n.prev) && ((e.next = i) ? i.prev = e : e && (this._drawLast = e), n.prev = null, n.next = this._drawFirst, this._drawFirst.prev = n, this._drawFirst = n, this._requestRedraw(t)));
    }
  });

  function ln(t) {
    return St ? new un(t) : null;
  }

  var cn = function () {
    try {
      return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function (t) {
        return document.createElement("<lvml:" + t + ' class="lvml">');
      };
    } catch (t) {
      return function (t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }
  }(),
      _n = {
    _initContainer: function _initContainer() {
      this._container = si("div", "leaflet-vml-container");
    },
    _update: function _update() {
      this._map._animatingZoom || (hn.prototype._update.call(this), this.fire("update"));
    },
    _initPath: function _initPath(t) {
      var i = t._container = cn("shape");
      ci(i, "leaflet-vml-shape " + (this.options.className || "")), i.coordsize = "1 1", t._path = cn("path"), i.appendChild(t._path), this._updateStyle(t), this._layers[m(t)] = t;
    },
    _addPath: function _addPath(t) {
      var i = t._container;
      this._container.appendChild(i), t.options.interactive && t.addInteractiveTarget(i);
    },
    _removePath: function _removePath(t) {
      var i = t._container;
      ri(i), t.removeInteractiveTarget(i), delete this._layers[m(t)];
    },
    _updateStyle: function _updateStyle(t) {
      var i = t._stroke,
          e = t._fill,
          n = t.options,
          o = t._container;
      o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (i = i || (t._stroke = cn("stroke")), o.appendChild(i), i.weight = n.weight + "px", i.color = n.color, i.opacity = n.opacity, n.dashArray ? i.dashStyle = g(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : i.dashStyle = "", i.endcap = n.lineCap.replace("butt", "flat"), i.joinstyle = n.lineJoin) : i && (o.removeChild(i), t._stroke = null), n.fill ? (e = e || (t._fill = cn("fill")), o.appendChild(e), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (o.removeChild(e), t._fill = null);
    },
    _updateCircle: function _updateCircle(t) {
      var i = t._point.round(),
          e = Math.round(t._radius),
          n = Math.round(t._radiusY || e);

      this._setPath(t, t._empty() ? "M0 0" : "AL " + i.x + "," + i.y + " " + e + "," + n + " 0,23592600");
    },
    _setPath: function _setPath(t, i) {
      t._path.v = i;
    },
    _bringToFront: function _bringToFront(t) {
      hi(t._container);
    },
    _bringToBack: function _bringToBack(t) {
      ui(t._container);
    }
  },
      dn = Et ? cn : J,
      pn = hn.extend({
    getEvents: function getEvents() {
      var t = hn.prototype.getEvents.call(this);
      return t.zoomstart = this._onZoomStart, t;
    },
    _initContainer: function _initContainer() {
      this._container = dn("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = dn("g"), this._container.appendChild(this._rootGroup);
    },
    _destroyContainer: function _destroyContainer() {
      ri(this._container), Si(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
    },
    _onZoomStart: function _onZoomStart() {
      this._update();
    },
    _update: function _update() {
      var t, i, e;
      this._map._animatingZoom && this._bounds || (hn.prototype._update.call(this), i = (t = this._bounds).getSize(), e = this._container, this._svgSize && this._svgSize.equals(i) || (this._svgSize = i, e.setAttribute("width", i.x), e.setAttribute("height", i.y)), vi(e, t.min), e.setAttribute("viewBox", [t.min.x, t.min.y, i.x, i.y].join(" ")), this.fire("update"));
    },
    _initPath: function _initPath(t) {
      var i = t._path = dn("path");
      t.options.className && ci(i, t.options.className), t.options.interactive && ci(i, "leaflet-interactive"), this._updateStyle(t), this._layers[m(t)] = t;
    },
    _addPath: function _addPath(t) {
      this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
    },
    _removePath: function _removePath(t) {
      ri(t._path), t.removeInteractiveTarget(t._path), delete this._layers[m(t)];
    },
    _updatePath: function _updatePath(t) {
      t._project(), t._update();
    },
    _updateStyle: function _updateStyle(t) {
      var i = t._path,
          e = t.options;
      i && (e.stroke ? (i.setAttribute("stroke", e.color), i.setAttribute("stroke-opacity", e.opacity), i.setAttribute("stroke-width", e.weight), i.setAttribute("stroke-linecap", e.lineCap), i.setAttribute("stroke-linejoin", e.lineJoin), e.dashArray ? i.setAttribute("stroke-dasharray", e.dashArray) : i.removeAttribute("stroke-dasharray"), e.dashOffset ? i.setAttribute("stroke-dashoffset", e.dashOffset) : i.removeAttribute("stroke-dashoffset")) : i.setAttribute("stroke", "none"), e.fill ? (i.setAttribute("fill", e.fillColor || e.color), i.setAttribute("fill-opacity", e.fillOpacity), i.setAttribute("fill-rule", e.fillRule || "evenodd")) : i.setAttribute("fill", "none"));
    },
    _updatePoly: function _updatePoly(t, i) {
      this._setPath(t, $(t._parts, i));
    },
    _updateCircle: function _updateCircle(t) {
      var i = t._point,
          e = Math.max(Math.round(t._radius), 1),
          n = "a" + e + "," + (Math.max(Math.round(t._radiusY), 1) || e) + " 0 1,0 ",
          o = t._empty() ? "M0 0" : "M" + (i.x - e) + "," + i.y + n + 2 * e + ",0 " + n + 2 * -e + ",0 ";

      this._setPath(t, o);
    },
    _setPath: function _setPath(t, i) {
      t._path.setAttribute("d", i);
    },
    _bringToFront: function _bringToFront(t) {
      hi(t._path);
    },
    _bringToBack: function _bringToBack(t) {
      ui(t._path);
    }
  });

  function mn(t) {
    return Zt || Et ? new pn(t) : null;
  }

  Et && pn.include(_n), Ki.include({
    getRenderer: function getRenderer(t) {
      var i = (i = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer) || (this._renderer = this._createRenderer());

      return this.hasLayer(i) || this.addLayer(i), i;
    },
    _getPaneRenderer: function _getPaneRenderer(t) {
      if ("overlayPane" === t || void 0 === t) return !1;
      var i = this._paneRenderers[t];
      return void 0 === i && (i = this._createRenderer({
        pane: t
      }), this._paneRenderers[t] = i), i;
    },
    _createRenderer: function _createRenderer(t) {
      return this.options.preferCanvas && ln(t) || mn(t);
    }
  });
  var fn = Re.extend({
    initialize: function initialize(t, i) {
      Re.prototype.initialize.call(this, this._boundsToLatLngs(t), i);
    },
    setBounds: function setBounds(t) {
      return this.setLatLngs(this._boundsToLatLngs(t));
    },
    _boundsToLatLngs: function _boundsToLatLngs(t) {
      return [(t = N(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()];
    }
  });
  pn.create = dn, pn.pointsToPath = $, Ne.geometryToLayer = De, Ne.coordsToLatLng = We, Ne.coordsToLatLngs = He, Ne.latLngToCoords = Fe, Ne.latLngsToCoords = Ue, Ne.getFeature = Ve, Ne.asFeature = qe, Ki.mergeOptions({
    boxZoom: !0
  });
  var gn = ie.extend({
    initialize: function initialize(t) {
      this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
    },
    addHooks: function addHooks() {
      zi(this._container, "mousedown", this._onMouseDown, this);
    },
    removeHooks: function removeHooks() {
      Si(this._container, "mousedown", this._onMouseDown, this);
    },
    moved: function moved() {
      return this._moved;
    },
    _destroy: function _destroy() {
      ri(this._pane), delete this._pane;
    },
    _resetState: function _resetState() {
      this._resetStateTimeout = 0, this._moved = !1;
    },
    _clearDeferredResetState: function _clearDeferredResetState() {
      0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
    },
    _onMouseDown: function _onMouseDown(t) {
      if (!t.shiftKey || 1 !== t.which && 1 !== t.button) return !1;
      this._clearDeferredResetState(), this._resetState(), Xt(), xi(), this._startPoint = this._map.mouseEventToContainerPoint(t), zi(document, {
        contextmenu: Ni,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown
      }, this);
    },
    _onMouseMove: function _onMouseMove(t) {
      this._moved || (this._moved = !0, this._box = si("div", "leaflet-zoom-box", this._container), ci(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
      var i = new I(this._point, this._startPoint),
          e = i.getSize();
      vi(this._box, i.min), this._box.style.width = e.x + "px", this._box.style.height = e.y + "px";
    },
    _finish: function _finish() {
      this._moved && (ri(this._box), _i(this._container, "leaflet-crosshair")), Jt(), wi(), Si(document, {
        contextmenu: Ni,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown
      }, this);
    },
    _onMouseUp: function _onMouseUp(t) {
      var i;
      1 !== t.which && 1 !== t.button || (this._finish(), this._moved && (this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(p(this._resetState, this), 0), i = new R(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point)), this._map.fitBounds(i).fire("boxzoomend", {
        boxZoomBounds: i
      })));
    },
    _onKeyDown: function _onKeyDown(t) {
      27 === t.keyCode && this._finish();
    }
  });
  Ki.addInitHook("addHandler", "boxZoom", gn), Ki.mergeOptions({
    doubleClickZoom: !0
  });
  var vn = ie.extend({
    addHooks: function addHooks() {
      this._map.on("dblclick", this._onDoubleClick, this);
    },
    removeHooks: function removeHooks() {
      this._map.off("dblclick", this._onDoubleClick, this);
    },
    _onDoubleClick: function _onDoubleClick(t) {
      var i = this._map,
          e = i.getZoom(),
          n = i.options.zoomDelta,
          o = t.originalEvent.shiftKey ? e - n : e + n;
      "center" === i.options.doubleClickZoom ? i.setZoom(o) : i.setZoomAround(t.containerPoint, o);
    }
  });
  Ki.addInitHook("addHandler", "doubleClickZoom", vn), Ki.mergeOptions({
    dragging: !0,
    inertia: !st,
    inertiaDeceleration: 3400,
    inertiaMaxSpeed: 1 / 0,
    easeLinearity: .2,
    worldCopyJump: !1,
    maxBoundsViscosity: 0
  });
  var yn = ie.extend({
    addHooks: function addHooks() {
      var t;
      this._draggable || (t = this._map, this._draggable = new ae(t._mapPane, t._container), this._draggable.on({
        dragstart: this._onDragStart,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))), ci(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
    },
    removeHooks: function removeHooks() {
      _i(this._map._container, "leaflet-grab"), _i(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
    },
    moved: function moved() {
      return this._draggable && this._draggable._moved;
    },
    moving: function moving() {
      return this._draggable && this._draggable._moving;
    },
    _onDragStart: function _onDragStart() {
      var t,
          i = this._map;
      i._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity ? (t = N(this._map.options.maxBounds), this._offsetLimit = O(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))) : this._offsetLimit = null, i.fire("movestart").fire("dragstart"), i.options.inertia && (this._positions = [], this._times = []);
    },
    _onDrag: function _onDrag(t) {
      var i, e;
      this._map.options.inertia && (i = this._lastTime = +new Date(), e = this._lastPos = this._draggable._absPos || this._draggable._newPos, this._positions.push(e), this._times.push(i), this._prunePositions(i)), this._map.fire("move", t).fire("drag", t);
    },
    _prunePositions: function _prunePositions(t) {
      for (; 1 < this._positions.length && 50 < t - this._times[0];) {
        this._positions.shift(), this._times.shift();
      }
    },
    _onZoomEnd: function _onZoomEnd() {
      var t = this._map.getSize().divideBy(2),
          i = this._map.latLngToLayerPoint([0, 0]);

      this._initialWorldOffset = i.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
    },
    _viscousLimit: function _viscousLimit(t, i) {
      return t - (t - i) * this._viscosity;
    },
    _onPreDragLimit: function _onPreDragLimit() {
      var t, i;
      this._viscosity && this._offsetLimit && (t = this._draggable._newPos.subtract(this._draggable._startPos), i = this._offsetLimit, t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)), t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)), t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)), t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)), this._draggable._newPos = this._draggable._startPos.add(t));
    },
    _onPreDragWrap: function _onPreDragWrap() {
      var t = this._worldWidth,
          i = Math.round(t / 2),
          e = this._initialWorldOffset,
          n = this._draggable._newPos.x,
          o = (n - i + e) % t + i - e,
          s = (n + i + e) % t - i - e,
          r = Math.abs(o + e) < Math.abs(s + e) ? o : s;
      this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r;
    },
    _onDragEnd: function _onDragEnd(t) {
      var i,
          e,
          n,
          o,
          s,
          r,
          a,
          h,
          u,
          l = this._map,
          c = l.options,
          _ = !c.inertia || this._times.length < 2;

      l.fire("dragend", t), _ ? l.fire("moveend") : (this._prunePositions(+new Date()), i = this._lastPos.subtract(this._positions[0]), e = (this._lastTime - this._times[0]) / 1e3, n = c.easeLinearity, s = (o = i.multiplyBy(n / e)).distanceTo([0, 0]), r = Math.min(c.inertiaMaxSpeed, s), a = o.multiplyBy(r / s), h = r / (c.inertiaDeceleration * n), (u = a.multiplyBy(-h / 2).round()).x || u.y ? (u = l._limitOffset(u, l.options.maxBounds), M(function () {
        l.panBy(u, {
          duration: h,
          easeLinearity: n,
          noMoveStart: !0,
          animate: !0
        });
      })) : l.fire("moveend"));
    }
  });
  Ki.addInitHook("addHandler", "dragging", yn), Ki.mergeOptions({
    keyboard: !0,
    keyboardPanDelta: 80
  });
  var xn = ie.extend({
    keyCodes: {
      left: [37],
      right: [39],
      down: [40],
      up: [38],
      zoomIn: [187, 107, 61, 171],
      zoomOut: [189, 109, 54, 173]
    },
    initialize: function initialize(t) {
      this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
    },
    addHooks: function addHooks() {
      var t = this._map._container;
      t.tabIndex <= 0 && (t.tabIndex = "0"), zi(t, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown
      }, this), this._map.on({
        focus: this._addHooks,
        blur: this._removeHooks
      }, this);
    },
    removeHooks: function removeHooks() {
      this._removeHooks(), Si(this._map._container, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown
      }, this), this._map.off({
        focus: this._addHooks,
        blur: this._removeHooks
      }, this);
    },
    _onMouseDown: function _onMouseDown() {
      var t, i, e, n;
      this._focused || (t = document.body, i = document.documentElement, e = t.scrollTop || i.scrollTop, n = t.scrollLeft || i.scrollLeft, this._map._container.focus(), window.scrollTo(n, e));
    },
    _onFocus: function _onFocus() {
      this._focused = !0, this._map.fire("focus");
    },
    _onBlur: function _onBlur() {
      this._focused = !1, this._map.fire("blur");
    },
    _setPanDelta: function _setPanDelta(t) {
      for (var i = this._panKeys = {}, e = this.keyCodes, n = 0, o = e.left.length; n < o; n++) {
        i[e.left[n]] = [-1 * t, 0];
      }

      for (n = 0, o = e.right.length; n < o; n++) {
        i[e.right[n]] = [t, 0];
      }

      for (n = 0, o = e.down.length; n < o; n++) {
        i[e.down[n]] = [0, t];
      }

      for (n = 0, o = e.up.length; n < o; n++) {
        i[e.up[n]] = [0, -1 * t];
      }
    },
    _setZoomDelta: function _setZoomDelta(t) {
      for (var i = this._zoomKeys = {}, e = this.keyCodes, n = 0, o = e.zoomIn.length; n < o; n++) {
        i[e.zoomIn[n]] = t;
      }

      for (n = 0, o = e.zoomOut.length; n < o; n++) {
        i[e.zoomOut[n]] = -t;
      }
    },
    _addHooks: function _addHooks() {
      zi(document, "keydown", this._onKeyDown, this);
    },
    _removeHooks: function _removeHooks() {
      Si(document, "keydown", this._onKeyDown, this);
    },
    _onKeyDown: function _onKeyDown(t) {
      if (!(t.altKey || t.ctrlKey || t.metaKey)) {
        var i,
            e = t.keyCode,
            n = this._map;
        if (e in this._panKeys) n._panAnim && n._panAnim._inProgress || (i = this._panKeys[e], t.shiftKey && (i = A(i).multiplyBy(3)), n.panBy(i), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds));else if (e in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);else {
          if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey) return;
          n.closePopup();
        }
        Ni(t);
      }
    }
  });
  Ki.addInitHook("addHandler", "keyboard", xn), Ki.mergeOptions({
    scrollWheelZoom: !0,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60
  });
  var wn = ie.extend({
    addHooks: function addHooks() {
      zi(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
    },
    removeHooks: function removeHooks() {
      Si(this._map._container, "wheel", this._onWheelScroll, this);
    },
    _onWheelScroll: function _onWheelScroll(t) {
      var i = Wi(t),
          e = this._map.options.wheelDebounceTime;
      this._delta += i, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date());
      var n = Math.max(e - (new Date() - this._startTime), 0);
      clearTimeout(this._timer), this._timer = setTimeout(p(this._performZoom, this), n), Ni(t);
    },
    _performZoom: function _performZoom() {
      var t = this._map,
          i = t.getZoom(),
          e = this._map.options.zoomSnap || 0;

      t._stop();

      var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
          o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2,
          s = e ? Math.ceil(o / e) * e : o,
          r = t._limitZoom(i + (0 < this._delta ? s : -s)) - i;
      this._delta = 0, this._startTime = null, r && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + r) : t.setZoomAround(this._lastMousePos, i + r));
    }
  });
  Ki.addInitHook("addHandler", "scrollWheelZoom", wn), Ki.mergeOptions({
    tap: !0,
    tapTolerance: 15
  });
  var Pn = ie.extend({
    addHooks: function addHooks() {
      zi(this._map._container, "touchstart", this._onDown, this);
    },
    removeHooks: function removeHooks() {
      Si(this._map._container, "touchstart", this._onDown, this);
    },
    _onDown: function _onDown(t) {
      if (t.touches) {
        if (Ri(t), this._fireClick = !0, 1 < t.touches.length) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
        var i = t.touches[0],
            e = i.target;
        this._startPos = this._newPos = new k(i.clientX, i.clientY), e.tagName && "a" === e.tagName.toLowerCase() && ci(e, "leaflet-active"), this._holdTimeout = setTimeout(p(function () {
          this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i));
        }, this), 1e3), this._simulateEvent("mousedown", i), zi(document, {
          touchmove: this._onMove,
          touchend: this._onUp
        }, this);
      }
    },
    _onUp: function _onUp(t) {
      var i, e;
      clearTimeout(this._holdTimeout), Si(document, {
        touchmove: this._onMove,
        touchend: this._onUp
      }, this), this._fireClick && t && t.changedTouches && ((e = (i = t.changedTouches[0]).target) && e.tagName && "a" === e.tagName.toLowerCase() && _i(e, "leaflet-active"), this._simulateEvent("mouseup", i), this._isTapValid() && this._simulateEvent("click", i));
    },
    _isTapValid: function _isTapValid() {
      return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
    },
    _onMove: function _onMove(t) {
      var i = t.touches[0];
      this._newPos = new k(i.clientX, i.clientY), this._simulateEvent("mousemove", i);
    },
    _simulateEvent: function _simulateEvent(t, i) {
      var e = document.createEvent("MouseEvents");
      e._simulated = !0, i.target._simulatedClick = !0, e.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(e);
    }
  });
  !bt || Lt && !ct || Ki.addInitHook("addHandler", "tap", Pn), Ki.mergeOptions({
    touchZoom: bt && !st,
    bounceAtZoomLimits: !0
  });
  var Ln = ie.extend({
    addHooks: function addHooks() {
      ci(this._map._container, "leaflet-touch-zoom"), zi(this._map._container, "touchstart", this._onTouchStart, this);
    },
    removeHooks: function removeHooks() {
      _i(this._map._container, "leaflet-touch-zoom"), Si(this._map._container, "touchstart", this._onTouchStart, this);
    },
    _onTouchStart: function _onTouchStart(t) {
      var i,
          e,
          n = this._map;
      !t.touches || 2 !== t.touches.length || n._animatingZoom || this._zooming || (i = n.mouseEventToContainerPoint(t.touches[0]), e = n.mouseEventToContainerPoint(t.touches[1]), this._centerPoint = n.getSize()._divideBy(2), this._startLatLng = n.containerPointToLatLng(this._centerPoint), "center" !== n.options.touchZoom && (this._pinchStartLatLng = n.containerPointToLatLng(i.add(e)._divideBy(2))), this._startDist = i.distanceTo(e), this._startZoom = n.getZoom(), this._moved = !1, this._zooming = !0, n._stop(), zi(document, "touchmove", this._onTouchMove, this), zi(document, "touchend", this._onTouchEnd, this), Ri(t));
    },
    _onTouchMove: function _onTouchMove(t) {
      if (t.touches && 2 === t.touches.length && this._zooming) {
        var i = this._map,
            e = i.mouseEventToContainerPoint(t.touches[0]),
            n = i.mouseEventToContainerPoint(t.touches[1]),
            o = e.distanceTo(n) / this._startDist;

        if (this._zoom = i.getScaleZoom(o, this._startZoom), !i.options.bounceAtZoomLimits && (this._zoom < i.getMinZoom() && o < 1 || this._zoom > i.getMaxZoom() && 1 < o) && (this._zoom = i._limitZoom(this._zoom)), "center" === i.options.touchZoom) {
          if (this._center = this._startLatLng, 1 == o) return;
        } else {
          var s = e._add(n)._divideBy(2)._subtract(this._centerPoint);

          if (1 == o && 0 === s.x && 0 === s.y) return;
          this._center = i.unproject(i.project(this._pinchStartLatLng, this._zoom).subtract(s), this._zoom);
        }

        this._moved || (i._moveStart(!0, !1), this._moved = !0), z(this._animRequest);
        var r = p(i._move, i, this._center, this._zoom, {
          pinch: !0,
          round: !1
        });
        this._animRequest = M(r, this, !0), Ri(t);
      }
    },
    _onTouchEnd: function _onTouchEnd() {
      this._moved && this._zooming ? (this._zooming = !1, z(this._animRequest), Si(document, "touchmove", this._onTouchMove, this), Si(document, "touchend", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1;
    }
  });
  Ki.addInitHook("addHandler", "touchZoom", Ln), Ki.BoxZoom = gn, Ki.DoubleClickZoom = vn, Ki.Drag = yn, Ki.Keyboard = xn, Ki.ScrollWheelZoom = wn, Ki.Tap = Pn, Ki.TouchZoom = Ln, t.version = "1.7.1", t.Control = Xi, t.control = Yi, t.Browser = Bt, t.Evented = E, t.Mixin = ne, t.Util = C, t.Class = S, t.Handler = ie, t.extend = h, t.bind = p, t.stamp = m, t.setOptions = c, t.DomEvent = qi, t.DomUtil = Mi, t.PosAnimation = Gi, t.Draggable = ae, t.LineUtil = fe, t.PolyUtil = ye, t.Point = k, t.point = A, t.Bounds = I, t.bounds = O, t.Transformation = q, t.transformation = G, t.Projection = Pe, t.LatLng = D, t.latLng = j, t.LatLngBounds = R, t.latLngBounds = N, t.CRS = H, t.GeoJSON = Ne, t.geoJSON = Ke, t.geoJson = Ye, t.Layer = Me, t.LayerGroup = ze, t.layerGroup = function (t, i) {
    return new ze(t, i);
  }, t.FeatureGroup = Ce, t.featureGroup = function (t, i) {
    return new Ce(t, i);
  }, t.ImageOverlay = Xe, t.imageOverlay = function (t, i, e) {
    return new Xe(t, i, e);
  }, t.VideoOverlay = Je, t.videoOverlay = function (t, i, e) {
    return new Je(t, i, e);
  }, t.SVGOverlay = $e, t.svgOverlay = function (t, i, e) {
    return new $e(t, i, e);
  }, t.DivOverlay = Qe, t.Popup = tn, t.popup = function (t, i) {
    return new tn(t, i);
  }, t.Tooltip = en, t.tooltip = function (t, i) {
    return new en(t, i);
  }, t.Icon = Se, t.icon = function (t) {
    return new Se(t);
  }, t.DivIcon = nn, t.divIcon = function (t) {
    return new nn(t);
  }, t.Marker = ke, t.marker = function (t, i) {
    return new ke(t, i);
  }, t.TileLayer = sn, t.tileLayer = rn, t.GridLayer = on, t.gridLayer = function (t) {
    return new on(t);
  }, t.SVG = pn, t.svg = mn, t.Renderer = hn, t.Canvas = un, t.canvas = ln, t.Path = Be, t.CircleMarker = Ae, t.circleMarker = function (t, i) {
    return new Ae(t, i);
  }, t.Circle = Ie, t.circle = function (t, i, e) {
    return new Ie(t, i, e);
  }, t.Polyline = Oe, t.polyline = function (t, i) {
    return new Oe(t, i);
  }, t.Polygon = Re, t.polygon = function (t, i) {
    return new Re(t, i);
  }, t.Rectangle = fn, t.rectangle = function (t, i) {
    return new fn(t, i);
  }, t.Map = Ki, t.map = function (t, i) {
    return new Ki(t, i);
  };
  var bn = window.L;
  t.noConflict = function () {
    return window.L = bn, this;
  }, window.L = t;
});

/***/ }),

/***/ "./css/esmap.css":
/*!***********************!*\
  !*** ./css/esmap.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/postcss-loader/src??ref--8-2!../../node_modules/sass-loader/dist/cjs.js!./esmap.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./css/esmap.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./css/leaflet.css":
/*!*************************!*\
  !*** ./css/leaflet.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/postcss-loader/src??ref--8-2!../../node_modules/sass-loader/dist/cjs.js!./leaflet.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./css/leaflet.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./dataParser.ts":
/*!***********************!*\
  !*** ./dataParser.ts ***!
  \***********************/
/*! exports provided: parseData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseData", function() { return parseData; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);

function parseData(data, mapData, colors, fields) {
  // helper function to parse grafana colors
  function fixColor(color) {
    switch (color) {
      case 'dark-green':
        color = '#1A7311';
        break;

      case 'semi-dark-green':
        color = '#36872D';
        break;

      case 'light-green':
        color = '#73BF68';
        break;

      case 'super-light-green':
        color = '#96D88C';
        break;

      case 'dark-yellow':
        color = 'rgb(207, 159, 0)';
        break;

      case 'semi-dark-yellow':
        color = 'rgb(224, 180, 0)';
        break;

      case 'light-yellow':
        color = 'rgb(250, 222, 42)';
        break;

      case 'super-light-yellow':
        color = 'rgb(255, 238, 82)';
        break;

      case 'dark-red':
        color = 'rgb(173, 3, 23)';
        break;

      case 'semi-dark-red':
        color = 'rgb(196, 22, 42)';
        break;

      case 'light-red':
        color = 'rgb(242, 73, 92)';
        break;

      case 'super-light-red':
        color = 'rgb(255, 115, 131)';
        break;

      case 'dark-blue':
        color = 'rgb(18, 80, 176)';
        break;

      case 'semi-dark-blue':
        color = 'rgb(31, 96, 196)';
        break;

      case 'light-blue':
        color = 'rgb(87, 148, 242)';
        break;

      case 'super-light-blue':
        color = 'rgb(138, 184, 255)';
        break;

      case 'dark-orange':
        color = 'rgb(229, 84, 0)';
        break;

      case 'semi-dark-orange':
        color = 'rgb(250, 100, 0)';
        break;

      case 'light-orange':
        color = 'rgb(255, 152, 48)';
        break;

      case 'super-light-orange':
        color = 'rgb(255, 179, 87)';
        break;

      case 'dark-purple':
        color = 'rgb(124, 46, 163)';
        break;

      case 'semi-dark-purple':
        color = 'rgb(143, 59, 184)';
        break;

      case 'light-purple':
        color = 'rgb(184, 119, 217)';
        break;

      case 'super-light-purple':
        color = 'rgb(202, 149, 229)';
        break;

      default:
        break;
    }

    return color;
  } // fix the colors


  colors.defaultColor = fixColor(colors.defaultColor);
  colors.nodeHighlight = fixColor(colors.nodeHighlight);
  var series = data.series[0];
  var frame = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataFrameView"](series);
  var srcKey = fields.srcField;
  var dstKey = fields.dstField;
  var valKey = fields.valField; // initialize arrays

  var parsedData = [];
  var infIn = [];
  var infOut = []; // const valueField = valKey
  //   ? data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { name: any }) => field.name === valKey)
  //     )
  //   : data.series.map((series: { fields: any[] }) =>
  //       series.fields.find((field: { type: string }) => field.type === 'number')
  //     );

  var valueField = data.series.map(function (series) {
    return series.fields.find(function (field) {
      return field.type === 'number';
    });
  }); // set defaults if fields were not chosen

  if (srcKey === undefined) {
    srcKey = 0;
  }

  if (dstKey === undefined) {
    dstKey = 1;
  } // if (valKey === undefined) {
  //   valKey = series.fields.findIndex((field: { type: string }) => field.type === 'number');
  // }
  // Retrieve panel data from panel


  frame.forEach(function (row) {
    parsedData.push({
      "in": row[srcKey],
      out: row[dstKey],
      azName: row[srcKey] + "---" + row[dstKey],
      zaName: row[dstKey] + "---" + row[srcKey],
      value: row[2]
    });
    var indexIn = infIn.findIndex(function (e) {
      return e.name === row[srcKey];
    });

    if (indexIn >= 0) {
      infIn[indexIn].value += row[2];
    } else {
      infIn.push({
        name: row[srcKey],
        value: row[2]
      });
    }

    var indexOut = infOut.findIndex(function (e) {
      return e.name === row[dstKey];
    });

    if (indexOut >= 0) {
      infOut[indexOut].value += row[2];
    } else {
      infOut.push({
        name: row[dstKey],
        value: row[2]
      });
    }
  });
  var mapJson = JSON.parse(mapData);
  var endpointId = fields.endpointId;
  mapJson.edges.forEach(function (edge) {
    // Find A and Z node
    var nodeA = edge.meta.endpoint_identifiers[endpointId][0];
    var nodeZ = edge.meta.endpoint_identifiers[endpointId][1]; // create za name

    edge.AZname = nodeA + "---" + nodeZ;
    edge.ZAname = nodeZ + "---" + nodeA;
    var matchAZ = parsedData.find(function (d) {
      return d.azName === edge.AZname;
    });
    var matchZA = parsedData.find(function (d) {
      return d.azName === edge.ZAname;
    });

    if (matchAZ) {
      edge.AZvalue = matchAZ.value;
      edge.azColor = valueField[0].display(edge.AZvalue).color;
      var display = valueField[0].display(edge.AZvalue);
      edge.AZdisplayValue = display.text + " " + display.suffix;
    } else {
      edge.azColor = colors.defaultColor;
      edge.AZdisplayValue = 'N/A';
      edge.AZvalue += null;
    }

    if (matchZA) {
      edge.ZAvalue = matchZA.value;
      edge.zaColor = valueField[0].display(edge.ZAvalue).color;
      var display = valueField[0].display(edge.ZAvalue);
      edge.ZAdisplayValue = display.text + " " + display.suffix;
    } else {
      edge.zaColor = colors.defaultColor;
      edge.ZAdisplayValue = 'N/A';
      edge.ZAvalue = null;
    }
  });
  mapJson.nodes.forEach(function (node) {
    var match1 = infIn.find(function (d) {
      return d.name === node.name;
    });
    var match2 = infOut.find(function (d) {
      return d.name === node.name;
    });
    node.inValue = 'N/A';
    node.outValue = 'N/A';

    if (match1 || match2) {
      node.color = colors.nodeHighlight;

      if (match1) {
        node.inValue = valueField[0].display(match1.value).text + " " + valueField[0].display(match1.value).suffix;
      }

      if (match2) {
        node.outValue = valueField[0].display(match2.value).text + " " + valueField[0].display(match2.value).suffix;
      }
    } else {
      node.color = colors.defaultColor;
    }
  }); //take this out later

  mapJson.aTest = 0; // returns parsedData: pairs & their value, infIn: aggregated by first group by, infOut: appregated by 2nd group by

  return [parsedData, infIn, infOut, mapJson, srcKey, dstKey, valKey];
}

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MapPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapPanel */ "./MapPanel.tsx");



var FieldsCategory = ['Choose Fields'];
var LayersCategory = ['Layer options'];
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PanelPlugin"](_MapPanel__WEBPACK_IMPORTED_MODULE_2__["MapPanel"]);

var layer2Bool = function layer2Bool(layer2) {
  return function (config) {
    return config.layer2 === layer2;
  };
};

var layer1Bool = function layer1Bool(layer1) {
  return function (config) {
    return config.layer1 === layer1;
  };
};

plugin.setPanelOptions(function (builder) {
  builder.addNumberInput({
    path: 'startLat',
    name: 'Starting Latitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    defaultValue: 42
  });
  builder.addNumberInput({
    path: 'startLng',
    name: 'Starting Longitude of map',
    description: 'This will be the center of the map when it loads. (numbers only)',
    defaultValue: -105
  });
  builder.addSliderInput({
    path: 'startZoom',
    name: 'Starting zoom level of map',
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addBooleanSwitch({
    path: 'layer1',
    name: 'Layer 1 on',
    category: LayersCategory,
    defaultValue: true
  });
  builder.addTextInput({
    path: 'mapjsonL1',
    name: 'Layer 1 Map data (json)',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'JSON with edges and nodes of network map',
    defaultValue: ''
  });
  builder.addColorPicker({
    path: 'color1',
    name: 'Layer 1 Default color',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The default color for nodes and links on Layer 1',
    defaultValue: 'grey'
  });
  builder.addTextInput({
    path: 'endpointIdL1',
    name: 'Layer 1 Endpoint Identifier',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The endpoint identifier in the meta data to match to the query',
    defaultValue: 'router'
  });
  builder.addColorPicker({
    path: 'nodeHighlightL1',
    name: 'Layer 1 Node highlight color',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The color to highlight nodes that match the query',
    defaultValue: 'red'
  });
  builder.addSliderInput({
    path: 'nodeWidthL1',
    name: 'Layer 1 Node Size',
    category: LayersCategory,
    showIf: layer1Bool(true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addSliderInput({
    path: 'edgeWidthL1',
    name: 'Layer 1 Edge Width',
    category: LayersCategory,
    showIf: layer1Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addSliderInput({
    path: 'pathOffsetL1',
    name: 'Layer 1 Edge Offset',
    category: LayersCategory,
    showIf: layer1Bool(true),
    description: 'The offset between AZ path and ZA path',
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addBooleanSwitch({
    path: 'layer2',
    name: 'Layer 2 on',
    category: LayersCategory,
    defaultValue: false
  });
  builder.addTextInput({
    path: 'mapjsonL2',
    name: 'Layer 2 Map data (json)',
    category: LayersCategory,
    description: 'JSON with edges and nodes of network map',
    showIf: layer2Bool(true),
    defaultValue: ''
  });
  builder.addColorPicker({
    path: 'color2',
    name: 'Layer 2 Default color',
    category: LayersCategory,
    showIf: layer2Bool(true),
    description: 'The default color for nodes and links on Layer 2',
    defaultValue: 'grey'
  });
  builder.addTextInput({
    path: 'endpointIdL2',
    name: 'Layer 2 Endpoint Identifier',
    category: LayersCategory,
    description: 'The endpoint identifier in the meta data to match to the query',
    showIf: layer2Bool(true),
    defaultValue: 'router'
  });
  builder.addColorPicker({
    path: 'nodeHighlightL2',
    name: 'Layer 2 Node highlight color',
    category: LayersCategory,
    description: 'The color to highlight nodes that match the query',
    showIf: layer2Bool(true),
    defaultValue: 'red'
  });
  builder.addSliderInput({
    path: 'nodeWidthL2',
    name: 'Layer 2 Node Size',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 5,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addSliderInput({
    path: 'edgeWidthL2',
    name: 'Layer 2 Edge Width',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addSliderInput({
    path: 'pathOffsetL2',
    name: 'Layer 2 Edge Offset',
    description: 'The offset between AZ path and ZA path',
    category: LayersCategory,
    showIf: layer2Bool(true),
    defaultValue: 3,
    settings: {
      min: 1,
      max: 15,
      step: 0.5
    }
  });
  builder.addSelect({
    path: 'srcFieldL1',
    name: 'Layer 1 Source Field',
    description: 'Select the field to match source nodes',
    category: FieldsCategory,
    showIf: layer1Bool(true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_1, _e, e_2, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_2_1) {
                    e_2 = {
                      error: e_2_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_2) throw e_2.error;
                    }
                  }
                }
              } catch (e_1_1) {
                e_1 = {
                  error: e_1_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
  builder.addSelect({
    path: 'dstFieldL1',
    name: 'Layer 1 Destination Field',
    description: 'Select the field to match destination nodes',
    category: FieldsCategory,
    showIf: layer1Bool(true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_3, _e, e_4, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_4 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_4_1) {
                    e_4 = {
                      error: e_4_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_4) throw e_4.error;
                    }
                  }
                }
              } catch (e_3_1) {
                e_3 = {
                  error: e_3_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_3) throw e_3.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
  builder.addSelect({
    path: 'valFieldL1',
    name: 'Layer 1 Value Field',
    description: 'Select the field to use for data values',
    category: FieldsCategory,
    showIf: layer1Bool(true),
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_5, _e, e_6, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_6 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_6_1) {
                    e_6 = {
                      error: e_6_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_6) throw e_6.error;
                    }
                  }
                }
              } catch (e_5_1) {
                e_5 = {
                  error: e_5_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_5) throw e_5.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
  builder.addSelect({
    path: 'srcFieldL2',
    name: 'Layer 2 Source Field',
    description: 'Select the field to match source nodes',
    showIf: layer2Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_7, _e, e_8, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_8 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_8_1) {
                    e_8 = {
                      error: e_8_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_8) throw e_8.error;
                    }
                  }
                }
              } catch (e_7_1) {
                e_7 = {
                  error: e_7_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_7) throw e_7.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
  builder.addSelect({
    path: 'dstFieldL2',
    name: 'Layer 2 Destination Field',
    description: 'Select the field to match destination nodes',
    showIf: layer2Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_9, _e, e_10, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_10 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_10_1) {
                    e_10 = {
                      error: e_10_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_10) throw e_10.error;
                    }
                  }
                }
              } catch (e_9_1) {
                e_9 = {
                  error: e_9_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_9) throw e_9.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
  builder.addSelect({
    path: 'valFieldL2',
    name: 'Layer 2 Value Field',
    description: 'Select the field to use for data values',
    showIf: layer2Bool(true),
    category: FieldsCategory,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: function getOptions(context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
          var options, _a, _b, frame, _c, _d, field, name, value;

          var e_11, _e, e_12, _f;

          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
            options = [];

            if (context && context.data) {
              try {
                for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                  frame = _b.value;

                  try {
                    for (_c = (e_12 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                      field = _d.value;
                      name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFieldDisplayName"])(field, frame, context.data);
                      value = name;
                      options.push({
                        value: value,
                        label: name
                      });
                    }
                  } catch (e_12_1) {
                    e_12 = {
                      error: e_12_1
                    };
                  } finally {
                    try {
                      if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                    } finally {
                      if (e_12) throw e_12.error;
                    }
                  }
                }
              } catch (e_11_1) {
                e_11 = {
                  error: e_11_1
                };
              } finally {
                try {
                  if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                } finally {
                  if (e_11) throw e_11.error;
                }
              }
            }

            return [2
            /*return*/
            , Promise.resolve(options)];
          });
        });
      }
    }
  });
});
plugin.useFieldConfig({
  disableStandardOptions: [_grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].NoValue, _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].Max, _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].Min, _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].DisplayName]
});

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map