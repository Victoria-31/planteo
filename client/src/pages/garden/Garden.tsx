import "./garden.css";
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
                <button type="button">Supprimer</button>
              </div>
            </section>
          ))}
        </section>
      </section>
    </main>
  );
}
