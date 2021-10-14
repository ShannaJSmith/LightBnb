SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%' --must do this instead of = 'Vancouver' because there is a 'North Vancouver'
AND owner_id = 346
AND cost_per_night > 5000
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 1;