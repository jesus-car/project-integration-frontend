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



const ProductDetails = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openImg, setOpenImg] = useState(false)
    const handleOpenImg = () => setOpenImg(true)
    const handleCloseImg = () => setOpenImg(false)

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState();
    const { id } = useParams()

    useEffect(() => {
        propertyService.getPropertyById(id).then((property) => {
            setDetail(property)
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        })
    }, [id])

    return (
        <>
        {loading ? 
            <Spinner /> : 
            <div className="px-[20.5rem] flex align-center flex-col container-detail">
            <div className="relative">
                <div className="tittle mt-10 flex justify-between ">
                    <h1 className=" h1-tittle text-2xl font-medium">{detail.title}</h1>
                    <button><FaArrowLeftLong onClick={() => navigate("/home")} className="btn-arrow w-7 h-7"/></button>
                </div> 
                <div className="detail-img mt-2 gap-x-2 gap-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <img className="col-span-2 w-full object-cover rounded-lg h-96 img-prin" src={detail.imgPrincipal} alt="Principal" />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2"> 
                            {detail.img.map((value, index) => 
                                <img key={index} src={value} alt="Secundary 1" className="w-96 object-cover rounded-lg h-[188px] img-secun"/>
                            )}
                            <div onClick={handleOpenImg} className="more-img cursor-pointer bg-white w-44 h-8 flex flex-row items-center rounded-md gap-x-4 pl-8 justify-self-end absolute bottom-5 mr-5">
                                <TfiLayoutGrid2Alt/>
                                <button >Más fotos</button>
                            </div>
                            <Modal 
                            open={openImg}
                            onClose={handleCloseImg}
                                aria-labelledby="img-modal-modal-title"
                                aria-describedby="img-modal-modal-description"
                            >
                                <ImageProduct imgs={detail.allImg} onClickClose={handleCloseImg}></ImageProduct>
                            </Modal>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <div>
                    <h1 className="text-2xl font-medium">Alojamiento en {detail.city} {detail.country}</h1>
                    <h1 className="text-2xl font-medium">{detail.price}$ Noche</h1>
                    <p className="mt-5">{detail.guests} huéspedes, {detail.bebrooms} dormitorios, {detail.bebs} camas, {detail.bathrooms} baños</p>
                </div>
                <div className="flex items-center gap-x-2.5 mt-1">
                    <FaStar/>
                    <p className="font-semibold text-lg">{detail.review}</p>
                    <h4 className="font-semibold text-lg">Reseñas</h4>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <p className="font-semibold text-lg">Anfitrión: {detail.host}</p>
                <p className="font-normal">{detail.yearhost} años anfitrionando</p>
            </div>
           {detail.workarea ? <div className="flex flex-row items-center gap-x-4 mt-14">
                <div>
                    <AiOutlineDesktop className="size-5"/>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Area de trabajo</h3>
                    <p className="font-normal">Una habitación con wifi ideal para trabajar</p>
                </div>
            </div> : <></>}
            {detail.petAllowed ? <div className="flex flex-row items-center gap-x-4 mt-5">
                <div>
                    <PiPawPrintBold className="size-5"/>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Las mascotas son bievenidas</h3>
                    <p className="font-normal">Trae tus mascotas al alojamiento</p>
                </div>
            </div> : <></>}
            <div className="mt-16 text-lg">
                <p>{detail.description}</p>
                <button className="font-medium mt-1" onClick={handleOpen}>Más +</button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div className="more-detail h-svh flex justify-center flex items-center">
                    <div className=" open-details w-1/2 h-5/6 bg-white rounded-lg text-wrap pl-16 pr-16 pt-10 modal-2">
                        <button onClick={handleClose}><IoClose className="w-7 h-7" /></button>
                        <p className="p-info mt-7 text-xl font-bold" id="modal-modal-title">
                        Sobre este espacio
                        </p>
                        {detail.description}
                        <div>
                            <h3 className="h3-descrip font-bold mt-5">Otros aspectos a destacar</h3>
                            {detail.moreDescription}
                            <h3 className="h3-descrip font-bold mt-5">Numero de registro</h3>
                            <p className="text-lg">{detail.registrerNumber}</p>
                        </div>
                    </div>
                </div>
                
                </Modal>
                
            </div>
            <div className="mt-16">
                <div>
                    <h3 className="font-semibold text-lg">Lo que ofrece este lugar</h3>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-32">
                    <div>
                        {propertyService.mountainView ? <div className="flex items-center gap-x-2.5 mt-1">
                            <IoImageOutline />
                            <h4 className=" text-lg">Vista a las montañas</h4>
                        </div> : <></>}
                        {detail.securityCamera ? <div className="flex items-center gap-x-2.5 mt-1">
                            <GiCctvCamera />
                            <h4 className=" text-lg">Cámaras de seguridad </h4>
                        </div> : <></>}
                        {detail.freeParking ? <div className="flex items-center gap-x-2.5 mt-1">
                            <FaCarSide />
                            <h4 className=" text-lg">Estacionamiento gratuito</h4>
                        </div> : <></> }
                        {detail.kitchen ? <div className="flex items-center gap-x-2.5 mt-1">
                            <TbToolsKitchen3 />
                            <h4 className=" text-lg">Cocina</h4>
                        </div> : <></>}
                    </div>
                    <div>
                        {detail.petAllowed ? <div className="flex items-center gap-x-2.5 mt-1">
                            <PiPawPrintBold/>
                            <h4 className=" text-lg">Se permiten mascotas</h4>
                        </div>: <></>}
                        {detail.wifi ?<div className="flex items-center gap-x-2.5 mt-1">
                            <FaWifi />
                            <h4 className=" text-lg">Wifi</h4>
                        </div>: <></>}
                        {detail.workarea ? <div className="flex items-center gap-x-2.5 mt-1">
                            <AiOutlineDesktop/>
                            <h4 className=" text-lg">Zona de trabajo</h4>
                        </div> : <></>}
                        {detail.tv ? <div className="flex items-center gap-x-2.5 mt-1">
                            <IoTvOutline />
                            <h4 className=" text-lg">TV</h4>
                        </div>: <></> }
                    </div>
                </div>
            </div>
            </div>
            }
        </>
    )
}

export default ProductDetails