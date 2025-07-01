import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { galleryModel } from '@/app/models/gallery.model.js'
import fs from 'fs'
export async function POST(request) {

    const input = await request.formData();
    const file = input.getAll('file');

    const gallerymodel = await galleryModel();

    if (!gallerymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    if (!file) {
        return NextResponse.json({ status: false, message: "Please upload image again!" });
    }

    try {


        for (let i = 0; i < file.length; i++) {
            const buffer = Buffer.from(await file[i].arrayBuffer());
            const filename = file[i].name.replaceAll(' ', '-');

            const uploadDir = path.join(process.cwd(), "uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, buffer);

            const imageUrl = `/api/get-image?imageName=${filename}`;
            const isExist = await gallerymodel.findOne({ where: { galleryImage: imageUrl } });
            if (!isExist) {
                await gallerymodel.create({

                    galleryImage: imageUrl
                })
            }

        }




        return NextResponse.json({ status: true, message: "uploaded successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "Please upload image again!" });
    }


}