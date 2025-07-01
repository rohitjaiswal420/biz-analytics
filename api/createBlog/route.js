"use server"
import { blogModel } from "../../../app/models/blog.model";
import { NextResponse } from "next/server";
import { sliderModel } from '@/app/models/slider.model.js'
import { destinationModel } from "../../models/destination.model";
import { galleryModel } from "../../models/gallery.model";
import { testimonialModel } from '@/app/models/testimonials.model';
import path from "path";

import sharp from "sharp";
import fs from 'fs'

function randomNumbers() {
    return String(Math.floor(Math.random() * 9000 + 1000));
}

export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { blogTitle, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogCategory,blogUrl } = JSON.parse(input.get('data'));
    const blogmodel = await blogModel();

    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const isExistblog=await blogmodel.findOne({where:{blogUrl}});
    if(isExistblog)
    {
        return NextResponse.json({ status: false, message: "Choose different url!" });
    }


    const blogId = String(new Date().getMilliseconds()) + randomNumbers();

    try {

             const buffer = Buffer.from(await file.arrayBuffer());
             const filename= String(Date.now())+file.name.replaceAll(' ', '-');

           

              const resizedImage = await sharp(buffer)
              .resize(723, 489, {
                fit: "contain", // Use "contain" to preserve aspect ratio & add background
                background: { r: 255, g: 255, b: 255, alpha: 1 }, // White background
              })
              .toFormat("jpeg")
              .toBuffer();
              const uploadDir = path.join(process.cwd(), "uploads");
              if (!fs.existsSync(uploadDir)) {
                  fs.mkdirSync(uploadDir, { recursive: true });
              }
      
              const filePath = path.join(uploadDir, filename);
              fs.writeFileSync(filePath, resizedImage);
      
              const imageUrl = `/api/get-image?imageName=${filename}`;


        await blogmodel.create({
            blogId, blogTitle, blogImage: imageUrl, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogCategory,blogUrl
        })

        return NextResponse.json({ status: true, message: "blog created successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}


export async function GET(request) {


    

    const data = await Promise.all([sliderModel(), destinationModel(), galleryModel(), blogModel(), testimonialModel()])

    try {



        const datalist = await Promise.all([data[0].findAll({ order: [['sliderSerial', 'ASC']] }), data[1].findAll({ order: [['destinationSerial', 'ASC']] }), data[2].findAll(), data[3].findAll({where:{blogStatus:true}, order: [['blogSerial', 'ASC']] }), data[4].findAll({ order: [['createdAt', 'DESC']] })])


        return NextResponse.json({ status: true, bloglist: datalist[3], sliderlist: datalist[0], destinationlist: datalist[1], gallerylist: datalist[2], testimoniallist: datalist[4] });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}

export async function DELETE(request) {

    const { blogId } = await request.json();
    const blogmodel = await blogModel();

    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await blogmodel.destroy({ where: { blogId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}