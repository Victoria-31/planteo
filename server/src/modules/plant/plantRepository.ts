import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Plant = {
  id: number;
  name: string;
  words: string;
  background: string;
  description: string;
  watering: string;
  earth_id: number;
  seedling_months: number[];
  harvest_months: number[];
};

class plantRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      ` SELECT 
      p.id, 
      p.name, 
      p.words, 
      p.background, 
      p.description, 
      p.watering, 
      e.type AS earth_type,
      GROUP_CONCAT(DISTINCT sm.name ORDER BY sm.id ASC) AS seedling_months,
      GROUP_CONCAT(DISTINCT hm.name ORDER BY hm.id ASC) AS harvest_months
    FROM plant p
    JOIN earth e ON p.earth_id = e.id
    LEFT JOIN plant_seedling ps ON p.id = ps.plant_id
    LEFT JOIN seedling s ON ps.seedling_id = s.id
    LEFT JOIN seedling_months sm_rel ON s.id = sm_rel.seedling_id
    LEFT JOIN month sm ON sm_rel.month_id = sm.id
    LEFT JOIN plant_harvest ph ON p.id = ph.plant_id
    LEFT JOIN harvest h ON ph.harvest_id = h.id
    LEFT JOIN harvest_months hm_rel ON h.id = hm_rel.harvest_id
    LEFT JOIN month hm ON hm_rel.month_id = hm.id
    GROUP BY p.id, e.type`,
    );

    return rows;
  }

  async readByCategory(conditions: { [key: string]: string | string[] }) {
    let sql = `
      SELECT
        p.id,
        p.name,
        p.words,
        p.background,
        e.type AS earth_type
      FROM plant p
      JOIN earth e ON p.earth_id = e.id
    `;

    const queryParams = [];
    const conditionClauses = [];

    for (const [key, value] of Object.entries(conditions)) {
      if (value === undefined || value === null || value === "NaN") {
        console.warn(`Skipping invalid condition: ${key} = ${value}`);
        continue;
      }

      if (Array.isArray(value) && value.length > 0) {
        const placeholders = value.map(() => "?").join(", ");
        conditionClauses.push(`${key} IN (${placeholders})`);
        queryParams.push(...value);
      } else if (typeof value === "string" && value.trim() !== "") {
        if (key === "earth_type") {
          conditionClauses.push("e.type = ?");
          queryParams.push(value);
        } else if (key === "name") {
          conditionClauses.push("p.name LIKE ?");
          queryParams.push(`%${value}%`);
        } else {
          conditionClauses.push(`${key} = ?`);
          queryParams.push(value);
        }
      }
    }
    if (conditionClauses.length > 0) {
      sql += ` WHERE ${conditionClauses.join(" AND ")}`;
    }

    const [rows] = await DatabaseClient.query<Rows>(sql, queryParams);

    return rows;
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
    p.id, 
    p.name, 
    p.words, 
    p.background, 
    p.description, 
    p.watering, 
    e.type AS earth_type,
    JSON_ARRAY(GROUP_CONCAT(DISTINCT sm.name)) AS seedling_months,
    JSON_ARRAY(GROUP_CONCAT(DISTINCT hm.name)) AS harvest_months
    FROM plant p
    JOIN earth e ON p.earth_id = e.id
    LEFT JOIN plant_seedling ps ON p.id = ps.plant_id
    LEFT JOIN seedling s ON ps.seedling_id = s.id
    LEFT JOIN seedling_months sm_rel ON s.id = sm_rel.seedling_id
    LEFT JOIN month sm ON sm_rel.month_id = sm.id
    LEFT JOIN plant_harvest ph ON p.id = ph.plant_id
    LEFT JOIN harvest h ON ph.harvest_id = h.id
    LEFT JOIN harvest_months hm_rel ON h.id = hm_rel.harvest_id
    LEFT JOIN month hm ON hm_rel.month_id = hm.id
    WHERE p.id = ?
    GROUP BY p.id, e.type;`,
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(plant: Plant) {
    const [result] = await DatabaseClient.query<Result>(
      `UPDATE plant 
        SET name = ?, words = ?, background = ?, description = ?, watering = ?, earth_id = ?
        WHERE id = ?`,
      [
        plant.name,
        plant.words,
        plant.background,
        plant.description,
        plant.watering,
        plant.earth_id,
        plant.id,
      ],
    );

    await DatabaseClient.query(
      "DELETE FROM harvest_months WHERE harvest_id = ?",
      [plant.id],
    );

    for (const monthId of plant.harvest_months) {
      await DatabaseClient.query(
        "INSERT INTO harvest_months (harvest_id, month_id) VALUES (?, ?)",
        [plant.id, monthId],
      );
    }

    await DatabaseClient.query(
      "DELETE FROM seedling_months WHERE seedling_id = ?",
      [plant.id],
    );

    for (const monthId of plant.seedling_months) {
      await DatabaseClient.query(
        "INSERT INTO seedling_months (seedling_id, month_id) VALUES (?, ?)",
        [plant.id, monthId],
      );
    }

    return result.affectedRows;
  }
}

export default new plantRepository();
