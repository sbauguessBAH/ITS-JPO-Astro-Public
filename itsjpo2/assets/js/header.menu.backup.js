async function injectHTML(url, element) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.error('Error fetching the HTML file:', error);
    }
}

async function addActiveClass(path, mappings) {
    for (const [key, value] of Object.entries(mappings)) {
        if (path.includes(key)) {
            document.getElementById(value).classList.add('activeMenu');
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    const menuMappings = {
        '/about': 'menuAbout',
        '/stratplan2020': 'menuAbout',
        '/history': 'menuAbout',
        '/itspac': 'menuAbout',
        '/research_area': 'menuResearch',
        '/deployment': 'menuDeployment',
        '/press': 'menuCommunications',
        '/communications': 'menuCommunications',
        '/infographs': 'menuCommunications',
        '/resources': 'menuResources',
        '/contacts': 'menuContacts'
    };

    const menuContainer = document.getElementById("menu-container");
    const footerContainer = document.getElementById("footer-container");

    await Promise.all([
        injectHTML("/nav.html", menuContainer),
        injectHTML("/footer.html", footerContainer)
    ]);

    console.log('HTML injected and now running additional script.');
    addActiveClass(path, menuMappings);
});
