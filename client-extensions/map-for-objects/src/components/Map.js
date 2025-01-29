import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import DOMPurify from 'dompurify'
import LiferayService from '../services/liferay';
import { getLatField, getLngField } from '../services/utils';

const Map = (props) => {
  const { objectDefinition,
    objectDefinitionLat,
    objectDefinitionLng,
    objectDefinitionTooltip,
    mapZoom,
    mapTileURL,
    mapTileAttribution,
    mapMarkerURL,
    mapMarkerSize } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [objects, setObjects] = useState([]);
  const [bounds, setBounds] = useState([
    [50.505, -29.09],
    [52.505, 29.09],
  ]);
  const [latField, setLatField] = useState();
  const [lngField, setLngField] = useState();
  const tooltipField = objectDefinitionTooltip ? objectDefinitionTooltip : objectDefinition.titleObjectFieldName;

  useEffect(() => {
    const fetchData = async () => {
      const url = objectDefinition.scope == 'company' ?
        `${objectDefinition.restContextPath}` :
        `${objectDefinition.restContextPath}/scopes/${window['Liferay'].ThemeDisplay.getScopeGroupId()}`;
      const response = await LiferayService.get(url);
      if (response.items.length > 0) {
        const bounds = response.items.map((object) => [object[latField], object[lngField]]);
        setObjects(response.items);
        setBounds(bounds);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    const latField = objectDefinitionLat ? objectDefinitionLat : getLatField(objectDefinition);
    const lngField = objectDefinitionLng ? objectDefinitionLng : getLngField(objectDefinition);
    setLatField(latField);
    setLngField(lngField);
    fetchData();
  }, [objectDefinition, objectDefinitionLat, objectDefinitionLng]);

  return (
    <>
      {!isLoading &&
        <MapContainer bounds={bounds} zoom={mapZoom} scrollWheelZoom={true}>
          <TileLayer
            attribution={mapTileAttribution}
            url={mapTileURL}
          />
          {objects.map(object => {
            if (mapMarkerURL && mapMarkerSize) {
              return (
                <Marker
                  key={object.id}
                  icon={new Icon({
                    iconUrl: mapMarkerURL,
                    iconSize: JSON.parse(mapMarkerSize)
                  })}
                  position={[object[latField], object[lngField]]}>
                  <Popup>
                    <div
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object[tooltipField]) }}
                    />
                  </Popup>
                </Marker>
              )
            }
            return (
              <Marker
                key={object.id}
                position={[object[latField], object[lngField]]}>
                <Popup>
                  <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object[tooltipField]) }}
                  />
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      }
    </>
  )
}

export default Map;