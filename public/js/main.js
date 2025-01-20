console.log("gpgp")
const openModal = document.querySelector('#openModal');
const modalContainer = document.querySelector('#modalContainer');
const closeModal = document.querySelector('#closeModal');

openModal.addEventListener('click', () => {
  modalContainer.classList.remove('hidden');
})
modalContainer.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
})

closeModal.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
})

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
// showButton.addEventListener("click", () => {
//   dialog.showModal();
// });

// // "Close" button closes the dialog
// closeButton.addEventListener("click", () => {
//   dialog.close();
// });


const openM = document.querySelector('#openM');
const closeM = document.querySelector('#closeM');
const content = document.querySelector('#contentM');
const overlay = document.querySelector('.overlay');

console.log(openM);
openM.addEventListener("click", () => {
  togglePopup()
})
closeM.addEventListener("click", () => {
  togglePopup()
})
overlay.addEventListener("click", () => {
 console.log("oggo")
 togglePopup()
})

function togglePopup() {
  console.log("open Modal")
  document.querySelector('#popup-1').classList.toggle("active")
}

setInterval(function() {
  debugger;
  }, 1000);