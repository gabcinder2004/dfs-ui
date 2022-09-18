import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Scoreboard from "./Scoreboard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const {teams, windowWidth} = props;

  const getSearchBar = () => {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        direction="column"
        spacing={1}
      >
        <Grid item>
          <div className={classes.root}>
            <Scoreboard teams={teams} windowWidth={windowWidth} />{" "}
          </div>
        </Grid>
      </Grid>
    );
  };

  return <div>{getSearchBar()}</div>;
}
