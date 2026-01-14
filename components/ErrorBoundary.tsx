'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-void">
                    <div className="text-center max-w-md px-6">
                        <p className="text-cyan-400 font-mono text-xl mb-2">
                            ERROR: ASSET_LOAD_FAILED
                        </p>
                        <p className="text-carbon font-mono text-sm mb-6">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={this.handleRetry}
                            className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:shadow-cyan-glow transition-all duration-300"
                        >
                            RETRY
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
