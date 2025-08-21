// Initialize map centered on Bangladesh
var map = L.map('map').setView([23.6850, 90.3563], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

map.attributionControl.setPrefix(false);

// Dhaka regions data
const dhakaRegions = [
    { name: "Mirpur", coords: [23.8223, 90.3654], popupId: "mirpur-popup" },
    { name: "Gulshan", coords: [23.7925, 90.4078], popupId: "gulshan-popup" },
    { name: "Motijheel", coords: [23.7336, 90.4141], popupId: "motijheel-popup" },
    { name: "Uttara", coords: [23.8759, 90.3795], popupId: "uttara-popup" },
    { name: "Dhanmondi", coords: [23.7461, 90.3733], popupId: "dhanmondi-popup" },
    { name: "Banani", coords: [23.7948, 90.4045], popupId: "banani-popup" },
    { name: "Mohammadpur", coords: [23.7487, 90.3578], popupId: "mohammadpur-popup" },
    { name: "Kamalapur", coords: [23.7272, 90.4190], popupId: "kamalapur-popup" },
    { name: "Shantinagar", coords: [23.7300, 90.4140], popupId: "shantinagar-popup" },
    { name: "Tejgaon", coords: [23.7805, 90.4000], popupId: "tejgaon-popup" },
    { name: "Mohakhali", coords: [23.7900, 90.4070], popupId: "mohakhali-popup" },
    { name: "Paltan", coords: [23.7260, 90.4020], popupId: "paltan-popup" },
    { name: "Sadarghat", coords: [23.7100, 90.4100], popupId: "sadarghat-popup" },
    { name: "Lalbagh", coords: [23.7189, 90.3981], popupId: "lalbagh-popup" },
    { name: "Kotwali", coords: [23.7170, 90.4125], popupId: "kotwali-popup" },
    { name: "Shahbagh", coords: [23.7390, 90.3910], popupId: "shahbagh-popup" },
    { name: "New Market", coords: [23.7470, 90.3825], popupId: "newmarket-popup" }
];


// Dhaka Division marker
var dhakaMarker = L.marker([23.8103, 90.4125]).addTo(map)
    .bindPopup("Dhaka, Bangladesh").openPopup();

// On click, zoom into Dhaka and show region markers
dhakaMarker.on("click", function () {
    
    map.flyTo([23.8103, 90.4125], 12, { duration: 0.6 });
    dhakaMarker.closePopup();

    dhakaRegions.forEach(region => {
        L.marker(region.coords).addTo(map)
            .bindPopup(document.getElementById(region.popupId).innerHTML);
    });
});

// Other divisions
L.marker([24.3745, 88.6042]).addTo(map).bindPopup("Rajshahi, Bangladesh");
L.marker([22.3569, 91.7832]).addTo(map).bindPopup('Chattogram, Bangladesh');
L.marker([22.8456, 89.5403]).addTo(map).bindPopup('Khulna, Bangladesh');
L.marker([22.7010, 90.3535]).addTo(map).bindPopup('Barishal, Bangladesh');
L.marker([24.8949, 91.8687]).addTo(map).bindPopup('Sylhet, Bangladesh');
L.marker([25.7439, 89.2752]).addTo(map).bindPopup('Rangpur, Bangladesh');
L.marker([24.7471, 90.4203]).addTo(map).bindPopup('Mymensingh, Bangladesh');
