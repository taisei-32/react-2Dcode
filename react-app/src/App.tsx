import React from 'react';
import logo from './logo.svg';
import QR_Encode from "./QR/Encode";
import DataMatrix_Encode from "./DataMatrix/Encode"
import Aztec_Encode from "./Aztec/Encode"
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";

const Decode = () => <h2>Decode Page</h2>;
const Encode = () => <h2>Encode Page</h2>;

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <ul className="navlist">
          <li className="navlist_parenet">
            <div>QR Code</div>
            <ul className="navlist_sub">
              <li>
                <Link to="/qr/decode">decode</Link>
              </li>
              <li>
                <Link to="qr/encode">Generate</Link>
              </li>
            </ul>
          </li>
          <li className="navlist_parenet">
            <div>Aztec Code</div>
            <ul className="navlist_sub">
              <li>
                <Link to="/aztec/decode">decode</Link>
              </li>
              <li>
                <Link to="/aztec/encode">Generate</Link>
              </li>
            </ul>
          </li>
          <li className="navlist_parenet">
            <div>DataMatrix</div>
            <ul className="navlist_sub">
              <li>
                <Link to="/datamatrix/decode">decode</Link>
              </li>
              <li>
                <Link to="/datamatrix/encode">Generate</Link>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path='/QR/decode' element={<Decode />} />
        <Route path='/QR/encode' element={<QR_Encode />} />
        <Route path='/Aztec/decode' element={<Decode />} />
        <Route path='/Aztec/encode' element={<Aztec_Encode />} />
        <Route path='/datamatrix/decode' element={<Decode />} />
        <Route path='/datamatrix/encode' element={<DataMatrix_Encode />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
