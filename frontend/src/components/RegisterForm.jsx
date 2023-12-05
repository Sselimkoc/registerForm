import React from "react";
import FormInput from "./FormInput";
import * as Components from "../assets/MenuComponents.jsx";
import useFormData from "../hooks/useFormData";
function RegisterForm(props) {
  const { type, setLogin } = props;
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const apiEndpoint =
    type === "login"
      ? "http://localhost:5174/login"
      : "http://localhost:5174/signup";

  const { values, onChange, sendData } = useFormData(
    initialValues,
    apiEndpoint,
    setLogin
  );

  const formInfo = [
    {
      id: 0,
      name: "fullName",
      type: "text",
      placeholder: "Name and Surname",
      label: "Full Name",
      pattern: /^[A-Za-zÇçĞğİıÖöŞşÜü]+(?: [A-Za-zÇçĞğİıÖöŞşÜü]+)+$/,
      errormessage: "Please enter a valid full name",
    },
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errormessage: "It should be a valid email address!",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter and 1 number!",
      pattern:
        /^(?=.*[0-9])(?=.*[A-Za-zÇçĞğİıÖöŞşÜü])[A-Za-zÇçĞğİıÖöŞşÜü0-9]{8,20}$/,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "text",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errormessage: "Passwords don't match!",
      validate: (value) => value === values.password,
    },
  ];

  const idsForLogin = [1, 2];

  const filteredFormInfo =
    type === "login"
      ? formInfo.filter((form) => idsForLogin.includes(form.id))
      : formInfo;

  return (
    <>
      <Components.Form>
        {filteredFormInfo.map((formInfo) => (
          <FormInput
            key={formInfo.id}
            {...formInfo}
            value={values[formInfo.name]}
            onChange={onChange}
            // required
          />
        ))}
        <Components.Button onClick={sendData} style={{ marginBottom: "70px" }}>
          {type === "login" ? "Login" : "Sign Up"}
        </Components.Button>
      </Components.Form>
    </>
  );
}

export default RegisterForm;
