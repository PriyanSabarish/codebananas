"use client";
import React, { useState } from "react";
import "./signmail.css";
import CustomButton from "D:/codebanana/codebananas/app/components/button.js";
import Link from "next/link";
import CustomInput from "@/app/components/inputbox/inputbox";
import { signIn } from "next-auth/react";

function SignInWithEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: '/home'
    });
    console.log("successful loginn, ", result)
    if (result.error) {
      console.log('Sign in error:', result.error);
    }
    else{
      window.location.href = result.url || '/home';
    }
  };

  return (
    <div className="thecenterbox">
      <div className="toptexts">
        <div className="codebananas1">
          Code<span id="bananas">bananas</span>
        </div>
      </div>
      <div className="subtext1">
        Login or register to start building your projects today.
      </div>
      <div className="signin">Sign in with your email</div>
      <form onSubmit={handleFormSubmit} className="credentials">
        <div className="inputboxes">
          <div className="emailbox">
            <input
            className="input"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
          className="input"
          type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="yellowbutton1">
          <CustomButton
            backgroundColor="#CFB111"
            textColor="#323232"
            borderRadius="6px"
            height="50px"
            fontSize="1.2rem"
            type="submit"
          >
            <div className="buttonfont1">Sign in</div>
          </CustomButton>
        </div>
      </form>
      <Link href="/auth/signup">
        <div className="subtext2">
          Don’t have an account? Click here to register
        </div>
      </Link>
    </div>
  );
}

export default SignInWithEmail;
