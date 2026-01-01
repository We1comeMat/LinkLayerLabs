// GlowLink Project Updates
const updates = [
    {
        date: "2025-12-28",
        title: "Project Launched",
        description: "Started development on GlowLink - an ESP32-based automotive LED controller. Initial PCB design completed in KiCad with dual WS2811 outputs and wireless ESP-NOW communication.",
        media: [
            { type: "image", src: "images/GlowLink_PCB_Front.png", caption: "PCB Front View" },
            { type: "image", src: "images/GlowLink_PCB_Back.png", caption: "PCB Back View" }
        ]
    },
    {
        date: "2025-12-30",
        title: "LED Strip Testing",
        description: "Received the WS2811 LED strips and successfully tested them with an ESP32-S3 DevKit. Used a logic level shifter to convert the 3.3V data signal to 5V for proper WS2811 control. Running test patterns to verify color accuracy and timing.",
        media: [
            { type: "youtube", videoId: "gXpHu_0eU44", caption: "WS2811 test patterns running on ESP32-S3" }
        ]
    },
    {
        date: "2026-01-01",
        title: "Logic Level Shifter Issue",
        description: "Found a level shifting issue with the BSS138 shifter I was using to convert 3.3V to 5V for the LED data line. The shifter uses a pull-up resistor design that can't drive the line all the way to 5V fast enough. On the scope, the output jumps to about 3.1V, then slowly ramps up. On a 900ns pulse it only reaches about 4.1V before the signal drops again, never hitting the expected 5V logic high.\n\nTo see how long it actually takes the pull-up circuit to reach 5V, I ran a test with a longer pulse. It took about 3 microseconds from when the 3.3V signal goes high to when the output finally reaches roughly 5V. This seems too slow for the WS2811's sub-microsecond timing requirements.\n\nI ordered some SN74AHCT125N buffers to test on the breadboard. These should give me an active drive on both high and low states with clean and fast transitions. Planning to verify proper 5V signals before I finalize the PCB design.",
        media: [
            { type: "image", src: "images/level_shift_issue.png", caption: "Yellow trace is the 3.3V signal from the MCU, purple is the slow ramping 5V output" },
            { type: "image", src: "images/level_timing_test.png", caption: "Extended pulse test showing it takes ~3µs for the pull-up circuit to reach 5V" }
        ]
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
                return `
                    <div class="update-media-item">
                        <iframe
                            src="https://www.youtube.com/embed/${item.videoId}?autoplay=1&loop=1&mute=1&playlist=${item.videoId}&controls=1&modestbranding=1&playsinline=1"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            style="width: 100%; aspect-ratio: 9/16; border-radius: 8px;">
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
