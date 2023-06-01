# **Movies App**

#### **Video Demo:** <https://www.youtube.com/watch?v=MFOxEq9t7nA>

#### **Description:** Movie management app

## **Concept**

_Movies app_ is a management web application for your movies. Its backend is written in Python using Django and its frontend is written in Typescript using Angular.

With this program you can manage a database for your movies, directors and actors.

---

## **How to Run**

### **Requirements**

Make sure you have the following installed:

- _Python_ and _pip_ (The Python package installer)
- _Node.js_ and _npm_ (The Node package manager)
- _Angular CLI_ (The Angular Command Line Interface)

### **Setup and Running the Backend**

1. Navigate to the `movies_back` directory located in the root directory of the project.

   ```bash
   cd movies_back
   ```

2. Install the required Python packages with pip.

   ```bash
   pip install -r requirements.txt
   ```

3. Once all the packages are installed, you can run the backend server with the following command.

   ```bash
   python manage.py runserver
   ```

### **Setup and Running the Frontend**

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

   **Note:** Ensure that the Angular application is running on port 4200, as this is the port where the backend server is set up to listen to requests.

Now you should have both the backend and frontend of the application running. **Enjoy!**

---

This text can be directly copied and pasted into a README.md file and it will render as intended on GitHub, Bitbucket, or any other platform that supports markdown.

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
