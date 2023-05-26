import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const findUser = async (login) => {
  try {
    const response = await api.get(`/users/${login}`)
    return response.data
  } catch(error) {
    console.error("Error find user", error)
  }
}

export const fetchDepartments = async () => {
  try {
    const response = await api.get("/departamentos");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const createDepartment = async (department) => {
  try {
    const response = await api.post("/departamentos", department);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export const fetchMachines = async () => {
  try {
    const response = await api.get("/machine");
    return response.data;
  } catch (error) {
    console.error("Error fetching machines:", error);
    throw error;
  }
};

export const createMachine = async (machine) => {
  try {
    const response = await api.post("/machine", machine);
    return response.data;
  } catch (error) {
    console.error("Error creating machine:", error);
    throw error;
  }
};

export default api;
