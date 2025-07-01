import { NextResponse } from "next/server";
import { detailsModel } from "../../models/details.model";


export async function POST(request) {

    const {menu}=await request.json();
    const detailsmodel = await detailsModel();
    if (!detailsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {
        
        await detailsmodel.update({

          menu

        },{where:{id:1}})



    } catch (error) {
        
        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function GET() {

   
    const detailsmodel = await detailsModel();
    if (!detailsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {
        
        await detailsmodel.findOne({attributes:['menu'],where:{id:1}});

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}