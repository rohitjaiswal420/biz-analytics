"use server"
import { blogModel } from "../../../../app/models/blog.model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
export async function GET(request) {

    const blogmodel=await blogModel();
    const params=new URL(request.url).searchParams
    const page=params.get('page')
    const name=params.get('name')
    const offset=(page-1)*5;
    if(!blogmodel)
    {
        return NextResponse.json({status:false,message:"database error occured"});
    }

    try {


       // const bloglist=await blogmodel.findAll({order:[['blogSerial','ASC']]});
       const {rows,count}=await blogmodel.findAndCountAll({
        limit:5,
        offset:offset,
        order:[['blogSerial','ASC']],
        where:{[Op.or]:{blogTitle:{[Op.iLike]:`%${name}%`}}}
       })
       
        return NextResponse.json({status:true,bloglist:rows,total:count});

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured"});
        
    }

}