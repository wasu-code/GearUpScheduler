import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { HomePage, HomeLayout } from "./pages/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoaded, user } = useAuth();

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Router>
      <Routes>
        {/* <Route path="/dashboard/admin">
          <Route path="" element={<AdminDashboardPage />} />
        </Route>
        <Route path="/dashboard">
          <Route path="" element={<UserDashboardPage />} />
        </Route> */}
        <Route path="/" element={<HomeLayout />}>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
