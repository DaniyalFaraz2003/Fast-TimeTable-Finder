import React from "react"
import Header from "./Components/Header"
import Body from "./Components/Body"
import Footer from "./Components/Footer"
function App() {
	return (
		<div className="flex flex-col min-h-screen w-screen dark:bg-dark-body">
			<Header/>
			<Body/>
			<Footer/>
		</div>
	)
}

export default App
