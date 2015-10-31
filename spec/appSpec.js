/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    var RegisterFactory;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));
    beforeEach(angular.mock.inject( function( $injector ) {
        RegisterFactory = $injector.get('RegisterFactory');
    } ));

    /* INIT COMMON VALUES */

    var testguestname = 'Marla Singer';
    var testtxdate = new Date();
    var testloc = 'Detroit';
    var badValue = '¯\\_(ツ)_/¯';

    var testrecord;


    beforeEach(function() {
        // pull the last record from the cache to bang on
        var len = RegisterFactory.registerCache.length;
        var idx = len - 1;
        testrecord = RegisterFactory.registerCache[idx];
    });


    /*
        The tests use PhantomJS, so we'll play liberally with localStorage there
    */
    afterEach(function() {
        localStorage.clear();
    });


    describe("Create Suite", function() {

        it('should init new people', function () {

            //expect( FormController.registerCache.length ).toBeGreaterThan( 0 );

        });

        xit('should add a new person', function () {

            var oldRegisterLength = FormController.registerCache.length;

            FormController.guestname = testguestname;
            FormController.txdate = testtxdate;
            FormController.loc = testloc;
            FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );

        });
    });

    xdescribe("Retrieve Suite", function() {
        it('should be true', function() {
            expect(true).toBe(true);
        });
        xit('should retrieve a person by index', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        xit('should retrieve a person by id', function () {

            FormController.guestname = testguestname;
            FormController.txdate = testtxdate;
            FormController.loc = testloc;
            FormController.createRecord();

            // get the id of last record made
            var len = FormController.registerCache.length;
            var idx = len - 1;
            var record = FormController.registerCache[idx];
            var id = record.id;
            FormController.retrieveRecord( id );
            expect( FormController.guestname ).toBe( testguestname );
        });
    });

    xdescribe("Update Suite", function() {

        /*
            N.B. We're not testing dates here because the date values aren't
            granular enough to be of use here, and hard-coded delays smell bad
        */
        it('should update guestname, loc', function () {

            // put the record in the cache
            var id = testrecord.id;

            // update the values
            FormController.updateRecord( id , 'guestname', testguestname );
            FormController.updateRecord( id , 'loc', testloc );

            // get the record again once saved
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // test the update
            expect( testrecord.guestname ).toBe( testguestname );
            expect( testrecord.loc ).toBe( testloc );


        });

        it('should not update id or deleted', function () {
            // put the record in the cache
            var id = testrecord.id;

            // update the values
            FormController.updateRecord( id , 'id', badValue );
            FormController.updateRecord( id , 'deleted', badValue );

            // get the record again once saved
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // test the update
            expect( testrecord.id ).not.toBe( badValue );
            expect( testrecord.deleted ).not.toBe( badValue );

        });

        it('should update status according to status map', function () {
            // put the record in the cache
            var id = testrecord.id;
            var currentStatus = testrecord.status;
            var nextStatus = FormController.statusMap[currentStatus];

            // update the values
            FormController.updateRecord( id , 'status', nextStatus );

            // get the record again once saved
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // test the update
            expect( testrecord.status ).toBe( nextStatus );
        });

        it('should not update status to anything not aligned with the status map', function () {
            // put the record in the cache
            var id = testrecord.id;

            // update the values
            FormController.updateRecord( id , 'status', badValue );

            // get the record again once saved
            var len = FormController.registerCache.length;
            var idx = len - 1;
            testrecord = FormController.registerCache[idx];

            // test the update
            expect( testrecord.status ).not.toBe( badValue );
        });

    });

    xdescribe("Delete Suite", function() {
        it('should soft-delete records', function () {
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

    });

});
