import moment from "moment";

function isSelected(day, value) {
  return value.isSame(day, "day");
}

function beforeToday(day) {
  return moment(day).isBefore(new Date(), "day");
}

function isToday(day) {
  return moment(new Date()).isSame(day, "day");
}

export default function dayStyles(day, value) {
  if (beforeToday(day)) return "before";
  if (isSelected(day, value)) return "selected";
  if (isToday(day)) return "today";
  return "";
}
