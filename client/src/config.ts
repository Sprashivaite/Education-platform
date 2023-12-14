const SERVER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://education-platform-4cm3.onrender.com/"
    : "http://localhost:3001";

export default SERVER_BASE_URL;
