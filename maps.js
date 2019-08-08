var bdObj = [];
 /*var mfkDatabase = [
  { name: 'MOCAK', x: '19.961518', y:'50.047856' , state:'100', typ: 'gallery'},
  { name: 'Dom Norymberski', x: '19.942683', y:'50.049627' , state:'50', typ: 'gallery'},
  { name: 'Muzeum Etnograficzne', x: '19.943835', y:'50.047878' , state:'0', typ: 'gallery'},
  { name: 'Galeria Pauza', x: '19.939178', y:'50.060643' , state:'50', typ: 'gallery'},
  { name: 'Galeria Szara', x: '19.93900424', y:'50.0608978' , state:'0', typ: 'gallery'},
  { name: 'Bunkier Sztuki', x: '19.934102', y:'50.063472' , state:'50', typ: 'gallery'},
  { name: 'Hevre', x: '19.943491', y:'50.051435' , state:'0', typ: 'pub'},
  { name: 'Betel', x: '19.934634', y:'50.063745' , state:'100', typ: 'pub'},
  { name: 'Mostowa Sztuka Kawa', x: '19.946204', y:'50.048192' , state:'50', typ: 'pub'},
  { name: 'Galeria New Art Era', x: '19.935056', y:'50.061528' , state:'50', typ: 'gallery'},
  { name: 'Sweetsurrender', x: '19.961326', y:'50.049953' , state:'100', typ: 'pub'},
  { name: 'Space Craft Pub', x: '19.936264', y:'50.060491' , state:'100', typ: 'pub'},
  { name: 'Zarówka Cafe', x: '19.940063', y:'50.063317' , state:'0', typ: 'pub'},
  { name: 'Stolarska Pasaż', x: '19.938513', y:'50.060580' , state:'0', typ: 'pub'},
  { name: 'OFF Frame Gallery', x: '19.943434', y:'50.047521' , state:'0', typ: 'gallery'},
  { name: 'Betel', x: '19.934729', y:'50.063590' , state:'0', typ: 'pub'},
  { name: 'Punkt Docelowy', x: '19.948041', y:'50.044996' , state:'0', typ: 'pub'},
  { name: 'Tworzywo Cafe', x: '19.953946', y:'50.046492' , state:'0', typ: 'pub'},
  { name: 'BAL', x: '19.961178', y:'50.048234' , state:'0', typ: 'pub'},
  { name: 'Eszeweria', x: '19.944568', y:'50.050571' , state:'0', typ: 'pub'},
  { name: 'Galeria Szara', x: '19.938721', y:'50.061053' , state:'0', typ: 'gallery'}
];
*/
var mfkDatabase = [];

var select = new ol.interaction.Select({
        wrapX: false
      });

var modify = new ol.interaction.Modify({
       features: select.getFeatures()
     });

var map = new ol.Map({
    view: new ol.View({
          center: ol.proj.fromLonLat([19.943, 50.057]),
          zoom: 14
            }),
    layers: [
          new ol.layer.Tile({
          source: new ol.source.OSM()
          })
         ],
    target: 'map',
    // no zoom-in or zoom-otu buttons
    controls: []
});

var pointStyle2 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#42af42'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 2
    })
  })
});

var pointStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#4aafa2'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(10,10,33,0.5)',
      width: 2
    })
  })
});

var halfStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#f4dc42'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 2
    })
  })
});

var minStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#d84b2b'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 2
    })
  })
});

var fullStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#42af42'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 2
    })
  })
});

// tworzymy dwa zrodla dla layersow
var vectorSource = new ol.source.Vector({
    // features: [marker, marker2],
    style: pointStyle2
});

var vectorSource2 = new ol.source.Vector({
    style: [minStyle, halfStyle, fullStyle]
});

// tworzymy dwie LAYERS - dla dwoch pktow poczatkowych i reszty
var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style:  pointStyle2
});

var markerVectorLayer2 = new ol.layer.Vector({
    source: vectorSource2,
    style:  [minStyle, halfStyle, fullStyle]
});

