import { useState } from "react";
import "./PasswordInput.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password-input_container">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="custom-input"
        placeholder="Password"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="password_input-eye"
      >
        {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </span>
    </div>
  );
};

export default PasswordInput;
