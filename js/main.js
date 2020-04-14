// Selet all collapsables from DOM.
let collapsables = document.querySelectorAll(".collapsable");
// Register functions to listen for events on any of collapsables.
for (let i = 0; i < collapsables.length; i++) {
  collapsables[i].addEventListener("click", expandCollapseInit);
  collapsables[i].addEventListener("transitionend", expandCollapseFinish);
  collapsables[i].addEventListener("click", childrenAutoCollapse);
}
