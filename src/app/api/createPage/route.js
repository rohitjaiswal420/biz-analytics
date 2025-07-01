import { pageModel } from "../../models/pages.model";
import { NextResponse } from 'next/server'
import path from "path";
import fs from 'fs'
import { Op } from "sequelize";

export async function POST(request) {

    const input = await request.formData();
    const data = input.get('data');
    const sectionImages = input.getAll('images');
    const bannerImage = input.get('bannerimage');

    const { url, metaDescriptions, metaTitle, metaKeywords, sections, mainTitle, pageType, shortContent } = JSON.parse(data);
    const pagemodel = await pageModel();
    if (!pagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const isExistedurl = await pagemodel.findOne({ where: { url } });
    if (isExistedurl) {
        return NextResponse.json({ status: false, message: "page already existed with this url!" });
    }

    try {


        const buffer = Buffer.from(await bannerImage.arrayBuffer());
        const filename = String(Date.now())
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        const bannerimage = `/api/get-image?imageName=${filename}`;


        for (let i = 0; i < sectionImages.length; i++) {
            const buffer = Buffer.from(await sectionImages[i].arrayBuffer());
            const filename = String(Date.now())
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, buffer);
            const image = `/api/get-image?imageName=${filename}`;
            sections[i].sectionImage = image;
        }

        await pagemodel.create({
            url, metaDescriptions, metaTitle, metaKeywords, mainTitle, pageType, shortContent, bannerImage: bannerimage, sections: sections
        })

        return NextResponse.json({ status: true, message: "page created successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }

}


export async function GET(request) {
    const input = new URL(request.url).searchParams
    const page = input.get('page');
    const name = input.get('name');


    const pagemodel = await pageModel();
    if (!pagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {


        const { rows, count } = await pagemodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: { mainTitle: { [Op.iLike]: `%${name}%` }, url: { [Op.iLike]: `%${name}%` } }
            },
            order: [['createdAt', 'DESC']]
        })




        return NextResponse.json({ status: true, pagelist: rows, totalItems: count });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function DELETE(request) {
    const { pageId } = await request.json();
    const pagemodel = await pageModel();
    if (!pagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        await pagemodel.destroy({ where: { pageId } });
        return NextResponse.json({ status: true, message: "page deleted successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function PUT(request) {

    const input = await request.formData();
    const data = input.get('data');
    const sectionImages = input.getAll('images');
    const bannerImage = input.get('bannerimage');
   

    const { url, metaDescriptions, metaTitle, metaKeywords, sections, mainTitle, pageId ,status} = JSON.parse(data);
    const pagemodel = await pageModel();
    if (!pagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {
   
        let bannerimage;
        if (bannerImage !== 'null') {

            const buffer = Buffer.from(await bannerImage.arrayBuffer());
            const filename = String(Date.now())
            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, buffer);
            bannerimage = `/api/get-image?imageName=${filename}`;


        }


        for (let i = 0; i < sectionImages.length; i++) {

            if (typeof (sectionImages[i]) === 'object') {
                const buffer = Buffer.from(await sectionImages[i].arrayBuffer());
                const filename = String(Date.now())
                const uploadDir = path.join(process.cwd(), "uploads");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const filePath = path.join(uploadDir, filename);
                fs.writeFileSync(filePath, buffer);
                const image = `/api/get-image?imageName=${filename}`;
                sections[i].sectionImage = image;
            }

        }

        await pagemodel.update({
            url, metaDescriptions, metaTitle, metaKeywords, mainTitle,  bannerImage: bannerimage && bannerimage, sections: sections,status
        }, { where: { pageId } })

        return NextResponse.json({ status: true, message: "page created successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }

}