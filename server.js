// Require Express.js
import express from 'express';
const app = express()

var port = 5000;

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ '' +res.statusMessage)
    });


// coin functions

function coinFlip() {
    var ran = Math.random();
    if (ran < 0.5) {
        return "heads";
    }
    else {
        return "tails";
    }
}

function coinFlips(flips) {
    if (flips < 0 || flips == '' || flips == null) {
        console.log('Error: no input');
    } else {
        var list = [];
        for(var i = 0; i < flips; i++) {
        list.push(coinFlip());
        }
        return list;
        }
}

function countFlips(array) {
    var heads = 0;
    var tails = 0;
    for(var i = 0; array.length > i; i++) {
        if (array[i] == "heads") {
            heads++;
        }
    else {
            tails++
        }
}
const finalFlips = new Object();
finalFlips.tails = tails;
finalFlips.heads = heads;
return finalFlips;
}


function flipACoin(call) {
    var flip = coinFlip();
    if (call == flip) {
        return "win";
    }
    else {
        return "lose";
        }
}

// API calls

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({"flip" : flip})
  });
  
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});
  
app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200
    res.json(flipACoin(req.params.call))
});
  
app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200
    res.json(flipACoin(req.params.call))
});
  