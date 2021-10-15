import "./App.css";
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import SimpleAccordion from "./components/Accordian";
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

class App extends React.Component {
  state = {
    teams: [],
    filteredTeams: [],
    players: [],
    windowWidth: window.innerWidth,
    searchValue: "",
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
    let players = [];
    let playerNames = [];

    if (teams == null) {
      return;
    }

    if (teams.length > 0) {
      for (var team of teams) {
        let lineup = await this.getTeamLineup(team.id);
        if (
          lineup == null ||
          lineup === {} ||
          (typeof lineup === "object" && lineup.err != null)
        ) {
          abortRefresh = true;
        }
        for (var player of lineup) {
          if (player.id != "") {
            if (players.findIndex((p) => p.id == player.id) == -1) {
              players.push(player);
            }
          }
        }

        team.lineup = lineup;
      }

      if (!abortRefresh) {
        playerNames = players.map((p) => p.firstName + " " + p.lastName);

        this.setState({ teams: teams, loaded: true, players, playerNames });
        this.filterTeamList(this.state.searchValue);
      }
    }
  }

  async getTeams() {
    let response = await fetch(
      `https://maddengamers-dfs-api.herokuapp.com/getTeams`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }

  filterTeamList(searchCriteria) {
    if (!searchCriteria || searchCriteria == "") {
      return this.setState({ filteredTeams: this.state.teams });
    }

    let firstName = searchCriteria.split(" ")[0];
    let lastName = searchCriteria.split(" ")[1];

    let filteredTeams = [];
    for (var team of this.state.teams) {
      for (var player of team.lineup) {
        if (player.firstName == firstName && player.lastName == lastName) {
          filteredTeams.push(team);
        }
      }
    }

    this.setState({ filteredTeams, searchValue: searchCriteria });
  }

  async getTeamLineup(id) {
    let response = await fetch(
      `https://maddengamers-dfs-api.herokuapp.com/getLineupForTeam?id=${id}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }

  render() {
    const { windowWidth, teams, loaded, players, playerNames, filteredTeams } =
      this.state;
    console.log(playerNames);
    return (
      <div className="App">
        <header className="App-header">
          <Box>
            <h1>Maddengamers DFS</h1>
            <h3 style={{ marginTop: "-5%" }}>Week 6 Live Tracker</h3>
            {loaded == true && (
              <Autocomplete
                options={playerNames}
                onChange={(event, newValue) => {
                  this.filterTeamList(newValue);
                }}
                style={{ backgroundColor: "white", marginBottom: "25px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Search Player"
                  />
                )}
              />
            )}
          </Box>
          {loaded != true ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            <SimpleAccordion teams={filteredTeams} windowWidth={windowWidth} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
