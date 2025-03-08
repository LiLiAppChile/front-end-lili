import TrainingExample from "../../assets/training-example.png";

const TrainingUsers = () => {
    return (
        <div className="mt-10 mb-20">
            <h2 className="text-xl font-semibold mb-4">Próximas Capacitaciones</h2>
            <img src={TrainingExample} alt="Capacitaciones" className="mb-6 rounded-lg shadow-md" />
        </div>
    )
}

export default TrainingUsers;