import { NextResponse } from "next/server";
import { connectTodb } from '../../../database/database.js'


export async function GET() {
  const connection = await connectTodb();
  if (!connection) {
    return NextResponse.json({ status: false, message: "database error occured!" })
  }

  try {

    //         const imageData = await connection.query(`WITH subcategory_images AS (
    //   SELECT 
    //     i."categoryId",
    //     i."subCategory",
    //     jsonb_agg(
    //       jsonb_build_object(
    //         'imageId', i."imageId",
    //         'altTag', i."altTag",
    //         'imageUrl', i."imageUrl"
    //       ) ORDER BY i."serial"
    //     ) AS images
    //   FROM 
    //     public."Images" i
    //   GROUP BY 
    //     i."categoryId", i."subCategory"
    // )

    // SELECT 
    //   c."categoryName",
    //   c."categoryId",
    //   jsonb_agg(
    //     jsonb_build_object(
    //       'subCategory', si."subCategory",
    //       'images', si."images"
    //     ) ORDER BY si."subCategory"
    //   ) AS subcategory
    // FROM 
    //   public."ImageCategories" c
    // JOIN 
    //   subcategory_images si ON c."categoryId" = si."categoryId"
    // WHERE 
    //   c."status" = 'true'
    // GROUP BY 
    //   c."categoryId", c."categoryName"
    // ORDER BY 
    //   c."serial";
    // `)
    const imageData = await connection.query(`
SELECT public."ImageCategories"."categoryId",public."ImageCategories"."categoryName",ARRAY_AGG(jsonb_build_object('clientName',public."Clients"."clientName",'clientId',public."Clients"."clientId",'thumbnailImage',public."Clients"."thumbnailImage",'altTag',public."Clients"."altTag")ORDER BY public."Clients"."serial") AS client FROM public."ImageCategories" INNER JOIN public."Clients" ON public."ImageCategories"."categoryId"=public."Clients"."categoryId" WHERE public."ImageCategories"."status"=true GROUP BY public."ImageCategories"."categoryId" ORDER BY public."ImageCategories"."serial"`)

    return NextResponse.json({ status: true, imageData: imageData[0] })


  } catch (error) {

    console.log(error);
    return NextResponse.json({ status: false, message: "some error occured!" })

  }
}



