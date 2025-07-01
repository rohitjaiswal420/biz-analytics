import { DataTypes } from "sequelize";
import { connectTodb } from "../database/database";



export const roleModel=async()=>{

const connection=await connectTodb();

if(!connection)
{
    return null;
}

const rolemodel=connection.define('Role',{

 id:{

    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
 },
 usertype:{

    type:DataTypes.STRING,
    unique:true,
    allowNull:false

 },
 access:{
    
    type:DataTypes.JSONB,
    
 },
 status:{

    type:DataTypes.BOOLEAN,
    defaultValue:true,
    
 },
 date:{

    type:DataTypes.STRING,
    defaultValue:new Date().toLocaleDateString(),

 }



})

await connection.sync();
return rolemodel;


}