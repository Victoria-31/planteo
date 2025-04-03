import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  hashed_password: string;
};

class userRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (name, role, email, hashed_password) values ( ?, ?, ?, ?)",
      [user.name, user.email, user.role, user.hashed_password],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );
    return rows[0] as User;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    return rows[0] as User;
  }
}

export default new userRepository();
