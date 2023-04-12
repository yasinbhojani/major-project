import Card from "./Card";
import styles from "./Cards.module.css";
import user from "../../../assets/Dashboard/Analytics/user.svg";
import post from "../../../assets/Dashboard/Analytics/post.svg";
import like from "../../../assets/Dashboard/Analytics/like.svg";
import message from "../../../assets/Dashboard/Analytics/message.svg";
const Cards = () => {
  return (
    <div className={styles.cards}>
      <Card table="users" text="total accounts" icon={user} />
      <Card table="posts" text="total pearls" icon={post} />
      <Card table="likes" text="total likes" icon={like} />
      <Card table="chats" text="total chats" icon={message} />
    </div>
  );
};
export default Cards;
