import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Results from "../pages/Results";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Quiz/:category" element={<Quiz />} />
      <Route path="/Results/:score" element={<Results />} />
    </Routes>
  );
}

