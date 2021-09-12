import "./App.css";
import React from "react";
import { Box } from "@material-ui/core";
import SimpleAccordion from "./components/Accordian";

class App extends React.Component {
  state = {
    teams: [],
    windowWidth: window.innerWidth,
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
    }, 10000);
  }

  async dataRefresh() {
    console.log("Pulling data...");
    let teams = await this.getTeams();
    if (teams.length > 0) {
      for (var team of teams) {
        let lineup = await this.getTeamLineup(team.id);
        team.lineup = lineup;
      }

      this.setState({ teams: teams });
    }
  }

  async getTeams() {
    let port = 3001;
    let response = await fetch(`https://maddengamers-dfs-api.herokuapp/getTeams`, {
      method: "GET",
    });

    return response.json();
  }

  async getTeamLineup(id) {
    let port = 3001;
    let response = await fetch(
      `https://maddengamers-dfs-api.herokuapp/getLineupForTeam?id=${id}`,
      {
        method: "GET",
      }
    );

    return response.json();
  }

  render() {
    const { windowWidth, teams } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Box>
            <h1>Maddengamers DFS</h1>
            <h3 style={{ marginTop: -50 }}>Live Tracker</h3>
          </Box>
          <SimpleAccordion teams={teams} windowWidth={windowWidth} />
        </header>
      </div>
    );
  }
}

export default App;
