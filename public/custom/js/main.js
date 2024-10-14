let idChecked = document.getElementById("organizer");
let classList = document.getElementById("toggleField").classList;
if (idChecked.checked) {
  classList.remove("hide");
} else {
  classList.add("hide");
}

function showOrganizerSpecificFields(event) {
  if (event.checked) {
    classList.remove("hide");
  } else {
    classList.add("hide");
  }
}
