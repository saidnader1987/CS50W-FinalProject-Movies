# **Movies App**

## Acknowledgements

The front-end of this project was a team effort between 2 great developers and myself. I would like to thank:

- [Ricardo Vivas](https://github.com/rvivast)
- [Fabian Orozco](https://github.com/DevForozco)

Their contributions to the front-end development in Angular were much appreciated.

The back-end was my entire responsibility.

This project truly reflects our collaborative work. Thanks for your valuable collaboration.

#### **Video Demo:** <https://www.youtube.com/watch?v=MFOxEq9t7nA>

#### **Description:** Movie management app

## **Concept**

_Movies app_ is a management web application for your movies. Its backend is written in Python using Django and its frontend is written in Typescript using Angular.

With this application you can manage a database for your movies, directors and actors.

## **Introduction and Justification**

_Movies App_ is a distinctive and multifaceted web application for managing your personal movies collection. In contrast to the more focused projects in this course, this app interweaves multiple components including movies, directors, actors, genres, and platforms into a seamless, interconnected user experience. It employs Python and Django for the backend and Typescript and Angular for the frontend, offering a perfect blend of Django's powerful database management and Angular's dynamic and robust frontend capabilities.

## **Distinctiveness and Complexity**

The _Movies App_ distinguishes itself through its multi-layered and interconnected approach to movie management. While previous course projects, such as the Google Search and Wikipedia-like web page, focused on specific isolated tasks, _Movies App_ elevates this complexity by integrating several components into one seamless interface.

This application also expands on the complexity presented in the eBay-like app and the mail app developed during the course. While these projects utilized Django and JavaScript separately, _Movies App_ harmonizes these technologies along with TypeScript and Angular. This amalgamation of technologies presents a more realistic simulation of real-world application development, which often involves navigating and integrating multiple languages and frameworks.

Furthermore, the decision to use Angular for the frontend, despite only a brief introduction to React in the course, exhibits an additional layer of complexity. Learning and implementing a new framework independently demonstrates not only technical ability but also adaptability and self-directed learning—key attributes in modern web development.

## How to Run

### Requirements

Before running the application, make sure you have the following installed:

- Python and pip (The Python package installer)
- Node.js and npm (The Node package manager)
- Angular CLI (The Angular Command Line Interface)

### Backend Setup and Running

1. Navigate to the `movies_back` directory located in the root directory of the project.

   ```bash
   cd movies_back
   ```

2. Install the required Python packages with pip.

   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) If you want to start with a fresh database, delete the provided database and perform migrations.

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Once all the packages are installed and migrations are performed (if necessary), run the backend server with the following command.

   ```bash
   python manage.py runserver
   ```

   The backend server will start running and listening for requests.

### Frontend Setup and Running

1. Navigate back to the root directory and then into the `movies_front` directory.

   ```bash
   cd ..
   cd movies_front
   ```

2. Install the required Node packages with npm.

   ```bash
   npm install
   ```

3. After the packages are installed, start the Angular application.

   ```bash
   ng serve
   ```

   The Angular application will be compiled and served on port 4200.

   Note: Ensure that the Angular application is running on port 4200, as this is the port where the backend server is set up to listen to requests.

4. Open your browser and visit `http://localhost:4200` to access the application.

Now you should have both the backend and frontend of the application running. Enjoy!

## **Features**

1. _Movie list:_ A list sorted by genre of all your movies
2. _Movie detail:_ All the information for a movie, as its youtube trailer, actors, director, platforms, its genre, reviews
3. _Director list:_ A list sorted by last name of all your directors
4. _Director detail:_ The details for a specific director as his/her birth date, nationality, photo, movies and biography
5. _Actor list:_ A list sorted by last name of all your actors
6. _Actor detail:_ The details for a specific actor as his/her birth date, nationality, photo, movies and biography
7. _Genre list:_ A list of the genres in your application
8. _Genre detail:_ The movies of a specific genre
9. _Platform list:_ A list of the platforms in your application
10. _Platform detail:_ The movies of a specific platform
11. _Create a movie:_ Add a movie to your database. Actors and platform can be added later.
12. _Create an actor:_ Add an actor to your database
13. _Create a director:_ Add a director to your database
14. _Create a platform:_ Add a platform to your database
15. _Create a genre:_ Add a genre to your database
16. _Add an actor to a movie:_ Associate an actor to a movie
17. _Add a platform to a movie:_ Associate a platform to a movie
18. _Review a movie:_ Add reviews and comments to a movie
