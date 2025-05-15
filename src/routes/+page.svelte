<script>
    import mapboxgl from "mapbox-gl";
    import * as d3 from "d3";
    import "mapbox-gl/dist/mapbox-gl.css";
    import { onMount } from "svelte";

    mapboxgl.accessToken = "pk.eyJ1IjoiZ3VzdHlwZXIiLCJhIjoiY21hcGltcmMxMGg2ajJqcHdzMDU1eWpsNyJ9.vjybrffpq-ixPDZV3uC-lQ";

    let stations = [];
    let map; // agora no escopo global

    // Função para obter coordenadas no sistema de pixels
    function getCoords(station) {
        if (!map) return { cx: 0, cy: 0 };
        let point = new mapboxgl.LngLat(+station.Long, +station.Lat);
        let { x, y } = map.project(point);
        return { cx: x, cy: y };
    }

    // Atualiza a renderização do SVG quando o mapa se move
    function updateMapView() {
        stations = [...stations]; // força reatividade do Svelte
    }

    onMount(async () => {
        // Inicializa o mapa
        map = new mapboxgl.Map({
            container: 'map',
            center: [-71.09415, 42.36027],
            zoom: 12,
            style: "mapbox://styles/mapbox/streets-v12",
        });

        map.on("load", async () => {
            // Adiciona a camada de ciclovias
            map.addSource("boston_route", {
                type: "geojson",
                data: "https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
            });

            map.addLayer({
                id: "boston_bike_routes",
                type: "line",
                source: "boston_route",
                paint: {
                    "line-color": "#00bcd4",
                    "line-width": 2
                },
            });

            // Carrega os dados CSV
            const csvUrl = 'https://vis-society.github.io/labs/8/data/bluebikes-stations.csv';
            const data = await d3.csv(csvUrl);

            stations = data.map(station => ({
                id: station.Number,
                name: station.NAME,
                Lat: +station.Lat,
                Long: +station.Long,
            }));

            // Atualiza quando o mapa muda (arraste, zoom, etc.)
            map.on('move', updateMapView);
            map.on('zoom', updateMapView);
            map.on('resize', updateMapView);
        });
    });
</script>

<!-- Container do mapa com SVG sobreposto -->
<div id="map">
    <svg id="overlay">
        {#each stations as station}
            <circle {...getCoords(station)} r="5" fill="steelblue" stroke="white" stroke-width="1" />
        {/each}
    </svg>
</div>

<style>
    @import url("$lib/global.css");

    #map {
        position: relative;
        width: 100%;
        height: 100vh;
    }

    #overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* permite interagir com o mapa por baixo */
    }
</style>
