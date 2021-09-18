import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimpleCard from "./Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LineupGrid from "./Lineup";
import { Avatar, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "100%",
    flexShrink: 0,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(20),
      marginLeft: theme.typography.pxToRem(10),
      whiteSpace: "nowrap",

      textOverflow: "ellipsis",
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
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
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [spacing, setSpacing] = React.useState(1);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAccordian = (team, windowWidth) => {
    const calculateRemainingSalary = (lineup) => {
      let salary = 200;
      for(var player of lineup){
        salary -= player.salary;
      }

      return salary;
    };

    const remainingSalary = calculateRemainingSalary(team.lineup);
    return (
      <Accordion
        expanded={expanded === team.name}
        onChange={handleChange(team.name)}
        key={team.name}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${team.name}bh-content`}
          id={`${team.name}bh-header`}
        >
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item xs={1} md={3} lg={1}>
              <Typography className={classes.heading}>{team.rank}.</Typography>
            </Grid>
            <Grid item xs={11} md={3} lg={2} style={{ textAlign: "left" }}>
              <Avatar
                src={team.imageThumbUrl}
                className={classes.avatar}
                style={{ float: "left" }}
              />
              <Typography className={classes.heading}>{team.name}</Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <Hidden only="xs">
                <Typography className={classes.secondaryHeading}>
                  {team.score} pts
                </Typography>
              </Hidden>
              <Hidden only={["lg", "xl"]}>
                <Typography className={classes.secondaryHeading} style={{textAlign:"left", paddingLeft: '25%'}}>
                <strong>Points:</strong> {team.score}
                </Typography>
              </Hidden>
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <Typography className={classes.secondaryHeading} style={{textAlign:"left", paddingLeft: '25%'}}>
                <strong>Time Left:</strong> {team.remainingTimeUnit} min
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <Typography className={classes.secondaryHeading} style={{textAlign:"left", paddingLeft: '25%'}}>
              <strong>Salary Left:</strong> ${remainingSalary}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ paddingRight: "2.5%" }}>
          <LineupGrid lineup={team.lineup} windowWidth={windowWidth} />
          {/* {team.lineup.map((player) => {
            return <SimpleCard player={player} windowWidth={windowWidth} />;
          })} */}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <div className={classes.root}>
      {props.teams.map((team) => {
        return getAccordian(team, props.windowWidth);
      })}
    </div>
  );
}
