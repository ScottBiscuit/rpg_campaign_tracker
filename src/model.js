import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import { type } from "os";

//change to your own database file path
export const db = await connectToDB(
  "postgres://scottjohnstone:admin@localhost:5432/travelBlog"
);

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}