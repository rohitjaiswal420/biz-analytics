import { testimonialModel } from "../../models/testimonials.model";
import { NextResponse } from 'next/server'
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";
import fs from 'fs'
import { Op } from "sequelize";


export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { description, name, serial } = JSON.parse(input.get('data'));
    const testimonialmodel = await testimonialModel();

    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        if (file === 'null') {


            await testimonialmodel.create({

                description, name, serial
            })

        }
        else {

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
            const resizedImage = await sharp(buffer)
                .resize(120, 120)
                .toFormat("jpeg")
                .toBuffer();
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, resizedImage);

            const imageUrl = `/api/get-image?imageName=${filename}`;

            await testimonialmodel.create({

                description, name, serial, image: imageUrl
            })

        }




        return NextResponse.json({ status: true, message: "testimonial created successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const testimonialmodel = await testimonialModel();
    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const { rows, count } = await testimonialmodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{ name: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['createdAt', 'DESC']]

        })

        return NextResponse.json({ status: true, testimoniallist: rows, totalItems: count });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function DELETE(request) {

    const { testimonialId } = await request.json();
    const testimonialmodel = await testimonialModel();
    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await testimonialmodel.destroy({ where: { testimonialId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { description, name, designation ,testimonialId} = JSON.parse(input.get('data'));
    const testimonialmodel = await testimonialModel();

    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        if (file === 'null') {


            await testimonialmodel.update({

                description, name, designation
            },{where:{testimonialId}})

        }
        else {

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename =  String(Date.now())+file.name.replaceAll(' ', '-');
            const resizedImage = await sharp(buffer)
                .resize(120, 120)
                .toFormat("jpeg")
                .toBuffer();
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, resizedImage);

            const imageUrl = `/api/get-image?imageName=${filename}`;

            await testimonialmodel.update({

                description, name, designation, image: imageUrl
            },{where:{testimonialId}})

        }




        return NextResponse.json({ status: true, message: "testimonial updated successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}