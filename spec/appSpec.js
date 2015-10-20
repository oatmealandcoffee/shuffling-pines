describe("Shuffling Pines CRUD", function() {

    var fname = 'Tyler';
    var lname = 'Durden';
    var id = lname+fname;
    var store;

    beforeEach(function() {
        store = {};


        var txdate = '2015/10/18';
        var status = 'pick up';
        var loc = 'Boston';

        var person = {
                fname:fname,
                lname:lname,
                txdate:txdate,
                status:status,
                loc:loc,
                id:id
            };

        store[id] = JSON.stringify(person);

        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function( key, value ) {
            store[key] = value;
        });

        // Retrieve, Update
        spyOn(localStorage, "getItem").and.callFake( function(key) {
            return store[key] || '[]';
        });

        // Delete
        spyOn(localStorage, "removeItem").and.callFake( function(key) {
            delete store[key];
        });

    });

    describe("Create Suite", function() {
        it('should add a new person', function () {

            var fnewname = 'Marla';
            var lnewname = 'Singer';
            var txdate = '2015/10/19';
            var status = 'pick up';
            var loc = 'Boston';
            var key = lnewname+fnewname;

            var person = {
                    fname:fnewname,
                    lname:lnewname,
                    txdate:txdate,
                    status:status,
                    loc:loc,
                    id:key
                };
            localStorage.setItem(key, JSON.stringify(person));

            var result = localStorage.getItem(key);
            expect( result ).not.toBeNull();

            });
    });

    describe("Retrieve Suite", function() {
        it('should retrieve a person by key', function () {

            var person = JSON.parse(localStorage.getItem(id));
            expect( person.fname ).toBe( fname );
        });
    });

    describe("Update Suite", function() {
        it('should update a property', function () {

            var newName = 'Bodsworth';
            var target = JSON.parse(localStorage.getItem(id));
            var oldName = target.fname;
            target.fname = newName;
            localStorage.setItem(id, JSON.stringify(target));
            var update = JSON.parse(localStorage.getItem(id));
            expect( update.fname ).toBe( newName );
        });
    });

    describe("Delete Suite", function() {
        it( 'should delete a person by key', function () {
        localStorage.removeItem(id);
        var result = localStorage.getItem(id);
        console.log(result);
        expect( result ).toBe( "[]" );
        });
    });

});
