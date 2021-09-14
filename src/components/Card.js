import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
  
  },
  media: {
    height: 125,
  },
  content: {
    height: 50,
  },
});

export default function MediaCard(props) {
  const winWidth = props.windowWidth;
  const player = props.player;
  const classes = useStyles();

  let nameSize = "h6";
  let color = 'gray';
  if(player.gameStatusType == "IN_PROGRESS"){
    color="black";
  }
  if (winWidth > 1500) {
    nameSize = "h2";
  } else if (winWidth > 1200) {
    nameSize = "h4";
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
          <Typography gutterBottom variant="p" component={nameSize}>
            {player.firstName} {player.lastName}
          </Typography>
          <Typography gutterBottom variant="p" component="p" style={{color }}>
            {player.gameStatus}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
            
          <Typography variant="body2" color="textSecondary" component="p">
            {player.position}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            ${player.salary}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {player.points} pts
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
