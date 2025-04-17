import React, { useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { DemographicsProps } from './Demographics';

// GeoJSON URL
const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const countryNameMapping: { [key: string]: string } = {
  'North Macedonia': 'Macedonia',
  'United States': 'United States of America',
  Russia: 'Russian Federation',
};

// Type for storing country coordinates
interface CountryCoordinates {
  [key: string]: [number, number]; // [longitude, latitude]
}

export const WorldMap = ({
  data,
  hoveredCountry,
  setHoveredCountry,
}: {
  data: DemographicsProps[];
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
}) => {
  // Default center position
  const defaultCenter: [number, number] = [60, 20];
  const defaultZoom = 3;

  // Vertical offset to adjust the center point (negative value moves the center up)
  const verticalOffset = -20;

  // State for center position
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [countryCoordinates, setCountryCoordinates] =
    useState<CountryCoordinates>({});
  const geographiesRef = useRef<any[]>([]);
  const hasInitializedRef = useRef(false);

  // Calculate centroid (center point) of a geography
  const calculateCentroid = (geo: any): [number, number] => {
    if (geo.properties.centroid) {
      return geo.properties.centroid;
    }

    // Simple approximation for center point using bounding box
    try {
      const bbox = geo.bbox || [];
      if (bbox.length === 4) {
        return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
      }

      // Fallback: get center of first polygon
      if (
        geo.geometry &&
        geo.geometry.coordinates &&
        geo.geometry.coordinates.length > 0
      ) {
        const coords = geo.geometry.coordinates[0];
        if (Array.isArray(coords)) {
          let sumX = 0,
            sumY = 0;
          for (const point of coords) {
            sumX += point[0];
            sumY += point[1];
          }
          return [sumX / coords.length, sumY / coords.length];
        }
      }
    } catch (e) {
      console.error('Error calculating centroid', e);
    }

    // Default fallback
    return defaultCenter;
  };

  // Initialize country coordinates after mounting
  useEffect(() => {
    if (geographiesRef.current.length > 0 && !hasInitializedRef.current) {
      const coordinates: CountryCoordinates = {};

      geographiesRef.current.forEach((geo) => {
        const countryName = geo.properties.name;

        if (countryName) {
          // Calculate the center and store it
          const [lon, lat] = calculateCentroid(geo);
          coordinates[countryName.toLowerCase()] = [lon, lat];
        }
      });

      setCountryCoordinates(coordinates);
      hasInitializedRef.current = true;
    }
  }, [geographiesRef.current]);

  // Update center when hoveredCountry changes
  useEffect(() => {
    if (!hoveredCountry) {
      // Reset to default view when no country is hovered
      setCenter(defaultCenter);
      return;
    }

    // Normalize the hovered country name
    const normalizedCountryName = (
      countryNameMapping[hoveredCountry] || hoveredCountry
    )
      ?.trim()
      .toLowerCase();

    // Find coordinates for the hovered country
    if (normalizedCountryName && countryCoordinates[normalizedCountryName]) {
      const [lon, lat] = countryCoordinates[normalizedCountryName];
      // Apply vertical offset to adjust centering
      setCenter([lon, lat + verticalOffset]);
    }
  }, [hoveredCountry, countryCoordinates]);

  // Handle mouse over event for geography without changing state
  const handleMouseEnter = (countryName: string, hasEmployees: boolean) => {
    if (hasEmployees) {
      // To prevent flickering, only set hovered country if it's different
      if (hoveredCountry !== countryName) {
        setHoveredCountry(countryName);
      }
    }
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  // Calculate dynamic zoom based on country size (optional enhancement)
  const getZoomLevel = (): number => {
    // You could implement dynamic zoom levels here based on country size
    // For now, we'll use the default zoom
    return defaultZoom;
  };

  return (
    <div className='w-full lg:h-[calc(100svh-300px)] overflow-hidden'>
      <ComposableMap projection='geoMercator'>
        <ZoomableGroup
          center={center}
          zoom={getZoomLevel()}
          // For smoother transitions when centering
          transitionduration={300}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Store geographies in ref without triggering re-render
              if (geographiesRef.current.length === 0) {
                geographiesRef.current = geographies;
              }

              return geographies.map((geo) => {
                const countryName = geo.properties.name;
                if (!countryName) return null;

                // Normalize the hovered country name to match the GeoJSON data
                const normalizedCountryName =
                  countryNameMapping[hoveredCountry || ''] || hoveredCountry;

                const isHighlighted =
                  normalizedCountryName?.trim().toLowerCase() ===
                  countryName.trim().toLowerCase();

                const hasEmployees = data.some(
                  (d) =>
                    (countryNameMapping[d.countryName || ''] || d.countryName)
                      ?.trim()
                      .toLowerCase() === countryName.trim().toLowerCase()
                );

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      hasEmployees
                        ? isHighlighted
                          ? '#00B87D'
                          : '#0F172A'
                        : '#ECECEC'
                    }
                    stroke='#000000'
                    strokeWidth='0.09px'
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#00B87D' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() =>
                      handleMouseEnter(countryName, hasEmployees)
                    }
                    // onMouseLeave={handleMouseLeave}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export const CountryBox = ({
  data,
  isHighlighted,
  onHover,
  onLeave,
}: {
  data: DemographicsProps;
  isHighlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <div
    className={`flex flex-col gap-1 p-4 w-full border rounded transition-all duration-200 cursor-pointer
      ${
        isHighlighted
          ? 'border-[#00B87D] bg-[#D5F6DD]'
          : 'border-[#E0E0E0] bg-white'
      }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <p className='text-[14px]'>{data.countryName || ''}</p>
    <p className='text-[16px] font-medium'>
      {data.employeeCount || 0} employees
    </p>
  </div>
);
