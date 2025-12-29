import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./services/ErrorBoundary";
import { LastModifiedUrlProvider } from "./context/LastModifiedUrlContext";
import Nav from "./components/NavBar/Nav";
import AdminPage from "./pages/AdminPage";
import InputPage from "./pages/InputPage";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <LastModifiedUrlProvider>
                <InputPage />
              </LastModifiedUrlProvider>
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin"
          element={
            <ErrorBoundary>
              <LastModifiedUrlProvider>
                <AdminPage />
              </LastModifiedUrlProvider>
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
