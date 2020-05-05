class EventMediator {
  constructor() {
    // : handling events on window obj due to
    // : excessive DOM manipulations
    window.addEventListener("click", this.handleClick);
    window.addEventListener("transitionend", this.handleTransitionend);
    window.addEventListener("input", this.handleInput);
  }

  handleInput(e) {
    // Editing Routine's name
    if (
      "assignment" in e.target.dataset &&
      e.target.dataset.assignment === "routine-name"
    ) {
      let input = e.target;
      // TODO: implement input validation that supports pasted strings
      // TODO: extract input validation to class
      // : expression for checking user keyboard input
      let rnameRegEx = new RegExp(/[\w _]+/);
      // : user input char is allowed
      if (rnameRegEx.test(e.data)) {
        updateRoutineName(input);
      } else {
        // : remove dissalowed char that was input last
        input.value = input.value.slice(0, input.value.length - 1);
      }
    }
  }

  handleTransitionend(e) {
    // Finish Collapsing / Expanding UI elements
    if (
      e.target.classList.contains("collapsable") ||
      e.target.classList.contains("collapsable-header")
    ) {
      let el = e.target;
      if (!el.classList.contains("collapsable")) {
        el = el.parentElement;
      }
      // : call handlers
      expandCollapseFinish(el);
    }
  }

  handleClick(e) {
    // Initiate Collapsing / Expanding UI elements
    if (
      // : clicked a .collapsable itself or its heading
      e.target.classList.contains("collapsable") ||
      e.target.classList.contains("collapsable-header")
    ) {
      let el = e.target;
      // : reach parent .collapsable for headings
      if (!el.classList.contains("collapsable")) {
        el = el.parentElement;
      }
      // : call handlers
      childrenAutoCollapse(el);
      expandCollapseInit(el);
    }
    // Append new UI Routine element
    // : clicked on button#add-routine
    if (e.target.id === "add-routine") {
      // : call handlers
      appendElementFromTemplate("routine-settings", "list-routines");
    }
  }
}
