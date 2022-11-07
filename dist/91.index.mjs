export const id = 91;
export const ids = [91,484];
export const modules = {

/***/ 9595:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTransformedComments": () => (/* binding */ getTransformedComments),
/* harmony export */   "joinBlocksByHeaders": () => (/* binding */ joinBlocksByHeaders),
/* harmony export */   "prepareConfig": () => (/* binding */ prepareConfig),
/* harmony export */   "reporter": () => (/* binding */ reporter)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2037);


/**
 * @hidden
 */
const getTransformedComments = (todos, config) => {
    const transformFn = config.transformComment;
    if (!todos.length) {
        //early return in case of no comments
        //FIXME: make the default header a configurable option
        return {
            TODO: [],
        };
    }
    return todos.reduce(function (mem, comment) {
        const tag = comment.tag;
        mem[tag] = mem[tag] || [];
        // transformed comment as an array item
        let transformedComment = transformFn(comment.file, comment.line, comment.text, tag, comment.ref);
        // enforce array type
        if (!Array.isArray(transformedComment)) {
            transformedComment = [transformedComment];
        }
        // append to tag array
        mem[tag] = mem[tag].concat(transformedComment);
        return mem;
    }, {});
};
/**
 * @hidden
 */
const joinBlocksByHeaders = (output, config) => {
    const padding = config.padding;
    const newLine = config.newLine;
    const transformHeader = config.transformHeader;
    let header;
    let contents = '';
    //prepend headers
    Object.keys(output).forEach(function (tag) {
        header = transformHeader(tag);
        // enforce array response
        if (!Array.isArray(header)) {
            header = [header];
        }
        output[tag] = lodash__WEBPACK_IMPORTED_MODULE_0__.compact(header.concat(output[tag]));
        // add padding between tag blocks
        if (contents.length) {
            contents += new Array(padding + 1).join(newLine);
        }
        contents += output[tag].join(newLine);
    });
    return contents;
};
/**
 * @hidden
 */
const prepareConfig = (defaultConfig, overrides) => {
    const config = lodash__WEBPACK_IMPORTED_MODULE_0__.defaults({}, overrides, defaultConfig, {
        newLine: os__WEBPACK_IMPORTED_MODULE_1__.EOL,
        padding: 2,
    });
    if (typeof config.transformHeader !== 'function') {
        throw new TypeError('transformHeader must be a function');
    }
    if (typeof config.transformComment !== 'function') {
        throw new TypeError('transformComment must be a function');
    }
    // padding must be a minimum of 0
    // enforce padding to be a number as well
    config.padding = Math.max(0, config.padding);
    return config;
};
const reporterConfig = {
    transformComment(file, line, text, _tag, ref) {
        return [`file: ${file}`, `line: ${line}`, `text: ${text}`, `ref:${ref}`];
    },
    transformHeader(tag) {
        return [`tag: ${tag}`];
    },
};
const reporter = (todos, config) => {
    const parsedConfig = prepareConfig(reporterConfig, config);
    const output = getTransformedComments(todos, parsedConfig);
    return joinBlocksByHeaders(output, parsedConfig);
};


/***/ }),

/***/ 1091:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reporter": () => (/* binding */ reporter)
/* harmony export */ });
/* harmony import */ var _custom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9595);

const reporterConfig = {
    transformComment(file, line, text, _tag, ref) {
        if (ref) {
            text = `@${ref} ${text}`;
        }
        return [`| [${file}](${file}#L${line}) | ${line} | ${text} |`];
    },
    transformHeader(tag) {
        return [`### ${tag}s`, `| Filename | line # | ${tag} |`, '|:------|:------:|:------|'];
    },
};
const reporter = (todos, config) => {
    const parsedConfig = (0,_custom_js__WEBPACK_IMPORTED_MODULE_0__.prepareConfig)(reporterConfig, config);
    const output = (0,_custom_js__WEBPACK_IMPORTED_MODULE_0__.getTransformedComments)(todos, parsedConfig);
    return (0,_custom_js__WEBPACK_IMPORTED_MODULE_0__.joinBlocksByHeaders)(output, parsedConfig);
};


/***/ })

};

//# sourceMappingURL=91.index.mjs.map