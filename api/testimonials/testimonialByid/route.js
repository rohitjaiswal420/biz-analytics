import { testimonialModel } from "../../../models/testimonials.model";
import { NextResponse } from 'next/server'





export async function POST(request) {

    const {testimonialId}=await request.json();
    const testimonialmodel = await testimonialModel();
    if (!testimonialmodel) {
        return NextResponse.json({ status: false, message: 'database error occured' });
    }

    try {


        const testimonialdetail=await testimonialmodel.findOne({where:{testimonialId}});
        return NextResponse.json({ status: true,testimonialdetail});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: 'some error occured' });

    }



}