//dodaejmy LAYERS do mapy
map.addLayer(markerVectorLayer);
map.addLayer(markerVectorLayer2);

/*
function refreshDbOnWWW() {
  let dbWwwContent = '';

  if (document.getElementById('dbContainer')) {
    document.getElementById('dbContainer').innerHTML = '';
    for (let i=0; i<mfkDatabase.length; i++){
        dbWwwContent += 'name:' + mfkDatabase[i].name + '; x:'+ mfkDatabase[i].x + '; y:'+mfkDatabase[i].y + '; state:' + mfkDatabase[i].state + '<br>'
    }
    document.getElementById('dbContainer').innerHTML = dbWwwContent;
  }
  // wczytanie danych do zmiennej globalnej
      for (let i=0; i<mfkDatabase.length; i++){
        let newObj = {name: mfkDatabase[i].name, x:mfkDatabase[i].x, y:mfkDatabase[i].y, state: mfkDatabase[i].state, typ: mfkDatabase[i].typ};
            bdObj = [...mfkDatabase, newObj];
            document.getElementById('postName').value = bdObj[1].name;
            document.getElementById('postX').value = bdObj[1].x;
            document.getElementById('postY').value = bdObj[1].y;
            document.getElementById('postState').value = bdObj[1].state;
            document.getElementById('postTyp').value = bdObj[1].typ;
            console.log(bdObj[1].name);
      }
      console.log('global db variable created!');
      */

window.onload = function() {

  getJSON();
/*
  let coordsTemp = [];
  let colorTemp;

  for(let i=0; i<mfkDatabase.length-1; i++){
    coordsTemp[0] = parseFloat(mfkDatabase[i].x);
    coordsTemp[1] = parseFloat(mfkDatabase[i].y);

    if (mfkDatabase[i].state == '100') {
      colorTemp = fullStyle;
    } else if(mfkDatabase[i].state == '50'){
      colorTemp = halfStyle;
      } else if (mfkDatabase[i].state == '0'){
        colorTemp = minStyle;
      }

    let markerY = new ol.Feature({
      geometry: new ol.geom.Point(
                ol.proj.fromLonLat(coordsTemp)),
                style: colorTemp,
                id: mfkDatabase[i].name
    });
    vectorSource2.addFeature(markerY);
    markerY.setId(mfkDatabase[i].name);
    markerY.setStyle(colorTemp);
  }
  //Check if dbContainer is not empty - if it is - refresh it
  //if (document.getElementById('dbContainer').innerHTML != '') {
    //refreshDbOnWWW();
  //}
  */
  // load Db on the start - from file

}
/*
DISPLAYING POP UP with FEATURE INFO at pixel
*/

map.on('pointermove', function(evt){
  let popupCoordinates = [];
  let popupElement = document.createElement('div');
  let popupElementEdit = document.createElement('div');
  let divWidth = document.getElementById('map').offsetWidth;
  let divHeight = document.getElementById('map').offsetHeight;
  /*

  move pop up a little bit otherwise it will block the posibility to change
  it's status (color)

  */
  popupCoordinates[0] = evt.coordinate[0]+0.1*divWidth;
  popupCoordinates[1] = evt.coordinate[1]+0.1*divHeight;

  // if there is a pop up present and no feature exist under pixel
  if (document.getElementById('popup')) {
    let popupElement = document.getElementById('popup');
    popupElement.parentNode.removeChild(popupElement);
    map.removeOverlay(popup2);
  }

  map.forEachFeatureAtPixel(evt.pixel, function(feature){
    let stateSource = feature.get('id');
    //console.log('statesource (id):' + stateSource);
    let objectState, objectType;
    if (feature) {
      // CREATE A INFO MESSAGE FOR A FEATURE AT pixel
      if (document.getElementById('popup')) {
        let popupElement = document.getElementById('popup');
        popupElement.parentNode.removeChild(popupElement);
        map.removeOverlay(popup2);
      }
      popupElement.className = 'visibleOn popup';
      popupElement.id = 'popup';
      popup2 = new ol.Overlay({
        element: popupElement
      });
          // in search of objects STATE
                              // check database for name and return state
      for (let i=0; i<mfkDatabase.length-1; i++){
        if(mfkDatabase[i].name == stateSource) {
          objectState = mfkDatabase[i].state;
          objectType = mfkDatabase[i].typ;
          if (objectState == '100') {
            objectState = 'full'
          } else if (objectState == '50') {
              objectState = 'half empty'
            } else if (objectState == '0') {
                objectState = 'empty!'
              }
        }
      }
      popupElement.innerHTML = '<div style="text-align:center;">' + feature.get('id') + '</div>';
      // + '<br>state:' + objectState + '<br>' + 'typ:' + objectType;
      popup2.setPosition(popupCoordinates);
      map.addOverlay(popup2);
    }
  },
    {
      hitTolerance: 3
    })
});

