
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Hello from './components/Hello';


function App() {
  return (
    <div className="App">
      <Hello/>
      <Hello/>
      <Hello/>
      <Counter name = "vivek" cours= "FSD" Time = {9} />
    </div>
  );
}

export default App;
