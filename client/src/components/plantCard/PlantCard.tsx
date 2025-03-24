import "./plantCard.css";
interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
}

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <article className="plant-card">
      <img src={`${plant.background}`} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.words}</p>
    </article>
  );
}
