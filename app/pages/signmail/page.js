"use client"
import React from 'react'
import "./signmail.css"
import CustomButton from "D:/codebanana/codebananas/app/components/button.js";
import Link from 'next/link';
import CustomInput from '@/app/components/inputbox/inputbox';
function SiginWithEmail() {
  return (
    <div className="thecenterbox">
    <div className="toptexts">
     <div className="codebananas1">Code<span id="bananas">bananas</span></div></div>
     <div className="subtext1">Login or register to start building your projects today.</div>
     <div className='signin'>Sign in with your email</div>
     
     <div className='inputboxes'>
      <div className="emailbox"><CustomInput  InputType="text" InputText="Enter your email"/></div>
      <CustomInput InputType="password" InputText="Enter your password"/>
    </div>
     
     
     <div  className ="yellowbutton1">
     <Link href="/pages/signmail">
     <CustomButton
     backgroundColor="#CFB111"
     textColor="#323232"
     borderRadius="6px"
     height="50px"
     fontSize= '1.2rem'
     onClick={()=>{}}
   >
     <div className="buttonfont1">Sign in</div>
   </CustomButton>
   </Link>
   </div>
   <Link href="/pages/signup"><div className="subtext2">Don’t have an account? Click here to register</div></Link>

   </div>
  )
}

export default SiginWithEmail