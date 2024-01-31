import React from "react";
import { useState } from "react";

import Select2, { SELECT2_TYPE_CLASSES } from "./select2/select2.component";

import { timetable, courseOptions, degreeOptions, batchOptions, sectionOptions } from "../data.mjs";

import Table from "./table/table.component";

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

const Body = () => {
	const [courses, setCourses] = useState([]);
	const [courseOption, setCourseOption] = useState({});
	const [degreeOption, setDegreeOption] = useState("");
	const [batchOption, setBatchOption] = useState("");
	const [currentSection, setCurrentSection] = useState("");

	function setCourse(currentOption) {
		setCourseOption(currentOption);
	}

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
		if (courseOption.value === "ALL") {
			let courseCopy = [...courses];
			for (const option of courseOptions) {
				if (option.value === "ALL") continue;
				selectedCourse = option.value + "-" + degreeOption + "-" + batchOption + "-" + currentSection;
				if (!courseCopy.includes(selectedCourse)) {
					courseCopy.push(selectedCourse);
				}
			}
			setCourses(courseCopy);
		}
		else {
			selectedCourse = courseOption.value + "-" + degreeOption + "-" + batchOption + "-" + currentSection;
			if (!courses.includes(selectedCourse)) {
				setCourses([...courses, selectedCourse]);
			}
		}
	};

	return (
		<div className="flex flex-col p-4 border border-gray-300 dark:text-white" >
			<div className="selections flex mt-4 border-b border-gray-300 pb-4 flex-col md:flex-row">
				<div className="select flex flex-col p-4 border-r border-gray-300 basis-1/3">
					<label htmlFor="degree" className="mt-4 mb-2">
						Select Degree:
					</label>
					<Select2
						id="degree"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={degreeOptions[0]}
						name="color"
						onChange={onDegreeChange}
						options={degreeOptions}
					/>

					<label htmlFor="batch" className="mt-4 mb-2">
						Select Batch:
					</label>
					<Select2
						id="batch"
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={batchOptions[0]}
						name="color"
						onChange={onBatchChange}
						options={batchOptions}
					/>

					<label htmlFor="course" className="mt-4 mb-2">
						Select Course:
					</label>
					<Select2
						id="course"
						selectType={SELECT2_TYPE_CLASSES.async}
						cacheOptions
						defaultOptions
						loadOptions={promiseOptions}
						onChange={setCourse}
					/>

					<label htmlFor="section" className="mt-4 mb-2">
						Select Section:
					</label>
					<Select2
						selectType={SELECT2_TYPE_CLASSES.base}
						className="basic-single"
						classNamePrefix="select"
						defaultValue={sectionOptions[0]}
						name="color"
						onChange={onSectionChange}
						options={sectionOptions}
					/>

					<button
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={addCourse}
					>
						Add Course
					</button>
				</div>
				<div className="showcourses p-4 flex-col basis-2/3">
					<p className="text-lg font-bold text-gray-800 mb-2 dark:text-white">
						Selected Courses:
					</p>
					<div className="courses flex w-full flex-wrap gap-5">
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
					<div className="flex self-end w-full">
						<button
							className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-end"
						>
							Generate TimeTable
						</button>
					</div>
				</div>

			</div>
			<div>
				<Table courses={timetable.Monday} day={"Monday"} />
			</div>
		</div>
	);
};

export default Body;
