import "../styles/whatsapp.css"

const WhatsApp = () => {
    const onclickHandle = () => {
        window.open("https://api.whatsapp.com/send/?phone=3325654865", "_blank");
    }
  return (
    <div className="whatsapp fixed bottom-[23px] right-8 w-[70px] z-[9999] cursor-pointer">
        <img onClick={onclickHandle} src="../../public/images/whatRoomly-removebg-preview.png" alt="" />
    </div>
  )
}

export default WhatsApp