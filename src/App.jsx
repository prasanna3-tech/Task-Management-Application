import './App.css';
import { useState } from "react";

function App() {

  const [users, setUsers] = useState([]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

const [signupErrors, setSignupErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const [showSignupError, setShowSignupError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
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
        

    }

     setLoginErrors(errors);

     setShowError({
     email: errors.email !== "",
     password: errors.password !== ""
    });

   if (
    errors.email === "" &&
    errors.password === ""
) {

    const matchedUser = users.find(user =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (matchedUser) {

        setIsAuthenticated(true);

        setLoginData({
            email: "",
            password: ""
        });

        setShowPassword(false);

    } else {

       setLoginErrors({
    ...errors,
    password: "Invalid Email or Password"
});

setShowError({
    email: false,
    password: true
});

    }

}

     

}

function handleSignup() {

    const errors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    // Name Validation
    if (signupData.name.trim() === "") {

        errors.name = "Name is required";

    }

    // Email Validation
    if (signupData.email.trim() === "") {

        errors.email = "Email is required";

    } else if (!signupData.email.includes("@")) {

        errors.email = "Invalid Email";

    }

    // Password Validation
    if (signupData.password.trim() === "") {

        errors.password = "Password is required";

    } else if (signupData.password.length < 8) {

        errors.password = "Password too short";

    }

    // Confirm Password Validation
    if (signupData.confirmPassword.trim() === "") {

        errors.confirmPassword = "Confirm Password is required";

    } else if (
        signupData.password !== signupData.confirmPassword
    ) {

        errors.confirmPassword = "Passwords do not match";

    }

    setSignupErrors(errors);
   
    setShowSignupError({
    name: errors.name !== "",
    email: errors.email !== "",
    password: errors.password !== "",
    confirmPassword: errors.confirmPassword !== ""
});

if (
    errors.name === "" &&
    errors.email === "" &&
    errors.password === "" &&
    errors.confirmPassword === ""
) {
   setUsers(previousUsers => [
    ...previousUsers,
    {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
    }
]);
   setSignupData({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});
setShowSignupPasswords(false);
setMode("login");
}



}

function handleCreateBoard() {

    if (createBoardData.title.trim() === "") {

        setBoardNameError("Board name is required.");

        return;
    }


    const newBoardId = Date.now();


    const newBoard = {
        id: newBoardId,

        title: createBoardData.title,

        description: createBoardData.description,

        background: createBoardData.background
    };


    setBoards([
        ...boards,
        newBoard
    ]);


    setSelectedBoardId(newBoardId);


    setShowCreateBoardModal(false);


    setCreateBoardData({
        title: "",
        description: "",
        background: ""
    });


    setBoardNameError("");

}

const [boards, setBoards] = useState([
    {
        id: 1,
        title: "Project Task Management",
        description: "",
        background: ""
    }
]);

const [selectedBoardId, setSelectedBoardId] = useState(1);

const selectedBoard = boards.find(
    board => board.id === selectedBoardId
);

const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

const [createBoardData, setCreateBoardData] = useState({

    title: "",
    description: "",
    background: ""

});


const [boardNameError, setBoardNameError] = useState("");

//console.log(showCreateBoardModal);
//console.log(createBoardData);

return (
    <>
        {!isAuthenticated ? (

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

            <input  type="email"  placeholder="Enter your email"
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
   value={
            showSignupError.name
                ? signupErrors.name
                : signupData.name
        }
    onChange={(e) =>
        setSignupData({
            ...signupData,
            name: e.target.value
        })
    }
    onFocus={() => {
    if (showSignupError.name) {
        setShowSignupError({
            ...showSignupError,
            name: false
        });
    }
}}
/>

            <label>Email</label>

            <input
    type="email"
    placeholder="Enter your email"
    value={
        showSignupError.email
            ? signupErrors.email
            : signupData.email
    }
    onChange={(e) =>
        setSignupData({
            ...signupData,
            email: e.target.value
        })
    }
    onFocus={() => {
    if (showSignupError.email) {
        setShowSignupError({
            ...showSignupError,
            email: false
        });
    }
}}
/>

            <label>Password</label>

         <input
      type={
                showSignupError.password
                    ? "text"
                    : showSignupPasswords
                        ? "text"
                        : "password"
            }
    placeholder="Enter your password"
    value={
        showSignupError.password
            ? signupErrors.password
            : signupData.password
    }
    onChange={(e) =>
        setSignupData({
            ...signupData,
            password: e.target.value
        })
    }
    onFocus={() => {
    if (showSignupError.password) {
        setShowSignupError({
            ...showSignupError,
            password: false
        });
    }
}}
   
/>


            <label >Confirm Password</label>
<input

    type={
                showSignupError.confirmPassword
                    ? "text"
                    : showSignupPasswords
                        ? "text"
                        : "password"
            }

    placeholder="Confirm your password"
   value={
    showSignupError.confirmPassword
        ? signupErrors.confirmPassword
        : signupData.confirmPassword
}
    onChange={(e) =>
        setSignupData({
            ...signupData,
             confirmPassword: e.target.value
        })
    }
    onFocus={() => {
    if (showSignupError.confirmPassword) {
        setShowSignupError({
            ...showSignupError,
            confirmPassword: false
        });
    }
}}
   
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


            <button className="submit-btn" onClick={handleSignup}>
                Sign Up
            </button>

        </>

    )}

</div>

            </div>

        </div>

        ) : (

            <div className="board-page">

            <header className="top-nav">

                <div className="logo">
                    Logo
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                />

            <button
                className="create-btn"
                onClick={() => {
                    setShowCreateBoardModal(true);
                }}
                  >
                Create
            </button>

                <button className="notification-btn">
                    🔔
                </button>

                <button className="profile-btn">
                    👤
                </button>

            </header>


        <main className="board-workspace">

            <div className="board-header">

                <h2>
                    {selectedBoard.title}
                </h2>

                <button className="board-menu-btn">
                    ⋯
                </button>

            </div>


            <div className="lists-container">

                <div className="list">
                    <h3># List 1</h3>
                </div>

                <div className="list">
                    <h3># List 2</h3>
                </div>

                <button className="add-list-btn">
                    + Add Another List
                </button>

            </div>


            <button className="switch-board-btn">
                Switch Boards
            </button>

    </main>

    {
    showCreateBoardModal && (

        <div className="modal-overlay">

            <div className="create-board-modal">

                <h2>Create Board</h2>

                <label>
                    Board Name *
                </label>

                <input
                type="text"

                placeholder="Enter board name"

                value={
                boardNameError
                    ? boardNameError
                    : createBoardData.title
                 }

                 onFocus={() => {

                    if (boardNameError !== "") {
                        setBoardNameError("");
                    }
                }}
                 
                onChange={(e) => {
                    setCreateBoardData({
                        ...createBoardData,
                        title: e.target.value
                    });
                }}
                
                />

                <label>
                    Description
                </label>

                <textarea
                    placeholder="Enter description"
                    value={createBoardData.description}
                    onChange={(e) => {
                        setCreateBoardData({
                            ...createBoardData,
                            description: e.target.value
                        });
                    }}
                />

                <label>
                    Background
                </label>

               <select
                    value={createBoardData.background}
                    onChange={(e) => {
                        setCreateBoardData({
                            ...createBoardData,
                            background: e.target.value
                        });
                    }}
                >
    <option value="">
        Select Background
    </option>

    <option value="Blue">
        Blue
    </option>

    <option value="Green">
        Green
    </option>

    <option value="Purple">
        Purple
    </option>

    <option value="Gray">
        Gray
    </option>
</select>

                <div className="modal-actions">

                    <button
                         onClick={handleCreateBoard}
                    >
                        Create
                    </button>

                    <button>
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    )
}

        </div>  

        )}
    </>
);

}

export default App;
