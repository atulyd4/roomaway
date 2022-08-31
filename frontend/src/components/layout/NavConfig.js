// component
import React from 'react';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = (user) => {
  if (user.is_manager === true) {
    return [
      {
        title: 'Manage Bookings',
        path: '/',
        icon: getIcon('icon-park-outline:hotel'),
      },
      {
        title: 'Manage Hotel ',
        path: '/managehotel',
        icon: getIcon('icon-park-outline:hotel'),
      },

      {
        title: 'Add Hotel',
        path: '/addhotel',
        icon: getIcon('fontisto:hotel-alt'),
      },
      {
        title: 'profile',
        path: '/profile',
        icon: getIcon('eva:people-fill'),
      },
    ];
  }
  return [
    {
      title: 'Listing',
      path: '/',
      icon: getIcon('icon-park-outline:hotel'),
    },
    {
      title: 'My Bookings',
      path: '/bookings',
      icon: getIcon('eva:pie-chart-2-fill'),
    },

    {
      title: 'profile',
      path: '/profile',
      icon: getIcon('eva:people-fill'),
    },
  ];
};

export default navConfig;
