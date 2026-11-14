# Higgsfield visual production plan

## Style guide (applies to every asset)

- **Look:** realistic documentary construction photography; full-frame camera, 35 mm lens (50 mm for details); natural colour grade.
- **Light and palette:** low warm sun (early morning or late afternoon), deep blue sky, signal-yellow plant, concrete grey and laterite red. This matches the site's navy / concrete / yellow palette.
- **Setting:** Guyana. Flat coastal plain with canals and coconut palms, or interior savannah and forest edge.
- **People:** few, small in frame, seen from behind, in hard hats and hi-vis vests. No recognisable faces.
- **Never:** text, numbers, logos, decals, signage, brand names, watermarks, impossible machinery or structures.
- **Honesty rule:** every image is captioned "Illustrative image" on the site. None is used on a project card. Project cards accept genuine photographs only.

## Images produced (Higgsfield Soul 2.0, 2K)

| # | File | Subject | Ratio | Where used |
| --- | --- | --- | --- | --- |
| 1 | hero-home | Aerial three-quarter view of asphalt road construction with paver, rollers, drain and palms | 16:9 | Home hero; social sharing image |
| 2 | water-well | Truck-mounted rotary rig drilling on Rupununi savannah | 3:2 | Water service hero and card |
| 3 | water-mains | Blue pressure pipes laid in a roadside trench | 3:2 | About (overview) |
| 4 | water-trestle | Elevated tank trestle, solar array and well head in a village | 3:2 | Home (who we are); Water service |
| 5 | bridge | Short-span concrete bridge under construction over a creek | 3:2 | Projects hero; Civil service |
| 6 | road-hinterland | Grader and roller on a laterite all-weather road | 3:2 | Services hero; Civil service hero and card |
| 7 | building | Two-storey concrete frame building under construction | 3:2 | Building service; About (commitment) |
| 8 | sea-defence | Excavator placing rip-rap on a coastal embankment | 3:2 | Coastal service |
| 9 | drainage | Long-reach excavator on a canal with sluice, rice fields | 3:2 | Drainage service hero and card |
| 10 | culvert | Concrete culvert installation under a road | 3:2 | Drainage service (secondary) |
| 11 | equipment | Row of plant in a yard at golden hour | 3:2 | Equipment Rental |
| 12 | about-drawings | Drawings, hard hat and gloved hands on a site table | 3:2 | About hero |
| 13 | contact-survey | Total station on a graded site at dawn | 3:2 | Contact hero; Home contact section |

No image is the hero of more than one page. Post-production (`scripts/optimise-images.py`) painted out stray lettering the model added to machinery and one line of pseudo-text in the hero, and cropped a spirit level carrying pseudo-text out of image 12.

**Account note.** The Higgsfield account is on the free plan with a small credit balance. Only Soul 2.0 was available (other image models and all higher tiers returned "Requires basic plan or higher"), and jobs run one at a time. About 1.6 of 10 credits were used.

## Still to produce (needs a paid Higgsfield plan)

### Videos

| # | Use | Subject and camera movement | Ratio / length | Notes |
| --- | --- | --- | --- | --- |
| V1 | Home hero background loop | Image-to-video from `hero-home`: slow forward aerial drift along the road, rollers creeping, palm fronds moving | 16:9, 6–8 s, 1080p, seamless loop | Muted, autoplay, poster = current still. Encode H.264 + WebM under ~2.5 MB; do not load on mobile data or when reduced motion is set |
| V2 | Water service header | From `water-well`: static tripod shot, mast turning, dust drifting | 16:9, 5 s | Optional |
| V3 | Civil service header | From `road-hinterland`: slow lateral tracking shot as grader passes | 16:9, 5 s | Optional |
| V4 | Social reel | Cut of V1–V3 plus stills, ending on wordmark and slogan | 9:16, 15 s | Add text in an editor, not in the generator |

### Additional images

| Use | Subject | Ratio |
| --- | --- | --- |
| Home hero, portrait crop for phones | Same scene as `hero-home`, composed vertically | 4:5 |
| Water service gallery | Pump test at a well head; standpipe running in a village | 3:2 |
| Building service | Rehabilitation scene: re-roofing an existing public building | 3:2 |
| Drainage service | Reinforced concrete drain being cast along a housing scheme road | 3:2 |
| Social templates | Clean plates with a dark lower third for text | 1:1 and 4:5 |

### Prompt template

> Realistic documentary construction photograph: [subject and action], [Guyana setting], [plain yellow machinery, unbranded], warm late-afternoon sunlight, deep blue sky. [People: few, distant, from behind, hard hats and hi-vis]. Correct real-world proportions, natural colour grade, 35mm lens, sharp detail. No text, no letters, no numbers, no logos, no decals, no signage, no brand names, no watermark.

## Integrating assets you supply

1. Save the file in `raw-assets/` (images) or send the video.
2. Inspect for text, logos, distorted plant or anything implying a specific real project.
3. Run `npm run images`, then set the image name in the relevant data file or page.
4. Genuine project photographs go in `src/assets/projects/` and are attached to a project via its `photo` field. They always take priority over illustrative imagery.
