import "./App.css";
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import MainContent from "./components/MainContent";
import SearchBar from "./components/MainContent";

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

  async getBaseUrl() {
    let url;
    switch (process.env.NODE_ENV) {
      case "development":
        url = "http://localhost:3001";
        break;
      default:
        url = "https://maddengamers-dfs-api.herokuapp.com";
    }

    return "http://localhost:3001";
  }

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
    }, 65000);
  }

  async dataRefresh() {
    let abortRefresh = false;
    let teams = await this.getTeams();
    let week = await this.getWeek();
    let players = [];
    let playerNames = [];

    if (teams == null) {
      return;
    }

    if (teams.length > 0) {
      for (var team of teams) {
        let lineup = await this.getTeamLineup(team.id);
        if (
          lineup.players == null ||
          lineup.players === {} ||
          (typeof lineup.players === "object" && lineup.players.err != null)
        ) {
          abortRefresh = true;
        }

        if (lineup != null && lineup.players != null) {
          var lineupPlayers = lineup.players;
          for (var player of lineupPlayers) {
            if (player.id != "") {
              if (players.findIndex((p) => p.id == player.id) == -1) {
                players.push(player);
              }
            }
          }

          team.lineup = lineup;
        }
      }

      if (!abortRefresh) {
        playerNames = players.map((p) => p.firstName + " " + p.lastName);

        this.setState({
          teams: teams,
          week: week.week,
          loaded: true,
          players,
          playerNames,
        });
        this.filterTeamList(this.state.searchValue);
      }
    }
  }

  async getTeams() {
    let response = await fetch(`${await this.getBaseUrl()}/getTeams`, {
      method: "GET",
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }

  async getWeek() {
    let response = await fetch(`${await this.getBaseUrl()}/getWeek`, {
      method: "GET",
    });
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  }

  filterTeamList(searchCriteria) {
    if (!searchCriteria || searchCriteria == "") {
      return this.setState({
        filteredTeams: this.state.teams,
        searchValue: "",
      });
    }

    let firstName = searchCriteria.split(" ")[0];
    let lastName = searchCriteria.split(" ")[1];
    let jr = searchCriteria.split(" ")[2] ?? "";
    let combined = lastName + " " + jr;

    let filteredTeams = [];
    for (var team of this.state.teams) {
      for (var player of team.lineup) {
        if (
          player.firstName == firstName &&
          player.lastName == combined.trim()
        ) {
          filteredTeams.push(team);
        }
      }
    }

    this.setState({ filteredTeams, searchValue: searchCriteria });
  }

  async getTeamLineup(id) {
    let response = await fetch(
      `${await this.getBaseUrl()}/getLineupForTeam?id=${id}`,
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
    const {windowWidth , week, loaded, playerNames, filteredTeams } =
      this.state;
    return (
      <div className="App">
        <header className="App-header">
            <h3 style={{marginTop:'10px'}}>Maddengamers DFS</h3>
            {/* <h3 style={{ marginTop: "-5%" }}>Week {week} Live Tracker</h3> */}
            {/* {loaded == true && (
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
            )} */}
          {loaded != true ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            <MainContent teams={filteredTeams} windowWidth={windowWidth}/>
          )}
        </header>
      </div>
    );
  }
}

export default App;
