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

export const WorldMap = ({
  data,
  hoveredCountry,
  setHoveredCountry,
}: {
  data: DemographicsProps[];
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
}) => {
  return (
    <div className="w-full h-[450px] overflow-hidden">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={[60, 20]} zoom={3}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
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
                    stroke="#000000"
                    strokeWidth={0.09}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: '#00B87D' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => {
                      if (hasEmployees) {
                        setHoveredCountry(countryName);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

// export const WorldMap = ({
//   data,
//   hoveredCountry,
//   setHoveredCountry,
// }: {
//   data: DemographicsProps[];
//   hoveredCountry: string | null;
//   setHoveredCountry: (country: string | null) => void;
// }) => {
//   const getEmployeeCount = (countryName: string) => {
//     const country = data.find((d) => d.countryName === countryName);
//     return country?.employeeCount || 0;
//   };

//   return (
//     <div className="w-full h-[400px]">
//       <ComposableMap projection="geoMercator">
//         <ZoomableGroup center={[0, 30]} zoom={1}>
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 const isoCode = geo.properties.ISO_A2;
//                 const countryName = Object.keys(countryToISO).find(
//                   (key) => countryToISO[key] === isoCode
//                 );
//                 const isHighlighted = hoveredCountry === countryName;
//                 const hasEmployees = data.some(
//                   (d) => d.countryName === countryName
//                 );

//                 return (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill={
//                       hasEmployees
//                         ? isHighlighted
//                           ? '#3B82F6' // Bright blue when highlighted
//                           : '#93C5FD' // Light blue for countries with employees
//                         : '#E5E7EB' // Gray for countries without employees
//                     }
//                     stroke="#FFFFFF"
//                     strokeWidth={0.5}
//                     style={{
//                       default: { outline: 'none' },
//                       hover: { outline: 'none', fill: '#3B82F6' },
//                       pressed: { outline: 'none' },
//                     }}
//                     onMouseEnter={() => {
//                       if (hasEmployees) {
//                         setHoveredCountry(countryName || null);
//                       }
//                     }}
//                     onMouseLeave={() => {
//                       setHoveredCountry(null);
//                     }}
//                   />
//                 );
//               })
//             }
//           </Geographies>
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   );
// };

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
    <p className="text-[14px]">{data.countryName || ''}</p>
    <p className="text-[16px] font-medium">
      {data.employeeCount || 0} employees
    </p>
  </div>
);
