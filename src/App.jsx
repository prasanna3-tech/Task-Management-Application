import './App.css';
import { useState } from "react";

function App() {

  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  
  const [showSignupPasswords, setShowSignupPasswords] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
});

const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: ""
});

const [showError, setShowError] = useState({
    email: false,
    password: false
});

function handleLogin() {

    const errors = {
        email: "",
        password: ""
    };

    // Email Validation
    if (loginData.email.trim() === "") {

        errors.email = "Email is required";
        console.log("email error")

    } else if (!loginData.email.includes("@")) {

        errors.email = "Invalid Email";
        console.log("@ missing")

    }

    // Password Validation
    if (loginData.password.trim() === "") {

        errors.password = "Password is required";
         console.log("password error")

    } else if (loginData.password.length < 8) {

        errors.password = "Password too short";
        console.log("less than 8")

    }

    setLoginErrors(errors);

   if (errors.email === "" && errors.password === "") { alert("Login Successful!"); }

   setShowError({
    email: errors.email !== "",
    password: errors.password !== ""
   });

   console.log(showError);

}

    return (
        <div className="container">

            <div className="card">

                <div className="tabs">

                    <button className={mode === "login" ? "active-tab" : ""} onClick={() => setMode("login")}>
                        Login
                    </button>

                    <button className={mode === "signup" ? "active-tab" : ""} onClick={() => setMode("signup")}>
                        Sign Up
                    </button>

                </div>

                <div className="form">

    {mode === "login" ? (

        <>
            <label>Email</label>

            <input
                type="email"
                placeholder="Enter your email"
                value={
                        showError.email? loginErrors.email: loginData.email
                    }
                onChange={(e) =>
                    setLoginData({
                    ...loginData,
                    email: e.target.value
                })
                }
                onFocus={() => {
                    if (showError.email) {
                        setShowError({
                            ...showError,
                            email: false
                        });
                    }
                }}
/>

            <label>Password</label>

            <input
                type={
                showError.password
                    ? "text"
                    : showPassword
                        ? "text"
                        : "password"
            }
                placeholder="Enter your password"
                value={
                     showError.password ? loginErrors.password : loginData.password
                }
                onChange={(e) =>
                    setLoginData({
                    ...loginData,
                    password: e.target.value
                })
                }
                onFocus={() => {
                    if (showError.password) {
                        setShowError({
                            ...showError,
                            password: false
                        });
                    }
                }}
            />

            <div className="options">

                <label>
                   <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Show
                </label>

                <span>
                    Forgot Password?
                </span>

            </div>

            <button className="submit-btn"  onClick={handleLogin}>
                Login
            </button>

        </>

    ) : (

        <>
            <label>Name</label>

           <input
    type="text"
    placeholder="Enter your name"
    value={signupData.name}
    onChange={(e) =>
        setSignupData({
            ...signupData,
            name: e.target.value
        })
    }
/>

            <label>Email</label>

            <input
    type="email"
    placeholder="Enter your email"
    value={signupData.email}
    onChange={(e) =>
        setSignupData({
            ...signupData,
            email: e.target.value
        })
    }
/>

            <label>Password</label>

         <input
   type={showSignupPasswords ? "text" : "password"}
    placeholder="Enter your password"
    value={signupData.password}
    onChange={(e) =>
        setSignupData({
            ...signupData,
            password: e.target.value
        })
    }
   
/>


            <label >Confirm Password</label>
<input
    type={showSignupPasswords ? "text" : "password"}
    placeholder="Confirm your password"
    value={signupData.confirmPassword}
    onChange={(e) =>
        setSignupData({
            ...signupData,
             confirmPassword: e.target.value
        })
    }
   
/>

<label className="show-password-label">
    <input
        type="checkbox"
        checked={showSignupPasswords}
        onChange={() =>
            setShowSignupPasswords(!showSignupPasswords)
        }
    />
    Show Passwords
</label>


            <button className="submit-btn">
                Sign Up
            </button>

        </>

    )}

</div>

            </div>

        </div>
    );
}

export default App;