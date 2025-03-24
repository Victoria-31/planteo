import { NavLink } from "react-router-dom";
import "./burgerMenu.css";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
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
          <button type="button" className="nav-link" onClick={handleLinkClick}>
            Connexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
