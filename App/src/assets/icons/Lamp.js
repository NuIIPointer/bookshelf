import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={props.fill}
      d="m20.43 11.78-2.2-8.08c-.25-.93-1.26-1.7-2.22-1.7H7.99c-.96 0-1.97.77-2.22 1.7l-2.2 8.08c-.44 1.6.56 2.91 2.22 2.91h5.46v5.81H8c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-3.25v-5.81h5.46c1.66 0 2.66-1.31 2.22-2.91Z"
    />
  </Svg>
)
export default SvgComponent
