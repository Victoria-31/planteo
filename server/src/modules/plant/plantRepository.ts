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
}

export default new plantRepository();
