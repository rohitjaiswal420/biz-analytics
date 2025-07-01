import {connectTodb} from '../database/database.js'
import { DataTypes } from 'sequelize';


export const pageModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const pagemodel = connection.define('Page', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        mainTitle:{

            type: DataTypes.STRING,
            allowNull: false,
        },
        bannerImage:{

            type:DataTypes.STRING,
            allowNull:false
        },
        // shortContent:{

        //     type:DataTypes.STRING,
        //     allowNull:false
        // },
        pageType:{

            type:DataTypes.STRING,
            allowNull:false
        },
        pageId: {
            type: DataTypes.STRING,
            defaultValue: String(Date.now()),
            primaryKey: true,
            allowNull: false
        },
       
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true

        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
      
       
        metaKeywords: {
            type: DataTypes.STRING(5000)
        },
        metaDescriptions: {

            type: DataTypes.STRING(5000)
        },
        metaTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishedDate: {

            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
        sections: {
            type: DataTypes.JSONB,
            //allowNull: false
        },
     


    })

    await connection.sync();
    return pagemodel;
}