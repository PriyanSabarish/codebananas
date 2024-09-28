'use client'
import React, { useEffect } from 'react';
import './inputbox.css'
function CustomInput({InputType,InputText,OnChange} ) {

    useEffect(() => {
        // This effect will run only on the client-side
        console.log('Component mounted on client-side');
        return () => {
          console.log('Component will unmount on client-side');
        };
      }, []); // Empty dependency array means it runs once on mount and cleans up on unmount


        return (
            <div>
                
                <input type={InputType} name="text" class="input" placeholder={InputText} onChange={OnChange}>
                </input>

            </div>
          )

  
}

export default CustomInput