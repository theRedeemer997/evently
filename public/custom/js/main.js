let idChecked = document.getElementById('organizer');
let classList = document.getElementById('toggleField').classList;
if (idChecked.checked) {
    classList.remove('hide');
} else {
    classList.add('hide');
}

//function that displays the fields specific for organizer during the registration
function showOrganizerSpecificFields(event) {
    if (event.checked) {
        classList.remove('hide');
    } else {
        classList.add('hide');
    }
}

// function that enables the bootstrap loader
function showBootstrapLoader() {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
}

//function that closes the notiication when the close button is clicked
function closeNotification(id) {
    let classList = document.getElementById(id).classList;
    classList.remove('d-block');
    classList.add('d-none');
}
