/*!
  Copyright (c) 2018 Matteo Ferretti
  Licensed under the MIT License (MIT)
*/
/* global define */

(function() {
  "use strict";

  function toArray(arrayLike) {
    const length = arrayLike.length;
    return length === 0
      ? []
      : length === 1
        ? [arrayLike[0]]
        : Array.apply(null, arrayLike);
  }

  function toHyphen(match) {
    return "-" + match.toLowerCase();
  }
  function toKebabCase(classname) {
    return classname.replace(/[A-Z]/g, toHyphen);
  }

  function bera(block, elem, mods) {
    let identifier = block;

    if (typeof elem === "string") {
      identifier = block + "__" + elem;
    } else if (arguments.length === 2) {
      mods = elem;
    }

    const classes = [identifier];
    const isModsArray = Array.isArray(mods);

    for (const key in mods) {
      const value = mods[key];
      if (mods.hasOwnProperty(key) && value) {
        classes.push(
          identifier + "--" + toKebabCase(isModsArray ? value : key)
        );
      }
    }

    return classes.join(" ");
  }

  function bem() {
    const args = toArray(arguments);
    const length = args.length;

    if (length === 0) {
      return bem;
    }

    if (length === 3) {
      return bera.apply(this, args);
    }

    if (length < 3) {
      return function() {
        const _args = toArray(arguments);
        _args.unshift.apply(_args, args);
        return bera.apply(this, _args);
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
  } else if (
    typeof define === "function" &&
    typeof define.amd === "object" &&
    define.amd
  ) {
    // register as 'bem', consistent with npm package name
    define("bem", [], function() {
      return bem;
    });
  } else {
    window.bem = bem;
  }
})();
