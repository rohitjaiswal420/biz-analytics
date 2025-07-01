import { sliderModel } from "../../../models/slider.model";
import { NextResponse } from 'next/server'
import path from "path";
import { Op } from "sequelize";
import sharp from "sharp";
import fs from 'fs'



export async function POST(request) {

    const inputdata = await request.formData();
    const file = inputdata.get('file');
    const { sliderContent, url, sliderSerial } = JSON.parse(inputdata.get('data'));
    if (file === 'null') {
        return NextResponse.json({ status: false, message: 'please upload image again' });
    }

    const slidermodel = await sliderModel();
    if (!slidermodel) {
        return NextResponse.json({ status: false, message: 'database error occured' });
    }

    try {


        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
        const resizedImage = await sharp(buffer)
            .resize(1920, 970)
            .toFormat("jpeg")
            .toBuffer();
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, resizedImage);

        const imageUrl = `/api/get-image?imageName=${filename}`;

        await slidermodel.create({

            sliderContent,
            url,
            sliderImage: imageUrl,
            sliderSerial
        })

        return NextResponse.json({ status: true, message: 'slider created successfully' });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: 'some error occured' });

    }



}


export async function PUT(request) {

    const inputdata = await request.formData();
    const file = inputdata.get('file');
    const { sliderContent, url, sliderSerial, sliderId } = JSON.parse(inputdata.get('data'));


    const slidermodel = await sliderModel();
    if (!slidermodel) {
        return NextResponse.json({ status: false, message: 'database error occured' });
    }

    try {

        if (file !== 'null') {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
            const resizedImage = await sharp(buffer)
                .resize(1920, 970)
                .toFormat("jpeg")
                .toBuffer();
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, resizedImage);

            const imageUrl = `/api/get-image?imageName=${filename}`;

            await slidermodel.update({

                sliderContent,
                url,
                sliderImage: imageUrl,
                sliderSerial
            }, { where: { sliderId } })

        }
        else{
            await slidermodel.update({

                sliderContent,
                url,
                sliderSerial
            }, { where: { sliderId } })
        }

        return NextResponse.json({ status: true, message: 'slider created successfully' });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: 'some error occured' });

    }



}

export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const slidermodel = await sliderModel();

    if (!slidermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        const { rows, count } = await slidermodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{ url: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['sliderSerial', 'ASC']]

        })
       // const sliderlist = await slidermodel.findAll({ order: [['sliderSerial', 'ASC']] });

        return NextResponse.json({ status: true, sliderlist:rows,totalItems:count });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}


export async function DELETE(request) {

    const { sliderId } = await request.json();
    const slidermodel = await sliderModel();

    if (!slidermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await slidermodel.destroy({ where: { sliderId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}