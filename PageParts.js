
document.addEventListener("DOMContentLoaded", () => {
    fetch("Footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
    googleAnalytics();

    //MS clarity
    (function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y20gthhmip");
    
    // loading components.js
    /*document.querySelectorAll('script[type="text/x-dc"]').forEach(async (scriptTag) => {
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
    });*/

});

function googleAnalytics() {
    
    window.dataLayer = window.dataLayer || [];
    function gtag() {dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-3NNPMHP6Y3');    
}