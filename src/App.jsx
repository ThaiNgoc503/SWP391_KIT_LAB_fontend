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
import SearchPage from "./customer/Pages/SearchPage";
import LabManager from "./manager/Pages/LabManager";
import DashBoard from "./manager/Pages/DashBoard";
import Order from "./manager/Pages/Order";
import OutForDeliveryPage from "./manager/Pages/Delivery";
import DeliverySuccessPage from "./manager/Pages/DeliverySuccessPage";
import SupportPage from "./manager/Pages/SupportPage";
import UserDetails from "./manager/Pages/UserDetails";
import OrderDetails from "./manager/Pages/OrderDetails";
import SupportSuccessfulPage from "./manager/Pages/SupportSuccessfull";
import OrderAll from "./manager/Pages/OrderAll";
import SupportAll from "./manager/Pages/SupportAll";

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
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="orderAll" element={<OrderAll />} />
          <Route path="order" element={<Order />} />
          <Route path="delivery" element={<OutForDeliveryPage />} />
          <Route path="delivery-success" element={<DeliverySuccessPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="support-success" element={<SupportSuccessfulPage />} />
          <Route path="support-all" element={<SupportAll />} />
          <Route path="user-details/:username" element={<UserDetails />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
