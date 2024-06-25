"use client"
import CustomButton from "./components/button";
import "./home.css"
import Link from 'next/link';
export default function Home() {

  return (
      <div className="thecenterbox">
       <div className="toptext">
        <div className="signtext">Sign in to</div>
        <div className="codebananas">Code<span id="bananas">bananas</span></div></div>
        <div className="subtext">Login or register to start building your projects today.</div>
        <div  className ="yellowbutton">
        <Link href="/pages/signmail">
        <CustomButton
        backgroundColor="#CFB111"
        textColor="#323232"
        borderRadius="6px"
        height="60px"
        fontSize= '1.2rem'
        onClick={()=>{}}
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
        onClick={() => alert('Button clicked')}
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
        onClick={() => alert('Button clicked')}
      >
        Sign in with Gmail
      </CustomButton>
      </div>
      </div>
  );
}
