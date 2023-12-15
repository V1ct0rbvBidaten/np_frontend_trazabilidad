import axios from "axios";

export const userLogin = async (userData) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/login`, userData);
};

export const getCurrentUser = async (userToken) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth`, userToken);
};

export const getUsers = async (token, page, per_page) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/users?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserById = async (token, id) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/users_by_id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (token, id, body) => {
  return await axios.put(`${import.meta.env.VITE_API_URL}/users/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = async (token, body) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/signup`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
