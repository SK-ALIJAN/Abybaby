import * as React from "react";

interface DownArrowProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    color?: string;
}

const DownArrow = ({
    width = 11,
    height = 6,
    color = "#555555",
    ...props
}: DownArrowProps) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M10.7579 0.229438C10.6028 0.0825286 10.3925 0 10.1732 0C9.95392 0 9.74361 0.0825287 9.58853 0.229438L5.49501 4.10846L1.40148 0.229439C1.24551 0.0866927 1.03662 0.00770608 0.819788 0.00949186C0.602958 0.0112772 0.395543 0.0936918 0.242215 0.238985C0.0888867 0.384278 0.00191546 0.580825 0.0000319691 0.786294C-0.00185247 0.991762 0.0815015 1.18971 0.232142 1.33751L4.91034 5.77056C5.06542 5.91747 5.27572 6 5.49501 6C5.71429 6 5.9246 5.91747 6.07968 5.77056L10.7579 1.33751C10.9129 1.19055 11 0.991265 11 0.783472C11 0.575679 10.9129 0.376393 10.7579 0.229438Z"
            fill={color}
        />
    </svg>
);

export default DownArrow;