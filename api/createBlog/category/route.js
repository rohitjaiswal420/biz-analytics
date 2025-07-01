import {NextResponse} from 'next/server'
import { categoryModel } from '../../../models/category.model'

export async function GET()
{
    const categorymodel=await categoryModel();
   
      if(!categorymodel)
      {
          return NextResponse.json({status:false,message:"database error occured!"});
      }
      
      try {

      const category=await categorymodel.findAll();
      return NextResponse.json({status:true,category});
        
      } catch (error) {
        return NextResponse.json({status:false,message:"some error occured!"});
      }
      
}


function randomNumbers()
{
   return String(Math.floor(Math.random()*9000+1000));
}

export async function POST(request)
{ 
      const {categoryName}=await request.json();
      const categorymodel=await categoryModel();
   
      if(!categorymodel)
      {
          return NextResponse.json({status:false,message:"database error occured!"});
      }
      
      try {
    
      const isExisted=await categorymodel.findOne({where:{categoryName}});
      if(isExisted)
      {
        return NextResponse.json({status:false,message:"category already existed!"});
      }
      await categorymodel.create({
        categoryId:String(new Date().getMilliseconds())+randomNumbers(),
        categoryName
      });

      return NextResponse.json({status:true,message:'category created successfully'});
        
      } catch (error) {
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
      }
      
}