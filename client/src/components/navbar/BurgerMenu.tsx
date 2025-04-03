import { NavLink } from "react-router-dom";
import "./burgerMenu.css";
import { useState } from "react";
import Login from "../login/Login";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  //Login
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const closeModalLogin = () => {
    setIsModalLoginOpen(false);
    document.body.style.overflow = "";
  };
  const openModalLogin = () => {
    setIsModalLoginOpen(!isModalLoginOpen);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/plants" className="nav-link" onClick={handleLinkClick}>
            Catalogue
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-garden"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Mon jardin
          </NavLink>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              openModalLogin();
            }}
          >
            Se connecter
          </button>
          <Login isOpen={isModalLoginOpen} onClose={closeModalLogin} />
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
