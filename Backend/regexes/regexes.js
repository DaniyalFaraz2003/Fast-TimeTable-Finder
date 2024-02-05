const cancelledR = "( \\(Cancelled\\))";
const cancelled = new RegExp(`${cancelledR}`);

const roomR = "[A-Za-z]{1}-[\\d]{3}";
const room = new RegExp(`${roomR}`);

const timeR = "[\\d]{2}:[\\d]{2}-[\\d]{2}:[\\d]{2}";
const time = new RegExp(`${timeR}`, "g");

const courseR = "^[A-Za-z \\/&]+";
const course = new RegExp(`${courseR}`);

const BS_batches = /BS [A-Z]{2} \([\d]{4}\)/g;
const MS_batches = /MS \([A-Z]{2,3}\)/g;

const degreeR = "([A-Z]{2,3}\\/)*[A-Z]{2,3}";
const degree = new RegExp(`${degreeR}`, "i");

const sectionR = "([A-Za-z]{1}[\\d]?\\/)*([A-Za-z]{1}[\\d]?)";
const section = new RegExp(sectionR);

const batchR = "[\\d]{2}";
const batch = new RegExp(`${batchR}`);

const FSM = /FSM/g;
const ms_electives_header = /MS Electives \(All Prgrms\)/;
const repeat_courses = /Repeat Courses/gi;

const courseEntry = new RegExp(
  `${courseR}\\(((${degreeR}-${sectionR})|(${degreeR})|(${degreeR} ${batchR}-${sectionR}))\\)`
);
