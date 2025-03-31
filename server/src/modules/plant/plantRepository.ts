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
  async searchPlants(
    search: string,
    earth: string,
    seedlingMonths: string,
    harvestMonths: string,
  ) {
    let query = `
      SELECT p.*, e.type as earth_type
      FROM plant p
      JOIN earth e ON p.earth_id = e.id
      WHERE 1=1
    `;
    const params: (string | number)[] = [];

    if (search) {
      query += " AND p.name LIKE ?";
      params.push(`%${search}%`);
    }

    if (earth) {
      const earthId = Number(earth);
      if (!Number.isNaN(earthId)) {
        query += " AND p.earth_id = ?";
        params.push(earthId);
      }
    }

    if (seedlingMonths) {
      const months = seedlingMonths
        .split(",")
        .map(Number)
        .filter((n) => !Number.isNaN(n));
      if (months.length > 0) {
        const placeholders = months.map(() => "?").join(",");
        query += ` AND p.id IN (
          SELECT ps.plant_id FROM plant_seedling ps
          JOIN seedling_months sm ON ps.seedling_id = sm.seedling_id
          WHERE sm.month_id IN (${placeholders})
        )`;
        params.push(...months);
      }
    }

    if (harvestMonths) {
      const months = harvestMonths
        .split(",")
        .map(Number)
        .filter((n) => !Number.isNaN(n));
      if (months.length > 0) {
        const placeholders = months.map(() => "?").join(",");
        query += ` AND p.id IN (
          SELECT ph.plant_id FROM plant_harvest ph
          JOIN harvest_months hm ON ph.harvest_id = hm.harvest_id
          WHERE hm.month_id IN (${placeholders})
        )`;
        params.push(...months);
      }
    }

    console.info("Executing SQL Query:", query, "with params:", params);
    try {
      const [rows] = await DatabaseClient.query(query, params);
      return rows;
    } catch (err) {
      console.error("SQL Error:", err);
      throw err;
    }
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
