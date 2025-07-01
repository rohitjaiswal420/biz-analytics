import { Op } from "sequelize";
import { categoryModel } from "../../models/imageCategory.model";
// import { imageModel } from "../../models/image.model";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { categoryName,serial } = await request.json();
    const categorymodel = await categoryModel();
    if (!categorymodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const isCategoryexist = await categorymodel.findOne({ where: { categoryName } });
    if (isCategoryexist) {
        return NextResponse.json({ status: false, message: "category already exist!" });
    }

    try {

        await categorymodel.create({

            categoryName,serial
        })

        return NextResponse.json({ status: true, message: "category created successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function DELETE(request) {

    const { categoryId } = await request.json();
    const categorymodel = await categoryModel();
    if (!categorymodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

  

    try {

        await categorymodel.destroy({

            where:{categoryId}
        })

        return NextResponse.json({ status: true, message: "category deleted successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}

export async function GET(request)
{
    const input=new URL(request.url).searchParams;
    const name=input.get('name');
    const page=parseInt(input.get('page'));
    const categorymodel=await categoryModel();
    if(!categorymodel)
    {
        return NextResponse.json({status:false,message:"some error occured!"});
    }


    try {

   
        const {rows,count}=await categorymodel.findAndCountAll(
        {
         
         offset:(page-1)*10,
         limit:10,
         where:{[Op.or]:{categoryName:{[Op.iLike]:`%${name}%`}}},
         order:[['id','ASC']],
        
        });
        return NextResponse.json({status:true,categorylist:rows,totalItems:count}); 

        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"}); 
    }

}
