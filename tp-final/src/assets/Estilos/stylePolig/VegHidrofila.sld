<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Graphic fill</Name>
    <UserStyle>
      <Title>SLD Cook Book: Graphic fill</Title>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill>
              <GraphicFill>
                <Graphic>
                  <ExternalGraphic xmlns="http://www.opengis.net/sld" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <OnlineResource xlink:type="simple" xlink:href="VegHidrofila.png" />
                    <Format>image/png</Format>
                  </ExternalGraphic>
                  <Size>30</Size>
                </Graphic>
              </GraphicFill>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#c4b60e</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>