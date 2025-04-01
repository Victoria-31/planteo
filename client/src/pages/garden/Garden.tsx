import "./garden.css";
import axios from "axios";
import { useRevalidator } from "react-router-dom";

import { useLoaderData } from "react-router-dom";
import PlantCard from "../../components/plantCard/PlantCard";
interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
}

export default function Garden() {
  const plants = useLoaderData() as Plant[];
  const { revalidate } = useRevalidator();
  const deletePlants = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/userplants/${id}`)
        .then(() => {
          revalidate();
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'offre :", error);
        });
    }
  };
  return (
    <main className="garden">
      <header>
        <h1>Mon jardin</h1>
      </header>
      <section className="my-plants">
        <article className="explore">
          <h2>Mes plantes 🌱</h2>
          <img className="arrow" src="./arrow.svg" alt="" />
        </article>
        <section className="scroll-card-container">
          {plants.map((plant) => (
            <section key={plant.id}>
              <PlantCard plant={plant} />
              <div>
                <button type="button">Modifier</button>
                <button type="button" onClick={() => deletePlants(plant.id)}>
                  Supprimer
                </button>
              </div>
            </section>
          ))}
        </section>
      </section>
    </main>
  );
}
