import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import { Container } from '@material-ui/core';
import CartPage from './pages/CartPage/CartPage';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/product/:id' component={ProductPage} />
              <Route exact path='/cart/:id?' component={CartPage} /> {/* id in url is optional */}
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
