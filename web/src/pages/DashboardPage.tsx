import React from 'react';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>Setup Cypress with Docker</li>
          <li>Design and implement Budget Page</li>
        </ul>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 450,
            padding: '10px',
          }}
        ></div>
      </div>
    </>
  );
}

export default DashboardPage;
