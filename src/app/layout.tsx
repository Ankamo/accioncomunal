import '../styles/globals.css';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Junta de Acción Comunal',
  description: 'Portal oficial de la Junta de Acción Comunal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0a0403] text-white">
        <Header />
        <Nav />
        <main className="min-h-screen p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
