import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
/* 
TODO
import Results from "../pages/Results";
 */
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Quiz/:category" element={<Quiz />} />
      {/* 
        <Route path="/Results" element={<Results />} />
         */}
    </Routes>
  );
}

