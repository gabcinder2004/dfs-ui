import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider, Hidden } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import statistics from "./statisticEnum";

const useStyles = makeStyles((theme) => ({
  '@global':{
    "@keyframes burn": {
      "from": {
        textShadow:
          "-.1em 0 .3em #fefcc9, .1em -.1em .3em #feec85, -.2em -.2em .4em #ffae34, .2em -.3em .3em #ec760c, -.2em -.4em .4em #cd4606, .1em -.5em .7em #973716, .1em -.7em .7em #451b0e;",
      },
      "45%": {
        textShadow:
          ".1em -.2em .5em #fefcc9, .15em 0 .4em #feec85, -.1em -.25em .5em #ffae34, .15em -.45em .5em #ec760c, -.1em -.5em .6em #cd4606, 0 -.8em .6em #973716, .2em -1em .8em #451b0e; ",
      },
      "70%": {
        textShadow:
          " -.1em 0 .3em #fefcc9, .1em -.1em .3em #feec85, -.2em -.2em .6em #ffae34, .2em -.3em .4em #ec760c, -.2em -.4em .7em #cd4606, .1em -.5em .7em #973716, .1em -.7em .9em #451b0e; ",
      },
      "to": {
        textShadow:
          "-.1em -.2em .6em #fefcc9, -.15em 0 .6em #feec85, .1em -.25em .6em #ffae34, -.15em -.45em .5em #ec760c, .1em -.5em .6em #cd4606, 0 -.8em .6em #973716, -.2em -1em .8em #451b0e; ",
      },
    },
  },
  root: {
    [theme.breakpoints.down("xs")]: {
      width: 250,
      height: 345,
    },
    [theme.breakpoints.only("lg")]: {
      width: 140,
      height: 300,
    },
    [theme.breakpoints.only("xl")]: {
      width: 150,
      height: 350,
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
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("xs")]: {
      fontSize: "16px",
      fontWeight: "bold",
    },

    [theme.breakpoints.only("lg")]: {
      fontSize: "15px",
      fontWeight: "bold",
    },

    [theme.breakpoints.only("xl")]: {
      fontSize: "15px",
      fontWeight: "bold",
      overflow: "hidden",
      whiteSpace: "",
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
    [theme.breakpoints.down("xs")]: {
      height: 70,
    },
    [theme.breakpoints.up("lg")]: {
      height: 100,
    },
  },
}));

export default function MediaCard(props) {
  const player = props.player;
  const classes = useStyles(props);

  let color = "black";

  const buildStatisticLine = (stats) => {
    let organizedStats = {
      pass: "",
      run: "",
      rec: "",
      def: "",
      misc: "",
    };

    if (stats === null || stats === undefined) {
      return organizedStats;
    }

    for (let i = 0; i < stats.length; i++) {
      const stat = stats[i];
      const statId = stat["id"];
      const ignoredStatIds = ["310"];
      if (ignoredStatIds.includes(statId)) {
        continue;
      }

      if (statId > 100 && statId < 200) {
        organizedStats["pass"] += `${stat["quantity"]} ${
          statistics[stat["id"]]
        }\n`;
      }

      if (statId > 200 && statId < 300) {
        organizedStats["run"] += `${stat["quantity"]} ${
          statistics[stat["id"]]
        }\n`;
      }

      if (statId > 300 && statId < 400) {
        organizedStats["rec"] += `${stat["quantity"]} ${
          statistics[stat["id"]]
        }\n`;
      }

      if (statId > 900 && statId < 1000) {
        organizedStats["def"] += `${stat["quantity"]} ${
          statistics[stat["id"]]
        }\n`;
      }

      if (statId < 100) {
        organizedStats["misc"] += `${stat["quantity"]} ${
          statistics[stat["id"]]
        }\n`;
      }
    }

    return organizedStats;
  };

  let stats = buildStatisticLine(player.stats);

  if (player.lastName === "") {
    player.lastName = "TBD";
    player.points = 0;
    player.salary = 0;
  }

  return (
    <Card className={classes.root} variant={"outlined"}>
      {player.lastName == "TBD" && (
        <CardMedia
          className={classes.media}
          image="https://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg"
        />
      )}
      {player.lastName != "TBD" && (
        <CardMedia className={classes.media} image={player.image} />
      )}
      <CardContent className={classes.content}>
        <Grid
          container
          justifyContent="center"
          style={{ display: "flex", marginTop: "-10px" }}
        >
          <Grid item xs={12}>
            {player.position != "DEF" && (
              <Typography
                gutterBottom
                variant="p"
                className={classes.playerName}
              >
                {player.firstName} {player.lastName}
              </Typography>
            )}
            {player.position == "DEF" && (
              <Typography
                gutterBottom
                variant="p"
                className={classes.playerName}
              >
                {player.lastName}
              </Typography>
            )}
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
          {player.lastName != "TBD" && (
            <Grid container justifyContent="center">
              {stats.pass != "" && (
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="p"
                    style={{ color, fontSize: "11px", whiteSpace: "pre-line" }}
                  >
                    {stats.pass}
                  </Typography>
                </Grid>
              )}

              {stats.run != "" && (
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="p"
                    style={{ color, fontSize: "11px", whiteSpace: "pre-line" }}
                  >
                    {stats.run}
                  </Typography>
                </Grid>
              )}

              {stats.rec != "" && (
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="p"
                    style={{ color, fontSize: "11px", whiteSpace: "pre-line" }}
                  >
                    {stats.rec}
                  </Typography>
                </Grid>
              )}

              {stats.def != "" && (
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="p"
                    style={{ color, fontSize: "11px", whiteSpace: "pre-line" }}
                  >
                    {stats.def}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardContent className={classes.content}>
        <Grid container justifyContent="center">
          <Grid item xs={12} style={{}}>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.playerScore}
            >
              {player.points} pts
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ display: "contents" }}>
            <Chip
              label={player.position}
              color="primary"
              size="small"
              variant="outlined"
              style={{ marginRight: 5 }}
            />
            <Chip
              label={`$${player.salary}`}
              color="primary"
              variant="outlined"
              size="small"
              style={{ marginLeft: 5 }}
            />
          </Grid>
        </Grid>
      </CardContent>
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
