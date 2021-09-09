import React from 'react';

class Error extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if ( this.state.hasError ) {
            return (<div className="error-page">
                <p>Something went wrong, go back to <a href="/">home</a></p>
            </div>);
        }

        return this.props.children;
    }

}

export default Error;