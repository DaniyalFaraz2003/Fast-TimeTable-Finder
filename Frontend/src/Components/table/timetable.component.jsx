import VTable from "./vtable.component";
import HTable from "./table.component";

import useWindowDimensions from "./window-dimensions.hook";
const Timetable = ({ courses, day }) => {
  const { height, width } = useWindowDimensions();

  return (
    <>
      {width <= 550 ? (
        <VTable className="vtable" courses={courses} day={day} />
      ) : (
        <HTable className="htable" courses={courses} day={day} />
      )}
    </>
  );
};

export default Timetable;
