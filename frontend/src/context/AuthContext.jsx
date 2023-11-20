import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch("api/user", {
      method: "GET"
    }).then((response) => {
      if (response.status == 200) {
        try {
          return response.json();
        } catch (error) {
          return null;
        }
      } else {
        return null
      }
    }).then ((u) => {
      if (u) {
        setUser({
          id: u._id,
          name: u.name + " " + u.surname,
          role: u.role,
        });
      } else {
        setUser(null);
      }
    }).catch((error) => {
      console.log(error);
    })

    setLoaded(true);
  }, []);

  async function login(email, password) {
    return new Promise((resolve, reject) => {
      // Make API call for login
      fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse JSON response
          } else {
            return response.text(); // Get text response
          }
        })
        .then((data) => {
          let messages = [];

          if (Array.isArray(data.errors)) {
            const errorMessages = data.errors.map((error) => error.msg);
            messages = errorMessages;
          } else if (data.message || data.error) {
            const messageArray = [data.message, data.error].filter(Boolean);
            messages = messageArray;
          }

          if (data.user) {
            const u = data.user;
            setUser({
              id: u._id,
              name: u.name + " " + u.surname,
              role: u.role,
            });
            //console.log(u._id);

            let closeLoginButton = document.querySelector("#closeLoginButton");
            closeLoginButton.click();
          }

          resolve(messages);
        })
        .catch((error) => {
          console.error("ERR:", error);
          reject(["An error occurred."]);
        });
    });
  }

  async function register(name, surname, password, email) {
    return new Promise((resolve, reject) => {
      // Make API call for login
      fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          surname: surname,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            resolve(["Zarejestrowano. Teraz możesz się zalogować"]);
          }

          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse JSON response
          } else {
            return response.text(); // Get text response
          }
        })
        .then((data) => {
          let messages = [];

          if (Array.isArray(data.errors)) {
            const errorMessages = data.errors.map((error) => error.msg);
            messages = errorMessages;
          } else if (data.message || data.error) {
            const messageArray = [data.message, data.error].filter(Boolean);
            messages = messageArray;
          }

          /*if (data.user) {
            const u = data.user;
            setUser({ id: u._id, name: u.name + " " + u.surname, role: 'USER' });
            
            let closeLoginButton = document.querySelector('#closeLoginButton');
            closeLoginButton.click(); 
          }*/

          resolve(messages);
        })
        .catch((error) => {
          console.error("ERR:", error);
          reject(["An error occurred."]);
        });
    });
  }

  async function logout() {
    return new Promise((resolve, reject) => {
      fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            setUser(null);
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          console.error("ERR:", error);
        });
    });
  }

  const value = {
    isLoaded,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
