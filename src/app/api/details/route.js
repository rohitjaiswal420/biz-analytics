import { NextResponse } from "next/server";
import { detailsModel } from "../../models/details.model";
// import { pageModel } from "@/app/models/pages.model";
import { connectTodb } from "@/app/database/database";
import path from 'path'
import fs from 'fs'

export async function POST(request) {

    const input = await request.formData();
    const darkLogo = input.get('dark-logo');
    const lightLogo = input.get('light-logo');
    const { phoneNumber, email, address, socialMedia,content,detailsId,location } = JSON.parse(input.get('data'));
    const detailsmodel = await detailsModel();
    if (!detailsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let darklogo;
        let lightlogo;
        if (darkLogo !== 'null') {

            const buffer=Buffer.from(await darkLogo.arrayBuffer());
            const filename=String(Date.now())+darkLogo.name.replaceAll(' ','-');
            const uploadDir=path.join(process.cwd(),'uploads');
            if(!fs.existsSync(uploadDir))
            {
                fs.mkdirSync(uploadDir ,{ recursive: true });
            }

            const filepath=path.join(uploadDir,filename);
            fs.writeFileSync(filepath,buffer);
            darklogo=`/api/get-image?imageName=${filename}`

        }
        if (lightLogo !== 'null') {

            const buffer=Buffer.from(await lightLogo.arrayBuffer());
            const filename=String(Date.now())+lightLogo.name.replaceAll(' ','-');
            const uploadDir=path.join(process.cwd(),'uploads');
            if(!fs.existsSync(uploadDir))
            {
                fs.mkdirSync(uploadDir ,{ recursive: true });
            }

            const filepath=path.join(uploadDir,filename);
            fs.writeFileSync(filepath,buffer);
            lightlogo=`/api/get-image?imageName=${filename}`
        }
        await detailsmodel.update({
            phoneNumber, email, address, socialMedia, darkLogo: darklogo && darklogo, lightLogo: lightlogo && lightlogo,content,location
        },{where:{detailsId}})

        return NextResponse.json({ status: true, message: "details created successfully!" });

    } catch (error) {

        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}


export async function GET() {

    const detailsmodel = await detailsModel();
    // const pagemodel = await pageModel();
     const connection = await connectTodb();
    if (!detailsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const details=await detailsmodel.findOne({where:{id:1}});
        // const servicelist=await pagemodel.findAll({attributes:['pageId','mainTitle','url'],where:{pageType:'Service Page',status:true},order:[['createdAt','DESC']]})

        const pagelist=await connection.query(`SELECT public."Pages"."pageType" , ARRAY_AGG(jsonb_build_object('pageId',public."Pages"."pageId",'mainTitle',public."Pages"."mainTitle",'url',public."Pages"."url") ORDER BY public."Pages"."createdAt" DESC) AS Menu FROM public."Pages"  WHERE public."Pages"."status"=${true} GROUP BY public."Pages"."pageType" ORDER BY public."Pages"."pageType" DESC`);
     
        return NextResponse.json({status:true,details,pagelist});

    } catch (error) {

        console.log(error);
        
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}