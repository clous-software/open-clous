import { newSpecPage } from '@stencil/core/testing';
import { ApplicationForm } from '../application-form';

describe('application-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApplicationForm],
      html: `<application-form></application-form>`,
    });
    expect(page.root).toEqualHtml(`
      <application-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </application-form>
    `);
  });
});
