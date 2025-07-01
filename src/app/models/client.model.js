import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const clientModel = async () => {

   const connection = await connectTodb();
   if (!connection) {
      return null;
   }

   const clientmodel = connection.define('Client', {

      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true
      },

      clientId: {

         type: DataTypes.STRING,
         primaryKey: true,
         defaultValue:String(Date.now())
      },
      altTag: {

         type: DataTypes.STRING,
         
      },
      thumbnailImage: {

         type: DataTypes.STRING,
         allowNull: false
      },
      categoryId:{
        
         type: DataTypes.STRING,
         allowNull: false
      },
      categoryName:{
         type: DataTypes.STRING,
         allowNull: false
      },
      serial:{
         type: DataTypes.INTEGER,
         allowNull: false
      },
      clientName:{
         type: DataTypes.STRING,
         allowNull: false,
         unique:true
      }



   })

   await connection.sync();
   return clientmodel;


}