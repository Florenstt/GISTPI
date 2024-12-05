<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>PaisLim</Name>
    <UserStyle>
      <Title>PaisLim</Title>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill-opacity">0</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#3b033d</CssParameter>
              <CssParameter name="stroke-width">2</CssParameter> 
            </Stroke>
          </PolygonSymbolizer>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#d393c9</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
            </Stroke>
            <PerpendicularOffset>-2</PerpendicularOffset>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>