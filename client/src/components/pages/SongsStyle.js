import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import api from "../../api";

class SongsStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: 0.7,
      energy: 0.3,
      acousticness: 0.5,
      moreSongs: [],
      filtered: []
    };
  }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      console.log(moreSongs);
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  handleInput = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    let filtered = this.state.moreSongs
      .map(song => {
        // a score is added, the closer score and 0 are, the better it is
        let score =
          Math.abs(song.danceability - this.state.danceability) +
          Math.abs(song.energy - this.state.energy) +
          Math.abs(song.acousticness - this.state.acousticness);
        return {
          ...song,
          score: score
        };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);

    return (
      <div className="form-wrapper">
        <form className="form">
          <div className="form-label">
            <span>Slow</span>
            <span>Dancey</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.danceability}
            onChange={danceability => this.setState({ danceability })}
            onChangeComplete={this.getAllSongs}
            // {danceability => console.log("value1: " + danceability)}
          />

          <div className="form-label">
            <span>Moody</span>
            <span>Cheerful</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.energy}
            onChange={energy => this.setState({ energy })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {energy => console.log("value1: " + energy)} */}

          <div className="form-label">
            <span>Chill</span>
            <span>Aggressive</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.acousticness}
            onChange={acousticness => this.setState({ acousticness })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {acousticness => console.log("value1: " + acousticness)} */}
        </form>

        <div className="songs-preview-container">
          {filtered.map(song => (
            <div>
              <h2>{song._id}</h2>
              <button>remove item</button>
              <div>
                <img>{song.albumArt}</img>
                <h5>{song.title}</h5>
                <h5>{song.artistName}</h5>
              </div>
            </div>
          ))}
        </div>
        {/* <button onClick={this.getAllSongs} className="btn-style temp-btn">
          Preview Songs
        </button> */}
      </div>
    );
  }
}

export default SongsStyle;
