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
  // console.log('in get restaurants');
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
    WHERE resto.city = $1`
    let queryString3 = `
    GROUP BY resto.resto_id, 
              resto.restoname, 
              resto.address, 
              resto.city, 
              resto.foodtype, 
              resto.link
    ORDER BY votes`;

    const params = [city];
    if(cuisine !== 'All'){
      queryString2 += 'AND resto.foodtype = $2'
      params.push(cuisine);
    }
    const queryString = queryString1 + queryString2 + queryString3;
    const result = await db.query(queryString, params);
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
  console.log(req.body);
  try {
    console.log('inside of addRestaurant');
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



// update (votes) for a restaurant
// restaurantController.updateRestaurant = async (req, res, next) => {
//   try {
//     const { resto_id, action } = req.body;
//     if (action === 'upvote') operation = '+';
//     if (action === 'downvote') operation = '-';
//     const queryString = `
//     UPDATE resto
//     SET votes=votes${operation}1
//     WHERE resto_id=$1`;
//     const params = [resto_id];
//     // resto table holds all information on votes 
//     // what is the single source of truth? The new table we are creating vs the original?
//     // all the votes will now be tallied in the new table

//     const result = await db.query(queryString, params);
//     // res.locals.updatedRestaurant = result.rows;
//     return next();
//   } catch (err) {
//     return next({
//       log: 'Error in restaurantController.updateRestaurant: ' + err,
//       message: { err: err },
//     });
//   }
// };


// update (votes) for a restaurant
// Hina Update
// restaurantController.updateRestaurant = async (req, res, next) => {
//   try {
//     const { resto_id, action } = req.body;
//     if (action === 'upvote') votes = 1;
//     if (action === 'downvote') votes = -1;
//     const params = [resto_id, 'testing', votes]
//     const queryString = `
//     INSERT INTO uservotes(resto_id, user_id, votes)
//     VALUES($1, $2, $3)
//     ON CONFLICT (resto_id, user_id) 
//     DO UPDATE SET votes = $3
//     WHERE uservotes.resto_id=$1 AND uservotes.user_id=$2
//     `
//     await db.query(queryString, params);
//     return next();
//   } catch (err) {
//     return next({
//       log: 'Error in restaurantController.updateRestaurant: ' + err,
//       message: { err: err },
//     });
//   }
// };


// delete a restaurant
restaurantController.deleteRestaurant = async (req, res, next) => {
  try {
    const { resto_id } = req.body;
    console.log(req.body);
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
