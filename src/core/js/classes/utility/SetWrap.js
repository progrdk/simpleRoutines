/**
 * Wrapper class for JS core Set data structure that provides
 *  additional functionality.
 * @extends {Set}
 */
class SetWrap extends Set {
  /**
   * @hideconstructor
   */
  constructor(iterable) {
    super(iterable);
    // allow write to toStringTag, defined in Set()
    Object.defineProperty(this, Symbol.toStringTag, {
      writable: true,
    });
    this[Symbol.toStringTag] = "SetWrap"; //reassign
    // forbid toStringTag write (default)
    Object.defineProperty(this, Symbol.toStringTag, {
      writable: false,
    });
  }

  /**
   * Searches for the first match of an element, specified by parameters.
   * @param {*} content
   * - An object literal, containing keys and values,
   *  used to match an element.
   * - An array, containing values, used to match an element.
   * - A primitive value, used to match an element.
   *
   * Only supplied content will be used throughout the search,
   *  which may lead to multiple matches.<br>
   *  In this case, only the first match will be returned.
   * @param {String} [constructorName=undefined] A name
   *  of a class / constructor function
   *  of an object being searched.<br>
   *  `undefined` value corresponds to primitives / object literals /
   *  objects without `toStringTag` specified (from outside the app namespace).
   * @returns {*|null}
   * - Element in Set that matched,
   * - `Null` of no element matched.
   * @throws {SyntaxError}
   * - `content` is `undefined`.
   * @throws {TypeError}
   * - `content` is an empty object.
   * - `content` is an empty array.
   * - `content` is a `Null` primitive.
   * @example setSelector({name "testRoutine", timesPerDay: 5}, "Routine")
   * @example setSelector({prop1: true, prop2: []})
   * @memberof SetWrap
   */
  setSelector(content, constructorName = undefined) {
    /* Validations of arguments' edge cases */
    if (content === undefined) {
      throw new SyntaxError("Not all required parameters are supplied.");
    } else if (content === null) {
      throw new TypeError("Cannot utilize NULL primitives as a content.");
    } else if (typeof content === "boolean" || content instanceof Boolean) {
      throw new TypeError("Cannot utilize boolean primitives as a content.");
    } else if (Array.isArray(content) && content.length === 0) {
      throw new TypeError("Cannot utilize empty arrays as a content.");
    }
    if (
      constructorName !== undefined &&
      typeof constructorName !== "string" &&
      !(constructorName instanceof String)
    ) {
      throw new TypeError(
        "Cannot utilize non- undefined or string value as a constructorName."
      );
    }
    /* Validation of 'content' agrument type */
    let dataType = "object"; //content type flag
    if (
      typeof content === "number" ||
      typeof content === "string" ||
      typeof content === "bigint" ||
      typeof content === "symbol"
    ) {
      dataType = "primitive"; //content is a primitive
    } else if (Array.isArray(content)) {
      dataType = "array"; //content is an array
    }
    if (
      // content object with no names and no symbols supplied
      dataType === "object" &&
      Object.getOwnPropertyNames(content).length === 0 &&
      Object.getOwnPropertySymbols(content).lengh === 0
    ) {
      throw new TypeError("Cannot utilize empty objects.");
    }
    /* Logics */
    //loop through the entire Set instance
    for (const el of this) {
      // primitives
      if (dataType === "primitive" && el === content) {
        return el; //primitive found in set
      }
      // arrays
      else if (dataType === "array" && content.every((v, i) => v === el[i])) {
        return el; //array found in set
      }
      // objects
      else if (
        dataType === "object" &&
        el[Symbol.toStringTag] === constructorName &&
        validateObjIntersec(content, el)
      ) {
        return el; //object found in set
      }
    }
    return null; //match not found in set

    // validate objects intersection
    function validateObjIntersec(subsetObj, setObj) {
      // loop through entire subset object's keys
      for (const k in subsetObj) {
        if (subsetObj.hasOwnProperty(k)) {
          // key is not present in set object, or values are not strictly equal
          if (!setObj.hasOwnProperty(k) || setObj[k] !== subsetObj[k]) {
            return false;
          }
        }
      }
      return true; // match!
    }
  }

  /**
   * Wrapper for `Set.prototype.add()` method.
   * @param {*} value Value to be added to the Set.<br>
   * Following data types are deprecated:
   * - `null`,
   * - `boolean`,
   * - `array`, being empty,
   * - `object`, being empty.
   * @returns {SetWrap} Mimicks the _super_ method by allowing call chaining.
   * @throws {SyntaxError} "Not all required parameters are supplied."
   * @throws {TypeError} "Cannot utilize NULL primitives."
   * @throws {TypeError} "Cannot utilize boolean primitives."
   * @throws {TypeError} "Cannot utilize empty arrays."
   * @throws {TypeError} "Cannot utilize empty objects."
   */
  add(value) {
    /* Validations of arguments' edge cases */
    if (value === undefined) {
      throw new SyntaxError("Not all required parameters are supplied.");
    } else if (value === null) {
      throw new TypeError("Cannot utilize NULL primitives.");
    } else if (typeof value === "boolean" || value instanceof Boolean) {
      throw new TypeError("Cannot utilize boolean primitives.");
    } else if (
      (typeof value === "string" || value instanceof String) &&
      value.length === 0
    ) {
      throw new TypeError("Cannot utilize empty strings.");
    } else if (Array.isArray(value) && value.length === 0) {
      throw new TypeError("Cannot utilize empty arrays.");
    } else if (
      typeof value === "object" &&
      Object.getOwnPropertyNames(value).length === 0 &&
      Object.getOwnPropertySymbols(value).length === 0
    ) {
      throw new TypeError("Cannot utilize empty objects.");
    } else {
      /* Logics */
      super.add(value);
      return this;
    }
  }
}
