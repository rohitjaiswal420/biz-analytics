import HomePage from "../component/HomePage";
export default async function Home() {


  let sliderList = [];
  let blogList = [];
  let testimonialList = [];
  let Details;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/homePage`, {
      cache: "no-store",
      method: 'GET'
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const response = await res.json();
    if (response.status) {
      blogList = response.bloglist
      sliderList = response.sliderlist
      testimonialList = response.testimoniallist
      Details=response.Details
    }



  } catch (error) {
    console.error("Fetch error:", error);
  }



  return (
   <HomePage sliderList={sliderList} blogList={blogList} testimonialList={testimonialList} Details={Details} />
  );
}
