import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "../login/Login";
import BurgerMenu from "./BurgerMenu";
import "./navbar.css";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <NavLink to="/">
        <img src="/public/logo.png" alt="Logo de plantéo" />
      </NavLink>
      <button
        className="burger-icon"
        onClick={toggleMenu}
        tabIndex={0}
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>
      <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <ul className="linksNav">
        <li>
          <NavLink to="/" className="nav-link">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/plants" className="nav-link">
            Catalogue
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-garden" className="nav-link">
            Mon jardin
          </NavLink>
        </li>
        <li>
          <button type="button" className="button-desktop" onClick={openModal}>
            Se connecter
          </button>
        </li>
      </ul>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default NavBar;
