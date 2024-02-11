import { Link } from "react-router-dom";
import "./LoginRegister.css";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`logging in, ${email}, ${password}`);
  };

  return (
    <>
      <div className="middle-container">
        <div className="form-container">
          <h2 className="beige textCenter">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                name="email"
                className="custom-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                className="custom-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit" className="custom-button">
                Login
              </button>
            </div>
          </form>
          <p className="beige textCenter">
            Don't have an account?{" "}
            <Link style={{ color: "var(--primaryColor)" }} to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.phoneNumber
    )
      return;
  };

  return (
    <div className="middle-container">
      <div className="form-container">
        <h2 className="beige textCenter">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              name="username"
              className="custom-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              className="custom-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="custom-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              className="custom-input"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              className="custom-input"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <button type="submit" className="custom-button">
              Register
            </button>
          </div>
        </form>
        <p className="beige textCenter">
          Already have an account?{" "}
          <Link style={{ color: "var(--primaryColor)" }} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login, Register };
