import { newE2EPage } from '@stencil/core/testing';

describe('application-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<application-form></application-form>');

    const element = await page.find('application-form');
    expect(element).toHaveClass('hydrated');
  });
});
