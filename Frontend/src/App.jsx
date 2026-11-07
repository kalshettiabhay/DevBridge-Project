import { useState } from 'react'
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoutes from "./components/ProtectedRoutes"
import ClientDashboard from './components/client-components/ClientDashboard';
import DeveloperDashboard from './components/developer-components/DeveloperDashboard';
import ClientProfile from './components/client-components/ClientProfile';
import DeveloperProfile from './components/developer-components/DeveloperProfile';
import ClientProjectRequestForm from './components/client-components/ClientProjectRequestForm';
import  Layout from "./components/Layout.jsx"
import DeveloperProjectListing from './components/developer-components/DeveloperProjectListing.jsx';
import MyProjectRequests from './components/client-components/MyProjectRequests.jsx';
import TabsNavigation from './components/client-components/TabNavigation.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Layout>
       <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route
          path="/User"
          element={
            <ProtectedRoutes allowedRoles={["User"]}>
             <ClientDashboard/>
            </ProtectedRoutes>
          }
        />
         <Route
          path="/user-profile"
          element={
            <ProtectedRoutes allowedRoles={["User"]}>
             <ClientProfile/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/tab-navigation"
          element={
            <ProtectedRoutes allowedRoles={["User"]}>
             <TabsNavigation/>
            </ProtectedRoutes>
          }
        />
        
         <Route
          path="/Developer"
          element={
            <ProtectedRoutes allowedRoles={["Developer"]}>
             <DeveloperDashboard/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/developer-profile"
          element={
            <ProtectedRoutes allowedRoles={["Developer"]}>
             <DeveloperProfile/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/projectlist"
          element={
            <ProtectedRoutes allowedRoles={["Developer"]}>
             <DeveloperProjectListing/>
            </ProtectedRoutes>
          }
        />
    </Routes>
     </Layout>
    </BrowserRouter>
    </>
  )
}

export default App;
