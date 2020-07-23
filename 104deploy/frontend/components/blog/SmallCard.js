import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
    return (
        <div className="double">
          <div>
            <section>
              <Link href={`/${blog.slug}`}>
                <img
                  className="img"
                  style={{ height: "200px", width: "98%" }}
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                />
              </Link>
            </section>
          </div>
          <div>
            <Link href={`/${blog.slug}`}>
              <a>
                <h2 className="title">{blog.title}</h2>
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/${blog.slug}`}>
              <a className="row">{renderHTML(blog.excerpt)}</a>
            </Link>
          </div>
    
          <div>
            <p className="writtens">
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>{blog.postedBy.username} </a>
              </Link>
              | {moment(blog.updatedAt).format("MMM Do YY")}
            </p>
          </div>
        </div>
    );
};

export default SmallCard;
