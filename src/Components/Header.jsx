import {  useNavigate } from "react-router-dom"


const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
        <div className='flex justify-between bg-bgPrimary top-0 left-0 right-0'>
            <img onClick={() => navigate("/home")} className="ml-7 cursor-pointer" src="/public/images/Roomly logo.png" alt="" width={100} /> 
            <div dir='rtl' className="content-center space-between">     
                <button className="w-20 h-7 mr-12 bg-black rounded-lg shadow-2xl text-white text-sm hover:bg-blue-700">Sign up</button>
                <button className="text-black hover:text-white w-20 h-7 mr-5 rounded-lg text-center shadow-2xl text-base hover:bg-blue-700">Login</button>    
            </div>
        </div>  
        
    </div>
  )
}

export default Header