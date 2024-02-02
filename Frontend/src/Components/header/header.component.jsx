import { AiOutlineSchedule } from "react-icons/ai";

import Toggler from "../toggler/toggler.component";

const Header = ({isDarkmode,setIsDarkMode}) => {
  return (
    <div className="flex  w-full
    bg-gradient-to-l dark:from-dark-violet dark:to-dark-purple from-light-blue to-light-cyan h-fit items-center justify-between p-7">
      <div className="flex flex-row gap-5 items-center">
        <AiOutlineSchedule size={50} color={isDarkmode ? "white" : "black"} />
        <h2 className=" dark:text-white text-black md:text-3xl text-2xl font-bold">Time Table</h2>
      </div>
      <div>
        <Toggler setHeaderMode = {setIsDarkMode}/>
      </div>
    </div>
  );
};

export default Header;
