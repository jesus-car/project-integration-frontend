import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { IoClose } from "react-icons/io5";

const ImageProduct = (props) => {

  return (
      <div className='relative' style={{display: "flex", justifyContent: "center", flexDirection: "column", height: "100%"}}>
        <div onClick={() => props.onClickClose()} className='text-xl cursor-pointer	text-white	font-bold	absolute top-[25px] right-3'><IoClose className="w-7 h-7" /></div>
        <Slide autoplay={false} transitionDuration={1}>
            {props.imgs.map((val, key) => 
              <div key={key} className="flex justify-center	each-slide-effect">
                <img style={{width: "90%"}} src={val} alt="" />
              </div>

            )}
        </Slide>
      </div>
  )
}

export default ImageProduct