function startScript() {
    const sections = document.querySelectorAll('section');
    const bubble = document.querySelector('.bubble');

    const options = {
        threshold: 0.7
    };

    let observer = new IntersectionObserver(navCheck, options);

    function navCheck(entries) {
        entries.forEach(entry => {
            const entryId = entry.target.id;
            const activeAnchor = document.querySelector(`[data-page=${entryId}]`);
            const coords = activeAnchor.getBoundingClientRect();
            const directions = {
                height: coords.height,
                width: coords.width,
                top: coords.top,
                left: coords.left
            };

            if (entry.isIntersecting) {
                if (entry.target.id == 'experience') {
                    console.log("a");
                    const bars = document.querySelectorAll(".st_line-bar-empty");
                    bars.forEach(b => {
                        b.classList.remove("st_line-bar-empty");
                        b.classList.add("st_line-bar-fill");
                    });
                } else {
                    const bars = document.querySelectorAll(".st_line-bar-fill");
                    bars.forEach(b => {
                        b.classList.add("st_line-bar-empty");
                        b.classList.remove("st_line-bar-fill");
                    });
                }

                sections.forEach(section => {
                    section.setAttribute('active', 'false');
                });
                entry.target.setAttribute('active', 'true');
                bubble.style.setProperty('left', `${directions.left}px`);
                bubble.style.setProperty('top', `${directions.top + directions.height + 7}px`);
                bubble.style.setProperty('width', `${directions.width}px`);
                bubble.style.setProperty('height', `7px`);
            }
        });
    }

    sections.forEach(section => {
        observer.observe(section);
    });

}