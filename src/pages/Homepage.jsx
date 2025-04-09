
// Homepage.jsx
import { useEffect, useState } from 'react';
import ScenarioCards from '../components/ScenarioCards';
 
const Homepage = ({ selectedItem, scenarios, isSidebarOpen }) => {
  console.log(selectedItem, "Home");
  const [currentScenarios, setCurrentScenarios] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen is mobile-sized
 
  useEffect(() => {
    if (selectedItem) {
      setCurrentScenarios(scenarios.filter(scenario => scenario.dataDomain === selectedItem.dataDomain));
    }
  }, [selectedItem]);
 
  useEffect(() => {
    // Add a resize event listener to update the isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  if (!selectedItem) return <h2>Loading...</h2>;
 
  return (
    <>
      {selectedItem !== null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            marginLeft: isSidebarOpen ? (isMobile ? '4px' : '64px') : '',
            padding: isMobile ? '16px' : '0', // Add padding for smaller screens
            flexDirection: isMobile ? 'column' : 'row', // Stack items vertically on mobile
          }}
        >
          <ScenarioCards scenarios={currentScenarios} />
        </div>
      )}
    </>
  );
};
 
export default Homepage;
