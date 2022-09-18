import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import { Avatar } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from "@material-ui/core/Chip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import LineupPlayer from "./LineupPlayer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function LineupScreen(props) {
  const classes = useStyles();
  const { teams, windowWidth } = props;

  const getLineupScreen = () => {
    var team = props?.selectedPlayer;

    if (team == null) {
      return <Paper>No team selected.</Paper>;
    }

    console.log(team);
    return (
      <Paper>
        {team.name}
        <List>
          {team.lineup.players.map((player) => {
            return <LineupPlayer player={player}/>;
          })}
        </List>
      </Paper>
    );
  };

  return getLineupScreen();
}
