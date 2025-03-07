import Logo from "../../assets/Logo.webp"
import { MdEmail, MdLock } from "react-icons/md"; 

const LoginUsers = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500 p-4">
            <img src={Logo} alt="Logo" className="w-auto h-10 mb-4" />
            <h1 className="text-2xl font-bold mb-8 text-white">Inicia Sesión</h1>

            <div className="w-full max-w-xs space-y-6">
                <div className="relative">
                    <MdEmail className="icons-login" />
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        className="inputs-login"
                    />
                
                </div>
                <div className="relative">
                    <MdLock className="icons-login" />
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            className="inputs-login"
                            />

                </div>
                <button className="btn-login">
                    Ingresar
                </button>

                <p className="text-center text-white">¿Olvidaste tu contraseña?</p>
                
            </div>
        </div>
        </>
    )
}

export default LoginUsers