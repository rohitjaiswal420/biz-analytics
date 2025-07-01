import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const imageModel = async () => {

   const connection = await connectTodb();
   if (!connection) {
      return null;
   }

   const imagemodel = connection.define('Image', {

      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true
      },

      imageId: {

         type: DataTypes.STRING,
         primaryKey: true,
         defaultValue:String(Date.now())
      },
      altTag: {

         type: DataTypes.STRING,
         
      },
      imageUrl: {

         type: DataTypes.STRING,
         allowNull: false
      },
      categoryId:{
        
         type: DataTypes.STRING,
         allowNull: false
      },
      serial:{
         type: DataTypes.INTEGER,
         allowNull: false
      }


   })

   await connection.sync();
   return imagemodel;


}