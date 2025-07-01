import { NextResponse } from "next/server";
import { sliderModel } from "@/app/models/slider.model";
import { blogModel } from "@/app/models/blog.model";
import { testimonialModel } from "@/app/models/testimonials.model";
import {detailsModel} from '@/app/models/details.model';

export async function GET(request) {

    const data = await Promise.all([sliderModel(), blogModel(), testimonialModel(),detailsModel()])
    try {



        const datalist = await Promise.all([data[0].findAll({ order: [['sliderSerial', 'ASC']] }), data[1].findAll({limit:3, where:{blogStatus:true},order: [['createdAt','DESC']] }),data[2].findAll({ order: [['createdAt', 'DESC']] }),data[3].findOne({ where: {id:1} })])


        return NextResponse.json({status: true, bloglist: datalist[1], sliderlist: datalist[0],  testimoniallist: datalist[2],Details: datalist[3]});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}