import axios from "axios";

const getAllPlants = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/plants`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des plantes : ", error);
    });
};

const getPlantDetails = (id: string | undefined) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/plants/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getPlantsSearch = (earthType: string, name: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/plants-search`, {
      params: {
        earth_type: earthType,
        name: name,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getUserPlants = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/userplants`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
const getEarth = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/earth`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getAllPlants,
  getPlantDetails,
  getUserPlants,
  getPlantsSearch,
  getEarth,
};
