var myMap = L.map("map", {
    center: [53.8008, -1.5491],
    zoom: 6
});
  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var unis = [
    {location:[51.7548, -1.2544],
    name:"Oxford",
    rank: 1},
    {location:[52.2054, -0.1132],
    name:"Cambridge",
    rank: 2},
    {location:[56.3417, -2.7943],
    name:"St Andrews",
    rank: 3},
    {location:[51.5144, -0.1165],
    name:"London School of Economics",
    rank: 4},
    {location:[54.765, -1.5782],
    name:"Durham",
    rank: 5},
    {location:[52.3793, -1.5615],
    name:"Warwick",
    rank: 6},
    {location:[51.4988, -0.1749],
    name:"Imperial College",
    rank: 7},
    {location:[51.3782, -2.3264],
    name:"Bath",
    rank: 8},
    {location:[51.5246, -0.134],
    name:"UCL",
    rank: 9},
    {location:[52.765, -1.2321],
    name:"Loughborough",
    rank: 10}
];

for (var i = 0; i < unis.length; i++) {
var uni = unis[i];
L.marker(uni.location)
    .bindPopup(`<h6>${uni.name}</h6><h8>Rank: ${uni.rank}</h8>`)
    .addTo(myMap);
}




