import React from "react";
import "./style.js";
import { Label, Input as InputStyled } from "./style";
const Input = (props) => {
  return (
    <div className="input">
      <Label htmlFor={props.id}>{props.label}</Label>
      <InputStyled
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={!!props.required}
        value={props.value}
        autoComplete={"new-password"} //to stop the auto complete
        maxLength={props.maxLength}
        className={props.className}
      />
    </div>
  );
}
export default Input;