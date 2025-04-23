import PromoImg from "@/assets/promocion.png"

const PromotionUsers = () => {
    return (
        <div className="mt-3">
            <h2 className="text-xl font-semibold mb-4">Promociones</h2>
            <img src={PromoImg} alt="Promociones" className="mb-6 rounded-lg shadow-md" />
        </div>
    )
}

export default PromotionUsers