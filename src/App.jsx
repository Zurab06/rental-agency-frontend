import { Route, Routes } from "react-router-dom";
import UserPageMain from "./components/Authorization/UserPage/UserPageMain/UserPageMain";
import ImmovablesPage from "./components/ImmovablesPage/ImmovablesPage";
import PaymentPage from "./components/PaymentPage/index";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/immovables/:id" element={<ImmovablesPage />} />
        <Route path="/user/main" element={<UserPageMain />} />
        <Route path="/user/payment/:id" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
}

export default App;
