import { categoryModel } from "../../../models/imageCategory.model";
import { clientModel } from "../../../models/client.model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(request) {
  
    const {clientId}=await request.json();
    const clientmodel = await clientModel();
    const categorymodel = await categoryModel();
    if (!clientmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {


        const clientdetail = await clientmodel.findOne({where:{clientId}});
        const categorylist = await categorymodel.findAll({order: [['id', 'ASC']]});
        return NextResponse.json({ status: true, categorylist,clientdetail});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function GET(request)
{
    const input=new URL(request.url).searchParams;
    const page=parseInt(input.get('page'));
    const name = input.get('name');
    const clientmodel=await clientModel();
    if(!clientmodel)
    {
        return NextResponse.json({status:false,message:"some error occured!"});
    }


    try {

   
        const {rows,count}=await clientmodel.findAndCountAll(
            {
             
             offset:(page-1)*10,
             limit:10,
             where:{[Op.or]:{clientName:{[Op.iLike]:`%${name}%`}}},
             order:[['serial','ASC']],
            
            });
        // const clientlist=await clientmodel.findAll({order:[['serial','ASC']]});
        return NextResponse.json({status:true,clientlist:rows,totalItems:count}); 

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"}); 
    }

}

