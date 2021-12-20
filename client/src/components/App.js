import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import {AuthProvider} from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route
                        exact
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
