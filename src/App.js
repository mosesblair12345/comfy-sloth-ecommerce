import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Home,
  About,
  Error,
  Products,
  SingleProduct,
  CartPage,
  Checkout,
  PrivateRoute,
  SharedLayout,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cartpage" element={<CartPage />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </AuthWrapper>
  );
}
export default App;
