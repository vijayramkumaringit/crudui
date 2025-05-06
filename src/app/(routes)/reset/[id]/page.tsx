"use client";

import React, { useState } from "react";
import "./reset.css";
import { useRouter, useParams } from "next/navigation";

const ResetPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!newPassword) {
      return alert("Password cannot be empty");
    }

    if (!passwordRegex.test(newPassword)) {
      setError("Password does not meet the requirement");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/auth/reset/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully.");
        router.push("/Login");
      } else {
        alert(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="resetPage">
      <h1>Reset Password</h1>
      <form className="resetPageForm" onSubmit={handleResetPassword}>
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <div>
          <button type="submit">Reset</button>
        </div>

        {error && (
          <p style={{ color: "red" }}>
            {error}
            <span style={{ color: "black" }}>
              . Password must be 8-20 characters, include uppercase, lowercase,
              number, and special character.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPage;
