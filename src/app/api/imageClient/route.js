import { Op } from "sequelize";
import { clientModel } from "../../models/client.model";
 import { categoryModel } from "../../models/imageCategory.model";
import { NextResponse } from "next/server";
import path from 'path'
import fs from 'fs'
export async function POST(request) {

    const input=await request.formData();
    const file=input.get('file');
    const {clientName,serial,categoryId,altTag,categoryName} = JSON.parse(input.get('data'));
    const clientmodel = await clientModel();
    if (!clientmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const isclientexist = await clientmodel.findOne({ where: { clientName } });
    if (isclientexist) {
        return NextResponse.json({ status: false, message: "client already exist!" });
    }

    try {

        let thumbnailImage;
        if(file!=='null')
        {
            const buffer=Buffer.from(await file.arrayBuffer());
            const filename=String(Date.now())+file.name.replaceAll(' ','-');
            const uploadDir=path.join(process.cwd(),'uploads');
            if(!fs.existsSync(uploadDir))
            {
                fs.mkdirSync(uploadDir,{recursive:true});
            }
    
            const filepath=path.join(uploadDir,filename);
            fs.writeFileSync(filepath,buffer);
            thumbnailImage=`/api/get-image/?imageName=${filename}`;
        }
        
        await clientmodel.create({

            clientName,serial,categoryId,altTag,thumbnailImage:thumbnailImage && thumbnailImage,categoryName
        })

        return NextResponse.json({ status: true, message: "client created successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function DELETE(request) {

    const { clientId } = await request.json();
    const clientmodel = await clientModel();
    if (!clientmodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

  

    try {

        await clientmodel.destroy({

            where:{clientId:{[Op.in]:clientId}}
        })

        return NextResponse.json({ status: true, message: "client deleted successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function GET(request)
{
    const input=new URL(request.url).searchParams;
    const name=input.get('name');
    const page=parseInt(input.get('page'));
    const categoryId = input.get('id');
    const clientmodel=await clientModel();
    const categorymodel=await categoryModel();
    if(!clientmodel)
    {
        return NextResponse.json({status:false,message:"some error occured!"});
    }


    try {

        const {categoryName}=await categorymodel.findOne({where:{categoryId}});
        const {rows,count}=await clientmodel.findAndCountAll(
        {
         
         offset:(page-1)*10,
         limit:10,
         where:{categoryId,[Op.or]:{clientName:{[Op.iLike]:`%${name}%`}}},
         order:[['serial','ASC']],
        
        });
        return NextResponse.json({status:true,clientlist:rows,totalItems:count,categoryName}); 

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"}); 
    }

}


export async function PUT(request) {

    const input=await request.formData();
    const file=input.get('file');
    const {clientName,serial,categoryId,altTag,clientId,categoryName} = JSON.parse(input.get('data'));
    const clientmodel = await clientModel();
    if (!clientmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    

    try {

        let thumbnailImage;
        if(file!=='null')
        {
            const buffer=Buffer.from(await file.arrayBuffer());
            const filename=String(Date.now())+file.name.replaceAll(' ','-');
            const uploadDir=path.join(process.cwd(),'uploads');
            if(!fs.existsSync(uploadDir))
            {
                fs.mkdirSync(uploadDir,{recursive:true});
            }
    
            const filepath=path.join(uploadDir,filename);
            fs.writeFileSync(filepath,buffer);
            thumbnailImage=`/api/get-image/?imageName=${filename}`;
        }
        
        await clientmodel.update({
         clientName,serial,categoryId,altTag,thumbnailImage:thumbnailImage && thumbnailImage,categoryName
        },{where:{clientId}})

        return NextResponse.json({ status: true, message: "client updated successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}