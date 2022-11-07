export const id = 767;
export const ids = [767];
export const modules = {

/***/ 6767:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5288);


const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const hamlRubyComment = new RegExp(`^\\s*-#${regex}$`, 'mig');
    const hamlHtmlComment = new RegExp(`^\\s*/${regex}$`, 'mig');
    const erbComment = new RegExp(`<%#${regex}%>`, 'mig');
    const htmlComment = new RegExp(`<!--${regex}-->`, 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol__WEBPACK_IMPORTED_MODULE_1__.split(contents).forEach(function (line, index) {
            let hamlRubyCommentMatch = hamlRubyComment.exec(line);
            let hamlHtmlCommentMatch = hamlHtmlComment.exec(line);
            let erbCommentMatch = erbComment.exec(line);
            let htmlCommentMatch = htmlComment.exec(line);
            while (hamlRubyCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(hamlRubyCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hamlRubyCommentMatch = hamlRubyComment.exec(line);
            }
            hamlRubyComment.lastIndex = 0;
            while (hamlHtmlCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(hamlHtmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hamlHtmlCommentMatch = hamlHtmlComment.exec(line);
            }
            hamlHtmlComment.lastIndex = 0;
            while (erbCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(erbCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                erbCommentMatch = erbComment.exec(line);
            }
            erbComment.lastIndex = 0;
            while (htmlCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(htmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                htmlCommentMatch = htmlComment.exec(line);
            }
            htmlComment.lastIndex = 0;
        });
        return comments;
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=767.index.mjs.map