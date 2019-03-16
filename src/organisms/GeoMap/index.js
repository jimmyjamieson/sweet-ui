import React, {
  useState, Suspense, lazy, useEffect,
} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import { getGeoLocation } from '../../utils';

// const ReactMapGL = lazy(() => import('react-map-gl'));


const GeoMap = ({ token }) => {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    const getUserCurrentLocation = async () => {
      const result = await getGeoLocation();
      setCurrentLocation(result);
    };
    getUserCurrentLocation();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactMapGL
        width="auto"
        height="500px"
        latitude={37.7577}
        longitude={-122.4376}
        zoom={8}
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => {
          const {
            width, height, latitude, longitude, zoom,
          } = viewport;
            // Optionally call `setState` and use the state to update the map.
        }}
      >
        {currentLocation && (
          <Marker latitude={37.7577} longitude={-122.4376}>
            {console.log('currentLocation', currentLocation && currentLocation)}
                  You are here
          </Marker>
        )}
      </ReactMapGL>
    </Suspense>
  );
};

GeoMap.propTypes = {
  token: PropTypes.string,
};

GeoMap.defaultProps = {
  token: 'pk.eyJ1IjoiamltamFteiIsImEiOiJjanRiZ2p3MWMwZnM5NDRwZjNicjJkcmN2In0.D_eUO4Y1_M7vYXMaGeBdYw',
};

export default GeoMap;
