import React from 'react';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>Add Arrow to Selects for Accessibility reasons</li>
          <li>Add Focus styles to inset input</li>
          <li>
            Add Focus styles to Settings menu & menu items. Currently no styled when
            tabbing through it.{' '}
          </li>
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
