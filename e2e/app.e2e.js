describe('App main workflow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render bottom tabs', async () => {
    await expect(element(by.id('HomeBottomTab'))).toBeVisible();
    await expect(element(by.id('SearchBottomTab'))).toBeVisible();
    await expect(element(by.id('FavBottomTab'))).toBeVisible();
  });

  it('should go to movie details when click on card', async () => {
    // click on first card
    await element(by.id('MovieCardItem')).atIndex(0).tap();

    // check if in movie details page
    await expect(element(by.id('MovieDetailsBackButton'))).toBeVisible();

    // click back to return to home
    await element(by.id('MovieDetailsBackButton')).tap();

    // check if back in home
    await expect(element(by.id('MovieCardItem')).atIndex(0)).toBeVisible();
  });

  it('should add/remove to/from favourites', async () => {
    // add to fav
    await element(by.id('favButton')).atIndex(0).tap();

    // go to fav screen
    await element(by.id('FavBottomTab')).tap();

    // check movie exists
    await expect(element(by.id('MovieCardItem'))).toBeVisible();

    // unfav movie
    await element(by.id('favButton')).tap();

    // check movie is removed
    await expect(element(by.id('MovieCardItem'))).toBeNotVisible();
  });

  it('should keep stored favourites in local storage', async () => {
    // add to fav
    await element(by.id('favButton')).atIndex(1).tap();

    // reload
    await device.reloadReactNative();

    // go to fav screen
    await element(by.id('FavBottomTab')).tap();

    // check movie exists
    await expect(element(by.id('MovieCardItem'))).toBeVisible();
  });

  it('should search for a movie', async () => {
    // go to search screen
    await element(by.id('SearchBottomTab')).tap();

    // write text in search box
    await expect(element(by.id('MovieSearchInput'))).toBeVisible();
    await element(by.id('MovieSearchInput')).typeText('avatar');

    // check if movie exists
    await expect(element(by.text('Avatar 2'))).toBeVisible();
  });
});
