import "./garden.css";
import axios from "axios";
import { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import MonthCard from "../../components/monthCard/MonthCard";
import PlantCard from "../../components/plantCard/PlantCard";
import { useAuth } from "../../services/AuthContext";

export default function Garden() {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const plants = useLoaderData() as Plant[];
  const { revalidate } = useRevalidator();

  const { role } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(null as null | string);

  const deletePlant = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette plante ?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/userplants/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          revalidate();
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la plante :", error);
        });
    }
  };

  const displayCard = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <main className="garden">
      <header>
        <h1>Mon jardin</h1>
      </header>
      <section className="my-plants">
        <article className="explore">
          <h2>Mes plantes 🌱</h2>
          <img className="arrow" src="./arrow.svg" alt="Arrow" />
        </article>
        <section className="scroll-card-container">
          {plants.map((plant) => (
            <section key={plant.id}>
              <PlantCard plant={plant} />
              <div>
                {role === "admin" ? (
                  <Link to={`/edit-plant/${plant.id}`}>Modifier</Link>
                ) : (
                  ""
                )}
                <button type="button" onClick={() => deletePlant(plant.id)}>
                  Supprimer
                </button>
              </div>
            </section>
          ))}
        </section>
      </section>
      <section className="whatDo">
        <h2>Que faire ? 🐸 </h2>
        <section className="scroll-card-container">
          {months.map((month) => (
            <article key={month}>
              <button type="button" onClick={() => displayCard(month)}>
                {month}
              </button>
            </article>
          ))}
        </section>
      </section>
      {selectedMonth && <MonthCard month={selectedMonth} plants={plants} />}
    </main>
  );
}
