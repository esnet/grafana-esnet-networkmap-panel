export const TILESETS = {
      "arcgis": {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attributes: {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          minZoom: 2,
          maxZoom: 10,
          ext: 'png',
        },
      },
      "usgs": {
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        attributes: {
          maxZoom: 20,
          attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
        },
      },
      "esri.shaded": {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        attributes: {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
          maxZoom: 13,
        },
      },
      "geoportail": {
        url: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        attributes: {
          attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
          bounds: [
            [-75, -180],
            [81, 180],
          ],
          minZoom: 2,
          maxZoom: 19,
          apikey: 'choisirgeoportail',
          format: 'image/jpeg',
          style: 'normal',
        },
      },
      "cartodb.labeled": {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attributes: {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      },
      "cartodb.unlabeled": {
        url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        attributes: {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      },
      "opentopomap": {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attributes: {
          maxZoom: 17,
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      }
    }

export const BOUNDARIES = {
      "toner.boundaries": {
        url: 'https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}',
        attributes: {
          attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png',
        },
      },
    }

export const LABELS = {
      "toner.labels": {
        url: 'https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}',
        attributes: {
          attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png',
        },
      }
    }    
