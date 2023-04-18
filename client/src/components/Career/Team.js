import styles from "./Team.module.css";
import sohma from "../../assets/Career/soham.png";
import yasin from "../../assets/Career/yasin.png";
import zakir from "../../assets/Career/zakir.jpg";
import linkedin from "../../assets/Career/linkedin.svg";
import instagram from "../../assets/Career/instagram.svg";
const Card = [
  {
    imgSrc: sohma,
    name: "Soham Ganmote",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/sohamganmote/",
    instagram: "https://www.instagram.com/soham___g___/",
  },
  {
    imgSrc: yasin,
    name: "Yasin Bhojani",
    role: "Full Stack Developer",
    linkedin: "https://www.linkedin.com/in/yasinbhojani/",
    instagram: "https://www.instagram.com/yasin_bhojani/",
  },
  {
    imgSrc: zakir,
    name: "Zakirhussain Kalwani",
    role: "UI/UX Designer",
    linkedin: "https://www.linkedin.com/in/zakirhussain-kalwani-891a2a164/",
    instagram: "https://www.instagram.com/kalwani_zakirhussain/",
  },
];
const Team = () => {
  return (
    <>
      <h1 className={styles.teamHeder}>Meet Our Team</h1>
      <div className={styles.Team}>
        {Card.map((member) => {
          return (
            <div key={member.name} className={styles.card}>
              <img src={member.imgSrc} alt="" className={styles.profile} />
              <h1>{member.name}</h1>
              <p>{member.role}</p>
              <div className={styles.icon}>
                <a href={member.instagram} target="_blank" rel="noreferrer">
                  <img src={instagram} alt="" />
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
