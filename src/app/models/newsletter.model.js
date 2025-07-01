import { DataTypes } from 'sequelize';
import {connectTodb} from '../database/database.js'

export const newsletterModel=async()=>{

    const connection=await connectTodb();
    if(!connection)
    {
        return null;
    }

    const newslettermodel=connection.define('News',{

        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true
        },
        newsId:{
            type:DataTypes.STRING,
            primaryKey:true,
            defaultValue:String(Date.now())
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        date:{

           type:DataTypes.STRING,
           defaultValue:new Date().toLocaleDateString()
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    })

    await connection.sync();
    return newslettermodel
}