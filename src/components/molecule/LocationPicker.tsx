"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import WarningModal from "../atom/modals/WarningModal";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

type AddressData = {
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
};

const LocationPicker = ({
  onLocationChange,
}: {
  onLocationChange: (
    lat: number,
    lng: number,
    addressData: AddressData
  ) => void;
}) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [showModal, setShowModal] = useState(false);

  const mapRef = useRef<any>(null); // Changed from google.maps.Map to any
  const lastPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  const addressObject = {
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAshCvR93Za6hLLUxbp-GcVqQ5Ie2KmJvA",
  });

  function getNearbyFallbackLocation(
    { lat, lng }: { lat: number; lng: number },
    radiusInMeters: number
  ) {
    const radiusInDegreesLat  = radiusInMeters / 111320; // ~111.32 km per degree latitude
    const radiusInDegreesLng = radiusInMeters / (111320 * Math.cos(lat * (Math.PI / 180))); // for longitude

    // const randomOffset = () => (Math.random() - 0.5) * 2 * radiusInDegrees;
    const randomOffsetLat = () => (Math.random() - 0.5) * 2 * radiusInDegreesLat;
    const randomOffsetLng = () => (Math.random() - 0.5) * 2 * radiusInDegreesLng;

    return {
      lat: lat + randomOffsetLat(),
      lng: lng + randomOffsetLng(),
    };
  }

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google || !window.google.maps) return;

    let intervalId: NodeJS.Timeout;

    const checkLocationAccess = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            setMapCenter(userLocation);
            setMarkerPosition(userLocation);
            lastPositionRef.current = userLocation;
            setShowModal(false);

            if (window.google && window.google.maps) {
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: userLocation }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                  const components = results[0].address_components;

                  const getComponent = (type: string) =>
                    components.find((c: any) => c.types.includes(type))?.long_name || "";
                  const address = getComponent("neighborhood");
                  const locality = getComponent("sublocality_level_1");
                  const city = getComponent("administrative_area_level_3");
                  const state = getComponent("administrative_area_level_1");
                  const pincode = getComponent("postal_code");
                  const fullAddress = results[0].formatted_address;

                  onLocationChange(latitude, longitude, {
                    address,
                    locality,
                    city,
                    state,
                    pincode,
                    fullAddress,
                  });
                }
              });
            }

            if (intervalId) {
              clearInterval(intervalId);
            }
          },
          () => {
            const fallback = getNearbyFallbackLocation(lastPositionRef.current || defaultCenter, 500); // within 200 meters
            setShowModal(true);
            setMapCenter(fallback);
            setMarkerPosition(fallback);
          }
        );
      } else {
        setShowModal(true);
      }
    };

    checkLocationAccess();
    intervalId = setInterval(() => {
      checkLocationAccess();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoaded, onLocationChange]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
        setMapCenter({ lat, lng });
        onLocationChange(lat, lng, addressObject);
      }
    },
    [onLocationChange]
  );

  const handleOnIdle = () => {
    if (isLoaded && mapRef.current && typeof window !== "undefined" && window.google && window.google.maps) {
      const center = mapRef.current.getCenter();
      if (center) {
        const lat = center.lat();
        const lng = center.lng();

        const last = lastPositionRef.current;
        if (!last || last.lat !== lat || last.lng !== lng) {
          lastPositionRef.current = { lat, lng };
          setMarkerPosition({ lat, lng });
          onLocationChange(lat, lng, addressObject);
        }
      }
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        onClick={handleMapClick}
        onLoad={(map: any) => (mapRef.current = map)}
        onIdle={handleOnIdle}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      <WarningModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        title="Location Access Denied"
        message="To continue, please allow location access in your browser settings."
      />
    </div>
  );
};

export default LocationPicker;
