/* _______________________
Command use toast message:

Alert({
	type: "Your type you want",
	title: "Your title!",
	text: "Your text.",
	buttonLeft: "Content for button left",
	classButtonLeft: "Class for button left", (optional)
	buttonRight: "Content for button right",
	classButtonRight: "Class for button right", (optional)
	coin: "Coin for reward the game", (optional)
})
_______________________*/

var alert = document.createElement('div');
alert.classList.add('alert', 'alert--hidden');
document.body.prepend(alert);
const icons = {
   empty: 'fa-solid fa-hourglass alertbox__icon--empty',
   congrats: 'fa-solid fa-award',
};
function Alert({
   type = 'empty',
   title = 'SOMETHING WENT WRONG!',
   text = 'Nothing here.',
   buttonLeft = 'Cancel',
   classButtonLeft = '',
   buttonRight = 'Cancel',
   classButtonRight = '',
   coin = null,
}) {
   alert.classList.remove('alert--hidden');
   const alertBox = document.createElement('div');
   alertBox.classList.add('alertbox', `alertbox--${type}`);
   alertBox.innerHTML = `<div class="alertbox__icon"><i class="${icons[type]}"></i></div>
								<div class="alertbox__title">
									<h2>${title}</h2>
								</div>
								<div class="alertbox__text">${text}</div>
								<div class="alertbox__btn btns">
									<div onclick="removeAlertBox();" class="${classButtonLeft} btn btn--size-s">${buttonLeft}</div>
									<div onclick="removeAlertBox();" class="${classButtonRight} btn btn--size-s">${buttonRight}</div>
								</div>`;
   alert.prepend(alertBox);
   if (coin !== null) {
      const alertText = document.querySelector('.alertbox__text');
      alertText.innerHTML = `${text}<span>${coin} Coin</span>`;
   }
}
function removeAlertBox() {
   alert.replaceChildren();
   alert.classList.add('alert--hidden');
}

function create() {
   Alert({
      type: 'congrats',
      title: 'Congratulations!',
      text: 'You have successfully passed the game!<br>You earned: ',
      buttonLeft: 'Back to lobby',
      classButtonLeft: 'back__lobby',
      buttonRight: 'New game',
      classButtonRight: 'matchcard__newGame',
      coin: randomRange(1, 1000),
   });
}
