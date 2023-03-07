import styles from "./About.module.css";
import logo from "../../assets/About/logo.png";
import Button from "../../components/UI/Button/Button";
import feed from "../../assets/About/feed.png";
import news from "../../assets/About/news.png";
import chat from "../../assets/About/chat.png";
import { useNavigate } from "react-router-dom";
const focus = [
  {
    headding: "Equality",
    content:
      "  All individuals will be treated fairly and without discrimination based on their race, gender, religion, sexual orientation, or any other characteristic.",
  },
  {
    headding: "Freedom of speech",
    content:
      "  Freedom of speech is an essential right, you can post your thoughts on our platform. We support initiatives that defend and respect all voices",
  },
  {
    headding: "Data Security and Safety",
    content:
      "  we know the value of data we hold, we stores data securely by encrypting it, also only authorized persons can access database",
  },
];
const features = [
  {
    headding: "Your life, your story, your platform",
    content:
      "on Feed page you can see different posts, articles or videos shared by other users, you can add comment on that posts or you can like post.",
    img: feed,
  },
  {
    headding: "Bringing the world closer, one click at a time",
    content:
      "On news page we provide latest news about any topic, user can search for different topic on news page and then he will get the results. Also, there are some trending topic are given below the news search",
    img: "",
  },
  {
    headding: "Join the conversation, join our community",
    content:
      "In chat page user can search for other users and can start conversation with them, the chat are secures so no third person can read private chats.",
    img: chat,
  },
];
const About = () => {
  let redirect = useNavigate();
  return (
    <div className={styles.about}>
      <nav>
        <div className={styles.logoAndField}>
          <img
            src={logo}
            alt=""
            onClick={() => {
              redirect("/");
            }}
          />
          <h1>Shell</h1>
        </div>
        <div className={styles.NavBtns}>
          <button className={styles.navButton}>
            <a href="#mission">Our Mission</a>
          </button>
          <button className={styles.navButton}>
            <a href="#features">Features</a>
          </button>
          <button className={styles.navButton}>Careers</button>
          <Button
            text="Shell.com"
            onClick={() => {
              redirect("/");
            }}
            className={styles.shellButton}
          />
        </div>
      </nav>
      <div className={styles.header}>
        <h1>Share your world with us, and we'll share it with the world.</h1>
        <p>
          We're excited to have you here and look forward to seeing the
          connections you make!
        </p>
        <Button
          text="Join Shell Now!"
          onClick={() => {
            redirect("/auth/login");
          }}
          className={styles.shell}
        />
        <div id="mission" />
      </div>
      <div className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a safe and inclusive space where people can
          come together, share their stories, and support one another. We
          believe our site can be a force for good, and we're committed to
          making that a reality.
        </p>
        <p>
          At our core, we value authenticity, kindness, and respect. We believe
          in celebrating diversity and creating a space where everyone feels
          welcome and heard. We're committed to fostering a positive and
          uplifting community that supports each other through the ups and downs
          of life.
        </p>
      </div>
      <h2 className={styles.mainFocusHedding}>Main Focus</h2>
      <div className={styles.mainFocus}>
        {focus.map((card) => {
          return (
            <div className={styles.mainFocusCard} key={card.headding}>
              <h6>{card.headding}</h6>
              <p>{card.content}</p>
            </div>
          );
        })}
      </div>
      <div id="features" />
      <h2 className={styles.mainFocusHedding}>Features</h2>
      <div className={styles.features}>
        {features.map((para) => {
          return (
            <div key={para.headding} className={styles.cards}>
              {para.img === "" && <img src={news} alt="" />}
              <div>
                <h2>{para.headding}</h2>
                <p>{para.content}</p>
              </div>
              {para.img !== "" && <img src={para.img} alt="" />}
            </div>
          );
        })}
      </div>
      <p className={styles.blue}>
        @2023 Team <span>Shell</span>
      </p>
    </div>
  );
};
export default About;
