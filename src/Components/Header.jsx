import { Link } from "react-router-dom";
import '../output.css';

const Header = () => {
    return (
        <header className="flex items-center justify-between h-20 bg-gradient-to-r from-gray-500 to-gray-200 text-white w-11/12 rounded px-10">
            <div className="flex items-center justify-start">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">HAYP</h2>
            </div>
            <nav className="flex items-center space-x-8">
                <Link to="/" className="hover:bg-gray-200">
                    <p className="text-lg text-black font-semibold">Inicio</p>
                </Link>
                <Link to="/chat" className="hover:bg-gray-200">
                    <p className="text-lg text-black font-semibold">BOT</p>
                </Link>
                <Link to="/componentes" className="hover:bg-gray-200">
                    <p className="text-lg text-black font-semibold">Componentes</p>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
