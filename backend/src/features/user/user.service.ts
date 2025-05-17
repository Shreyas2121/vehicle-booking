import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { TransactionType } from "../../lib/types";

class UserService {
  async createUser(
    userData: typeof usersTable.$inferInsert,
    tx?: TransactionType
  ) {
    const dbT = tx ?? db;
    const user = await dbT.insert(usersTable).values(userData).returning();

    return user[0];
  }
}

export default new UserService();
