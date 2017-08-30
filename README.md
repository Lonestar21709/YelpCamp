#YelpCamp

## Introduction

This application allows users to share their campsite experiences and collaborate with one another through comments. The application uses the seven types of RESTFUL routes in order to display a list of campsites and comments, create a new campsite or comment, show more info about a particular campsite, edit campsite information or comment content, and delete campsites as well as comments. In order to collaborate on the application you need to be logged in, or sign up, and be authenticated. Only the user who posts a campsite can edit and delete it. Same goes for comments that users post. The application makes use of Express.js to build the backend server and mongoDB as the database to store campsite, comment, and user data. 

##Check it out [here](https://radiant-woodland-10538.herokuapp.com/)

##Learned everything from Colt Steele - Udemy Web Dev Bootcamp

RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST