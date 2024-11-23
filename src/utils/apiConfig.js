const API_BASE_URL = "http://localhost:8080/roomly-services/api/v1";

export const API_URLS = {
  BASE: API_BASE_URL,
  USERS: `${API_BASE_URL}/admin/users`,
  PROPERTIES: `${API_BASE_URL}/properties`,
  FILTERED_PROPERTIES: `${API_BASE_URL}/properties/filter`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  ROLES: `${API_BASE_URL}/roles/all`,
  FAVORITES: `${API_BASE_URL}/favorites`,
  BOOKING: `${API_BASE_URL}/bookings/reserve`,
  MY_BOOKINGS: `${API_BASE_URL}/bookings/by-user-id`,
};
