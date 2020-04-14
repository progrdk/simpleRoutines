// ... using IIFE to encapsulate the scope ...

(() => {
  // Selet all collapsables from DOM.
  let collapsables = document.querySelectorAll(".collapsable");
  // Register function to listen for click on any of collapsables.
  for (let i = 0; i < collapsables.length; i++) {
    collapsables[i].addEventListener("click", childrenAutoCollapse);
  }

  function childrenAutoCollapse(e) {
    // Clicked on "Anchor" Element that event handling is sticked to
    //  or its first child (header).
    if (
      e.target === e.currentTarget ||
      e.target === e.currentTarget.firstElementChild
    ) {
      // "Anchor" Element
      //  is in expanded state, having ".expanded"
      //  and has one ".collapsable" child at least.
      if (
        e.currentTarget.classList.contains("expanded") &&
        e.currentTarget.querySelector(".collapsable")
      ) {
        // TODO: create & dispatch custom event like "WaitingForChildrenCollapse"
        //  intil last transitionend event from children.
        let collapsableChildren = e.currentTarget.querySelectorAll(
          ".collapsable"
        );
        // ... loop is reversed for cosmetic purpose
        //  (children collapsing bottom->up) ...
        for (let i = collapsableChildren.length - 1; i > -1; --i) {
          let child = collapsableChildren[i];
          // Collapsable child is expanded
          if (child.classList.contains("expanded")) {
            // Dispatch click event on child.
            child.dispatchEvent(
              new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true
              })
            );
          }
        }
      }
    }
  }
})();
