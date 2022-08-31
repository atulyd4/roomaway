export const initialState = {
  from_date: null,
  to_date: null,
  check_in_time: null,
  check_out_time: null,
  rooms_count: 0,
  guest_count: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'from_date_change':
      return { ...state, from_date: action.payload };
    case 'to_date_change':
      return { ...state, to_date: action.payload };
    case 'hotel_id_change':
      return { ...state, hotel_id: action.payload };
    case 'room_updated':
      return { ...state, guest_count: action.payload.guestCount, rooms_count: action.payload.roomCount };
    default:
      throw new Error();
  }
}
