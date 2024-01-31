import React from "react";

export default function Table({ courses, day }) {
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
    console.log(accumulator);
    const { currArr, duplicates } = accumulator
    return (
        <div className="py-4">
            <div className="overflow-x-auto">
                <div className=" bg-light-blue dark:bg-dark-purple w-full p-3 rounded-lg font-bold">
                    <h1>TIME TABLE FOR {day.toUpperCase()}</h1>
                </div>
                <table className="min-w-full border-separate border-spacing-2 text-center table-fixed sm:table-auto">
                    <tbody>
                        <tr>
                            <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 border-solid ">TIME</td>
                            {currArr.map((val, index) => {
                                return (
                                    <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-semibold bg-gray-500 rounded-lg " key={index}>
                                        {val.beginTime + "-" + val.endTime}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 border-solid ">ROOM</td>
                            {currArr.map((val, index) => {
                                return (
                                    <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-semibold bg-gray-500 rounded-lg " key={index}>
                                        {val.roomNo}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-bold bg-light-blue dark:bg-dark-purple rounded-lg p-2 border-solid ">SUBJECT</td>
                            {currArr.map((val, index) => {
                                return (
                                    <td className="sm:w-1/4 md:w-1/3 lg:w-1/2 xl:w-1/5 font-semibold bg-gray-500 rounded-lg p-2 border-solid " key={index}>
                                        {val.courseName}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            {duplicates.length !== 0 && <div className="flex flex-col justify-start p-3 bg-red-400 rounded-lg opacity-80 text-start">
                <h1 className="font-bold">CLASH FOUND IN THE FOLLOWING COURSES</h1>
                <ul className="list-decimal p-4">
                    {
                        duplicates.map((val, index) => {
                            return (
                                <li className="rounded-md p-2 font-semibold" key={index}>
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
