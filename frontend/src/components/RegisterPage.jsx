// RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import * as Components from "../assets/MenuComponents.jsx";
import RegisterForm from "./RegisterForm.jsx";

function RegisterPage() {
  const [logIn, setLogin] = useState(true);

  return (
    <div>
      <Components.Container>
        <Components.SignUpContainer formtype={logIn}>
          <Components.Form>
            <Components.Title style={{ marginTop: "80px", fontSize: "30px" }}>
              Create Account
            </Components.Title>
            <RegisterForm type="signin" setLogin={setLogin}></RegisterForm>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.LogInContainer formtype={logIn}>
          <Components.Form>
            <Components.Title style={{ marginTop: "70px" }}>
              Login
            </Components.Title>
            <RegisterForm type="login" setLogin={setLogin}></RegisterForm>
            <Components.Anchor style={{ marginBottom: "20px" }} href="#">
              Forgot your password?
            </Components.Anchor>
          </Components.Form>
        </Components.LogInContainer>

        <Components.OverlayContainer formtype={logIn}>
          <Components.Overlay formtype={logIn}>
            <Components.LeftOverlayPanel formtype={logIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                Lorem ipsum dolor sit amet, consectetur
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setLogin(true)}>
                Log In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel formtype={logIn}>
              <Components.Title>Hello!</Components.Title>
              <Components.Paragraph>
                Lorem ipsum dolor sit amet, consectetur
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setLogin(false)}>
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
