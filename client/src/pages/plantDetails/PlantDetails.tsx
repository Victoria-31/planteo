import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import "./plantDetails.css";
interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  description: string;
  watering: string;
  earth_type: string;
  seedling_months?: string;
  harvest_months?: string;
}

export default function PlantDetails() {
  const plant = useLoaderData() as Plant;
  const totalPlants = 4;
  const prevPlantId = plant.id > 1 ? plant.id - 1 : 1;
  const nextPlantId = plant.id < totalPlants ? plant.id + 1 : totalPlants;
  return (
    <main className="plantDetails">
      <header>
        <h2>L'atlas du potager</h2>
      </header>
      <h1>{plant.name}</h1>
      <div className="navigation">
        <Link to={`/plantdetails/${prevPlantId}`}>🌿 Précédente 🌿 </Link>
        <Link to={`/plantdetails/${nextPlantId}`}>Suivante 🌿</Link>
      </div>{" "}
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

          {plant.seedling_months && (
            <p>
              <strong>🫘 Période de semis :</strong> {plant.seedling_months}
            </p>
          )}
          {plant.harvest_months && (
            <p>
              <strong>Période de récolte :</strong> {plant.harvest_months}
            </p>
          )}
        </article>
      </section>
      <Link to="/plants">Toute les plantes 🌿</Link>
      <button type="button"> Ajouter à mon jardin</button>
    </main>
  );
}
