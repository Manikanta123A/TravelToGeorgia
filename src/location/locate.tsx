import { Button } from "@/components/ui/button"
import {useState } from "react"
import MapComponent from "./MapComponent";
import axios from "axios";
axios.defaults.withCredentials = true;

type location = number | null;
const Locate =()=>{
  
    const [latti, setlat]= useState<location>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [longi, setlongi] = useState<location>(null)
    const getlocation =async  ()=>{
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((position:GeolocationPosition)=>{
          const lat:number = position.coords.latitude
          setlat(lat);
          const long:number = position.coords.longitude
          setlongi(long);
        
          (async () => {
            try {
              let result = await axios.post('https://backendlocationchat.onrender.com/user/location', {
                locationC: {
                  lattitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }
              });
              console.log(result)
            } catch (error: any) {
              console.log(error);
            }
          })();
        }, (error: GeolocationPositionError) => {
          console.log("Error in the location", error);
        });
        
        
        setOpen(!open);
      }else{
        console.log("YOur Browser doesnt support geolocation")
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen mx-10">
        {
          !open &&
          <>
            <h1 className="md:text-3xl text-xl font-bold">Centered Heading</h1>
            <Button className='focus:outline-2 hover:border focus-visible:ring-2' onClick={getlocation} > See Others</Button>
          </>
        }
        
        {
            open && latti !== null && longi !== null &&
            <MapComponent lattitude={latti} longitude={longi}/>
        }
      </div>
    );
}
export default Locate;

