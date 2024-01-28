import { AiOutlineSchedule } from "react-icons/ai";
export default function Header(){
    return(
        <div className="flex bg-gradient-to-l from-violet-900 via-gray-800 to-red-700 w-screen">
        <div className="flex flex-row gap-5 items-center">
            <AiOutlineSchedule/>
            <h1 className="text-white text-xl">TimeTabler</h1>
        </div>
      </div>
      
       )
}