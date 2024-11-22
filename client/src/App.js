import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import GlobalState from "./Components/Context/Context";
import Navbar from "./Components/Header/Navbar";
import Recipe from "./Components/Recipes/Recipe";
import Contact from "./Components/Contact/Contact";
import Favourite from "./Components/Favourites/Favourite";
import Detail from "./Components/Detail/Detail";
import PageTransition from "./Components/PageTransition";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";

function App() {
  const token = localStorage.getItem("token");
  const [tokendt, setTokendt] = useState({ token });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/checktoken",
          tokendt
        );
        if (res.data.tokensts === 1) {
          localStorage.removeItem("token");
          localStorage.removeItem("uname");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [tokendt]);

  return (
    <GlobalState>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/recipe"
              element={
                <PageTransition>
                  <Recipe />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/favourite"
              element={
                <PageTransition>
                  <Favourite />
                </PageTransition>
              }
            />
            <Route
              path="/recipe-item/:id"
              element={
                <PageTransition>
                  <Detail />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
          </Routes>
        </Router>
      </div>
    </GlobalState>
  );
}

export default App;
