/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { store } from '../app/store';

const BASE_URL = process.env.API_URL || '/api';

const objectToFormData = function (obj, form, namespace) {
  const fd = form || new FormData();
  let formKey;

  for (const property in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === 'object'
        && !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

export default function ajax(url, options = { method: 'GET', headers: new Headers() }, formData = false) {
  if (options.headers === undefined) options.headers = new Headers();

  if (formData) {
    const f = objectToFormData(options.body, options.form, options.namespace);
    options.body = f;
  } else {
    options.headers.set('content-type', 'application/json');
    options.body = JSON.stringify(options.body);
  }

  // inject JWT token
  const token = store.getState()?.auth?.token;
  if (token) options.headers.set('Authorization', `Bearer ${token}`);

  return fetch(BASE_URL + url, options)
    .then(async (response) => {
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw error;
      } else {
        return response.json();
      }
    });
}
