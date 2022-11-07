export const id = 289;
export const ids = [289];
export const modules = {

/***/ 6289:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5288);


const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const bangComment = new RegExp(`<%#${regex}%>`, 'mig');
    const htmlComment = new RegExp(`<!--${regex}-->`, 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol__WEBPACK_IMPORTED_MODULE_1__.split(contents).forEach(function (line, index) {
            let bangCommentMatch = bangComment.exec(line);
            while (bangCommentMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(bangCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                bangCommentMatch = bangComment.exec(line);
            }
            bangComment.lastIndex = 0;
            let htmlCommentMatch = htmlComment.exec(line);
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

//# sourceMappingURL=289.index.mjs.map