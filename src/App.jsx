import "./App.css";
import TraslateForm from "./TraslateForm";

function App() {
  return (
    <div className="app-container">
      <div className="banner-container">
        <img
          alt="banner"
          src="https://rafael-valdez-public.s3.us-east-1.amazonaws.com/image.png"
          className="banner"
        />
      </div>
      <TraslateForm></TraslateForm>
    </div>
  );
}

export default App;
