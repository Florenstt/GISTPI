// Legend.js
import React, { useEffect, useState } from 'react';
import ImageWMS from 'ol/source/ImageWMS';
import './Legend.css';

const Legend = ({ layers }) => {
  const [legendUrl, setLegendUrl] = useState('');

  useEffect(() => {
    const activeLayer = layers.find(layer => layer.getVisible() && layer.getSource() instanceof ImageWMS);
    if (!activeLayer) return;

    const wmsSource = activeLayer.getSource();

    const updateLegend = (resolution) => {
      const graphicUrl = wmsSource.getLegendUrl(resolution);
      setLegendUrl(graphicUrl);
    };

    // Initial legend
    const resolution = activeLayer.get('map').getView().getResolution();
    updateLegend(resolution);

    // Update the legend when the resolution changes
    const view = activeLayer.get('map').getView();
    const handleResolutionChange = () => {
      const resolution = view.getResolution();
      updateLegend(resolution);
    };
    view.on('change:resolution', handleResolutionChange);

    // Cleanup event listener on unmount
    return () => {
      view.un('change:resolution', handleResolutionChange);
    };
  }, [layers]);

  const visibleLayers = layers.filter(layer => layer.getVisible());

  if (visibleLayers.length === 0) {
    return null;
  }

  const activeLayer = layers.find(layer => layer.get('active'));

  return (
    <div className="legend-section">
      <h3>Leyenda</h3>
      {activeLayer && (
        <div className="active-layer">
          <h4>Active Layer</h4>
          <p>Title: {activeLayer.get('title')}</p>
          <img src={activeLayer.get('styleUrl')} alt="Layer Style" />
        </div>
      )}
      <ul className="legend-list">
        {visibleLayers.map((layer, index) => (
          <li key={index} className="legend-item">
            <img src={layer.get('styleUrl')} alt="Layer Style" className="legend-symbol" />
            <span className="legend-title">{layer.get('title')}</span>
          </li>
        ))}
      </ul>
      {legendUrl && <img id="legend" src={legendUrl} alt="WMS Legend" />}
    </div>
  );
};

export default Legend;