import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "../Layout";
import LayoutAdmin from "../LayoutAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute ";
import DashBoard from "./Admin/Pages/DashBoard";
import UserList from "./Admin/Pages/UserList";
import BanList from "./Admin/Pages/BanList";
import ProductPage from "./Pages/ProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import { Cart } from "./components/CartIcon";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product-list" element={<ProductPage />} />
          <Route path="/product-list/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="Manager">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manager/user" element={<UserList />} />
          <Route path="manager/ban-list" element={<BanList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
