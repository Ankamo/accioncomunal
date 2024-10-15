"use client";

import Link from 'next/link';

const Nav = () => {
    return (
        <nav className="bg-[#131212] text-white p-4">
            <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 text-center">
                <li>
                    <Link href="/cartelera">
                        Cartelera
                    </Link>
                </li>
                <li>
                    <Link href="/eventos-y-actividades">
                        Eventos y Actividades
                    </Link>
                </li>
                <li>
                    <Link href="/reuniones-y-asambleas">
                        Reuniones y Asambleas
                    </Link>
                </li>
                <li>
                    <Link href="/proyectos">
                        Proyectos Comunales
                    </Link>
                </li>
                <li>
                    <Link href="/servicios-comunales">
                        Servicios Comunales
                    </Link>
                </li>
                <li>
                    <Link href="/quienes-somos">
                        Quiénes Somos
                    </Link>
                </li>
                <li>
                    <Link href="/ingresar">
                        Ingresar
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
