const key = new URLSearchParams(location.search).get('key');
console.log('key is ' + key);

function getStops() {
    return fetch('https://tpgl-proxy.azurewebsites.net/api/GetStops?key=' + key, {
	mode: 'cors'
    }).then(response => response.json());
}

getStops().then(stopResult => {
    const stops = stopResult.stops;
    const stopNames = stops.map(s => s.stopName);
    const stopElements = stopNames.map(s => '<option value="' + s + '"></option>');
    const stopInnerHtml = stopElements.join(' ');
    const stopDatalist = document.querySelector('#stops');
    stopDataList.innerHTML = stopInnerHtml;
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
	console.log('Registration succeeded, scope is ' + reg.scope);
    }).catch(function (error) {
	console.log('Registration failed with ' + error);
    });
}
