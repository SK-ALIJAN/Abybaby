let setErrorRef: ((error: any) => void) | null = null;

export const registerGlobalErrorSetter = (
    setter: (error: any) => void
) => {
    setErrorRef = setter;
};

export const globalErrorService = {
    show: (error: any) => {
        if (setErrorRef) {
            setErrorRef(error);
        }
    },
    clear: () => {
        if (setErrorRef) {
            setErrorRef(null);
        }
    },
};
