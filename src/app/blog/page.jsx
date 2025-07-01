import blogs from "@/utils/blogs";
import { faLongArrowAltRight, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {


  let blogLists = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createBlog`, {
      cache: "no-store",
      method: 'GET'
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const { bloglist } = await res.json();
    blogLists=bloglist

   } catch (error) {
    console.error("Fetch error:", error);
  }
  
    return (
    <>
        {/* Start main-content */}
        <section className="page-title" style={{ backgroundImage: "url(/images/background/blog.webp)" }}>
            <div className="auto-container">
                <div className="title-outer">
                    <h1 className="title">Blogs</h1>
                    <ul className="page-breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>Blogs</li>
                    </ul>
                </div>
            </div>
        </section>
        {/* end main-content */}

        {/* <!-- News Section --> */}
        <section className="bg-silver-light">
            <div className="container pb-90">
                <div className="row">
                    {
                        blogLists.map((blog) => (
                            <div className="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" key={blog.blogId}>
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image">
                                            <Link href={`/blog${blog.blogUrl}`}>
                                                <Image src={blog.blogImage} alt={blog.blogTitle} width={374} height={299} />
                                            </Link>
                                        </figure>
                                    </div>
                                    <div className="content-box">
                                        <span className="date">{blog.publishedDate}</span>
                                        {/* <span className="post-info">
                                            <FontAwesomeIcon icon={faUserCircle} /> {blog.author}
                                        </span> */}
                                        <h5 className="title">
                                            <Link href={`/blog${blog.blogUrl}`}>
                                                {blog.blogTitle}
                                            </Link>
                                        </h5>
                                        <div className="text">
                                            {blog.blogDescription.substring(0,100)}...
                                        </div>
                                        <Link href={`/blog${blog.blogUrl}`} className="read-more">
                                            <FontAwesomeIcon icon={faLongArrowAltRight} /> Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
        
        {/* <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Our Blog</h1>
        <ul>
            {blogs.map((blog) => (
            <li key={blog.slug} className="mb-4">
                <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600">{blog.title}</h2>
                <p className="text-sm text-gray-500">{blog.date}</p>
                <p>{blog.summary}</p>
                </Link>
            </li>
            ))}
        </ul>
        </div> */}
    </>
  );
}
