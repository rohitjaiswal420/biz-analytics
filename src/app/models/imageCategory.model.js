import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const categoryModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const categorymodel = connection.define('ImageCategory', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        categoryId: {

            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: String(Date.now())
        },

        categoryName: {

            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        serial: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }



    })

    await connection.sync();
    return categorymodel;


}