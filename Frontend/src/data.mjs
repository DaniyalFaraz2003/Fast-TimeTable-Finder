export const courseOptions = [
  { label: "Calculus", value: "Calculus" },
  { label: "PF", value: "PF" },
  { label: "COAL", value: "COAL" },
  { label: "ALL", value: "ALL" },
];

export const degreeOptions = [
  { label: "CS", value: "CS" },
  { label: "DS", value: "DS" },
  { label: "CY", value: "CY" },
  { label: "SE", value: "SE" },
  { label: "AI", value: "AI" },
  { label: "ALL", value: "ALL" },
];

export const batchOptions = [
  { label: "23", value: "23" },
  { label: "22", value: "22" },
  { label: "21", value: "21" },
  { label: "20", value: "20" },
  { label: "ALL", value: "ALL" },
];

export const sectionOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "ALL", value: "ALL" },
];

export const timetable = {
  Monday: [
    {
      courseName: "Psychology",
      beginTime: "08:30",
      endTime: "09:50",
      roomNo: "C-407",
      isCancelled: false,
      isTheory: true,
    },
    {
      courseName: "Prob & Stats",
      beginTime: "10:00",
      endTime: "11:20",
      roomNo: "C-407",
      isCancelled: false,
      isTheory: true,
    },
    {
      courseName: "Prob & Stats",
      beginTime: "10:00",
      endTime: "11:20",
      roomNo: "C-407",
      isCancelled: false,
      isTheory: true,
    },
    {
      courseName: "DB Lab",
      beginTime: "11:25",
      endTime: "14:10",
      roomNo: "Margalla 3",
      isCancelled: false,
      isTheory: false,
    },
    {
      courseName: "FreeLancing",
      beginTime: "14:30",
      endTime: "15:50",
      roomNo: "C-408",
      isCancelled: false,
      isTheory: true,
    },
  ],

  Tuesday: [],
};
let currTime = null;
[].reduce(
  (accumulator, courseObj) => {
    if (courseObj.beginTime < currTime) {
      if (
        accumulator.currArr.length &&
        !accumulator.duplicates.includes(
          accumulator.currArr[accumulator.currArr.length - 1]
        )
      ) {
        accumulator.duplicates.push(
          accumulator.currArr[accumulator.currArr.length - 1]
        );
      }
      accumulator.duplicates.push(courseObj);
    } else {
      currTime = courseObj.endTime;
      accumulator.currArr.push(courseObj);
    }
  },
  { currArr: [], duplicates: [] }
);
