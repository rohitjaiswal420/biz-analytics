import { sliderModel } from "../../../models/slider.model";
import { NextResponse } from 'next/server'





export async function POST(request) {

    const {sliderId}=await request.json();
    const slidermodel = await sliderModel();
    if (!slidermodel) {
        return NextResponse.json({ status: false, message: 'database error occured' });
    }

    try {


        const sliderdetail=await slidermodel.findOne({where:{sliderId}});
        return NextResponse.json({ status: true,sliderdetail});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: 'some error occured' });

    }



}

