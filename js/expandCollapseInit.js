function expandCollapseInit(el) {
  // > click          & no .expanded = "expanding"
  //   transitionend  & no .expanded = "expanded"
  // > click          & .expanded    = "collapsing"
  //   transitionend  & .expanded    = "" (no .expanded)
  let classList = el.classList;
  if (classList.contains("expanded")) {
    classList.add("collapsing");
  } else {
    classList.add("expanding");
  }
}
