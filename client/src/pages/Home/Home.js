import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pearl from "../../components/Pearls/Pearl/Pearl";
import styles from "./Home.module.css";
import notfound from "../../assets/postsnotfound.svg";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxLength, setMaxLength] = useState(Infinity);
  const hasMore = posts.length < maxLength;

  const getPosts = useCallback(async () => {
    if (posts.length >= maxLength) {
      return;
    }

    const URL = `${process.env.REACT_APP_API_ENDPOINT}/api/pearl/post?page_no=${pageNo}`;

    fetch(URL, {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((users) => {
        setPosts(posts.concat(users.data));
        setMaxLength(users.totalData);
        setPageNo(pageNo + 1);
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const loader = useMemo(() => <p>Loading...</p>, []);
  const endMessage = useMemo(
    () => <div className={styles.end_msg}>You have reached the end</div>,
    []
  );

  let content = (
    <div className={styles.notfound}>
      <img src={notfound} alt="Not found vector" />
      <div>
        <h3>Posts Not Available</h3>
        <p>
          There are no posts avaiable at the moment.
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
export default Home;
