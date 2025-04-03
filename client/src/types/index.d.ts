interface SvgTypes {
  path: string;
  width: string;
  height: string;
}

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface Plant {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
  harvest_months: string[];
  seedling_months: string[];
}

interface MonthCardProps {
  month: string;
  plants: Plant[];
}

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlantCard {
  id: number;
  name: string;
  words: string;
  background: string;
  earth_type: string;
}

interface PlantCardProps {
  plant: PlantCard;
}

interface EarthType {
  id: number;
  type: string;
}
