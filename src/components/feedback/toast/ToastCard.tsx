import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TOAST_STYLES } from "./ toast.config";
import { TOAST_ICONS } from "./toast.icons";
import type { ShowToastOptions } from "./toast.types";

interface Props {
    toastRef: any;
    options: ShowToastOptions;
}

const ToastCard: React.FC<Props> = ({ toastRef, options }) => {
    const {
        type,
        text1,
        text2,
        duration = 4000,
        icon,
        image,
        lottie,
        pauseOnHover = true,
        props,
    } = options;

    const design = TOAST_STYLES[type];
    const defaultIcon = TOAST_ICONS[type];

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!pauseOnHover) return;

        if (!isHovered) {
            const timer = setTimeout(() => {
                toast.dismiss(toastRef.id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isHovered, duration, pauseOnHover, toastRef.id]);

    const renderVisual = () => {
        if (lottie) return lottie;

        if (image)
            return (
                <img
                    src={image}
                    alt="toast"
                    style={{ width: 40, height: 40 }}
                />
            );

        if (icon) return icon;

        return defaultIcon;
    };

    return (
        <div
            className="toast-card"
            style={{
                background: props?.bgColor || design.bg,
                color: design.text,
                borderLeft: `5px solid ${design.border}`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="toast-body">
                <div className="toast-icon">
                    {renderVisual()}
                </div>

                <div className="toast-text">
                    <strong>{text1}</strong>
                    {text2 && <div>{text2}</div>}
                </div>

                {props?.showButton && (
                    <button
                        onClick={props.onButtonPress}
                        className="toast-action"
                    >
                        {props.buttonLabel}
                    </button>
                )}

                <button
                    className="toast-close"
                    onClick={() => toast.dismiss(toastRef.id)}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ToastCard;
