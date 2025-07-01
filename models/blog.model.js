import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const blogModel = async () => {

   const connection = await connectTodb();
   if (!connection) {
      return null;
   }

   const blogmodel = connection.define('Blog', {

      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true
      },
      blogUrl: {

         type:DataTypes.STRING,
         allowNull:false,
         unique:true
      },
      blogId: {

         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false
      },
      blogTitle: {

         type: DataTypes.STRING,
         allowNull: false
      },

      blogImage: {

         type: DataTypes.STRING,
         allowNull: false

      },
      blogDescription: {

         type: DataTypes.TEXT,
         allowNull: false
      },
      blogContent: {

         type: DataTypes.TEXT,
         allowNull: false
      },
      blogCategory: {

         type: DataTypes.STRING,
         allowNull: false

      },
      blogSerial: {

         type: DataTypes.INTEGER,
         allowNull: false

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
      blogStatus: {
         type: DataTypes.BOOLEAN,
         defaultValue: true
      },
      blogTags: {
         type: DataTypes.JSONB
      }



   })

   await connection.sync();
   return blogmodel;


}