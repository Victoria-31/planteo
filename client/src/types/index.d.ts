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
