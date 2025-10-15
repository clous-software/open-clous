const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * This script packages the web component for distribution
 * 1. Creates a dist-package folder
 * 2. Copies the built files
 * 3. Creates a README.md with usage instructions
 * 4. Creates an example HTML file
 * 5. Creates a package.json for distribution
 */

// Configuration
const CONFIG = {
    packageName: '@cloush/application-form',
    version: '1.0.0',
    distFolder: path.join(__dirname, '../dist'),
    outputFolder: path.join(__dirname, '../dist-package'),
    cdnUrl: 'https://cdn.cloush.com/components/application-form'
};

// Ensure output directory exists
if (fs.existsSync(CONFIG.outputFolder)) {
    fs.rmSync(CONFIG.outputFolder, { recursive: true, force: true });
}

fs.mkdirSync(CONFIG.outputFolder, { recursive: true });
fs.mkdirSync(path.join(CONFIG.outputFolder, 'dist'), { recursive: true });

// Copy built files
console.log('Copying build files...');
fs.cpSync(CONFIG.distFolder, path.join(CONFIG.outputFolder, 'dist'), { recursive: true });

// Create example HTML file
console.log('Creating example HTML...');
const exampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloush Application Form Example</title>
  <script type="module" src="./dist/web/web.esm.js"></script>
  <script nomodule src="./dist/web/web.js"></script>
  <style>
    body { font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .container { border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; margin: 20px 0; }
    pre { background: #f6f8fa; padding: 16px; overflow-x: auto; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Cloush Application Form Example</h1>
  
  <div class="container">
    <h2>Basic Example</h2>
    <application-form 
      title="Apply for this position" 
      type="candidate" 
      job-id="job123">
    </application-form>
  </div>
  
  <div class="container">
    <h2>Usage Instructions</h2>
    <p>Add the following scripts to your HTML:</p>
    <pre>&lt;script type="module" src="${CONFIG.cdnUrl}/latest/web.esm.js"&gt;&lt;/script&gt;
&lt;script nomodule src="${CONFIG.cdnUrl}/latest/web.js"&gt;&lt;/script&gt;</pre>
    
    <p>Then use the component in your HTML:</p>
    <pre>&lt;application-form 
  title="Apply for this position" 
  type="candidate" 
  job-id="job123"&gt;
&lt;/application-form&gt;</pre>
  </div>

  <script>
    window.handleSuccess = function() {
      alert('Application submitted successfully!');
    };
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(CONFIG.outputFolder, 'example.html'), exampleHtml);

// Create README.md
console.log('Creating README.md...');
const readme = `# Cloush Application Form Web Component

This package provides a web component for embedding the Cloush application form into any website.

## Installation

### CDN (Recommended)

Add the following scripts to your HTML:

\`\`\`html
<script type="module" src="${CONFIG.cdnUrl}/latest/web.esm.js"></script>
<script nomodule src="${CONFIG.cdnUrl}/latest/web.js"></script>
\`\`\`

### NPM

\`\`\`bash
npm install ${CONFIG.packageName}
\`\`\`

Then import the component in your JavaScript:

\`\`\`javascript
import { defineCustomElements } from '${CONFIG.packageName}/dist/loader';
defineCustomElements();
\`\`\`

## Usage

Once installed, you can use the web component in your HTML:

\`\`\`html
<application-form 
  title="Apply for this position" 
  type="candidate" 
  job-id="job123">
</application-form>
\`\`\`

### Advanced Usage

You can configure the component with various attributes:

\`\`\`html
<application-form 
  title="Join Our Team" 
  type="employee" 
  company-data='{"id": "company456", "name": "Acme Corporation"}' 
  custom-fields='["location", "salary_expectations"]' 
  exclude-fields='["portfolio_url"]'>
</application-form>
\`\`\`

### Using Callbacks

You can provide callback functions for various events:

\`\`\`html
<script>
  function handleApplicationSuccess() {
    console.log('Application submitted successfully!');
  }
  
  function handleReferFriend() {
    console.log('Referring a friend...');
  }
</script>

<application-form 
  title="Apply Now" 
  type="candidate" 
  job-id="job789" 
  company-data='{"id": "company789", "name": "Tech Innovators"}' 
  on-success="handleApplicationSuccess" 
  on-refer-friend="handleReferFriend">
</application-form>
\`\`\`

## API Reference

### Properties

| Property | Type | Description |
|----------|------|-------------|
| title | string | The title displayed at the top of the form |
| type | string | The type of application (candidate or employee) |
| job-id | string | The ID of the job being applied for |
| company-data | string (JSON) | JSON string containing company information |
| custom-fields | string (JSON) | JSON array of custom fields to include |
| exclude-fields | string (JSON) | JSON array of fields to exclude |
| on-success | string | Function name to call when application is successful |
| on-refer-friend | string | Function name to call when refer friend is clicked |
| script-url | string | Optional URL to load custom scripts |
| style-url | string | Optional URL to load custom styles |

## License

MIT
`;

fs.writeFileSync(path.join(CONFIG.outputFolder, 'README.md'), readme);

// Create package.json for distribution
console.log('Creating package.json...');
const packageJson = {
    name: CONFIG.packageName,
    version: CONFIG.version,
    description: "Cloush Application Form web component for embedding into any website",
    main: "dist/index.cjs.js",
    module: "dist/index.js",
    es2015: "dist/esm/index.mjs",
    es2017: "dist/esm/index.mjs",
    types: "dist/types/index.d.ts",
    collection: "dist/collection/collection-manifest.json",
    "collection:main": "dist/collection/index.js",
    unpkg: "dist/web/web.esm.js",
    files: [
        "dist/",
        "loader/"
    ],
    repository: {
        type: "git",
        url: "https://github.com/cloush/application-form-web-component.git"
    },
    keywords: [
        "cloush",
        "application-form",
        "web-component",
        "stencil"
    ],
    license: "MIT",
    dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    }
};

fs.writeFileSync(
    path.join(CONFIG.outputFolder, 'package.json'),
    JSON.stringify(packageJson, null, 2)
);

// Create a loader directory and copy loader files
fs.mkdirSync(path.join(CONFIG.outputFolder, 'loader'), { recursive: true });
if (fs.existsSync(path.join(CONFIG.distFolder, 'loader'))) {
    fs.cpSync(
        path.join(CONFIG.distFolder, 'loader'),
        path.join(CONFIG.outputFolder, 'loader'),
        { recursive: true }
    );
}

// Create a .npmignore file
fs.writeFileSync(
    path.join(CONFIG.outputFolder, '.npmignore'),
    'example.html\n'
);

console.log(`Distribution package created at: ${CONFIG.outputFolder}`);
console.log('To publish:');
console.log(`  1. cd ${path.relative(process.cwd(), CONFIG.outputFolder)}`);
console.log('  2. npm publish'); 