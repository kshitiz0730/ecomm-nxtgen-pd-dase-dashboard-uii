import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FilterCard from "../components/FilterCard";
import { ClipLoader } from "react-spinners";
import ReportTable from "../components/ReportTable";

const ScenarioFilters = ({ scenarios, isSidebarOpen }) => {
  const location = useLocation();
  const { scenarioKey } = location.state || {};
  const { scenarioPath } = useParams();
  const [scenarioDetails, setScenarioDetails] = useState(null);
  const [scenarioName, setScenarioName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReportTable, setShowReportTable] = useState(false);
  const [isFilterCardExpanded, setIsFilterCardExpanded] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});

  const dummyApiResponse2 = {
    _id: "ObjectId('sdawwefsdasd12723823')",
    scenerioKey: "SCENERIO-1",
    key: "SCENERIO-FILTERS-1",
    widgets: {
      filters: [
        {
          name: "Date Filter",
          dataKey: "dateFilter",
          displayName: "Choose Date",
          index: 0,
          visible: true,
          attributes: [
            { key: "type", value: "date-picker" },
            { key: "defaultValue", value: "default_current_date" },
            { key: "width", value: "10em" },
            { key: "api-fetch", value: "date-api" },
          ],
        },
        {
          name: "Product Name",
          dataKey: "productFilter",
          displayName: "Product",
          index: 1,
          visible: true,
          attributes: [
            { key: "type", value: "text-input" },
            { key: "defaultValue", value: "Enter Name" },
            { key: "width", value: "10em" },
            { key: "api-fetch", value: "days-api" },
          ],
        },
        {
          name: "Days Filter",
          dataKey: "daysFilter",
          displayName: "Within Days",
          index: 2,
          visible: true,
          attributes: [
            { key: "type", value: "dropdown" },
            { key: "options", value: "30,60,90,120" },
            { key: "defaultValue", value: "30" },
            { key: "width", value: "10em" },
            { key: "api-fetch", value: "days-api" },
          ],
        },
      ],
    },
  };

  useEffect(() => {
    setTimeout(() => {
      if (dummyApiResponse2.scenerioKey === scenarioKey) {
        setScenarioDetails(dummyApiResponse2);
      } else {
        setScenarioDetails(null);
      }
    }, 50);

    const foundScenario = scenarios.find((scenario) => scenario.key === scenarioKey);
    if (foundScenario) {
      setScenarioName(foundScenario.name);
    }
  }, [scenarioKey, scenarios]);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
    console.log("ScenarioFilters - Received filter values:", filters); // Log received filter values
  };

  const handleFilterSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulate an API call or data processing
      const responseData = await new Promise((resolve) =>
        setTimeout(() => resolve({ success: true, data: [] }), 1000)
      );

      console.log("Server response:", responseData);

      if (responseData.success) {
        setShowReportTable(true); // Show the report table only if the response is successful
      } else {
        console.error("Failed to fetch report data");
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  if (!scenarioDetails) return <h2>Loading scenario details...</h2>;

  return (
    <div style={{ marginLeft: isSidebarOpen ? '250px' : '' }}>
      <div style={{ textAlign: "center", marginTop: '70px' }}>
        <h5 style={{ color: "#547980" }}>{scenarioName}</h5>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FilterCard
          filters={scenarioDetails.widgets.filters}
          onToggleExpand={setIsFilterCardExpanded}
          onFiltersChange={handleFiltersChange} // Pass callback to receive filter values
        />
        {isFilterCardExpanded && (
          <button
            onClick={handleFilterSubmit}
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#547980",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Submit
          </button>
        )}
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <ClipLoader color="#3498db" size={50} />
            <p>Loading report...</p>
          </div>
        )}
        {showReportTable && (
          <div style={{ textAlign: "center" }}>
            <ReportTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioFilters;
