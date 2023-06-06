import { Point, shapes } from "@/constants";
import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface ShapeContextValue {
  shape: number;
  width: number;
  height: number;
  points: Point[];
  cssCode: string;
  setShape: Dispatch<SetStateAction<number>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setPoints: Dispatch<SetStateAction<Point[]>>;
  setCssCode: Dispatch<SetStateAction<string>>;
}

const ShapeContext = createContext<ShapeContextValue>({
  shape: 0,
  width: 0,
  height: 0,
  points: [{ x: 0, y: 0 }],
  cssCode: "clip-path: ;",
  setShape: () => {},
  setWidth: () => {},
  setHeight: () => {},
  setPoints: () => {},
  setCssCode: () => {},
});

export const useShapeContext = () => useContext(ShapeContext);
interface ShapeProviderProps {
  children: ReactNode;
}
const ShapeProvider: FC<ShapeProviderProps> = ({ children }) => {
  const [shape, setShape] = useState<number>(0);
  const [width, setWidth] = useState<number>(300);
  const [points, setPoints] = useState<Point[]>([{ x: 0, y: 0 }]);
  const [height, setHeight] = useState<number>(300);
  const [cssCode, setCssCode] = useState<string>(" ");

  const value: ShapeContextValue = {
    shape,
    width,
    height,
    points,
    cssCode,
    setShape,
    setWidth,
    setHeight,
    setPoints,
    setCssCode,
  };

  return (
    <ShapeContext.Provider value={value}>{children}</ShapeContext.Provider>
  );
};

export default ShapeProvider;
