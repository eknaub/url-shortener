import { Route, Routes } from 'react-router-dom';
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
          <LastModifiedUrlProvider>
            <InputPage/>
          </LastModifiedUrlProvider>
        } />
        <Route path="/admin" element= {
          <LastModifiedUrlProvider>
            <AdminPage/>
          </LastModifiedUrlProvider>
        } />
      </Routes>
    </div>
  );
}

export default App;
