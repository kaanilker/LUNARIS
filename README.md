# LUNARIS

**Lunar Illumination & Communication Analysis System**
Quasar Team · NASA Space Apps Challenge 2026

LUNARIS is a bilingual (English and Turkish) web tool for comparing landing sites and dates at the lunar south pole
against two conditions: the Sun, for power, and Earth, for communication. It derives each candidate site's terrain
horizon from NASA ephemerides and LOLA elevation data, then calculates when the Sun and Earth stay above that horizon.

This repository holds the **built static site** in `build/`. It is ready to upload to any web server.

## The problem

At the lunar south pole the Sun and Earth move close to the horizon. A small change in landing position or date can
turn a site from sunlit to dark, or cut its line of sight to Earth. Existing tools such as Quickmap, Moon Trek and JPL
Horizons each answer part of the question, but comparing scenarios across many sites and dates is slow. LUNARIS
precomputes the geometry so that sites and dates can be compared in the browser right away.

## What the site does

| Page | What it answers |
|---|---|
| Home | Current Sun and Earth conditions at the south pole, with an introduction to polar geometry |
| Planner | Sun and Earth measures for 130 candidate sites over a chosen date and a seven-day surface window, ranked |
| Expert analysis | Filters and measure distributions across all sites |
| Site detail | A site's 360° terrain horizon, Sun and Earth tracks, hourly timeline and a printable report |
| Compare | Two sites, or two windows at one site, side by side |
| Missions | Launch site, transfer trajectory and landing point of ten completed Moon missions |
| Simulation | A 3D mission simulation with a timeline, and a surface rover simulation |
| About | Method, data sources, validation and limitations |
| Library | Academic references in APA 7 format |

Every page is available in both languages, for example `/en/plan/` and `/tr/planla/`.

## How it calculates

The calculation runs in three steps.

1. **Sky geometry.** Sun and Earth vectors from the SPICE DE440 ephemeris are projected onto each site's local
   east-north-up axes, which gives elevation and azimuth.
2. **Terrain horizon.** 720 azimuth rays at 0.5° spacing are traced up to 150 km across the LOLA elevation model.
   The highest obstruction in each direction, corrected for lunar curvature, gives the horizon H(A).
3. **Visibility windows.** The Sun and Earth are treated as disks, not points. The exposed fraction of each disk is
   counted hourly against the horizon (Earth with a 2° threshold). This produces C1 (longest continuous sunlight),
   C2 (longest continuous darkness), C6 (long-term sunlight fraction) and D2 (share of time Earth is visible).

Slope (C4s) and walking time to the nearest permanently shadowed cell (C5) come from the LOLA 10 m elevation model.
Sites are ordered with classical TOPSIS over seven measures at equal weight. A site with a missing measure is not
ranked, and the reason is shown. The equal weights and the C4s and C5 proxy measures are a team decision and may change.

Heavy computation runs ahead of time in Python (spiceypy, NumPy, SciPy, Rasterio/GDAL, pyproj). The browser reads a
compact binary data package (130 sites, years 2026 to 2033) and calculates the chosen window with a TypeScript engine.

## Data sources

| Source | Used for |
|---|---|
| NAIF SPICE kernels, DE440 ephemeris | Positions of the Sun, Earth and Moon, and lunar orientation |
| LRO LOLA south polar elevation models | Terrain horizons and slope |
| Wueller et al. 2026, *JGR Planets*, [doi:10.1029/2025JE009434](https://doi.org/10.1029/2025JE009434); Zenodo 17084058 | The 130 candidate sites |
| USGS candidate region boundaries, [doi:10.5066/P1MEQ6UK](https://doi.org/10.5066/P1MEQ6UK) | Artemis candidate regions on the polar map |
| Fortezzo et al. 2020, USGS Unified Geologic Map of the Moon | Geologic unit of each site |
| Mazarico et al. 2011 (PGDA) | Published illumination maps, for validation |
| JPL Horizons | Independent check of the sky calculation |

## Validation

The Python pipeline is the reference implementation. The browser engine is tested against its golden files, and both
match within 10⁻⁶° in angle and 10⁻⁹ in visible disk fraction. The sky calculation is checked against JPL Horizons,
and site results are compared with published lunar illumination maps.

## Limitations

- Results depend on the resolution of the terrain model. Literature comparisons use different cell sizes, definitions
  and thresholds, so they are not formal acceptance tolerances.
- LUNARIS does not prove that a site is safe to land on. Slope and shadow-distance measures are proxies built from
  public data, not vehicle limits.
- The slope uncertainty used for C4s (σ = 2.0°) comes from a 5 m elevation model study. Applying it to the 10 m model
  has no published source.
- The mission simulation draws the Sun, Earth and Moon on simplified orbits and at sizes that are not to scale.
- AI comments only describe results that were already calculated. They are labelled as AI output, and a prepared text
  is shown when the AI service is unavailable.

## Running the site

The site is a set of static files. No build step is needed.

**On a web server (Apache or cPanel).** Upload the contents of `build/` to the web root, for example `public_html/`.
The included `.htaccess` sets clean addresses, caching and compression. All 130 site pages are generated ahead of time
in both languages, so reloading a site page works on any static server.

**Locally.** Serve the folder from its root:

```sh
cd build
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Everything works except AI comments, which need PHP. A prepared text is shown instead.

### AI comments (optional)

`build/api/yorum.php` sends the calculated results to the Groq API (model `openai/gpt-oss-20b`) and returns a short
comment. The API key is never stored in this repository. Provide it in one of these ways:

- set the `GROQ_API_KEY` environment variable on the server, or
- create `groq-secrets.php` one level above the web root (outside `public_html/`):

```php
<?php return ['GROQ_API_KEY' => 'your-key'];
```

The endpoint caches answers and limits requests per visitor. Its working files are kept outside the web root.

## Built with

Svelte 5 and SvelteKit (static adapter), TypeScript, Vite, Tailwind CSS, Three.js, SVG and Canvas 2D, GSAP.
Data pipeline in Python. AI endpoint in PHP.

## License

GPL-2.0. See [`LICENSE`](LICENSE). The source code and data pipeline are available from the authors on request.

---

## Türkçe özet

LUNARIS, Ay güney kutbunda iniş noktası ve tarihini Güneş (güç) ve Dünya (iletişim) koşullarına göre karşılaştıran
iki dilli bir web aracıdır. Quasar Team, NASA Space Apps Challenge 2026 için geliştirdi. Her aday sahanın arazi ufku
NASA efemerisi ve LOLA yükseklik verisinden çıkarılır, Güneş ve Dünya'nın bu ufkun üstünde kaldığı süreler hesaplanır.

Bu depoda derlenmiş site (`build/`) bulunur. `build/` klasörünün içeriği sunucunun kök klasörüne (`public_html/`)
yüklenir. Yerelde denemek için `cd build && python3 -m http.server 8000` yeterlidir. AI yorumu isteğe bağlıdır;
Groq anahtarı `public_html/` klasörünün bir üstündeki `groq-secrets.php` dosyasına yazılır ve depoya girmez.
LUNARIS bir sahanın iniş için güvenli olduğunu kanıtlamaz; sınırlamalar yukarıda ve sitenin Hakkında sayfasında yazılıdır.
