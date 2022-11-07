export const id = 260;
export const ids = [260];
export const modules = {

/***/ 5260:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var _utils_comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3341);


const multiLineCommentRegex = /\(\*(?:[\s\S]*?)\*\)/gim;
const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const lineCommentRegex = new RegExp(`^\\s*\\/\\/${regex}$`, 'ig');
    const innerBlockRegex = new RegExp(`^${regex}$`, 'ig');
    return (contents, file) => {
        const singleLineComments = (0,_utils_comments_js__WEBPACK_IMPORTED_MODULE_1__/* .extractSingleLineComments */ .GR)(contents, file, lineCommentRegex);
        const singleLineMultiBlockComments = (0,_utils_comments_js__WEBPACK_IMPORTED_MODULE_1__/* .extractSingleLineFromBlocks */ .tq)(contents, file, multiLineCommentRegex, innerBlockRegex);
        return singleLineComments.concat(singleLineMultiBlockComments);
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=260.index.mjs.map