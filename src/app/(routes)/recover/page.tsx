"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./recover.css";

const RecoverPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!username) {
      alert("input field cannot be empty");
    }

    try {
      const res = await fetch("http://localhost:5000/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });

      const data = await res.json();

      if (res.ok && data.user.id) {
        const username = data.user.name;
        alert(data.message || "Check your email for OTP");
        router.push(`/requestOtp/${username}`);
      } else {
        alert(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="recoverPage">
      <form className="recoverPageForm" onSubmit={handleResetPassword}>
        <h1>Password Assistance</h1>
        <p>Enter the email address associated with your account.</p>
        <label>username or email </label>
        <input
          type="text"
          placeholder="enter the email"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <div>
          <button type="submit">continue</button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPage;
