
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`);
    if (!response.ok) {
      // Pass through the error from the external API
      return NextResponse.json(
        { error: `Failed to fetch contributions from external API: ${response.statusText}` },
        { status: response.status }
      );
    }
    const data = await response.json();
    // Re-validate every hour
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=3600' } });
  } catch (error) {
    console.error('Error in github-contributions proxy route:', error);
    return NextResponse.json({ error: 'Internal server error while fetching contributions' }, { status: 500 });
  }
}
