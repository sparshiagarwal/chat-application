import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
//import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={"data:image/jpeg;base64,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"} alt="logo" />
            <h1>wassup</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #FFFFFF;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #A020F0;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #A020F0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #A020F0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #A020F0;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
