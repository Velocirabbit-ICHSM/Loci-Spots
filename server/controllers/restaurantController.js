const db = require('../models/restaurantModel');

/* 
CREATE TABLE resto (
  resto_id SERIAL PRIMARY KEY,
  restoName VARCHAR(50),
  address VARCHAR(50),
  city VARCHAR(50),
  foodType VARCHAR(50),
  link VARCHAR(50),
  votes INTEGER
);
*/

// Restaurant Controller
const restaurantController = {};

// get all restaurants
restaurantController.getRestaurants = async (req, res, next) => {
  try {
    const { city, cuisine } = req.params;
    let queryString1 = `
    SELECT resto.resto_id, 
          resto.restoname, 
          resto.address, 
          resto.city, 
          resto.foodtype, 
          resto.link, 
          SUM(user_resto_votes.vote) AS votes
    FROM resto
    LEFT OUTER JOIN user_resto_votes ON resto.resto_id = user_resto_votes.resto_id`;
    let queryString2 = `
    WHERE resto.city = $1`;
    let queryString3 = `
    GROUP BY resto.resto_id, 
              resto.restoname, 
              resto.address, 
              resto.city, 
              resto.foodtype, 
              resto.link
    ORDER BY votes`;

    const params = [city];
    if (cuisine !== 'All') {
      queryString2 += 'AND resto.foodtype = $2';
      params.push(cuisine);
    }
    const queryString = queryString1 + queryString2 + queryString3;
    const result = await db.query(queryString, params);
    result.rows.forEach((row) => {
      if (row.votes === null) row.votes = 0;
    });
    res.locals.restaurants = { [city]: result.rows };

    return next();
  } catch (err) {
    return next({
      log: 'Error in restaurantController.getRestaurants: ' + err,
      message: { err: err },
    });
  }
};

// add a restaurant
restaurantController.addRestaurant = async (req, res, next) => {
  try {
    const { name, address, city, foodType, link, user_id } = req.body;

    const queryString = `
    INSERT INTO resto (restoName, address, city, foodType, link, add_by_user)
    VALUES ( $1, $2, $3, $4, $5, $6);`;
    const params = [name, address, city, foodType, link, 1];

    const result = await db.query(queryString, params);
    // console.log(result);
    // res.locals.addedRestaurant = result;
    return next();
  } catch (err) {
    return next({
      log: 'Error in restaurantController.addRestaurant: ' + err,
      message: { err: err },
    });
  }
};

// delete a restaurant
restaurantController.deleteRestaurant = async (req, res, next) => {
  try {
    const { resto_id } = req.body;
    const queryString = `
    DELETE FROM resto 
    WHERE resto_id=$1`;
    const params = [resto_id];

    const result = await db.query(queryString, params);
    // console.log(result);
    // res.locals.deletedRestaurant = result.rows;
    return next();
  } catch (err) {
    return next({
      log: 'Error in restaurantController.deleteRestaurant: ' + err,
      message: { err: err },
    });
  }
};

module.exports = restaurantController;
