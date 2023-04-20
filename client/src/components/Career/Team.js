import styles from "./Team.module.css";
import soham from "../../assets/Career/soham.png";
import yasin from "../../assets/Career/yasin.png";
import zakir from "../../assets/Career/zakir.jpg";
import linkedin from "../../assets/Career/linkedin.svg";
import instagram from "../../assets/Career/instagram.svg";
import twitter from "../../assets/Career/twitter.svg";
import github from "../../assets/Career/github.svg";
const Card = [
  {
    imgSrc: soham,
    name: "Soham Ganmote",
    role: "Full Stack Developer",
    description:
      "Passionate full stack developer with over 1 years of experience, I developed chat system and admin pannel.",
    linkedin: "https://www.linkedin.com/in/sohamganmote/",
    socialMedia: "https://github.com/SohamGanmote",
  },
  {
    imgSrc: yasin,
    name: "Yasin Bhojani",
    role: "Full Stack Developer",
    description:
      "I am full stack developer with over 1 years plus experience,helped to developed feed with infinite scroll,storage bucket and some API's",
    linkedin: "https://www.linkedin.com/in/yasinbhojani/",
    socialMedia: "https://twitter.com/yasin_bhojani",
  },
  {
    imgSrc: zakir,
    name: "Zakirhussain Kalwani",
    role: "UI/UX Designer",
    description:
      "Helped to design most of the pages in Figma, help dev's to find perfect SVG for the website",
    linkedin: "https://www.linkedin.com/in/zakirhussain-kalwani-891a2a164/",
    socialMedia: "https://www.instagram.com/kalwani_zakirhussain/",
  },
];
const Team = () => {
  return (
    <>
      <h1 className={styles.teamHeder}>Meet Our Team</h1>
      <p className={styles.summary}>
        Our developers team is a group of skilled professionals who work
        collaboratively to design, build, and maintain software applications.
        Each team member brings a unique set of technical skills and experience
        to the table, allowing us to tackle complex projects with agility and
        precision. Whether it's coding, testing, or debugging, our team is
        dedicated to delivering high-quality software solutions that meet the
        needs of our clients. We value open communication, teamwork, and
        continuous learning, which allows us to stay on top of the latest
        industry trends and technologies.
      </p>
      <div className={styles.Team}>
        {Card.map((member) => {
          return (
            <div key={member.name} className={styles.card}>
              <img src={member.imgSrc} alt="" className={styles.profile} />
              <h1>{member.name}</h1>
              <p>{member.description}</p>
              <p className={styles.role}>{member.role}</p>
              <div className={styles.icon}>
                <a href={member.socialMedia} target="_blank" rel="noreferrer">
                  {member.socialMedia.includes("twitter") && (
                    <img src={twitter} alt="" />
                  )}
                  {member.socialMedia.includes("instagram") && (
                    <img src={instagram} alt="" />
                  )}
                  {member.socialMedia.includes("github") && (
                    <img src={github} alt="" />
                  )}
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Team;
