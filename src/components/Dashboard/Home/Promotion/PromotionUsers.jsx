import PromoImg from "@/assets/promocion.png"
import PromoImg2 from "@/assets/promocion2.png"
import PromoImg3 from "@/assets/promocion3.png"
import { useNavigate } from "react-router-dom"

const PromotionUsers = () => {
    const images = [PromoImg, PromoImg2, PromoImg3]
    const Navigate = useNavigate()
    return (
        <div className="mt-3">
            <h2 className="text-xl font-semibold mb-4">Promociones</h2>
            <div className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4">
                {images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 snap-center cursor-pointer" onClick={() => { Navigate(`/promotion${index + 1}`) }}>
                        <img
                            src={img}
                            alt={`Promoción ${index + 1}`}
                            className="rounded-lg shadow-md object-cover w-full h-48"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PromotionUsers
