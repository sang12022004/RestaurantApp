import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity, Text } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import type { SymbolLayerStyle, CameraRef } from '@maplibre/maplibre-react-native';
import type { LineString } from 'geojson';

const ORS_API_KEY = '5b3ce3597851110001cf6248a7993ddb27a44823b22642bfe9fcdc3f';

const destinationIconStyle: SymbolLayerStyle = {
  iconImage: 'destinationIcon',
  iconSize: 0.05,
};

const routeLineStyle: MapLibreGL.LineLayerStyle = {
  lineColor: 'red',
  lineWidth: 5,
  lineOpacity: 0.8,
};

const walkedLineStyle: MapLibreGL.LineLayerStyle = {
  lineColor: 'gray',
  lineWidth: 4,
  lineOpacity: 0.6,
};

const getDistance = (from: [number, number], to?: [number, number]) => {
  if (!to || !Array.isArray(to)) {
    return Infinity;
  }
  const [lon1, lat1] = from;
  const [lon2, lat2] = to;
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getClosestPoint = (current: [number, number], path: [number, number][]) => {
  let minDistance = Infinity;
  let closest: [number, number] = path[0];
  for (const point of path) {
    const d = getDistance(current, point);
    if (d < minDistance) {
      minDistance = d;
      closest = point;
    }
  }
  return closest;
};

type MapRouteViewProps = {
  destination: [number, number] | null;
};

export const MapRouteView: React.FC<MapRouteViewProps> = ({ destination }) => {
  const cameraRef = useRef<CameraRef>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [pathHistory, setPathHistory] = useState<[number, number][]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [isRerouting, setIsRerouting] = useState(false);
  const [lastClosestPoint, setLastClosestPoint] = useState<[number, number] | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastSuccessfulRerouteRef = useRef<number>(0);
  const routeClearedRef = useRef(false);
  const offRouteCountRef = useRef(0);

  const deleteButtonStyle = {
    backgroundColor: routeGeoJSON ? '#ccc' : '#eee',
  };

  const deleteTextColor = {
    color: routeGeoJSON ? '#333' : '#999',
  };

  const fetchRoute = useCallback(async (start: [number, number]) => {
    if (!destination || isRerouting) {
      return;
    }
    try {
      setIsRerouting(true);
      const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        method: 'POST',
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates: [start, destination] }),
      });
      const json = await res.json();
      if (!json.features?.length) {
        throw new Error('Invalid route data');
      }
      setRouteGeoJSON(json);
      routeClearedRef.current = false;
      lastSuccessfulRerouteRef.current = Date.now();
    } catch (err) {
      console.error('Route error:', err);
    } finally {
      setIsRerouting(false);
    }
  }, [destination, isRerouting]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
          setUserLocation(coords);
          setPathHistory([coords]);
          if (destination && !routeClearedRef.current) {
            fetchRoute(coords);
          }
        },
        (err) => console.warn(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    })();
  }, [fetchRoute, destination]);

  useEffect(() => {
    if (!isTracking) {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
      return;
    }
    watchIdRef.current = Geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        const accuracy = pos.coords.accuracy;
        const speed = pos.coords.speed;
        setUserLocation(coords);
        setPathHistory((prev) => [...prev, coords]);

        if (!userLocation || !routeGeoJSON || !destination || isRerouting || accuracy > 50 || speed === null || speed < 0.5) {
          return;
        }

        const geometry = routeGeoJSON.features?.[0]?.geometry as LineString;
        const coordinates = geometry?.coordinates as [number, number][];
        if (!coordinates?.length) {
          return;
        }

        const now = Date.now();
        const elapsed = now - lastSuccessfulRerouteRef.current;
        const roundedLoc: [number, number] = [
          Number(coords[0].toFixed(6)),
          Number(coords[1].toFixed(6)),
        ];

        const closestPoint = getClosestPoint(roundedLoc, coordinates);
        const distance = getDistance(roundedLoc, closestPoint);
        const distanceToDestination = getDistance(coords, destination);

        const isSamePoint = (a: [number, number], b: [number, number]) =>
          Math.abs(a[0] - b[0]) < 0.00005 && Math.abs(a[1] - b[1]) < 0.00005;

        const movedFar = lastClosestPoint ? getDistance(closestPoint, lastClosestPoint) > 50 : true;
        const hasMoved = !lastClosestPoint || !isSamePoint(closestPoint, lastClosestPoint);

        if (distanceToDestination < 50) {
          return;
        }

        if (distance > 150) {
          offRouteCountRef.current++;
        }
        else if (offRouteCountRef.current > 0) {
          offRouteCountRef.current--;
        }

        if (
          distance > 150 &&
          distance < 1000 &&
          offRouteCountRef.current >= 2 &&
          elapsed > 60000 &&
          movedFar &&
          hasMoved &&
          !routeClearedRef.current &&
          !isRerouting
        ) {
          console.log('[🚗] Triggering reroute at', new Date().toISOString());
          setLastClosestPoint(closestPoint);
          fetchRoute(coords);
          offRouteCountRef.current = 0;
        }
      },
      (err) => console.warn(err),
      { enableHighAccuracy: true, distanceFilter: 20, interval: 10000 }
    );
    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);}
    };
  }, [isTracking, userLocation, routeGeoJSON, destination, isRerouting, fetchRoute, lastClosestPoint]);

  useEffect(() => {
    if (isTracking && userLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 16,
        animationDuration: 1000,
      });
    }
  }, [isTracking, userLocation]);

  return (
    <View style={styles.wrapper}>
      {/* {isRerouting && <Text style={styles.rerouting}>Đang định tuyến lại...</Text>} */}
      <View style={styles.card}>
        <View style={styles.mapContainer}>
          <MapLibreGL.MapView
            style={styles.map}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            zoomEnabled
            scrollEnabled
            pitchEnabled
            rotateEnabled
          >
            <MapLibreGL.Camera
              ref={cameraRef}
              centerCoordinate={userLocation ?? undefined}
              animationMode="flyTo"
              animationDuration={1000}
              zoomLevel={16}
              followUserLocation={isTracking}
            />

            <MapLibreGL.UserLocation
              visible
              onUpdate={(loc) => {
                const coords: [number, number] = [
                  loc.coords.longitude,
                  loc.coords.latitude,
                ];
                setUserLocation(coords);
              }}
            />

            {pathHistory.length > 1 && (
              <MapLibreGL.ShapeSource
                id="walkedPath"
                shape={{
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: pathHistory,
                  },
                  properties: {},
                }}
              >
                <MapLibreGL.LineLayer id="walkedPathLine" style={walkedLineStyle} />
              </MapLibreGL.ShapeSource>
            )}

            {routeGeoJSON && (
              <MapLibreGL.ShapeSource id="route" shape={routeGeoJSON}>
                <MapLibreGL.LineLayer id="routeLine" style={routeLineStyle} />
              </MapLibreGL.ShapeSource>
            )}

            {destination && (
              <MapLibreGL.ShapeSource
                id="destination-marker"
                shape={{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: destination,
                  },
                  properties: {},
                }}
              >
                <MapLibreGL.SymbolLayer id="destination-symbol" style={destinationIconStyle} />
              </MapLibreGL.ShapeSource>
            )}
          </MapLibreGL.MapView>
        </View>
      </View>

      {/* Nút điều khiển đẹp */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.customButton, styles.buttonStartTracking]}
          onPress={() => setIsTracking((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {isTracking ? 'DỪNG THEO DÕI' : 'BẮT ĐẦU THEO DÕI'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.customButton, styles.buttonDelete, deleteButtonStyle]}
          onPress={() => {
            setRouteGeoJSON(null);
            setLastClosestPoint(null);
            lastSuccessfulRerouteRef.current = 0;
            routeClearedRef.current = true;
            offRouteCountRef.current = 0;
          }}
          disabled={!routeGeoJSON}
        >
          <Text
            style={[styles.buttonText, deleteTextColor]}
          >
            XÓA TUYẾN ĐƯỜNG
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { padding: 0, alignItems: 'center' },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  map: { flex: 1 },
  mapContainer: { flex: 1 },
  rerouting: { fontStyle: 'italic', color: 'orange', marginBottom: 8 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  buttonStartTracking: {
    backgroundColor: '#4CAF50',
  },
  customButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonDelete: {
    borderColor: '#aaa',
    borderWidth: 1,
  },
});
