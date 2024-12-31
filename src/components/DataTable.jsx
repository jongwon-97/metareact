import React from "react";

function DataTable() {
  const data = [
    { name: "Tiger Nixon", position: "System Architect", salary: "$320,800" },
    { name: "Garrett Winters", position: "Accountant", salary: "$170,750" },
    // Add more rows as needed
  ];

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.position}</td>
            <td>{row.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
