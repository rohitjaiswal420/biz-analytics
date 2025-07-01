"use server"
import { blogModel } from "../../../app/models/blog.model";
import { categoryModel } from '../../models/category.model'
import { NextResponse } from "next/server";
export async function POST(request)
{

    const {blogUrl}=await request.json();
    const blogmodel=await blogModel();
    const categorymodel=await categoryModel();
   
   
  //  const api_key=new Headers(request.headers).get('api_key')
    if(!blogmodel)
    {
        return NextResponse.json({status:false,message:"database error occured!"});
    }

    try {

        const blogdetail=await blogmodel.findOne({
            where:{blogUrl}
        })

        const bloglist=await blogmodel.findAll({

            limit:3,
            order:[['publishedDate','DESC']],
            where:{blogStatus:true}
        })
       
        const category=await categorymodel.findAll();
        return NextResponse.json({status:true,blogdetail,category,bloglist});
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
        
    }
    

    
}