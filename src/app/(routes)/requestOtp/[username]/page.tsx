"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import "./requestOtp.css";
import { useParams, useRouter } from "next/navigation";

const RequestOtp: React.FC = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const params = useParams();
  const username = params.username as string;

  const handleOtpValidation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/auth/requestOtp/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, otp }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        router.push(`/reset/${data.user.id}`);
      } else {
        alert(data.message || "Failed to reset password.");
      }
    } catch (error) {}
    console.log("Validating OTP:", otp);
  };

  const handleOtpInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  return (
    <div>
      <h1>Request Password Email OTP Form</h1>
      <form className="otpValidationForm" onSubmit={handleOtpValidation}>
        <label>OTP Validate*</label>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpInputChange}
        />
        <p>Validate your OTP and reset your password</p>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default RequestOtp;
