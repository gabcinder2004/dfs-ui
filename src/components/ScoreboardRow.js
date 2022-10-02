import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
    paddingTop: "0px",
    paddingBottom: "16px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontFamily: "Calibri",
    // flexBasis: "100%",
    // flexShrink: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(20),
      marginLeft: theme.typography.pxToRem(10),
      whiteSpace: "nowrap",

      textOverflow: "ellipsis",
    },
  },
  secondaryHeading: {
    fontFamily: "Calibri",
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(16),
      color: "black",
    },
  },
  points: {
    fontFamily: "Calibri",
    fontSize: theme.typography.pxToRem(24),
    color: "black",
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(16),
      color: "black",
    },
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.typography.pxToRem(5),
      marginLeft: theme.typography.pxToRem(25),
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 10,
    },
  },
  inline: {
    display: "inline",
  },
  chipLabel: {
    marginLeft: "-8px",
  },
  rowContainer: {
    minHeight: "50px",
  },
}));

export default function ScoreboardRow(props) {
  const classes = useStyles();

  const getRow = (team) => {
    const getAdvancedInformation = (lineup) => {
      let salary = 200;
      let projPts = 0;
      let bigPlayStatus = false;
      for (var player of lineup) {
        salary -= player.salary;

        if (player.hadBigPlay) {
          bigPlayStatus = true;
        }
      }

      return { remainingSalary: salary, projPts, bigPlayStatus };
    };

    const onPlayerClick = () => {
      props.onPlayerClick(props.team);
    };

    const info = getAdvancedInformation(team.lineup.players);
    return (
      <List classes={{ root: classes.root }}>
        <Paper>
          <ListItem
            id={team.name}
            alignItems="flex-start"
            classes={{ root: classes.rowContainer }}
            onClick={onPlayerClick}
          >
            <ListSubheader>#{team.rank}</ListSubheader>
            <ListItemAvatar>
              {<Avatar src={team.imageThumbUrl} className={classes.avatar} />}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={info.bigPlayStatus ? "fire" : ""}>
                  {team.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Chip
                    classes={{ label: classes.chipLabel }}
                    size="small"
                    icon={<AttachMoneyIcon />}
                    label={info.remainingSalary + " left"}
                  />
                  <Chip
                    size="small"
                    icon={<TimerIcon />}
                    label={team.remainingTimeUnit + " min left"}
                  />
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction classes={{ root: classes.rowContainer }}>
              <ListItemText
                primary={team.score + " pts"}
                secondary={
                  <React.Fragment>
                    <Typography
                      style={{ fontStyle: "italic", fontSize: "12px" }}
                    >
                      {"Proj: " + team.lineup.stats.projectedPoints.toFixed(2)}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      </List>
    );
  };

  return <div>{getRow(props.team)}</div>;
}
