import React from "react";

export default function VTable({ courses, day }) {
  const compareTime = (val1, val2) => {
    const time1 = val1.beginTime.split(":").join("");
    const time2 = val2.beginTime.split(":").join("");
    return time1 > time2;
  };

  courses.sort(compareTime);

  let currTime = null;
  const accumulator = { currArr: [], duplicates: [] };
  courses.forEach((courseObj) => {
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
  const {currArr,duplicates} = accumulator
  return (
    <div className="py-4 flex flex-col gap-3">
      <div className="items-center bg-gradient-to-l dark:from-dark-violet dark:to-dark-purple from-light-blue to-light-cyan w-full p-3 rounded-lg font-bold text-center">
        <h1>TIME TABLE FOR {day.toUpperCase()}</h1>
      </div>
      <div className="flex flex-col overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-2 text-center">
          <tbody>
          <tr>
            <td className="font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 border-solid sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5">TIME</td>
            <td className="font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 border-solid sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5">ROOM</td>
            <td className="font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 sm:w-1/5 md:w-1/3 lg:w-1/2 xl:w-1/5">SUBJECT</td>
          </tr>
          {
            currArr.map((val,index)=>{
                return(
                    <tr key={index}>
                        <td className="p-2 font-semibold bg-gray-500 rounded-lg sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5">
                            {val.beginTime + "-" + val.endTime}
                        </td>
                        <td className="p-2 font-semibold bg-gray-500 rounded-lg sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5">
                            {val.roomNo}
                        </td>
                        <td className="p-2 font-semibold bg-gray-500 rounded-lg sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5">
                            {val.courseName}
                        </td>
                    </tr>
                )
            })
          }
          </tbody>
        </table>
      </div>
      {duplicates.length !== 0 && <div className="flex flex-col justify-start p-3 bg-red-400 rounded-lg opacity-80 text-start">
          <h1 className="font-bold">CLASH FOUND IN THE FOLLOWING COURSES</h1>
          <ul className="list-decimal p-4">
            {
              duplicates.map((val,index)=>{
                  return(
                    <li className= "rounded-md p-2 font-semibold" key = {index}>
                      {
                        val.courseName + "(" + val.beginTime + '-' + val.endTime + ')'
                      }
                    </li>

                  )
              })
            }
          </ul>

      </div>}


    </div>
  );
}

/*
    11.30 - 2.20

    11.30 - 2.20
    11.30 - 12.50
    12.50 - 2.20



*/
