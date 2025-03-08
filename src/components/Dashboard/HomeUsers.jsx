import HeaderUsers from "./HeaderUsers"
import JobsUsers from "./JobsUsers"
import PromotionUsers from "./PromotionUsers"
import BottomMenu from "./BottomMenu"
import TrainingUsers from "./TrainingUsers"

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