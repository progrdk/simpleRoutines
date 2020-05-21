/**
 * Proxy pattern class is designed to secure arrays
 *  from unintended/easy mutation.<br>
 * Security through complexity is applied.<br>
 * **Goal** was to create an Array type that is not mutable from anywhere easy,
 *  but only from the container object by methods,
 *  designed for the Array mutation purposes exactly.<br>
 * <small>{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy|Proxy} object could be used instead (!IE)</small>
 */
class DevotedArray extends Array {
  /**
   * @param {Object} containerObject Reference to the object,
   *  containing the DevotedArray object.
   * @param  {...any} values Values to be inserted into the new DevotedArray object. Separated by comma or encapsulated in an iterable structure.
   * @extends {Array}
   */
  constructor(containerObject, ...values) {
    // call the Array constructor
    super(...values);
    // link to the container obj of this
    this._containerObj = containerObject;

    /* Some questionable paranoic mutation protection */
    // create clean object for read-only descriptor
    let descSec = Object.create(null);
    descSec.writable = false;
    descSec.enumerable = true;
    descSec.configurable = false;
    // extend r/o descriptor and make not enumerable
    let descSecPriv = Object.create(descSec);
    descSecPriv.enumerable = false;
    /* Make methods r/o (study + paranoia) */
    Object.defineProperty(DevotedArray.prototype, "pop", descSec);
    Object.defineProperty(DevotedArray.prototype, "push", descSec);
    Object.defineProperty(DevotedArray.prototype, "shift", descSec);
    Object.defineProperty(DevotedArray.prototype, "unshift", descSec);
    Object.defineProperty(DevotedArray.prototype, "sort", descSec);
    /* Make methods r/o and !enumerable (study + paranoia) */
    Object.defineProperty(this, "_containerObj", descSecPriv);
    Object.defineProperty(DevotedArray.prototype, "_pass", descSecPriv);
  }

  /**
   * @property {Object} _containerObj Reference to the container object
   *  that holds the reference to this DevotedArray object.
   * @private
   */
  _containerObj;

  /**
   * Adds new element(s) to the end of the array.
   *
   * @param {Object} thisArg Object from where the call is performed.
   * @param {string} method Method that performs the call.
   * @param {*} v Value(s) to be inserted into dataset.
   * @returns {number} New length of the dataset.
   * @memberof DevotedArray
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push|MDN Array.push()}.

   */
  push(thisArg, method, ...v) {
    return this._pass(thisArg, method, "push", ...v);
  }

  /**
   * Removes the element from the end of the array.
   *
   * @param {Object} thisArg Object from where the call is performed.
   * @param {string} method Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof DevotedArray
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop|MDN: Array.pop()}.
   */
  pop(thisArg, method) {
    return this._pass(thisArg, method, "pop");
  }

  /**
   * Adds new element(s) to the beginning of the array.
   *
   * @param {Object} thisArg Object from where the call is performed.
   * @param {string} method Method that performs the call.
   * @param {*} v Value(s) to be inserted into dataset.
   * @returns {number} New length of the dataset.
   * @memberof DevotedArray
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift|MDN Array.unshift()}.
   */
  unshift(thisArg, method, ...v) {
    return this._pass(thisArg, method, "unshift", ...v);
  }

  /**
   * Removes the element from the beginning of the array.
   *
   * @param {Object} thisArg Object from where the call is performed.
   * @param {string} method Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof DevotedArray
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift|MDN Array.shift()}.
   */
  shift(thisArg, method) {
    return this._pass(thisArg, method, "shift");
  }

  // TODO: implement splice call proxy pass for "delete" action. Name the method "delete".

  /**
   * Prevents Array.sort() execution.
   *
   * @memberof DevotedArray
   * @throws {SyntaxError} `"DevotedArray.sort is not a function."` -
   *  Sort method is deprecated.
   */
  sort() {
    throw new SyntaxError("DevotedArray.sort is not a function.");
  }

  /**
   * Prevents Array.reverse() execution.
   *
   * @memberof DevotedArray
   * @throws {SyntaxError} `"DevotedArray.reverse is not a function."` -
   *  Reverse method is deprecated.
   */
  reverse() {
    throw new SyntaxError("DevotedArray.reverse is not a function.");
  }

  /**
   * Prevents Array.splice() execution.
   *
   * @memberof DevotedArray
   * @throws {SyntaxError} `"DevotedArray.splice is not a function."` -
   *  Sort method is deprecated.
   */
  splice() {
    throw new SyntaxError("DevotedArray.splice is not a function.");
  }

  /**
   * Private utility method that performs passing
   *  method calls to those of Array class.
   *  Implemented to maintain the DRY concept.
   *
   * @param {*} thisArg Object from where the call is performed.
   * @param {string} method Method that performs the call.
   * @param {*} func Name of the method of `Array.prototype`
   *  to perform the action.
   * @param {*} v Values to be inserted into dataset.<br>
   *   Separated by comma or encapsulated in an iterable structure.
   * @returns {*} One of either:
   *  - element's value for pop/shift methods,
   *  - new dataset length for push/unshift methods.
   * @memberof DevotedArray
   * @private
   */
  _pass(thisArg, method, func, ...v) {
    if (!thisArg || !method) {
      throw new Error("thisArg and method arguments are required.");
    }
    if (
      thisArg instanceof DevotedArray ||
      thisArg !== this._containerObj ||
      !(method in thisArg)
    ) {
      throw new Error(
        "Custom direct mutation detected. Use a special method (one of the container object) designed for your action or implement one."
      );
    } else {
      return super[func](...v);
    }
  }
}
