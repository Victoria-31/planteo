import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class seedlingRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(`
      SELECT p.name AS plant_name, 
             GROUP_CONCAT(m.name ORDER BY m.id ASC) AS seedling_months
      FROM plant p
      JOIN plant_seedling ps ON p.id = ps.plant_id
      JOIN seedling_months sm ON ps.seedling_id = sm.seedling_id
      JOIN month m ON sm.month_id = m.id
      GROUP BY p.id;
    `);

    return rows;
  }
}

export default new seedlingRepository();
