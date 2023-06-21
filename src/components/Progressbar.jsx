import { useRef, useState } from "react";
import classes from "../styles/Progressbar.module.css";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
export default function ProgressBar({ next, prev, progress, submit }) {
  const [toolTip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  function toogleTooltip() {
    if (toolTip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div
          className={classes.rangeBody}
          onMouseOver={toogleTooltip}
          onMouseOut={toogleTooltip}
        >
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span> {progress === 100 ? "Suubmit Quiz" : "Next Question"} </span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
