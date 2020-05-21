/**
 * @file Performs initial JS scripts injection on a document construction time.
 *
 * **Is meant to be included in starting page `<head>`.**
 */

/**
 * Class for dynamic load and injection of JS script(s).<br>
 * Holds a configuration set of initial app's scripts, arranged in load order.
 */
class ScriptManager {
  /**
   * @param {Set<string>} [urls] List of URLs of initial JS scripts to be injected to the end of the documents's body.<br>
   * For the default value used if parameter is omitted, refer to {@link ScriptManager#initialScripts|initialScripts}.
   */
  constructor(urls) {
    // called empty => initializing default
    if (!urls) {
      this[Symbol.toStringTag] = "ScriptManager";
      // scripts' URLs must be relative to the page they are injected to
      this.initialScripts = new Set([
        "src/core/js/classes/utility/SetWrap.js",
        "src/core/js/classes/business/Routine.js",
        "src/core/js/classes/business/ScheduleFactory.js",
        "src/core/js/classes/business/Schedule.js",
        "src/js/expandCollapseInit.js",
        "src/js/expandCollapseFinish.js",
        "src/js/childrenAutoCollapse.js",
        "src/js/checkboxEnabler.js",
        "src/js/inputDatesTodayInjector.js",
        "src/js/appendElementFromTemplate.js",
        "src/js/updateRoutineName.js",
        "src/js/EventManager.js",
        "src/js/main.js",
      ]);
    }
    // passed a valid parameter of Set<string> type
    else if (
      urls instanceof Set &&
      Array.from(urls.entries()).every((v) => typeof v === "string")
    ) {
      this.initialScripts = urls;
    }
    // passed an invalid parameter
    else {
      throw new SyntaxError(
        "ScriptManager constructor accepts a single parameter of Set<string> only."
      );
    }

    /* Some questionable paranoic mutation protection */
    // create read-only descriptor
    let descSec = Object.create(null);
    descSec.writable = false;
    descSec.enumerable = true;
    descSec.configurable = false;
    // extend r/o descriptor and make !enumerable
    let descSecPriv = Object.create(descSec);
    descSecPriv.enumerable = false;
    // protect
    Object.defineProperty(this, "initialScripts", descSec);
    Object.defineProperty(ScriptManager.prototype, "load", descSec);
    Object.defineProperty(ScriptManager.prototype, "preconfigure", descSec);
    Object.defineProperty(ScriptManager.prototype, "_serviceLoad", descSecPriv);
  }

  /**
   * @property {Set<string>} initialScripts _Read-only_ configuration property
   *  that holds a list of JS scripts to be injected
   *  into a document on the construction time.<br>
   * Can be populated via {@link ScriptManager|constructor} only.<br>
   * Scripts' URLs must be relative to the document they are injected to.<br>
   * Default value contains the following (order preserved):
   * ```javascript
   * "src/core/js/classes/utility/SecuredArray.js",
   * "src/core/js/classes/business/ScheduleFactory.js",
   * "src/core/js/classes/business/Schedule.js",
   * "src/js/expandCollapseInit.js",
   * "src/js/expandCollapseFinish.js",
   * "src/js/childrenAutoCollapse.js",
   * "src/js/checkboxEnabler.js",
   * "src/js/inputDatesTodayInjector.js",
   * "src/js/appendElementFromTemplate.js",
   * "src/js/updateRoutineName.js",
   * "src/js/EventManager.js",
   * "src/js/main.js"
   * ```
   */
  initialScripts;

  /**
   * Performs dynamic script(s) injection into
   *  the DOM of a document (file) it's being called at.
   * Accepts one URL as well as many ordered URLs in Set.
   *
   * @param {string} selector Valid CSS selector
   *  of a parent / sibling DOM element.
   * @param {string|Set<string>} url One or many URLs
   *  (arranged in the load order),
   *  relative to the document, that method is being called at.
   * @param {string} [position="append"] Switch that specifies the position where script(s) will be injected. May be any of these values:
   * - **`append`** - **_Default_** value. Script(s) will be appended to the childlist of the element, identified by `selector`.<br>{@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append|MDN: ParentNode.append()};
   * - **`prepend`** - Scripts will be prepended to the childlist of the element, identified by `selector`.<br>{@link https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend|MDN: ParentNode.append()};
   * - **`before`** - Scripts will be injected to the _parent_ of the element, identified by `selector`, right before the element itself.<br>{@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/before|MDN: ChildNode.before()};
   * - **`after`**  - Scripts will be injected to the _parent_ of the element, identified by `selector`, right after the element itself.<br>{@link https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/after|MDN: ChildNode.after()};
   * @memberof ScriptManager
   */
  load(selector, url, position = "append") {
    switch (typeof url) {
      case "string": {
        // load the single script
        this._serviceLoad(selector, url, position);
        break;
      }
      case "object": {
        // check that a Set<string> is passed
        if (
          url instanceof Set &&
          Array.from(url.values()).every((v) => typeof v === "string")
        ) {
          // load every script in the array, preserving the order
          url.forEach((v) => this._serviceLoad(selector, v, position));
        } else {
          throw new SyntaxError(
            "The second parameter accepts only a string or a Set<string> value."
          );
        }
        break;
      }
    }
  }

  /**
   * Performs initial JS scripts (taken from
   *  {@link ScriptManager#initialScripts|initialScripts} property)
   *  injection into the html page (file) it's being called at.<br>
   * Scripts are placed at the end of the `<body>` tag (appended).<br>
   * Wraps {@link ScriptManager#load|load()} method.
   *
   * @memberof ScriptManager
   */
  preconfigure() {
    this.load("body", this.initialScripts, "append");
  }

  /**
   * Private service method.
   * Removes code duplication.
   * Should not be called or modified on its own outside the class!
   *
   * @param {string} selector Refer `ScriptManager.load()` docs.
   * @param {string|Array<string>} url Refer `ScriptManager.load()` docs.
   * @param {string} position Refer `ScriptManager.load()` docs.
   * @memberof ScriptManager
   * @private
   */
  _serviceLoad(selector, url, position) {
    // find the Element
    let element = document.querySelector(selector);
    // create a new <script> node
    let script = document.createElement("script");
    // set its src to the provided URL
    script.src = url;
    // queue script to execute in injection order
    script.async = false;
    // add it into the DOM
    switch (position) {
      case "before": {
        element.before(script);
        break;
      }
      case "after": {
        element.after(script);
        break;
      }
      case "prepend": {
        element.prepend(script);
        break;
      }
      case "append": {
        element.append(script);
        break;
      }
    }
  }
}

// TODO: consider moving following code into smth like init.js file
//  placed after the ScriptManager.js
/* This code must remain in place! */
/* Perform initial JS injection on DOM load. */
const SCRIPT_MANAGER = new ScriptManager();
document.addEventListener(
  "DOMContentLoaded",
  SCRIPT_MANAGER.preconfigure.bind(SCRIPT_MANAGER)
);
