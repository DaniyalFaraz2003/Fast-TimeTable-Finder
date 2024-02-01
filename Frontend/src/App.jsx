import React from "react";
import Header from "./Components/header/header.component";
import Body from "./Components/Body";
import Footer from "./Components/footer/footer.component";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';


function App() {
  const [isDarkmode,setIsDarkMode] = useState(useMediaQuery({ query: '(prefers-color-scheme: dark)' }))
  return (
    <div className="flex flex-col dark:bg-dark-body justify-center align-middle w-full">
      <Header isDarkmode = {isDarkmode} setIsDarkMode = {setIsDarkMode}/>
      <Body isDarkmode = {isDarkmode} />
      <Footer />
    </div>
  );
}

export default App;
