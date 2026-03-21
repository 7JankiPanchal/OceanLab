// ================================
// EcoSort - Interactive JS
// ================================

// 1️⃣ Search Centers
const searchInput = document.querySelector('input[placeholder="Search centers or addresses"]');
const centerCards = document.querySelectorAll('main .flex-1 .flex > div');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    centerCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const address = card.querySelector('p').textContent.toLowerCase();
        card.style.display = name.includes(query) || address.includes(query) ? 'flex' : 'none';
    });
});

// 2️⃣ Waste Filter Buttons
const filterButtons = document.querySelectorAll('aside button');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.querySelector('span:nth-child(2)').textContent.toLowerCase();

        // Filter cards
        centerCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('span')).map(s => s.textContent.toLowerCase());
            card.style.display = tags.some(t => t.includes(type)) ? 'flex' : 'none';
        });

        // Highlight selected filter
        filterButtons.forEach(b => b.classList.remove('bg-primary/10', 'text-primary'));
        btn.classList.add('bg-primary/10', 'text-primary');
    });
});

// 3️⃣ Map Markers Click
const markers = document.querySelectorAll('.absolute.group.cursor-pointer');
markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
        const card = centerCards[index];
        card.scrollIntoView({ behavior: 'smooth', inline: 'start' });

        // Highlight card temporarily
        card.classList.add('ring-2', 'ring-primary');
        setTimeout(() => card.classList.remove('ring-2', 'ring-primary'), 2000);
    });
});

// 4️⃣ "Get Directions" Buttons
centerCards.forEach(card => {
    const btn = card.querySelector('button');
    const address = card.querySelector('p').textContent;

    btn.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    });
});

// 5️⃣ Sidebar Navigation
const menuLinks = document.querySelectorAll('aside nav a');
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        menuLinks.forEach(l => l.classList.remove('bg-primary/10', 'text-primary'));
        link.classList.add('bg-primary/10', 'text-primary');

        // Placeholder for future scroll-to-section
        console.log(`Clicked menu: "${link.textContent.trim()}"`);
    });
});

let activeFilters = [];
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.querySelector('span:nth-child(2)').textContent.toLowerCase();
        if (activeFilters.includes(type)) {
            activeFilters = activeFilters.filter(f => f !== type);
            btn.classList.remove('bg-primary/10', 'text-primary');
        } else {
            activeFilters.push(type);
            btn.classList.add('bg-primary/10', 'text-primary');
        }

        // Show cards matching any active filter
        centerCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('span')).map(s => s.textContent.toLowerCase());
            card.style.display = activeFilters.length === 0 || tags.some(t => activeFilters.includes(t)) ? 'flex' : 'none';
        });
    });
});