/*

ADDING NEW POINTS

*/


map.on('click', function(evt){

  let state;
  let coord = evt.coordinate;
  let pixel = map.getPixelFromCoordinate(coord);
  let newState;

  if (document.getElementById('container2').classList.contains('leftButtonClicked')) {
    state = 'add points';
  } else if (document.getElementById('container3').classList.contains('leftButtonClicked')) {
    state = 'edit points';
  }
  // let state2 = document.getElementById('movePointBtn').value;
  // DODAWANIE PUNKTÓW DO LAYER 2

  if (state == 'add points' && !document.getElementById('addButtonsContainer')) {
  // to chyba wydaje się działaćź i zwracać pozycję myszy
  // console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    var pointCoords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'),
        pointColor,
        newId = mfkDatabase.length+1,
        popupAddCoords = [],
        mapExtent = map.getView().calculateExtent(map.getSize());
    // setting up the MIDDLE point of the map for info WINDOW to be displayed
    popupAddCoords[0] = mapExtent[0]+((mapExtent[2]-mapExtent[0])/4);
    popupAddCoords[1] = mapExtent[1]+((mapExtent[3]-mapExtent[1])/1.3);

    // ADDING NEWPOINT WINDOW
    let popupAddElContent =
          '<label for="newNameInput" style="font-weight:600"> Nazwa miejsca </label>'
        + '<input class="newPointName" id="newNameInput" ></input></div>'
        + '<label for="addButtonsContainer" style="display:block; font-weight: 600;">Stan</label>'
        + '<div class="addButtonsContainer" id="addButtonsContainer">'
          + '<button type="button" class="updateButton" value="OK" id="addOkButton" onClick="addButtonClicked(\'ok\')">'
          + '<button type="button" class="updateButton" value="caution" id="addCautionButton" onClick="addButtonClicked(\'caution\')">'
          + '<button type="button" class="updateButton" value="needs supply" id="addSupplyButton" onClick="addButtonClicked(\'supply\')">'
        + '</div>'
        + '<button onclick="closeAddWindow()">cancel</button> <button id="addSaveButton" onclick="addNewPointSaveButton()">save</button>';



    let windowCheck = document.getElementById('popupAddEl');
    //console.log('windowcheck:' + windowCheck);

    if (windowCheck){
      console.log('add point window found');
      windowCheck.parentNode.removeChild(windowCheck);
      // map.removeOverlay(addPointOverlay);
    }

    let popupAddEl = document.createElement('div');
    // popupAddElHidden will contain coords for new point to pass it to save function

    if (document.getElementById('elHidden')) {
      document.getElementById('elHidden').remove
    }

    let popupAddElHidden = document.createElement('div');

    popupAddElHidden.className = 'popupAddElHidden';
    popupAddElHidden.id = 'elHidden';
    popupAddElHidden.innerHTML = pointCoords;
    //console.log('point cords' + pointCoords);
    popupAddEl.className = 'popupAddEl';
    popupAddEl.innerHTML = popupAddElContent;
    popupAddEl.id = "popupAddEl";

    var addPointOverlay = new ol.Overlay({ element: popupAddEl }),
        addPointOverlay2 = new ol.Overlay({ element: popupAddElHidden });

    addPointOverlay.setPosition(popupAddCoords);
    map.addOverlay(addPointOverlay);
    map.addOverlay(addPointOverlay2);
    console.log('hiddenEl content:' + document.getElementById('elHidden').innerHTML);
    // sprawdzamy jaki kolor punktu jest zaznaczony i taki styl ustawiamy

    if (document.getElementById('addOkButton').classList.contains('buttonClicked')) {
      pointColor = fullStyle;
      newState = '100';
    } else if (document.getElementById('addCautionButton').classList.contains('buttonClicked')) {
      pointColor = halfStyle;
      newState = '50';
    } else if (document.getElementById('addSupplyButton').classList.contains('buttonClicked')) {
      pointColor = minStyle;
      newState = '0';
      }
    }
    if (state == 'change color') {
      map.forEachFeatureAtPixel(pixel, function(feature){
        function updateDatabaseState(database, query, is) {
          for (let i=0; i<database.length-1; i++){
            if(database[i].name == query) {
              database[i].state = is;
              console.log('database hit!');
            }
          }
        }
      if (document.getElementById('radio100').checked) {
        feature.setStyle(fullStyle);
        // changing color of new point we need to change the state in database
        updateDatabaseState(mfkDatabase, feature.get('id'), '100');
        } else if (document.getElementById('radio50').checked) {
          feature.setStyle(halfStyle);
          updateDatabaseState(mfkDatabase, feature.get('id'), '50');
          } else if (document.getElementById('radio0').checked) {
            feature.setStyle(minStyle);
            updateDatabaseState(mfkDatabase, feature.get('id'), '0');
          }
      })
    }
    // on state change - refresh the database on www
    // refreshDbOnWWW();
    // }

    // Displaying EDIT WINDOW for points
    if (state == 'edit points') {
      let popupInfoCoords = [];
      let popupInfoElem = document.createElement('div');

      // getting the EXTENT of the MAP
      let mapExtent = map.getView().calculateExtent(map.getSize());
      // mapExtent = ol.proj.transformExtent(mapExtent, 'EPSG:3857', 'EPSG:4326');
      // setting up the MIDDLE point of the map for info WINDOW to be displayed
      popupInfoCoords[0] = mapExtent[0]+((mapExtent[2]-mapExtent[0])/4);
      popupInfoCoords[1] = mapExtent[1]+((mapExtent[3]-mapExtent[1])/2);
      // if INFO popup is open - CLOSE it
      if (document.getElementById('popup')) {
        let popupElement = document.getElementById('popup');
        popupElement.parentNode.removeChild(popupElement);
        map.removeOverlay(popup2);
      }
      map.forEachFeatureAtPixel(evt.pixel, function(feature){
        let stateSource = feature.get('id');
        let testt = document.getElementById('popupEditEl');

        if (feature) {
          if (testt){
            //console.log('popupEditEl found')
            testt.parentNode.removeChild(testt);
            map.removeOverlay(editOverlay);
          }
        }
        popupInfoElem.className = "visibleOn popupEdit";
        popupInfoElem.id = "popupEditEl";
        let pointName, pointState, pointType;
        editOverlay = new ol.Overlay({
          element: popupInfoElem
        });
        // GET POINT PROPERTIES
        for (let i=0; i<mfkDatabase.length; i++){
          if(mfkDatabase[i].name == feature.get('id')) {
            pointState = mfkDatabase[i].state;
            pointName = mfkDatabase[i].name;
            pointType = mfkDatabase[i].typ;
            if (pointState == '100') {
              objectState = 'full'
            } else if (pointState == '50') {
              objectState = 'half empty'
            } else if (pointState == '0') {
                objectState = 'empty!'
              }
          }
        }
      // EDIT WINDOW
      let popupInfoElemContent =
          '<p id="editingPointName" class="pointNameEdit">' + pointName + '</p>'
          + '<div class="editButtonContainer" name="editC">'
            + '<button type="button" value="OK" id="okButton" onClick="editPopupOkClicked()" class="updateButton"><br>'
            + '<button type="button" value="caution" id="cautionButton" onClick="editPopupCautionClicked()" class="updateButton"><br>'
            + '<button type="button" value="needs supply" id="supplyButton" onClick="editPopupSupplyClicked()" class="updateButton"><br>'
          + '</div>';
      popupInfoElem.innerHTML = popupInfoElemContent;

      editOverlay.setPosition(popupInfoCoords);
      map.addOverlay(editOverlay);
      console.log('adding EditOverlay');
      }),
    {
      hitTolerance: 3
    }
    }
});

