export const getParsedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const parsedHour = String(hour > 12 ? hour - 12 : hour);
  const minute = String(date.getMinutes());
  const parsedMinute = minute.length === 1 ? `0${minute}` : minute;
  const AMPM = date.getHours() > 12 ? "오후" : "오전";

  return `${year}.${month}.${day} ${AMPM} ${parsedHour}:${parsedMinute}`;
};
