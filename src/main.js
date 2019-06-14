const key = new URLSearchParams(location.search).get('key');
console.log('key is ' + key);

function getStops() {
    return fetch('https://tpgl-proxy.azurewebsites.net/api/GetStops?key=' + key, {
	mode: 'cors'
    }).then(response => response.json());
}

getStops().then(stops => {
    console.log(stops);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
	console.log('Registration succeeded, scope is ' + reg.scope);
    }).catch(function (error) {
	console.log('Registration failed with ' + error);
    });
}
