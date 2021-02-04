SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON properties.id = property_id
JOIN property_reviews ON reservation_id = reservations.id
WHERE reservations.guest_id = 1
AND end_date < NOW()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;