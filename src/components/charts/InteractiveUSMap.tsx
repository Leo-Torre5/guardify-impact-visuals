
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
  type: 'CAC' | 'Prosecutors' | 'Law Enforcement';
}

interface MapBounds {
  center: [number, number];
  zoom: number;
}

const InteractiveUSMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [mapBounds, setMapBounds] = useState<MapBounds>({
    center: [39.8283, -98.5795], // Center of US
    zoom: 4
  });
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  // State boundaries and centers for zoom functionality
  const stateBounds: Record<string, MapBounds> = {
    'Alabama': { center: [32.806671, -86.791130], zoom: 7 },
    'Alaska': { center: [61.370716, -152.404419], zoom: 4 },
    'Arizona': { center: [33.729759, -111.431221], zoom: 7 },
    'Arkansas': { center: [34.969704, -92.373123], zoom: 7 },
    'California': { center: [36.116203, -119.681564], zoom: 6 },
    'Colorado': { center: [39.059811, -105.311104], zoom: 7 },
    'Connecticut': { center: [41.597782, -72.755371], zoom: 9 },
    'Delaware': { center: [39.318523, -75.507141], zoom: 9 },
    'Florida': { center: [27.766279, -81.686783], zoom: 6 },
    'Georgia': { center: [33.040619, -83.643074], zoom: 7 },
    'Hawaii': { center: [21.094318, -157.498337], zoom: 7 },
    'Idaho': { center: [44.240459, -114.478828], zoom: 6 },
    'Illinois': { center: [40.349457, -88.986137], zoom: 7 },
    'Indiana': { center: [39.849426, -86.258278], zoom: 7 },
    'Iowa': { center: [42.011539, -93.210526], zoom: 7 },
    'Kansas': { center: [38.526600, -96.726486], zoom: 7 },
    'Kentucky': { center: [37.668140, -84.670067], zoom: 7 },
    'Louisiana': { center: [31.169546, -91.867805], zoom: 7 },
    'Maine': { center: [44.693947, -69.381927], zoom: 7 },
    'Maryland': { center: [39.063946, -76.802101], zoom: 8 },
    'Massachusetts': { center: [42.230171, -71.530106], zoom: 8 },
    'Michigan': { center: [43.326618, -84.536095], zoom: 6 },
    'Minnesota': { center: [45.694454, -93.900192], zoom: 6 },
    'Mississippi': { center: [32.741646, -89.678696], zoom: 7 },
    'Missouri': { center: [38.456085, -92.288368], zoom: 7 },
    'Montana': { center: [47.040182, -109.633450], zoom: 6 },
    'Nebraska': { center: [41.125370, -98.268082], zoom: 7 },
    'Nevada': { center: [38.313515, -117.055374], zoom: 6 },
    'New Hampshire': { center: [43.452492, -71.563896], zoom: 8 },
    'New Jersey': { center: [40.298904, -74.521011], zoom: 8 },
    'New Mexico': { center: [34.840515, -106.248482], zoom: 7 },
    'New York': { center: [42.165726, -74.948051], zoom: 7 },
    'North Carolina': { center: [35.630066, -79.806419], zoom: 7 },
    'North Dakota': { center: [47.528912, -99.784012], zoom: 7 },
    'Ohio': { center: [40.388783, -82.764915], zoom: 7 },
    'Oklahoma': { center: [35.565342, -96.928917], zoom: 7 },
    'Oregon': { center: [44.572021, -122.070938], zoom: 7 },
    'Pennsylvania': { center: [40.590752, -77.209755], zoom: 7 },
    'Puerto Rico': { center: [18.220833, -66.590149], zoom: 8 },
    'Rhode Island': { center: [41.680893, -71.511780], zoom: 10 },
    'South Carolina': { center: [33.856892, -80.945007], zoom: 7 },
    'South Dakota': { center: [44.299782, -99.438828], zoom: 7 },
    'Tennessee': { center: [35.747845, -86.692345], zoom: 7 },
    'Texas': { center: [31.054487, -97.563461], zoom: 6 },
    'Utah': { center: [40.150032, -111.862434], zoom: 7 },
    'Vermont': { center: [44.045876, -72.710686], zoom: 8 },
    'Virginia': { center: [37.769337, -78.169968], zoom: 7 },
    'Washington': { center: [47.400902, -121.490494], zoom: 7 },
    'West Virginia': { center: [38.491226, -80.954570], zoom: 7 },
    'Wisconsin': { center: [44.268543, -89.616508], zoom: 7 },
    'Wyoming': { center: [42.755966, -107.302490], zoom: 7 }
  };

  // Generate mock data for all states and territories
  const generateMockData = (): Location[] => {
    const locations: Location[] = [];
    const customerTypes: ('CAC' | 'Prosecutors' | 'Law Enforcement')[] = ['CAC', 'Prosecutors', 'Law Enforcement'];
    
    Object.entries(stateBounds).forEach(([state, bounds]) => {
      // Generate 8-15 locations per state
      const locationCount = Math.floor(Math.random() * 8) + 8;
      
      for (let i = 0; i < locationCount; i++) {
        // Generate random coordinates within state bounds (rough approximation)
        const latOffset = (Math.random() - 0.5) * 2; // ±1 degree
        const lngOffset = (Math.random() - 0.5) * 3; // ±1.5 degrees
        
        locations.push({
          id: `${state}-${i}`,
          name: `${customerTypes[Math.floor(Math.random() * customerTypes.length)]} - ${state} ${i + 1}`,
          lat: bounds.center[0] + latOffset,
          lng: bounds.center[1] + lngOffset,
          state,
          type: customerTypes[Math.floor(Math.random() * customerTypes.length)]
        });
      }
    });
    
    return locations;
  };

  const mockLocations = React.useMemo(() => generateMockData(), []);

  // Color mapping for customer types
  const getColorByType = (type: string): string => {
    switch (type) {
      case 'CAC': return '#9B59B6'; // purple
      case 'Prosecutors': return '#3b82f6'; // light blue  
      case 'Law Enforcement': return '#1e40af'; // dark blue
      default: return '#6b7280'; // gray
    }
  };

  // Filter locations based on selected state
  useEffect(() => {
    if (selectedState === 'All States') {
      setFilteredLocations(mockLocations);
      setMapBounds({ center: [39.8283, -98.5795], zoom: 4 });
    } else {
      const stateLocations = mockLocations.filter(loc => loc.state === selectedState);
      setFilteredLocations(stateLocations);
      setMapBounds(stateBounds[selectedState] || { center: [39.8283, -98.5795], zoom: 4 });
    }
  }, [selectedState, mockLocations]);

  const states = ['All States', ...Object.keys(stateBounds).sort()];

  return (
    <div className="space-y-6">
      {/* Filter and Legend */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-64 font-poppins border-guardify-navy-blue focus:ring-guardify-navy-blue">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent className="bg-white border-guardify-navy-blue max-h-60">
            {states.map((state) => (
              <SelectItem 
                key={state} 
                value={state} 
                className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue"
              >
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Legend */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-guardify-purple"></div>
            <span className="text-sm font-poppins text-slate-700">CAC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-guardify-blue"></div>
            <span className="text-sm font-poppins text-slate-700">Prosecutors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-guardify-navy-blue"></div>
            <span className="text-sm font-poppins text-slate-700">Law Enforcement</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-slate-200">
        <MapContainer
          key={`${mapBounds.center[0]}-${mapBounds.center[1]}-${mapBounds.zoom}`}
          center={mapBounds.center}
          zoom={mapBounds.zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredLocations.map((location) => (
            <CircleMarker
              key={location.id}
              center={[location.lat, location.lng]}
              radius={6}
              fillColor={getColorByType(location.type)}
              color="#ffffff"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div className="font-poppins">
                  <div className="font-semibold text-slate-800">{location.name}</div>
                  <div className="text-sm text-slate-600">{location.state}</div>
                  <div className="text-sm text-slate-600">{location.type}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="text-center">
        <div className="text-sm text-slate-600 font-poppins">
          Interactive map showing Guardify usage across {selectedState === 'All States' ? 'the United States' : selectedState}
          {selectedState !== 'All States' && (
            <span className="ml-2 text-guardify-navy-blue">
              ({filteredLocations.length} locations)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveUSMap;
