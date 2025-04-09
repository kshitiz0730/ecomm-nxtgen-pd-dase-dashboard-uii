// App.jsx
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import ScenarioFilters from './pages/ScenarioFilters'; // Import ScenarioFilters
 
const App = () => {
  const [sidebarItems, setSidebarItems] = useState([
    { id: '1', key: 'account-users', name: 'Users and Accounts', description: 'Scenarios related to users and accounts.', actions: ['left-drawer-menu-link-click', 'left-drawer-menu-link-key-press'], path: '/home/account-users', dataDomain: 'account-users', defaultSelected: false, },
    { id: '2', key: 'contracts', name: 'Contracts', description: 'Scenarios related to contracts', actions: ['left-drawer-menu-link-click', 'left-drawer-menu-link-key-press'], path: '/home/contracts', dataDomain: 'contracts', defaultSelected: false, },
    { id: '3', key: 'orders', name: 'Orders & History', description: 'Scenarios related to order management.', actions: ['left-drawer-menu-link-click', 'left-drawer-menu-link-key-press'], path: '/home/orders', dataDomain: 'orders', defaultSelected: true, },
  ]);
  const [scenarios, setScenarios] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentScenarios, setCurrentScenarios] = useState([]);
  const [firstVisit, setFirstVisit] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);// State to track first visit
 
  const navigate = useNavigate();
  const location = useLocation();
  const defaultItem = sidebarItems.find((item) => item.defaultSelected);
  // useEffect(() => {
   
  //   if (defaultItem && !firstVisit) {
  //     setSelectedItem(defaultItem);
  //     fetchScenarioData(defaultItem.dataDomain);
  //     navigate(defaultItem.path);
  //   }
  // }, []);
 
  useEffect(() => {
    // Only run this logic on initial mount
    if (selectedItem === null) {
      // Check if we're at the root path
      if (location.pathname === '/') {
        // Navigate to default item if at root
        if (defaultItem) {
          setSelectedItem(defaultItem);
          fetchScenarioData(defaultItem.dataDomain);
          navigate(defaultItem.path);
        }
      } else {
        // Find the item that matches the current path
        const matchingItem = sidebarItems.find(item =>
          location.pathname.startsWith(item.path) ||
          location.pathname.startsWith('/report')
        );
        if (matchingItem) {
          setSelectedItem(matchingItem);
          fetchScenarioData(matchingItem.dataDomain);
        } else if (defaultItem) {
          // Fallback to default if no match found
          setSelectedItem(defaultItem);
          fetchScenarioData(defaultItem.dataDomain);
          navigate(defaultItem.path);
        }
      }
    }
  }, [location.pathname, selectedItem, sidebarItems]);
 
  const fetchScenarioData = (dataDomain) => {
    const response1 = [
      { _id: "ObjectId('sdawwefsdasd12723823')", key: 'SCENERIO-1', name: 'Valid Accounts with Valid DEA License', Description: 'SAAS', action: ['click', 'key-press'], path: '/report/valid-accounts', dataDomain: 'account-users', },
      { _id: "ObjectId('sdawwefsdasd12723823')", key: 'SCENERIO-2', name: 'Valid Accounts with Valid DEA License x', Description: 'SAASs', action: ['click', 'key-press'], path: '/report/valid-accounts', dataDomain: 'account-users', },
      { _id: "ObjectId('sdawwefsdasd12723823')", key: 'SCENERIO-3', name: 'Another Scenario', Description: 'Another Description', action: ['click', 'key-press'], path: '/report/another-report', dataDomain: 'contracts', },
      { _id: "ObjectId('sdawwefsdasd12723823')", key: 'SCENERIO-4', name: 'Orders Scenario', Description: 'Order Description', action: ['click', 'key-press'], path: '/report/orders-report', dataDomain: 'orders', },
    ];
 
    const filteredScenarios = response1.filter((scenario) => scenario.dataDomain === dataDomain);
 
    setScenarios(response1);
    setCurrentScenarios(filteredScenarios);
  };
 
  const handleSidebarClick = (item) => {
    setSelectedItem(item);
    setFirstVisit(true); // Set first visit to true when sidebar item is clicked
    fetchScenarioData(item.dataDomain);
    navigate(item.path);
  };
 
  return (
   
 
   
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
   
      <Header />
      <div style={{display:'flex', flex:'1'}}>
 
     
 
      <Sidebar sidebarItems={sidebarItems} handleSidebarClick={handleSidebarClick} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ flex: '1', padding: '1rem',  }}>
       
        <Routes>
          <Route
            path="/home/:dataDomain"
            element={<Homepage selectedItem={selectedItem} scenarios={currentScenarios} isSidebarOpen={isSidebarOpen} />}
          />
          <Route path="/" element={selectedItem !== null && <Homepage selectedItem={selectedItem} scenarios={currentScenarios} />} />
          <Route path="/report/:scenarioPath" element={<ScenarioFilters scenarios={scenarios} isSidebarOpen={isSidebarOpen}/>} /> {/* Pass scenarios prop */}
        </Routes>
        </div>
      </div>
    </div>
   
  );
};
 
export default App;