import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/manual" element={<h1>Manual, not component</h1>} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
