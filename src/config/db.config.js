import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  logging: false,
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Use `force: true` only in development to drop and recreate tables
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
    await syncDatabase();
  } catch (error) {
    console.log("Unable to connect to database", error.message);
  }
}
