
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useEffect, useState } from "react";


const Pic = ({place}:{place:any})=>{
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(isDialogOpen)
    useEffect(() => {
        // Load the WAV file
        const sound = new Audio("/game.mp3"); // Ensure the file is in public folder
        setAudio(sound);
    }, []);
    const handleOpen = () => {
        setIsDialogOpen(true);
        if (audio) {
            audio.currentTime = 0; // Restart sound
            audio.play();
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset sound
        }
    };
    return (
        <div className="w-full min-w-[280px] h-100 hover:scale-110 hover:opacity-100 opacity-90 bg-gray-300  rounded-2xl flex justify-center items-center text-xl">
             <Dialog onOpenChange={(open) => open ? handleOpen() : handleClose()}>
            <DialogTrigger>
                <div className="flex flex-col justify-center items-center m-2 min-h-screen">
                    <img src={place.imageUrl} height={"100px"}/>
                    <h1 text-2xl font-bold mt-4>{place.name}</h1>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-yellow-400 max-w-md">
                <DialogHeader className="bg-yellow-200 text-green-500 text-center">
                    <DialogTitle className="text-green-800 text-center m-4">Details</DialogTitle>
                </DialogHeader>
                {/* Scrollable Content Wrapper */}
                <div className="max-h-[400px] overflow-y-auto p-2">
                    <div className="flex flex-col m-2 border border-amber-300">
                        <img src={place.imageUrl} height={"100px"}/>
                        <h1> <span className="font-bold">Description </span> :   {place.name}</h1>
                        <p> {place.description}</p>
                        <p className="text-red-700">
                            <span className="font-bold">Visting Date </span> : {place.visitingDate}
                            </p>
                        <p className="text-amber-800"><span className="font-bold"> Famous Food </span> : {place.famousFood}</p>
                        <a href={place.url} className="font-bold" >Know More about this place</a>
                       
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </div>
    )
}

export default Pic;
