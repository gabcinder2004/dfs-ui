import "./App.css";
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import SimpleAccordion from "./components/Accordian";
import Grid from "@material-ui/core/Grid";

class App extends React.Component {
  state = {
    teams: [],
    windowWidth: window.innerWidth,
    loaded: false,
  };

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  async componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.dataRefresh();
    setInterval(() => {
      this.dataRefresh();
    }, 60000);
  }

  async dataRefresh() {
    let abortRefresh = false;
    let teams = await this.getTeams();
    if (teams.length > 0) {
      for (var team of teams) {
        let lineup = await this.getTeamLineup(team.id);
        if(lineup == null || lineup === {} || typeof lineup === 'object'){
          abortRefresh = true;
        }
        team.lineup = lineup;
      }

      if(!abortRefresh){
        this.setState({ teams: teams, loaded: true });
      }
    }
  }

  async getTeams() {
    let port = 3001;
    let response = await fetch(
      `https://maddengamers-dfs-api.herokuapp.com/getTeams`,
      {
        method: "GET",
      }
    );

    return response.json();
  }

  async getTeamLineup(id) {
    let port = 3001;
    let response = await fetch(
      `https://maddengamers-dfs-api.herokuapp.com/getLineupForTeam?id=${id}`,
      {
        method: "GET",
      }
    );

    return response.json();
  }

  render() {
    const { windowWidth, teams, loaded } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Box>
            <h1>Maddengamers DFS</h1>
            <h3 style={{ marginTop: "-5%" }}>Week 3 Live Tracker</h3>
          </Box>
          {loaded != true ? (
            <CircularProgress style={{color: 'white'}} />
          ) : (
            <SimpleAccordion teams={teams} windowWidth={windowWidth} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
