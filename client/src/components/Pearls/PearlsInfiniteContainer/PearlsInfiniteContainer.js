import { useEffect, useMemo, useState } from "react";
import styles from "./PearlsInfiniteContainer.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Pearl from "../Pearl/Pearl";
import notfound from "../../../assets/postsnotfound.svg";

const PearlsInfiniteContainer = ({ user_id, flag }) => {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxLength, setMaxLength] = useState(Infinity);
  const hasMore = posts.length < maxLength;

  const getPosts = async () => {
    console.log("called")
    if (posts.length >= maxLength) {
      return;
    }
    let URL = `${process.env.REACT_APP_API_ENDPOINT}/api/pearl/posts?page_no=${pageNo}`;

    if (user_id) {
      URL = `${process.env.REACT_APP_API_ENDPOINT}/api/pearl/posts?page_no=${pageNo}&user_id=${user_id}`;
    }

    if (flag === "bookmarks") {
      URL = `${process.env.REACT_APP_API_ENDPOINT}/api/pearl/bookmarks?page_no=${pageNo}`;
    }

    fetch(URL, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((users) => {
        setPosts(posts.concat(users.data));
        setMaxLength(users.records);
        setPageNo((pageno) => pageno + 1);
      })
      .catch((err) => {
        alert(`An error occured while fetching the posts: ${err?.message}`);
      });
  };

  useEffect(() => {
    setMaxLength(Infinity);
    setPosts([]);
    setPageNo(1);
  }, [user_id, flag]);

  useEffect(() => {
    if (pageNo === 1) {
      getPosts();
    }
    // eslint-disable-next-line
  }, [pageNo]);

  const loader = useMemo(() => <p>Loading...</p>, []);
  const endMessage = useMemo(
    () => <div className={styles.end_msg}>You have reached the end</div>,
    []
  );

  let content =
    flag === "bookmarks" ? (
      <div className={styles.notfound}>
        <img src={notfound} alt="Not found vector" />
        <div>
          <h3>No Bookmarks Found</h3>
          <p>
            You have no bookmarks
            <br />
            Browse the feed to bookmark the pearls.
          </p>
        </div>
      </div>
    ) : (
      <div className={styles.notfound}>
        <img src={notfound} alt="Not found vector" />
        <div>
          <h3>Posts Not Available</h3>
          <p>
            There are no posts available at the moment.
            <br />
            Please try again later.
          </p>
        </div>
      </div>
    );

  if (posts.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={hasMore}
        loader={loader}
        endMessage={endMessage}
      >
        {posts.map((post) => {
          return <Pearl key={post.post_id} {...post} />;
        })}
      </InfiniteScroll>
    );
  }

  return <div className={styles.container}>{content}</div>;
};

export default PearlsInfiniteContainer;
