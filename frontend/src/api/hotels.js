import { stringify } from 'query-string';
import ajax from './ajax';

export function getHotels(params) {
  let url = '/hotels/';
  if (params && Object.values(params).some((i) => i !== '')) {
    url += `?${stringify(params)}`;
  }
  return ajax(url);
}

export function addhotel(body, files) {
  const fData = new FormData();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    const photo = files[i];
    fData.append('image', photo, photo.fileName);
  }

  if (body.amenities && Array.isArray(body.amenities)) {
    body.amenities.forEach((a) => {
      fData.append('amenities', a);
    });
  }
  return ajax(
    '/hotels/',
    {
      method: 'POST',
      body: {
        name: body.hotelname,
        address_line_one: body.addressone,
        address_line_two: body.addresstwo,
        city: body.city,
        state: body.statename,
        total_rooms: body.roomscount,
        room_type: body.type,
        price: body.price,
      },
      form: fData,
    },
    true,
  );
}
export function getamenities() {
  return ajax('/amenities');
}
export function getHotel(hotelId) {
  return ajax(`/hotels/${hotelId}/`);
}

export function getavailbility(hotelId, startDate, endDate) {
  return ajax(`/hotels/${hotelId}/availbility/`, {
    method: 'POST',
    body: {
      from_date: startDate,
      to_date: endDate,
    },
  });
}

export function bookRoom(body) {
  return ajax('/booking/', {
    method: 'POST',
    body,
  });
}

export function getbookings() {
  return ajax('/booking/');
}

export function editprofile(body) {
  return ajax(
    '/edit',
    {
      method: 'POST',
      body,
    },
  );
}

export function managehotelbookings() {
  return ajax('/managehotelbookings/');
}

export function managebookingscheckin(BookingId, checkin) {
  return ajax(`/managehotelbookings/${BookingId}/`, {
    method: 'PATCH',
    body: {
      check_in_time: checkin,
    },
  });
}
export function managebookingscheckout(BookingId, checkout) {
  return ajax(`/managehotelbookings/${BookingId}/`, {
    method: 'PATCH',
    body: {
      check_out_time: checkout,
    },
  });
}
export function getMyHotel() {
  return ajax('/hotels/');
}

export function editMyHotel(hotelId, body) {
  return ajax(`/hotels/${hotelId}/`, {
    method: 'PATCH',
    body: {
      name: body.name,
      address: {
        address_line_one: body.address_line_one,
        address_line_two: body.address_line_two,
        city: body.city,
        state: body.state,
      },
      rooms: {
        is_booked: false,
        room_type: body.room_type,
        price: body.price,
      },
      total_rooms: body.total_rooms,
      amenities: body.amenities,
    },
  });
}

export function searchhotel({ city }) {
  return ajax(`/searchlistings/${city}/`);
}
