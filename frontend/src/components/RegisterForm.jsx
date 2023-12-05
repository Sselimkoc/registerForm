// RegisterForm.jsx
import React, { useState } from "react";
import FormInput from "./FormInput";
import * as Components from "../assets/MenuComponents.jsx";

function RegisterForm(props) {
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validate, setValidate] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const formInfo = [
    {
      id: 0,
      name: "fullName",
      type: "text",
      placeholder: "Name and Surname",
      label: "Full Name",
      pattern: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
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
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/,
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
  console.log("props", values);
  const idsForLogin = [1, 2];

  const filteredFormInfo =
    props.type === "login"
      ? formInfo.filter((form) => idsForLogin.includes(form.id))
      : formInfo;

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const logInfo = filteredFormInfo.map((formField) => ({
    [formField.name]: values[formField.name],
  }));
  console.log("validate", validate);
  return (
    <Components.Form>
      {filteredFormInfo.map((formInfo) => (
        <FormInput
          key={formInfo.id}
          {...formInfo}
          value={values[formInfo.name]}
          onChange={onChange}
          required
        />
      ))}
    </Components.Form>
  );
}

export default RegisterForm;
