import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { HomePage, HomeLayout } from "./pages/HomePage";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useAuth } from "./context/AuthContext";
import ModalContextProvider from "./context/ModalContext";
import { UserDashboard } from "./pages/UserDashboard";

function App() {
  const { isLoaded, user } = useAuth();

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Router>
      <ModalContextProvider>
        <Routes>
          {/* <Route path="/dashboard/admin">
          <Route path="" element={<AdminDashboardPage />} />
        </Route>
        <Route path="/dashboard">
          <Route path="" element={<UserDashboardPage />} />
        </Route> */}
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<HomePage modalVisible={"login"} />}
            />
            <Route
              path="/register"
              element={<HomePage modalVisible={"register"} />}
            />
            <Route path="/profile" element={<UserDashboard/>} />
          </Route>
          <Route
            path="*"
            element={<h1>Nie znaleźliśmy takiej strony</h1>}
          ></Route>
        </Routes>
      </ModalContextProvider>
    </Router>
  );
}

export default App;
