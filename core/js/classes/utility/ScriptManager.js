/**
 * Class for JS scripts dynamic loading.
 * Has methods for loading one script or many ordered scripts.
 * Also holds app's initial scripts load order configuration and method to perform scripts injection on a page construction time.
 *
 * Is meant to be included in mainpage head.
 *
 * @class ScriptManager
 */
class ScriptManager {
  /**
   * Implements dynamic script loading into DOM.
   * Accepts one URL as well as many ordered URLs.
   * Wraps default methods ParentNode.append(), prepend() and ChildNode.before(), after(). Refer to MDN Docs on this methods.
   *
   * @param {string} selector Valid CSS selector of a parent / sibling element.
   * @param {string|Array<string>} url One or many ordered URL(s) relative to the element, identified by `selector`. URL(s) must start with "./" due to path resolving.
   * @param {string} [position="append"] Switch that specifies the position where script(s) will be injected. Is enumerable of values:
   * - `"append"` Default value. Scripts will be appended to the childlist of the element, identified by `selector`;
   * - `"prepent"`  Scripts will be prepended to the childlist of the element, identified by `selector`;
   * - `"before"` Scripts will be injected to the _parent_ of the element, identified by `selector`, right before the element itself;
   * - `"after"`  Scripts will be injected to the _parent_ of the element, identified by `selector`, right after the element itself;
   * @memberof ScriptManager
   */
  load(selector, url, position = "append") {
    switch (typeof url) {
      case "string": {
        // select the existing script
        this._serviceLoad(selector, url, position);
        break;
      }
      case "object": {
        if (Array.isArray(url) && url.every((v) => typeof v === "string")) {
          url.forEach((v) => this._serviceLoad(selector, v, position));
        } else {
          throw new SyntaxError("URL array supplied has non-string values.");
        }
        break;
      }
    }
  }

  /**
   * Performs hardcoded initial script injection for the app. Wraps `load()` method.
   *
   * @memberof ScriptManager
   */
  preconfigure() {
    // array of scripts' URLs relative to index.html
    let scripts = [
      "./core/js/classes/utility/ProtectedArray.js",
      "./core/js/classes/business/Schedule.js",
      "./js/expandCollapseInit.js",
      "./js/expandCollapseFinish.js",
      "./js/childrenAutoCollapse.js",
      "./js/checkboxEnabler.js",
      "./js/inputDatesTodayInjector.js",
      "./js/appendElementFromTemplate.js",
      "./js/updateRoutineName.js",
      "./js/EventManager.js",
      "./js/main.js",
    ];
    this.load("body", scripts, "append");
  }

  /**
   * Private service method. Removes code duplication. Do not call or modify on its own outside the class!
   *
   * @param {string} selector Refer `ScriptManager.load()` docs.
   * @param {string|Array<string>} url Refer `ScriptManager.load()` docs.
   * @param {string} position Refer `ScriptManager.load()` docs.
   * @memberof ScriptManager
   */
  _serviceLoad(selector, url, position) {
    // find the Element
    let element = document.querySelector(selector);
    // create a new script node
    let script = document.createElement("script");
    // set its src to the provided URL
    script.src = url;
    // queue scripts to execute in injection order
    script.async = false;
    // add it into DOM
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

/* This code must remain in place! */
/* Perform initial JS injection on DOM load. */
const SCRIPT_MANAGER = new ScriptManager();
document.addEventListener(
  "DOMContentLoaded",
  SCRIPT_MANAGER.preconfigure.bind(SCRIPT_MANAGER)
);
