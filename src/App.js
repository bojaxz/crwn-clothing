import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  // when a component is first painted to the screen do:
  componentDidMount() {
    // use our unsubfromAuth to hold our user login state by setting it = to our auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // userAuth will be true if there is a user signed in
      if (userAuth) {
        // cUPD will take userAuth and will set the set = to the user data from the snapshot.
        const userRef = await createUserProfileDocument(userAuth);

        // get the user data for either newly created user or one already in our db.
        userRef.onSnapshot((snapShot) => {
          this.setState({
            // user snapShot to grab id and spread the rest of the data.
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      // else set currentUser to null
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
