import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Addcourse from "./components/Addcourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atom/user";
import { BASE_URL } from "./config";
import axios from "axios";
import { useEffect } from "react";
import { Box } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box>
      <RecoilRoot>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/addcourse"} element={<Addcourse />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/course/:courseId"} element={<Course />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </Box>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
