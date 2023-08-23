import React from "react";

type Props = {
  weight?: "thin" | "normal" | "bold";
  margin?: string | number;
  color?: string;
  size?: string | number;
  children?: React.ReactNode;
  className?: string;
  padding?: string | number;
  lineheight?: string | number;
  style?: React.CSSProperties;
};

const Texts: React.FC<Props> = ({
  weight = "normal",
  margin = 0,
  color = "",
  size = 18,
  children,
  className = "",
  padding = 0,
  lineheight = 1.5,
  style = {},
}) => {
  const fontWeight = weight === "thin" ? 200 : weight === "bold" ? 600 : 400;

  const textStyle: React.CSSProperties = {
    fontSize: size,
    fontWeight,
    color,
    margin,
    padding,
    lineHeight: lineheight,
    ...style,
  };

  //function
  //function

  //fetch data
  //fetch data

  //control
  //control

  //render
  //render

  //render main
  return (
    <span className={className} style={textStyle}>
      {children}
    </span>
  );
};

export default Texts;
