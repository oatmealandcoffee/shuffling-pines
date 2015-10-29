/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

    beforeEach(function() {
        localStorage.clear();
    });

    afterEach(function() {
        localStorage.clear();
    });


    describe("Create Suite", function() {

        it('should init new people', function () {

            expect( FormController.registerCache.length ).toBeGreaterThan( 0 );

        });

        it('should add a new person', function () {
            console.log('should add a new person');
            var newfname = 'Marla';
            var newlname = 'Singer';
            var newtxdate = new Date();
            var newloc = 'Boston';

            FormController.fname = newfname;
            FormController.lname = newlname;
            FormController.txdate = newtxdate;
            FormController.loc = newloc;

            var oldRegisterLength = FormController.registerCache.length;

            //FormController.createRecord();

            expect( FormController.registerCache.length ).toBeGreaterThan( oldRegisterLength );
            console.log('should add a new person');
        });
    });

    xdescribe("Retrieve Suite", function() {

    });

    xdescribe("Update Suite", function() {

    });

    xdescribe("Delete Suite", function() {

    });

});
