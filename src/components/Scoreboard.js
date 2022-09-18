import React from "react";
import ScoreboardRow from "./ScoreboardRow";

export default function Scoreboard(props) {
  return (
    <div style={{maxHeight: "1200px", overflow: 'auto'}}>
      {props.teams.map((team) => {
        return <ScoreboardRow team={team} onPlayerClick={props.onPlayerClick}></ScoreboardRow>
      })}
    </div>
  );
}
