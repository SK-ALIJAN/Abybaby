import { useGlobalError } from "../../../context/GlobalErrorContext";
import "./GlobalErrorView.css"


const GlobalErrorView = () => {
    const { error } = useGlobalError();

    if (!error) return null;

    return (
        <div className="global-error-overlay">
            <div className="global-error-box">
                {!error.status && <h2>No Internet Connection</h2>}

                {error.status === 500 && <h2>Internal Server Error</h2>}

                {error.status === 503 && <h2>Service Unavailable</h2>}

                {error.status && error.status >= 500 && (
                    <p>Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default GlobalErrorView;
