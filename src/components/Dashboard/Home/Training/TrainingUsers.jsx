import TrainingExample from "@/assets/capacitacion.png";
import TrainingExample2 from "@/assets/capacitacion.png";
import TrainingExample3 from "@/assets/capacitacion.png";

const TrainingUsers = () => {
    const images = [TrainingExample, TrainingExample2, TrainingExample3]
    return (
        <div className="mt-3">
            <h2 className="text-xl font-semibold mb-4">Próximas Capacitaciones</h2>
            <div className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4">
                {images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 snap-center">
                        <img
                            src={img}
                            alt={`Capacitación ${index + 1}`}
                            className="rounded-lg shadow-md object-cover w-full h-48"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TrainingUsers;
