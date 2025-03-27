import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchFood";

const Food = () => {
  const {data,loading} = useFetchData();
    const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const boxes = document.querySelectorAll<HTMLDivElement>(".box");
      const newVisibleBoxes: number[] = [];

      boxes.forEach((box, index) => {
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          newVisibleBoxes.push(index);
        }
      });

      setVisibleBoxes(newVisibleBoxes);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to check initial visibility

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

if(data === null ||data == undefined || !data){
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-10 h-10 bg-purple-500 rounded-full animate-ping"></div>
  </div>
  )
}

    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-bgMove overflow-hidden overflow-x-hidden">
        <h1 className="text-sm text-center text-red-700"> FAMOUS FOOD IN GEORGIA </h1>
  

       {
       data.map((food,index) =>(
            <div className={`mx-8 my-5 movingBorder box ${visibleBoxes.includes(index) ? (index%2 ===0? "slide-left" : "slide-right"): 
                (index %2 === 0 ? "hidden-left":"hidden-right")}`}
            key={index}
            >
          <img
            src={food.imageUrl}
            className="w-full rounded-lg"
          />
          <h2 className="text-center text-amber-800 mt-2">{food.name}</h2>
        </div>
        ))
       }
        
      </div>
    );
  };
  
export default Food;
  

