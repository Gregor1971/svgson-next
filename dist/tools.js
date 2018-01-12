"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toCamelCase = exports.camelize = exports.compat = exports.addCustomAttrs = exports.wrapInKey = exports.removeAttrs = exports.sanitizeInput = exports.parseInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _omitDeep = require("omit-deep");

var _omitDeep2 = _interopRequireDefault(_omitDeep);

var _deepRenameKeys = require("deep-rename-keys");

var _deepRenameKeys2 = _interopRequireDefault(_deepRenameKeys);

var _cleanDeep = require("clean-deep");

var _cleanDeep2 = _interopRequireDefault(_cleanDeep);

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _domSerializer = require("dom-serializer");

var _domSerializer2 = _interopRequireDefault(_domSerializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parseInput = exports.parseInput = function parseInput(input) {
    var parsed = _htmlparser2.default.parseDOM(input, { xmlMode: true });
    var shouldFilter = parsed.length === 1 && parsed[0].name === "root";
    return Promise.resolve(shouldFilter ? parsed[0].children : parsed);
};

var sanitizeInput = exports.sanitizeInput = function sanitizeInput(input) {
    var parsed = _htmlparser2.default.parseDOM(input, { xmlMode: true });
    var f = function f(node) {
        return node.type === "tag" && node.name === "svg";
    };
    var filtered = parsed.filter(f);
    return (0, _domSerializer2.default)(filtered);
};

var wrapInput = function wrapInput(input) {
    return "<root>" + input + "</root>";
};

var removeAttrs = exports.removeAttrs = function removeAttrs(obj) {
    return (0, _omitDeep2.default)(obj, ["next", "prev", "parent"]);
};
var wrapInKey = exports.wrapInKey = function wrapInKey(key, node) {
    return _defineProperty({}, key, node);
};
var addCustomAttrs = exports.addCustomAttrs = function addCustomAttrs(attrs, node) {
    return _extends({}, node, attrs);
};

var compat = exports.compat = function compat(node) {
    var renamed = (0, _deepRenameKeys2.default)(node, function (key) {
        if (key === "attribs") {
            return "attrs";
        }
        if (key === "children") {
            return "childs";
        }
        return key;
    });
    return (0, _omitDeep2.default)((0, _cleanDeep2.default)(renamed), ["type"]);
};

var camelize = exports.camelize = function camelize(node) {
    return (0, _deepRenameKeys2.default)(node, function (key) {
        if (!notCamelcase(key)) {
            return toCamelCase(key);
        }
        return key;
    });
};

var toCamelCase = exports.toCamelCase = function toCamelCase(prop) {
    return prop.replace(/[-|:]([a-z])/gi, function (all, letter) {
        return letter.toUpperCase();
    });
};

var notCamelcase = function notCamelcase(prop) {
    return (/^(data|aria)(-\w+)/.test(prop)
    );
};