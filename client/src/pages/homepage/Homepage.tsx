import "./homePage.css";
import { useLoaderData } from "react-router-dom";
import PlantCard from "../../components/plantCard/PlantCard";
interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
}

export default function Homepage() {
  const plants = useLoaderData() as Plant[];
  console.info(plants);
  return (
    <main>
      <header>
        <h1>Plantéo</h1>
        <p>L'atlas du Potager</p>
      </header>
      <section>
        <h2>Explore 🌱</h2>
        <p> Découvre les plantes déjà référencés</p>
        <ul className="scroll-card-container">
          {plants.map((plant) => (
            <li key={plant.id}>
              <PlantCard plant={plant} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>
          🌱 Découvrez, cultivez et enrichissez Plantéo en proposant de
          nouvelles plantes pour un potager toujours plus vivant !
        </h2>
      </section>
      <section>
        <h2>
          🌱 Découvrez, cultivez et enrichissez Plantéo en proposant de
          nouvelles plantes pour un potager toujours plus vivant !
        </h2>
      </section>
      <section>
        <h2>
          🌱 Découvrez, cultivez et enrichissez Plantéo en proposant de
          nouvelles plantes pour un potager toujours plus vivant !
        </h2>
      </section>
      <section>
        <h2>
          🌱 Découvrez, cultivez et enrichissez Plantéo en proposant de
          nouvelles plantes pour un potager toujours plus vivant !
        </h2>
      </section>
    </main>
  );
}
