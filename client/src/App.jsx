import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <div>hello</div>
      </Router>
    </>
  );
}

export default App;
