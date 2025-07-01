"use server"
import { blogModel } from "../../../app/models/blog.model";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs'
import sharp from "sharp";
import { Op } from "sequelize";
export async function POST(request) {

    const input=await request.formData();
    const file=input.get('file');
    const { blogTitle,blogDescription, blogContent, blogUrl, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogCategory, blogStatus,blogId } = JSON.parse(input.get('data'));
    const blogmodel = await blogModel();
   
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    


    try {

        if(file!=='null')
        {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
            const resizedImage = await sharp(buffer)
                .resize(723, 489)
                .toFormat("jpeg")
                .toBuffer();
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, resizedImage);
    
            const imageUrl = `/api/get-image?imageName=${filename}`;
            await blogmodel.update({ blogTitle, blogImage: imageUrl, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogCategory, blogStatus,blogUrl }, { where: { blogId } })
        }
        else{

            await blogmodel.update({ blogTitle, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogCategory, blogStatus,blogUrl }, { where: { blogId } })
        }
       
        return NextResponse.json({ status: true, message: "blog updated successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}