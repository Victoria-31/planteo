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

const getUserPlants = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/userplants`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export { getAllPlants, getPlantDetails, getUserPlants };
