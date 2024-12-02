// FILE: LegendComponent.js
import React from 'react';

const LegendComponent = ({ layers }) => {
  return (
    <div className="legend">
      <ul>
        {layers.map((layer, index) => (
          <li key={index}>
            <span style={{ backgroundColor: layer.color }}></span>
            {layer.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegendComponent;