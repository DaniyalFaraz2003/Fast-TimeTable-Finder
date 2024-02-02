import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const click = ()=>{
    window.open('https://linkmix.co/21196093', '_blank');
  }
  return (
    <div className="flex bg-black flex-col w-full h-fit pt-10 pb-5 text-white justify-center items-center sticky top-[100vh]">
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <h1 className="text-3xl">SCHEDULE GENERATOR</h1>
        <code>
          <p>
            SAY GOODBYE TO HAVING TO REMEBER TIMETABLES
          </p>
        </code>
      </div>
      <div className="flex flex-col justify-center items-center p-3 gap-3 hover:cursor-pointer" onClick={click}>
        <IoLogoGithub size = {75} className="hover:scale-105 transition-all"/>
        <code>THE DEVS</code>
      </div>
    </div>
  );
}
