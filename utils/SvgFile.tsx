import React from "react";
import _ from "lodash";

interface Props {
  name?: string;
  width?: number;
  height?: number;
  // Add other optional props here
  fill?: string;
}

type SVGComponent = React.FC<Props>;

const SVGSource: Record<string, SVGComponent> = {
  // ... icons as before ...
  Coding: require("/static/icons/portfolio.svg").default,
  Portfoilo: require("/static/icons/portfolio.svg").default,
};

const SvgFile: React.FC<Props> = (props) => {
  const { name } = props;

  const svgMatch = (Svg: SVGComponent) => {
    // console.log(Svg);
    // console.log(props);
    if (!!Svg) {
      try {
        return (
          <div>
            <Svg {...props} />
          </div>
        );
      } catch {
        return (
          <div
            style={{ width: props.width || 100, height: props.height || 100 }}
          />
        );
      }
    }
    return (
      <div style={{ width: props.width || 100, height: props.height || 100 }} />
    );
  };

  //   if (!_.isEmpty(name)) {
  //     const isMemo: any = name?.split("memo@");
  //     if (!_.isEmpty(isMemo[0])) {
  //       return svgMatch(SVGSource[`Memo${_.upperFirst(isMemo[1])}`]);
  //     }
  //   }
  return svgMatch(SVGSource[_.upperFirst(_.camelCase(name || ""))]);
};

SvgFile.defaultProps = {
  width: 100,
  height: 100,
  name: undefined,
  fill: undefined,
};

export default SvgFile;
