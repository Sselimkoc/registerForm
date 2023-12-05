const handleErrors = (error) => {
  if (error.response && error.response.status) {
    switch (error.response.status) {
      case 400:
      case 401:
      case 404:
      case 500:
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
