export const id = 797;
export const ids = [797];
export const modules = {

/***/ 8797:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1207);
/* harmony import */ var eol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5288);


// I know this is different style, but I wasn't able to get the escape
// characters right
const parserFactory = ({ customTags }) => {
    const regex = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .getRegex */ .Of)(customTags);
    const commentsRegex = new RegExp(`^\\s*%${regex}$`, 'mig');
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
        });
        // doing the multi line match outside of the loop because we need
        // multiple lines
        const multilineRegex = new RegExp('^[ |\\t]*\\\\begin{comment}\\s*@?(todo|fixme)(?!\\w)\\s*(?:\\(([^)]*)\\))?\\s*:?\\s*((.*?)(?:\\s+([^\\s]+)\\s*)?)\\\\end{comment}', 'gmi');
        let m;
        while ((m = multilineRegex.exec(contents)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === multilineRegex.lastIndex) {
                multilineRegex.lastIndex++;
            }
            // Since we no longer know the line number as index, we have to
            // count it out. This could be inefficient for large files, so I
            // hope it doesn't become a performance problem
            const preceeding_lines = contents.slice(0, m.index);
            const line_no = preceeding_lines.split(/\r\n|\r|\n/).length;
            // Now prepare the comment
            const comment = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__/* .prepareComment */ .mL)(m, line_no, file);
            comments.push(comment);
        }
        return comments;
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parserFactory);


/***/ })

};

//# sourceMappingURL=797.index.mjs.map