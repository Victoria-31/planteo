import "./monthcard.css";
export default function MonthCard({ month, plants }: MonthCardProps) {
  const plantsHarvestByMonth = plants.filter((plant) => {
    return plant.harvest_months[0].split(",").includes(month);
  });
  const plantsSeedlingByMonth = plants.filter((plant) => {
    return plant.seedling_months[0].split(",").includes(month);
  });

  return (
    <>
      <h3>{month}</h3>

      <article className="month-card">
        <ul>
          <h4>Je récolte :</h4>
          {plantsHarvestByMonth.length > 0 ? (
            plantsHarvestByMonth.map((plant) => (
              <li key={plant.id}>
                <h5>{plant.name}</h5>
              </li>
            ))
          ) : (
            <li>Rien à récolter ce mois-ci</li>
          )}
        </ul>

        <ul>
          <h4>Je sème :</h4>
          {plantsSeedlingByMonth.length > 0 ? (
            plantsSeedlingByMonth.map((plant) => (
              <li key={plant.id}>
                <h5>{plant.name}</h5>
              </li>
            ))
          ) : (
            <li>Rien à semer ce mois-ci</li>
          )}
        </ul>
      </article>
    </>
  );
}
