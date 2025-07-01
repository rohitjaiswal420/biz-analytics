import { connectTodb } from '../../app/database/database.js'
import { DataTypes} from 'sequelize';


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

export const galleryModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const gallerymodel = connection.define('Gallery', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
       
        galleryImage:{

            type:DataTypes.STRING,
            allowNull:false
        },
        alt:{

            type:DataTypes.STRING,
            
        }


    })

    await connection.sync();
    return gallerymodel;
}