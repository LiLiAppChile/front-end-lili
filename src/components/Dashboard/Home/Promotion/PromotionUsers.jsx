import PromoImg from "../../../../assets/promo-example.png";

const PromotionUsers = () => {
  return (
    <div className="mb-8 mt-10">
      <h2 className="text-xl font-semibold mb-4">Promociones</h2>
      <img
        src={PromoImg}
        alt="Promociones"
        className="mb-6 rounded-lg shadow-md"
      />
    </div>
  );
};

export default PromotionUsers;