function editPopupOkClicked() {
  let point = document.getElementById('editingPointName').innerHTML;

  for (let i=0; i<mfkDatabase.length; i++){
    if (mfkDatabase[i].name == point) {
      mfkDatabase[i].state = '100';
    }
  }
  vectorSource2.getFeatureById(point).setStyle(fullStyle);
  document.getElementById('popupEditEl').parentNode.removeChild(document.getElementById('popupEditEl'));
  updateJSON(point, '100');
}

function editPopupCautionClicked(){
  let point = document.getElementById('editingPointName').innerHTML;

  for (let i=0; i<mfkDatabase.length; i++){
    if (mfkDatabase[i].name == point) {
      mfkDatabase[i].state = '50';
    }
  }
  vectorSource2.getFeatureById(point).setStyle(halfStyle);
  document.getElementById('popupEditEl').parentNode.removeChild(document.getElementById('popupEditEl'));
  updateJSON(point, '50');
}

function editPopupSupplyClicked() {
  let point = document.getElementById('editingPointName').innerHTML;

  for (let i=0; i<mfkDatabase.length; i++){
    if (mfkDatabase[i].name == point) {
      mfkDatabase[i].state = '0';
    }
  }
  vectorSource2.getFeatureById(point).setStyle(minStyle);
  document.getElementById('popupEditEl').parentNode.removeChild(document.getElementById('popupEditEl'));
  updateJSON(point, '0');
}

