export const id = 392;
export const ids = [392];
export const modules = {

/***/ 2351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Converts JSON object to XML string.
 *
 *
 * Copyright(c) 2011 Etienne Lachance <et@etiennelachance.com>
 * MIT Licensed
 */

/*
 * Modifications (Ivo Georgiev <ivo@linvo.org>):
 *  Escape XML entities to avoid breaking the XML if any string in the JSON contains a special char
 *  Ignore special objects - objects that inherit other objects (in practice, when working with a third-party library, most of those are circular structures)
 */

 /*
 *  Modifications (Alan Clarke <hi@alz.so>):
 *  added unit tests, ability to add xml node attributes, xml header option and simplified syntax
 *  removed root node, this is already covered by the module's default functionality
 */

var util = __webpack_require__(3837);

var settings = {
    attributes_key: false,
    header: false
};

module.exports = function xml(json, opts) {
    'use strict';

    if (opts) {
        Object.keys(settings).forEach(function (k) {
            if (opts[k] === undefined) {
                opts[k] = settings[k];
            }
        });
    } else {
        opts = settings;
    }

    var result = opts.header ? '<?xml version="1.0" encoding="UTF-8"?>' : '';
    opts.header = false;

    if (!!json.length && typeof json !== 'string') { //Array
        json.forEach(function (node) {
            result += xml(node, opts);
        });
    } else if (typeof json === 'object') {
        Object.keys(json).forEach(function (key) {
            if (key !== opts.attributes_key) {
                var node = json[key],
                    attributes = '';

                if (node === undefined || node === null) {
                    node = '';
                }

                if (opts.attributes_key && json[opts.attributes_key]) {
                    Object.keys(json[opts.attributes_key]).forEach(function (k) {
                        attributes += util.format(' %s="%s"', k, json[opts.attributes_key][k]);
                    });
                }
                var inner = xml(node, opts);

                if (inner) {
                    result += util.format("<%s%s>%s</%s>", key, attributes, xml(node, opts), key);
                } else {
                    result += util.format("<%s%s/>", key, attributes);
                }
            }
        });
    } else {
        return json.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    return result;
};


/***/ }),

/***/ 2392:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reporter": () => (/* binding */ reporter)
/* harmony export */ });
/* harmony import */ var json2xml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2351);

const reporter = (todos, config = { header: true }) => {
    return json2xml__WEBPACK_IMPORTED_MODULE_0__(todos, {
        header: config.header,
        attributes_key: config.attributes_key,
    });
};


/***/ })

};

//# sourceMappingURL=392.index.mjs.map