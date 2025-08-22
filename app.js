// ------------------- Initialize Map -------------------
var map = L.map('map').setView([23.6850, 90.3563], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

map.attributionControl.setPrefix(false);

// ------------------- Division & Region Data -------------------
const divisionsData = [
    {
        name: "Dhaka",
        coords: [23.8103, 90.4125],
        regions: [
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
        ]
    },
    {
        name: "Rajshahi",
        coords: [24.3745, 88.6042],
        regions: [
            { name: "Boalia", coords: [24.3745, 88.6042], popupId: "boalia-popup" },
            { name: "Motihar", coords: [24.3720, 88.6165], popupId: "motihar-popup" },
            { name: "Rajpara", coords: [24.3758, 88.5986], popupId: "rajpara-popup" },
            { name: "Shah Makhdum", coords: [24.3830, 88.5700], popupId: "shahmakhdum-popup" },
            { name: "Paba", coords: [24.4150, 88.6100], popupId: "paba-popup" }
        ]
    },
    // Other divisions without regions
    { name: "Chattogram", coords: [22.3569, 91.7832] },
    { name: "Khulna", coords: [22.8456, 89.5403] },
    { name: "Barishal", coords: [22.7010, 90.3535] },
    { name: "Sylhet", coords: [24.8949, 91.8687] },
    { name: "Rangpur", coords: [25.7439, 89.2752] },
    { name: "Mymensingh", coords: [24.7471, 90.4203] }
];

// ------------------- Create Division Markers -------------------
divisionsData.forEach(division => {
    const marker = L.marker(division.coords).addTo(map)
        .bindTooltip(division.name, { permanent: true, direction: "top" })
        .openTooltip();

    if (division.regions) {
        // Layers for Dhaka/Rajshahi
        let greeneryLayer = L.layerGroup();
        let populationLayer = L.layerGroup();
        let airQualityLayer = L.layerGroup();
        let controlAdded = false;

        // Show regions only after clicking
        marker.on("click", function () {
            map.flyTo(division.coords, 12, { duration: 0.6 });

            greeneryLayer.clearLayers();
            populationLayer.clearLayers();
            airQualityLayer.clearLayers();

            division.regions.forEach(region => {
                // Add region tooltip permanently
                L.marker(region.coords)
                    .addTo(map)
                    .bindTooltip(region.name, { permanent: true, direction: "top" })
                    .openTooltip();

                // Greenery circle
                L.circleMarker(region.coords, {
                    radius: 10, color: "green", fillColor: "green", fillOpacity: 0.5
                }).bindTooltip(`${region.name} - Greenery: High`).addTo(greeneryLayer);

                // Population circle
                L.circleMarker(region.coords, {
                    radius: 10, color: "red", fillColor: "red", fillOpacity: 0.5
                }).bindTooltip(`${region.name} - Population: High`).addTo(populationLayer);

                // Air Quality circle
                L.circleMarker(region.coords, {
                    radius: 10, color: "blue", fillColor: "blue", fillOpacity: 0.5
                }).bindTooltip(`${region.name} - AQI: Good`).addTo(airQualityLayer);

                // Popup on region click
                L.marker(region.coords).on("click", () => {
                    L.popup()
                        .setLatLng(region.coords)
                        .setContent(region.popupId ? document.getElementById(region.popupId).innerHTML : region.name)
                        .openOn(map);
                });
            });

            if (!controlAdded) {
                L.control.layers(null, {
                    "🌳 Greenery": greeneryLayer,
                    "👥 Population": populationLayer,
                    "🌫️ Air Quality": airQualityLayer
                }, { collapsed: false }).addTo(map);
                controlAdded = true;
            }
        });
    }
});
