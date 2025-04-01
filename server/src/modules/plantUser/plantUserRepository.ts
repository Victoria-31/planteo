import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class PlantUserRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
    p.id, 
    p.name, 
    p.words, 
    p.background, 
    e.type AS earth_type 
FROM plantuser pu
JOIN plant p ON pu.plant_id = p.id
JOIN earth e ON p.earth_id = e.id;
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
