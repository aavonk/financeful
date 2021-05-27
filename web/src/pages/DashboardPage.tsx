import React from 'react';
import Paper from '@Common/Paper';
import { InsetInput } from '@Common/FormElements';
function DashboardPage() {
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>
            !!!!! Make the Toolbar visible when Transactions are loading -- causes big
            shift
          </li>
          <li>Put Pagination on account page transactions!!!</li>
        </ul>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '200px',
            height: '200px',
            padding: '10px',
          }}
        >
          <Paper>
            <div style={{ width: '100%', padding: '10px' }}>
              <InsetInput
                value="hi there mister"
                type="text"
                onChange={() => console.log('hi')}
              >
                Account Name
              </InsetInput>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
