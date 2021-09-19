import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // const { email, password } = credentials;

  const { showAlert } = props;

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5500/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      // TODO: Save auth token and redirect
      localStorage.setItem("token", json.authtoken);
      showAlert("Logged in Successfully!", "success");
      history.push("/");
    } else {
      showAlert("Invalid Credentials!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log("onChange working", credentials);
  };

  return (
    <div className="container mt-3" style={{ width: "60%" }}>
      <h1 className="my-3">Login to continue to iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            required={true}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            required={true}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
