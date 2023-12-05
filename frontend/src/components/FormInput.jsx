import React, { useState } from "react";
import * as Components from "../assets/MenuComponents.jsx";

function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { onSubmit, ...userData } = props;
  const handleFocus = () => {
    setFocused(true);
  };

  const isValid =
    props.validate && typeof props.validate === "function"
      ? props.validate(props.value)
      : props.pattern &&
        typeof props.pattern.test === "function" &&
        props.pattern.test(props.value);

  return (
    <div className="formInput">
      <Components.Input
        {...userData}
        onBlur={handleFocus} //tıklayıp gerı farklı bır yere tıkladıgında error mesajı ıcın
        onFocus={() => props.name === "confirmPassword" && setFocused(true)} //tek tıklamayla error mesajı
        focused={focused.toString()}
      />

      <Components.Span show={focused && !isValid}>
        {props.errormessage}
      </Components.Span>
    </div>
  );
}

export default FormInput;
