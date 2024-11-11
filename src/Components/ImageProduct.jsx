import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { IoClose } from "react-icons/io5";
import "../styles/productDetail.css"

const ImageProduct = (props) => {

  return (
      <div className='relative flex justify-center flex-col h-full'>
        <div onClick={() => props.onClickClose()} className='z-50 text-xl cursor-pointer	text-white	font-bold	absolute top-[25px] right-3'><IoClose className="w-7 h-7" /></div>
        <Slide autoplay={false} transitionDuration={1}>
            {props.imgs.map((val, key) => 
              <div key={key} className="flex justify-center	each-slide-effect">
                <img className='w-4/6' src={val} alt="" />
              </div>

            )}
        </Slide>
      </div>
  )
}

export default ImageProduct