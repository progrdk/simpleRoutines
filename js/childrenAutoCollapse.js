function childrenAutoCollapse(e) {
  // Clicked on "Anchor" Element that event handling is sticked to
  //  or its first child (header).
  if (
    e.target === e.currentTarget ||
    e.target === e.currentTarget.firstElementChild
  ) {
    // "Anchor" Element
    //  is in expanded state, having ".expanded"
    //  and has one ".collapsable.expanded" child at least.
    if (
      e.currentTarget.classList.contains("expanded") &&
      e.currentTarget.querySelector(".collapsable.expanded")
    ) {
      // Selecting only collapsable children that are expanded.
      let collapsableChildren = e.currentTarget.querySelectorAll(
        ".collapsable.expanded"
      );
      // ... loop is reversed for UI cosmetic purpose
      //  (children collapsing bottom->up) ...
      /* TODO: consider direct loop since 
          click event dispatch interval on children is unnoticeable
          without additional events that make expandCollapse wait for
          sibling/child finish transition */
      for (let i = collapsableChildren.length - 1; i > -1; --i) {
        let child = collapsableChildren[i];
        // Dispatch click event on child.
        child.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
    }
  }
}
