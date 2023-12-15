const salatList = document.querySelectorAll(
  ".hero-section-right-side-salat-list"
);
const nextPrayCountdown = document.querySelector(
  ".hero-section-right-side-next-prayer-box-countdown"
);
class HelpFunctions {
  clearPrayerList() {
    salatList.forEach((list) => {
      list.children[0].style.color = "#987644";
      list.children[1].style.color = "#987644";
      list.style.borderBottom = "0.2rem solid #987644";
    });
  }
  getCountdown(nextPrayTime, nextPrayName) {
    if (!nextPrayCountdown) return;
    const minutesPray = nextPrayTime;
    const now = new Date();
    const date = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(now);
    const minutesNow = Number(date.slice(0, 2) * 60 + Number(date.slice(3, 5)));
    let distance = minutesPray - minutesNow;
    if (distance < 0) {
      distance = 24 * 60 - minutesNow + minutesPray;
    }
    let hours = Math.floor(distance / 60);
    let minutes = distance - hours * 60;
    nextPrayCountdown.textContent = `${hours}h ${minutes}min left until ${nextPrayName}`;
    let x = setInterval(() => {
      let distance = minutesPray - minutesNow;
      if (distance < 0) {
        distance = 24 * 60 - minutesNow + minutesPray;
      }
      let hours = Math.floor(distance / 60);
      let minutes = distance - hours * 60;
      nextPrayCountdown.textContent = `${hours}h ${minutes}min left until ${nextPrayName}`;
    }, 60000);
  }
}
export default new HelpFunctions();
