import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class plantRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
            p.id, 
            p.name, 
            p.words, 
            p.background, 
            e.type AS earth_type 
          FROM plant p
          JOIN earth e ON p.earth_id = e.id`,
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
        WHERE p.id = ?
        GROUP BY p.id, e.type;`,
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }
}

export default new plantRepository();
