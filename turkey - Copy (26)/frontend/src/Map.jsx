import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './style.css';

const Map = () => {
  const [selectedType, setSelectedType] = useState('rusya');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const mapRef = useRef(null);

  // Marker renkleri
  const typeColors = {
    "Büyükelçilik": "#ff5252",
    "Konsolosluk": "#ff9e80",
    "Ticaret": "#ffee58",
    "Enerji": "#7e57c2",
    "Kültür": "#4db6ac",
    "Üniversite": "#2196f3",
    "Okul": "#4caf50",
    "Eğitim Merkezi": "#9c27b0",
    "Dernek": "#ff9800"
  };

  // Genişletilmiş veri seti
  const data = {
    rusya: [
      {id:1, name:"Ankara Büyükelçiliği", lat:39.9037, lng:32.8523, type:"Büyükelçilik", address:"Karyagdi Sokak No:5, Çankaya/Ankara", website:"https://turkey.mid.ru"},
      {id:2, name:"İstanbul Başkonsolosluğu", lat:41.0686, lng:29.0168, type:"Konsolosluk", address:"İstinye Mahallesi, Sarıyer/İstanbul", website:"https://istanbul.mid.ru"},
      {id:3, name:"Antalya Fahri Konsolosluğu", lat:36.8841, lng:30.7056, type:"Konsolosluk", address:"Fener Mahallesi, Lara/Antalya", website:"https://antalya.mid.ru"},
      {id:4, name:"Samsun Fahri Konsolosluğu", lat:41.2928, lng:36.3313, type:"Konsolosluk", address:"Atakum/Samsun", website:"#"},
      {id:5, name:"Trabzon Fahri Konsolosluğu", lat:41.0015, lng:39.7178, type:"Konsolosluk", address:"Ortahisar/Trabzon", website:"#"}
    ],
    universiteler: [
      {id:1, name:"ODTÜ", city:"Ankara", lat:39.8900, lng:32.7800, type:"Üniversite", address:"Üniversiteler Mahallesi, Çankaya/Ankara", website:"https://www.metu.edu.tr"},
      {id:2, name:"İTÜ", city:"İstanbul", lat:41.1065, lng:29.0256, type:"Üniversite", address:"Maslak Kampüsü, Sarıyer/İstanbul", website:"https://www.itu.edu.tr"},
      {id:3, name:"KTÜ", city:"Trabzon", lat:41.0074, lng:39.6911, type:"Üniversite", address:"Kanuni Kampüsü", website:"https://www.ktu.edu.tr"},
      {id:4, name:"ODTÜ Kuzey Kıbrıs", city:"KKTC", lat:35.2463, lng:33.0306, type:"Üniversite", address:"Kalkanlı/KKTC", website:"https://ncc.metu.edu.tr"},
      {id:5, name:"İstanbul Okan Üniversitesi", city:"İstanbul", lat:40.9518, lng:29.3921, type:"Üniversite", address:"Okan Üni", website:"https://ncc.metu.edu.tr"},
      
    ],
    okullar: [
      {id:1, name:"Galatasaray Lisesi", city:"İstanbul", lat:41.0283, lng:29.0225, type:"Okul", address:"Beyoğlu/İstanbul", website:"http://www.gsl.gsu.edu.tr"},
      {id:2, name:"İzmir Amerikan Koleji", city:"İzmir", lat:38.4250, lng:27.1425, type:"Okul", address:"Göztepe/İzmir", website:"#"},
      {id:3, name:"TED Koleji", city:"Ankara", lat:39.8883, lng:32.8587, type:"Okul", address:"Çankaya/Ankara", website:"#"}
    ],
    egitimMerkezleri: [
      {id:1, name:"TÖMER Ankara", city:"Ankara", lat:39.9334, lng:32.8547, type:"Eğitim Merkezi", address:"Kızılay/Ankara", website:"https://tomer.ankara.edu.tr"},
      {id:2, name:"Yunus Emre Enstitüsü", city:"Ankara", lat:39.9334, lng:32.8547, type:"Eğitim Merkezi", address:"Kızılay/Ankara", website:"https://yee.org.tr"},
      {id:3, name:"TÖMER İzmir", city:"İzmir", lat:38.4192, lng:27.1287, type:"Eğitim Merkezi", address:"Bornova/İzmir", website:"#"}
    ],
    dernekler: [
      {id:1, name:"Rus Kültür Derneği", city:"İzmir", lat:38.4237, lng:27.1428, type:"Dernek", address:"Alsancak/İzmir", website:"#"},
      {id:2, name:"Türk-Rus İş Adamları Derneği", city:"İstanbul", lat:41.0810, lng:29.0094, type:"Dernek", address:"Maslak/İstanbul", website:"#"},
      {id:3, name:"Karadeniz Kültür Derneği", city:"Trabzon", lat:40.4584, lng:39.7908, type:"Dernek", address:"Ortahisar/Trabzon", website:"#"}
    ]
  };

  const createCustomIcon = (type) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${typeColors[type]}; 
             width: 24px; height: 24px; border-radius: 50%; 
             border: 2px solid #fff;"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, 12],
    });
  };

  const createClusterCustomIcon = (cluster) => {
    return L.divIcon({
      html: `<div class="cluster-marker">${cluster.getChildCount()}</div>`,
      className: 'custom-cluster',
      iconSize: L.point(40, 40, true)
    });
  };

  const handleClusterClick = (cluster) => {
    const markers = cluster.getAllChildMarkers();
    setSelectedCluster({
      count: markers.length,
      items: markers.map(m => m.options.data)
    });
  };

  return (
    <div className='container'>
      <div className='header-container'>
        <h2 className='header-title'>Türkiye'deki Rus Kurumları</h2>
        <div>
          <button className={`mapSecenek ${selectedType === 'rusya' ? 'active' : ''}`}
            onClick={() => setSelectedType('rusya')}>
            Rusya Temsilcilikleri <i className="fa-solid fa-flag mapSecenekIcon"></i>
          </button>
          <button className={`mapSecenek ${selectedType === 'universiteler' ? 'active' : ''}`}
            onClick={() => setSelectedType('universiteler')}>
            Üniversiteler <i className="fa-solid fa-building-columns mapSecenekIcon"></i>
          </button>
          <button className={`mapSecenek ${selectedType === 'okullar' ? 'active' : ''}`}
            onClick={() => setSelectedType('okullar')}>
            Okullar <i className="fa-solid fa-school mapSecenekIcon"></i>
          </button>
          <button className={`mapSecenek ${selectedType === 'egitimMerkezleri' ? 'active' : ''}`}
            onClick={() => setSelectedType('egitimMerkezleri')}>
            Eğitim Merkezleri <i className="fa-solid fa-user-graduate mapSecenekIcon"></i>
          </button>
          <button className={`mapSecenek ${selectedType === 'dernekler' ? 'active' : ''}`}
            onClick={() => setSelectedType('dernekler')}>
            Dernekler <i className="fa-solid fa-people-roof mapSecenekIcon"></i>
          </button>
        </div>
      </div>

      <div className='map-container'>
        <MapContainer
          ref={mapRef}
          center={[39.0, 35.0]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          maxBounds={[[35.0, 25.0], [43.0, 45.0]]}>
          
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            spiderfyDistanceMultiplier={2}
            onClusterClick={handleClusterClick}
          >
            {data[selectedType].map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={createCustomIcon(item.type)}
                data={item}
              >
                <Popup>
                  <div className="map-popup">
                    <h3>{item.name}</h3>
                    <p>{item.address}</p>
                    <a href={item.website} target="_blank" rel="noreferrer">
                      Detaylı Bilgi
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {selectedCluster && (
            <Popup position={selectedCluster.items[0].latlng}>
              <div className="cluster-popup">
                <h3>{selectedCluster.count} Kurum Bulundu</h3>
                <ul>
                  {selectedCluster.items.map((item, index) => (
                    <li key={index}>{item.name} - {item.type}</li>
                  ))}
                </ul>
              </div>
            </Popup>
          )}

          <ZoomControl position="topleft" />
        </MapContainer>

        <div className="map-info-box">
          <h4>Toplam Kurum Sayısı</h4>
          <div className="info-count">{data[selectedType].length}</div>
        </div>

        <div className="map-legend">
          <div className="legend-title">Kurum Tipleri</div>
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: color }}></div>
              <span className="legend-text">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;