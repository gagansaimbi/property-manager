import React from "react";
import "./Header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShopList from "./ShopList";
import AddShop from "./AddShop";
import LeaseShop from "./LeaseShop";
const Header = () => {
  return (
    <>
      <div className="parentContainer">
        <div className="headerContainer">
          <div className="headerText">Property management</div>
          <Router>
            <div>
              <span className="headerText">
                {" "}
                <Link to="/">Shop List</Link>
              </span>
              <span className="headerText">
                {" "}
                <Link to="/AddShop">Add Shop</Link>
              </span>
              <span className="headerText">
                <Link to="/LeaseShop">LeaseShop</Link>
              </span>
              <br/>
              <div>
                <Routes>
                  <Route path="/" element={<ShopList />}></Route>
                  <Route path="/AddShop" element={<AddShop />}></Route>
                  <Route path="/LeaseShop" element={<LeaseShop />}></Route>
                </Routes>
              </div>
            </div>
          </Router>
        </div>
      </div>
    </>
  );
};
export default Header;