/**
 * Wrapper is designed to secure arrays from unintended/easy mutation.
 * Security through complexity is applied.
 *
 * @class SecuredArray
 * @extends {Array}
 */
class SecuredArray extends Array {
  constructor(...v) {
    super(...v);
    // create clean object for read-only descriptor
    let descSec = Object.create(null);
    descSec.writable = false;
    descSec.enumerable = true;
    descSec.configurable = false;
    // extend r/o descriptor and make not enumerable
    let descSecPriv = Object.create(descSec);
    descSecPriv.enumerable = false;
    /* Make methods r/o (study + paranoia) */
    Object.defineProperty(SecuredArray.prototype, "pop", descSec);
    Object.defineProperty(SecuredArray.prototype, "push", descSec);
    Object.defineProperty(SecuredArray.prototype, "shift", descSec);
    Object.defineProperty(SecuredArray.prototype, "unshift", descSec);
    Object.defineProperty(SecuredArray.prototype, "sort", descSec);
    /* Make methods r/o and !enumerable (study + paranoia) */
    Object.defineProperty(SecuredArray.prototype, "_pass", descSecPriv);
  }

  /**
   * This metod is a wrapper for it in Array.
   *  Refer to Array.push() documentation.
   *
   * @param {*} v Value to be inserted into dataset.
   * @param {*} context Object from where the call is performed.
   * @param {string} caller Method that performs the call.
   * @returns {number} New length of the dataset.
   * @memberof SecuredArray
   */
  push(context, caller, v) {
    return this._pass(context, caller, "push", v);
  }

  /**
   * This metod is a wrapper for it in Array.
   *  Refer to Array.pop() documentation.
   *
   * @param {*} context Object from where the call is performed.
   * @param {string} caller Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof SecuredArray
   */
  pop(context, caller) {
    return this._pass(context, caller, "pop");
  }

  /**
   * This metod is a wrapper for it in Array.
   *  Refer to Array.unshift() documentation.
   *
   * @param {*} v Value to be inserted into dataset.
   * @param {*} context Object from where the call is performed.
   * @param {string} caller Method that performs the call.
   * @returns {number} New length of the dataset.
   * @memberof SecuredArray
   */
  unshift(context, caller, v) {
    return this._pass(context, caller, "unshift", v);
  }

  /**
   * This metod is a wrapper for it in Array.
   *  Refer to Array.shift() documentation.
   *
   * @param {*} context Object from where the call is performed.
   * @param {string} caller Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof SecuredArray
   */
  shift(context, caller) {
    return this._pass(context, caller, "shift");
  }

  /**
   * This metod is a wrapper for it in Array.
   *  Prevents Array.sort() execution.
   *
   * @memberof SecuredArray
   */
  sort() {
    throw new Error("This dataset doesn't support sorting.");
  }

  /**
   * Private utility method that performs passing
   *  method calls to those of Array class.
   *  Implemented to maintain the DRY concept.
   *
   * @param {*} context Object from where the call is performed.
   * @param {string} caller Method that performs the call.
   * @param {*} func Name of the method of `Array.prototype`
   *  to perform the action.
   * @param {*} v Value to be inserted into dataset.
   * @returns {*} One of either:
   *  - element's value for pop/shift methods,
   *  - new dataset length for push/unshift methods.
   * @memberof SecuredArray
   */
  _pass(context, caller, func, v) {
    if (!context || !caller) {
      throw new Error("Context and caller arguments are required.");
    }
    if (context instanceof SecuredArray || !(caller in context)) {
      throw new Error(
        "Custom direct mutation detected. Use a special method (one of the container object) designed for your action or implement one."
      );
    } else {
      return super[func](v);
    }
  }
}
