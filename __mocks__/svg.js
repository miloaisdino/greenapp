import React from "react";

// This mock will be used when importing SVGs in tests

// Default export - a valid React component for SVG
const SvgrMock = React.forwardRef((props, ref) => <div ref={ref} {...props} />);

export default SvgrMock;

// Named export - often used with SVGR's ReactComponent import
export const ReactComponent = SvgrMock;
