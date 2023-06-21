import classes from "../styles/Illustration.module.css";

// eslint-disable-next-line react/prop-types
export default function Illustration({ imageSrc }) {
  return (
    <div className={classes.illustration}>
      <img src={imageSrc} alt="Signup" />
    </div>
  );
}
