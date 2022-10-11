import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const CACHED_DIR = 'cached';

export interface Cached {
	lastUpdated: number;
	contents: any;
}

const CACHE_DURATION_SECONDS = 86400; // cache for 1 day

export async function cachedFetch(...fetchArgs: Parameters<typeof fetch>) {
	// Create a hash key out of the fetch args
	const args = JSON.stringify(fetchArgs);
	const hash = crypto.createHash('sha256').update(args).digest('hex');
	const cachedPath = path.join(CACHED_DIR, `${hash}.json`);

	// Get the current time
	const time = Date.now();

	// Check if the hash is cached
	if (fs.existsSync(cachedPath)) {
		// Read in the cache
		const contents: Cached = JSON.parse(fs.readFileSync(cachedPath, { encoding: 'utf-8' }));

		// Check if cache is recent enough
		if ((time - contents.lastUpdated) / 1000 < CACHE_DURATION_SECONDS) {
			// Return the cached contents
			return contents.contents;
		}
	}

	// Cache was not triggered, so we fetch
	const response = await fetch(...fetchArgs);
	const json = await response.json();

	// Write to cache
	const cached: Cached = {
		lastUpdated: time,
		contents: json
	};
	fs.writeFileSync(cachedPath, JSON.stringify(cached), { encoding: 'utf-8' });

	// Return the JSON fetch response
	return json;
}
