# Portef-jleprojekt-5
Backend Api - Cafe
!!! THIS A API ENDPOINT EXERCISE FOR SCHOOL PROJECT !!!


Cafe and User Management API
Welcome to the Cafe and User Management API! 
This API provides endpoints for managing cafes and users, including searching for cafes, creating cafes and users, retrieving user information, and managing favorite cafes.

Endpoints
Search for Cafes
1. Get all cafes

   Endpoint: /cafes
   
   Method: GET
   
   Description: Retrieves information about all cafes in the database.
   
   Example: GET /cafes

2. Get cafe by ID
    
   Endpoint: /cafes/search/:cafe_id
   
	 Method: GET

	 Description: Retrieves information about a cafe based on the provided ID.

	 Example: GET /cafes/search/123


3. Get cafes by city
   
   Endpoint: /cafes/search
   
	 Method: GET

	 Description: Retrieves cafes based on the provided city.

	 Query Parameter: city

	 Example: GET /cafes/search?city=New York




Create Cafe and User

1. Create a cafe
   
   Endpoint: /create/cafe
   
	 Method: POST

	 Description: Creates a new cafe and adds it to the database.

	 Request Body Parameters:

	 name: Cafe name - Varchar

	 city: Cafe city - Varchar

	 wifi: Wifi availability  - Boolean

	 music: Music availability - Boolean

	 priceRange: Price range - Enum 'Inexpensive', 'Moderately expensive','Expensive')

	 rating: Cafe rating - Int

	 address: Cafe address - Varchar


3. Create a user
   
   Endpoint: /create/user
   
	 Method: POST

	 Description: Creates a new user account and adds it to the database.

	 Request Body Parameters:

 	 username: User's username
   
   email: User's email
   
   password: User's password
   
   firstName: User's first name
   
	 lastName: User's last name



Search for User Data


1. Get user information by ID
   
	Endpoint: /user/:user_id

	Method: GET

	Description: Retrieves information about a user based on the provided ID.



Add Favorite Cafe to User

1. Add or remove a favorite cafe
   
	Endpoint: /favorite/add

	Method: POST

	Description: Adds or removes a cafe from a user's list of favorites.

	Request Body Parameters:

	cafeId: ID of the cafe

	userId: ID of the user


2. Get user's favorite cafes
   
	Endpoint: /favorites/:user_id

	Method: GET

	Description: Retrieves cafes favorited by a user based on the provided user ID.


All responses are in JSON format.
