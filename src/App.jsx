import './App.css';
import { useState } from "react";
import AuthScreen from "./AuthScreen";
import BoardScreen from "./BoardScreen";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


return (
    <>
        {!isAuthenticated ? (

      <AuthScreen
    setIsAuthenticated={setIsAuthenticated}
/>

        ) : (

          <BoardScreen />

        )}
    </>
);

}

export default App;
