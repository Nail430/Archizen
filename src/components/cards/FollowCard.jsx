import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext.jsx"
export default function FollowCard({image, nom, description}){

const {theme} = useContext(ThemeContext);
    
    return(
        <div className={`${theme} rounded-lg flex justify-between p-8 gap-6`}>
           <img src={image} alt="user image" className="w-20 h-20 rounded-full"/>
           <div className=" w-[60%]">
                <h2 className="font-bold text-xl" >{nom}</h2>
                <p className="text-sm my-2 text-gray-600">{description}</p>
                <p className="text-sm text-gray-400">Published 3 min ago</p>
           </div>
           <div className=" flex gap-5 items-center">
                <button className="h-10 w-28 text-md cursor-pointer">See More</button>
                <button className={`${theme} ${nom=== "David" ? "bg-blue-500 " : "bg-black"}  text-white h-10 w-28 text-md cursor-pointer rounded-full hover:bg-orange-500 `}>Follow</button>
           </div>
        </div>
    )
}