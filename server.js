// Require Express.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2));
args["port"]
const port = args.port || 5555

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
        res.statusCode = 200;
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
return {'heads' : heads, 'tails' : tails}
}


function flipACoin(call) {
    var flip = coinFlip();
    var result = ""
    if (call == flip) {
        result = "win"
    }
    else {
        result = "lose"
        }
    return {"call": call, "flip": flip, "result": result};
}

// API calls

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({"flip" : flip})
  });
  
app.get('/app/flips/:number', (req, res) => {
    let flips = coinFlips(req.params.number)
    let final = countFlips(flips)
    res.status(200).json({ 'raw' : flips, 'summary' : final})
});
  
app.get('/app/flip/call/tails', (req, res) => {
    const resultFlip = flipACoin('tails')
    res.status(200).json({ 'call' : resultFlip.call, 'flip': resultFlip.flip, 'result': resultFlip.result})
});
  
app.get('/app/flip/call/heads', (req, res) => {
    const resultFlip = flipACoin('heads')
    res.status(200).json({ 'call' : resultFlip.call, 'flip': resultFlip.flip, 'result': resultFlip.result})
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});
  