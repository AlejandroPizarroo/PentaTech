import React from 'react';
import {Dropdown} from 'carbon-components-react';

const items = [
    { id: 'option1', text: 'Option 1' },
    { id: 'option2', text: 'Option 2' },
    { id: 'option3', text: 'Option 3' },
];
const LandingPage = () => {
    return (
        <div style={{ width: 600 }}>
                <Dropdown
                  id="inline"
                  label="Dropdown menu options"
                  type="inline"
                  items={items}
                  itemToString={(item) => (item ? item.text : '')}
                />
              </div>
    );
};

export default LandingPage;