/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

    /* INIT COMMON VALUES */

    var testfname = 'Marla';
    var testlname = 'Singer';
    var testtxdate = new Date();
    var testloc = 'Detroit';

    var testrecord;

    beforeEach(function() {
        // pull the last record from the cache to bang on
        var len = FormController.registerCache.length;
        var idx = len - 1;
        testrecord = FormController.registerCache[idx];
    });

    /*
        The tests use PhantomJS, so we'll play liberally with localStorage there
    */
    afterEach(function() {
        localStorage.clear();
    });


    xdescribe("Create Suite", function() {

        xit('should init new people', function () {

            expect( FormController.registerCache.length ).toBeGreaterThan( 0 );

        });

        xit('should add a new person', function () {

            var oldRegisterLength = FormController.registerCache.length;

            FormController.fname = testfname;
            FormController.lname = testlname;
            FormController.txdate = testtxdate;
            FormController.loc = testloc;
            FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );

        });
    });

    xdescribe("Retrieve Suite", function() {
        xit('should retrieve a person by index', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should retrieve a person by key', function () {

            FormController.fname = testfname;
            FormController.lname = testlname;
            FormController.txdate = testtxdate;
            FormController.loc = testloc;
            FormController.createRecord();

            // get the id of last record made
            var len = FormController.registerCache.length;
            var idx = len - 1;
            var record = FormController.registerCache[idx];
            var id = record.id;
            FormController.retrieveRecord( id );
            expect( FormController.fname ).toBe( 'Marla' );
        });
    });

    describe("Update Suite", function() {

        /*
            N.B. We're not testing dates here because the date values aren't
            granular enough to be of use here, and hard-coded delays smell bad
        */
        it('should update fname, lname, loc', function () {

            // put the record in the cache
            var id = testrecord.id;

            FormController.updateRecord( id , 'fname', testfname );
            FormController.updateRecord( id , 'lname', testlname );
            FormController.updateRecord( id , 'loc', testloc );

            // get the record again once saved
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // test the update
            expect( testrecord.fname ).toBe( testfname );
            expect( testrecord.lname ).toBe( testlname );
            expect( testrecord.loc ).toBe( testloc );


        });

        xit('should not update id or deleted', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should update status from pick-up to arrived', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should update status from drop off to arrived', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should update status from arrived to pickup', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should not update user id', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

    });

    describe("Delete Suite", function() {
        xit('should soft-delete records', function () {
            var id = testrecord.id;
            FormController.retrieveRecord( id );

            // delete a record
            FormController.deleteRecord( id );

            // replace test record with the updated record retrived from the module
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // check the record
            expect( testrecord.deleted ).toBe( true );

        });

        xit('should be successful', function () {
            expect(true).toBe(true);
        });
    });

});
