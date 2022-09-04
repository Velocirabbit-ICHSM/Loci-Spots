import React, { useState, useEffect } from 'react'
import AddRestaurant from './AddRestaurant';
import Restaurant from './Restaurant'

const RestaurantContainer = (props) => {
    const {city, cityList, setCity} = props;
//* Bring in the list of restaurants and update restaurant container
//* loop through the list of restaurants and for each element make a restaurant div
  const [restaurantList, setRestaurants] = useState({})
  const [restoArray, setRestoArray] = useState([]);
  const [currentVote, setVote] = useState({ resto_id: 0, action: '' });
//Declare a new state for our Add restaurant Modal
  const [showModal, setModal] = useState(false)
  const fetchCity = async () => {
    const response = await fetch(`/api/${city}`)
    const cityData = await response.json()
    // setRestaurants(cityData);
    // console.log(cityData[city], 'in fetchcity')
    const tmpArr = [];
    cityData[city].forEach((el, i) => {
      tmpArr.push(
        <Restaurant setVote={setVote} currentVote={currentVote} key={i} restoObj={el} />
      )
    });
    setRestoArray(tmpArr);
  }  
 useEffect(() => {
    // console.log('in use effect,', city)
    try {

        fetchCity();
    } catch (error) {
        console.log('City not Found!', error)
    }
    
 }, [city])
  useEffect(() => {
    try {
      const updateVotes = async () => {
        // console.log(currentVote);
        // console.log('in update votes');
        const { resto_id, action } = currentVote;
        const response = await fetch('/api/',
          {
            method: 'PATCH',
            body: JSON.stringify({ resto_id, action }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          fetchCity();
        // console.log(response);
      }
      updateVotes();

      //run fetch city to re render
    } catch (error) {
      console.log('Error in updateVotes,', error)
    }
  }, [currentVote])

const handleRestaurantAdd = (e) => {
  setModal(true)
}
  return (
    <div>
      <div className='cityName'>{`${city}`}</div>
      <button type='button' onClick={handleRestaurantAdd}>Add Restaurant</button>
      <div className='restaurant'>{restoArray}</div>
      {showModal && <AddRestaurant cityList={cityList}  showModal={showModal} setModal={setModal} setCity={setCity}/>}
    </div>
  )
}

export default RestaurantContainer


/*
{
    "New York": [
        {
            "resto_id": 7,
            "restoname": "Urban Vegan Kitchen",
            "address": "41 Carmine St",
            "city": "New York",
            "foodtype": "Vegan",
            "link": "https://cheqout.com/menu/order/aa410620-2723-4880-bd50-faa48f02e3a4",
            "votes": 2
        },
        {
            "resto_id": 1,
            "restoname": "Los Tacos No.1",
            "address": "229 W 43rd St",
            "city": "New York",
            "foodtype": "South American",
            "link": "https://www.lostacos1.com/",
            "votes": 0
        },
        {
            "resto_id": 4,
            "restoname": "Cheeky Sandwiches",
            "address": "35 Orchard St",
            "city": "New York",
            "foodtype": "Cheap Eats",
            "link": "http://places.singleplatform.com/cheeky-sandwiches/menu",
            "votes": 0
        },
        {
            "resto_id": 6,
            "restoname": "Keens Steakhouse",
            "address": "72 W 36th St",
            "city": "New York",
            "foodtype": "Steak",
            "link": "https://eat.chownow.com/order/23210/locations/33911?utm_source=google&utm_medium=organic&utm_campaign=place_action",
            "votes": 0
        },
        {
            "resto_id": 8,
            "restoname": "P.S. Kitchen",
            "address": "246 W 48th St",
            "city": "New York",
            "foodtype": "Vegan",
            "link": "https://www.ps-kitchen.com/menu",
            "votes": 0
        },
        {
            "resto_id": 23,
            "restoname": "White Bear",
            "address": "135-02 Roosevelt Ave",
            "city": "New York",
            "foodtype": "Chinese",
            "link": "",
            "votes": 0
        }
    ]
}
*/