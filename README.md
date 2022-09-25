## Roomaway

Project video link : https://youtu.be/HJEfqBdw3qA

## Introduction

This project concentrates on building a website for a hotel. The website is based on Django, CSS and javascript,React js,React-Redux. It focuses on giving the costumer all the information about the hotel and its services. The website gives details of rooms with pictures .

A computer-based management system is designed to handle all the primary information required to display room information etc. A list of all the services and amenities are some of the things that attract the user/customer. This project intends to introduce more user friendliness in the various activities such as searching for hotel, booking a room .

## Main idea
I created a  web application Roomaway for Adding hotel as well as mangehotel and user can book hotel rooms.
web application(Roomaway) is Mobile responsive.

 How it works:

* 1. If anyone who register and login as a manager can add his Hotel and also he can manage his hotel.
* Register and Login as a manager :
  
   * Add hotel page : On this page You can fill
   * hotel details and add your hotel.
   * Manage hotel : On this page you can change any detail of your hotel.
   * Manage booking: On manage booking page you will see all your hotel bookings with booking detail and here you can checkin and checkout to customer.
   * Profile page :  you can change any details related to your profile .

* 2. If anyone who register and login as a user can book hotels room .
*  Register and Login as a user :
   *  Listing page : on this page you will see all
   *  hotels list and you can search by city .
   *  On clicking Booknow botton you can book hotel room after filling detail.
   * My Booking page : On this page you will see
your all bookings.
   * Profile page : You will see your detail also you can change any details related to your profile .


## Distinctiveness and Complexity
The page is not similar to anything we have already created. It's not a social media app nor an e-commerce. It's not similar to other years projects either.

In terms of complexity, I used Django with more than one model (explained below) and several javascript files(Reactjs) to the frontend.

## Files Information
* In hotelbooking views.py there is all of the backend code. The main functions are:
  * def register for register user
  * def updateprofile for updating profile details
  * def updateprofilepicture for updating profile picture
  * def userdetail for find the user detail
  * def amenities_view for list of hotel amenities
  * def searchhotel finding the hotel by his city name
  * Class Hotelviewset for finding the list of all hotels and create hotel and update hotel
  * Class Bookingviewset in this class user's bookings list and user can create booking
  * Class Bookingmanageviewset in this class manger can find all the list of his hotel bookings and also can update check_in and check_out
  
* Models.py. The different models are:
  * User model 
  * Location model for location detail of hotel
  * Amenities model for hotel amenities
  * Image model 
  * Hotel model all the details for hotel
  * Room model for hotels room detail
  * Booking model all the details for booking

* In api folder files contain logic about user and hotel api
* Components/auth folder register and login template
* Components/layout folder contain  layout for website
* Components/pages folder contained all the different js files for hotel
  
## Project Structure

```bash
├── Dockerfile
├── finalproject
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py # main setting.py file
│   ├── urls.py # urls for both apps
│   └── wsgi.py
├── frontend  # Frontend contains all the React codes
│   ├── babel.config.json
│   ├── __init__.py
│   ├── jsconfig.json
│   ├── migrations
│   │   ├── __init__.py
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── api
│   │   │   ├── ajax.js # for headers and token verification
│   │   │   ├── auth.js # urls for register and update profile
│   │   │   └── hotels.js # all hotel related urls
│   │   ├── app
│   │   │   ├── auth-slice.js   # User login and logout logic
│   │   │   ├── hotel-slice.js  # hotel initial data and update data
│   │   │   └── store.js  # it stores user and hotel details in localstorage 
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── LoginForm.js  # User login form
│   │   │   │   ├── Login.js
│   │   │   │   ├── RegisterForm.js # User register form 
│   │   │   │   └── Register.js
│   │   │   ├── common
│   │   │   │   ├── Amenities.js # Hotel amenities templates
│   │   │   │   └── Dropdown.js  # dropdown for searching hotel by city name
│   │   │   ├── layout
│   │   │   │   ├── Account.js
│   │   │   │   ├── AppLayout.js # website layout
│   │   │   │   ├── BookingLayout.js
│   │   │   │   ├── Dasboardsidenavbar.js # side navbar 
│   │   │   │   ├── Iconify.js # for icons
│   │   │   │   ├── Logo.js
│   │   │   │   ├── NavConfig.js # links for diffrent urls
│   │   │   │   ├── NavSection.js
│   │   │   │   ├── Roomcard.js # add number of rooms and guests on the time of booking
│   │   │   │   ├── Scrollbar.js
│   │   │   │   └── useResponsive.js
│   │   │   └── Page.js
│   │   ├── hooks
│   │   │   ├── use-notification.js # after form submiting alert sucess or failed
│   │   │   └── use-responsive.js 
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── addhotel
│   │   │   │   ├── amenitiescard.js # show amenities with checkbox button
│   │   │   │   └── index.js # Form for Adding hotel
│   │   │   ├── booking
│   │   │   │   ├── Listing
│   │   │   │   │   ├── HotelCard.js # Template for Showing all hotel details on listing page
│   │   │   │   │   └── index.js # logic for booking hotel rooms
│   │   │   │   ├── MyBookings
│   │   │   │   │   └── index.js # User bookings page
│   │   │   │   └── New
│   │   │   │       ├── index.js # hotel rooms booking template
│   │   │   │       └── reducer.js
│   │   │   ├── myhotels
│   │   │   │   ├── managebookings
│   │   │   │   │   ├── Checkingmodal.js #  check_in and check_out modal for hotel bookings 
│   │   │   │   │   ├── Hotelbookings.js # show manager hotel all bookings
│   │   │   │   │   └── index.js # logic for rendring hotel booking detail and chek_in check_out
│   │   │   │   └── managehotel
│   │   │   │       ├── Hoteleditmodal.js # Modal for edit your hotel detail
│   │   │   │       ├── Hotel.js # Your Hotel 
│   │   │   │       └── index.js # logic for render hotel and edit hotel
│   │   │   └── Profile
│   │   │       ├── editform.js # profile edit form with avilable details
│   │   │       ├── index.js # finding user deail from redux store
│   │   │       └── profilecard.js # User profile detail card
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── theme
│   ├── static
│   │   ├── css
│   │   ├── icons
│   │   ├── illustrations
│   │   ├── images
│   │   ├── logo.svg
│   │   ├── mock-images
│   ├── templates
│   │   └── frontend
│   │       └── index.html
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── webpack.config.js
│   └── yarn.lock
├── hotelbooking  # backend contains all the django codes
│   ├── admin.py  # register model for admin
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations # all migrations
│   ├── models.py # all models
│   ├── serializers.py # diffrent serilizers
│   ├── static
│   │   └── hotelbooking
│   │       └── style.css # css styling
│   ├── templates
│   │   └── hotelbooking 
│   │       ├── index.html
│   │       ├── layout.html
│   │       ├── login.html
│   │       └── register.html
│   ├── tests.py
│   ├── urls.py # urls for functions
│   └── views.py # all api funcions detail given above
├── manage.py
├── Procfile
├── README.md
├── requirements.txt
├── runtime.txt
├── uploads
```

## System Requirments
```bash
1. Postgresql database
2. windows / linux / mac with python3 installed
```
## Setup

1.initialize virtual environment and activate it
```bash
python3 -m venv .venv
source .venv/bin/activate
```
2.Install dependencies
```bash
pip install -r requirements.txt
```
## Run
For Backend
```bash
python3 manage.py migrate
DEBUG=True python3 manage.py runserver
```
For Frontend

```bash
cd frontend 
npm install
npm run dev
``
