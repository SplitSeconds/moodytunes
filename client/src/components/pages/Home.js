import React, { Component } from "react";
import api from "../../api";
import SpotifyPlayer from "react-spotify-player";
import Animation from "./Animation";
import Gif from "../../animation/Moodify_Logo.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: "0.4",
      value2: "",
      value3: "",
      isPlaylist: false
    };
  }
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }
  handleClick(e) {
    e.preventDefault();
    console.log(this.state.value1, this.state.value2, this.state.value3);
    let data = {
      value1: this.state.value1,
      value2: this.state.value2,
      value3: this.state.value3
      // ids: songs.audio_features.map(function(song){
      //   let result = []
      //   for (i = 0; i < songs.audio_features.length; i++){
      //     if (song.danceability > value1 && song.energy > value2){
      //       result.push(song.id)
      //     }
      //     console.log("RESULT", result)
      //     return result
      //   }
      // })
    };
    api
      .postUserInput(data)
      .then(result => {
        this.setState({
          value1: "0.2",
          value2: "",
          value3: "",
          isPlaylist: true,
          message: `Your playlist will be created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  render() {
    return (
      <div className="Home">
        {/* <Animation /> */}
        <img src={Gif} className="gif" alt="logo-ani" />
        <h2>How do you feel today?</h2>
        <form>
          Value1:{" "}
          <input
            className="input-field"
            type="number"
            min="0"
            max="1"
            step="0.2"
            value={this.state.value1}
            onChange={e => {
              this.handleInputChange("value1", e);
            }}
          />{" "}
          <br />
          Value2:{" "}
          <input
            type="number"
            value={this.state.value2}
            onChange={e => {
              this.handleInputChange("value2", e);
            }}
          />{" "}
          <br />
          Value3:{" "}
          <input
            type="number"
            value={this.state.value3}
            onChange={e => {
              this.handleInputChange("value3", e);
            }}
          />{" "}
          <br />
          <button onClick={e => this.handleClick(e)} className="btn-style">
            Get playlist
          </button>
        </form>

        {/* <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={18}
          maximumValue={71}
          value={this.state.value1}
          onValueChange={value1 => this.setState({ value1: value1 })}
          onSlidingComplete={value1 => this.getVal(value1)}
        /> */}

        <div>
          <h3>Playlist</h3>

          <SpotifyPlayer
            uri="spotify:album:7M0Zg2A3mrTOOqfVyRUjb8"
            size="large"
            view="List"
            theme="dark"
          />
        </div>
      </div>
    );
  }
}

export default Home;
