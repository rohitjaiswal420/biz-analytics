import { NextResponse } from "next/server";
import { imageModel } from "../../models/image.model";

import path from 'path'
import fs from 'fs'
import { Op } from "sequelize";

export async function POST(request) {
    const input = await request.formData();
    const file = input.getAll('file');
    const {clientId} = JSON.parse(input.get('data'));
    const imagemodel = await imageModel();
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }


    try {

        let imageUrl=[];
        for(let i=0;i<file.length;i++)
        {
            const buffer = Buffer.from(await file[i].arrayBuffer());
            const uploadDir = path.join(process.cwd(), 'uploads');
            const filename = String(Date.now())+file[i].name.replaceAll(' ', '-');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filepath = path.join(uploadDir, filename);
            fs.writeFileSync(filepath, buffer);
            imageUrl.push({imageUrl:`/api/get-image?imageName=${filename}`,clientId})
        }
     

        await imagemodel.bulkCreate(imageUrl);
        return NextResponse.json({ status: true, message: "image uploaded successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function PUT(request) {
    const input = await request.formData();
    const file = input.get('file');
    const { categoryId, altTag,serial,imageId,subCategory } = JSON.parse(input.get('data'));
    const imagemodel = await imageModel();
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }


    try {

        let imageUrl;
        if (file !== 'null') {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uploadDir = path.join(process.cwd(), 'uploads');
            const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filepath = path.join(uploadDir, filename);
            fs.writeFileSync(filepath, buffer);
            imageUrl = `/api/get-image?imageName=${filename}`
        }

        await imagemodel.update({
          categoryId, altTag, imageUrl: imageUrl && imageUrl,serial,subCategory
        },{where:{imageId}})

        return NextResponse.json({ status: true, message: "image updated successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function DELETE(request) {
    const { imageId } = await request.json();
    const imagemodel = await imageModel();
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        await imagemodel.destroy({where:{imageId:{[Op.in]:imageId}}});
        return NextResponse.json({ status: true, message: "image deleted successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const categoryId = input.get('id');
    const imagemodel = await imageModel();
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }


    try {


        const { rows, count } = await imagemodel.findAndCountAll({
            offset: (page - 1) * 10,
            limit: 10,
            where: {
                categoryId, [Op.or]: { altTag: { [Op.iLike]: `%${name}%` } },

            },
            order: [['serial', 'ASC']]
        });
        return NextResponse.json({ status: true, gallerylist: rows, totalItems: count });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

