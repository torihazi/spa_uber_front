import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Restaurants from "./containers/Restaurants";
import Foods from "./containers/Foods";
import Orders from "./containers/Orders";
import NotFound from "./containers/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/restaurants/:restaurantsId/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
