import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFormData = (initialValues, apiEndpoint, setLogin) => {
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleErrors = (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          // Bad Request
        case 401:
          // Unauthorized
        case 404:
          // Not Found
        case 500:
          // Internal Server Error
          alert(error.response.data.Message);
          break;
      }
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const sendData = async () => {
    try {
      const response = await axios.post(apiEndpoint, values);

      if (response.data.Message === "SuccessLog") {
        navigate("/home");
      } else if (response.data.Message === "SuccessSign") {
        setLogin(true);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      handleErrors(error);
    }
  };

  return { values, onChange, sendData };
};

export default useFormData;
