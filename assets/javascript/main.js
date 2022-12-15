//__________DISABLED DEV TOOL__________\\
// document.addEventListener(
//    'contextmenu',
//    function (e) {
//       e.preventDefault();
//    },
//    false,
// );
// document.addEventListener(
//    'keydown',
//    function (e) {
//       // "I" key
//       if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
//          disabledEvent(e);
//       }
//       // "J" key
//       if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
//          disabledEvent(e);
//       }
//       // "S" key + macOS
//       if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
//          disabledEvent(e);
//       }
//       // "U" key
//       if (e.ctrlKey && e.keyCode == 85) {
//          disabledEvent(e);
//       }
//       // "F12" key
//       if (event.keyCode == 123) {
//          disabledEvent(e);
//       }
//    },
//    false,
// );
// function disabledEvent(e) {
//    if (e.stopPropagation) {
//       e.stopPropagation();
//    } else if (window.event) {
//       window.event.cancelBubble = true;
//    }
//    e.preventDefault();
//    return false;
// }

//__________CREATE ELEMENT__________\\
let creOverlay = document.createElement('div');
creOverlay.classList.add('overlay');
document.body.prepend(creOverlay);
let creBackToTop = document.createElement('div');
creBackToTop.classList.add('backToTop');
creBackToTop.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
document.body.prepend(creBackToTop);
let creLoading = document.createElement('div');
creLoading.classList.add('loading');
creLoading.innerHTML = `<div class="loading__main">
									<div class="loading__balls loading__balls-1">
										<div class="loading__balls-ball loading__balls-ball--1"></div>
										<div class="loading__balls-ball loading__balls-ball--2"></div>
										<div class="loading__balls-ball loading__balls-ball--3"></div>
										<div class="loading__balls-ball loading__balls-ball--4"></div>
									</div>
									<div class="loading__balls loading__balls-2">
										<div class="loading__balls-ball loading__balls-ball--1"></div>
										<div class="loading__balls-ball loading__balls-ball--2"></div>
										<div class="loading__balls-ball loading__balls-ball--3"></div>
										<div class="loading__balls-ball loading__balls-ball--4"></div>
									</div>
								</div>`;
document.body.prepend(creLoading);
let creMaintenance = document.createElement('div');
creMaintenance.classList.add('maintenance');
creMaintenance.innerHTML = `<div class="maintenance__container">
										<div class="maintenance__heading">
											<h2>Sorry!</h2>
										</div>
										<div class="maintenance__desc">
											<p>The website is currently only available on computers</p>
										</div>
									</div>`;
document.body.prepend(creMaintenance);

//__________LOADING__________\\
const loading = document.querySelector('.loading');
window.addEventListener('load', function () {
   setTimeout(() => {
      if (loading !== null) loading.classList.add('loading--hidden');
      document.body.style.overflow = 'auto';
   }, 1000);
});

//__________LOCAL STORAGE__________\\
function saveItem(key, value) {
   localStorage.setItem(key, value);
}
function getItem(key) {
   let item = '';
   if (localStorage.getItem(key)) item = localStorage.getItem(key);
   return item;
}
function removeItem(key) {
   localStorage.removeItem(key);
}
function clearStorage() {
   localStorage.clear();
}

//__________USER__________\\
const coinUser = document.querySelector('.coin');
if (coinUser && getItem('coin') !== '') coinUser.innerHTML = getItem('coin');

/*__________RANDOM__________*/
// Random with range
function randomRange(max = 0, min = 0) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Random from 0 to value
function randomValue(value) {
   return Math.floor(Math.random() * (value + 1));
}

//__________AUDIO__________\\
const bgMusicSub = document.getElementById('bg-music-sub');
if (bgMusicSub) bgMusicSub.volume = 0.0125;
function createAudioTing() {
   let audio = document.createElement('audio');
   audio.volume = 0.0125;
   audio.innerHTML = `<source src="./assets/audio/ting.mp3"></source>`;
   return audio;
}
window.addEventListener('mouseover', function (e) {
   if (e.target.closest('.btn')) {
      let ting = createAudioTing();
      e.target.appendChild(ting);
      e.target.querySelector('audio').play();
      setTimeout(function () {
         e.target.removeChild(ting);
      }, 1000);
   }
});

//__________BACK TO TOP__________\\
const backToTopBtn = document.querySelector('.backToTop');
window.addEventListener('scroll', function () {
   if (window.pageYOffset > 300) {
      if (!backToTopBtn.classList.contains('fadeInRight')) {
         backToTopBtn.classList.remove('fadeOutRight');
         backToTopBtn.classList.add('fadeInRight');
         backToTopBtn.style.display = 'flex';
      }
   } else {
      if (backToTopBtn.classList.contains('fadeInRight')) {
         backToTopBtn.classList.remove('fadeInRight');
         backToTopBtn.classList.add('fadeOutRight');
         setTimeout(function () {
            backToTopBtn.style.display = 'none';
         }, 250);
      }
   }
});
backToTopBtn.addEventListener('click', function backToTop() {
   window.scrollTo(0, 0);
});

//__________HEADER__________\\
const headerBtns = document.querySelectorAll('.header__action-btn');
const headerRibbons = document.querySelectorAll('.header__ribbon');
const header = document.querySelector('.header');
if (header) {
   window.addEventListener('scroll', function () {
      header.classList.toggle('header--sticky', window.scrollY > 10);
   });
   window.addEventListener('click', function (e) {
      if (e.target.closest('.header__ribbon-btn')) {
         let idx = parseInt(e.target.getAttribute('rel'));
         if (idx !== NaN) {
            headerRibbons.forEach(function (ribbon, index) {
               if (index !== idx) ribbon.classList.remove('header__ribbon--show');
            });
            headerRibbons[idx].classList.toggle('header__ribbon--show');
         }
      } else {
         headerRibbons.forEach(function (ribbon) {
            ribbon.classList.remove('header__ribbon--show');
            ribbon.addEventListener('click', function (e) {
               e.stopPropagation();
            });
         });
      }
   });
}

//__________OVERLAY__________\\
const overlay = document.querySelector('.overlay');
function showOverlay(modal = null) {
   document.body.classList.add('body--scroll-hidden');
   overlay.classList.add('overlay--show');
   if (modal) modal.style.display = 'flex';
}
function hiddenOverlay(modal = null) {
   document.body.classList.remove('body--scroll-hidden');
   overlay.classList.remove('overlay--show');
   if (modal) modal.style.display = 'none';
}

//__________SIDENAV__________\\
const sidetoggle = document.querySelector('.sidenav__toggle');
const mainbody = document.querySelector('.mainbody');
const sidenav = document.querySelector('.sidenav');
function toggleSideNav() {
   if (mainbody) mainbody.classList.toggle('mainbody--push-left');
   sidenav.classList.toggle('sidenav--push-left');
}
if (sidenav) {
   sidetoggle.addEventListener('click', toggleSideNav);
   document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.sidenav') && sidenav.classList.contains('sidenav--push-left')) toggleSideNav();
   });
}
