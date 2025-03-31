import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class earthRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from earth");

    return rows;
  }
}

export default new earthRepository();