// If there are any features under the cursor - change it's shape
map.on('pointermove', function(evt) {
  map.getTargetElement().style.cursor =
  map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
});

function switchOnOFF(){
  let state = document.getElementById('container2').innerHTML;

  if (state == 'change color')
    {
      document.getElementById('container2').innerHTML = 'add points';
    } else if (state == 'add points'){
        document.getElementById('container2').innerHTML = 'edit points';
    } else if (state == 'edit points') {
      document.getElementById('container2').innerHTML = 'change color';
    }
}

function updateJSON(uName, uState) {
  var xmlhttp = new XMLHttpRequest();
  console.log('updateJSON function()');

  xmlhttp.onreadystatechange = function() {
    console.log('update onreadystatechange');
    if (this.readyState == 4 && this.status == 200){
      console.log('update readystate !');
      document.getElementById('dbContainer').innerHTML =
      'update httpReadyState status:' + this.responseText;
    }
  };
  var editData = {name: uName, state: uState};

  xmlhttp.open('POST', 'http://localhost:3300/update-json');
  xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xmlhttp.send(JSON.stringify(editData));
  xmlhttp.timeout = 500;
}

function getJSON() {
  var xmlhttp = new XMLHttpRequest();
  var downloadedDb ;
  console.log('getJSON function ... ');
  xmlhttp.onreadystatechange = function() {
    console.log('readyState:' + this.readyState);
    console.log('res:' + this.responseText);
//    console.log('status:' + this.status);
    if (this.readyState == 4 ){
        console.log('readyState 4 !' + this.responseText);
        console.log('res:' + this.responseText);
      } else {
        //console.log('response: ' + this.responseText);
        downloadedDb = this.responseText;
        console.log('downloaded..');
        console.log('res:' + this.responseText);
      }
    }
  xmlhttp.open('GET', 'http://localhost:3300/get-db');
  xmlhttp.send();
  //mfkDatabase = downloadedDb;
  //not to try to egt data before its ready to be downloaded

  xmlhttp.addEventListener('load', function() {
    let coordsTemp = [];
    let colorTemp;
    console.log('before parse' + downloadedDb);
     downloadedDb = JSON.parse(downloadedDb);
    console.log('after parse:' + downloadedDb);
    for(let i=0; i<downloadedDb.length; i++){
      coordsTemp[0] = parseFloat(downloadedDb[i].x);
      coordsTemp[1] = parseFloat(downloadedDb[i].y);
      if (downloadedDb[i].state == '100') {
        colorTemp = fullStyle;
          } else if(downloadedDb[i].state == '50')
            {
            colorTemp = halfStyle;
            } else if (downloadedDb[i].state == '0')
              {
              colorTemp = minStyle;
              }

      let markerZ = new ol.Feature({
        geometry: new ol.geom.Point(
                  ol.proj.fromLonLat(coordsTemp)),
                  style: colorTemp,
                  id: downloadedDb[i].name,
                  hitTolerance: 30
      });

      console.log(downloadedDb[i].name +':' + downloadedDb[i].state);

      markerZ.setId(downloadedDb[i].name);
      markerZ.setStyle(colorTemp);
      vectorSource2.addFeature(markerZ);

      mfkDatabase[i] = downloadedDb[i];
    }

  })
    xmlhttp.timeout = 700;
}

