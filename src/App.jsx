import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected/ProtectedRoute ";
import Layout from "./layout/CustomerLayout";
import LayoutAdmin from "./layout/ManagerLayout";
import ProductPage from "./customer/Pages/ProductPage";
import ProductDetailsPage from "./customer/Pages/ProductDetailsPage";
import CartPage from "./customer/Pages/CartPage";
import Profile from "./customer/Pages/Profile";
import ProductManager from "./manager/Pages/ProductManager";
import UserList from "./manager/Pages/UserList";
import BanList from "./manager/Pages/BanList";
import HomePage from "./customer/Pages/HomePage";
import SubcategoriesPage from "./customer/Pages/SubcategoriesPage";
import ContactPage from "./customer/Pages/ContactPage";
import SearchPage from "./customer/Pages/SearchPage";
import LabManager from "./manager/Pages/LabManager";

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
          <Route path="/search-page" element={<SearchPage />} />
          <Route
            path="subcategories/:subcategoryName/:subcategoryId"
            element={<SubcategoriesPage />}
          />
          <Route
            path="/subcategories/:subcategoryName/:subcategoryId"
            element={<SubcategoriesPage />}
          />
        </Route>

        <Route
          path="/manager"
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
          <Route path="labs-manager" element={<LabManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
