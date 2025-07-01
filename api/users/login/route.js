"use server"
import { NextResponse } from "next/server";
import { UserModel } from "../../../models/user.model";
import { cookies } from "next/headers";
 import { roleModel } from "../../../../app/models/role.model";
// import {activityModel} from '@/src/app/models/activity.model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export async function POST(request) {

   const {name,password} = await request.json();
   //const api_key=new Headers(request.headers).get('api_key')+password;
   //console.log(new Headers(request.headers));
   
   const usermodel = await UserModel();
  
   
   // const activitymodel=await activityModel();
   
   const isValiduser = await usermodel.findOne({ where: { name } });
   if (!isValiduser) {
      return NextResponse.json({ status: 0, message: "User not found!" });
   }

   // const isApikeyValid = await bcrypt.compare(api_key,isValiduser.api_key);
   // if (!isApikeyValid) {
   //    return NextResponse.json({ status: 0, message: "Unauthorized access!" });
   // }

   if (isValiduser.name !== name) {
      return NextResponse.json({ status: 0, message: "Wrong Credentials!" });
   }

   const isPasswordvalid = await bcrypt.compare(password,isValiduser.password);
   if (!isPasswordvalid) {
      return NextResponse.json({ status: 0, message: "Wrong Credentials!" });
   }

   const token=jwt.sign({userId:isValiduser.userId,name:isValiduser.name,usertype:isValiduser.usertype,joining_date:isValiduser.joining_date,profile_img:isValiduser.profile_img},process.env.AUTHENTICATION_KEY,{expiresIn:'1h'})

   await cookies().set('token',token,{httpOnly:true,maxAge:3600});
   return new Response(JSON.stringify({ status:1,message:"Verified user!",url:`/${isValiduser.usertype}`}),{

      headers:{
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
         'Access-Control-Allow-Headers':'Content-Type'
      }
   });
  
  // return NextResponse.json({ status:1,message:"Verified user!",url:`/${isValiduser.usertype}`});

}

export async function GET()
{
   const token=await cookies();
   const role= await roleModel();
   if(!token.get('token'))
   {
      return NextResponse.json({status:false,message:'token not found!',url:'/login'});
   }

   const isValiduser=await jwt.verify(token.get('token').value,process.env.AUTHENTICATION_KEY);
   if(!isValiduser)
   {
      return NextResponse.json({status:false,message:'token not verified!',url:'/'});
   }

   const{usertype}=isValiduser;
   const menubar=await role.findOne({where:{usertype}});
   return NextResponse.json({status:true,message:'user verified!', userdata:{isValiduser,menubar:menubar?.access}});
}