import React from "react";
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    if (errorInfo) {
      return (
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "#ff4735",
            }}
          >
            Something went wrong.
          </h1>
          <details
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]).isRequired,
};

export default ErrorBoundary;
