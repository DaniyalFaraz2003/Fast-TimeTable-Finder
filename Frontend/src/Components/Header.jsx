import { AiOutlineSchedule } from "react-icons/ai";
import Toggler from "./Toggler";
export default function Header() {
    return (
        <div className="flex  bg-gradient-to-l dark:from-dark-violet dark:via-gray-800 dark:to-dark-purple from-light-blue to-light-cyan w-screen h-fit items-center justify-between p-7">
            <div className="flex flex-row gap-5 items-center">
                <AiOutlineSchedule size={50} color="white" />
                <h2 className="text-white text-3xl">Time Table</h2>
            </div>
            <div>
                <Toggler/>
            </div>
        </div>
    )
}