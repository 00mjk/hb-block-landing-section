/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/help.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/help.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const help = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (help);
//# sourceMappingURL=help.js.map

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _svg_icons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../svg/icons.js */ "./svg/icons.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/help.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);


/**
 * Import local Styles.
 */


/**
 * Import local Icons.
 */


/**
 * Import WordPress Dependencies.
 */






/**
 * Register the block "hb/landing-section".
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.registerBlockType)('hb/landing-section', {
  // Handle the editor block rendering
  edit: ({
    attributes,
    setAttributes,
    isSelected
  }) => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useBlockProps.save({
      className: 'hb__landingSection'
    });
    const {
      contentDivClasses,
      selectControlBoth,
      selectControlStart,
      selectControlEnd
    } = attributes;
    /**
     * Vars used as a temp store for new attribute values.
     *
     * New attribute values are populated into these vars
     * before passings to 'setAttributes'. When reading attributes
     * that were set in the same function, often the values weren't
     * updated in time for the next line to pull a value from. This
     * behaviour is expected according to React docs for performance
     * reasons.
     *
     */

    let newContentDivClasses, newSelectControlBoth, newSelectControlStart, newSelectControlEnd;
    /**
     * Test if the start/end selectControls are same.
     *
     * If the individual start/end control settings are changed,
     * the common control which set both at the same time will
     * reflect an untrue state. Therefore, this function tests
     * those settings to get a value for the common control:
     *     - start/end match = return grid position
     *     - start/end do not match = return false
     * This value is then used to set the attribute and display
     * a relevant label in the common selectControl.
     *
     */

    const getNewSelectControlBoth = function () {
      newSelectControlBoth = newSelectControlStart.split('-')[0] == newSelectControlEnd.split('-')[0] ? newSelectControlStart.split('-')[0] : false;
      return newSelectControlBoth;
    };
    /**
     * Build new classes string.
     *
     * This function is called each time a selectControl setting is
     * changed. It simply concatenates a string from the given 'new'
     * variables in a legal CSS class format.
     *
     */


    const getNewContentDivClasses = function () {
      newContentDivClasses = 'hb__landingSection_content ' + newSelectControlStart + ' ' + newSelectControlEnd;
      return newContentDivClasses;
    };
    /**
     * Set all block attributes.
     *
     * This function is called by each selectControl function
     * every time a setting is changed. All attributes are passed
     * concurrently in a single call to prevent unnecessary
     * re-renders.
     *
     */


    const setAllAttrs = function (start, end, both, classes) {
      setAttributes({
        selectControlStart: start,
        selectControlEnd: end,
        selectControlBoth: both,
        contentDivClasses: classes
      });
    };
    /**
     * Handle 'grid-column-start' selectControl onChange.
     *
     * This function is called each time the 'start'
     * selectControl setting is changed. It retrieves new
     * values for all variables then passes them to the
     * setAllAttrs function.
     *
     */


    const onChangeSelectControlStart = function (value) {
      newSelectControlStart = value;
      newSelectControlEnd = selectControlEnd;
      newSelectControlBoth = getNewSelectControlBoth();
      newContentDivClasses = getNewContentDivClasses();
      setAllAttrs(newSelectControlStart, newSelectControlEnd, newSelectControlBoth, newContentDivClasses);
    };
    /**
     * Handle 'grid-column-end' selectControl onChange.
     *
     * This function is called each time the 'end'
     * selectControl setting is changed. It retrieves new
     * values for all variables then passes them to the
     * setAllAttrs function.
     *
     */


    const onChangeSelectControlEnd = function (value) {
      newSelectControlEnd = value;
      newSelectControlStart = selectControlStart;
      newSelectControlBoth = getNewSelectControlBoth();
      newContentDivClasses = getNewContentDivClasses();
      setAllAttrs(newSelectControlStart, newSelectControlEnd, newSelectControlBoth, newContentDivClasses);
    };
    /**
     * Handle the 'common' 'grid-column' selectControl onChange.
     *
     * This function is called each time the 'start'
     * selectControl setting is changed. It retrieves new
     * values for all variables then passes them to the
     * setAllAttrs function.
     *
     */


    const onChangeSelectControlBoth = function (value) {
      newSelectControlStart = value + '-l';
      newSelectControlEnd = value + '-r';
      newSelectControlBoth = value;
      newContentDivClasses = getNewContentDivClasses();
      setAllAttrs(newSelectControlStart, newSelectControlEnd, newSelectControlBoth, newContentDivClasses);
    };
    /**
     * Build options for the select controls.
     *
     * Three variations of the settings are produced:
     *     - optionsStart = start selectControl.
     *     - optionsEnd = end selectControl.
     *     - optionsExtended = common selectControl.
     * 'Start and 'End add suffixes relevant to the CSS class
     * names (which also match grid column track names) and the
     * extended options are for the common control. These
     * options have no suffix as they are 'start'/'end' agnostic,
     * and also include an added option of 'Custom' (value='false').
     * This option is not selectable by the user, but is displayed
     * when the 'start'/'end' selectControl values do not match,
     * ergo, a 'Custom' configuration.
     */


    const options = position => [{
      label: '1:1 Square',
      value: 'oneone' + position
    }, {
      label: '3:2 Wide',
      value: 'threetwo' + position
    }, {
      label: '16:9 Cinema',
      value: 'sixteennine' + position
    }, {
      label: 'Full Width',
      value: 'full' + position
    }],
          optionsStart = options('-l'),
          optionsEnd = options('-r'),
          optionsExtended = [...options(''), {
      label: 'Custom',
      value: false,
      disabled: true
    }];
    /**
     * Build editor block visual aid.
     *
     * This array of divs populate the grid to provide a visual
     * representation of the grid layout. This should only be
     * displayed when the block is selected.
     */


    const BorderDivs = function () {
      const numbers = [1, 2, 3, 4, 5, 6, 7];
      const divs = numbers.map(number => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          gridColumn: number + '/ span 1'
        },
        className: "hb__outline",
        key: number.toString()
      }));
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, divs);
    }; // Build JSX block for the editor


    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, isSelected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BorderDivs, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: contentDivClasses
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "This is the hb__landingSection block."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InnerBlocks, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "hb__landingSection_backdrop"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InnerBlocks, {
      allowedBlocks: 'core/image'
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "gridColumn",
      labelPosition: "Left",
      title: "gridColumn",
      value: selectControlBoth,
      options: optionsExtended,
      onChange: value => onChangeSelectControlBoth(value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Width and Position'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_icons_js__WEBPACK_IMPORTED_MODULE_3__.IconSettingsCSSGridTracksLR, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "gridColumn",
      labelPosition: "Left",
      title: "gridColumn",
      value: selectControlBoth,
      options: optionsExtended,
      onChange: value => onChangeSelectControlBoth(value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "gridColumnStart",
      labelPosition: "left",
      title: "gridColumnStart",
      value: selectControlStart,
      options: optionsStart,
      onChange: value => onChangeSelectControlStart(value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
      label: "gridColumnEnd",
      labelPosition: "left",
      title: "gridColumnEnd",
      value: selectControlEnd,
      options: optionsEnd,
      onChange: value => onChangeSelectControlEnd(value)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
      label: "Help",
      className: "hb__inspectorHelpButton"
    }, "Help")))));
  },
  //edit
  example: ({
    attributes
  }) => {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'hb__landingSection_content oneone-l oneone-r'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "This is a paragraph demonstrated in the content box. You can add any content blocks here and it will be displayed in front of the background box.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "hb__landingSection_backdrop"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "I am a paragraph in the background box. You can add any content blocks here and they will be displayed behind the content box.")));
  },
  //example
  // Handle parsing the block into final markup as post content
  save: ({
    attributes
  }) => {
    // wp attributes === React props
    const {
      contentDivClasses,
      selectControlStart,
      selectControlEnd,
      selectControlBoth
    } = attributes; // Add classname to props

    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useBlockProps.save({
      className: 'hb__landingSection'
    }); // Build JSX block for front end mark up

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: contentDivClasses
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "selectControlBoth is ", selectControlBoth, "."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "selectControlStart is ", selectControlStart, "."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "selectControlEnd is ", selectControlEnd, "."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InnerBlocks.Content, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "hb__landingSection_backdrop"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InnerBlocks.Content, null)));
  } //save

});

