import { AiOutlineSchedule } from "react-icons/ai";
export default function Header() {
    return (
        <div className="flex bg-gradient-to-l from-violet-900 via-gray-800 to-red-700 w-screen h-52">
            <div className="flex flex-row gap-5 items-center">
                <AiOutlineSchedule />
                <h2 className="text-white text-xl">Time Table</h2>
            </div>
        </div>

    )
}