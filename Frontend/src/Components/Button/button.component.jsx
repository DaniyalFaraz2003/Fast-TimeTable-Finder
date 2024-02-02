export default function Button({ onClick, children }) {
  return (
    <a
      onClick={onClick}
      href="#_"
      className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium tracking-tighter dark:text-white text-black bg-gray-500 rounded-lg group"
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out dark:bg-dark-purple bg-light-blue rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
      <p className="relative font-bold text-md">{children}</p>
    </a>
  );
}
