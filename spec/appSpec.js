/* global angular */

describe("Shuffling Pines CRUD", function() {

    /* INIT ANGULAR */
    var FormController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject( function( $controller ) {
        FormController = $controller('FormController');
    } ));

    afterEach(function() {
        localStorage.clear();
    });


    describe("Create Suite", function() {
        it('should add a new person', function () {

            var newfname = 'Marla';
            var newlname = 'Singer';
            var newtxdate = new Date();
            var newloc = 'Boston';
            
        });
    });

    describe("Retrieve Suite", function() {
        it('should retrieve a person by key', function () {
            /*
            var person = JSON.parse(localStorage.getItem(id));
            expect( person.fname ).toBe( fname );
            */
        });

        it('should be true', function() {
            //expect( foo() ).toBe( true );
        });
    });

    describe("Update Suite", function() {
        it('should update a property', function () {
            /*
            var newName = 'Bodsworth';
            var target = JSON.parse(localStorage.getItem(id));
            target.fname = newName;
            localStorage.setItem(id, JSON.stringify(target));
            var update = JSON.parse(localStorage.getItem(id));
            expect( update.fname ).toBe( newName );
            */
        });
    });

    describe("Delete Suite", function() {
        it( 'should delete a person by key', function () {
            /*
            localStorage.removeItem(id);
            var result = localStorage.getItem(id);
            console.log(result);
            expect( result ).toBe( "[]" );
            */
        });
    });

});
