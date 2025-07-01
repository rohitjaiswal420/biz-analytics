import blogs from "@/utils/blogs";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faComments, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogDetails({ params }) {

    const { slug } = await params;
    let blogData = {};
    let blogList = [];
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singleBlog`, {
            cache: "no-store",
            method: 'POST',
            body: JSON.stringify({ blogUrl: `/${slug}` })
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const response = await res.json();
        if (response.status) {

            if(response.blogdetail)
            {
                blogData = response.blogdetail
                blogList= response.bloglist

            }
            else{
                return notFound()
            }
        }

    } catch (error) {
       console.log(error);
       return notFound();
    }

   

    return (
        <>
            {/* Start main-content */}
            <section className="page-title" style={{ backgroundImage: "url(/images/background/blog-details.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">
                            {blogData.blogTitle}
                        </h1>
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

            {/*Blog Details Start*/}
            <section className="blog-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="blog-details__left">
                                <div className="blog-details__img">
                                    <Image src={blogData.blogImage} alt={blogData.blogTitle} width={1024} height={683} />
                                    {/* <div className="blog-details__date">
                                        <span className="day">28</span>
                                        <span className="month">Aug</span>
                                    </div> */}
                                </div>
                                <div className="blog-details__content">
                                    {/* <ul className="list-unstyled blog-details__meta">
                                        <li>
                                            <a>
                                                <FontAwesomeIcon icon={faUserCircle} /> {blogData.blogImage}
                                            </a>{" "}
                                        </li>
                                        <li>
                                            <a>
                                                <FontAwesomeIcon icon={faComments} /> 02 Comments
                                            </a>
                                        </li>
                                    </ul> */}
                                    <h3 className="blog-details__title">
                                        {blogData.blogTitle}
                                    </h3>
                                    <div className="blog-details__text-2" dangerouslySetInnerHTML={{ __html: blogData.blogContent }} />
                                </div>
                                <div className="blog-details__bottom">
                                    <p className="blog-details__tags">
                                        {" "}
                                        <span>Tags</span> <Link href="news-details.html">Business</Link>{" "}
                                        <Link href="news-details.html">Agency</Link>{" "}
                                    </p>
                                    <div className="blog-details__social-list">
                                        {" "}
                                        <a>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>{" "}
                                        <a>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </a>{" "}
                                        <a>
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </a>{" "}
                                    </div>
                                </div>
                                <div className="nav-links">
                                    <div className="prev">
                                        <a rel="prev">
                                            Bring to the table win-win survival strategies
                                        </a>
                                    </div>
                                    <div className="next">
                                        <a rel="next">
                                            How to lead a healthy &amp; well-balanced life
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="sidebar">
                                {/* <div className="sidebar__single sidebar__search">
                                <form action="#" className="sidebar__search-form">
                                    <input type="search" placeholder="Search here" />
                                    <button type="submit">
                                        <i className="lnr-icon-search" />
                                    </button>
                                </form>
                            </div> */}
                                <div className="sidebar__single sidebar__post">
                                    <h3 className="sidebar__title">Latest Blogs</h3>
                                    <ul className="sidebar__post-list list-unstyled">
                                       {blogList.map((blog)=><li>
                                            <div className="sidebar__post-image">
                                                {" "}
                                                <Image src={blog.blogImage} width={370} height={296} alt="Post Name" />{" "}
                                            </div>
                                            <div className="sidebar__post-content">
                                                <h3>
                                                    {/* {" "}
                                                    <span className="sidebar__post-content-meta">
                                                        <FontAwesomeIcon icon={faUserCircle} />
                                                        Admin
                                                    </span>{" "} */}
                                                    <Link href={`/blog${blog.blogUrl}`}>
                                                       {blog.blogTitle.substring(0,20)}...
                                                    </Link>
                                                </h3>
                                            </div>
                                        </li>)}
                                      
                                    </ul>
                                </div>
                                <div className="sidebar__single sidebar__category">
                                    <h3 className="sidebar__title">Categories</h3>
                                    <ul className="sidebar__category-list list-unstyled">
                                        <li>
                                            <Link href="/">
                                                Business
                                                <span className="icon-right-arrow" />
                                            </Link>{" "}
                                        </li>
                                        <li className="active">
                                            <Link href="/">
                                                Digital Agency
                                                <span className="icon-right-arrow" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/">
                                                Introductions
                                                <span className="icon-right-arrow" />
                                            </Link>{" "}
                                        </li>
                                        <li>
                                            <Link href="/">
                                                New Technologies
                                                <span className="icon-right-arrow" />
                                            </Link>{" "}
                                        </li>
                                        <li>
                                            <Link href="/">
                                                Parallax Effects
                                                <span className="icon-right-arrow" />
                                            </Link>{" "}
                                        </li>
                                        <li>
                                            <Link href="/">
                                                Web Development
                                                <span className="icon-right-arrow" />
                                            </Link>{" "}
                                        </li>
                                    </ul>
                                </div>
                                <div className="sidebar__single sidebar__tags">
                                    <h3 className="sidebar__title">Tags</h3>
                                    <div className="sidebar__tags-list">
                                        {" "}
                                        <Link href="/">Consulting</Link> <Link href="/">Agency</Link>{" "}
                                        <Link href="/">Business</Link> <Link href="/">Digital</Link>{" "}
                                        <Link href="/">Experience</Link> <Link href="/">Technology</Link>{" "}
                                    </div>
                                </div>
                                <div className="sidebar__single sidebar__comments">
                                    <h3 className="sidebar__title">Recent Comments</h3>
                                    <ul className="sidebar__comments-list list-unstyled">
                                        <li>
                                            <div className="sidebar__comments-icon">
                                                {" "}
                                                <FontAwesomeIcon icon={faComments} />{" "}
                                            </div>
                                            <div className="sidebar__comments-text-box">
                                                <p>
                                                    A wordpress commenter on
                                                    <br /> launch new mobile app
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar__comments-icon">
                                                {" "}
                                                <FontAwesomeIcon icon={faComments} />{" "}
                                            </div>
                                            <div className="sidebar__comments-text-box">
                                                <p>
                                                    {" "}
                                                    <span>John Doe</span> on template:
                                                </p>
                                                <h5>comments</h5>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar__comments-icon">
                                                {" "}
                                                <FontAwesomeIcon icon={faComments} />{" "}
                                            </div>
                                            <div className="sidebar__comments-text-box">
                                                <p>
                                                    A wordpress commenter on
                                                    <br /> launch new mobile app
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar__comments-icon">
                                                {" "}
                                                <FontAwesomeIcon icon={faComments} />{" "}
                                            </div>
                                            <div className="sidebar__comments-text-box">
                                                <p>
                                                    {" "}
                                                    <span>John Doe</span> on template:
                                                </p>
                                                <h5>comments</h5>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Blog Details End*/}
        </>
        // <div className="container py-8">
        //   <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        //   <p className="text-sm text-gray-500 mb-6">{blog.date}</p>
        //   <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        // </div>
    );
}
