export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-transparent">
      <div className="flex gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-100/80 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-200/80 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-100/80 animate-bounce [animation-delay:.7s]"></div>
      </div>
      <p className="text-gray-200/90 text-xs font-extralight">Cargando...</p>
    </div>
  );
}
