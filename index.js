/*!
  Copyright (c) 2018 Matteo Ferretti
  Licensed under the MIT License (MIT)
*/
/* global define */

(function() {
  "use strict";

  function isArray(target) {
    return Object.prototype.toString.call(target) === "[object Array]";
  }

  function isObject(target) {
    return typeof target === "object" && target;
  }

  function toArray(arrayLike) {
    var length = arrayLike.length;
    return length === 0
      ? []
      : length === 1
      ? [arrayLike[0]]
      : Array.apply(null, arrayLike);
  }

  function toHyphen(match, hyphen, index) {
    var prefix = !hyphen ? "-" : "";
    var text = hyphen ? match.substr(hyphen.length - 1) : match;
    return prefix + text;
  }
  function toKebabCase(classname) {
    return classname
      .replace(/(-*)[A-Z](?:[^A-Z-]|$)/g, toHyphen)
      .replace(/^-*/, "")
      .toLowerCase();
  }

  function isMods(target) {
    return isObject(target) || isArray(target);
  }

  function bera(block, elem, mods) {
    var identifier = block;

    if (typeof elem === "string") {
      identifier = block + "__" + elem;
    } else if (arguments.length === 2) {
      mods = elem;
    }

    var item =
      this && this.hasOwnProperty(identifier) ? this[identifier] : identifier;

    var classes = [item];
    var isModsArray = isArray(mods);

    for (var key in mods) {
      var value = mods[key];
      if (mods.hasOwnProperty(key) && value) {
        var item = identifier + "--" + toKebabCase(isModsArray ? value : key);
        item = this && this.hasOwnProperty(item) ? this[item] : item;
        classes.push(item);
      }
    }

    return classes.join(" ");
  }

  function bem(block, elem, mods) {
    var length = arguments.length;

    if (length === 0) {
      return bem;
    }

    if (length === 3) {
      return bera.call(this, block, elem, mods);
    }

    if (length === 2 && isMods(elem)) {
      return bera.call(this, block, elem);
    }

    if (length < 3) {
      var args = toArray(arguments);
      var thisArg = this;
      return function() {
        var _args = toArray(arguments);
        _args.unshift.apply(_args, args);
        return bera.apply(thisArg, _args);
      };
    }
  }

  bem.join = function join() {
    return toArray(arguments)
      .filter(Boolean)
      .join(" ");
  };

  if (typeof module !== "undefined" && module.exports) {
    bem.default = module.exports = bem;
  } else if (typeof define === "function" && isObject(define.amd)) {
    // register as 'bem', consistent with npm package name
    define("bem", [], function() {
      return bem;
    });
  } else {
    window.bem = bem;
  }
})();
