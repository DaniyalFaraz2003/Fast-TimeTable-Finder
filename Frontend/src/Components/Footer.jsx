import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <div className="flex bg-black flex-col w-full h-fit pt-10 pb-5 text-white justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <h1 className="text-3xl">SCHEDULE GENERATOR</h1>
        <code>
          <p>
            THIS WAS MADE TO AID ALL THOSE WHO HAVE DIFFERENT CLASSES IN
            DIFFERENT SECTIONS + NEED TO MAKE TIMETABLES EVERY SEMESTER ON SOME
            SPREADSHEET
          </p>
        </code>
      </div>
      <div className="flex flex-col justify-center items-center p-3 gap-3 ">
        <code className="text-white">
          <b>Copyright &#169;{currentYear}</b>
        </code>
        <div className="flex flex-col gap-2 items-center">
          <h3>MADE WITH LOVE</h3>
          <div className="flex flex-row gap-2 justify-center align-middle">
            <IoLogoGithub size={20} />
            <a href="https://github.com/DaniyalFaraz2003">DANIYAL FARAZ</a>
          </div>
          <div className="flex flex-row gap-2 justify-center align-middle">
            <IoLogoGithub size={20} />
            <a href="https://github.com/d4niy4l">DANIYAL AHMED</a>
          </div>
          <div className="flex flex-row gap-2 justify-center align-middle">
            <IoLogoGithub size={20} />
            <a href="https://github.com/muhammadahmadazam">MUHAMMAD AHMAD</a>
          </div>
        </div>
      </div>
    </div>
  );
}
