import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import Navigation from "./components/header/navigation.component";

import Checkout from "./pages/checkout/checkout.component";

// import SignInSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Authentication from "./pages/authentication/authentication.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsunscribeFromAuth = null;

  componentDidMount() {
    this.unsunscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsunscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/shop" element={<Shop />} />
          {/* <Route exact path="/signin" component={SignInSignUpPage} /> */}
          <Route exact path="/auth" element={<Authentication />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    );
  }
}

export default App;
