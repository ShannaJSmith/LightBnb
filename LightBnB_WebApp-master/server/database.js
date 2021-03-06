const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  //query from entire users table to get all fields for eventual login. Email will be inputted by client so need to parameterize
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      if (result.rows.length) {
        //returns the entire object of the email inputted
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      return console.log('ERROR:', err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      return console.log('ERROR:', err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user;
  const sqlQuery = `
  INSERT INTO users (name, email, password)
  VALUES
  ($1, $2, $3)
  RETURNING *`;
  return pool.query(sqlQuery, [name, email, password]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(
      `SELECT * FROM reservations 
      JOIN properties ON property_id = properties.id 
      WHERE guest_id = $1 
      LIMIT $2`,
      [guest_id, limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('ERROR:', err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options. Options allows users to filter their results.
 * An options object can potentially have the following properties:
  {city, owner_id, minimum_price_per_night, maximum_price_per_night, minimum_rating;} <- input slots on search page
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  // 1 Setup an array to hold any parameters that may be available for the query.
  const queryParams = [];
  // 2 Start the query with all information that comes before the WHERE clause (from property by city query).
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  /* 3 Check if a city has been passed in as an option. Add the city to the params array and create a WHERE clause for the city.
We can use the length of the array to dynamically get the $n placeholder number. Since this is the first parameter, it will be $1.
The % syntax for the LIKE clause must be part of the parameter, not the query. */
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    if (!queryString.includes('WHERE')) {
      queryString += `WHERE city LIKE $${queryParams.length} `;
    } else {
      queryString += ` AND city LIKE $${queryParams.length} `;
    }
    // CAN SIMPLY CODE BY REPLACING ABOVE WITH TERANARY OPERATOR: 
    //queryString += queryString.includes('WHERE') ? ` AND city LIKE $${queryParams.length} ` : `WHERE city LIKE $${queryParams.length} `
  }
  
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (!queryString.includes('WHERE')) {
      queryString += `WHERE owner_id = $${queryParams.length}`;
    } else {
      queryString += ` AND owner_id = $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    // clients will input a price in dollars so need to multiple by 100 to get the values in database (which are stored in cents)
    queryParams.push(options.minimum_price_per_night * 100);
    if (!queryString.includes('WHERE')) {
      queryString += ` WHERE cost_per_night > $${queryParams.length}`;
    } else {
      queryString += ` AND cost_per_night > $${queryParams.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (!queryString.includes('WHERE')) {
      queryString += ` WHERE cost_per_night < $${queryParams.length}`;
    } else {
      queryString += ` AND cost_per_night < $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  // 4 Add any query that comes after the WHERE clause.
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // 5 Console log everything just to make sure we've done it right.
  console.log('queryString:', queryString, 'queryParams:', queryParams);
  // 6 Run the query
  return pool
    .query(queryString, queryParams)
    .then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const {
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  } = property;
  const sqlQuery = `
  INSERT INTO properties (owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`;
  return pool.query(sqlQuery, [owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms]);
};
exports.addProperty = addProperty;
