import React from "react";
import Header from "./Components/header/header.component";
import Body from "./Components/Body";
import Footer from "./Components/footer/footer.component";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen dark:bg-dark-body">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
