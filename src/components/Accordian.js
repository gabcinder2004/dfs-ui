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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "100%",
    flexShrink: 0,
    width:400
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
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
            <Grid item>
              <Typography className={classes.heading}>
                {team.rank}. {team.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                {team.score} points
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.secondaryHeading}>
                {team.remainingTimeUnit} min
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
