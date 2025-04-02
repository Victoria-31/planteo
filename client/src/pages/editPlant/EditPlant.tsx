import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "./editPlant.css";

interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  description: string;
  watering: string;
  earth_id: number;
  seedling_months: number[];
  harvest_months: number[];
}
interface EarthType {
  id: number;
  type: string;
}

export default function EditPlant() {
  const { plant, earthTypes } = useLoaderData() as {
    plant: Plant;
    earthTypes: EarthType[];
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [editPlant, setEditPlant] = useState<Plant>({
    id: plant.id,
    name: plant.name,
    words: plant.words,
    background: plant.background,
    description: plant.description,
    watering: plant.watering,
    earth_id: plant.earth_id,
    seedling_months: plant.seedling_months,
    harvest_months: plant.harvest_months,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditPlant((prevPlant) => ({
      ...prevPlant,
      [name]: name === "earth_id" ? Number(value) : value,
    }));
  };

  const handleMonthsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldName: "seedling_months" | "harvest_months",
  ) => {
    const options = e.target.options;
    const selectedMonths = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));

    setEditPlant((prevPlant) => ({
      ...prevPlant,
      [fieldName]: selectedMonths,
    }));
  };
  const handleEditPlant = async (editPlant: Plant) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/plants/${plant.id}`,
        editPlant,
      );
      setErrorMessage("");

      toast.success("Plante modifiée avec succès !", {
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
        console.error("Erreur lors de la modification de la plante :", error);
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
    <main className="editPlant">
      <header>
        <h2>Modification du potager</h2>
      </header>
      <h1>{plant.name}</h1>
      <div className="navigation">
        <Link to="/plants">🌿 Toute les plantes </Link>
      </div>
      <section className="plantInfo">
        <img src={plant.background} alt={plant.name} className="plantImage" />
        <article>
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={editPlant.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              value={editPlant.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Type de terre :
            <select
              name="earth_id"
              value={editPlant.earth_id}
              onChange={handleInputChange}
            >
              {earthTypes.map((earth) => (
                <option key={earth.id} value={earth.id}>
                  {earth.type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Période de semis :
            <select
              multiple
              name="seedling_months"
              onChange={(e) => handleMonthsChange(e, "seedling_months")}
              value={editPlant.seedling_months.map(String)}
            >
              <option value={1}>Janvier</option>
              <option value={2}>Février</option>
              <option value={3}>Mars</option>
              <option value={4}>Avril</option>
              <option value={5}>Mai</option>
              <option value={6}>Juin</option>
              <option value={7}>Juillet</option>
              <option value={8}>Août</option>
              <option value={9}>Septembre</option>
              <option value={10}>Octobre</option>
              <option value={11}>Novembre</option>
              <option value={12}>Décembre</option>
            </select>
          </label>
          <label>
            Période de récolte :
            <select
              multiple
              name="harvest_months"
              onChange={(e) => handleMonthsChange(e, "harvest_months")}
              value={editPlant.harvest_months.map(String)}
            >
              <option value={1}>Janvier</option>
              <option value={2}>Février</option>
              <option value={3}>Mars</option>
              <option value={4}>Avril</option>
              <option value={5}>Mai</option>
              <option value={6}>Juin</option>
              <option value={7}>Juillet</option>
              <option value={8}>Août</option>
              <option value={9}>Septembre</option>
              <option value={10}>Octobre</option>
              <option value={11}>Novembre</option>
              <option value={12}>Décembre</option>
            </select>
          </label>
        </article>
      </section>
      <p className="errorMessage">{errorMessage ? errorMessage : ""}</p>
      <button type="button" onClick={() => handleEditPlant(editPlant)}>
        Modifier la plante
      </button>
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
