import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#4dd0e1",
    color: "#333",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256,
  },
});

const PrimaryButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      varient="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
