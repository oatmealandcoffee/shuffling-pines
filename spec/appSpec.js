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


    describe("Create Suite", function() {

        it('should init new people', function () {

            expect( FormController.registerCache.length ).toBeGreaterThan( 0 );

        });

        it('should add a new person', function () {

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
            FormController.loc = 'New York';
            FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );

        });
    });

    xdescribe("Retrieve Suite", function() {

    });

    xdescribe("Update Suite", function() {

    });

    xdescribe("Delete Suite", function() {

    });

});
