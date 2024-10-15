import Image from 'next/image';
import '../styles/globals.css';  // Importamos el archivo CSS del header

const Header = () => {
    return (
        <header className="header-container">
            <div className="logo-left">
                <a href="/">
                    <Image
                        src="/logoOac.png"
                        alt="Logo Izquierdo"
                        width={70}
                        height={90}
                        className="object-contain"
                    />
                </a>
            </div>

            <div className="text-center">
                <h1 className="header-title">JAC</h1>
                <p className="header-text">PERSONERIA JURIDICA:</p>
                <p className="header-text">Expedido por:</p>
                <p className="header-text">NIT:</p>
                <p className="header-text">RUC:</p>
                <p className="header-text">Girardot</p>
            </div>

            <div className="logo-right">
                <a href="https://comunal.mininterior.gov.co/">
                    <Image
                        src="/accionComunal.png"
                        alt="Logo Derecho"
                        width={60}
                        height={80}
                        className="object-contain"
                    />
                </a>
            </div>
        </header>
    );
};

export default Header;
