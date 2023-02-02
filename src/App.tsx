import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { LastModifiedUrlProvider } from './components/LastModifiedUrlContext';
import Nav from './components/Nav';
import AdminPage from './pages/AdminPage';
import InputPage from './pages/InputPage';

function App() {
  return (
    <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element= {
            <ErrorBoundary>
              <LastModifiedUrlProvider>
                <InputPage/>
              </LastModifiedUrlProvider>
            </ErrorBoundary>
          } />
          <Route path="/admin" element= {
            <ErrorBoundary>
              <LastModifiedUrlProvider>
                <AdminPage/>
              </LastModifiedUrlProvider>
            </ErrorBoundary>
          } />
        </Routes>
    </div>
  );
}

export default App;
