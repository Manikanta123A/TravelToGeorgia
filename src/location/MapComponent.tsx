import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useFetchData from "@/hooks/useFetchLocation";


const water = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2927/2927491.png",
  iconSize: [30, 30]
});
const greenIcon = new L.Icon({
  iconUrl: "https://img.freepik.com/premium-vector/go-green-icon-illustration-vector_797178-34.jpg",
  iconSize: [30, 30]
});
const history= new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/10053/10053799.png",
  iconSize: [30, 30]
});
const shop= new L.Icon({
  iconUrl: "https://img.freepik.com/premium-vector/shopping-logo-vector-icon-illustration-design_757387-4224.jpg",
  iconSize: [30, 30]
});
const entertainment = new L.Icon({
  iconUrl: "https://cdn2.vectorstock.com/i/1000x1000/68/11/video-game-icon-vector-5246811.jpg",
  iconSize: [30, 30]
});




const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png", // Custom marker image
    iconSize: [32, 32], // Icon size
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup position
  });

const MapComponent = ({ lattitude, longitude }: { lattitude: number, longitude: number }) => {

  const {data,userData,loading} = useFetchData();
  console.log(loading)

  if(!data || data==undefined || data==null || !userData || userData== undefined || userData==null){
    return (
      <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-l-purple-500 rounded-full animate-spin"></div>
    </div>
    )
  }
  console.log(data)
	return (

        <MapContainer center={[lattitude, longitude]} zoom={13} className="absolute top-0 left-0 w-screen h-screen">
          {/* Add TileLayer (Map Background) */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Marker with Popup */}

          {data.map((place) => {
              let icon;
              if (place.humour === "nightlife" || place.humour==="thrilling" || place.humour==="adventurous") {
                icon = entertainment;
              } else if (place.humour === "historical" || place.humour === "reflective" || place.humour === "spiritual") {
               
                icon = history;
              } 
              else if (place.humour === "scenario" || place.humour === "serene") {
                icon=greenIcon
              }
              else if (place.humour==="scenary"){
                icon= water
              }
              else {
                icon = shop; // Default icon
              }

        return (<Marker key={`${place.lattitude}-${place.longitude}`} position={[place.lattitude, place.longitude]} icon={icon}>
          <Popup>{place.name}</Popup>
        </Marker>)
})}
         {userData.map((place) => (
        <Marker key={`${place.lattitude}-${place.longitude}`} position={[place.lattitude, place.longitude]} icon={customIcon}>
          <Popup>{place.name}</Popup>
        </Marker>
))}
        
        </MapContainer>


      );
}

export default MapComponent