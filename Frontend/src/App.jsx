import React from "react";
import Header from "./Components/header/header.component";
import Body from "./Components/Body";
import Footer from "./Components/footer/footer.component";

function App() {
  return (
    <div className="flex flex-col dark:bg-dark-body justify-center align-middle w-full">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
