"use client";
import React, { useState, useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./globals.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState<number>(-47.77);
  const [lat, setLat] = useState<number>(-21.19);
  const [zoom, setZoom] = useState<number>(15);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      const center = map.current!.getCenter();
      setLng(Number(center.lng.toFixed(4)));
      setLat(Number(center.lat.toFixed(4)));
      setZoom(Number(map.current!.getZoom().toFixed(2)));
    });

    // Adicionar um marcador ao mapa
    const marker = new mapboxgl.Marker()
      .setLngLat([-47.77, -21.19])
      .addTo(map.current);
    setMarkers([...markers, marker]);
  }, [lng, lat, zoom, markers]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </main>
  );
}
