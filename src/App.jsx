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
                value={loginData.email}
                onChange={(e) =>
                    setLoginData({
                    ...loginData,
                    email: e.target.value
                })
                }
/>

            <label>Password</label>

            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                    setLoginData({
                    ...loginData,
                    password: e.target.value
                })
                }
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

            <button className="submit-btn">
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


            <label>Confirm Password</label>
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

<label>
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