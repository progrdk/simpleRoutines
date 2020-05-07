/**
 * Class is designed to protect arrays from unintended/easy mutation.
 * Protection through complexity is applied.
 *
 * @class ProtectedArray
 * @extends {Array}
 */
class ProtectedArray extends Array {
  /**
   * This metod is a wrapper for it in Array. Refer Array.push() documentation.
   *
   * @param {*} v Value to be inserted into dataset.
   * @param {*} context Object from where the call is performed.
   * @param {*} caller Method that performs the call.
   * @returns {number} New length of the dataset.
   * @memberof ProtectedArray
   */
  push(v, context, caller) {
    if (!context || !caller) {
      throw new Error("Context and caller arguments are required.");
    }
    if (!(context instanceof ProtectedArray)) {
      if (!(caller in context)) {
        throw new Error(
          "Custom direct mutation detected. Use a special method designed for your action or implement one."
        );
      } else {
        return super.push(v);
      }
    }
  }
  /**
   * This metod is a wrapper for it in Array. Refer Array.pop() documentation.
   *
   * @param {*} context Object from where the call is performed.
   * @param {*} caller Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof ProtectedArray
   */
  pop(context, caller) {
    if (!context || !caller) {
      throw new Error("Context and caller arguments are required.");
    }
    if (!(context instanceof ProtectedArray)) {
      if (!(caller in context)) {
        throw new Error(
          "Custom direct mutation detected. Use a special method designed for your action or implement one."
        );
      } else {
        return super.pop();
      }
    }
  }
  /**
   * This metod is a wrapper for it in Array. Refer Array.unshift() documentation.
   *
   * @param {*} v Value to be inserted into dataset.
   * @param {*} context Object from where the call is performed.
   * @param {*} caller Method that performs the call.
   * @returns {number} New length of the dataset.
   * @memberof ProtectedArray
   */
  unshift(v, context, caller) {
    if (!context || !caller) {
      throw new Error("Context and caller arguments are required.");
    }
    if (!(context instanceof ProtectedArray)) {
      if (!(caller in context)) {
        throw new Error(
          "Custom direct mutation detected. Use a special method designed for your action or implement one."
        );
      } else {
        return super.unshift(v);
      }
    }
  }
  /**
   * This metod is a wrapper for it in Array. Refer Array.shift() documentation.
   *
   * @param {*} context Object from where the call is performed.
   * @param {*} caller Method that performs the call.
   * @returns {*} Value of the element taken from dataset.
   * @memberof ProtectedArray
   */
  shift(context, caller) {
    if (!context || !caller) {
      throw new Error("Context and caller arguments are required.");
    }
    if (!(context instanceof ProtectedArray)) {
      if (!(caller in context)) {
        throw new Error(
          "Custom direct mutation detected. Use a special method designed for your action or implement one."
        );
      } else {
        return super.shift();
      }
    }
  }
  /**
   * This metod is a wrapper for it in Array. Prevents Array.sort() execution.
   *
   * @memberof ProtectedArray
   */
  sort() {
    throw new Error("This dataset doesn't support sorting.");
  }
}
