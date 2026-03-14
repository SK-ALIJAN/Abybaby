import * as React from "react";

interface CrossIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    width?: number;
    height?: number;
}

const CrossIcon = ({
    color = "#867D7D",
    width = 13,
    height = 13,
    ...props
}: CrossIconProps) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1 12L12 1M1 1L12 12"
            stroke={color}
            strokeLinecap="round"
        />
    </svg>
);

export default CrossIcon;