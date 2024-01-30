import React from "react";

export default function Table({ courses, day }) {
  const compareTime = (val1, val2) => {
    const time1 = val1.beginTime.split(":").join("");
    const time2 = val2.beginTime.split(":").join("");
    return time1 > time2;
  };

  courses.sort(compareTime);
  /*const findDuplicates =  () =>{
        const duplicates = {};
        let prevStart = null, prevEnd = null;
        courses.forEach((val,index)=>{
            const start = val.beginTime.split(':').join('');
            const end = val.endTime.split(':').join('');
        
            if(prevEnd && start < prevEnd){
                if(duplicates[start]){
                    duplicates[start].push(val)
                }
                else{
                    duplicates[start] = [val]
                }
            }
            else if(prevEnd && prevEnd > start){
                if(duplicates[prevEnd]){
                    duplicates[prevEnd].push(val)
                }
                else{
                    duplicates[prevEnd] = [val]
                }
            }
            else if(prevStart &&  prevStart === start){
                if(duplicates[start]){
                    duplicates[start].push(val)
                }
                else{
                    duplicates[start] = [val]
                }
            }
            else if(prevEnd && prevEnd === end){
                if(duplicates[end]){
                    duplicates[end].push(val)
                }
                else{
                    duplicates[end] = [val]
                }
            }
            prevStart = start
            prevEnd = end
        })
        return duplicates;
    }
    const duplicates = findDuplicates();
    */
  let currTime = null;
  const accumulator = { currArr: [], duplicates: [] };
  const response = courses.forEach((courseObj) => {
    if (currTime && courseObj.beginTime < currTime) {
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
  });
  console.log(accumulator);

  return (
    <div>
      <div>
        <h1> TIME TABLE FOR {day.toUpperCase()}</h1>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <tr>
          <td className="py-2 px-4 border-b">TIME</td>
          {courses.map((val, index) => {
            return (
              <td className="py-2 px-4 border-b" key={index}>
                {val.beginTime + "-" + val.endTime}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="py-2 px-4 border-b">ROOM</td>
          {courses.map((val, index) => {
            return (
              <td className="py-2 px-4 border-b" key={index}>
                {val.roomNo}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="py-2 px-4 border-b">SUBJECT</td>
          {courses.map((val, index) => {
            return (
              <td className="py-2 px-4 border-b" key={index}>
                {val.courseName}
              </td>
            );
          })}
        </tr>
      </table>
    </div>
  );
}

/*
    11.30 - 2.20

    11.30 - 2.20
    11.30 - 12.50
    12.50 - 2.20



*/
