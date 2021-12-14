import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
    const [admin, setAdmin] = useState(true);

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/login"
                    element={<Login setAdmin={setAdmin} admin={admin} />}
                />
                <Route
                    exact
                    path="/"
                    element={!admin ? <Navigate to="/login" /> : <Home />}
                />
            </Routes>
        </Router>
    );
}

export default App;
