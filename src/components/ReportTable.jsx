import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver'; // For file download
import * as XLSX from 'xlsx'; // For Excel file generation
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons
 
const ReportTable = () => {
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDropdown, setShowDropdown] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('csv');
 
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.65.128.92:9999/api/customer/dea_license_active.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  // Handle multi-select dropdown change
  const handleSelectionChange = (selectedOptions) => {
    setSelectedKeys(selectedOptions.map((option) => option.value));
  };
 
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
 
  // Generate options for the dropdown
  const columnOptions = data.length > 0
    ? Object.keys(data[0]).map((key) => ({ value: key, label: key }))
    : [];
 
  // Download full report
  const downloadFullReport = async () => {
    try {
      const response = await fetch('http://10.65.128.92:9999/api/customer/dea_license_active.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      saveAs(blob, 'full_report.json');
    } catch (error) {
      console.error('Error downloading full report:', error);
    }
  };
 
  // Download paginated data
  const downloadPaginatedData = () => {
    const exportData = paginatedData.map((row) =>
      selectedKeys.reduce((acc, key) => {
        acc[key] = row[key];
        return acc;
      }, {})
    );
 
    if (downloadFormat === 'csv') {
      const csvContent = [
        selectedKeys.join(','), // Header row
        ...exportData.map((row) => selectedKeys.map((key) => row[key]).join(',')), // Data rows
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      saveAs(blob, 'paginated_report.csv');
    } else if (downloadFormat === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Paginated Report');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'paginated_report.xlsx');
    } else if (downloadFormat === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      saveAs(blob, 'paginated_report.json');
    }
 
    setShowDropdown(false); // Close dropdown after download
  };
 
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Filters Section */}
      <div className="flex items-center gap-4 mb-6">
        <h6 className="text-2xl font-semibold text-gray-700">Customise Report View</h6>
        <Select
          isMulti
          options={columnOptions}
          value={columnOptions.filter((option) => selectedKeys.includes(option.value))}
          onChange={handleSelectionChange}
          className="w-64"
          placeholder="Select columns to display"
         
        />
      </div>
 
      {/* Conditionally Render Download Buttons */}
      {selectedKeys.length > 0 && (
        <div className="flex items-center justify-end gap-4 mb-6">
          <div className="relative inline-block">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="px-4 py-2 text-white rounded-lg hover:bg-green-200"
              style={{
                display: 'block',
                margin: '20px auto',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#547980',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              Quick Download
            </button>
            {showDropdown && (
              <div
                className="absolute right-0 bg-white border border-gray-300 rounded-lg z-50"
                style={{ minWidth: '170px' }}
              >
                <button
                  onClick={() => {
                    setDownloadFormat('csv');
                    downloadPaginatedData();
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  CSV
                </button>
                <button
                  onClick={() => {
                    setDownloadFormat('excel');
                    downloadPaginatedData();
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  Excel
                </button>
                <button
                  onClick={() => {
                    setDownloadFormat('json');
                    downloadPaginatedData();
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  JSON
                </button>
              </div>
            )}
          </div>
          <button
            onClick={downloadFullReport}
            className="px-4 py-2 bg-blue-100 text-white rounded-lg hover:bg-blue-200"
            style={{
              display: 'block',
              fontSize: '16px',
              backgroundColor: '#547980',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            Download Full Report
          </button>
        </div>
      )}
 
      {/* Table Section */}
      {selectedKeys.length > 0 && (
        <div className="w-full max-w-4xl mx-auto">
          {/* Table */}
          <div className="overflow-hidden border border-gray-300 shadow-lg rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white text-center">
                <thead>
                  <tr style={{ backgroundColor: '#033649', color: 'white' }}>
                    {selectedKeys.map((key) => (
                      <th key={key} className="py-3 px-6 border-b border-gray-300">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Striped rows
                    >
                      {selectedKeys.map((key) => (
                        <td key={key} className="py-3 px-6 text-gray-700">
                          {Array.isArray(row[key]) ? row[key][0] : row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* Pagination Section */}
          <div className="flex justify-between items-center mt-6">
            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 disabled:opacity-50 flex items-center justify-center"
                style={{
                  display: 'block',
                  fontSize: '16px',
                  backgroundColor: '#547980',
                  color: 'white',
                  borderRadius: '10px',
                }}
                disabled={currentPage === 1}
              >
                <FaArrowLeft className="mr-2" />
              </button>
              <span className="text-gray-700">Page {currentPage}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => (prev * rowsPerPage < data.length ? prev + 1 : prev))
                }
                className="px-4 py-2 disabled:opacity-50 flex items-center justify-center"
                style={{
                  display: 'block',
               
                  backgroundColor: '#547980',
                  color: 'white',
                  borderRadius: '10px',
                }}
                disabled={currentPage * rowsPerPage >= data.length}
              >
                <FaArrowRight className="ml-2" />
              </button>
            </div>
 
            {/* Rows per Page Selector */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700">Items per page:</label>
              <select
                className="px-4 py-2 border border-gray-400 rounded-lg"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ReportTable;