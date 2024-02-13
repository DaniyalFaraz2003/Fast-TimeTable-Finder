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
      className= 'basic-single'
      styles={props.styles}
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
  return <
    AsyncSelect cacheOptions defaultOptions {...props}
    className="bg-dark-purple"
    theme={'neutral30'}
  />;
};

const getSelect2 = (selectType = SELECT2_TYPE_CLASSES.base) =>
  //  WE MAKE A SPECIAL MAP OBJECT AND IT WILL BE PASSED IN A [BUTTON_TYPE] VALUE
  ({
    [SELECT2_TYPE_CLASSES.base]: BaseSelect,
    [SELECT2_TYPE_CLASSES.animated]: AnimatedSelect,
    [SELECT2_TYPE_CLASSES.async]: AsySelect,
  }[selectType]);

const Select2 = ({ selectType, isDarkmode, isDisabled = false,...otherprops }) => {
  const SelectComponent = getSelect2(selectType);
  const { options } = otherprops;
  const styles = {
    container: (provided) => ({
      ...provided,
      backgroundColor: isDarkmode ? '#525759': 'white',
      color:  isDarkmode ?'white':'#000',
    }),
    control: (provided, state) => ({
      ...provided,
      color:  isDarkmode ?'#ffff':'#000',
      backgroundColor: state.isFocused ? isDarkmode ?'#3C0753':'#92C7CF' : isDarkmode ? '#525759': 'white', 
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'bg-gray-500',
      color:  isDarkmode ?'white':'black',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? isDarkmode ?'#3C0753':'#92C7CF' : isDarkmode ? '#525759': 'white' ,
      color:  isDarkmode ?'white':'#000',
    }),
    singleValue: provided => ({
      ...provided,
      color:  isDarkmode ?'#ffff':'#000',
    })
  }
  return <SelectComponent {...otherprops} isDarkmode = {isDarkmode} styles = {styles} isDisabled = {isDisabled}></SelectComponent>;
};

export default Select2;
