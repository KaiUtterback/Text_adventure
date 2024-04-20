import { Game } from '../game/Game';
import './App.css';

const game = new Game();

function App() {
  return (
    <div className="App">
      <h1>Legend Text Game</h1>
      <div className="button-group">
        <button onClick={() => game.save()}>Save Game</button>
        <button onClick={() => game.load()}>Load Game</button>
        <button onClick={() => game.reset()}>Reset Game</button>
        <button onClick={() => console.clear()}>Clear Console</button>
      </div>
      <div className="button-group">
        <button onClick={() => game.player.move('north')}>Move North</button>
        <button onClick={() => game.player.move('east')}>Move East</button>
        <button onClick={() => game.player.move('west')}>Move West</button>
        <button onClick={() => game.player.move('south')}>Move South</button>
      </div>
      <div className="button-group">
        <button onClick={() => game.player.describeLocation()}>
          Describe Location
        </button>
      </div>
    </div>
  );
}

export default App;
