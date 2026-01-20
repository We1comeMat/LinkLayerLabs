// CANcast Project Updates
const updates = [
    {
        date: "2026-01-19",
        title: "Project Started",
        description: "Started development on CANcast, an OBD-II CAN bus reader that will broadcast vehicle data over ESP-NOW. This will be the companion device to GlowLink, providing real-time vehicle telemetry like RPM, speed, turn signals, and other CAN data that peripherals can use.",
        media: []
    }
    // Add more updates here as you work on the project
];

// Render updates to the timeline
function renderUpdates() {
    const timeline = document.getElementById('updates-timeline');
    if (!timeline) return;

    if (updates.length === 0) {
        timeline.innerHTML = '<p class="no-updates">No updates yet. Check back soon!</p>';
        return;
    }

    // Sort updates by date (newest first)
    const sortedUpdates = [...updates].sort((a, b) => new Date(b.date) - new Date(a.date));

    timeline.innerHTML = sortedUpdates.map(update => {
        const date = new Date(update.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const mediaHTML = update.media ? update.media.map(item => {
            if (item.type === 'image') {
                return `
                    <div class="update-media-item">
                        <img src="${item.src}" alt="${item.caption || 'Update image'}" onclick="openLightbox('${item.src}', '${item.caption || ''}')">
                        ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ''}
                    </div>
                `;
            } else if (item.type === 'video') {
                return `
                    <div class="update-media-item">
                        <video controls autoplay loop muted playsinline>
                            <source src="${item.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ''}
                    </div>
                `;
            } else if (item.type === 'youtube') {
                const aspectRatio = item.aspectRatio || '16/9';
                return `
                    <div class="update-media-item">
                        <iframe
                            src="https://www.youtube.com/embed/${item.videoId}?autoplay=1&loop=1&mute=1&playlist=${item.videoId}&controls=1&modestbranding=1&playsinline=1"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style="width: 100%; aspect-ratio: ${aspectRatio}; border-radius: 8px;">
                        </iframe>
                        ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ''}
                    </div>
                `;
            }
            return '';
        }).join('') : '';

        return `
            <div class="update-item">
                <div class="update-date">${formattedDate}</div>
                <div class="update-content">
                    <h3 class="update-title">${update.title}</h3>
                    <p class="update-description">${update.description}</p>
                    ${mediaHTML ? `<div class="update-media">${mediaHTML}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Lightbox functionality - make globally accessible
window.openLightbox = function(src, caption) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeLightbox = function() {
    const lightbox = document.getElementById('image-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderUpdates();

    // Close lightbox on background click or Escape key
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                window.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.closeLightbox();
            }
        });
    }
});
