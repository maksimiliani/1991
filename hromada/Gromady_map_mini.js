
var northEast = L.latLng(51, 40),
    southWest = L.latLng(46, 22);
var bounds = L.latLngBounds(northEast, southWest);
var map = L.map('map', { center: bounds.getCenter(), renderer: L.canvas(), zoom: 6, minZoom: 5, maxZoom: 22, zoomControl: false, preferCanvas: true });
map.attributionControl.addAttribution('<a href="https://www.hromada4.org/" target="_blank">&copy; Громада 4.0 - Акселератор цифрової незламності | </a> <a href="https://map.edopomoga.gov.ua/" target="_blank">&copy; Мапа єДопомога | </a> <a href="https://www.openstreetmap.org/copyright" target="_blank"> &copy; OpenStreetMap contributors</a>');
var openstreetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { id: "OpenStreetMap", layername: 'OpenStreetMap', preferCanvas: true }).addTo(map);
var info = L.control({ position: 'topleft' });
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this._div.innerHTML = `<h4 style='text-align:center'>Інформація</h4> 
Клікніть на громаду, щоб отримати інформацію про неї`
    return this._div;
};
info.addTo(map);
L.control.zoom({
    position: 'topleft'
}).addTo(map);
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#03dffc',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}
function resetHighlight(e) {
    mezhi_gromad_gromada4_layer.resetStyle(e.target);
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeatureGromada(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //         dblclick: zoomToFeature
    });
    var props = layer.feature.properties
    layer.bindPopup(
        `
    <h4 style="text-align:center; margin: 0px"><b>${props.ADMIN_3} ${props.TYPE}</b></h4>
    <hr>
    <i>${props.ADMIN_2}, ${props.ADMIN_1}</i>
    <br />КОАТУУ: <i>${props.KOATUU_old}</i>
    <br />КАТОТТГ: <i>${props.COD_3}</i>
    
    <br />Тематика проєкту: <b><i>${props.GROUP_NAME}</i></b> 
    <hr><a href="${props.OFFICIAL_SITE}" target="_blank">Офіційний сайт громади</a>
    <br /><a href="${props.DECENTRALIZATION_SITE}" target="_blank">Сторінка громади на сайті "Децентралізація"</a> 
    `
    );
}
var region_list = {}
for (x in mezhi_oblastey.features) {
    region_list[mezhi_oblastey.features[x].properties.ADMIN_1] = []
}
console.log(region_list)
for (x in mezhi_gromad_gromada4.features) {
    region_list[mezhi_gromad_gromada4.features[x].properties.ADMIN_1].push(`${mezhi_gromad_gromada4.features[x].properties.ADMIN_3} ${mezhi_gromad_gromada4.features[x].properties.TYPE}`)
}
function onEachFeatureOblast(feature, layer) {
    //   console.log(layer)
    var props = layer.feature.properties
    var gromady_list_html = ``
    for (x in region_list[props.ADMIN_1]) {
        gromady_list_html += `<li><i>${region_list[props.ADMIN_1][x]}</i></li>`
    }
    layer.bindPopup(
        `
<h4 style="text-align:center; margin: 0px"><b>${props.ADMIN_1}</b></h4> 
<hr>
Список громад-учасниць з цієї області:
<ol style="padding-left: 1em;">
    ${gromady_list_html}
    </ol>
    `
    );
}
var regions_without_members = ['Донецька область', 'Запорізька область', 'Херсонська область', 'Черкаська область', 'Місто Севастополь', "Місто Київ", "Автономна Республіка Крим"]
var themes_groups = {
    1: ['Туризм ', 'purple'],
    2: ['ГІС, Землі', 'green'],
    3: ['Інвестиційний портал, послуги для бізнесу', 'gray'],
    4: ['Документообіг та Закупівлі  ', 'orange'],
    5: ['Публічні послуги (Освіта, транспортна система та ін)', 'yellow'],
    6: ['Автоматизація роботи Адміністрації та Е-Послуги', 'red'],
    7: ['Е-Послуги (Транспорт, Комуналка та ін) ', 'brown'],
    8: ['Послуги (картка містянина, база сжо, бібліотеки та ін)', 'pink']
}
function style_gromady(feature) {
    return {
        color: themes_groups[feature.properties.GROUP_NUMBER][1],
        weight: 3,

        fillOpacity: 0.5,
    };
}
function style_oblast(feature) {
    return {
        color: 'blue',
        weight: 5,
        fillOpacity: regions_without_members.includes(feature.properties.ADMIN_1) ? 0 : 0.2,
    };
}
map.createPane('pane');
map.getPane('pane').style.zIndex = 600;
map.createPane('pane2');
map.getPane('pane2').style.zIndex = 601;
var mezhi_oblastey_layer = L.geoJson(mezhi_oblastey, {
    pane: 'pane2', /*renderer: L.canvas(),*//* pmIgnore: true, snapIgnore: true,*/ id: "mezhi_oblastey_layer", layername: 'Межі областей', style: style_oblast, onEachFeature: onEachFeatureOblast
}).addTo(map)
var mezhi_gromad_gromada4_layer = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[1][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 1 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer2 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[2][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 2 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer3 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[3][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 3 ? true : false;
    }
}).addTo(map)

