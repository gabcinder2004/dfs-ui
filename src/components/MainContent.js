import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Scoreboard from "./Scoreboard";
import LineupScreen from "./LineupScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "-50px"
  },
}));

export default function MainContent(props) {
  const classes = useStyles();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const { teams, windowWidth } = props;
  const onPlayerClick = (team) => {
    setSelectedPlayer(team);
  };

  const getMainContent = () => {
    return (
      <Grid
        container
        alignItems="stretch"
        justifyContent="space-between"
        direction="row"
        spacing={5}
        classes={{root: classes.root}}
      >
        <Grid item lg={1} />
        <Grid item lg={4}>
          <Scoreboard
            teams={teams}
            windowWidth={windowWidth}
            onPlayerClick={onPlayerClick}
          />{" "}
        </Grid>
        <Grid item lg={6}>
          <LineupScreen teams={teams} selectedPlayer={selectedPlayer} />
        </Grid>
        <Grid item lg={1} />
      </Grid>
    );
  };

  return getMainContent();
}
