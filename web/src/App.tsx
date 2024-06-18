import React from 'react';
import { Route, Routes } from 'react-router-dom';
import * as Components from './components';
import ListPayments from "@/pages/payments";
import About from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Components.Menu/>
          <Components.Layout/>
        </>
      }>
        <Route path="payment" element={<ListPayments/>} />
        <Route path="about" element={<About/>} />
        <Route path="/404" element={<Components.NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
