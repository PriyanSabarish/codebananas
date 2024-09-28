"use client";
import React, { useState } from "react";
import "./signup.css";
import CustomButton from "D:/codebanana/codebananas/app/components/button.js";
import Link from "next/link";
import { signIn } from "next-auth/react";

function SignUpWithEmail() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsondata = JSON.stringify(formData);
      const res = await fetch('../api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        // Destructure email and password from formData
        const { email, password } = formData;
        console.log(email, password)
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: email, // Use email from formData
          password: password, // Use password from formData
          callbackUrl: '/home'
        });
        console.log("Successful login, ", signInResult);
        
        if (signInResult.error) {
          console.log('Sign in error:', signInResult.error);
        } else {
          window.location.href = signInResult.url || '/home';
        }
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log('Error registering user:', error);
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
      <div className="signin">Sign up with your email</div>
      <form onSubmit={handleFormSubmit} className="credentials">
        <div className="inputboxes">
          <div className="emailbox">
            <input
              className="input" type="text" placeholder="Enter your full name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="emailbox">
            <input
              className="input" type="text" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <input
            className="input" type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange}/>
        </div>

        <div className="yellowbutton1">
          <CustomButton
            backgroundColor="#CFB111"
            textColor="#323232"
            borderRadius="6px"
            height="50px"
            fontSize="1.2rem"
            onClick={() => {}}
          >
            <div className="buttonfont1">Sign up</div>
          </CustomButton>
        </div>
      </form>
      <Link href="/auth/signin">
        <div className="subtext2">
          Already have an account? Click here to sign in
        </div>
      </Link>
    </div>
  );
}

export default SignUpWithEmail;
