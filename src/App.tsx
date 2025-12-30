import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./services/ErrorBoundary";
import Nav from "./components/NavBar/Nav";
import AdminPage from "./pages/AdminPage";
import InputPage from "./pages/InputPage";
import { useMessageStore } from "./stores/useMessageStore";
import CustomSnackbar from "./shared/components/CustomSnackbar";
import { AppRoutes } from "./shared/routes";

function App() {
  const isOpen = useMessageStore((state) => state.isOpen);

  return (
    <div className="App">
      <Nav />
      {isOpen && <CustomSnackbar />}
      <ErrorBoundary>
        <Routes>
          <Route path={AppRoutes.HOME} element={<InputPage />} />
          <Route path={AppRoutes.ADMIN} element={<AdminPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
