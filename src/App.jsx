import "./App.css";
import TraslateForm from "./TraslateForm";

function App() {
  return (
    <div className="app-container">
      <div className="banner-container">
        <img alt="banner" src="public/world.png" className="banner" />
      </div>
      <TraslateForm></TraslateForm>
    </div>
  );
}

export default App;
