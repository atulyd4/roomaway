import ajax from './ajax';

export function login(body) {
  return ajax('/token/', { method: 'POST', body });
}

export function register(body) {
  return ajax('/register', {
    method: 'POST',
    body: {
      email: body.email,
      username: body.username,
      password: body.password,
      first_name: body.firstname,
      last_name: body.lastname,
      is_manager: body.checked,
    },
  });
}

export function updatePhoto(picture) {
  const fdata = new FormData();
  fdata.append('picture', picture);
  return ajax('/profile/picture', {
    method: 'POST',
    form: fdata,
  }, true);
}
