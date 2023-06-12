import * as React from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ReslizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ReslizableProps> = ({ direction, children }) => {
  const [width, setWidth] = React.useState(window.innerWidth * 0.75);
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

  let resizableProps: ResizableBoxProps =
    direction === "horizontal"
      ? {
          className: "resize-horizontal",
          minConstraints: [innerWidth * 0.2, Infinity],
          maxConstraints: [innerWidth * 0.75, Infinity],
          height: Infinity,
          width,
          resizeHandles: ["e"],
          onResizeStop: (_, data) => {
            setWidth(data.size.width);
            // console.log(data);
          },
        }
      : {
          minConstraints: [Infinity, 48],
          maxConstraints: [Infinity, innerHeight * 0.75],
          height: 300,
          width: Infinity,
          resizeHandles: ["s"],
        };

  React.useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
        console.log(window.innerWidth, window.innerHeight);
      }, 200);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
