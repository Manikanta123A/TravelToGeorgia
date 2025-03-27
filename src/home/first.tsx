import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
axios.defaults.withCredentials = true;

  
const First = ()=>{

    const [name,setName] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false)
    const [err, setErr] = useState<string>("");
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }
    const navigate = useNavigate();
    const submithandler =  async ()=>{
        try{
           
            localStorage.setItem("Name",name)
         
            let result = await axios.post('https://backendlocationchat.onrender.com/user/login', {
                name
            });
            
            if(result.data.success){
                navigate("/second")
            }
        }catch(error:any){
            console.log(error);
            setErr(error.response.data.message)
        }
        
        // if(name != null && name!=""){
           
        // }
        // navigate("/")
    }
    useEffect(()=>{
        const get = localStorage.getItem("Name");
        if(get != "" && get != null){
            navigate("/second")
        }
        setTimeout(() => {
            setOpen(true)
        }, 3000);
    },[])
    return(<div className="flex justify-center items-center min-h-screen"  
        style={{
            minHeight: "100vh",
            backgroundImage: "url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
    >
        <Dialog open={open}>
            <DialogTrigger><h1 className="text-6xl text-orange-800">Hello</h1></DialogTrigger>
            <DialogContent className="bg-yellow-400">
                <DialogHeader className="bg-yellow-200 text-green-500 text-center">
                    <DialogTitle className="text-green-800 text-center m-4">Enter Your Name</DialogTitle>
                    <div className="flex flex-col gap-5 p-5 justify-center items-center">
                        <Input name="Name" 
                        value={name}
                        onChange={changeEventHandler}
                        className="text-pink-500 border-red-700 focus:border-red-600 m-4 md:pl-30 md:text-5xl font-extrabold"
                        />
                        <p className="text-sm text-red-600">{err == ""? "":err}</p>
                        <Button onClick={submithandler} className="m-4  border border-green-500"> Proceed <Check className="bg-green-500 rounded-full"/> </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </div>
    )
}

export default First;