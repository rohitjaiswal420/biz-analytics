import { connectTodb } from "../database/database";
import { DataTypes } from "sequelize";
export const categoryModel=async()=>{

    const connection=await connectTodb();
    if(!connection)
    {
        return null;
    }
    
    const categorymodel=connection.define('Category',{

     id:{
        type:DataTypes.INTEGER,
        autoIncrement:true
     },
    
     categoryId:{
        
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
     },
     categoryName:{
        
        type:DataTypes.STRING,
        allowNull:false
     },
    
     



    })

    await connection.sync();
    return categorymodel;

    
}