function sendJSON() {
  var xmlhttp = new XMLHttpRequest();
  console.log('sendJSON function()');

  xmlhttp.onreadystatechange = function() {
    console.log('sendJSON readyState:' + this.readyState);
    console.log('sendJSON status:' + this.status);
    if (this.readyState == 4 ){
      console.log('sendJSON readyState 4 !' + this.responseText);
    } else {
      console.log('sendJSON response: ' + this.responseText);
    }
  };

  xmlhttp.open('POST', 'http://localhost:3300/load-db');
  xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  console.log('xml State' + xmlhttp.readyState);
  console.log('xml status:' + xmlhttp.status);

  xmlhttp.send(JSON.stringify(mfkDatabase));
  xmlhttp.timeout = 500;

  console.log('after');
  console.log('xml State' + xmlhttp.readyState);
  console.log('xml status:' + xmlhttp.status);
}

function addJSON(newJSON) {
  var xmlhttp = new XMLHttpRequest();
  console.log('addin JSON');
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      console.log('good to go with adding JSON into db');
      document.getElementById('dbContainer').innerHTML =
      'httpReadyState status:' + this.responseText;
    }
  };
  //console.log('new JSON:' + newJSON);
  xmlhttp.open('POST', 'http://localhost:3300/submit-data');
  xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xmlhttp.send(newJSON);
  xmlhttp.timeout = 500;
}

function closeAddWindow(){
  let dok = document.getElementById('popupAddEl');
  dok.parentNode.removeChild(dok);
}

// check if button have class of clickedButton if not then add it
function addButtonClicked(buttonType){
    document.getElementById('addButtonsContainer').childNodes[0].classList.remove('buttonClicked');
    document.getElementById('addButtonsContainer').childNodes[1].classList.remove('buttonClicked');
    document.getElementById('addButtonsContainer').childNodes[2].classList.remove('buttonClicked');
    if (buttonType == 'ok') {
      document.getElementById('addOkButton').classList.add('buttonClicked');
    } else if (buttonType =='caution') {
      document.getElementById('addCautionButton').classList.add('buttonClicked');
    } else if (buttonType == 'supply') {
      document.getElementById('addSupplyButton').classList.add('buttonClicked');
    }
}


