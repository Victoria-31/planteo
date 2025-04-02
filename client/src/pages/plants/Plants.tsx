import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [earthType, setEarthType] = useState<string>("");

  useEffect(() => {
    const queryParams: { [key: string]: string } = {};

    if (searchTerm) {
      queryParams.name = searchTerm;
    }

    if (earthType) {
      queryParams.earth_type = earthType;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/plants?${queryString}`, { replace: true });
  }, [searchTerm, earthType, navigate]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEarthTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEarthType(event.target.value);
  };

  return (
    <main className="plants">
      <header>
        <h1>Recherche ta plante</h1>
      </header>
      <section>
        <article className="filter">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={earthType} onChange={handleEarthTypeChange}>
            <option value="">Sélectionner le type de terre</option>
            <option value="Terre légère et bien drainée">
              Terre légère et bien drainée
            </option>
            <option value="Terre argileuse">Terre argileuse</option>
            <option value="Terre sableuse">Terre sableuse</option>
          </select>
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
