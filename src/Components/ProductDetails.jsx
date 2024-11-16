import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaStar } from "react-icons/fa6";
import { AiOutlineDesktop } from "react-icons/ai";
import { PiPawPrintBold } from "react-icons/pi";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { GiCctvCamera } from "react-icons/gi";
import { FaCarSide } from "react-icons/fa6";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FaWifi } from "react-icons/fa6";
import { IoTvOutline } from "react-icons/io5";
import ImageProduct from "./ImageProduct";
import { useNavigate, useParams } from "react-router-dom";
import { propertyService } from '../services/propertyService'
import Spinner from "./Spinner";
import "../styles/productDetail.css"
import { GetIcon } from "./ListFeature";



const ProductDetails = () => {
    const [open, setOpen] = useState(false)
    const [openImg, setOpenImg] = useState(false)
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenImg = () => setOpenImg(true);
    const handleCloseImg = () => setOpenImg(false);

    useEffect(() => {
        propertyService.getPropertyById(id).then((property) => {
            setDetail(property)
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        })
    }, [id])

    if (loading || !detail) return <Spinner />;

    return (
        <div className="px-[20.5rem] flex align-center flex-col container-detail">
            <div className="relative">
                <div className="tittle mt-10 flex justify-between ">
                    <h1 className="h1-tittle text-2xl font-medium">{detail.name}</h1>
                    <button><FaArrowLeftLong onClick={() => navigate("/home")} className="btn-arrow w-7 h-7"/></button>
                </div> 
                <div className="detail-img mt-2 gap-x-2 gap-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <img className="col-span-2 w-full object-cover rounded-lg h-96 img-prin" src={detail.mainPhotoUrl} alt="Principal" />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2"> 
                        {detail.photoUrls.slice(0, 4).map((url, index) => 
                            <img key={index} src={url} alt={`Secondary ${index + 1}`} className="w-96 object-cover rounded-lg h-[188px] img-secun"/>
                        )}
                        <div onClick={handleOpenImg} className="more-img cursor-pointer bg-white w-44 h-8 flex flex-row items-center rounded-md gap-x-4 pl-8 justify-self-end absolute bottom-5 mr-5">
                            <TfiLayoutGrid2Alt/>
                            <button>Más fotos</button>
                        </div>
                        <Modal 
                            open={openImg}
                            onClose={handleCloseImg}
                            aria-labelledby="img-modal-modal-title"
                            aria-describedby="img-modal-modal-description"
                        >
                            <ImageProduct imgs={detail.photoUrls} onClickClose={handleCloseImg}></ImageProduct>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <div>
                    <h1 className="text-2xl font-medium">Alojamiento en {detail.city.name}, {detail.city.country.name}</h1>
                    <h1 className="text-2xl font-medium">${detail.pricePerNight} Noche</h1>
                    <p className="mt-5">{detail.maxCapacity} huéspedes, {detail.numRooms} dormitorios, {detail.numBeds} camas, {detail.numBathrooms} baños</p>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <p className="font-semibold text-lg">Anfitrión: {detail.owner.firstName} {detail.owner.lastName}</p>
            </div>
            <div className="mt-16 text-lg">
                <p className="w-7/12">{detail.description}</p>
                <button className="font-medium mt-1" onClick={handleOpen}>Más +</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="more-detail h-svh flex justify-center flex items-center">
                        <div className="open-details w-1/2 h-5/6 bg-white rounded-lg text-wrap pl-16 pr-16 pt-10 modal-2">
                            <button onClick={handleClose}><IoClose className="w-7 h-7" /></button>
                            <p className="p-info mt-7 text-xl font-bold" id="modal-modal-title">
                                Sobre este espacio
                            </p>
                            {detail.description}
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="mt-16">
                <div>
                    <h3 className="font-semibold text-lg">Lo que ofrece este lugar</h3>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-32">
                    <div className="grid grid-cols-2 gap-x-28">
                        {detail.features.map((feature, key) => 
                            <div key={key} className="flex items-center gap-x-2.5 mt-1">
                                {GetIcon(feature.iconName)}
                                <h4 className="text-lg">{feature.name}</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails