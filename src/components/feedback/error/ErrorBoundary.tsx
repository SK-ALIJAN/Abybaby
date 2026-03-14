import React, { Component } from "react";
import type { ReactNode } from "react";

interface Props {
    /**
     * The child components that need protection from
     * JavaScript runtime errors.
     */
    children: ReactNode;
}

interface State {
    /**
     * Indicates whether a runtime error has occurred.
     */
    hasError: boolean;

    /**
     * Stores the captured error object.
     */
    error: Error | null;
}

/**
 * --------------------------------------------------------
 * ErrorBoundary Component
 * --------------------------------------------------------
 *
 * Purpose:
 * This component acts as a safety wrapper to catch
 * JavaScript runtime errors occurring in its child
 * component tree during rendering, lifecycle methods,
 * or constructors.
 *
 * What it handles:
 * - UI rendering crashes
 * - Unexpected null/undefined access
 * - Component-level runtime exceptions
 *
 * What it does NOT handle:
 * - HTTP/API errors (handled by Axios interceptor)
 * - Async errors outside render lifecycle
 * - Event handler errors
 *
 * Why it is important:
 * Prevents the entire application from crashing
 * and showing a blank screen (white screen of death).
 *
 * Recommended usage:
 * Wrap layout-level routes or the entire app.
 *
 * --------------------------------------------------------
 */

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
    };

    /**
     * React lifecycle method invoked after an error
     * has been thrown by a descendant component.
     * It updates state to render fallback UI.
     */
    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }

    /**
     * Used for logging error details to monitoring
     * services like Sentry, LogRocket, etc.
     */
    componentDidCatch(error: Error, info: any) {
        console.error("Runtime Error Caught:", error, info);
    }

    /**
     * Resets the error state without refreshing the page.
     * Keeps the user on the same route.
     */
    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <div className="error-container">
                <h2>Something went wrong.</h2>
                <p>{this.state.error?.message}</p>
                <button onClick={this.handleReset}>
                    Try Again
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
