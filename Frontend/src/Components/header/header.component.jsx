import { AiOutlineSchedule } from "react-icons/ai";

import Toggler from "../toggler/toggler.component";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
const Header = () => {
  const [isDarkmode,setIsDarkMode] = useState(useMediaQuery({ query: '(prefers-color-scheme: dark)' }))
  return (
    <div className="flex  w-full
    bg-gradient-to-l dark:from-dark-violet dark:via-gray-800 dark:to-dark-purple from-light-blue to-light-cyan h-fit items-center justify-between p-7">
      <div className="flex flex-row gap-5 items-center">
        <AiOutlineSchedule size={50} color={isDarkmode ? "white" : "black"} />
        <h2 className=" dark:text-white text-black md:text-3xl sm:text-2xl">Time Table</h2>
      </div>
      <div>
        <Toggler setHeaderMode = {setIsDarkMode}/>
      </div>
    </div>
  );
};

export default Header;
