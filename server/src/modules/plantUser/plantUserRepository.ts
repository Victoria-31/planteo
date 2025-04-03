import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class PlantUserRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      ` SELECT
      p.id,
      p.name,
      p.words,
      p.background,
      e.type AS earth_type,
      JSON_ARRAY(GROUP_CONCAT(DISTINCT sm.name)) AS seedling_months,
      JSON_ARRAY(GROUP_CONCAT(DISTINCT hm.name)) AS harvest_months
    FROM plantuser pu
    JOIN plant p ON pu.plant_id = p.id
    JOIN earth e ON p.earth_id = e.id
    LEFT JOIN plant_seedling ps ON p.id = ps.plant_id
    LEFT JOIN seedling s ON ps.seedling_id = s.id
    LEFT JOIN seedling_months sm_rel ON s.id = sm_rel.seedling_id
    LEFT JOIN month sm ON sm_rel.month_id = sm.id
    LEFT JOIN plant_harvest ph ON p.id = ph.plant_id
    LEFT JOIN harvest h ON ph.harvest_id = h.id
    LEFT JOIN harvest_months hm_rel ON h.id = hm_rel.harvest_id
    LEFT JOIN month hm ON hm_rel.month_id = hm.id
    GROUP BY p.id, p.name, p.words, p.background, e.type;
`,
    );

    return rows;
  }

  async create(plantUser: { plant_id: number }) {
    const [result] = await DatabaseClient.query<Result>(
      "insert into plantUser (plant_id) values (?)",
      [plantUser.plant_id],
    );

    return result.insertId;
  }
  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "delete from plantuser where plant_id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new PlantUserRepository();
