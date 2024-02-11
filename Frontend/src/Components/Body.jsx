import React from "react";
import { useState, useEffect } from "react";
import Select2, { SELECT2_TYPE_CLASSES } from "./select2/select2.component";
import axios from "axios"

import {
	timetable,
	courseOptions,
	degreeOptions,
	batchOptions,
	sectionOptions,
	dayOptions,
} from "../data.mjs";

import Button from "./Button/button.component";
import Timetable from "./table/timetable.component";

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

const CourseSegment = ({ coursename, onRemove }) => {
	return (
		<div className="inline-flex items-center bg-slate-600 text-white font-semibold px-3 py-1 rounded-full mr-2">
			<span>{coursename}</span>
			<button className="ml-2 focus:outline-none" onClick={onRemove}>
				&#10005;
			</button>
		</div>
	);
};

const parseDropdownData = (data, degree = "", batch = "", course = "", section = "") => {
	let res = [];
	if (!degree) {
		res = Array.from(Object.keys(data));
	}
	else if (!batch) {
		data[degree].forEach(obj => {
			res.push(obj.batch);
		});
	}
	else if (!course) {
		for (let i = 0; i < data[degree].length; i++) {
			if (data[degree][i]["batch"] === batch) {
				data[degree][i]["courses"].forEach(obj => {
					res.push(obj.name);
				})
				break;
			}
		}
	}
	else if (!section) {
		for (let i = 0; i < data[degree].length; i++) {
			if (data[degree][i]["batch"] === batch) {
				for (let j = 0; j < data[degree][i]["courses"].length; j++) {
					if (data[degree][i]["courses"][j]["name"] === course) {
						res = Array.from(data[degree][i]["courses"][j]["sections"]);
					}
				}
			}
		}
	}
	return res.map((value) => {
		return {
			label: value, value: value
		}
	})
}

const Body = ({ isDarkmode }) => {
	const [data, setData] = useState(null);
	const [courses, setCourses] = useState([]);
	const [courseOption, setCourseOption] = useState("");
	const [degreeOption, setDegreeOption] = useState("");
	const [batchOption, setBatchOption] = useState("");
	const [currentSection, setCurrentSection] = useState("");
	const [dayOption, setDayOption] = useState("Monday");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/v1/data");
				setData(response.data);
				setDegreeOption(Object.keys(response.data)[0]);
				console.log(response.data);
			} catch (err) {
				console.log(err)
			}
		}
		fetchData();
		return () => {
			setData(null);
		}
	}, [])

	function onCourseChange(selectedCourse) {
		const { label, value } = selectedCourse;
		setCourseOption(value);
	}

	const onDayChange = (selectedDay) => {
		const { label, value } = selectedDay;
		setDayOption(value);
	};

	const onDegreeChange = (selectedDegree) => {
		const { label, value } = selectedDegree;
		setDegreeOption(value);
	};

	const onBatchChange = (selectedBatch) => {
		const { label, value } = selectedBatch;
		setBatchOption(value);
	};

	const onSectionChange = (selectedSection) => {
		const { label, value } = selectedSection;
		setCurrentSection(value);
	};

	const handleRemoveCourseSegment = (index) => {
		const newCourses = [...courses];
		newCourses.splice(index, 1);
		setCourses(newCourses);
	};

	const addCourse = () => {
		let selectedCourse = null;
		if (courseOption === "ALL") {
			let courseCopy = [...courses];
			for (const option of courseOptions) {
				if (option === "ALL") continue;
				selectedCourse =
					option +
					"-" +
					degreeOption +
					"-" +
					batchOption +
					"-" +
					currentSection;
				if (!courseCopy.includes(selectedCourse)) {
					courseCopy.push(selectedCourse);
				}
			}
			setCourses(courseCopy);
		} else {
			selectedCourse =
				courseOption +
				"-" +
				degreeOption +
				"-" +
				batchOption +
				"-" +
				currentSection;
			if (!courses.includes(selectedCourse)) {
				setCourses([...courses, selectedCourse]);
			}
		}
	};
	return (
		<div className="flex flex-col p-4 dark:text-white">
			<div className="selections flex mt-4 border-gray-300 pb-4 flex-col md:flex-row">
				<div className="select flex flex-col p-5 md:border-r-4 xs:border-b-4 border-light-blue dark:border-dark-purple basis-1/3">
					<label htmlFor="day" className="mt-4 mb-2 font-semibold">
						Select Day:
					</label>
					<Select2
						isDarkmode={isDarkmode}
						id="day"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={dayOptions[0]}
						onChange={onDayChange}
						options={dayOptions}
					/>

					<label htmlFor="degree" className="mt-4 mb-2 font-semibold">
						Select Degree:
					</label>
					<Select2
						isDarkmode={isDarkmode}
						id="degree"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						onChange={onDegreeChange}
						options={data ? parseDropdownData(data) : degreeOptions}
					/>

					<label htmlFor="batch" className="mt-4 mb-2 font-semibold">
						Select Batch:
					</label>
					<Select2
						isDarkmode={isDarkmode}
						id="batch"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						onChange={onBatchChange}
						options={data ? parseDropdownData(data, degreeOption) : batchOptions}
					/>

					<label htmlFor="course" className="mt-4 mb-2 font-semibold">
						Select Course:
					</label>
					<Select2
						isDarkmode={isDarkmode}
						id="course"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						onChange={onCourseChange}
						options={data ? parseDropdownData(data, degreeOption, batchOption) : courseOptions}
					/>

					<label htmlFor="section" className="mt-4 mb-2 font-semibold">
						Select Section:
					</label>
					<Select2
						isDarkmode={isDarkmode}
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						onChange={onSectionChange}
						options={data ? parseDropdownData(data, degreeOption, batchOption, courseOption) : sectionOptions}
					/>
					<div className="flex justify-center align-middle pt-3 mt-3">
						<Button
							onClick={addCourse}
						>
							Add Course
						</Button>
					</div>
				</div>
				<div className="showcourses p-4 flex-col basis-2/3">
					<p className="text-lg font-bold text-gray-800 mb-2 dark:text-white">
						Selected Courses:
					</p>
					<div className="courses flex w-full flex-wrap">
						{courses.map((course, index) => {
							return (
								<CourseSegment
									key={index}
									coursename={course}
									onRemove={() => handleRemoveCourseSegment(index)}
								/>
							);
						})}
					</div>
					<div className="flex self-end w-full mt-5 justify-center">
						<Button>
							Generate TimeTable
						</Button>
					</div>
				</div>
			</div>
			<div>
				{
					//<Table courses={timetable.Monday} day={"Monday"} />}
				}
				<Timetable courses={timetable} day={dayOption} />
			</div>
		</div>
	);
};

export default Body;