import Image from 'next/image';
import '../styles/globals.css';  // Importamos el archivo CSS del footer

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-info">
                <p id="footer-salon">Dirección del salón comunal</p>
                <p id="footer-barrio">Barrio NombreBarrio</p>
                <p id="footer-correo">contacto@juntaaccioncomunal.com</p>
                <p id="footer-telefono">+57 300 123 4567</p>
            </div>

            <div className="footer-logos">
                <ul className="footer-logo">
                    <li><a href="https://www.presidencia.gov.co/">
                        <Image
                            src="/escudoColombia.png"
                            alt="Escudo Colombia"
                            width={60}
                            height={80}
                            className="object-contain"
                        />
                    </a></li>
                </ul>
                <ul className="footer-logo">
                    <li><a href="https://www.cundinamarca.gov.co/">
                        <Image
                            src="/escudoDepto.png"
                            alt="Escudo Cundinamarca"
                            width={60}
                            height={80}
                            className="object-contain"
                        />
                    </a></li>
                </ul>
                <ul className="footer-logo">
                    <li><a href="https://www.girardot-cundinamarca.gov.co/Paginas/Inicio.aspx">
                        <Image
                            src="/escudoMunicipio.png"
                            alt="Escudo Municipio"
                            width={60}
                            height={80}
                            className="object-contain"
                        />
                    </a></li>
                </ul>
                <ul className="footer-logo">
                    <li><a href="https://www.idaco.gov.co/">
                        <Image
                            src="/LogoIvc.png"
                            alt="Logo IVC"
                            width={60}
                            height={80}
                            className="object-contain"
                        />
                    </a></li>
                </ul>
            </div>

            <div className="footer-creator">
                <p id="footer-creador">Sitio creado por:</p>
                <p>NextGen Coders</p>
                <p id="footer-periodo">Periodo 2024-2026</p>
            </div>
        </footer>
    );
};

export default Footer;
