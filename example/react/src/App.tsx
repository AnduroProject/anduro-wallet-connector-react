import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import routes from "./route/route"
import { UseConnectorProvider } from "anduro-wallet-connector"
import { WALLETURL } from "./config/walletApi"

function App() {
  return (
    <Router>
      <div className="widset_parent">
        <UseConnectorProvider walletURL={WALLETURL}>
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={<route.component />} key={route.path} />
            ))}
          </Routes>
        </UseConnectorProvider>
      </div>
    </Router>
  )
}

export default App