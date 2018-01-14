import { ShhoolWebPage } from './app.po';

describe('shhool-web App', () => {
  let page: ShhoolWebPage;

  beforeEach(() => {
    page = new ShhoolWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
