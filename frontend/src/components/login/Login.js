import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
function Login() {

   const navigate = useNavigate();
  const { postsContext, setPostsContext } = useContext(ThemeContext);

   const [allErrors, setAllErrors] = useState({});
   const [credentials, setCredentials] = useState({
     email: "",
     password: "",
   });

   // function for capturing the input values ------------------------
   const handleChange = (e) => {
     setCredentials({ ...credentials, [e.target.name]: e.target.value });
   };

 

   // creating a schema for form validation by Yup library --->
   const userSchema = Yup.object({
     email: Yup.string().required("email is required").email("Invalid format"),
     password: Yup.string()
       .required("password is required")
       .min(5, "must be of 5 characters"),
   });

   // function for user data validation --->
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
    e.preventDefault();
    let result = await check();
    if (result) {
      const { email, password } = credentials;
      
       try {
        document.getElementById("qwerty").reset();
         
         setCredentials({})
         const response = await fetch("http://localhost:5000/login", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ email, password }),
         });

         const json = await response.json();
         console.log(json);
         localStorage.setItem("user", JSON.stringify(json));
setPostsContext(json.user.posts)
         if (json.success) {
           navigate("/");
         } else {
           navigate("/login");
         }
       } catch (error) {
         console.log(error);
        }
       
     }
   };




  return (
    <div className=" container  " style={{ marginTop: "60px", padding: "10%" }}>
      <form id="qwerty">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {allErrors.email && <div>{allErrors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
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

export default Login
