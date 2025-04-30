import OtrosIcon from "@/assets/OtrosIcon.png";
import PlagasIcon from "@/assets/PlagasIcon.png";
import ArtefactosIcon from "@/assets/ArtefactosIcon.png";
import JardineriaIcon from "@/assets/JardineriaIcon.png";
import PinturaIcon from "@/assets/PinturaIcon.png";
import AlbaneriaIcon from "@/assets/AlbaneriaIcon.png";
import CarpinteriaIcon from "@/assets/CarpinteriaIcon.png";
import ClimatizacionIcon from "@/assets/ClimatizacionIcon.png";
import SeguridadIcon from "@/assets/SeguridadIcon.png";
import LimpiezaIcon from "@/assets/LimpiezaIcon.png";
import CerrajeriaIcon from "@/assets/CerrajeriaIcon.png";
import ElectricidadIcon from "@/assets/ElectricidadIcon.png";
import GasfiteriaIcon from "@/assets/GasfiteriaIcon.png";
import IconPaidComplete from "@/assets/IconPaidComplete.png";
import IconPendingComplete from "@/assets/requests/pendiente.png";
import IconCanceled from "@/assets/requests/rechazada.png";
const Icons = {
    // Servicios / Tipos
    Gasfitería: GasfiteriaIcon,
    Electricidad: ElectricidadIcon,
    Cerrajería: CerrajeriaIcon,
    Limpieza: LimpiezaIcon,
    Seguridad: SeguridadIcon,
    Climatización: ClimatizacionIcon,
    Carpintería: CarpinteriaIcon,
    Albañilería: AlbaneriaIcon,
    Pintura: PinturaIcon,
    Jardinería: JardineriaIcon,
    Artefactos: ArtefactosIcon,
    "Control de plagas": PlagasIcon,
    Otros: OtrosIcon,

    // Estados de Pago
    accepted: IconPaidComplete,
    paid: IconPaidComplete,
    pending: IconPendingComplete,
    canceled: IconCanceled,

    default: OtrosIcon,
};

export default Icons;