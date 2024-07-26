'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaTachometerAlt, FaUser, FaClipboardList, FaBell, FaHeart, FaWallet, FaMoon, FaSun, FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(true); // Menu aberto no desktop
      } else {
        setIsMenuOpen(false); // Menu fechado no modo responsivo
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Chamada inicial

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`navbar ${isDarkMode ? 'dark' : ''} ${isMenuOpen ? 'open' : 'closed'}`}>
      <div className="navbar-brand">
        <img src="/vercel.svg" alt="Logo" />
        <button className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>
      <ul className={`navbar-nav flex-column w-100 ${isMenuOpen ? 'show' : ''}`}>
        <li className="nav-item">
          <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            <FaTachometerAlt className="icon" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/register-client" className={`nav-link ${pathname === '/register-client' ? 'active' : ''}`}>
            <FaUser className="icon" /> Registrar Cliente
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/register-seller" className={`nav-link ${pathname === '/register-seller' ? 'active' : ''}`}>
            <FaClipboardList className="icon" /> Registrar Vendedor
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/assign-clients" className={`nav-link ${pathname === '/assign-clients' ? 'active' : ''}`}>
            <FaClipboardList className="icon" /> Atribuir Clientes
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/notifications" className={`nav-link ${pathname === '/notifications' ? 'active' : ''}`}>
            <FaBell className="icon" /> Notificações
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/likes" className={`nav-link ${pathname === '/likes' ? 'active' : ''}`}>
            <FaHeart className="icon" /> Likes
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/wallets" className={`nav-link ${pathname === '/wallets' ? 'active' : ''}`}>
            <FaWallet className="icon" /> Wallets
          </Link>
        </li>
      </ul>
      <div className="dark-mode-toggle">
        <span>Dark Mode</span>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