/***/ }),

/***/ "./svg/icons.js":
/*!**********************!*\
  !*** ./svg/icons.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconSettingsCSSGridTracksLR": function() { return /* binding */ IconSettingsCSSGridTracksLR; },
/* harmony export */   "IconSettingsAspectRatioSquare": function() { return /* binding */ IconSettingsAspectRatioSquare; },
/* harmony export */   "IconSettingsAspectRatioWide": function() { return /* binding */ IconSettingsAspectRatioWide; },
/* harmony export */   "IconSettingsAspectRatioUltrawide": function() { return /* binding */ IconSettingsAspectRatioUltrawide; },
/* harmony export */   "IconSettingsCSSGridTrackL": function() { return /* binding */ IconSettingsCSSGridTrackL; },
/* harmony export */   "IconSettingsCSSGridTrackR": function() { return /* binding */ IconSettingsCSSGridTrackR; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const IconSettingsCSSGridTracksLR = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M5 3a2 2 0 00-2 2v14l.1.6.3.6.4.4.6.3.6.1h14l.6-.1.6-.3.4-.4.3-.6.1-.6V5a2 2 0 00-2-2H5zm0 1.5h2v3.6h1.5V4.5h7v3.6H17V4.5h2.2l.2.1.1.4v14c0 .3-.2.5-.5.5h-2v-3.4h-1.5v3.4h-7v-3.4H7v3.4H5c-.3 0-.5-.2-.5-.5V5v-.1l.1-.3h.2l.2-.1zm2 5.6v4h1.5v-4H7zm8.5 0v4H17v-4h-1.5z"
  }))
});
const IconSettingsAspectRatioSquare = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M5 3a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 1.5h14c.3 0 .5.2.5.5v14c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V5c0-.3.2-.5.5-.5z"
  }))
});
const IconSettingsAspectRatioWide = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M5 5a2 2 0 00-2 2v10c0 1.1.9 2 2 2h14a2 2 0 002-2V7a2 2 0 00-2-2zm0 1.5h14c.3 0 .5.2.5.5v10c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V7c0-.3.2-.5.5-.5z"
  }))
});
const IconSettingsAspectRatioUltrawide = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M5 7a2 2 0 00-2 2v6c0 1.1.9 2 2 2h14a2 2 0 002-2V9a2 2 0 00-2-2zm0 1.5h14c.3 0 .5.2.5.5v6c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V9c0-.3.2-.5.5-.5z"
  }))
});
const IconSettingsCSSGridTrackL = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M5 3a2 2 0 00-2 2V19c0 1.1.9 2 2 2H19a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 1.5h2v3.6h1.5V4.5H19c.3 0 .5.2.5.5V19c0 .3-.2.5-.5.5H8.5v-3.4H7v3.4H5c-.3 0-.5 0-.5-.3V5c0-.3.2-.5.5-.5zm2 5.6v4h1.5v-4H7z"
  }))
});
const IconSettingsCSSGridTrackR = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    "aria-hidden": "true"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M19 3a2 2 0 012 2V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5c0-1.1.9-2 2-2H18.7zm0 1.5h-2v3.6h-1.5V4.5H5c-.3 0-.5.2-.5.5V19c0 .3.2.5.5.5h10.5v-3.4H17v3.4h2c.3 0 .5 0 .5-.3V5c0-.3-.2-.5-.5-.5zm-2 5.6v4h-1.5v-4z"
  }))
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhb_block_landing_section"] = self["webpackChunkhb_block_landing_section"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map