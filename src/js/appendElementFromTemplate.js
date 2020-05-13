function appendElementFromTemplate(templateId, parentElementId) {
  let template = document.querySelector(`template#${templateId}`);
  let newElement = template.content.cloneNode(true);
  let parent = document.querySelector(`#${parentElementId}`);
  if (newElement && parent) {
    parent.appendChild(newElement);
  }
}
