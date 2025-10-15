import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'web',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'assets' }
      ]
    },
  ],
  testing: {
    browserHeadless: true,
  },
  buildEs5: true,
  extras: {
    enableImportInjection: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  }
};
