import axios from "axios";
import jwt from 'jsonwebtoken';

let username;

const api = axios.create({
  baseURL: "http://localhost:8080",
});
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      
      // Decodificar o token e obter o nome do usuário
      const decodedToken = jwt.decode(token);
      console.log("decoded ", decodeToken)
      username = decodedToken.sub; // Substitua "username" pelo campo correto do token que contém o nome do usuário



      // Agora você pode usar o "username" como necessário
      
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getUsername = () => {
  return username
}


export const insertSimulacao = async (simulacao) => {
  try {
    const response = await api.post(`/simulacao`, simulacao);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Obter todas as simulações
export const getAllSimulacoes = async () => {
  try {
    const response = await api.get(`/simulacao`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Obter simulações por ID do usuário
export const getSimulacoesByUserId = async (userId) => {
  try {
    const response = await api.get(`/simulacao/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Atualizar informações da simulação
export const updateSimulacao = async (simulacao) => {
  try {
    const response = await api.put(`/simulacao`, simulacao);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/departamentos/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Excluir simulação por ID
export const deleteSimulacao = async (simulacaoId) => {
  try {
    const response = await api.delete(`/simulacao/${simulacaoId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const decodedToken = (token) => {
  try {
    const decodedToken = jwt.decode(token); // Decodifica o token JWT
    const userId = decodedToken.sub; // Obtém o ID do usuário do campo "sub" do token
    const username = decodedToken.username; // Obtém o nome de usuário do campo "username" do token

    // Faça algo com os dados do usuário
    console.log('ID do usuário:', userId);
    console.log('Nome de usuário:', username);
    return userId;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
  }
};

export const findUser = async () => {
  try {
    const response = await api.get(`/logins/${username}`)
    return response.data
  } catch(error) {
    console.error("Error find user", error) 
  }
}
const API_URL = 'http://localhost:8080'; // Coloque a URL correta da sua API backend

export const fetchContasLuz = async () => {
  try {
    const response = await api.get(`/conta-luz`);
    return response.data;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    return [];
  }
};

export const createContaLuz = async (contaLuz) => {
  try {
    const response = await api.post(`/conta-luz`, contaLuz);
    return response.data;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    return null;
  }
};

export const updateContaLuz = async (contaLuz) => {
  try {
    const response = await api.put(`/conta-luz`, contaLuz);
    return response.data;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    return null;
  }
};

export const deleteContaLuz = async (id) => {
  try {
    await api.delete(`/conta-luz/${id}`);
    return true;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    return false;
  }
};

export const fetchContasLuzByUserId = async (id) => {
  try {
    const response = await api.get(`/conta-luz/user/${id}`);
    return response.data;
  } catch (error) {
    // Trate o erro adequadamente
    console.error(error);
    return [];
  }
};
export const decodeToken = () => {
  try {
    const decodedToken = jwt.decode(toDecode); // Decodifica o token JWT
    const userId = decodedToken.sub; // Obtém o ID do usuário do campo "sub" do token
    const username = decodedToken.username; // Obtém o nome de usuário do campo "username" do token

    // Faça algo com os dados do usuário
    console.log('ID do usuário:', userId);
    console.log('Nome de usuário:', username);
    return userId;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
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

export const deleteMachine = async (id) => {
  try {
    const response = await api.delete(`/machine/${id}`);
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
