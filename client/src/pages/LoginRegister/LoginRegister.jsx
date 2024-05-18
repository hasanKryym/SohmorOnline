import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import { useState } from "react";
import { useUser } from "../../context/User/UserContext";
import { login, register } from "../../services/userService";
import { useNotification } from "../../context/Notification/NotificationContext";
import { notificationTypes } from "../../context/Notification/notificationEnum";
import UserPositions from "../../enum/userEnum/userPositionsEnum";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Navbar from "../../components/Navbar/Navbar";
import { normalizeString } from "../../utils/stringUtils";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, updateUserData } = useUser();
  const { addNotification, load, hideLoader } = useNotification();

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

  let { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    email = normalizeString(email);
    password = normalizeString(password);

    if (!email || !password) {
      addNotification(
        notificationTypes.INFO,
        "please provide the email and the password"
      );
      return;
    }
    load();
    const response = await login({ email, password });
    if (response.success) {
      localStorage.setItem("token", response.token);
      setUser((prevUser) => ({
        ...prevUser,
        status: {
          isLoggedIn: true,
          token: response.token,
        },
        data: response.user,
      }));
      hideLoader();
      if (response.user.role.position === UserPositions.SHOP_ADMIN) {
        navigate("/shops/adminPanel/dashboard");
      } else if (response.user.role.position === UserPositions.SITE_ADMIN)
        navigate("/siteAdmin/adminPanel/dashboard");
      else navigate("/");
    } else {
      addNotification(notificationTypes.ERROR, response.message);
    }
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

              <PasswordInput
                name={"password"}
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
  const navigate = useNavigate();
  const { user, setUser, updateUserData } = useUser();
  const { addNotification, load, hideLoader } = useNotification();
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

    const userData = {
      name: normalizeString(formData.username),
      email: normalizeString(formData.email),
      password: normalizeString(formData.password),
      address: normalizeString(formData.address),
      number: normalizeString(formData.phoneNumber),
    };

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.address ||
      !userData.number
    ) {
      addNotification(notificationTypes.INFO, "please fill all the fields");
      return;
    }

    load();

    const response = await register(userData);
    if (response.success) {
      localStorage.setItem("token", response.token);
      setUser((prevUser) => ({
        ...prevUser,
        status: {
          isLoggedIn: true,
          token: response.token,
        },
        data: response.user,
      }));
      hideLoader();
      navigate("/");
    } else {
      addNotification(notificationTypes.ERROR, response.message);
    }
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
              type="email"
              name="email"
              className="custom-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordInput
              name={"password"}
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
