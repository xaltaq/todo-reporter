export const id = 443;
export const ids = [443];
export const modules = {

/***/ 5443:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5288);


const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const ssCommentRegex = new RegExp('<%--' + regex + '--%>', 'mig');
    const htmlCommentRegex = new RegExp('<!--' + regex + '-->', 'mig');
    return (contents, file) => {
        const comments = [];
        eol__WEBPACK_IMPORTED_MODULE_1__.split(contents).forEach((line, index) => {
            let ssCommentsMatch = ssCommentRegex.exec(line);
            while (ssCommentsMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(ssCommentsMatch, index + 1, file);
                if (!comment) {
                    return;
                }
                comments.push(comment);
                ssCommentsMatch = ssCommentRegex.exec(line);
            }
            ssCommentRegex.lastIndex = 0;
            let htmlCommentMatch = htmlCommentRegex.exec(line);
            while (htmlCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(htmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                htmlCommentMatch = htmlCommentRegex.exec(line);
            }
            htmlCommentRegex.lastIndex = 0;
        });
        return comments;
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=443.index.mjs.map