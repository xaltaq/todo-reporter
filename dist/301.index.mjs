export const id = 301;
export const ids = [301];
export const modules = {

/***/ 7301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5288);


const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const commentsRegex = new RegExp(`^\\s*#${regex}$`, 'mig');
    const multiLineRegex = new RegExp(`^\\s*"""${regex}"""$`, 'mig');
    return (contents, file) => {
        const comments = [];
        eol__WEBPACK_IMPORTED_MODULE_1__.split(contents).forEach((line, index) => {
            let hashMatch = commentsRegex.exec(line);
            while (hashMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(hashMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hashMatch = commentsRegex.exec(line);
            }
            commentsRegex.lastIndex = 0;
            let multiLineMatch = multiLineRegex.exec(line);
            while (multiLineMatch) {
                const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(multiLineMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                multiLineMatch = multiLineRegex.exec(line);
            }
            multiLineRegex.lastIndex = 0;
        });
        return comments;
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=301.index.mjs.map