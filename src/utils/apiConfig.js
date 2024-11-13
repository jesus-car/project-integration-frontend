const API_BASE_URL = "http://100.29.91.166:8080/roomly-services/api/v1";

export const API_URLS = {
  BASE: API_BASE_URL,
  USERS: `${API_BASE_URL}/admin/users`,
  PROPERTIES: `${API_BASE_URL}/properties`,
  FILTERED_PROPERTIES: `${API_BASE_URL}/properties/filter`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  ROLES: `${API_BASE_URL}/roles/all`,
};
