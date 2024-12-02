import React from 'react';
import './LegendComponent.css';

const LegendComponent = ({ layers }) => {
  return (
    <div className="legend">
      <ul>
        {layers.map((layer, index) => {
          const style = layer.getStyle ? layer.getStyle() : null;
          const image = style && style.getImage ? style.getImage() : null;
          const fill = image && image.getFill ? image.getFill() : null;
          const color = fill ? fill.getColor() : 'transparent';

          return (
            <li key={index}>
              <span style={{ backgroundColor: color }}></span>
              {layer.get('title')}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LegendComponent;