import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { showAlert } = props;

  let history = useHistory();

  const { username, email, password, cpassword } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5500/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password: cpassword === password ? password : null,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      // TODO: Save auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      showAlert("Account created successfully!", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log("onChange working", credentials);
  };

  return (
    <div className="" style={{ width: "55%", margin: "0 auto" }}>
      <h1 className="my-3">Create Account to use iNotebook</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
            required={true}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            required={true}
            minLength={5}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
