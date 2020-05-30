import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.log("Wystąpił następujący błąd:", error, info);
    }
    render() {
        const { message, children } = this.props;
        return this.state.hasError ? message : children;
    }
}
ErrorBoundary.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired

}
export default ErrorBoundary;