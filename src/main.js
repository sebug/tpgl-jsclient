const key = new URLSearchParams(location.search).get('key');
console.log('key is ' + key);

const shortTimeout = 2 * 1000;

// calls a promise callback with a timeout mechanism
// inspired by https://davidwalsh.name/fetch-timeout
function wrapTimeout(milliseconds,callback) {
    return () => {
	let didTimeOut = false;
	return new Promise((resolve, reject) => {
	    const to = setTimeout(function() {
		didTimeOut = true;
		reject(new Error('Request timed out'));
	    }, milliseconds);

	    callback().then(response => {
		clearTimeout(to);
		if (!didTimeOut) {
		    resolve(response);
		}
	    }).catch(err => {
		if (didTimeOut) {
		    return;
		}
		reject(err);
	    });
	});
    };
}

// Wraps a callback in a retry loop
function wrapRetry(numberOfTries, callback) {
    function doTry(triesLeft) {
	console.log('trying...');
	if (triesLeft <= 1) {
	    return callback();
	}
	return callback().catch(err => {
	    console.log('failed, trying again');
	    return doTry(triesLeft - 1);
	});
    }
    return () => {
	return doTry(numberOfTries);
    };
}

function firstPolicy(callback) {
    return wrapRetry(3, wrapTimeout(shortTimeout, callback));
}

function getStops() {
    return fetch('https://tpgl-proxy.azurewebsites.net/api/GetStops?key=' + key, {
	mode: 'cors'
    }).then(response => response.json());
}

firstPolicy(getStops)().then(stopResult => {
    const stops = stopResult.stops;
    const stopNames = stops.map(s => s.stopName);
    const stopElements = stopNames.map(s => '<option value="' + s + '"></option>');
    const stopInnerHtml = stopElements.join(' ');
    const stopDataList = document.querySelector('#stops');
    stopDataList.innerHTML = stopInnerHtml;
}).catch(err => {
    console.log('timed out I guess');
    console.log(err);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
	console.log('Registration succeeded, scope is ' + reg.scope);
    }).catch(function (error) {
	console.log('Registration failed with ' + error);
    });
}
