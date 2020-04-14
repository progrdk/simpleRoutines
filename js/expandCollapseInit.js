function expandCollapseInit(e) {
  // > click          & no .expanded = "expanding"
  //   transitionend  & no .expanded = "expanded"
  // > click          & .expanded    = "collapsing"
  //   transitionend  & .expanded    = "" (no .expanded)
  let classList = e.currentTarget.classList;
  // event on element itself or its first child (header)
  if (
    e.target === e.currentTarget ||
    e.target === e.currentTarget.firstElementChild
  ) {
    if (classList.contains("expanded")) {
      classList.add("collapsing");
    } else {
      classList.add("expanding");
    }
  }
}
