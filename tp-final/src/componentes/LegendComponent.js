import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WMS_CAPABILITIES_URL from '../WMS-Capabilities';
import './LegendComponent.css';

const LegendComponent = () => {
  const [legends, setLegends] = useState([]);

  useEffect(() => {
    // Fetch and parse the WMS Capabilities document
    axios.get(WMS_CAPABILITIES_URL)
      .then(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const layers = xmlDoc.getElementsByTagName('Layer');
        const legendsSet = new Set();

        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          const layerTitle = layer.getElementsByTagName('Title')[0].textContent;
          const styles = layer.getElementsByTagName('Style');
          if (styles.length > 0) {
            const style = styles[0]; // Only take the first style
            const legendURL = style.getElementsByTagName('LegendURL')[0];
            if (legendURL) {
              const onlineResource = legendURL.getElementsByTagName('OnlineResource')[0];
              const href = onlineResource.getAttribute('xlink:href');
              legendsSet.add(JSON.stringify({ layerTitle, legendURL: href }));
            }
          }
        }

        const legendsArray = Array.from(legendsSet).map(item => JSON.parse(item));
        setLegends(legendsArray);
      })
      .catch(error => {
        console.error('Error fetching WMS Capabilities:', error);
      });
  }, []);

  return (
    <div>
      <ul>
        {legends.map((legend, index) => (
          <li key={index}>
            <img src={legend.legendURL} alt={legend.layerTitle} style={{ width: '20px', height: '20px' }} />
            {legend.layerTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegendComponent;