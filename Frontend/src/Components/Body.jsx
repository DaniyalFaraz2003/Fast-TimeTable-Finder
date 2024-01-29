import React from "react";
import { useState } from "react";

import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { courseOptions, categoryOptions, sectionOptions } from '../data.mjs';

const animatedComponents = makeAnimated();

function SingleSelect()  {
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={sectionOptions[0]}
                name="color"
                options={sectionOptions}
            />
        </>
    );
};

function AnimatedMulti() {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[categoryOptions[0]]}
            isMulti
            options={categoryOptions}
        />
    );
}

const filterCourse = (inputValue) => {
    return courseOptions.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterCourse(inputValue));
        }, 1000);
    });

const MyAsyncSelectComponent = ({ changeHandler }) => (
    <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} onChange={changeHandler} />
);

const CourseSegment = ({ coursename, onRemove }) => {
    return (
        <div className="inline-flex items-center bg-slate-600 text-white font-semibold px-3 py-1 rounded-full mr-2">
            <span>{coursename}</span>
            <button
                className="ml-2 focus:outline-none"
                onClick={onRemove}
            >
                &#10005;
            </button>
        </div>
    );
};

const Body = () => {
    const [courses, setCourses] = useState([]);
    const [courseOption, setCourseOption] = useState({})

    function setCourse(currentOption) {
        setCourseOption(currentOption);
    }


    const addCourse = () => {
        const selectedCourse = courseOption.value;
        if (!courses.includes(selectedCourse)) {
            setCourses([...courses, selectedCourse]);
        }
    }

    const handleRemoveCourseSegment = (index) => {
        const newCourses = [...courses];
        newCourses.splice(index, 1);
        setCourses(newCourses);
    };

    return (
        <div className="main flex flex-col p-4 border border-gray-300 overflow-x-hidden dark:text-white">
            <div className="selections flex mt-4 border-b border-gray-300 pb-4">
                <div className="select flex flex-col mr-4 p-4 border-r border-gray-300 basis-1/3">
                    <label htmlFor="category" className="mb-2">Choose Category:</label>
                    <AnimatedMulti id="category" />

                    <label htmlFor="course" className="mt-4 mb-2">Select Course:</label>
                    <MyAsyncSelectComponent id="course" changeHandler={setCourse} />
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addCourse}>
                        Add Course
                    </button>

                    <label htmlFor="section" className="mt-4 mb-2">Select Section:</label>
                    <SingleSelect />
                </div>
                <div className="showcourses p-4 flex-col basis-2/3">
                    <p className="text-lg font-bold text-gray-800 mb-2">Selected Courses:</p>
                    <div className="courses flex w-full flex-wrap gap-5">
                        {courses.map((course, index) => {
                            return <CourseSegment key={index} coursename={course} onRemove={() => handleRemoveCourseSegment(index)} />
                        })}
                    </div>
                </div>
            </div>
            <div className="timetable mt-4 p-4">
                <p className="text-lg font-bold">Here the generated timetable will come.</p>
            </div>
        </div>
    );
}

export default Body;