function expandCollapseFinish(el) {
  //   click          & no .expanded = "expanding"
  // > transitionend  & no .expanded = "expanded"
  //   click          & .expanded    = "collapsing"
  // > transitionend  & .expanded    = "" (no .expanded)
  let classList = el.classList;
  if (classList.contains("expanding")) {
    classList.remove("expanding");
    classList.toggle("expanded");
  } else {
    classList.toggle("expanded");
    classList.remove("collapsing");
  }
}
