import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

// type Offer = {
//   id: number;
//   title: string;
//   city: string;
//   background: string;
//   description: string;
//   salary: number;
//   profile: string;
//   work_condition_id: number;
//   company_id: number;
//   contract_id: number;
// };

// type City = {
//   id: number;
//   name: string;
// };

class plantRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT id, name, words, background FROM plant",
    );

    return rows;
  }
}

export default new plantRepository();
