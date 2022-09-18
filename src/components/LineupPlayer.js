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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  playerPoints: {
    fontWeight: "bold",
    fontSize: "25px",
  },
  playerStats: {
    color: "gray",
    fontSize: "15px",
  },
  projectedPoints: {
    color: "gray",
    fontSize: "15px",
    fontStyle: "italic",
  },
  playerName: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  playerPosition: {
    fontSize: "18px",
    width: "70px",
    marginLeft: "-10px",
  },
  rowContainer: {
    minHeight: "100px",
  },
  secondaryActionContainer: {
    minHeight: "100px",
    marginLeft: "-25px"
  },
  playerAvatar: {
    width: "100px",
    height: "100px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "-20px",
  },
  unknownPlayerAvatar: {
    width: "60px",
    height: "75px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  chipLabel: {
    marginLeft: "-8px",
  },
  chipPrimary: {
    color: 'green',
    border: 'none',
    marginLeft: "-2x",
    marginTop: "-2x",
    fontSize: "15px"
  },
  chipPickedRoot: {
    marginTop: '8px'
  },
  gameStatus: {
    fontSize: '12px',
    fontStyle: 'Italic',
  }
}));

export default function LineupPlayer(props) {
  const classes = useStyles();
  const { player, windowWidth } = props;

  const playerRevealed = player.id != "";
  const getCleanStats = (stats) => {
    var cleanStats = [];
    var statObject = {};

    stats.forEach((stat) => {
      var firstChar = Array.from(stat.id)[0];
      if (statObject[firstChar]) {
        statObject[firstChar] =
          statObject[firstChar] + ", " + stat.quantity + " " + stat.abbr;
      } else {
        statObject[firstChar] = stat.quantity + " " + stat.abbr;
      }
    });

    for (const [key, value] of Object.entries(statObject)) {
      cleanStats.push(value);
    }

    return cleanStats;
  };

  const getLineupPlayer = () => {
    return (
      <Paper>
        <ListItem
          id={player.id}
          alignItems="flex-start"
          divider
          classes={{ container: classes.rowContainer }}
        >
          <ListSubheader classes={{ root: classes.playerPosition }}>
            {player.position}
          </ListSubheader>
          <ListItemAvatar>
            {<Avatar src={player.image} className={playerRevealed ? classes.playerAvatar : classes.unknownPlayerAvatar} />}
          </ListItemAvatar>

          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  classes={{
                    root: classes.playerName,
                  }}
                  className={player.hadBigPlay ? "fire" : ""}
                >
                  {player.firstName} {player.lastName}{" "}
                  
                  <Chip
                    size="small"
                    variant="outlined"
                    color="primary"
                    classes={{ label: classes.chipLabel, colorPrimary: classes.chipPrimary}}
                    className="notextshadow"
                    icon={<AttachMoneyIcon />}
                    label={player.salary}
                  />
                </Typography>
              </React.Fragment>
            }
            hidden={!playerRevealed}
            secondary={
              <React.Fragment>
                <Typography classes={{ root: classes.gameStatus}}>{player.gameStatus}</Typography>
                {player.stats &&
                  getCleanStats(player.stats).map((stat) => {
                    return (
                      <Typography classes={{ root: classes.playerStats }}>
                        {stat}
                      </Typography>
                    );
                  })}
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction classes={{ root: classes.secondaryActionContainer }}>
            <ListItemText
              primary={player.points + " points"}
              classes={{ primary: classes.playerPoints, root: classes.rowContainer }}
              secondary={
                <React.Fragment>
                  <Typography classes={{ root: classes.projectedPoints }}>
                    {"Projected: " + player.projectedPoints + " pts"}
                  </Typography>
                  <Chip
                    size="small"
                    label={
                      ((player.draftPercent / 100) * 27).toFixed(0) + " picked"
                    }
                    classes={{root: classes.chipPickedRoot}}
                  />
                </React.Fragment>
              }
              hidden={!playerRevealed}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    );
  };

  return getLineupPlayer();
}
