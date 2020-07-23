import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import SmallCard from "../components/blog/SmallCard";
import Card from "../components/blog/Card";

import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Home | {APP_NAME}</title>

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <article key={i}>
          <SmallCard blog={blog} />
          <hr />
        </article>
      );
    });
  };
  const showLast = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };
  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="categories">{c.name}</a>
      </Link>
    ));
  };

  

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <section>
                <div className="categories">
                  {showAllCategories()}
                </div>
              </section>
            </header>
          </div>
          <div className='grids'>
          <div className="row">
          <div className="grid1">{showLast()[0]}</div>
          <div className="column">{showAllBlogs()[1]}</div>
          <div className="column">{showAllBlogs()[2]}</div>
          </div>

          <div class="row">
          <div className="column">{showAllBlogs()[3]}</div>
          <div className="column">{showAllBlogs()[4]}</div>
          <div className="column">{showAllBlogs()[5]}</div>
          <div className="column">{showAllBlogs()[6]}</div>

          </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 7;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
