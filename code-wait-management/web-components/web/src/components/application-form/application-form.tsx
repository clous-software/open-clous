import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';

// In production, we'll import the real ApplicationForm
// Dynamic imports will help us avoid bundling React components directly
// We'll provide a mechanism to specify the CDN/URL for the React components

@Component({
  tag: 'application-form',
  styleUrl: 'application-form.css',
  shadow: false, // Set to false to avoid styling issues with React components
})
export class ApplicationForm {
  @Element() el: HTMLElement;

  // Define properties that match the ApplicationFormProps
  @Prop() title?: string;
  @Prop() type: string = 'candidate';
  @Prop() jobId?: string;
  @Prop() companyData?: string; // Will be parsed from JSON string
  @Prop() onSuccess?: string; // Function name to be called on success
  @Prop() customFields?: string; // JSON array of custom fields
  @Prop() excludeFields?: string; // JSON array of fields to exclude
  @Prop() onReferFriend?: string; // Function name to be called on refer friend
  @Prop() scriptUrl?: string; // URL to load the React components from
  @Prop() styleUrl?: string; // URL to load additional styles from

  @State() company: any;
  @State() parsedCustomFields: string[] = [];
  @State() parsedExcludeFields: string[] = [];
  @State() loading: boolean = true;
  @State() error: string | null = null;

  private reactDiv: HTMLDivElement;
  private root: Root | null = null;
  private hasRendered: boolean = false;
  private ApplicationFormComponent: any = null;

  @Watch('companyData')
  companyDataChanged(newValue: string) {
    if (newValue) {
      try {
        this.company = JSON.parse(newValue);
      } catch (e) {
        console.error('Invalid company data format:', e);
        this.error = 'Invalid company data format';
      }
    }
  }

  @Watch('customFields')
  customFieldsChanged(newValue: string) {
    if (newValue) {
      try {
        this.parsedCustomFields = JSON.parse(newValue);
      } catch (e) {
        console.error('Invalid customFields format:', e);
        this.error = 'Invalid customFields format';
      }
    }
  }

  @Watch('excludeFields')
  excludeFieldsChanged(newValue: string) {
    if (newValue) {
      try {
        this.parsedExcludeFields = JSON.parse(newValue);
      } catch (e) {
        console.error('Invalid excludeFields format:', e);
        this.error = 'Invalid excludeFields format';
      }
    }
  }

  componentWillLoad() {
    // Parse JSON strings
    this.companyDataChanged(this.companyData);
    this.customFieldsChanged(this.customFields);
    this.excludeFieldsChanged(this.excludeFields);

    // Load external script if provided
    if (this.scriptUrl) {
      this.loadExternalScript(this.scriptUrl);
    }

    // Load external style if provided
    if (this.styleUrl) {
      this.loadExternalStyle(this.styleUrl);
    }
  }

  private loadExternalScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        console.log(`Script loaded: ${url}`);
        resolve();
      };
      script.onerror = (e) => {
        console.error(`Failed to load script: ${url}`, e);
        this.error = `Failed to load script: ${url}`;
        reject(new Error(`Failed to load script: ${url}`));
      };
      document.head.appendChild(script);
    });
  }

  private loadExternalStyle(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        console.log(`Style loaded: ${url}`);
        resolve();
      };
      link.onerror = (e) => {
        console.error(`Failed to load style: ${url}`, e);
        this.error = `Failed to load style: ${url}`;
        reject(new Error(`Failed to load style: ${url}`));
      };
      document.head.appendChild(link);
    });
  }

  private getGlobalCallback(functionName: string): Function | undefined {
    if (!functionName) return undefined;

    // First try to find the function directly in window
    if (typeof window[functionName] === 'function') {
      return window[functionName];
    }

    // If not found, try to find it in nested objects (namespaces)
    const parts = functionName.split('.');
    let current: any = window;

    for (const part of parts) {
      if (current[part] === undefined) {
        console.warn(`Callback function ${functionName} not found in global scope`);
        return undefined;
      }
      current = current[part];
    }

    if (typeof current !== 'function') {
      console.warn(`${functionName} is not a function`);
      return undefined;
    }

    return current;
  }

  async componentDidLoad() {
    if (this.hasRendered) return;

    try {
      // Check if ApplicationForm exists in global scope (loaded via CDN)
      if (window['CloudApplicationForm']) {
        this.ApplicationFormComponent = window['CloudApplicationForm'];
      } else {
        // Dynamically import our local implementation
        const module = await import('../../react-components/ApplicationForm');
        this.ApplicationFormComponent = module.default;
      }

      this.loading = false;
      this.renderReactComponent();
    } catch (error) {
      console.error('Failed to load React component:', error);
      this.loading = false;
      this.error = 'Failed to load application form component';
      this.renderErrorState();
    }
  }

  private renderReactComponent() {
    if (!this.reactDiv || !this.ApplicationFormComponent) {
      this.renderErrorState();
      return;
    }

    // Create a React root
    this.root = createRoot(this.reactDiv);

    // Prepare callback props
    const onSuccessCallback = this.onSuccess ? this.getGlobalCallback(this.onSuccess) : undefined;
    const onReferFriendCallback = this.onReferFriend ? this.getGlobalCallback(this.onReferFriend) : undefined;

    // Render the React component
    this.root.render(
      React.createElement(this.ApplicationFormComponent, {
        title: this.title,
        type: this.type,
        jobId: this.jobId,
        company: this.company,
        customFields: this.parsedCustomFields,
        excludeFields: this.parsedExcludeFields,
        onSuccess: onSuccessCallback,
        onReferFriend: onReferFriendCallback
      })
    );

    this.hasRendered = true;
  }

  private renderErrorState() {
    if (this.reactDiv) {
      this.reactDiv.innerHTML = `
        <div style="padding: 20px; border: 1px solid #f44336; border-radius: 4px; color: #f44336;">
          <p><strong>Error:</strong> ${this.error || 'Failed to load the application form component.'}</p>
          <p>Please check your configuration or contact support.</p>
        </div>
      `;
    }
  }

  disconnectedCallback() {
    // Clean up React when the web component is removed
    if (this.root) {
      this.root.unmount();
    }
  }

  render() {
    if (this.loading) {
      return (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid #3498db',
              animation: 'spin 1s linear infinite',
              marginRight: '10px'
            }}></div>
            Loading application form...
          </div>
        </div>
      );
    }

    return (
      <div>
        <div ref={(el) => this.reactDiv = el as HTMLDivElement}></div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
}
