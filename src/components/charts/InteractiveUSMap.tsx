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
  const [selectedRegion, setSelectedRegion] = useState<string>('all-regions');
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

  // Regional groupings
  const regionStates: Record<string, string[]> = {
    'northeast': ['Maine', 'New Hampshire', 'Vermont', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New York', 'New Jersey', 'Pennsylvania'],
    'southeast': ['Delaware', 'Maryland', 'Virginia', 'West Virginia', 'Kentucky', 'Tennessee', 'North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Alabama', 'Mississippi', 'Arkansas', 'Louisiana'],
    'midwest': ['Ohio', 'Michigan', 'Indiana', 'Wisconsin', 'Illinois', 'Minnesota', 'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas'],
    'southwest': ['Texas', 'Oklahoma', 'New Mexico', 'Arizona'],
    'west': ['Montana', 'Wyoming', 'Colorado', 'Utah', 'Idaho', 'Washington', 'Oregon', 'Nevada', 'California'],
    'northwest': ['Alaska', 'Hawaii']
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

  // Color mapping for customer types using brand colors
  const getColorByType = (type: string): string => {
    switch (type) {
      case 'CAC': return '#9B59B6'; // purple
      case 'Prosecutors': return '#006FA7'; // blue  
      case 'Law Enforcement': return '#191C35'; // navy blue
      default: return '#767676'; // gray
    }
  };

  // Filter locations based on selected state and region
  useEffect(() => {
    let filtered = mockLocations;

    // Filter by region first
    if (selectedRegion !== 'all-regions') {
      const statesInRegion = regionStates[selectedRegion] || [];
      filtered = filtered.filter(loc => statesInRegion.includes(loc.state));
    }

    // Then filter by specific state if selected
    if (selectedState !== 'All States') {
      filtered = filtered.filter(loc => loc.state === selectedState);
      setMapBounds(stateBounds[selectedState] || { center: [39.8283, -98.5795], zoom: 4 });
    } else if (selectedRegion !== 'all-regions') {
      // Set bounds for region
      const statesInRegion = regionStates[selectedRegion] || [];
      if (statesInRegion.length > 0) {
        const regionBounds = statesInRegion.map(state => stateBounds[state]).filter(Boolean);
        if (regionBounds.length > 0) {
          const avgLat = regionBounds.reduce((sum, bounds) => sum + bounds.center[0], 0) / regionBounds.length;
          const avgLng = regionBounds.reduce((sum, bounds) => sum + bounds.center[1], 0) / regionBounds.length;
          setMapBounds({ center: [avgLat, avgLng], zoom: 5 });
        }
      }
    } else {
      setMapBounds({ center: [39.8283, -98.5795], zoom: 4 });
    }

    setFilteredLocations(filtered);
  }, [selectedState, selectedRegion, mockLocations]);

  const states = ['All States', ...Object.keys(stateBounds).sort()];
  const regionOptions = [
    { value: "all-regions", label: "All Regions" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West" },
    { value: "northwest", label: "Northwest" }
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Legend */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-50">
        <div className="flex gap-4">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-64 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#1E3A8A] max-h-60 z-[9999]">
              {states.map((state) => (
                <SelectItem 
                  key={state} 
                  value={state} 
                  className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A]"
                >
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#1E3A8A] z-[9999]">
              {regionOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Legend */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9B59B6]"></div>
            <span className="text-sm font-poppins text-[#767676]">CAC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006FA7]"></div>
            <span className="text-sm font-poppins text-[#767676]">Prosecutors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#191C35]"></div>
            <span className="text-sm font-poppins text-[#767676]">Law Enforcement</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-[#F3F3F3] relative z-10">
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
                  <div className="font-semibold text-[#191C35]">{location.name}</div>
                  <div className="text-sm text-[#767676]">{location.state}</div>
                  <div className="text-sm text-[#767676]">{location.type}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="text-center">
        <div className="text-sm text-[#767676] font-poppins">
          Interactive map showing Guardify usage across {selectedState === 'All States' ? (selectedRegion === 'all-regions' ? 'the United States' : regionOptions.find(r => r.value === selectedRegion)?.label) : selectedState}
          {(selectedState !== 'All States' || selectedRegion !== 'all-regions') && (
            <span className="ml-2 text-[#191C35]">
              ({filteredLocations.length} locations)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveUSMap;