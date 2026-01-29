// CANcast Project Updates
const updates = [
    {
        date: "2026-01-28",
        title: "Layout Ready for Production",
        description: "Think I've got the layout pretty much dialed in with all the necessary components for production. The board is only 46 by 32mm so it was a bit of a challenge fitting everything in that small of a footprint, but all the DRC checks are passing so everything checks out until we can test the real thing. Going to double check the OBD-II pinout one more time before I finalize everything and send it off. Planning to order the first prototype soon.",
        media: [
            { type: "image", src: "images/CANcast_layout.png", caption: "CANcast PCB layout" }
        ]
    },
    {
        date: "2026-01-23",
        title: "Power Muxing Research",
        description: "Ran into a design challenge with powering the board. CANcast gets power from the car battery through the OBD-II port, but I also want to be able to program and debug it at my desk without the car connected. Started looking into power muxing and found the TPS2116 from TI. It has a priority mode so I can set USB as the secondary source and OBD-II 12V (regulated down) as the primary, and it just switches over automatically. The nice thing is it doesn't use OR-ing diodes so there's no big voltage drop like you'd get with a traditional diode setup. Pretty clean solution.",
        media: [
            { type: "image", src: "images/power_Mux_blockdiagram.png", caption: "TPS2116 power mux block diagram" },
            { type: "image", src: "images/kicad_power_mux.png", caption: "KiCad schematic for power muxing circuit" }
        ]
    },
    {
        date: "2026-01-18",
        title: "OBD-II Breadboard Testing",
        description: "Got an OBD-II cable and connector in and put together a small breadboard setup to start testing things out. Running an ESP32-S3 devkit with the pinout going into the breadboard so I can tap into the power pins and CAN bus lines through a small CAN transceiver. Hooked it up to my truck and was able to figure out where the MS and HS CAN buses are on the connector. Even managed to decode some messages like turn signals and RPM. Good starting point before committing to a PCB layout.",
        media: [
            { type: "image", src: "images/obd_breadboard.jpg", caption: "OBD-II breadboard test setup with ESP32-S3 and CAN transceiver" }
        ]
    },
    {
        date: "2026-01-12",
        title: "Project Started",
        description: "Started development on CANcast, an OBD-II CAN bus reader that will broadcast vehicle data over ESP-NOW. This will be the companion device to GlowLink, providing real-time vehicle telemetry like RPM, speed, turn signals, and other CAN data that peripherals can use.",
        media: []
    }
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
