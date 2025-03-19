document.addEventListener("DOMContentLoaded", () => {
  const moodButtons = document.querySelectorAll(".mood");
  const calendar = document.getElementById("calendar");
  const calendarHeader = document.getElementById("calendar-header");
  const body = document.body;

  function saveMood(mood, color) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    let moods = JSON.parse(localStorage.getItem("moods")) || {};
    moods[formattedDate] = { mood, color };
    localStorage.setItem("moods", JSON.stringify(moods));
    body.style.background = color;
    displayCalendar();
  }

  function displayCalendar() {
    calendar.innerHTML = "";
    let moods = JSON.parse(localStorage.getItem("moods")) || {};
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    calendarHeader.textContent = `${monthNames[month]} ${year}`;
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      let emptyDiv = document.createElement("div");
      emptyDiv.className = "empty";
      calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let dateKey = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      let moodDiv = document.createElement("div");
      moodDiv.textContent = day;
      if (moods[dateKey]) {
        moodDiv.textContent = `${day} ${moods[dateKey].mood}`;
        moodDiv.style.background = moods[dateKey].color;
      }
      calendar.appendChild(moodDiv);
    }
  }

  moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      saveMood(button.dataset.mood, button.dataset.color);
    });
  });

  let savedMoods = JSON.parse(localStorage.getItem("moods"));
  if (savedMoods) {
    let today = new Date();
    let formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    if (savedMoods[formattedDate]) {
      body.style.background = savedMoods[formattedDate].color;
    }
  }

  displayCalendar();
});
