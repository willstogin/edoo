
//workercode = "worker.js";

function makeWorkerExecuteSomeCode( code, callback ) {
    var timeout;

    code = code + "";
    var worker = new Worker( workercode );

    worker.addEventListener( "message", function(event) {
        clearTimeout(timeout);
        callback( event.data );
    });

    worker.postMessage({
        code: code
    });

    timeout = window.setTimeout( function() {
        callback( "Maximum execution time exceeded" );
        worker.terminate();
    }, 1000 );
}

makeWorkerExecuteSomeCode( '5 + 5', function(answer){
    console.log( answer );
});

makeWorkerExecuteSomeCode( 'while(true);', function(answer){
    console.log( answer );
});

var kertoma = 'function kertoma(n){return n === 1 ? 1 : n * kertoma(n-1)}; kertoma(15);';

makeWorkerExecuteSomeCode( kertoma, function(answer){
    console.log( answer );
});