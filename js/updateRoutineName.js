function updateRoutineName(input) {
  let heading = input;
  // Reach parent, containing Routine heading.
  // : direct child to list of the Routines
  while (heading.parentElement.id !== "list-routines") {
    heading = heading.parentElement;
  }
  // Select its heading.
  heading = heading.firstElementChild;
  heading.textContent = input.value;
}
