import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    WarningOutlined,
} from "@ant-design/icons";

import type { ToastType } from "./toast.types";

export const TOAST_ICONS: Record<
    ToastType,
    React.ReactNode
> = {
    success: <CheckCircleOutlined />,
    error: <CloseCircleOutlined />,
    warning: <WarningOutlined />,
    info: <InfoCircleOutlined />,
    loading: null,
};
