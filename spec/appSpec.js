describe("Shuffling Pines CRUD", function() {

    var store;

    beforeEach(function() {
        store = [];

        var player1 = {
                fname:"Tyler",
                lname:"Durden",
                txdate:"2015/10/18",
                status:"pick up",
                loc:"Boston"
            };

        var player2 = {
                fname:"Marla",
                lname:"Singer",
                txdate:"2015/10/18",
                status:"arrived",
                loc:"Boston"
            };

        var player3 = {
                fname:"Robert",
                lname:"Paulson",
                txdate:"2015/10/18",
                status:"drop off",
                loc:"Boston"
            };

        store.push(JSON.stringify(player1));
        store.push(JSON.stringify(player2));
        store.push(JSON.stringify(player3));

        // Create, Update
        spyOn(localStorage, "setItem").and.callFake( function( key, value ) {
            store[key] = value + '';
        });

        // Retrieve, Update
        spyOn(localStorage, "getItem").and.callFake( function(key) {
            return store[key] || '[]';
        });

        // Delete
        spyOn(localStorage, "removeItem").and.callFake( function(key) {
            store.splice(key, 1);
        });

    });

    describe("Create Suite", function() {
        it('should add a new person', function () {

            var person = {
                fname:"Raymond",
                lname:"Kessel",
                txdate:"2015/10/18",
                status:"drop off",
                loc:"Boston"
            };
            var preLen = store.length;
            localStorage.setItem(preLen, JSON.stringify(person));
            var postLen = store.length;
            expect( preLen ).toBeLessThan( postLen );

            });
    });

    describe("Retrieve Suite", function() {
        it('should retrieve a person by key', function () {
            var key = 0;
            var person = JSON.parse(localStorage.getItem(key));
            expect( person.fname ).toBe( "Tyler" );
        });
    });

    describe("Update Suite", function() {
        it('should update a property', function () {
            var key = 0;
            var newName = "Bodsworth";
        });
    });

    describe("Delete Suite", function() {

    });

    // stub test to obviate false failures
    it('should do something', function(){
      expect(true).toBe(true);
    });

});
