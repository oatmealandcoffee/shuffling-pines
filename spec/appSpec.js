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

    xdescribe("Update Suite", function() {

        it('should update fname, lname, txdate, and loc', function () {

        });

        it('should update status from pick-up to arrived', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        it('should update status from drop off to arrived', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        it('should update status from arrived to pickup', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        it('should not update user id', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

    });

    describe("Delete Suite", function() {
        it('should soft-delete records', function () {

            var id = testrecord.id;
            FormController.retrieveRecord( id );

            // delete a record
            FormController.deleteRecord( id );

            // check the record
            expect( testrecord.deleted ).toBe( false );

        });

        xit('should be successful', function () {
            expect(true).toBe(true);
        });
    });

});
