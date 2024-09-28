"use client"; 
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import CustomButton from '@/app/components/button';
import './home.css'
function HomePage() {
  const { data: session } = useSession();
  console.log(session);
  const handleButtonClick = () => {
    signOut({ callbackUrl: '/' })
  };

  return (
    <div className='nav'>
          <div className="codebananas-main">Code<span id="bananas">bananas</span></div>
      <div className='username'>{session ? (
        <span >{session.user.name}</span>
      ) : (
        <span> Not signed in!</span>
      )}</div>

      <CustomButton
        backgroundColor="#CFB111"
        textColor="#323232"
        borderRadius="6px"
        height="2.8rem"
        fontSize="1.2rem"
        width= "10rem"
        handleClick={handleButtonClick}  
      >
        <div className="buttonfont">Sign out</div>
      </CustomButton>
    </div>
  );
}

export default HomePage;
