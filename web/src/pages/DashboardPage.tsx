import React from 'react';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>
            Make the Toolbar visible when Transactions are loading -- causes big shift
          </li>
          <li>Add Arrow to Selects for Accessibility reasons</li>
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
