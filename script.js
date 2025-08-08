const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');
const closeBtn = document.getElementById('close-btn');

// Container for multiple images inside overlay
const multiImgContainer = document.createElement('div');
multiImgContainer.id = 'multi-img-container';
multiImgContainer.style.display = 'flex';
multiImgContainer.style.flexDirection = 'column';
multiImgContainer.style.gap = '10px';
multiImgContainer.style.maxHeight = '95vh';
multiImgContainer.style.overflowY = 'auto';
multiImgContainer.style.alignItems = 'center';

overlay.appendChild(multiImgContainer);

// Show single image by default
overlayImg.style.display = 'block';
multiImgContainer.style.display = 'none';

// Detail images URLs for days 1 and 2
const day1_detail_images = [
  'https://www.spc.noaa.gov/products/outlook/day1probotlk_wind.gif',
  'https://www.spc.noaa.gov/products/outlook/day1probotlk_hail.gif',
  'https://www.spc.noaa.gov/products/outlook/day1probotlk_torn.gif',
];

const day2_detail_images = [
  'https://www.spc.noaa.gov/products/outlook/day2probotlk_wind.gif',
  'https://www.spc.noaa.gov/products/outlook/day2probotlk_hail.gif',
  'https://www.spc.noaa.gov/products/outlook/day2probotlk_torn.gif',
];

// Day 3 probabilistic detail image
const day3_detail_image = 'https://www.spc.noaa.gov/products/outlook/day3prob.gif';

// Grid thumbnails URLs
const outlooks = [];

// Days 1-3 thumbnails
for (let day = 1; day <= 3; day++) {
  outlooks.push({ day, url: `https://www.spc.noaa.gov/products/outlook/day${day}otlk.gif` });
}

// Days 4-8 thumbnails
for (let day = 4; day <= 8; day++) {
  outlooks.push({ day, url: `https://www.spc.noaa.gov/products/exper/day4-8/day${day}prob.gif` });
}

outlooks.forEach(({ day, url }) => {
  const img = document.createElement('img');
  img.src = url;
  img.alt = `NOAA SPC Outlook Day ${day}`;
  img.title = `Day ${day} Outlook (Click to enlarge)`;
  img.loading = 'lazy';

  img.addEventListener('click', () => {
    // Clear overlay
    multiImgContainer.innerHTML = '';

    if (day === 1) {
      // Show standard outlook + day1 details
      overlayImg.src = url;
      overlayImg.alt = `Standard NOAA SPC Day 1 Outlook`;
      overlayImg.style.display = 'block';

      multiImgContainer.style.display = 'flex';
      multiImgContainer.appendChild(overlayImg);

      day1_detail_images.forEach(src => {
        const detailImg = document.createElement('img');
        detailImg.src = src;
        detailImg.alt = 'Day 1 SPC Detail';
        detailImg.style.maxWidth = '90vw';
        detailImg.style.width = 'auto';
        detailImg.style.height = 'auto';
        detailImg.style.maxHeight = '30vh';
        detailImg.style.objectFit = 'contain';
        detailImg.style.borderRadius = '12px';
        multiImgContainer.appendChild(detailImg);
      });

    } else if (day === 2) {
      // Show standard outlook + day2 details
      overlayImg.src = url;
      overlayImg.alt = `Standard NOAA SPC Day 2 Outlook`;
      overlayImg.style.display = 'block';

      multiImgContainer.style.display = 'flex';
      multiImgContainer.appendChild(overlayImg);

      day2_detail_images.forEach(src => {
        const detailImg = document.createElement('img');
        detailImg.src = src;
        detailImg.alt = 'Day 2 SPC Detail';
        detailImg.style.maxWidth = '90vw';
        detailImg.style.width = 'auto';
        detailImg.style.height = 'auto';
        detailImg.style.maxHeight = '30vh';
        detailImg.style.objectFit = 'contain';
        detailImg.style.borderRadius = '12px';
        multiImgContainer.appendChild(detailImg);
      });

    } else if (day === 3) {
      // Show standard outlook + day3 probabilistic
      overlayImg.src = url;
      overlayImg.alt = `Standard NOAA SPC Day 3 Outlook`;
      overlayImg.style.display = 'block';

      multiImgContainer.style.display = 'flex';
      multiImgContainer.appendChild(overlayImg);

      const probImg = document.createElement('img');
      probImg.src = day3_detail_image;
      probImg.alt = 'Day 3 SPC Probabilistic Detail';
      probImg.style.maxWidth = '90vw';
      probImg.style.width = 'auto';
      probImg.style.height = 'auto';
      probImg.style.maxHeight = '30vh';
      probImg.style.objectFit = 'contain';
      probImg.style.borderRadius = '12px';

      multiImgContainer.appendChild(probImg);

    } else {
  // Days 4-8 normal single image overlay
  overlayImg.src = url;
  overlayImg.alt = `Expanded NOAA SPC Outlook Day ${day}`;
  overlayImg.style.display = 'block';

  // Hide multiImgContainer
  multiImgContainer.style.display = 'none';

  // Ensure overlayImg is inside overlay (append if not)
  if (!overlay.contains(overlayImg)) {
    overlay.appendChild(overlayImg);
  }
}


    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  gallery.appendChild(img);
});

closeBtn.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => {
  if (e.target === overlay || e.target === closeBtn) {
    closeOverlay();
  }
});

function closeOverlay() {
  overlay.classList.add('hidden');
  overlayImg.src = '';
  multiImgContainer.innerHTML = '';
  document.body.style.overflow = '';
}
