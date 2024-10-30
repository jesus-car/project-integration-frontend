import {  useNavigate } from "react-router-dom"


const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-base">
        <div className='flex justify-between top-0 left-0 right-0'>
          <div className="p-2">
            <img onClick={() => navigate("/home")} className="ml-7 cursor-pointer" src="/src/assets/logo_primary_base.svg" alt="" width={80} />
          </div>
            
            <div dir='rtl' className="content-center space-between">     
                <button className="w-20 h-7 mr-12 bg-primary rounded-lg shadow-2xl text-white text-sm hover:bg-primaryHover">Sign up</button>
                <button className="text-black hover:text-white w-20 h-7 mr-5 rounded-lg text-center shadow-2xl text-base hover:bg-primaryHover">Login</button>
            </div>
        </div>  
        
    </div>
  )
}

export default Header