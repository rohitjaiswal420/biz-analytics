"use server"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";


export async function POST(request) {
   const { token } = await request.json();
   

   if (!token) {
      return NextResponse.json({ status: false, message: 'token not found!', url: '/login' });
   }

   try {

      const isValiduser =  jwt.verify(token, process.env.AUTHENTICATION_KEY);
      if (!isValiduser) {
        return NextResponse.json({ status: false, message: 'token not verified!', url: '/login' });
      }
     
      return NextResponse.json({ status: true, message: 'user verified!'});

   } catch (error) {

      console.log(error);
      return NextResponse.json({ status: false, message: 'token error occured!', url: '/login' });

   }



}

