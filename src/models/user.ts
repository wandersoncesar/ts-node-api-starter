import { DataTypes, Model, Sequelize } from "sequelize";

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
    {
        email: {
            allowNull: false,
            type: new DataTypes.STRING(100),
        },
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        name: {
            allowNull: false,
            type: new DataTypes.STRING(200),
        },
        password: {
            allowNull: false,
            type: new DataTypes.STRING(100),
        },
    },
    {
        sequelize: new Sequelize({
            database: "api",
            dialect: "sqlite",
            storage: ":memory:",
        }),
        tableName: "user",
    },
);

User.sync({ force: true }).then(() => console.log("User table created"));
