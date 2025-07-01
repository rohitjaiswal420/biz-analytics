import {connectTodb} from '../database/database.js'
import { DataTypes } from 'sequelize'

const charArray=["9","a","1","O","b" ,"A","c","P", "d" ,"8","B","e","T","C","f","U","g" ,"0","h", "D","i", "E","j", "7","V","F","k" ,"l","G", "m" ,"n", "o" ,"p", "q" ,"r", "s", "t", "u" ,"v","3" ,"w" ,"6","2","Q","R","J","X","x","I","5", "K","y", "W","L","4","H","z","M","N","S","Y","Z","_","-"]




const randomIdx=()=>{
    return Math.floor(Math.random()*64);
}

const randomGenerator=()=>{


 let string="";
 for (let index = 1; index <= 15 ; index++) {
    const element = charArray[randomIdx()];
    string+=element;
 }

 return string;


}

export const slugModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const slugmodel = connection.define('Slug', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        slugId: {
            type: DataTypes.STRING,
            defaultValue: randomGenerator(),
            primaryKey: true,
            allowNull: false
        },
       
      
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
      
       publishedDate: {

            type: DataTypes.STRING,
            defaultValue: new Date().toLocaleDateString()
        },
       
     


    })

    await connection.sync();
    return slugmodel;
}