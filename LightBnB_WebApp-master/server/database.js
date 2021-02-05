const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
}); 

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
  .then(res => (res.rows[0]))
  .catch(err => {console.log(err)})
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then(res => (res.rows[0]))
  .catch(err => {console.log(err)})
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => (res.rows[0]))
  .catch(err => {console.log(err)})
}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservation_id = reservations.id
  WHERE reservations.guest_id = $1
  AND end_date < NOW()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => (res.rows))
  .catch(err => {console.log(err)})
}

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  FULL JOIN property_reviews ON properties.id = property_id
  `;

  // input: Min and Max price range
  const minPrice = options.minimum_price_per_night;
  const maxPrice = options.maximum_price_per_night;

if (minPrice || maxPrice) {
  if (minPrice && maxPrice) {
    queryParams.push(`${minPrice}`, `${maxPrice}`)
    queryString += `WHERE cost_per_night > $${queryParams.length - 1} AND cost_per_night < $${queryParams.length}`
  }

  if (minPrice && !maxPrice) {
    queryParams.push(`${minPrice}`)
    queryString += `WHERE cost_per_night > $${queryParams.length}`
  }

  if (maxPrice && !minPrice) {
    queryParams.push(`${maxPrice}`)
    queryString += `WHERE cost_per_night < $${queryParams.length}`
  }
}

  // input: Owner ID
  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`)
    if (queryParams.length != 1) {
      queryString += ` AND owner_id LIKE $${queryParams.length}`
    } else {
      queryString += `WHERE owner_id LIKE $${queryParams.length}`
    }
  }

  // input: CITY
  if (options.city) {
    queryParams.push(`%${options.city}%`)
    if (queryParams.length != 1) {
      queryString += ` AND city LIKE $${queryParams.length}`
    } else {
      queryString += `WHERE city LIKE $${queryParams.length}`
    }
  }

  // input: Rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)
    if (queryParams.length != 1) {
      queryString += ` AND rating > $${queryParams.length}`
    } else {
      queryString += `WHERE rating > $${queryParams.length}`
    }
  }  

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => (res.rows))
  .catch(err => {console.log(err)});
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function(property) {
  
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, values)
  .then(res => (res.rows))
  .catch(err => {console.log(err)});
}

exports.addProperty = addProperty;