var mezhi_gromad_gromada4_layer4 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[4][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 4 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer5 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[5][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 5 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer6 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[6][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 6 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer7 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[7][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 7 ? true : false;
    }
}).addTo(map)
var mezhi_gromad_gromada4_layer8 = L.geoJson(mezhi_gromad_gromada4, {
    pane: 'pane2', layername: themes_groups[8][0], style: style_gromady, onEachFeature: onEachFeatureGromada, filter: function (geoJsonFeature) {
        return geoJsonFeature.properties.GROUP_NUMBER == 8 ? true : false;
    }
}).addTo(map)
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>Розподіл громад-учасниць за тематикою проєктів:</h4>'
    for (x in themes_groups) {
        div.innerHTML += (x == 1 ? '<i style="background:' + themes_groups[x][1] + '"></i> ' + themes_groups[x][0] : '<hr><i style="background:' + themes_groups[x][1] + '"></i> ' + themes_groups[x][0]);
    }
    return div;
};
legend.addTo(map);
var baseTree = {
    label: 'Базові карти',
    //     selectAllCheckbox: 'Un/select all',
    children: [
        { label: 'Open Street Map', layer: openstreetmap }
    ]
};
var overlaysTree = {
    label: 'Громади-учасниці за тематикою проєктів',
    selectAllCheckbox: true,
    children: [
        { label: mezhi_gromad_gromada4_layer.options.layername, layer: mezhi_gromad_gromada4_layer },
        { label: mezhi_gromad_gromada4_layer2.options.layername, layer: mezhi_gromad_gromada4_layer2 },
        { label: mezhi_gromad_gromada4_layer3.options.layername, layer: mezhi_gromad_gromada4_layer3 },
        { label: mezhi_gromad_gromada4_layer4.options.layername, layer: mezhi_gromad_gromada4_layer4 },
        { label: mezhi_gromad_gromada4_layer5.options.layername, layer: mezhi_gromad_gromada4_layer5 },
        { label: mezhi_gromad_gromada4_layer6.options.layername, layer: mezhi_gromad_gromada4_layer6 },
        { label: mezhi_gromad_gromada4_layer7.options.layername, layer: mezhi_gromad_gromada4_layer7 },
        { label: mezhi_gromad_gromada4_layer8.options.layername, layer: mezhi_gromad_gromada4_layer8 }
    ]
}
var layer_tree = L.control.layers.tree(baseTree, overlaysTree, {
    closedSymbol: '&#8862; &#x1f5c0;',
    openedSymbol: '&#8863; &#x1f5c1;',
}).addTo(map);