function addNewPointSaveButton() {

let name = document.getElementById('newNameInput').value;
  if (name !== '' && name !== 'name !') {
    let coords = (document.getElementById('elHidden').innerHTML).split(","),
        newPointState;

  console.log('...saving new point');
  coords[0] = parseFloat(coords[0]);
  coords[1] = parseFloat(coords[1]);

  var today = new Date(),
      dateRecord = + today.getFullYear() +' '+ today.getMonth() +' '+today.getDate()+' '+today.getHours() +' '+ today.getMinutes();

  var markerN = new ol.Feature({
    geometry: new ol.geom.Point(
    ol.proj.fromLonLat(coords),
    ),
    id: name
  });

  markerN.setId(name);
  vectorSource2.addFeature(markerN);

  if (document.getElementById('addOkButton').classList.contains('buttonClicked')) {
    newPointState = '100';
    markerN.setStyle(fullStyle);
    } else if (document.getElementById('addCautionButton').classList.contains('buttonClicked')){
      newPointState = '50';
      markerN.setStyle(halfStyle);
      } else if (document.getElementById('addSupplyButton').classList.contains('buttonClicked')){
        newPointState = '0';
        markerN.setStyle(minStyle);
      }
  // UPDATING THE DataBase !
  let newPoint = {name: name, x: coords[0].toString() , y: coords[1].toString(), state: newPointState, typ: 'pub' };
  mfkDatabase = [...mfkDatabase, newPoint];

  addJSON(JSON.stringify(mfkDatabase));
  console.log('przed zapisame:' +mfkDatabase);

  console.log('New Point saved to Db !');
  console.log('new mfk:' + mfkDatabase[mfkDatabase.length-1].name + '|' +mfkDatabase[mfkDatabase.length-1].state + '|' + mfkDatabase[mfkDatabase.length-1].typ);

  //remove window
  let wind = document.getElementById('popupAddEl');
  wind.parentNode.removeChild(wind);

} else {
  document.getElementById('newNameInput').value = 'name !';
}
//   map.removeOverlay('addPointOverlay2');
}

//
function leftarrow() {
  var el = document.getElementById('menuContainer');
  var rect = el.getBoundingClientRect(), top = el.top, height = el.height, el = el.parentNode;
console.log('left:' + rect.left);

  //IF LEFT MENU IS HIDDEN
  if (rect.left<0) {
    document.getElementById('menuContainer').style.left = '0px';
    document.getElementById('menuContainer').classList.add("transArrow");
    document.getElementById('leftMenu').classList.add("shadow");
    console.log('left:' + rect.left);
    //IF LEFT MENU IS SHOWN THEN CHECK THE SIZE OF DISPLAY
  } else if (rect.left >= 0 && window.innerWidth > 768) {
    document.getElementById('menuContainer').style.left = '-25vw';
    document.getElementById('leftMenu').classList.remove("shadow");
    console.log('left:' + rect.left);
  } else if (rect.left >= 0 && window.innerWidth <= 768) {
    document.getElementById('menuContainer').style.left = '-45vw';
    document.getElementById('leftMenu').classList.remove("shadow");
    console.log('left:' + rect.left);
}
}

function makeRedList() {
  if (document.getElementById('redList')) {
    //return;

  }
  let redList = document.createElement('div');
  redList.id = 'redList';
  document.getElementById('leftMenu').style.height = '85vh';
  document.getElementById('leftMenu').appendChild(redList);
  document.getElementById('redList').classList.add('redList');

  for (i=0; i<mfkDatabase.length; i++) {
    if (mfkDatabase[i].state == '0') {
      let redItem = document.createElement('div');
      redItem.id = 'redItem' + i;
      redItem.classList.add('redItem');
      redItem.innerHTML = mfkDatabase[i].name;
      redItem.setAttribute("onClick", "redListClick(" + redItem.id + ")");
      document.getElementById('redList').appendChild(redItem);
    }
  }
  console.log('redList printed');
}

