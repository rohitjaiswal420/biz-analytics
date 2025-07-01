import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const detailsModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const detailsmodel = connection.define('Detail', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },

        detailsId: {

            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: String(Date.now())
        },
        phoneNumber: {

            type: DataTypes.JSONB,
            allowNull: false
        },
        email: {

            type: DataTypes.JSONB,
            allowNull: false
        },
        address: {

            type: DataTypes.JSONB,
            allowNull: false
        },
        socialMedia: {

            type: DataTypes.JSONB,
            allowNull: false
        },
        darkLogo: {

            type: DataTypes.STRING,
            allowNull: false

        },
        lightLogo: {

            type: DataTypes.STRING,
            allowNull: false

        },
        content:{
         
            type: DataTypes.STRING(500),
            allowNull: false
        },
        location:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        menu:{

            type:DataTypes.JSONB,
            
        }

    })

    await connection.sync();
    return detailsmodel;


}