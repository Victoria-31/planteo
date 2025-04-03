import "./plantCard.css";
import { Link } from "react-router-dom";

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className="plant-card">
      <img src={`${plant.background}`} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.words}</p>
      <Link to={`/plantdetails/${plant.id}`}> Je veux tous savoir 🧐</Link>
    </article>
  );
}
