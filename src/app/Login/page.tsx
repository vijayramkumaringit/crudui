"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./login.css";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/item");
    }
  }, []);

  const handleBlur = (field: string) => {
    if (field === "username" && !username) {
      setInputErrors((prev) => ({ ...prev, username: "username is required" }));
    } else if (field === "password" && !password) {
      setInputErrors((prev) => ({ ...prev, password: "Password is required" }));
    }
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    setInputErrors({ username: "", password: "" });

    if (!username || !password) {
      setErrorMessage("input fields cannot be empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        router.push("/item");
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={submitLoginForm} className="loginFormContainer">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => {
            handleBlur("username");
          }}
        />
        {inputErrors.username && (
          <p className="error-message">{inputErrors.username}</p>
        )}
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            handleBlur("password");
          }}
        />
        <p>
          forget password?{" "}
          <a
            className="registerEl"
            onClick={() => {
              router.push("/recover");
            }}
          >
            click here
          </a>
        </p>
        {inputErrors.password && (
          <p className="error-message">{inputErrors.password}</p>
        )}
        <br />
        <p>
          already registered user, click login. New user{" "}
          <a
            className="registerEl"
            onClick={() => {
              router.push("/register");
            }}
          >
            register here.
          </a>
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="formButtonContainer">
          <button type="submit">Log in</button>
          <button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
