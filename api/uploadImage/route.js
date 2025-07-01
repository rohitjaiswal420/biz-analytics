
import { NextResponse } from "next/server";
import path from "path";
import { galleryModel } from '../../models/gallery.model.js'
import fs from 'fs'
import { Op } from "sequelize";
export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { alt } = JSON.parse(input.get('data'));
    const gallerymodel = await galleryModel();

    if (!gallerymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    if (!file) {
        return NextResponse.json({ status: false, message: "Please upload image again!" });
    }

    try {



        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  String(Date.now())+file.name.replaceAll(' ', '-');

        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        await fs.promises.writeFile(filePath, buffer);

        const imageUrl = `/api/get-image?imageName=${filename}`;

        await gallerymodel.create({

            galleryImage: imageUrl,
            alt
        })




        return NextResponse.json({ status: true, message: "uploaded successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "Please upload image again!" });
    }


}


export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const gallerymodel = await galleryModel();

    if (!gallerymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        const { rows, count } = await gallerymodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{ alt: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['createdAt', 'DESC']]

        })


    
        return NextResponse.json({status: true,gallerylist:rows,totalItems:count});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function DELETE(request) {

    const { deleteditem } = await request.json();
    const gallerymodel = await galleryModel();

    if (!gallerymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await gallerymodel.destroy({ where: { id: { [Op.in]: deleteditem} } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}