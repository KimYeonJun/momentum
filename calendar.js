const currentTitle = document.querySelector(".current-year-month");
const calendarBody = document.querySelector(".calendar-body");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const todoDay = document.querySelector(".todo-container__days-day");
const todoDate = document.querySelector(".todo-container__days-date");
const today = new Date();
const nowDay = new Date(today.getFullYear(), today.getMonth(), 1);
let cursorDay = nowDay;
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthList = [
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
const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const handleClickDate = (event) => {
  let date = parseInt(event.target.innerText, 10);
  let day = dayList[(cursorDay.getDay() + date - 1) % 7];
  todoDate.innerHTML = date;
  todoDay.innerHTML = day;
};
const showCalendar = (year, month, day) => {
  let cnt = 1;
  const cursorYear = year % 4 === 0 ? leapYear : notLeapYear;
  currentTitle.innerHTML = `${monthList[month]}    ${year}`;
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");
      if ((i === 0 && j < day) || cnt > cursorYear[month]) {
        tr.appendChild(td);
      } else {
        td.innerText = cnt++;
        td.addEventListener("click", handleClickDate);
        tr.appendChild(td);
      }
    }
    calendarBody.appendChild(tr);
  }
};
const removeCalendar = () => {
  Object.entries(calendarBody.children).forEach((el) => {
    calendarBody.removeChild(el[1]);
  });
};
const btnClick = (type) => {
  if (type === "prev") {
    if (cursorDay.getMonth() === 1) {
      cursorDay = new Date(cursorDay.getFullYear() - 1, 12, 1);
    } else {
      cursorDay = new Date(
        cursorDay.getFullYear(),
        cursorDay.getMonth() - 1,
        1
      );
    }
  } else {
    if (cursorDay.getMonth() === 12) {
      cursorDay = new Date(cursorDay.getFullYear() + 1, 1, 1);
    } else {
      cursorDay = new Date(
        cursorDay.getFullYear(),
        cursorDay.getMonth() + 1,
        1
      );
    }
  }
  removeCalendar();
  showCalendar(
    cursorDay.getFullYear(),
    cursorDay.getMonth(),
    cursorDay.getDay()
  );
};
const handleClickBtn = (event) => {
  //event.preventDefault();
  //todoInit();
  if (event.target.className === "prev") {
    btnClick("prev");
  } else {
    btnClick("next");
  }
};
function init() {
  showCalendar(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDay());
  prevBtn.addEventListener("click", handleClickBtn);
  nextBtn.addEventListener("click", handleClickBtn);
}

init();
