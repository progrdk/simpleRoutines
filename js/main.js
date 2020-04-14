let collapsables = document.querySelectorAll(".collapsable");
for (let i = 0; i < collapsables.length; i++) {
  collapsables[i].addEventListener("click", expandCollapse);
  collapsables[i].addEventListener("transitionend", expandCollapse);
}

function expandCollapse(e) {
  // click        & no .expanded = "expanding"
  // animationend & no .expanded = "expanded"
  // click        & .expanded    = "collapsing"
  // aminationend & .expanded    = "" (no .expanded)
  let classList = e.currentTarget.classList;
  switch (e.type) {
    case "click": {
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
      break;
    }
    case "transitionend": {
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
      break;
    }
  }
}
