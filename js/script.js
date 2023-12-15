import * as model from "./model.js";
import helpFunctions from "./helpFunctions.js";
import searchedRecipiesView from "./views/searchedRecipiesView.js";
import todayRecipiesSuggestion from "./views/todayRecipiesSuggestion.js";

const nowTimeBox = document.querySelector(".hero-section-right-side-timenow");
const nowDateHijri = document.querySelector(
  ".hero-section-right-side-datenow-box-date-hijri"
);
const fajrTime = document.querySelector(
  ".hero-section-right-side-salat-list-fajr-time"
);
const shuruqTime = document.querySelector(
  ".hero-section-right-side-salat-list-shuruq-time"
);
const dhuhrTime = document.querySelector(
  ".hero-section-right-side-salat-list-dhuhr-time"
);
const asrTime = document.querySelector(
  ".hero-section-right-side-salat-list-asr-time"
);
const maghribTime = document.querySelector(
  ".hero-section-right-side-salat-list-maghrib-time"
);
const ishaTime = document.querySelector(
  ".hero-section-right-side-salat-list-isha-time"
);
const salatList = document.querySelectorAll(
  ".hero-section-right-side-salat-list"
);
const nextPrayTime = document.querySelector(
  ".hero-section-right-side-next-prayer-box-time"
);
const searchInput = document.querySelector(
  ".hero-section-left-side-search-input"
);
const searchIcon = document.querySelector(
  ".hero-section-left-side-search-icon"
);
const searchBtn = document.querySelector(
  ".hero-section-left-side-search-box-btn"
);
const searchedRecipiesTitle = document.querySelector(
  ".hero-section-left-side-search-suggestion-title"
);

////////////////////////////
// Functions
///////////////////////////

const searchedRecipies = async function () {
  const searchedValue = searchInput.value;
  const data = await model.getRecipies(searchedValue);

  searchedRecipiesView.render(data);
  model.state.searchedRecipies = data;
  model.state.searchedValue = searchInput.value;

  searchInput.value = "";
  searchedRecipiesTitle.textContent = `Searched Recipies for "${model.state.searchedValue}" `;
};

// //////////////

const getTodaySuggestion = async function () {
  const data = await model.getRecipies("burger");
  const wantedRecipies = [];
  const numbers = [];
  for (let i = 0; i <= 3; i++) {
    const random = Math.trunc(Math.random() * data.length);
    if (!numbers.includes(random)) {
      wantedRecipies.push(data[random]);
    } else {
      i--;
    }
    numbers.push(random);
  }
  todayRecipiesSuggestion.render(wantedRecipies);
};
getTodaySuggestion();
setInterval(() => {
  getTodaySuggestion();
}, 86400000);

const now = new Date();
const date = new Intl.DateTimeFormat("en-AU", {
  hour: "2-digit",
  minute: "2-digit",
}).format(now);
nowTimeBox.textContent = date.toUpperCase();
setInterval(() => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  nowTimeBox.textContent = date.toUpperCase();
}, 60000);

//////////////

const getYear = function () {
  const now = new Date();
  const year = now.getFullYear();
  return year;
};
//////////////

const getMonth = function () {
  const now = new Date();
  const month = now.getMonth() + 1;
  return month;
};
//////////////

const getDay = function () {
  const now = new Date();
  const day = now.getDate();
  return day;
};
//////////////

const getArrMinutesSalat = function (data) {
  const arr = [];
  data.forEach((ele) => {
    arr.push(Number(ele.slice(0, 2) * 60 + Number(ele.slice(3, 5))));
  });
  return arr;
};
//////////////

const getHijriDate = async function (data) {
  const now = new Date();
  const dayLong = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
  }).format(now);
  const dateHijri = data.date.hijri;
  const day = dateHijri.day;
  const month = dateHijri.month.en;
  const year = dateHijri.year;
  nowDateHijri.innerHTML = ` <p class="hero-section-right-side-datenow-box-date-hijri">
  ${dayLong}, <br />
  ${day}st  ${month} ${year}
</p>`;
};
//////////////

const getSalatDate = function (data) {
  fajrTime.textContent = `${tConvert(data.Fajr.slice(0, 5))} `;
  shuruqTime.textContent = `${tConvert(data.Sunrise.slice(0, 5))} `;
  dhuhrTime.textContent = `${tConvert(data.Dhuhr.slice(0, 5))} `;
  asrTime.textContent = `${tConvert(data.Asr.slice(0, 5))} `;
  maghribTime.textContent = `${tConvert(data.Maghrib.slice(0, 5))} `;
  ishaTime.textContent = `${tConvert(data.Isha.slice(0, 5))} `;
};
//////////////

const getNextPrayer = function (arr) {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  const minutes = Number(date.slice(0, 2) * 60 + Number(date.slice(3, 5)));
  let i;
  let test = true;
  arr?.forEach((ele) => {
    if (minutes - ele < 0 && test) {
      i = arr.indexOf(ele);
      model.state.index = i;
      test = false;
    }
    if (!i) {
      i = 0;
      model.state.index = i;
    }
  });
  const salatNameArr = ["Fajr", "Shuruq", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const nextPraySalat = salatNameArr[i];
  let j = 0;
  salatList.forEach((list) => {
    if (j === i) {
      // list.classList.add("hero-section-right-side-salat-list-active");
      helpFunctions.clearPrayerList();
      list.children[0].style.color = "#0faa8e";
      list.children[1].style.color = "#0faa8e";
      list.style.borderBottom = "0.2rem solid #0faa8e";
      nextPrayTime.textContent = list.children[1].textContent;
    }
    j++;
  });
  return nextPraySalat;
};
//////////////
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

/////////////////////////////
// Main Salat Prayer Function
////////////////////////////

async function success(pos) {
  const crd = pos.coords;
  const lat = crd.latitude;
  const long = crd.longitude;
  console.log(lat, long);
  const year = getYear();
  const month = getMonth();
  const day = getDay();
  const data = await model.getPrayer(`${year}/${month}`, lat, long);
  const wantedPrayerTime = data[day - 1];
  getHijriDate(wantedPrayerTime);
  setInterval(() => {
    getHijriDate(wantedPrayerTime);
  }, 3600000);
  const salatTimes = wantedPrayerTime.timings;
  getSalatDate(salatTimes);
  const arrSalat = [
    salatTimes.Fajr.slice(0, 5),
    salatTimes.Sunrise.slice(0, 5),
    salatTimes.Dhuhr.slice(0, 5),
    salatTimes.Asr.slice(0, 5),
    salatTimes.Maghrib.slice(0, 5),
    salatTimes.Isha.slice(0, 5),
  ];
  const minutesSalatArr = getArrMinutesSalat(arrSalat);
  const nextPraySalat = getNextPrayer(minutesSalatArr);
  helpFunctions.getCountdown(minutesSalatArr[model.state.index], nextPraySalat);
}
navigator.geolocation.getCurrentPosition(success);

////////////////////////////
// Event Listners
///////////////////////////

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchedRecipies();
});

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchedRecipies();
  }
});

searchIcon.addEventListener("click", function (e) {
  e.preventDefault();
  searchedRecipies();
});
