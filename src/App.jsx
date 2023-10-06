import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import ProductPage from './pages/admin/ProductPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPageCashier from './pages/cashier/LoginPageCashier';
import CategoryPage from './pages/admin/CategoryPage';
import ReportPageAdmin from './pages/admin/ReportPageAdmin';
import MainPage from './pages/cashier/MainPage';
import ReportPageCashier from './pages/cashier/ReportPageCashier';
import LogoutUser from './components/LogoutUser';
import AdminNavbar from './components/admin/AdminNavbar';
import CashierNavbar from './components/cashier/CashierNavbar';
import Alert from './components/Alert';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathLocation = location.pathname.split('/')[1];

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <Routes>
        <Route
          path="/admin/login"
          element={
            <ChakraProvider>
              <LoginPageAdmin />
            </ChakraProvider>
          }
        />
        <Route
          path="/cashier/login"
          element={
            <ChakraProvider>
              <LoginPageCashier />
            </ChakraProvider>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
        <Route path="/cashier/*" element={<Navigate to="/cashier/login" />} />
        <Route path="/*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }

  if (pathLocation === 'admin') {
    return (
      authUser.isAdmin && (
        <>
          <Alert />
          <Loading />
          <AdminNavbar />
          <Routes>
            <Route path="/admin/products" element={<ProductPage />} />
            <Route
              path="/admin/administrator"
              element={
                <ChakraProvider>
                  <AdminPage />
                </ChakraProvider>
              }
            />
            <Route path="/admin/categories" element={<CategoryPage />} />
            <Route path="/admin/report" element={<ReportPageAdmin />} />
            <Route
              path="/admin/*"
              element={<Navigate to="/admin/products" />}
            />
            <Route path="/logout" element={<LogoutUser />} />
          </Routes>
        </>
      )
    );
  }

  return (
    authUser.isCashier && (
      <>
        <Alert />
        <Loading />
        <CashierNavbar />
        <Routes>
          <Route
            path="/cashier/main"
            element={
              <ChakraProvider>
                <MainPage />
              </ChakraProvider>
            }
          />
          <Route path="/cashier/report" element={<ReportPageCashier />} />
          <Route path="/cashier/*" element={<Navigate to="/cashier/main" />} />
          <Route path="/logout" element={<LogoutUser />} />
        </Routes>
      </>
    )
  );
}

export default App;
