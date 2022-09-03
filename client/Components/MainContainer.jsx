
import React, { useState, useEffect } from "react";

import DropDownList from "./DropDownList";

const MainContainer = () => {
    //main container will store the state of the drop down list and the state of the restaurant container which contains a list of the restaurants
  const [city, setCity] = useState('new york')
  /**
   * List of city hooks
   */
  const [cities, setCities] = useState(['New York', 'Toronto', 'Omaha']);
    //each object will contain key value pair of the city and an array of restaurants
  const [restaurants, setRestaurants] = useState({})
  useEffect(() => {
    try {
        (fetchCity = async () => {
          const response = await fetch(`/api/?city=${city}`)
          const cityData = await response.json()
          setRestaurants(cityData);
        })();
    } catch (error) {
        console.log('City not Found!', error)
    }
    
  }, [])
  return (
    <div>

      <div>MainContainer {city}</div>
    <div className="citySearch">
        <DropDownList setCity={setCity} city ={city} />

    </div>
    <div className="restaurantContainer"></div>
    </div>

  )
}

export default MainContainer

// {cityName: [{restaurantName: 'TAO', votes: 5, cuisine: 'Chinese'}, {restaurantName: 'restaurant2', rating: 4, cuisine: 'Thai'}]}
/**
 * //Action body from front end to upvote or down vote restaurant
 * const { resto_id, action } = req.body;
 * CREATE TABLE resto (
  resto_id SERIAL PRIMARY KEY,
  restoName VARCHAR(50),
  address VARCHAR(50),
  city VARCHAR(50),
  foodType VARCHAR(50),
  link VARCHAR(300),
  votes INTEGER
);
 * 
 */