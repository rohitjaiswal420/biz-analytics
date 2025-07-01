"use server"
import { NextResponse } from "next/server";
import { UserModel } from "../../../models/user.model.js";
// import {activityModel} from '../../../models/activity.model.js'
import bcrypt from 'bcrypt'

function randomNumbers()
{
   return String(Math.floor(Math.random()*9000+1000));
}


export async function POST(request) {

  const {name,password} = await request.json()
  const api_key=new Headers(request.headers).get('api_key')+password;
 
 
  // const activitymodel=await activityModel();
  const user = await UserModel();
  if (!user) {
    return NextResponse.json({ status: 0, message: "some internal error occured!" });
  }

  const isExisteduser = await user.findOne({ where: { name: name } });


  if (isExisteduser) {
    return NextResponse.json({ status: 0, message: "user already existed!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const hashed_Api_key = bcrypt.hashSync(api_key, salt);
  const userId=String(new Date().getMilliseconds())+randomNumbers();
  await user.create({

    name,
    password: hashedPassword,
    api_key: hashed_Api_key,
    joining_date:new Date().toLocaleDateString(),
    userId
   
  })

//   await activitymodel.create({

//     userId,
//     name,
//     usertype:'readers',
//     activity:'registered',
//     time:new Date().toLocaleString()

//  })

  return NextResponse.json({status:1,message:"successfull!"});

}