import React, { useState, useRef, useEffect, useCallback } from 'react';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
// AllSehir.json dosyanızı import edin (dosya yolunu projenize göre ayarlayın)
import allSehir from './AllSehir.json';

// Basit debounce yardımcı fonksiyonu
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Matruşka resminin URL'si (Bu URL'yi kendi dosya yolunuza göre güncelleyin)
const matrushkaImageUrl = './matrushka.png'; // veya sunucudaki URL

const TurkeyMap = () => {
  // State tanımlamaları
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(1);
  const [isZooming, setIsZooming] = useState(false);

  // Ref tanımlamaları
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const modalRef = useRef(null);
  const facilityModalRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const zoomBehaviorRef = useRef(null);

  // Debounced zoom level güncelleme
  const debouncedSetCurrentZoomLevel = useCallback(
    debounce((level) => {
      setCurrentZoomLevel(Math.round(level * 10) / 10);
    }, 100),
    []
  );

  // D3 zoom davranışı ayarlanıyor
  useEffect(() => {
    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zoomHandler = zoom()
      .scaleExtent([0.8, 5])
      .translateExtent([[0, 0], [800, 350]])
      .on('start', () => {
        setIsZooming(true);
        svg.style('cursor', 'grabbing');
      })
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        debouncedSetCurrentZoomLevel(event.transform.k);
      })
      .on('end', () => {
        setIsZooming(false);
        svg.style('cursor', 'move');
      });

    svg.call(zoomHandler);
    zoomBehaviorRef.current = zoomHandler;
    svg.style('cursor', 'move');

    svg.transition()
      .duration(750)
      .call(zoomHandler.transform, zoomIdentity);

    return () => {
      svg.on('.zoom', null);
    };
  }, [debouncedSetCurrentZoomLevel]);

  // Eğer JSON’da kurum bilgisi yoksa, her şehir için varsayılan kurumları ekle
  const getCityWithInstitutions = (city) => {
    if (city.institutions) return city;
    // JSON'da center bilgisi yoksa varsayılan ekle (Örnek)
    const cityWithCenter = city.center ? city : { ...city, center: { x: 100, y: 100 } };

    return {
      ...cityWithCenter,
      institutions: {
        üniversiteler: Array.from({ length: 4 }, (_, i) => ({
          name: `${city.ilismi} Üniversite ${i + 1}`,
          position: { x: cityWithCenter.center.x + i * 15, y: cityWithCenter.center.y + i * 5 },
          address: `${city.ilismi} Üniversite Adresi ${i + 1}`,
          phone: `0270-000-000${i + 1}`,
          website: `www.${city.ilismi.toLowerCase().replace(/[^a-z0-9]/g, '')}uni${i + 1}.com`,
          mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(city.ilismi + ' Üniversite ' + (i + 1))}`
        })),
        okullar: Array.from({ length: 3 }, (_, i) => ({
          name: `${city.ilismi} Okul ${i + 1}`,
          position: { x: cityWithCenter.center.x + 20 + i * 15, y: cityWithCenter.center.y + 20 + i * 5 },
          address: `${city.ilismi} Okul Adresi ${i + 1}`,
          phone: `0270-111-111${i + 1}`,
          website: `www.${city.ilismi.toLowerCase().replace(/[^a-z0-9]/g, '')}okul${i + 1}.edu.tr`,
          mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(city.ilismi + ' Okul ' + (i + 1))}`
        })),
        dernekler: Array.from({ length: 3 }, (_, i) => ({
          name: `${city.ilismi} Dernek ${i + 1}`,
          position: { x: cityWithCenter.center.x + 40 + i * 15, y: cityWithCenter.center.y + 40 + i * 5 },
          address: `${city.ilismi} Dernek Adresi ${i + 1}`,
          phone: `0270-222-222${i + 1}`,
          website: `www.${city.ilismi.toLowerCase().replace(/[^a-z0-9]/g, '')}dernek${i + 1}.org`,
          mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(city.ilismi + ' Dernek ' + (i + 1))}`
        }))
      }
    };
  };

  // Yardımcı fonksiyonlar: toplam kurum sayısı ve tüm kurumları listeleme
  const getTotalInstitutions = (city) => {
    if (!city || !city.institutions) return 0;
    let total = 0;
    Object.values(city.institutions).forEach(category => {
      total += category.length;
    });
    return total;
  };

  const getAllInstitutions = (city) => {
    if (!city || !city.institutions) return [];
    const allInstitutions = [];
    Object.entries(city.institutions).forEach(([category, institutions]) => {
      institutions.forEach(institution => {
        allInstitutions.push({
          ...institution,
          category
        });
      });
    });
    return allInstitutions;
  };

  // Arama ve kategoriye göre kurumları filtrele
  const categories =
    selectedCity && selectedCity.institutions ? Object.keys(selectedCity.institutions) : [];
  const institutionsInView =
    selectedCity && selectedCity.institutions
      ? selectedCategory
        ? selectedCity.institutions[selectedCategory] || []
        : getAllInstitutions(selectedCity)
      : [];
  const filteredInstitutions = institutionsInView.filter((inst) =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Şehre tıklanınca çalışan fonksiyon
  const handleCityClick = (event, city) => {
    event.stopPropagation();
    const cityData = getCityWithInstitutions(city);

    if (cityData && zoomBehaviorRef.current) {
      setSelectedCity(cityData);
      setIsModalOpen(true);

      // Zooming Logic
      const targetScale = 2;
      const svgWidth = 800;
      const svgHeight = 350;
      const cityCenterX = cityData.center ? cityData.center.x : 100;
      const cityCenterY = cityData.center ? cityData.center.y : 100;
      const targetX = svgWidth / 2 - cityCenterX * targetScale;
      const targetY = svgHeight / 2 - cityCenterY * targetScale;
      const targetTransform = zoomIdentity.translate(targetX, targetY).scale(targetScale);
      const svg = select(svgRef.current);

      svg.transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .call(zoomBehaviorRef.current.transform, targetTransform)
        .on('end', () => {
          setCurrentZoomLevel(targetScale);
          setIsZooming(false);
        });
    }
  };

   // Kurum noktasına/listesine tıklama fonksiyonu
  const handleFacilityClick = (event, facility) => {
    if (event) event.stopPropagation();
    setSelectedFacility(facility);

    if (isModalOpen) {
      // Şehir modalı açıksa, önce onu kapat animasyonla
      if (modalRef.current) {
        modalRef.current.classList.add('closing');
        overlayRef.current?.classList.add('closing'); // Overlay'i de soluklaştır
        setTimeout(() => {
          setIsModalOpen(false);
          setTimeout(() => setIsFacilityModalOpen(true), 50); // Kısa bir gecikmeyle kurum modalını aç
        }, 300); // CSS animasyon süresiyle eşleşmeli
      } else {
        setIsModalOpen(false);
        setIsFacilityModalOpen(true);
      }
    } else {
      // Şehir modalı açık değilse direkt kurum modalını aç
      setIsFacilityModalOpen(true);
    }
  };

  // Şehir modalını kapatma fonksiyonu
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('closing');
      overlayRef.current?.classList.add('closing');
      setTimeout(() => {
        setIsModalOpen(false);
        setSearchQuery('');
        setSelectedCategory(null);
        setSelectedCity(null);
      }, 300); // CSS animasyon süresiyle eşleşmeli
    } else {
      setIsModalOpen(false);
      setSearchQuery('');
      setSelectedCategory(null);
      setSelectedCity(null);
    }
    resetMapView();
  };

  // Kurum modalını kapatma fonksiyonu
  const closeFacilityModal = () => {
    if (facilityModalRef.current) {
      facilityModalRef.current.classList.add('closing');
      overlayRef.current?.classList.add('closing'); // Facility overlay'ini de soluklaştır
      setTimeout(() => {
        setIsFacilityModalOpen(false);
        setSelectedFacility(null);
        // Eğer bir şehir seçiliyse, şehir modalını tekrar aç
        if (selectedCity) {
           setIsModalOpen(true);
           // Geri dönerken overlay'in tekrar görünür olması için 'closing' sınıfını kaldır
           // (ve modal'ın 'opening' sınıfı otomatik olarak eklenir)
           if (overlayRef.current) overlayRef.current.classList.remove('closing');
        }
      }, 300); // CSS animasyon süresiyle eşleşmeli
    } else {
      setIsFacilityModalOpen(false);
      setSelectedFacility(null);
      if (selectedCity) {
        setIsModalOpen(true);
      }
    }
  };


  // Overlay'e tıklanınca modalları kapatma fonksiyonu
  const handleOverlayClick = (e) => {
    // Tıklamanın doğrudan overlay üzerinde yapıldığından emin ol
    if (e.target === overlayRef.current) {
      if (isFacilityModalOpen) {
        closeFacilityModal();
      } else if (isModalOpen) {
        closeModal();
      }
    }
  };

  // Harita görünümünü sıfırlama fonksiyonu
  const resetMapView = () => {
    if (zoomBehaviorRef.current) {
      const svg = select(svgRef.current);
      svg.transition()
        .duration(750)
        .ease(d3.easeCubicOut)
        .call(zoomBehaviorRef.current.transform, zoomIdentity)
        .on('end', () => {
          setCurrentZoomLevel(1);
          setIsZooming(false);
        });
    }
  };

  // Escape tuşu ile modalları kapatma
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isFacilityModalOpen) {
          closeFacilityModal();
        } else if (isModalOpen) {
          closeModal();
        }
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isModalOpen, isFacilityModalOpen, selectedCity]);

  // Modallar açıkken body scroll'unu engelleme
  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isFacilityModalOpen) ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen, isFacilityModalOpen]);

  // Görünürlüğü zoom seviyesine göre belirleme
  const showCityLabels = currentZoomLevel < 1.3;
  const showFacilityPoints = currentZoomLevel > 1.8;
  const showFacilityLabels = false;

  return (
    // Ana harita konteyneri
    <div className="map-container" ref={containerRef}>

      {/* === YENİ: Silüet Resimleri === */}
      <img
        src={matrushkaImageUrl}
        alt="" // Dekoratif olduğu için alt text boş olabilir
        className={`silhouette silhouette-top-right ${isModalOpen || isFacilityModalOpen ? 'visible' : ''}`}
        aria-hidden="true" // Ekran okuyucular görmezden gelsin
      />
      <img
        src={matrushkaImageUrl}
        alt=""
        className={`silhouette silhouette-bottom-left ${isModalOpen || isFacilityModalOpen ? 'visible' : ''}`}
        aria-hidden="true"
      />
      {/* === Silüet Resimleri Sonu === */}


      {/* Harita Kontrolleri */}
      <div className="map-controls">
        <button
          className="map-control-btn reset-btn"
          onClick={resetMapView}
          title="Haritayı Sıfırla (Reset Map)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M3 2v6h6"></path><path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path><path d="M21 22v-6h-6"></path><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
          </svg>
        </button>
        <div className="zoom-indicator-wrapper" title={`Zoom: ${currentZoomLevel.toFixed(1)}x`}>
          <div
            className="zoom-indicator-level"
            style={{ width: `${((currentZoomLevel - 0.8) / (5 - 0.8)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Başlık Kutusu */}
      <div className="title-box">
        <h1 className="title-box-heading">Türkiye Kurum Haritası</h1>
        <p className="title-box-subheading">Şehirleri ve kurumları keşfedin.</p>
      </div>

      {/* Lejant */}
      <div className="map-legend">
        <h2 className="legend-title">Harita Lejantı</h2>
        <div className="legend-item">
          <span className="legend-color city-legend"></span>
          <span className="legend-label">Şehir Merkezi & Kurum Sayısı</span>
        </div>
        <div className="legend-item">
          <span className="legend-color facility-legend"></span>
          <span className="legend-label">Kurum Konumu (Yakınlaşınca)</span>
        </div>
      </div>

      {/* SVG Harita Alanı */}
      <svg ref={svgRef} viewBox="0 0 800 350" className="turkey-svg">
        <rect x="0" y="0" width="800" height="350" fill="transparent" className="zoom-capture-rect" />
        <g ref={gRef}>
          <rect x="0" y="0" width="800" height="350" className="map-background" />
          {/* Şehirleri JSON'dan map ile oluşturma */}
          {allSehir.map((city) => {
            const cityData = getCityWithInstitutions(city);
            const cityCenterX = cityData.center ? cityData.center.x : 100; // Varsayılan merkez
            const cityCenterY = cityData.center ? cityData.center.y : 100; // Varsayılan merkez

            return (
              <g key={cityData.plaka} className="city-group">
                {/* Şehir yolu */}
                <path
                  className="city-path"
                  d={cityData.d}
                  onClick={(e) => handleCityClick(e, cityData)}
                />
                {/* Şehir etiketi/markeri */}
                <g
                  className="city-label-group"
                  onClick={(e) => handleCityClick(e, cityData)}
                  style={{
                    opacity: showCityLabels ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-out', // Transform geçişi eklendi
                    pointerEvents: showCityLabels ? 'all' : 'none',
                    transformOrigin: 'center center' // Ölçeklemenin merkezden olması için
                  }}
                  transform={`translate(${cityCenterX}, ${cityCenterY})`}
                >
                  <circle cx={0} cy={0} r={8} className="city-marker" />
                  <text x={0} y={0} dy=".3em" textAnchor="middle" className="city-count">
                    {getTotalInstitutions(cityData)}
                  </text>
                </g>
                {/* Kurum noktaları */}
                {showFacilityPoints && cityData.institutions &&
                  Object.values(cityData.institutions).flat().map((inst, index) => (
                    <g
                      key={`${cityData.plaka}-${inst.name}-${index}`}
                      className="facility-marker-group"
                      onClick={(e) => handleFacilityClick(e, inst)}
                      style={{
                        opacity: showFacilityPoints ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out 0.1s, transform 0.2s ease-out', // Transform geçişi eklendi
                        pointerEvents: showFacilityPoints ? 'all' : 'none',
                        transformOrigin: 'center center' // Ölçeklemenin merkezden olması için
                      }}
                      transform={`translate(${inst.position.x}, ${inst.position.y})`}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={Math.max(1.5, 4 / currentZoomLevel)}
                        className="facility-point"
                      />
                      {/* Kurum etiketi (şu an kapalı) */}
                      {showFacilityLabels && (
                        <text
                          x={0}
                          y={-(6 / currentZoomLevel)}
                          textAnchor="middle"
                          className="facility-label"
                        >
                          {inst.name}
                        </text>
                      )}
                    </g>
                  ))
                }
              </g>
            );
          })}
        </g>
      </svg>

      {/* Şehir Detay Modalı */}
      {isModalOpen && selectedCity && (
        <div className={`modal-overlay ${isModalOpen ? '' : 'closing'}`} ref={overlayRef} onClick={handleOverlayClick}>
          <div ref={modalRef} className={`modal city-modal ${isModalOpen ? '' : 'closing'}`}>
             {/* Modal içeriği öncekiyle aynı */}
             <div className="modal-header">
              <h2 className="modal-title">{selectedCity.ilismi}</h2>
              <button onClick={closeModal} className="modal-close-btn" aria-label="Kapat">×</button>
            </div>
            <div className="modal-content">
              <div className="city-stats">
                <div className="stat-item">
                  <div className="stat-value">{getTotalInstitutions(selectedCity)}</div>
                  <div className="stat-label">Toplam Kurum</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{categories.length}</div>
                  <div className="stat-label">Kategori</div>
                </div>
              </div>

              <div className="category-filter">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(prev => prev === category ? null : category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory(null)} className="category-btn all-btn">
                    Tümü
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Kurum adı ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Kurum ara"
              />

              <div className="institutions-list">
                {filteredInstitutions.length > 0 ? (
                  filteredInstitutions.map((inst, i) => (
                    <div
                      key={`${inst.name}-${i}-${inst.category}`}
                      onClick={(e) => handleFacilityClick(e, inst)}
                      className="institution-item"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFacilityClick(null, inst)}
                    >
                      <div className="institution-icon" aria-hidden="true">
                        {inst.category === 'üniversiteler' ? '🎓' :
                         inst.category === 'okullar' ? '🏫' :
                         inst.category === 'dernekler' ? '🏛️' : '🏢'}
                      </div>
                      <div className="institution-details">
                        <div className="institution-name">{inst.name}</div>
                        <div className="institution-address">{inst.address}</div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="institution-arrow" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  ))
                ) : (
                  <p className="no-results-message">Bu kritere uygun kurum bulunamadı.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kurum Detay Modalı */}
      {isFacilityModalOpen && selectedFacility && (
         <div className={`modal-overlay facility-overlay ${isFacilityModalOpen ? '' : 'closing'}`} ref={overlayRef} onClick={handleOverlayClick}>
           <div ref={facilityModalRef} className={`modal facility-modal ${isFacilityModalOpen ? '' : 'closing'}`}>
            {/* Modal içeriği öncekiyle aynı */}
            <div className="modal-header">
              <h2 className="modal-title">{selectedFacility.name}</h2>
              <button onClick={closeFacilityModal} className="modal-close-btn" aria-label="Kapat">×</button>
            </div>
            <div className="modal-content facility-content">
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">📍</span>
                <div className="detail-text">
                  <h4 className="detail-heading">Adres</h4>
                  <p className="detail-paragraph">{selectedFacility.address}</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">📞</span>
                <div className="detail-text">
                  <h4 className="detail-heading">Telefon</h4>
                  <p className="detail-paragraph">{selectedFacility.phone || 'Belirtilmemiş'}</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon" aria-hidden="true">🌐</span>
                <div className="detail-text">
                  <h4 className="detail-heading">Web Sitesi</h4>
                  {selectedFacility.website ? (
                    <a href={selectedFacility.website.startsWith('http') ? selectedFacility.website : `http://${selectedFacility.website}`} target="_blank" rel="noopener noreferrer" className="website-link">
                      {selectedFacility.website}
                    </a>
                  ) : (
                    <p className="detail-paragraph">Belirtilmemiş</p>
                  )}
                </div>
              </div>
              <div className="map-section">
                <h4 className="detail-heading map-heading">Konum</h4>
                <div className="map-embed-container">
                  {selectedFacility.mapUrl && selectedFacility.mapUrl.startsWith('http') ? (
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedFacility.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="map-iframe"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map for ${selectedFacility.name}`}
                    ></iframe>
                  ) : (
                    <div className="map-placeholder">Harita linki geçersiz veya yok.</div>
                  )}
                </div>
                <div className="map-actions">
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(selectedFacility.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-action-btn view-map-btn"
                  >
                    Google Maps'te Aç
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedFacility.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-action-btn directions-btn"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Talimatları */}
      <div className="zoom-instructions">
         Haritada gezinmek için sürükleyin, yakınlaşmak/uzaklaşmak için fare tekerleğini veya parmaklarınızı kullanın.
      </div>
    </div>
  );
};

export default TurkeyMap;
