import TrainingExample from "@/assets/capacitacion.png";

const TrainingUsers = () => {
    return (
        <div className="mt-3">
            <h2 className="text-xl font-semibold mb-4">Próximas Capacitaciones</h2>
            <img src={TrainingExample} alt="Capacitaciones" className="mb-6 rounded-lg shadow-md" />
        </div>
    )
}

export default TrainingUsers;