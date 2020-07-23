import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../components/blog/SmallCard";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="tags">{t.name}</a>
      </Link>
    ));

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main className='slugbody'>
          <article>
            <div className="container-fluid">
              <p className="written">
                
                <Link href={`/profile/${blog.postedBy.username}`}>
                  <a>{blog.postedBy.username}</a>
                </Link>{" "}
                | {moment(blog.updatedAt).format("MMM Do YY")}
              </p>
              <section>
                <div className="row" style={{ marginTop: "30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="title">{blog.title}</h1>

                  
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className="tags">
                    {showBlogTags(blog)}
                    
                  </div>

            <div className="grid">
              <h4 className="related">Related</h4>
              <div className="row">{showRelatedBlog()}</div>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
