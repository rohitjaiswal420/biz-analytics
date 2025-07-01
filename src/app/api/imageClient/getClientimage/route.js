import { imageModel } from "../../../models/image.model";
import { NextResponse } from "next/server";
import { clientModel } from "@/app/models/client.model";
import { Op } from "sequelize";
export async function POST(request) {
  
    const {clientId}=await request.json();
    const imagemodel = await imageModel();
 
    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        const imagelist = await imagemodel.findAll({where:{clientId}});
        return NextResponse.json({ status: true, imagelist});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}


export async function GET(request)
{
    const input=new URL(request.url).searchParams;
    const page=parseInt(input.get('page'));
    const clientId = input.get('clientId');
    const imagemodel=await imageModel();
    const clientmodel=await clientModel();
    if(!imagemodel)
    {
        return NextResponse.json({status:false,message:"some error occured!"});
    }


    try {

        const {clientName}=await clientmodel.findOne({where:{clientId}});
        const {rows,count}=await imagemodel.findAndCountAll(
        {
         
         offset:(page-1)*10,
         limit:10,
         where:{clientId},
         order:[['createdAt','DESC']],
        
        });
        return NextResponse.json({status:true,imagelist:rows,totalItems:count,clientName}); 

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"}); 
    }

}


export async function DELETE(request) {

    const { deleteditem } = await request.json();
    const imagemodel = await imageModel();

    if (!imagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await imagemodel.destroy({ where: { id: { [Op.in]: deleteditem} } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}