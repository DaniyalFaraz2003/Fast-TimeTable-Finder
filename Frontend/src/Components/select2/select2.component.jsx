import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export const SELECT2_TYPE_CLASSES = {
  base: "base",
  animated: "animated",
  async: "async",
};

const BaseSelect = (props) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      name="color"
      {...props}
    />
  );
};

const AnimatedSelect = (props) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      {...props}
    />
  );
};

const AsySelect = (props) => {
  return <AsyncSelect cacheOptions defaultOptions {...props} />;
};

const getSelect2 = (selectType = SELECT2_TYPE_CLASSES.base) =>
  //  WE MAKE A SPECIAL MAP OBJECT AND IT WILL BE PASSED IN A [BUTTON_TYPE] VALUE
  ({
    [SELECT2_TYPE_CLASSES.base]: BaseSelect,
    [SELECT2_TYPE_CLASSES.animated]: AnimatedSelect,
    [SELECT2_TYPE_CLASSES.async]: AsySelect,
  }[selectType]);

const Select2 = ({ selectType, ...otherprops }) => {
  const SelectComponent = getSelect2(selectType);
  const { options } = otherprops;

  return <SelectComponent {...otherprops}></SelectComponent>;
};

export default Select2;
