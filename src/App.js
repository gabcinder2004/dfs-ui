import "./App.css";
import React from "react";
import { Box, CircularProgress, Paper, Typography, Avatar } from "@material-ui/core";
import SimpleAccordion from "./components/Accordian";
import Grid from "@material-ui/core/Grid";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";

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
    selectedTeam: 0,
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

        if (lineup != null) {
          for (var player of lineup) {
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

        this.setState({ teams: teams, loaded: true, players, playerNames });
        this.filterTeamList(this.state.searchValue);
      }
    }
  }

  async getTeams() {
    let response = await fetch(
      `http://localhost:3001/getTeams`,
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
      return this.setState({
        filteredTeams: this.state.teams,
        searchValue: "",
      });
    }

    let firstName = searchCriteria.split(" ")[0];
    let lastName = searchCriteria.split(" ")[1];
    let jr = searchCriteria.split(" ")[2] ?? "";
    let combined = lastName + " " + jr

    let filteredTeams = [];
    for (var team of this.state.teams) {
      for (var player of team.lineup) {
        if (player.firstName == firstName && player.lastName == combined.trim()) {
          filteredTeams.push(team);
        }
      }
    }

    this.setState({ filteredTeams, searchValue: searchCriteria });
  }

  async getTeamLineup(id) {
    let response = await fetch(
      `http://localhost:3001/getLineupForTeam?id=${id}`,
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

  teamOnClick = (e) => {
    console.log(e.target.id);
    this.setState({ selectedTeam: e.target.id });
  }


  render() {
    const { windowWidth, teams, loaded, selectedTeam, players, playerNames, filteredTeams } =
      this.state;
    // console.log(teams);
    return (
      <div className="App">
        <Typography variant="h3" component="div" gutterBottom>
          Maddengamers DFS
          <Typography variant="h5" display="block" gutterBottom>
            Week 10
          </Typography>
        </Typography>

        {loaded == true &&
          <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid container spacing={5}>
              <Grid item xs={3}>
                {teams.map((team, index) => {
                  return (<Paper id={index} elevation={2} style={{ "fontSize": 24, marginTop: 10, paddingBottom: 10, height: '25px' }} onClick={this.teamOnClick}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <Avatar
                        src={team.imageThumbUrl}
                        id={index}
                        style={{ width: 30, height: 30, marginLeft: 5, marginTop: 2 }}
                      />
                      <Typography id={index} style={{ width: '80%' }}>
                        {team.name}
                      </Typography>
                      <Typography
                        id={index}
                        style={{ width: '20%' }}
                      >
                        <strong>{team.score}</strong>
                      </Typography>
                    </div>
                  </Paper>)
                })}

              </Grid>
              <Grid item xs={9} style={{ marginTop: 10 }}>
                <Paper>{teams[selectedTeam].name}</Paper>
              </Grid>
            </Grid>
          </Box>}

        {loaded == false && <CircularProgress />}
        {/* <Box>
            <h1>Maddengamers DFS</h1>
            <h3 style={{ marginTop: "-5%" }}>Week 18 Live Tracker</h3>
          </Box>
          {loaded != true ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            // <SimpleAccordion teams={filteredTeams} windowWidth={windowWidth} />
            "hello"
          )} */}
      </div >
    );
  }
}

export default App;
