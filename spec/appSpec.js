/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

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

            /*
            // from the app
            vm.fname = 'Tyler';
            vm.lname = 'Durden';
            vm.txdate = new Date();
            vm.loc = 'Boston';
            vm.createRecord();
            */
            var oldRegisterLength = FormController.registerCache.length;

            FormController.fname = 'Marla';
            FormController.lname = 'Singer';
            FormController.txdate = new Date();
            FormController.loc = 'Detroit';
            FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );

        });
    });

    describe("Retrieve Suite", function() {
        xit('should retrieve a person by index', function () {
            expect( FormController.registerCache[0] ).not.toBeNull();
        });

        it('should retrieve a person by key', function () {

            FormController.fname = 'Marla';
            FormController.lname = 'Singer';
            FormController.txdate = new Date();
            FormController.loc = 'Detroit';
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

    });

    xdescribe("Delete Suite", function() {

    });

});
