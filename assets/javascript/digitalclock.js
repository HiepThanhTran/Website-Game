// Create clock
const clockContainer = document.createElement('div');
clockContainer.classList.add('clock__container');
document.body.prepend(clockContainer);
clockContainer.innerHTML = `<div class="digital">
										<div class="digital__time">
											<span class="digital__time-hours">00</span>
											<span class="digital__time-dots">:</span>
											<span class="digital__time-minutes">00</span>
											<div class="rightSide">
												<span class="rightSide__period">AM/PM</span>
												<span class="rightSide__seconds">00</span>
											</div>
										</div>
										<div class="digital__calendar">
											<span class="digital__calendar-month">Month</span>,
											<span class="digital__calendar-dayName">Day</span>
											<span class="digital__calendar-dayNumber">00</span>
											<span class="digital__calendar-year">0000</span>
										</div>
									</div>`;

function digitalClock() {
   let today = new Date();

   // Get time
   let hours = today.getHours();
   let minutes = today.getMinutes();
   let seconds = today.getSeconds();
   let period = 'AM';

   if (hours >= 12) period = 'PM';

   hours = hours > 12 ? hours % 12 : hours;

   if (hours < 10) hours = '0' + hours;
   if (minutes < 10) minutes = '0' + minutes;
   if (seconds < 10) seconds = '0' + seconds;

   // Set time
   document.querySelector('.digital__time-hours').innerHTML = hours;
   document.querySelector('.digital__time-minutes').innerHTML = minutes;
   document.querySelector('.rightSide__seconds').innerHTML = seconds;
   document.querySelector('.rightSide__period').innerHTML = period;
}

let runClock = setInterval(digitalClock, 1000);

let today = new Date();

// Get day - month - year
const monthName = today.toLocaleString('en-ZA', { month: 'long' });
const dayName = today.toLocaleString('en-ZA', { weekday: 'long' });
const dayNumber = today.getDate();
const year = today.getFullYear();

// Set day - month - year
document.querySelector('.digital__calendar-month').innerHTML = monthName;
document.querySelector('.digital__calendar-dayName').innerHTML = dayName;
document.querySelector('.digital__calendar-dayNumber').innerHTML = dayNumber;
document.querySelector('.digital__calendar-year').innerHTML = year;
