import { DateTime } from "luxon";

let currentDate = DateTime.now();

export { DateTime, currentDate };

export function equalDate(day, comparedDate) {
  return (
    day.hasSame(comparedDate, "year") &&
    day.hasSame(comparedDate, "month") &&
    day.hasSame(comparedDate, "day")
  );
}

export async function getEvents(
  url,
  pending,
  confirmed,
  start,
  end,
  resSortFunc
) {
  console.log("start", pending, confirmed);
  let first = await fetch(
    `${url}?timeStamp_gte=${start.valueOf()}&timeStamp_lte=${end.valueOf()}`
  );
  let res = await first.json();
  if (res.length > 0) {
    resSortFunc(res);
  }
}

export async function postEvents(url, data, userRole) {
  let newEvent = {
    ...data,
    type: userRole === "lecturer" ? "confirmed" : "pending",
  };
  console.log("newEvent is", newEvent);
  let response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newEvent),
  });
}
