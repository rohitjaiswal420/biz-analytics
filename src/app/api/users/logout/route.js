"use server"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request)
{
    
    
    try {

        const cookie= await cookies();
        cookie.delete('token');
        return NextResponse.json({status:true,message:"cookies deleted successfully!",url:'/'});
        
    } catch (error) {
        
        console.log(error,"error");
        return NextResponse.json({status:false,message:"some error occured!"});
        
    }
   
}