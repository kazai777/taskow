import { ButtonConnect } from "./ButtonConnect"; // Assurez-vous que le chemin est correct

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-black p-4">
      <div className="text-white text-lg font-bold">Taskow</div>
      <div className="flex space-x-4 text-white">
        <a href="#home" className="hover:underline">
          Home
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </div>
      <div>
        <ButtonConnect />
      </div>
    </nav>
  );
};
