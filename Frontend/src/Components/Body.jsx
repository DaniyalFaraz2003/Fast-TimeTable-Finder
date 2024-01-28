import React from "react";
import { useState } from "react";

const Body = () => {
    const [courses, setCourses] = useState([]);

    const addCourse = () => {

    }

    return (
        <div className="main flex flex-col p-4 border border-gray-300">
            <div className="selections flex mt-4 border-b border-gray-300 pb-4">
                <div className="select flex flex-col mr-4 p-4 border-r border-gray-300">
                    <label htmlFor="dropdown1" className="mb-2">Choose Category:</label>
                    <select id="dropdown1" className="p-2 border border-gray-300">
                        {/* Add options for dropdown 1 */}
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>

                    <label htmlFor="dropdown2" className="mt-4 mb-2">Select Course:</label>
                    <select id="dropdown2" className="p-2 border border-gray-300">
                        {/* Add options for dropdown 2 */}
                        <option value="optionA">Option A</option>
                        <option value="optionB">Option B</option>
                        <option value="optionC">Option C</option>
                    </select>

                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addCourse}>
                        Add Course
                    </button>
                </div>
                <div className="showcourses p-4">
                    {/* Add content for the 'showcourses' div */}
                </div>
            </div>
            <div className="timetable mt-4 p-4">
                <p className="text-lg font-bold">Here the generated timetable will come.</p>
            </div>
        </div>
    );
}


export default Body;