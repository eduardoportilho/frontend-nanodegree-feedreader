/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* 
     * Check if the feeds variable is defined and valid.
     */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has non-empty URLs', function() {
            for(var i = 0; i < allFeeds.length ; i++) {
                expect(allFeeds[i]).toBeDefined();
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('has non-empty names', function() {
            for(var i = 0; i < allFeeds.length ; i++) {
                expect(allFeeds[i]).toBeDefined();
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /*
     * Check the hide/show menu functionality.
     */
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect(document.body.classList).toContain('menu-hidden');
        });

        it('is shown when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect(document.body.classList).not.toContain('menu-hidden');
        });  

        it('is hidden when the menu icon is clicked the second time', function() {
            $('.menu-icon-link').click();
            expect(document.body.classList).toContain('menu-hidden');
        });
    });

    /*
     * Check if there is at least one entry after an inital loadFeed call.
     */
    describe('Initial Entries', function() {
        /*
         * Call loadFeed and wait for it's completion before each test.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('shows at least one entry', function () {
            var entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /*
     * Check if the feed content change after two successive calls 
     * to loadFeed with different parameters.
     */
    describe('New Feed Selection', function() {
        var contentBefore, contentAfter;

        /*
         * Before each test:
         * - Call loadFeed for feed 0 and store the content on return.
         * - Call loadFeed for feed 1 and store the content on return.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                contentBefore = $('.feed').html();
                loadFeed(1, function () {
                    contentAfter = $('.feed').html();
                    done();
                });
            });
        });

        it('changes the content when feed is loaded', function () {
            expect(contentBefore).not.toEqual(contentAfter);
        });
    });
}());
