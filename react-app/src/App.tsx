import React from 'react';
import QREncode from "./QR/Encode";
import QRDecode from "./QR/Decode";
import DataMatrixEncode from "./DataMatrix/Encode"
import DataMatrixDecode from "./DataMatrix/Decode"
import AztecEncode from "./Aztec/Encode"
import AztecDecode from "./Aztec/Decode"
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";

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
        <Route path='/QR/decode' element={<QRDecode />} />
        <Route path='/QR/encode' element={<QREncode />} />
        <Route path='/Aztec/decode' element={<AztecDecode />} />
        <Route path='/Aztec/encode' element={<AztecEncode />} />
        <Route path='/datamatrix/decode' element={<DataMatrixDecode />} />
        <Route path='/datamatrix/encode' element={<DataMatrixEncode />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
