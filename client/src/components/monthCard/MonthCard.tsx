export default function MonthCard({ month, plants }: MonthCardProps) {
  const plantsHarvestByMonth = plants.filter((plant) => {
    return plant.harvest_months[0].split(",").includes(month);
  });
  const plantsSeedlingByMonth = plants.filter((plant) => {
    return plant.seedling_months[0].split(",").includes(month);
  });

  return (
    <article className="month-card">
      <h3>{month}</h3>
      <h4> Je récolte :</h4>
      <ul>
        {plantsHarvestByMonth.map((plant) => (
          <li key={plant.id}>
            <h5>{plant.name}</h5>
          </li>
        ))}
      </ul>
      <h4> Je sème : </h4>
      <ul>
        {plantsSeedlingByMonth.map((plant) => (
          <li key={plant.id}>
            <h5>{plant.name}</h5>
          </li>
        ))}
      </ul>
    </article>
  );
}
