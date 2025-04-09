import React, { useState, useEffect } from 'react';
 
const FilterCard = ({ filters, onToggleExpand }) => {
  const [filterValues, setFilterValues] = useState({});
  const [isExpanded, setIsExpanded] = useState(true); // State to track if the card is expanded
console.log(filterValues)
  useEffect(() => {
    const initialValues = {};
    filters.forEach((filter) => {
      const defaultValueAttribute = filter.attributes.find(
        (attr) => attr.key === 'defaultValue'
      );
      initialValues[filter.dataKey] = defaultValueAttribute?.value || '';
    });
    setFilterValues(initialValues);
  }, [filters]);
 
  const handleFilterChange = (dataKey, value) => {
    setFilterValues({ ...filterValues, [dataKey]: value });
  };
 
  const renderFilterInput = (filter) => {
    const { dataKey, attributes } = filter;
    const typeAttribute = attributes.find((attr) => attr.key === 'type');
    const widthAttribute = attributes.find((attr) => attr.key === 'width');
    const optionsAttribute = attributes.find((attr) => attr.key === 'options');
 
    const style = { width: widthAttribute?.value || '10em' };
 
    if (!typeAttribute) {
      return <div>Unknown filter type.</div>;
    }
 
    switch (typeAttribute.value) {
      case 'date-picker':
        return (
          <input
            type="date"
            style={style}
            value={filterValues[dataKey] || ''}
            onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          />
        );
      case 'dropdown':
        const options = optionsAttribute?.value.split(',') || [];
        return (
          <select
            style={style}
            value={filterValues[dataKey] || ''}
            onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'number-input':
        return (
          <input
            type="number"
            style={style}
            value={filterValues[dataKey] || ''}
            onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          />
        );
      case 'text-input':
        return (
          <input
            type="text"
            style={style}
            value={filterValues[dataKey] || ''}
            onChange={(e) => handleFilterChange(dataKey, e.target.value)}
          />
        );
      default:
        return <div>Unsupported filter type: {typeAttribute.value}</div>;
    }
  };
 
  const toggleExpand = () => {
    const newExpandState = !isExpanded;
    setIsExpanded(newExpandState); // Toggle the expanded state
    onToggleExpand(newExpandState); // Notify parent component of the new state
  };
 
  const cardStyle = {
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    margin: '10px 0',
    maxWidth: '1000px',
    position: 'relative',
    width: '100%', // Ensure the width remains constant
  };
 
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 15px', // Reduced padding for less height
    background: isExpanded ? '#45ada8' : '#547980', // Change background color based on state
    color: '#fff',
    borderRadius: '10px 10px 0 0',
    cursor: 'pointer',
    width: '100%', // Ensure header takes full width
  };
 
  const filtersContainerStyle = {
    display: isExpanded ? 'flex' : 'none', // Hide filters when collapsed
    flexWrap: 'wrap',
    gap: '10px',
    padding: '15px',
    width:'100%'
  };
 
  const filterStyle = {
    padding: '10px',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
  };
 
  const svgStyle = {
    width: '20px',
    height: '20px',
    fill: 'white', // Ensure the SVG icon is white
  };
 
  return (
    <div style={cardStyle}>
      <div style={headerStyle} onClick={toggleExpand}>
        <h6 style={{ margin: 0 }}>Filters</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          style={svgStyle}
        >
          <path d="M25 32.4l-9.7-9.7 1.4-1.4 8.3 8.3 8.3-8.3 1.4 1.4z" />
        </svg>
      </div>
      <div style={filtersContainerStyle}>
        {filters.map((filter, index) =>
          filter.visible ? (
            <div key={index} style={filterStyle}>
              <strong>{filter.displayName}:</strong> {renderFilterInput(filter)}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
 
export default FilterCard;