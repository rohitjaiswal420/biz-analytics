
import Blog from '@/component/Blog.jsx'

export default async function Page() {

 
  
 
  let blogLists=[];
  let blogPerpage=5;
  let buttons;
  let totalPages;

 try {

   const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createBlog/getBlog?page=${1}&name=`,{

       method:'GET',
       cache:'no-store'
   })

   if(!response.ok) throw new error(`Failed to fetch: ${response.status}`);

   const res=await response.json();
   
   if(res.status)
   {
    blogLists=res.bloglist;
    totalPages=res.total
    buttons=(Math.ceil(res.total / blogPerpage));
   }
   

 } catch (error) {

   console.log("fetching failed",error);
   
   
 }


  return (
   <Blog  blogList={blogLists} buttons={buttons} totalPages={totalPages} />
  )
}
