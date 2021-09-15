import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: 250,
      height: 300,
    },
    [theme.breakpoints.only("lg")]: {
      width: 140,
      height: 300,
    },
    [theme.breakpoints.only("xl")]: {
      width: 150,
      height: 300,
    },
  },
  media: {
    [theme.breakpoints.up("xs")]: {
      height: 175,
      width: 250,
    },
    [theme.breakpoints.only("lg")]: {
      width: 145,
      height: 125,
    },
    [theme.breakpoints.only("xl")]: {
      width: 150,
      height: 125,
    },
  },
  playerName: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "16px",
    },

    [theme.breakpoints.only("lg")]: {
      fontSize: "15px",
      fontWeight: "bold",
    },

    [theme.breakpoints.only("xl")]: {
      fontSize: "15px",
      fontWeight: "bold",
      whiteSpace:"nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  playerInfo: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.typography.pxToRem(5),
    },
    [theme.breakpoints.only("lg")]: {
      marginTop: theme.typography.pxToRem(5),
      valign: "bottom",
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: theme.typography.pxToRem(35),
    },
  },
  playerScore: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "24px",
      fontWeight: "bold",
    },
  },
  content: {
    height: 50,
  },
}));

export default function MediaCard(props) {
  const player = props.player;
  const classes = useStyles();

  let nameSize = "h4";
  let color = "gray";
  if (player.gameStatusType == "IN_PROGRESS") {
    color = "black";
  }

  if (player.firstName === "") {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="p" component={nameSize}>
              TBD
            </Typography>
          </CardContent>
          <CardContent className={classes.content}>
            <Typography variant="body2" color="textSecondary" component="p">
              {player.position}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
              $0
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
              0 pts
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card className={classes.root} variant={"outlined"}>
      <CardActionArea>
        <CardMedia className={classes.media} image={player.image} />
        <CardContent className={classes.content}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="p"
                className={classes.playerName}
              >
                {player.firstName} {player.lastName}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="p"
                component="p"
                style={{ color, fontSize: "11px" }}
              >
                {player.gameStatus}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.playerInfo}
          >
            <Grid item xs={12}>
              {" "}
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="textPrimary" component="p">
                ${player.salary}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="textPrimary"
                component="p"
                className={classes.playerScore}
              >
                {player.points} pts
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/*
<CardContent className={classes.content}>
          <Typography gutterBottom variant="p" component={nameSize}>
            {player.firstName} {player.lastName}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="p"
            style={{ color, fontSize: "12px" }}
          >
            {player.gameStatus}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {player.position}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            Salary: ${player.salary}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            Points: {player.points}
          </Typography>
        </CardContent>
*/
