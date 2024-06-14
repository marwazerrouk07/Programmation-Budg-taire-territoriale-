// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize colorPalette
var colorPalette = {};

// Function to get color for a region name, generating a new one if not already in the palette
function getColor(NAME) {
    if (!colorPalette[NAME]) {
        colorPalette[NAME] = getRandomColor();
    }
    return colorPalette[NAME];
}

// Define a function to update popup content
function updatePopupContentRegion(properties) {
    var content = "<b>Region:</b> " + properties.region + "<br>" +
    "<b>Engagements:</b> " + properties['Engagements '] + " Mdhs"+ "<br>" +
    "<b>Engagements non exécutés:</b> " + properties['Engagements non exécutés '] +" Mdhs"+ "<br>" +
    "<b>Prévisions:</b> " + properties.Prévisions + " Mdhs"+"<br>" +
    "<b>Solde:</b> " + properties.Solde +" Mdhs"+ "<br>" +
    "<b>Eng. Urbain:</b> " + properties['Eng. Urbain'] + " Mdhs"+"<br>" +
    "<b>Eng Rural:</b> " + properties['Eng. Rural']+" Mdhs";
    
    document.getElementById("popup").innerHTML = content;
    }
    
    function updatePopupContentCommuneCasa(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.prévision +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    function updatePopupContentCommuneTTA(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.previsions +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    function updatePopupContentCommuneOriental(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.previsions +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    function updatePopupContentCommuneBMK(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.previsions +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    function updatePopupContentCommuneDraa(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.previsions +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    function updatePopupContentCommuneFM(properties) {
        var content = "<b>Commune:</b> " + properties.NAME + "<br>" +
                      "<b>Prévisionnel des engagements:</b> " + properties.previsions +" Mdhs";
        document.getElementById("popup").innerHTML = content;
    }
    var initialCenter = [29, -7]; // Store the initial center
    var initialZoom = 5; // Store the initial zoom level
    var map = L.map('map', {
        center: initialCenter,
        zoom: initialZoom,
    });
    var region; // Define the variable to store the layer for regions

    // Function to update the title and amounts based on the selected region
    function updateRegionInfo(region) {
        console.log("Updating region info for:", region);
        var selectedFeature = maregionf.features.find(feature => feature.properties.region === region);
        if (selectedFeature) {
            var properties = selectedFeature.properties;
            console.log("Properties:", properties);
            document.querySelector("h1").innerText = "Programmation Budgétaire Territoriale - " + properties.region;
            document.querySelector("legend .bottom-right-text").innerHTML = `
                <h4>Engagements depuis 2015: ${properties['Engagements ']} MDHS
                <br>
                Budget Prévisionnel Global de la région (2024-2028): ${properties.Prévisions} MDHS
                <br>
                Prévisionnel des engagements urbains: ${properties['Eng. Urbain']} MDHS
                </h4>`;
            document.querySelector("legend second-line").innerHTML = `
                <h4>
                Budget Non Programmé (Solde): ${properties.Solde} MDHS
                </h4>`;
        } else {
             document.querySelector("h1").innerText = "Programmation Budgétaire Territoriale"; 
             resetZoom();
        }
    }
    
    
// Initialize the map
// var map = L.map('map', {
//     center: [29, -7],
//     zoom: 5,
// });
function resetZoom() {
    map.setView(initialCenter, initialZoom);
}
var defaultLayer = L.tileLayer.provider('Esri.WorldTopoMap').addTo(map);

var geojson = L.geoJson(maregionf, {
    style: function(feature) {
        return {
            fillColor: getColor(feature.properties.region), // Use region name to get color
            weight: 2,
            opacity: -1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.3
        };
    },
    onEachFeature: function(feature, layer) {
        layer.on('mouseover', function(e) {
            updatePopupContentRegion(feature.properties);
            document.getElementById("popup").style.display = "block";
        });
        layer.on('mouseout', function(e) {
            document.getElementById("popup").style.display = "none";
        });
    }

}).addTo(map);

// var geojson = L.geoJson(ttaProvinces, {
//     style: function(feature) {
//         return {
//             fillColor: getRandomColor(), // Use region name to get color
//             weight: 2,
//             opacity: 1,
//             color: 'white',
//             dashArray: '3',
//             fillOpacity: 0.7
//         };
//     },
//     onEachFeature: function(feature, layer) {
//         layer.on('mouseover', function(e) {
//             updatePopupContentCommuneTTA(feature.properties);
//             document.getElementById("popup").style.display = "block";
//         });
//         layer.on('mouseout', function(e) {
//             document.getElementById("popup").style.display = "none";
//         });
//     }
//     }).addTo(map);
// var geojson1 = L.geoJson(casaProvince, {
//     style: function(feature) {
//         return {
//             fillColor: getColor(feature.properties.NAME), // Use region name to get color
//             weight: 2,
//             opacity: 1,
//             color: 'white',
//             dashArray: '3',
//             fillOpacity: 1,
//         };
//     },
//     onEachFeature: function(feature, layer) {
//         layer.on('mouseover', function(e) {
//             updatePopupContent(feature.properties);
//             document.getElementById("popup").style.display = "block";
//         });
//         layer.on('mouseout', function(e) {
//             document.getElementById("popup").style.display = "none";
//         });
//     }
// }).addTo(map);

// var casa; // Define geojson2 here to be used later

// Function to toggle the second GeoJSON layer
// function toggleGeoJsonLayer() {
//         casa = L.geoJson(casaProvince, {
//             style: function(feature) {
//                 return {
//                     fillColor: getRandomColor(), // Different approach for second layer
//                     weight: 2,
//                     opacity: 1,
//                     color: 'white',
//                     dashArray: '3',
//                     fillOpacity: 0.7
//                 };
//             },
//             onEachFeature: function(feature, layer) {
//                 layer.on('mouseover', function(e) {
//                     updatePopupContentCommuneCasa(feature.properties);
//                     document.getElementById("popup").style.display = "block";
//                 });
//                 layer.on('mouseout', function(e) {
//                     document.getElementById("popup").style.display = "none";
//                 });
//             }
//         }).addTo(map);
//         map.fitBounds(casa.getBounds());
//     }
var regionLayer;
function loadRegion() {
     var selectedRegion = document.getElementById('regionDropdown').value;
     if (regionLayer) {
       map.removeLayer(regionLayer); // Remove the existing layer if it exists
        }

    switch (selectedRegion) {
        case 'Casablanca Settat':
            regionLayer = L.geoJson(casaProvince, {
                style: function(feature) {
                    return {
                        fillColor: getRandomColor(), // Different approach for second layer
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on('mouseover', function(e) {
                        updatePopupContentCommuneCasa(feature.properties);
                        document.getElementById("popup").style.display = "block";
                    });
                    layer.on('mouseout', function(e) {
                        document.getElementById("popup").style.display = "none";
                    });
                }
            }).addTo(map);
            map.fitBounds(regionLayer.getBounds());
            break;
        case 'Tanger Tétouan Al Hoceima':
            regionLayer = L.geoJson(ttaProvinces, {
                style: function(feature) {
                    return {
                        fillColor: getRandomColor(), // Different approach for second layer
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on('mouseover', function(e) {
                        updatePopupContentCommuneTTA(feature.properties);
                        document.getElementById("popup").style.display = "block";
                    });
                    layer.on('mouseout', function(e) {
                        document.getElementById("popup").style.display = "none";
                    });
                }
            }).addTo(map);
            map.fitBounds(regionLayer.getBounds());
            break;
        case "L'Oriental":
            regionLayer = L.geoJson(orientalComm, {
                style: function(feature) {
                    return {
                        fillColor: getRandomColor(), // Different approach for second layer
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on('mouseover', function(e) {
                        updatePopupContentCommuneOriental(feature.properties);
                        document.getElementById("popup").style.display = "block";
                    });
                    layer.on('mouseout', function(e) {
                        document.getElementById("popup").style.display = "none";
                    });
                }
            }).addTo(map);
            map.fitBounds(regionLayer.getBounds());
            break;
            case "Béni Mellal Khénifra":
                regionLayer = L.geoJson(bmkComm, {
                    style: function(feature) {
                        return {
                            fillColor: getRandomColor(), // Different approach for second layer
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        layer.on('mouseover', function(e) {
                            updatePopupContentCommuneBMK(feature.properties);
                            document.getElementById("popup").style.display = "block";
                        });
                        layer.on('mouseout', function(e) {
                            document.getElementById("popup").style.display = "none";
                        });
                    }
                }).addTo(map);
                map.fitBounds(regionLayer.getBounds());
                break;
            case "Draa Tafilalet":
                regionLayer = L.geoJson(draaComm, {
                    style: function(feature) {
                        return {
                            fillColor: getRandomColor(), // Different approach for second layer
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        layer.on('mouseover', function(e) {
                            updatePopupContentCommuneDraa(feature.properties);
                            document.getElementById("popup").style.display = "block";
                        });
                        layer.on('mouseout', function(e) {
                            document.getElementById("popup").style.display = "none";
                        });
                    }
                }).addTo(map);
                map.fitBounds(regionLayer.getBounds());
                break;
                case "Fès Meknès":
                regionLayer = L.geoJson(fesMeknesComm, {
                    style: function(feature) {
                        return {
                            fillColor: getRandomColor(), // Different approach for second layer
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        layer.on('mouseover', function(e) {
                            updatePopupContentCommuneFM(feature.properties);
                            document.getElementById("popup").style.display = "block";
                        });
                        layer.on('mouseout', function(e) {
                            document.getElementById("popup").style.display = "none";
                        });
                    }
                }).addTo(map);
                map.fitBounds(regionLayer.getBounds());
                break;
        // Add more cases for other regionLayer as needed
            default:
                break;
    }
    updateRegionInfo(selectedRegion);
}

// Add an event listener to the dropdown

function handleRegionChange() {
    loadRegion(); // Call loadRegion function
    updateRegionInfo(); // Call updateRegionInfo function
}

// Add an event listener to the dropdown, using the new handleRegionChange function
document.getElementById('regionDropdown').addEventListener('change', handleRegionChange);