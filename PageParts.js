
document.addEventListener("DOMContentLoaded", () => {
    fetch("Footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });

    // loading components.js
    document.querySelectorAll('script[type="text/x-dc"]').forEach(async (scriptTag) => {
        const scriptUrl = scriptTag.getAttribute('data-dc-script');
        const rawProps = scriptTag.getAttribute('data-props') || '{}';
        const props = JSON.parse(rawProps);

        if (scriptUrl) {
            try {
                // Fetch and execute the external component file
                const response = await fetch(scriptUrl);
                const scriptContent = await response.text();

                // Execute code and make props available to it
                const runComponent = new Function('props', scriptContent);
                runComponent(props);
            } catch (error) {
                console.error(`Failed to load DC component from ${scriptUrl}:`, error);
            }
        }
    });

});