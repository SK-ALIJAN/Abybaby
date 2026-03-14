import * as React from "react";

interface DeleteIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  bgColor?: string;
  iconColor?: string;
}

const DeleteIcon = ({
  width = 37,
  height = 37,
  bgColor = "#F18F84",
  iconColor = "#EF5446",
  ...props
}: DeleteIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Background */}
    <rect
      width="37"
      height="37"
      rx="10"
      fill={bgColor}
      fillOpacity="0.2"
    />

    <g clipPath="url(#clip0)">
      <path
        d="M10.7916 13.1042H26.2083"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.6667 13.1042V25.2449C24.6667 26.1121 23.7858 26.9792 22.9048 26.9792H14.0953C13.2143 26.9792 12.3334 26.1121 12.3334 25.2449V13.1042"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4166 13.1041V11.5624C15.4166 10.7916 16.1875 10.0208 16.9583 10.0208H20.0416C20.8125 10.0208 21.5833 10.7916 21.5833 11.5624V13.1041"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9584 16.9583V23.1249"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0416 16.9583V23.1249"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    <defs>
      <clipPath id="clip0">
        <rect width="18.5" height="18.5" transform="translate(9.25 9.25)" />
      </clipPath>
    </defs>
  </svg>
);

export default DeleteIcon;