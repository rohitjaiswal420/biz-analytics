"use server"
import { inquiryModel} from "../../../app/models/inquiry.model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
export async function GET(request)
{

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const inquirymodel=await inquiryModel();
    if(!inquirymodel){
        return NextResponse.json({status:false,message:"database error occured!"})
    }
    try {

        const { rows, count } = await inquirymodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{fullName: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['createdAt','DESC']]

        })
        
        return NextResponse.json({status:true,inquirylist:rows,totalItems:count});
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"})
    }

}


export async function DELETE(request) {

    const { inquiryId } = await request.json();
    const inquirymodel = await inquiryModel();

    if (!inquirymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await inquirymodel.destroy({ where: { inquiryId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}