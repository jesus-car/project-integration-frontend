import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { IoClose } from "react-icons/io5";

const ImageProduct = (props) => {

  return (
      <div className='m-32 relative'>
        <div onClick={() => props.onClickClose()} className='text-xl cursor-pointer	text-white	font-bold	absolute top-[-50px] right-3'><IoClose className="w-7 h-7" /></div>
        <Slide autoplay={false} transitionDuration={1}>
            {props.imgs.map((val, key) => 
              <div key={key} className="flex justify-center	each-slide-effect">
                <img className="w-6/12" src={val} alt="" />
              </div>

            )}
        </Slide>
      </div>
  )
}

export default ImageProduct