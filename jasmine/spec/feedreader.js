$(function() {
    //test suite validating if RSS Feeds works correctly
    describe('RSS Feeds', function() {
        //checking if allFeeds array exists and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //checking if every feed has URL
        it('should have URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed['url']).toBeDefined();
                expect(feed['url'].length).not.toBe(0);
            })
        });

        //checking if every feed has name
        it('should have name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed['name']).toBeDefined();
                expect(feed['name'].length).not.toBe(0);
            })
        })
    });

    //test suite validating if menu works correctly
    describe('The menu', function() {
        const body = $('body');

        //checking if menu is hidden by default
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        //checking if menu toggles class after click
        it('should change visibility', function() {
            const menu = $('.menu-icon-link');
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        })
    });

    //test suite validating initial entries
    describe('Initial Entries', function() {
        //adding asynchronous callback function
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });

        //testing if feeds actually exist
        it('should load feeds', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        })
    });

    //test suite checking if loading feeds works
    describe('New Feed Selection', function() {
        // Saving the initial state before loading new feeds
        let firstFeedContent;
        let secondFeedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeedContent = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    secondFeedContent = document.querySelector('.feed').innerHTML;
                    done();
                })
            })
        });

        //checking if state changed after calling loadFeed function
        it('should add new feed', function(done) {
            expect(firstFeedContent).not.toEqual(secondFeedContent);
            done();
        })
    })

}());
