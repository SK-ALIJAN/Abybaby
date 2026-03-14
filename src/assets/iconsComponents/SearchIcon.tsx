import * as React from "react";

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

const SearchIcon = ({
  width = 24,
  height = 24,
  color = "#000000",
  ...props
}: SearchIconProps) => (
  <svg
    viewBox="0 0 64 64"
    width={width}
    height={height}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M27 9C17.075 9 9 17.075 9 27C9 36.925 17.075 45 27 45C31.129213 45 34.9263 43.587367 37.966797 41.240234L51.048828 54.322266C51.952828 55.226266 53.418266 55.226266 54.322266 54.322266C55.226266 53.418266 55.226266 51.952828 54.322266 51.048828L41.240234 37.966797C43.587367 34.9263 45 31.129213 45 27C45 17.075 36.925 9 27 9ZM27 13C34.719 13 41 19.281 41 27C41 34.719 34.719 41 27 41C19.281 41 13 34.719 13 27C13 19.281 19.281 13 27 13Z" />
  </svg>
);

export default SearchIcon;