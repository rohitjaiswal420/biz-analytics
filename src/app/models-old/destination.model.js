import { connectTodb } from '../../app/database/database.js'
import { DataTypes } from 'sequelize';



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


export const destinationModel = async () => {

    const connection = await connectTodb();
    if (!connection) {
        return null;
    }

    const destinationmodel = connection.define('Destination', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        destinationId: {
            type: DataTypes.STRING,
            defaultValue: randomGenerator(),
            primaryKey: true,
            allowNull: false
        },
        destinationName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        placeId: {

            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true

        },
        destinationSerial:{

            type:DataTypes.INTEGER,
            allowNull:false
        },
        thumbnailImage: {

            type: DataTypes.STRING,
            allowNull: false,
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
        duration: {

            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {

            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {

            type: DataTypes.STRING,
            allowNull: false,
        },
        services: {
            type: DataTypes.JSONB,
        }, 
        exclusion: {
            type: DataTypes.JSONB,
        },
        itinerary: {

            type: DataTypes.JSONB,
            //allowNull: false
        },
        location: {

            type: DataTypes.TEXT
        },
        gallery: {

            type: DataTypes.JSONB,
        },
        destinationContent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        offerDiscount:{
           
            type:DataTypes.INTEGER,
        },
        offerImage:{
           
            type:DataTypes.STRING,
        },
        offerTime:{
           
            type:DataTypes.STRING,
        }


    })

    await connection.sync();
    return destinationmodel;
}