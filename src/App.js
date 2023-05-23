import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DebtListPage from './pages/DebtListPage';
import Home from './pages/Home';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from './components/Navbar';



function App() {
  const {user, isLoading, isError} = useSelector((state) => state.auth)
  return (
    <main className="App">
    {user ? (
      <>
      <Navbar />
        <Routes>
          <Route path="/" element={<DebtListPage />} />
        </Routes>
      </>
    ) : (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    )}
  </main>
  );
}

export default App;
