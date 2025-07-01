import { NextResponse } from "next/server";
import {connectTodb} from '../../../database/database.js'

export async function GET()
{
    const connection=await connectTodb();
    if(!connection)
    {
        return NextResponse.json({status:false,message:"database error occured!"})
    }

    try {
        
          const imageData=await connection.query(`SELECT public."ImageCategories"."categoryName",public."ImageCategories"."categoryId",ARRAY_AGG(jsonb_build_object('imageId',public."Images"."imageId",'altTag',public."Images"."altTag",'imageUrl',public."Images"."imageUrl") ORDER BY public."Images"."serial") AS images FROM public."ImageCategories" INNER JOIN public."Images" ON public."ImageCategories"."categoryId"=public."Images"."categoryId" WHERE public."ImageCategories"."status"='true'  GROUP BY public."ImageCategories"."categoryId" ORDER BY public."ImageCategories"."serial"`)

          
          return NextResponse.json({status:true,imageData:imageData[0]})


    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"})
        
    }
}