import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './App.css';
import {
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Listing from './pages/booking/Listing';
import AppLayout from './components/layout/AppLayout';
import MyBookings from './pages/booking/MyBookings';
import Profile from './pages/Profile';
import Hotelform from './pages/addhotel';
import Bookings from './pages/myhotels/managebookings';
import MyHotel from './pages/myhotels/managehotel';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.token, shallowEqual);
  const isLoggedInmanager = useSelector((state) => state.auth.user?.is_manager, shallowEqual);

  console.log('is rendered');
  return (
    <div className="App">
      <Routes>
        {isLoggedIn ? (
          <Route>
            {isLoggedInmanager ? (
              <Route path="/" element={<AppLayout />}>
                <Route index element={(<Bookings />)} />

                <Route path="/managehotel" element={<Outlet />}>
                  <Route index element={<MyHotel />} />
                </Route>
                <Route path="/addhotel" element={<Outlet />}>
                  <Route index element={<Hotelform />} />
                </Route>
                <Route path="/profile" element={<Outlet />}>
                  <Route index element={<Profile />} />
                </Route>
              </Route>

            ) : (
              <Route path="/" element={<AppLayout />}>
                <Route index element={(<Listing />)} />
                <Route path="bookings" element={<Outlet />}>
                  <Route index element={<MyBookings />} />
                </Route>
                <Route path="/profile" element={<Outlet />}>
                  <Route index element={<Profile />} />
                </Route>
              </Route>
            )}
          </Route>
        ) : (
          <>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
