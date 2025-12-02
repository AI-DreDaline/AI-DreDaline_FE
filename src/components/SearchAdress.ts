
const apiKey = 'AIzaSyDc4vnnlbGxpDmS19tIzz4tA2e1EdrjwRA';
// utils/geocode.ts
export async function getAutocomplete(address: string) {
    if (!address || address.trim() === "") return [];

    const encodedAddress = encodeURIComponent(address);
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     if (data.status === 'OK' && data.results.length > 0) {
    //         const location = data.results[0].geometry.location;
    //         return {
    //             lat: location.lat,
    //             lng: location.lng,
    //         };
    //     } else {
    //         console.warn('Geocoding failed:', data.status);
    //         return null;
    //     }
    // } catch (error) {
    //     console.error('Geocoding error:', error);
    //     return null;
    // }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(
        address
    )}&key=${apiKey}&language=ko&components=country:kr`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            return data.predictions; // [{ description, place_id, ... }]
        } else {
            console.warn("Autocomplete failed:", data.status);
            return [];
        }
    } catch (error) {
        console.error("Autocomplete error:", error);
        return [];
    }
}

export async function getPlaceDetail(placeId: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ko`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            const { lat, lng } = data.result.geometry.location;
            return { lat, lng };
        } else {
            console.warn("Place Detail failed:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Place Detail error:", error);
        return null;
    }
}

export async function getCoordinates(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
    )}&key=${apiKey}&language=ko`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else {
            console.warn("Geocoding failed:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}