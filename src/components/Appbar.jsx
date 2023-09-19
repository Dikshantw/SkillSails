import { AppBar, Typography, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { userEmailState } from "../store/selectors/userEmail.js";
import { userState } from "../store/atom/user.js";
import "../index.css";
function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <AppBar
        position="sticky"
        style={{
          padding: 4,
          zIndex: 1,
          backgroundColor: "#f2542d",
        }}
      >
        <Toolbar>
          <Typography
            style={{ marginLeft: 10, cursor: "pointer", bgcolor: "#000000" }}
            onClick={() => {
              navigate("/");
            }}
            variant={"h6"}
          >
            SkillSail
          </Typography>

          <Button
            sx={{ marginLeft: "auto", color: "#ffffff" }}
            onClick={() => {
              navigate("/addcourse");
            }}
          >
            Add course
          </Button>
          <Button
            sx={{ marginLeft: "10px", color: "#ffffff" }}
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </Button>

          <Button
            sx={{ marginLeft: "auto", bgcolor: "#222222" }}
            variant={"contained"}
            onClick={() => {
              localStorage.setItem("token", null);
              setUser({
                isLoading: false,
                userEmail: null,
              });
              navigate("./");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        position="sticky"
        style={{
          padding: 4,
          boxShadow: "none",
          backgroundColor: "#f2542d",
        }}
      >
        <Toolbar>
          <Typography variant={"h6"} className="customAppBarTypography">
            SkillSail
          </Typography>

          <Button
            sx={{
              marginLeft: "auto",
              bgcolor: "#222222",
              boxShadow: "0px, 30px,0px, 0px, rgba(0,0,0,0.25)",
            }}
            variant={"contained"}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
          <Button
            sx={{ marginLeft: "10px", bgcolor: "#222222" }}
            variant={"contained"}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Appbar;