function leftButton(buttonClicked) {
  let cont2 = document.getElementById('container2').classList,
      cont3 = document.getElementById('container3').classList,
      cont4 = document.getElementById('container4').classList,
      red = document.getElementById('redList');

  let editWinCheck = document.getElementById('popupEditEl'),
      addWinCheck = document.getElementById('popupAddEl');
  // if edit window exists - destroy it
  if (editWinCheck){
    editWinCheck.parentNode.removeChild(editWinCheck);
  } else if(addWinCheck) {
    //same with add window
    addWinCheck.parentNode.removeChild(addWinCheck);
  }

  if(buttonClicked == 'addButton') {

    cont2.add('leftButtonClicked');
    cont2.remove('leftButtonUnClicked');
    cont3.remove('leftButtonClicked');
    cont3.add('leftButtonUnClicked');
    cont4.remove('leftButtonClicked');
    cont4.add('leftButtonUnClicked');
    if (red && window.innerWidth > 768) {
      red.remove();
      if (window.innerWidth > 768) {
        document.getElementById('leftMenu').style.height = 'auto';
      }
    }
  } else if(buttonClicked == 'editButton'){
    cont2.remove('leftButtonClicked');
    cont2.add('leftButtonUnClicked');
    cont3.add('leftButtonClicked');
    cont3.remove('leftButtonUnClicked');
    cont4.remove('leftButtonClicked');
    cont4.add('leftButtonUnClicked');
    if (red) {
      red.remove();
      if (window.innerWidth > 768) {
        document.getElementById('leftMenu').style.height = 'auto';
      }
    }
  } else if (buttonClicked == 'listButton') {
    if (red) {
      red.remove();
      if (window.innerWidth > 768) {
        document.getElementById('leftMenu').style.height = 'auto';
      }
      return;
    }
    cont2.remove('leftButtonClicked');
    cont2.add('leftButtonUnClicked');
    cont3.remove('leftButtonClicked');
    cont3.add('leftButtonUnClicked');
    cont4.add('leftButtonClicked');
    cont4.remove('leftButtonUnClicked');
    makeRedList();
  }

  if (window.innerWidth <= 768 && !document.getElementById('container4').classList.contains('leftButtonClicked')) {
      document.getElementById('menuContainer').style.left='-45vw'
      console.log('less than 768');
  } else if (window.innerWidth > 768 && !document.getElementById('container4').classList.contains('leftButtonClicked')) {
    document.getElementById('menuContainer').style.left='-25vw'
    console.log('more than 768');
  }
}

function redListClick(clickedId){
  let name = document.getElementById(clickedId.id).innerHTML;
  console.log('clicked id:' + clickedId.id);
  let newCenterCoords;

  for (i=0; i<mfkDatabase.length-1; i++){
      if (mfkDatabase[i].name == name) {
        newCenterCoords = [parseFloat(mfkDatabase[i].x), parseFloat(mfkDatabase[i].y)];
        console.log('x:' + newCenterCoords[0]);
        console.log('y:' + newCenterCoords[1]);
      }
    }
    //    ===================================================
           let testCircle = new ol.style.Style({
             image: new ol.style.Circle({
               radius: 12,
               fill: null,
               stroke: new ol.style.Stroke({
                 color: 'rgba(255,0,0,0.5)',
                 width:7
               })
             })
           });

           var fet = new ol.Feature(
             new ol.geom.Point(ol.proj.fromLonLat(newCenterCoords))
           );

             fet.setStyle(testCircle);
             vectorSource2.addFeature(fet);
     //    ===================================================

     map.setView(new ol.View({
       center: ol.proj.fromLonLat(newCenterCoords),
       zoom: 16
     }));

     window.setTimeout( function deleteCircle() {
       vectorSource2.removeFeature(fet);
     }, 1500);
}
/*
function legendOnMouseover() {
  var legMouseHtml = '<span id="container2">add points</span><br>'
    + '<button type="button" onclick="switchOnOFF()" id="switchOnOFF">switch</button>';
  document.getElementById('legend').innerHTML = legMouseHtml;
  document.getElementById('legend').classList.remove('smaller');
  document.getElementById('legend').classList.add('bigger');
}

function legendOnMouseOut() {
  var legMouseHtml = '<span id="container2">leg</span>';
  document.getElementById('legend').innerHTML = legMouseHtml;
  document.getElementById('legend').classList.remove('bigger');
  document.getElementById('legend').classList.add('smaller');
}
*/
