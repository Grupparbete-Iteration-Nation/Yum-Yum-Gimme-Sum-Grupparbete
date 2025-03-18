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
});
