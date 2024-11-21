const stars = document.querySelectorAll('.star');
// console.log("🚀 ~ stars:", stars);
for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', highLightStars);
}

function highLightStars(e) {
    removeHighlighted();
    let id = e.target.id;
    let number = id.split('-')[1];
    for (let i = number; i > 0; i--) {
        let finalID = 'i-star-' + i;
        let classList = document.getElementById(finalID).classList;
        classList.add('high');
    }
}

function removeHighlighted() {
    for (let i = 1; i <= 5; i++) {
        let finalID = 'i-star-' + i;
        let classList = document.getElementById(finalID).classList;
        classList.remove('high');
    }
}
