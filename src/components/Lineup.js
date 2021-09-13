import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import SimpleCard from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function LineupGrid(props) {
  const [spacing, setSpacing] = React.useState(1);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {props.lineup.map((player) => {
            return (
              <Grid key={player.id} item>
                <SimpleCard player={player} windowWidth={props.windowWidth} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
