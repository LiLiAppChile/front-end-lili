import HeaderUsers from "../Header/HeaderUsers"
import JobsUsers from "../Home/Jobs/JobsUsers"
import PromotionUsers from "../Home/Promotion/PromotionUsers"
import BottomMenu from "../BottomMenu/BottomMenu"
import TrainingUsers from "../Home/Training/TrainingUsers"

const HomeUsers = () => {

    return (
    <div className="p-4">
        <HeaderUsers />

      <button className="btn-promociones">
        Completar formulario
      </button>

        <PromotionUsers />
        <JobsUsers />
        <TrainingUsers />
        <BottomMenu />
    </div>
    )
}

export default HomeUsers