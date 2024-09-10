"use strict";

//=> Class definition
var SweetAlertDemo = function () {

    //=> Demos
    var initDemos = function () {
        // Sweetalert Demo 1
        $('#alert-demo-1').click(function() {
            swal('Good job!');
        });

        // Sweetalert Demo 2
        $('#alert-demo-2').click(function() {
            swal("Here's the title!", "...and here's the text!");
        });

        // Sweetalert Demo 3
        $('#alert-demo-3-1').click(function() {
            swal("Good job!", "You clicked the button!", "warning");
        });
        $('#alert-demo-3-2').click(function() {
            swal("Good job!", "You clicked the button!", "error");
        });
        $('#alert-demo-3-3').click(function() {
            swal("Good job!", "You clicked the button!", "success");
        });
        $('#alert-demo-3-4').click(function() {
            swal("Good job!", "You clicked the button!", "info");
        });

        // Sweetalert Demo 4
        $('#alert-demo-4').click(function() {
            swal("Good job!", "You clicked the button!", "success", {
                button: "Aww yiss!",
            });
        });

        // Sweetalert Demo 5
        $('#alert-demo-5').click(function() {
            swal("Click on either the button or outside the modal.")
                .then((value) => {
                    swal(`The returned value is: ${value}`);
                });
        });

        // Sweetalert Demo 6
        $('#alert-demo-6').click(function() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        });

        // Sweetalert Demo 7
        $('#alert-demo-7').click(function() {
            swal("A wild Pikachu appeared! What do you want to do?", {
                buttons: {
                    cancel: "Run away!",
                    catch: {
                        text: "Throw Pokéball!",
                        value: "catch",
                    },
                    defeat: true,
                },
            })
                .then((value) => {
                    switch (value) {

                        case "defeat":
                            swal("Pikachu fainted! You gained 500 XP!");
                            break;

                        case "catch":
                            swal("Gotcha!", "Pikachu was caught!", "success");
                            break;

                        default:
                            swal("Got away safely!");
                    }
                });
        });

        // Sweetalert Demo 8
        $('#alert-demo-8').click(function() {
            swal("Write something here:", {
                content: "input",
            })
                .then((value) => {
                    swal(`You typed: ${value}`);
                });
        });

        // Sweetalert Demo 9
        $('#alert-demo-9').click(function() {
            swal({
                text: 'Search for a movie. e.g. "La La Land".',
                content: "input",
                button: {
                    text: "Search!",
                    closeModal: false,
                },
            })
                .then(name => {
                    if (!name) throw null;

                    return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
                })
                .then(results => {
                    return results.json();
                })
                .then(json => {
                    const movie = json.results[0];

                    if (!movie) {
                        return swal("No movie was found!");
                    }

                    const name = movie.trackName;
                    const imageURL = movie.artworkUrl100;

                    swal({
                        title: "Top result:",
                        text: name,
                        icon: imageURL,
                    });
                })
                .catch(err => {
                    if (err) {
                        swal("Oh noes!", "The AJAX request failed!", "error");
                    } else {
                        swal.stopLoading();
                        swal.close();
                    }
                });
        });
    };

    return {
        //=> Init
        init: function() {
            initDemos();
        },
    };
}();

//=> Class Initialization
$(document).ready(function() {
    SweetAlertDemo.init();
});