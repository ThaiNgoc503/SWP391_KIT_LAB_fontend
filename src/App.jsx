import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "../Layout";
import LayoutAdmin from "../LayoutAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute ";
import UserList from "./manager/Pages/UserList";
import BanList from "./manager/Pages/BanList";
import ProductPage from "./Pages/ProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import Profile from "./Pages/Profile";
import ProductManager from "./manager/Pages/ProductManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product-list" element={<ProductPage />} />
          <Route path="/product-list/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="Manager">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserList />} />
          <Route path="user" element={<UserList />} />
          <Route path="ban-list" element={<BanList />} />
          <Route path="product-manager" element={<ProductManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
