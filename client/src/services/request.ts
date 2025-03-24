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

export { getAllPlants };
