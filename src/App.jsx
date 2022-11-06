import { Route, Routes } from "react-router-dom";
import ImmovablesPage from "./components/ImmovablesPage/ImmovablesPage";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/immovables/:id" element={<ImmovablesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
