const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
    makeMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        });
        // add openstreetmap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(this.map)
        // create and add geolocation marker
        const marker = L.marker(this.coordinates)
        marker
            .addTo(this.map)
            .bindPopup('<p1><b>You are here</b><br></p1>')
            .openPopup()
    },
    makeMarker(businesses) {
        for (i = 0; i < businesses.length; i++) {
            const marker = L.marker([businesses[i].geocodes.main.latitude, businesses[i].geocodes.main.longitude])
            marker
                .addTo(this.map)
                .bindPopup('<p1><b>You are here</b><br></p1>')
                .openPopup()
        }

    }

}



// async function getCoords() {
//     const successfulLookup = position => {
//         console.log('coords position ??', position.coords)
//         const { latitude, longitude } = position.coords;
//         myMap.makeMap(latitude, longitude)
//         window.navigator.geolocation
//             .getCurrentPosition(successfulLookup, console.log);
//     }

//     return

// }
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    console.log('pos', pos)
    return [pos.coords.latitude, pos.coords.longitude]
}
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.makeMap()
}
async function getFoursquare(business) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
        }
    }
    let limit = 5
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
}
// async function startUsUp() {
//     let coords = await getCoords();
//     console.log('current locatino!!', coords)
//     lat = coords[0]
//     lon = coords[1]
//     // const myBusiness = await getFoursquare('coffee shop')

// }

// startUsUp()
let coffeeBtn = document.getElementById('coffeeBtn1').addEventListener('click', async function (e) {
    console.log('ive been clicked lol', e.target.name)
    const myBusinesses = await getFoursquare(e.target.name)
    console.log('did 5 coffee shops appear', myBusinesses)
    myMap.makeMarker(myBusinesses)
})
let pizzaBtn = document.getElementById('pizzaBtn2').addEventListener('click', async function (e) {
    console.log('ive been clicked lol', e.target.name)
    const myBusinesses = await getFoursquare(e.target.name)
    console.log('did 5 pizza places appear', myBusinesses)
    myMap.makeMarker(myBusinesses)
})
let gamesBtn = document.getElementById('gamesBtn3').addEventListener('click', async function (e) {
    console.log('ive been clicked lol', e.target.name)
    const myBusinesses = await getFoursquare(e.target.name)
    console.log('did 5 games appear', myBusinesses)
    myMap.makeMarker(myBusinesses)
})






// startUsUp()
// console.log(myMap.businesses)









