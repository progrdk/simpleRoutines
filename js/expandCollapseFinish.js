function expandCollapseFinish(e) {
  //   click          & no .expanded = "expanding"
  // > transitionend  & no .expanded = "expanded"
  //   click          & .expanded    = "collapsing"
  // > transitionend  & .expanded    = "" (no .expanded)
  let classList = e.currentTarget.classList;
  // event on element itself or its first child (header)
  if (
    e.target === e.currentTarget ||
    e.target === e.currentTarget.firstElementChild
  ) {
    if (classList.contains("expanding")) {
      classList.remove("expanding");
      classList.toggle("expanded");
    } else {
      classList.toggle("expanded");
      classList.remove("collapsing");
    }
  }
}
