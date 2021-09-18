import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TimerIcon from "@material-ui/icons/Timer";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      {props.data.map((data) => {
        let icon;

        if (data.label === "Remaining Time") {
          icon = <TimerIcon />;
        } else if (data.label === "Remaining Salary") {
          icon = <AttachMoneyIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.value}
              className={classes.chip}
              size="medium"
              color="primary"
              style={{ "font-size": "16px", "min-width": "125px",}}
            />
          </li>
        );
      })}
    </Box>
  );
}
