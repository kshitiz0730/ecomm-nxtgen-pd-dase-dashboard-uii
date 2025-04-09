import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScenarioCards = ({ scenarios, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  const toggleDescription = (key) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '120px',
        justifyContent: 'center',
        alignItems: 'center', // Adjusted to center align the items properly
      }}
    >
      {scenarios.length === 0 ? (
        <p className="text-center text-gray-500 text-lg col-span-full">
          No Scenarios found
        </p>
      ) : (
        scenarios.map((scenario) => (
          <div
            key={scenario.key}
            className="card mx-auto text-center"
            style={{
              maxWidth: '20rem',
              backgroundColor: '#9de0ad',
              color: 'white',
            }}
          >
            <div className="card-body mx-auto">
              <h5
                className="card-title text-lg font-bold mb-2 text-gray-900 dark:text-white cursor-pointer"
                style={{ textAlign: 'center' }}
                onClick={() =>
                  navigate(scenario.path, { state: { scenarioKey: scenario.key } })
                }
              >
                {scenario.name}
              </h5>
              <h6
                className="card-subtitle mb-2 text-muted cursor-pointer"
                onClick={() => toggleDescription(scenario.key)}
              >
                {visibleDescriptions[scenario.key] ? 'Hide Description' : 'View Description'}
              </h6>
              {visibleDescriptions[scenario.key] && (
                <p className="card-text">{scenario.Description}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ScenarioCards;
