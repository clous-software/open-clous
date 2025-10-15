# Integration Guide: Connecting React ApplicationForm with Web Component

This guide explains how to integrate your existing React `ApplicationForm` component with the Stencil web component wrapper for embedding on third-party websites.

## Integration Options

There are two main approaches to integrate the actual React ApplicationForm:

1. **Build-time Integration**: Import the React component directly into the Stencil wrapper during build
2. **Runtime Integration**: Load the React component as an external resource from a CDN

## Build-time Integration (Recommended for Development)

1. Create a symlink or copy your React component into the `src/react-components` directory:

```bash
# Option 1: Symlink (recommended for active development)
ln -s /path/to/components/experience/applicationForm.tsx src/react-components/ApplicationForm.tsx

# Option 2: Copy (stable snapshot)
cp /path/to/components/experience/applicationForm.tsx src/react-components/ApplicationForm.tsx
```

2. Edit `src/react-components/ApplicationForm.tsx` to make any necessary adjustments for compatibility.

3. Update the import in `src/components/application-form/application-form.tsx` to point to your component:

```typescript
// Replace this:
const module = await import('../../react-components/ApplicationForm');

// With a direct import:
import ApplicationFormComponent from '../../react-components/ApplicationForm';
this.ApplicationFormComponent = ApplicationFormComponent;
```

## Runtime Integration (Recommended for Production)

1. Build your React ApplicationForm as a standalone module using a bundler like Webpack or Rollup:

```bash
# Example webpack configuration
webpack --config webpack.applicationform.config.js
```

2. Configure the bundler to expose the ApplicationForm component as a global variable:

```javascript
// Example webpack configuration
module.exports = {
  // ...
  output: {
    filename: 'cloush-application-form.js',
    library: 'CloudApplicationForm',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  }
  // ...
};
```

3. Host the bundled JavaScript file on your CDN:

```
https://cdn.cloush.com/components/react/application-form.js
```

4. Your Stencil web component is already configured to check for the global `CloudApplicationForm` variable before falling back to the local implementation.

## Continuous Integration and Deployment

To ensure your web component stays synchronized with your React component, set up a CI/CD pipeline:

1. **Build Process**:
   - Build your React component
   - Bundle it for standalone use
   - Build the Stencil web component
   - Package all assets for distribution

2. **Versioning**:
   - Use semantic versioning for both components
   - Allow users to specify specific versions or use "latest"

3. **Deployment**:
   - Deploy to NPM for package usage
   - Deploy to CDN for script tag usage
   - Update documentation with any API changes

## Example CI/CD Script

Here's a simplified example of a CI/CD script:

```bash
#!/bin/bash

# 1. Build React Component
cd /path/to/react/project
npm run build

# 2. Bundle React Component for standalone use
npm run bundle:application-form

# 3. Copy bundled file to CDN directory
cp dist/application-form.js /path/to/cdn/components/react/

# 4. Build Stencil Web Component
cd /path/to/web-components/web
npm run build

# 5. Package for distribution
npm run package

# 6. Publish to NPM
cd dist-package
npm publish

# 7. Deploy to CDN
cp -r dist/* /path/to/cdn/components/application-form/${VERSION}/
# Also update the "latest" version
cp -r dist/* /path/to/cdn/components/application-form/latest/
```

## Managing Dependencies

The web component has its own dependencies on React and ReactDOM. To avoid conflicts:

1. **Use Same Versions**: Ensure the web component uses the same React version as your main application

2. **External Dependencies**: Consider loading React from a CDN instead of bundling it:

```html
<script src="https://cdn.cloush.com/libs/react/18/react.production.min.js"></script>
<script src="https://cdn.cloush.com/libs/react-dom/18/react-dom.production.min.js"></script>
<script src="https://cdn.cloush.com/components/application-form/latest/web.esm.js"></script>
```

3. **Version Compatibility**: Document which React versions are compatible with your web component

## Handling Assets and Styles

1. **CSS**: Make sure all required styles are included in the component or loaded via the `style-url` property

2. **Images and Assets**: Host static assets on your CDN and reference them with absolute URLs

3. **Fonts**: Include any required fonts via the `style-url` property or document that they need to be loaded separately

## Testing the Integration

1. Create an HTML file that includes both your React application and the web component:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/build/web.esm.js"></script>
  <script nomodule src="/build/web.js"></script>
</head>
<body>
  <h2>Web Component Example:</h2>
  <application-form
    title="Apply for this position"
    type="candidate"
    job-id="job123">
  </application-form>
  
  <h2>Original React Component:</h2>
  <div id="react-container"></div>
  
  <script>
    // Load and render the original React component
    const container = document.getElementById('react-container');
    ReactDOM.render(
      React.createElement(ApplicationForm, {
        title: "Apply for this position",
        type: "candidate",
        jobId: "job123"
      }),
      container
    );
  </script>
</body>
</html>
```

2. Verify both implementations render the same and function correctly

## Troubleshooting

- **Component Not Loading**: Check console for script loading errors
- **Styling Issues**: Verify all CSS is properly loaded
- **Callback Problems**: Ensure callback functions are defined in the global scope
- **Props Not Working**: Check for naming differences (camelCase in React vs. kebab-case in HTML) 