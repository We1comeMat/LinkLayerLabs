// GlowLink Project Updates
const updates = [
    {
        date: "2025-12-30",
        title: "Project Launched",
        description: "Started development on GlowLink - an ESP32-based automotive LED controller. Initial PCB design completed in KiCad with dual WS2811 outputs and OBD-II integration.",
        media: [
            { type: "image", src: "images/GlowLink_PCB_Front.png", caption: "PCB Front View" },
            { type: "image", src: "images/GlowLink_PCB_Back.png", caption: "PCB Back View" }
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
                        <video controls>
                            <source src="${item.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
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
