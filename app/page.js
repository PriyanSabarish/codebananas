"use client"
import CustomButton from "./components/button";
import "./main.css"
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from "next/dist/server/api-utils";

export default function Home() {


  return (
      <div className="thecenterbox">
       <div className="toptext">
        <div className="signtext">Sign in to</div>
        <div className="codebananas">Code<span id="bananas">bananas</span></div></div>
        <div className="subtext">Login or register to start building your projects today.</div>
        <div  className ="yellowbutton">
        <Link href="/auth/signin"> 
        <CustomButton
        backgroundColor="#CFB111"
        textColor="#323232"
        borderRadius="6px"
        height="60px"
        fontSize= '1.2rem'
        onclick={() =>{}}
      >
        <div className="buttonfont">Sign in with email</div>
      </CustomButton>
      </Link> 
      </div>

      <div className="providers">
      <CustomButton
        backgroundColor="#1E1E1E"
        textColor="white"
        borderRadius="6px"
        height="52px"
        width="48%"
        fontSize= '0.8rem'
        onclick={() => alert('Button clicked')}
      >
        Sign in with GitHub
      </CustomButton>
      <CustomButton
        backgroundColor="#1E1E1E"
        textColor="white"
        borderRadius="6px"
        height="52px"
        width="45%"
        fontSize= '0.8rem'
        onclick={async () => await signIn("google",{callbackUrl: '/home'})}
      >
        Sign in with Google
      </CustomButton>
      </div>
      </div>
  );
}
