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
         autoIncrement: true,
         primaryKey: true
      },

     
      
      imageUrl: {

         type: DataTypes.STRING,
         allowNull: false
      },
      clientId:{
        
         type: DataTypes.STRING,
         allowNull: false
      },
     
  })

   await connection.sync();
   return imagemodel;


}