import React from "react";

function FormList({ entries }) {
  return (
    <div>
      <h2>Submitted Entries</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormList;
