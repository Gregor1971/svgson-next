"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tools = require("./tools");

var t = _interopRequireWildcard(_tools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var svgson = function svgson(input) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$optimize = _ref.optimize,
        optimize = _ref$optimize === undefined ? false : _ref$optimize,
        _ref$pathsKey = _ref.pathsKey,
        pathsKey = _ref$pathsKey === undefined ? "" : _ref$pathsKey,
        _ref$customAttrs = _ref.customAttrs,
        customAttrs = _ref$customAttrs === undefined ? null : _ref$customAttrs,
        _ref$compat = _ref.compat,
        compat = _ref$compat === undefined ? false : _ref$compat,
        _ref$camelcase = _ref.camelcase,
        camelcase = _ref$camelcase === undefined ? false : _ref$camelcase;

    var optimizer = function optimizer(input) {
        var sanitized = t.sanitizeInput(input);
        return Promise.resolve(sanitized);
    };

    var applyFilters = function applyFilters(input) {
        var applyPathsKey = function applyPathsKey(node) {
            return pathsKey !== "" ? t.wrapInKey(pathsKey, node) : node;
        };
        var applyCustomAttrs = function applyCustomAttrs(node) {
            return customAttrs ? t.addCustomAttrs(customAttrs, node) : node;
        };
        var applyCompatMode = function applyCompatMode(node) {
            return compat ? t.compat(node) : node;
        };
        var applyCamelcase = function applyCamelcase(node) {
            return camelcase || compat ? t.camelize(node) : node;
        };

        var result = input.map(t.removeAttrs).map(applyCompatMode).map(applyPathsKey).map(applyCustomAttrs).map(applyCamelcase);

        return Promise.resolve(result);
    };

    var haveResult = function haveResult(input) {
        return input.length > 0 ? Promise.resolve(input) : Promise.reject("No result produced");
    };

    return optimizer(input).then(t.parseInput).then(applyFilters).then(haveResult);
};

var processInput = function processInput(input) {};

exports.default = svgson;