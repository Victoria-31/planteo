import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  hashed_password: string;
};

type UserDefault = {
  id: number;
  email: string;
  name: string;
  hashed_password: string;
};

class userRepository {
  async create(newUser: Omit<UserDefault, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (name, email, hashed_password) values ( ?, ?, ?)",
      [newUser.name, newUser.email, newUser.hashed_password],
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user ");
    return rows;
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
