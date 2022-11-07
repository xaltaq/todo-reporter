export const id = 455;
export const ids = [455];
export const modules = {

/***/ 5455:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var _utils_comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3341);


const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const lineCommentRegex = new RegExp(`^\\s*--${regex}$`, 'mig');
    return (contents, file) => {
        return (0,_utils_comments_js__WEBPACK_IMPORTED_MODULE_1__/* .extractSingleLineComments */ .GR)(contents, file, lineCommentRegex);
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=455.index.mjs.map