import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    status: {
      isLoggedIn: localStorage.getItem("token") ? true : false,
      token: localStorage.getItem("token"),
    },
    data: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {
          _id: "",
          name: "",
          email: "",
          address: "",
          number: "",
          role: {
            position: "user",
            shop: null,
          },
          cart: [],
        },
  });

  // Function to update user data
  // const updateUserData = (newUserData) => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     data: {
  //       ...prevUser.data,
  //       ...newUserData,
  //     },
  //   }));
  // };

  // useEffect(() => {
  //   updateUserData(JSON.parse(localStorage.getItem("user")));
  // }, [user.status.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
