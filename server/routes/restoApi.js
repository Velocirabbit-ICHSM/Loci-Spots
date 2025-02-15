const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

/**
 * Import Controllers
 */

/**
 * GET REQUESTS, return list of restaurants by city
 */
router.get('/:city/:cuisine', restaurantController.getRestaurants, (req, res) => {
  console.log('getResto: Success!!!');
  res.status(200).json(res.locals.restaurants);
});

/**
 * POST REQUESTS, create a new restaruant to LociDB
 */
router.post('/', restaurantController.addRestaurant, (req, res) => {
  console.log('postResto: Success!!!');
  res.status(200).send('Restaurant successfully added!');
});

/**
 * DELETE REQUESTS, delete a restaurant for a given resto_id
 */
router.delete('/', restaurantController.deleteRestaurant, (req, res) => {
  // console.log('deleteResto: Success!!!');
  res.status(200).send('Restaurant successfully deleted!');
});

module.exports = router;
