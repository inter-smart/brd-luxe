export async function GET() {
  const placeId = "ChIJ6QlvxtnxpzsRUevsOZfMPY4";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Keep this secret

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`
    );
    const data = await response.json();

    return new Response(
      JSON.stringify({
        rating: data?.result?.rating || 4.7,
        totalReviews: data?.result?.user_ratings_total || 2384,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ rating: 0, totalReviews: 0 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
