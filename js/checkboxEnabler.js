let checkEnablers = document.querySelectorAll("input[type='checkbox'].enabler");
for (let i = 0; i < checkEnablers.length; i++) {
  checkEnablers[i].addEventListener("click", enableElement);
}

function enableElement(e) {
  if (e.target === e.currentTarget) {
    document.querySelector(`#${e.target.dataset['target']}`).disabled = !e.target.checked;
  }
}
