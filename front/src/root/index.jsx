import { Router } from "express";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shop/:familyName/:productID"
          element={<ShopComponent />}
        />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/shop-card" element={<ShopCard />} />
        <Route path="/plant-care" element={<PlantCare />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
};
