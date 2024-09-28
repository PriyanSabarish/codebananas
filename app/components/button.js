

'use client'
import React, { useEffect } from 'react';

const CustomButton = ({ backgroundColor, textColor, borderRadius, height, width, padd, fontSize, handleClick, children }) => {
  useEffect(() => {
    // This effect will run only on the client-side
    // console.log('Component mounted on client-side');
    // return () => {
    //   console.log('Component will unmount on client-side');
    // };
  }, []); // Empty dependency array means it runs once on mount and cleans up on unmount

  const buttonStyle = {
    backgroundColor: backgroundColor || 'blue',
    color: textColor || 'white',
    borderRadius: borderRadius || '2px',
    height: height || '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: padd || '0 20px',
    border: 'none',
    cursor: 'pointer',
    width: width || '100%',
    fontSize: fontSize || '16px',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>  {/* handleClick here */}
      {children}
    </button>
  );
};

export default CustomButton;

