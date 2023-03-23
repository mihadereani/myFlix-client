# React App (myFlix)

## Objective

Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database). The API for this application can be found on the [movie-api](https://github.com/mihadereani/movie_api) repo.

## Design Criteria

- Access information on movies, directors, and genres
- Create a profile so I can save data about my favorite movie

## Technology Used

- Node.js
- Bootstrap
- React
- Redux
- Parcel

Project can be tested using Parcel: `parcel src/index.html`

## Views and Features

**Main View**

- Returns a card list of all movies, each card contains the title, genre, release year, poster of the movie it features.
- Cards also contain a button to add a movie to the list of favorites and one to open the single movie view.

**Single Movie View**

- Returns information (description, genre, director, image) about a single movie to the user

**Registration View**

- Returns a registration form, allowing users to create an account with a username, password, email and birthday

**Login View**

- Returns a login form to allow existing users to log into the app

**Genre View**

- Returns a description of the selected genre as well as a list of matching movies

**Director View**

- Returns information about the selected director(bio, birth year, death year) as well as a list of matching movies

**Profile View**

- Returns the user's profile showing the user's information and allowing the users to take update and delete their account
- The favorite movies are displayed on card with the poster and title of the movie as well as a button to toggle favorite movies
- The user update form allows users to apdate their username, password and email.

## App Screenshots

![](./src/assets/Screenshot%202023-03-23%20at%2015.25.00.png)
![](./src/assets/Screenshot%202023-03-23%20at%2015.25.28.png)
![](./src/assets/Screenshot%202023-03-23%20at%2015.26.54.png)
