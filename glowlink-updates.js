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
                        <img src="${item.src}" alt="${item.caption || 'Update image'}">
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', renderUpdates);
