## Roomaway

## Introduction
This project concentrates on building a website for a hotel. The website is based on Django, CSS and javascript,React js. It focuses on giving the costumer all the information about the hotel and its services. The website gives details of rooms with pictures .

During the past several decades Hotel function and information has been transformed from a relatively obscure printed banners and manual customer service to central and top-level management functional web application-based system. There are many factors that have influenced this transformation like technological advances, professionalism, and general recognition of human beings as most important resources.

A computer-based management system is designed to handle all the primary information required to display room information etc. A list of all the services and amenities are some of the things that attract the user/customer. This project intends to introduce more user friendliness in the various activities such as searching for hotel, booking a room .

## Description
Roomaway is a Hotelbooking and Hotelmanage - app.

If anyone who register and login as a manager can add his Hotel and also he can manage his hotel bookings.

If anyone who register and login as a user can book hotels room .

1. Register and Login as a manager :

Add hotel page : On this page You can fill
hotel details and add your hotel.

Manage hotel : On this page you can change any detail of your hotel.

Manage booking: On manage booking page you will see all your hotel bookings with booking detail and here you can checkin and checkout to customer.

Profile page :  you can change any details related to your profile .

2. Register and Login as a user :

Listing page : on this page you will see all
hotels list and you can search by city .
On clicking Booknow botton you can book hotel 
room after filling detail.

My Booking page : On this page you will see
your all bookings.

Profile page : You will see your detail also you can change any details related to your profile .

This project explores various aspects of requirements of a website for hotel and tries to go a step further by giving the visitors a sense of being welcomed. The goal of any project is to establish an interactive user interface that is user(visitor) friendly, and that goal is met here in this project.

## Project Structure

```bash
├── Dockerfile
├── finalproject
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend
│   ├── admin.py
│   ├── apps.py
│   ├── babel.config.json
│   ├── __init__.py
│   ├── jsconfig.json
│   ├── migrations
│   │   ├── __init__.py
│   ├── models.py
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── api
│   │   │   ├── ajax.js
│   │   │   ├── auth.js
│   │   │   └── hotels.js
│   │   ├── app
│   │   │   ├── auth-slice.js
│   │   │   ├── hotel-slice.js
│   │   │   └── store.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── LoginForm.js
│   │   │   │   ├── Login.js
│   │   │   │   ├── RegisterForm.js
│   │   │   │   └── Register.js
│   │   │   ├── common
│   │   │   │   ├── Amenities.js
│   │   │   │   └── Dropdown.js
│   │   │   ├── layout
│   │   │   │   ├── Account.js
│   │   │   │   ├── AppLayout.js
│   │   │   │   ├── BookingLayout.js
│   │   │   │   ├── Dasboardsidenavbar.js
│   │   │   │   ├── Iconify.js
│   │   │   │   ├── Logo.js
│   │   │   │   ├── NavConfig.js
│   │   │   │   ├── NavSection.js
│   │   │   │   ├── Roomcard.js
│   │   │   │   ├── Scrollbar.js
│   │   │   │   └── useResponsive.js
│   │   │   └── Page.js
│   │   ├── hooks
│   │   │   ├── use-notification.js
│   │   │   └── use-responsive.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── addhotel
│   │   │   │   ├── amenitiescard.js
│   │   │   │   └── index.js
│   │   │   ├── booking
│   │   │   │   ├── Listing
│   │   │   │   │   ├── HotelCard.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── MyBookings
│   │   │   │   │   └── index.js
│   │   │   │   └── New
│   │   │   │       ├── index.js
│   │   │   │       └── reducer.js
│   │   │   ├── myhotels
│   │   │   │   ├── managebookings
│   │   │   │   │   ├── Checkingmodal.js
│   │   │   │   │   ├── Hotelbookings.js
│   │   │   │   │   └── index.js
│   │   │   │   └── managehotel
│   │   │   │       ├── Hoteleditmodal.js
│   │   │   │       ├── Hotel.js
│   │   │   │       └── index.js
│   │   │   └── Profile
│   │   │       ├── editform.js
│   │   │       ├── index.js
│   │   │       └── profilecard.js
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
├── hotelbooking
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   ├── models.py
│   ├── serializers.py
│   ├── static
│   │   └── hotelbooking
│   │       └── style.css
│   ├── templates
│   │   └── hotelbooking
│   │       ├── index.html
│   │       ├── layout.html
│   │       ├── login.html
│   │       └── register.html
│   ├── tests.py
│   ├── urls.py
│   └── views.py
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
Backend
```bash
python3 manage.py migrate
python3 manage.py runserver
```
Frontend

```bash
cd frontend && npm install
npm run dev
``
