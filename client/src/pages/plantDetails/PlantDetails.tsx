import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";

import "./plantDetails.css";

interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  description: string;
  watering: string;
  earth_type: string;
  seedling_months: string;
  harvest_months: string;
}

interface PlantUser {
  plant_id: number;
}

export default function PlantDetails() {
  const plant = useLoaderData() as Plant;
  const totalPlants = 19;
  const nextPlantId = plant.id < totalPlants ? plant.id + 1 : 1;

  const [errorMessage, setErrorMessage] = useState("");

  const newPlantUser = {
    plant_id: plant.id,
  };
  const { role } = useAuth();

  const handleAddPlant = async (newPlantUser: PlantUser) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/userplants`,
        newPlantUser,
        {
          withCredentials: true,
        },
      );
      setErrorMessage("");

      toast.success("Plante ajoutée avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de l'ajout de la plante :", error);
        setErrorMessage(error.response?.data.error);
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Une erreur inattendue s'est produite :", error);
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <main className="plantDetails">
      <header>
        <h2>L'atlas du potager</h2>
      </header>
      <h1>{plant.name}</h1>
      <div className="navigation">
        <Link to="/plants">🌿 Toute les plantes - </Link>

        <Link
          onClick={() => setErrorMessage("")}
          to={`/plantdetails/${nextPlantId}`}
        >
          Suivante 🌿
        </Link>
      </div>
      <section className="plantInfo">
        <img src={plant.background} alt={plant.name} className="plantImage" />
        <article>
          <p className="plantDescription">{plant.description}</p>
          <p>
            <strong>🚿 Arrosage :</strong> {plant.watering}
          </p>
          <p>
            <strong>Type de terre :</strong> {plant.earth_type}
          </p>
          <p>
            <strong>🫘 Période de semis :</strong>{" "}
            {plant.seedling_months[0].split(",").join(", ")}
          </p>
          <p>
            <strong>Période de récolte :</strong>{" "}
            {plant.harvest_months[0].split(",").join(", ")}
          </p>
        </article>
      </section>

      <p className="errorMessage">{errorMessage ? errorMessage : ""}</p>

      {role !== "anonymous" ? (
        <button
          type="button"
          className="add-plant"
          onClick={() => handleAddPlant(newPlantUser)}
        >
          Ajouter à mon jardin
        </button>
      ) : (
        ""
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </main>
  );
}
