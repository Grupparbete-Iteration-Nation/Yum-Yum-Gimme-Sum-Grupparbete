// En funktion som ser till att dagarna som visas under "Kommande dagarna" är rätt.
// Funktionen också visar/gömmer kartan baserat på öppettiderna.
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const weekdays = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];

  const currentDayIndex = today.getDay();

  const day3 = weekdays[(currentDayIndex + 2) % 7];
  const day4 = weekdays[(currentDayIndex + 3) % 7];
  const day5 = weekdays[(currentDayIndex + 4) % 7];

  document.getElementById("day-1").textContent = "idag";
  document.getElementById("day-2").textContent = "i morgon";
  document.getElementById("day-3").textContent = day3;
  document.getElementById("day-4").textContent = day4;
  document.getElementById("day-5").textContent = day5;

  const now = new Date();
  const stockholmTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "long",
  }).formatToParts(now);

  let currentHour = 0;
  let currentDay = "";

  stockholmTime.forEach((part) => {
    if (part.type === "hour") currentHour = parseInt(part.value);
    if (part.type === "weekday") currentDay = part.value;
  });

  const openHours = {
    söndag: { start: 11, end: 20 },
    måndag: { start: 11, end: 20 },
    tisdag: { start: 11, end: 20 },
    onsdag: { start: 11, end: 20 },
    torsdag: { start: 11, end: 20 },
    fredag: { start: 11, end: 23 },
    lördag: { start: 11, end: 23 },
  };

  const isOpen =
    currentHour >= openHours[currentDay].start &&
    currentHour < openHours[currentDay].end;

  const iframe = document.querySelector(".find__map-frame iframe");
  const closedMessage = document.getElementById("closed-message");

  if (isOpen) {
    iframe.style.display = "block";
    closedMessage.style.display = "none";
  } else {
    iframe.style.display = "none";
    closedMessage.style.display = "block";
  }
});
