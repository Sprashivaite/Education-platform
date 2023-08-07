import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { HomePage } from "./pages/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import ClassPage from "./pages/ClassPage/ClassPage";
import AppHeader from "./components/Header";
import CoursePage from "./pages/CoursePage/CoursePage";

const { Content, Footer } = Layout;

const App: FC = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setJwtToken(token);
  };

  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    const storedJwtToken = localStorage.getItem("jwtToken");
    if (storedJwtToken) {
      setJwtToken(storedJwtToken);
    }
  }, []);

  return (
    <Router>
      <Layout style={{ height: "100%" }}>
        <AppHeader jwtToken={jwtToken} onLogout={handleLogout} />
        <Content style={{ padding: "50px 50px", flexShrink: "0" }}>
          <ToastContainer autoClose={3000} position="top-right" />

          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
              <Route path="/register" element={<RegistrationPage />} />
              {jwtToken && (
                <>
                  <Route path="/courses" element={<CoursesPage />} />{" "}
                  <Route path="/course/:courseId" element={<CoursePage />} />
                  <Route path="/class/:classId" element={<ClassPage />} />
                </>
              )}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
