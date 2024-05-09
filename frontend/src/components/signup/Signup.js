import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/context";

function Signup() {
  const navigate = useNavigate();
  const { postsContext, setPostsContext } = useContext(ThemeContext);

  const [allErrors, setAllErrors] = useState({});

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // creating a schema for form validation by Yup library --->
  const userSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().required("email is required").email("Invalid format"),
    password: Yup.string()
      .required("password is required")
      .min(5, "length must be of 5 characters"),
  });

  // function for for validation --->
  const check = async () => {
    let result = false;
    setAllErrors({});

    try {
      await userSchema.validate(credentials, { abortEarly: false });
      result = true;
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setAllErrors(errors);
    }
    return result;
  };

  // function for logging in with user details -------------------
  const handleManualLogin = async (e) => {
    let result = await check();

    e.preventDefault();
    if (result) {
      try {
        document.getElementById("qwerty").reset();
        const { name, email, password, pnumber } = credentials;

        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, pnumber, result }),
        });
        const json = await response.json();
        if (json.success) {
          localStorage.setItem("user", JSON.stringify(json));
          navigate("/");
          setPostsContext([...postsContext, json.user.posts])
        }
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" container " style={{ marginTop: "60px", padding: "10%" }}>
      <form id="qwerty">
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
          />
        </div>
        {allErrors.name && <div>{allErrors.name}</div>}

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            // type="password"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
        {allErrors.email && <div>{allErrors.email}</div>}

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            // type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
          />
        </div>
        {allErrors.password && <div>{allErrors.password}</div>}

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleManualLogin}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
