document.addEventListener('DOMContentLoaded', function() {
    // Function to create link preview
    function createLinkPreview(url) {
        fetch('/api/link-preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching link preview:', data.error);
                return;
            }

            const previewContainer = document.createElement('div');
            previewContainer.className = 'link-preview';
            
            let previewHTML = `
                <div class="link-preview-content">
                    <a href="${data.url}" target="_blank" rel="noopener noreferrer">
                        <div class="link-preview-image">
                            ${data.image ? `<img src="${data.image}" alt="${data.title}">` : ''}
                        </div>
                        <div class="link-preview-text">
                            <h3>${data.title}</h3>
                            <p>${data.description || ''}</p>
                            <span class="link-preview-url">${data.url}</span>
                        </div>
                    </a>
                </div>
            `;
            
            previewContainer.innerHTML = previewHTML;
            return previewContainer;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Add event listener for contenteditable elements
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.addEventListener('paste', function(e) {
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (pastedText.match(/^https?:\/\//)) {
                e.preventDefault();
                const preview = createLinkPreview(pastedText);
                if (preview) {
                    this.parentNode.insertBefore(preview, this.nextSibling);
                }
            }
        });
    });
}); 