// RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import * as Components from "../assets/MenuComponents.jsx";
import RegisterForm from "./RegisterForm.jsx";

// Move Axios setup to the main file

function RegisterPage() {
  const [logIn, toggle] = useState(true);

  const [logInfo, setLogInfo] = useState({
    userMail: "",
    userPassword: "",
  });

  const sendLogInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", logInfo);
      if (response.data.Message === "Success") {
        // Handle successful login (e.g., redirect)
      } else {
        alert(response.data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [signInfo, setSignInfo] = useState({
    userName: "",
    userSurname: "",
    userMail: "",
    userPassword: "",
  });

  const sendSignInfo = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/signup", signInfo)
      .then((res) => {
        if (res.data.Message === "Success") {
          console.log("person added successfully");
          toggle(true);
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Components.Container>
        <Components.SignUpContainer formtype={logIn}>
          <Components.Form>
            <Components.Title style={{ marginTop: "80px", fontSize: "30px" }}>
              Create Account
            </Components.Title>
            <RegisterForm type="signin"></RegisterForm>
            <Components.Button style={{ marginBottom: "70px" }}>
              Sign Up
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.LogInContainer formtype={logIn}>
          <Components.Form>
            <Components.Title style={{ marginTop: "70px" }}>
              Login
            </Components.Title>

            <RegisterForm type="login"></RegisterForm>

            <Components.Anchor style={{ marginBottom: "20px" }} href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button
              style={{ marginBottom: "70px" }}
              onClick={sendLogInfo}
            >
              Login
            </Components.Button>
          </Components.Form>
        </Components.LogInContainer>

        <Components.OverlayContainer formtype={logIn}>
          <Components.Overlay formtype={logIn}>
            <Components.LeftOverlayPanel formtype={logIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                Lorem ipsum dolor sit amet, consectetur
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Log In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel formtype={logIn}>
              <Components.Title>Hello!</Components.Title>
              <Components.Paragraph>
                Lorem ipsum dolor sit amet, consectetur
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default RegisterPage;
