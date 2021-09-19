import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert/Alert";
import Login from "../src/components/Login/Login";
import SignUp from "../src/components/SignUp/SignUp";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <SignUp showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
