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
    <main className="homepage">
      <header>
        <h1>Plantéo</h1>
        <p>L'atlas du Potager</p>
      </header>
      <section>
        <article className="explore">
          <h2>Explore 🌱</h2>
          <p> Découvre les plantes déjà référencés</p>
          <img className="arrow" src="./arrow.svg" alt="" />
        </article>
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
        <ul>
          <li className="share">
            <h3>🌱 Partage</h3> Propose tes plantes favorites et enrichis
            Plantéo
          </li>
          <div>
            <li>
              <h3>📅 Planifie</h3> Crée des calendriers de semis et de récoltes
              pour chaque plante
            </li>
            <li>
              <h3>🌿 Apprends</h3> Découvre des astuces et conseils pour
              cultiver tes plantes avec succès
            </li>
          </div>
        </ul>
      </section>
    </main>
  );
}
