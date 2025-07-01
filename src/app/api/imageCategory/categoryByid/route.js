import { categoryModel } from "../../../models/imageCategory.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  
    const {categoryId}=await request.json();
    const categorymodel = await categoryModel();
    if (!categorymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        const categorydetail = await categorymodel.findOne({where:{categoryId}});
        return NextResponse.json({ status: true,categorydetail});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function PUT(request) {
  
    const {categoryName, serial, categoryId,status}=await request.json();
    const categorymodel = await categoryModel();
    if (!categorymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        await categorymodel.update({status,categoryName,serial},{where:{categoryId}});
        return NextResponse.json({ status: true,message:"category updated successfully!"});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}