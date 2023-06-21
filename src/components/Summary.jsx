import excellent from "../assets/images/excellent.png";
import failed from "../assets/images/failed.png";
import good from "../assets/images/good.png";
import very_good from "../assets/images/very_good.png";
import classes from "../styles/Summary.module.css";

// eslint-disable-next-line react/prop-types
export default function Summary({ score, noq }) {
  console.log("first");
  const getImage = () => {
    if ((score / (noq * 5)) * 100 < 5) {
      return failed;
    } else if ((score / (noq * 5)) * 100 < 75) {
      return good;
    } else if ((score / (noq * 5)) * 100 < 100) {
      return very_good;
    } else {
      return excellent;
    }
  };

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br /> {score} out of {noq * 5}
        </p>
      </div>

      <div className={classes.badge}>
        <img src={getImage()} alt="Success" />
      </div>
    </div>
  );
}
