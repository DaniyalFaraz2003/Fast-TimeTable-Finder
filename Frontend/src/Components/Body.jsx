import React from "react";
import { useState, useEffect, useRef } from "react";
import BaseSelect from "./select/select.component";
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
	const [dayOption, setDayOption] = useState("");

	const dayRef = useRef();
	const degreeRef = useRef();
	const batchRef = useRef();
	const courseRef = useRef();
	const sectionRef = useRef();



	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/v1/data");
				setData(response.data);
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
		if(selectedCourse){
			const { label, value } = selectedCourse;
			setCourseOption(value);
		}
	}

	const onDayChange = (selectedDay) => {
		if(selectedDay){	
			const { label, value } = selectedDay;
			setDayOption(value);
		}
	};

	const onDegreeChange = (selectedDegree) => {
		if(selectedDegree){
			const { label, value } = selectedDegree;
			setDegreeOption(value);
		}
	};

	const onBatchChange = (selectedBatch) => {
		if(selectedBatch){
			const { label, value } = selectedBatch;
			setBatchOption(value);
		}
	};

	const onSectionChange = (selectedSection) => {
		if(selectedSection){
			const { label, value } = selectedSection;
			setCurrentSection(value);
		}
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
	//reset below fields:
	//if degree changed
	useEffect(()=>{
		const resetFields= () => {
			if(batchRef && batchRef.current){
				batchRef.current.clearValue();
				setBatchOption('');
			}
			if(sectionRef && sectionRef.current){
				sectionRef.current.clearValue();
				setCurrentSection('');
			}
			if(courseRef && courseRef.current){
				courseRef.current.clearValue();
				setCourseOption('');
			}
		}
		resetFields();
	},[degreeOption])


	//if batch changed 
	useEffect(()=>{
		const resetFields= () => {
			if(sectionRef && sectionRef.current){
				sectionRef.current.clearValue();
				setCurrentSection('');
			}
			if(courseRef && courseRef.current){
				courseRef.current.clearValue();
				setCourseOption('');
			}
		}
		resetFields();
	},[batchOption])


	//if course changed
	useEffect(()=>{
		const resetFields= () => {
			if(sectionRef && sectionRef.current){
				sectionRef.current.clearValue();
				setCurrentSection('');
			}
		}
		resetFields();
	},[courseOption])

	return (
		<div className="flex flex-col p-4 dark:text-white">
			<div className="selections flex mt-4 border-gray-300 pb-4 flex-col md:flex-row">
				<div className="select flex flex-col p-5 md:border-r-4 xs:border-b-4 border-light-blue dark:border-dark-purple basis-1/3">
					<label htmlFor="day" className="mt-4 mb-2 font-semibold">
						Select Day:
					</label>
					<BaseSelect
						isDarkmode={isDarkmode}
						id="day"
						className="basic-single"
						classNamePrefix="select"
						onChange={onDayChange}
						options={dayOptions}
						ref = {dayRef}
					/>

					<label htmlFor="degree" className="mt-4 mb-2 font-semibold">
						Select Degree:
					</label>
					<BaseSelect
						isDarkmode={isDarkmode}
						id="degree"
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						onChange={onDegreeChange}
						options={data && dayOption ? parseDropdownData(data) : degreeOptions}
						isDisabled = {dayOption ? false : true}
						ref = {degreeRef}
					/>

					<label htmlFor="batch" className="mt-4 mb-2 font-semibold">
						Select Batch:
					</label>
					<BaseSelect
						isDarkmode={isDarkmode}
						id="batch"
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						isDisabled = {degreeOption ? false : true}
						onChange={onBatchChange}
						options={data && degreeOption ? parseDropdownData(data, degreeOption) : batchOptions}
						ref = {batchRef}
					/>

					<label htmlFor="course" className="mt-4 mb-2 font-semibold">
						Select Course:
					</label>
					<BaseSelect
						isDarkmode={isDarkmode}
						id="course"
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						isDisabled = {batchOption ? false : true}
						name="color"
						onChange={onCourseChange}
						options={data && batchOption ? parseDropdownData(data, degreeOption, batchOption) : courseOptions}
						ref = {courseRef}
					/>

					<label htmlFor="section" className="mt-4 mb-2 font-semibold">
						Select Section:
					</label>
					<BaseSelect
						isDarkmode={isDarkmode}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={"Select..."}
						name="color"
						isDisabled = {courseOption ? false : true}
						onChange={onSectionChange}
						options={data && courseOption ? parseDropdownData(data, degreeOption, batchOption, courseOption) : sectionOptions}
						ref = {sectionRef}
					/>
					<div className="flex justify-center align-middle pt-3 mt-3">
						<Button
							isDisabled = {dayOption === '' || courseOption === '' || degreeOption === '' || currentSection === '' || batchOption === ''}
							onClick={addCourse}
							isDisabledText={"Not Enough Information"}
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
						<Button isDisabled = {courses.length === 0} isDisabledText={"Add Atleast One Course"}>
							Generate TimeTable
						</Button>
					</div>
				</div>
			</div>
			<div>
				{
					//<Table courses={timetable.Monday} day={"Monday"} />}
				//<Timetable courses={timetable} day={dayOption} />
				}
			</div>
		</div>
	);
};

export default Body;