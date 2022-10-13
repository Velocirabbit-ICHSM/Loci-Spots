import React, { useState } from 'react';

const AddRestaurant = (props) => {
  const { setModal, showModal, cityList, setCity, cuisineList, setCuisine } = props;

  const [restaurantData, setNewRestaurant] = useState({
    name: '',
    address: '',
    city: 'New York',
    foodType: '',
    link: '',
  });

  const handleClose = (e) => {
    setModal(false);
    setCity(restaurantData.city);
    setCuisine(restaurantData.foodtype);
  };
  const cityElements = [];
  cityList.forEach((city) => {
    cityElements.push(<option key={`${city}`} value={`${city}`}>{`${city}`}</option>);
  });

  const cuisineElements = [];
  cuisineList.forEach((cuisine) => {
    cuisineElements.push(<option key={`${cuisine}`} value={`${cuisine}`}>{`${cuisine}`}</option>);
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewRestaurant({
      ...restaurantData,
      [name]: value,
    });
    console.log('getting resto data: ', restaurantData);
  };
  const handleSubmit = async (e) => {
    // console.log(restaurantData);
    const restaurantObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData),
    };
    fetch('/api/resto', restaurantObj)
      .then((response) => response.json())
      .catch((err) => console.log('Error in submitting a new restaurant,', err));
  };
  return (
    <div className="modal">
      <section>
        <p className="resto-name">Add a Restaurant</p>
        <form>
          <p>
            <label htmlFor="restaurant-name">Restaurant Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="restaurant-address">Restaurant Address: </label>
            <input
              name="address"
              type="text"
              placeholder="Restaurant Address"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="restaurant-link">Restaurant Link: </label>
            <input
              name="link"
              type="text"
              placeholder="Restaurant Link"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="restaurant-foodtype">
              Cuisine:
              <select name="foodType" onChange={handleInputChange}>
                {cuisineElements}
              </select>
            </label>
          </p>
          <label htmlFor="restaurant-city">
            Add to City:
            <select name="city" onChange={handleInputChange}>
              {cityElements}
            </select>
          </label>
          <br></br>
          <br></br>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button onClick={handleClose}>Close</button>
        </form>
      </section>
    </div>
  );
};

// "resto_id": 7,
// "restoname": "Urban Vegan Kitchen",
// "address": "41 Carmine St",
// "city": "New York",
// "foodtype": "Vegan",
// "link": "https://cheqout.com/menu/order/aa410620-2723-4880-bd50-faa48f02e3a4",
// "votes": 2
/**
 *
 * body = {name, address, city, foodType, link}
 */
export default AddRestaurant;
