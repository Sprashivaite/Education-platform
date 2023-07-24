import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";

import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CoursesPage from "./pages/CoursesPage";
import ClassPage from "./components/ClassPage";
import AppHeader from "./components/Header";

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setJwtToken(token);
  };

  const handleLogout = () => {
    setJwtToken(null);
  };

  useEffect(() => {
    const storedJwtToken = localStorage.getItem("jwtToken");
    if (storedJwtToken) {
      setJwtToken(storedJwtToken);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <AppHeader jwtToken={jwtToken} onLogout={handleLogout} />
        <Content style={{ padding: "50px 50px" }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
              <Route path="/register" element={<RegistrationPage />} />
              {jwtToken && <Route path="/courses" element={<CoursesPage />} />}
              <Route path="/class/:classId" element={<ClassPage />} />{" "}
            </Routes>
          </div>
        </Content>
        <ToastContainer autoClose={3000} position="top-right" />
        <Footer style={{ textAlign: "center" }}>
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
