import React, { useState } from 'react';

const DropDownCuisine = (props) => {
    
    const { setCuisine, cuisine, cuisineList } = props;
    
    const cuisineElements = [];
    cuisineList.forEach((cuisine) => {
      cuisineElements.push(
        <option key={`${cuisine}`} value={`${cuisine}`}>{`${cuisine}`}</option>
      );
    });

    const handleChange = (event) => {
        setCuisine(event.target.value);
      };
    

    return (
        <div>
            <label>
                Select a Cuisine: <br></br>
                 <select className='dropdown' onChange={handleChange}>
                    {cuisineElements}
                 </select>
            </label>
        </div>
    )
}
export default DropDownCuisine; 