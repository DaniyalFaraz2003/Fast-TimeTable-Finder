import Select from "react-select";
import { forwardRef } from "react";


const BaseSelect = forwardRef(({ selectType, isDarkmode, isDisabled = false,...otherprops },ref) => {
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
  return(
    <Select
        className= 'basic-single'
        styles={styles}
        classNamePrefix="select"
        isDisabled = {isDisabled}
        ref={ref}
        options={options}
        {...otherprops}
      />
  )
});

export default BaseSelect;
