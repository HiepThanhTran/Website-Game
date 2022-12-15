/* _______________________
Command use toast message:

toast({
	title: "Your title!",
	message: "Your message.",
	type: "Your type you want",
	duration: "Duration for animation",
	durationDelay: "Duration delay for animation".
})
_______________________*/

const toastID = document.createElement('div');
toastID.id = 'toastId';
document.body.prepend(toastID);

function toast({
   title = 'Error!',
   message = 'System error. Please check again.',
   type = 'error',
   duration = 1000,
   durationDelay = 3000,
}) {
   const toast = document.createElement('div');

   const autoRemove = setTimeout(function () {
      toastID.removeChild(toast);
   }, duration + durationDelay);

   toast.onclick = function (e) {
      if (e.target.closest('.toast__close')) {
         toastID.removeChild(toast);
         clearTimeout(autoRemove);
      }
   };

   const icons = {
      info: 'fa-solid fa-circle-info',
      success: 'fa-solid fa-circle-check',
      error: 'fa-solid fa-circle-exclamation',
      warning: 'fa-solid fa-circle-exclamation',
   };
   toast.classList.add('toast', `toast--${type}`);
   const animationDuration = (duration / 1000).toFixed(2);
   const animationDelay = (durationDelay / 1000).toFixed(2);
   toast.style.animation = `showToast ease 0.3s, hiddenToast linear ${animationDuration}s ${animationDelay}s forwards`;
   toast.innerHTML = `<div class="toast__icon">
									<i class="${icons[type]}"></i>
								</div>
								<div class="toast__body">
									<h3 class="toast__title">${title}</h3>
									<div class="toast__msg">${message}</div>
								</div>
								<div class="toast__close">
									<i class="fa-solid fa-xmark"></i>
								</div>`;
   toastID.appendChild(toast);
}

function info() {
   toast({
      title: 'Coming soon...',
      message: 'The site will be completed in the future.',
      type: 'info',
      duration: 1000,
      durationDelay: 3000,
   });
}
function success() {
   toast({
      title: 'Success!',
      message: 'Congrats',
      type: 'success',
      duration: 1000,
      durationDelay: 3000,
   });
}
function warning() {
   toast({
      title: 'Warning!',
      message: 'Something wrong. Try again.',
      type: 'warning',
      duration: 1000,
      durationDelay: 3000,
   });
}
function error() {
   toast({
      title: 'Error!',
      message: 'Something wrong. Try again.',
      type: 'error',
      duration: 1000,
      durationDelay: 3000,
   });
}
