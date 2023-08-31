import React, {useState,useContext} from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../UserContext";
import "./SignUpLogin.css"
import axios from "axios"

const SignUp = () => {
  const {username,id,setUsername,setId}=useContext(UserContext)
  const [signupLogin,setsignupLogin]=useState("login")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  async function handleSignupSignin(payload) {
    try {
      const response = await axios.post(`http://localhost:5000/${signupLogin}`, payload);
      if (response.status===200 &&
        response.data !== "Registered successfully"
      ) {
        console.log(response.data);
        setId(response.data.id)
      }
    } catch (error) {
   console.log(error.message)
    }
  }
  const handleRegistration = (data) => {
    handleSignupSignin(data)
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };
  const registerOptions = {
    userName: { required: "UserName is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center registration-form">
      {signupLogin === "signup" && <h4 className="register-h4 mb-3">SignUp</h4>}
      {signupLogin === "login" && <h4 className="register-h4 mb-3">Login</h4>}
      <Form
        className="d-flex flex-column text-dark justify-content-center align-items-center"
        onSubmit={handleSubmit(handleRegistration, handleError)}
      >
        <Form.Group controlId="username" className="mb-3">
          <Form.Control
            className="form-input"
            type="text"
            name="userName"
            placeholder="Username"
            {...register("userName", registerOptions.username)}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="errorMsg">username is required.</p>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Control
            className="form-input"
            type="password"
            name="password"
            placeholder="*********"
            {...register("password", registerOptions.password)}
          />
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">min of 8 character is required.</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is required.</p>
          )}
        </Form.Group>
        {signupLogin === "signup" && (
          <Button
            className="register-button mb-3"
            variant="primary"
            type="submit"
          >
            SignUp
          </Button>
        )}
        {signupLogin === "signup" && (
          <div className="mb-3">
            Already Registered{" "}
            <span
              onClick={() => setsignupLogin("login")}
              className="signup-teaser px-3"
            >
              Login
            </span>
          </div>
        )}
        {signupLogin === "login" && (
          <Button
            className="register-button mb-3"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        )}
        {signupLogin === "login" && (
          <div className="mb-3">
            Dont have an account{" "}
            <span
              onClick={() => setsignupLogin("signup")}
              className="signup-teaser px-3"
            >
              Signup
            </span>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SignUp;
