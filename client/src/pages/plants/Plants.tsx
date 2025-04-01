import { useLoaderData } from "react-router-dom";
import PlantCard from "../../components/plantCard/PlantCard";
import "./plants.css";
interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
}
export default function Plants() {
  const plants = useLoaderData() as Plant[];

  return (
    <main className="plants">
      <header>
        <h1>Recherche ta plante</h1>
      </header>
      <section>
        <article className="filter">
          <p> Filtre / filtre / filtre</p>
        </article>
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              <PlantCard plant={plant} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
