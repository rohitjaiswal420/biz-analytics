import { categoryModel } from "../../../models/imageCategory.model";
import { imageModel } from "../../../models/image.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  
    const categorymodel = await categoryModel();
    if (!categorymodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }


    try {


        const categorylist = await categorymodel.findAll(
            {


                order: [['id', 'ASC']]

            });
        return NextResponse.json({ status: true, categorylist });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function POST(request) {
  
    const {imageId}=await request.json();
    const imagemodel = await imageModel();
    const categorymodel = await categoryModel();
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        const imagedetail = await imagemodel.findOne({where:{imageId}});
        const categorylist = await categorymodel.findAll({order: [['id', 'ASC']]});
        return NextResponse.json({ status: true, categorylist,imagedetail});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}