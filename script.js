document.addEventListener('DOMContentLoaded', () => {
    // 1. Gatekeeper Text Setup
    document.getElementById('gateQuestion').textContent = birthdayData.gatekeeper.question;
    document.getElementById('gateSubtext').textContent = birthdayData.gatekeeper.subtext;
    document.getElementById('yesBtn').textContent = birthdayData.gatekeeper.yesBtn;
    document.getElementById('noBtn').textContent = birthdayData.gatekeeper.noBtn;

    // 2. Evasive "No" Button
    const noBtn = document.getElementById('noBtn');
    function escapeNoBtn() {
        const x = Math.random() * (window.innerWidth - 120);
        const y = Math.random() * (window.innerHeight - 60);
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }
    noBtn.addEventListener('mouseover', escapeNoBtn);
    noBtn.addEventListener('click', escapeNoBtn);

    // 3. Unlock Dashboard
    const yesBtn = document.getElementById('yesBtn');
    const gatekeeper = document.getElementById('gatekeeper');
    const mainContent = document.getElementById('mainContent');

    yesBtn.addEventListener('click', () => {
        gatekeeper.classList.add('hidden');
        mainContent.classList.remove('hidden');
        fireConfetti();
        initDisneyDashboard();
    });

    function fireConfetti() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
    }

    // 4. Dashboard & Timer Logic
    function initDisneyDashboard() {
        document.getElementById('heroTitle').textContent = `HAPPY BIRTHDAY, ${birthdayData.birthdayGirlName.toUpperCase()}!`;
        document.getElementById('navProfileName').textContent = birthdayData.birthdayGirlName;

        // START LIVE LIFETIME TIMER & STATS
        const birthDateObj = new Date(birthdayData.birthDate);

        function updateLiveStats() {
            const now = new Date();
            const diffMs = now - birthDateObj;

            if (diffMs > 0) {
                const totalSeconds = Math.floor(diffMs / 1000);
                const totalMinutes = Math.floor(totalSeconds / 60);
                const totalHours = Math.floor(totalMinutes / 60);
                const totalDays = Math.floor(totalHours / 24);
                const years = Math.floor(totalDays / 365.25);
                const daysRemaining = Math.floor(totalDays % 365.25);

                const hours = totalHours % 24;
                const minutes = totalMinutes % 60;
                const seconds = totalSeconds % 60;

                document.getElementById('yearsCount').textContent = String(years).padStart(2, '0');
                document.getElementById('daysCount').textContent = String(daysRemaining).padStart(2, '0');
                document.getElementById('hoursCount').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutesCount').textContent = String(minutes).padStart(2, '0');
                document.getElementById('secondsCount').textContent = String(seconds).padStart(2, '0');

                // Dynamic Live Estimates
                const approxHeartbeats = Math.floor(totalMinutes * 80).toLocaleString();
                const approxSleepHours = Math.floor(totalDays * 8.5).toLocaleString();
                const approxSunrises = totalDays.toLocaleString();

                document.getElementById('heartbeatCount').textContent = approxHeartbeats;
                document.getElementById('sleepCount').textContent = approxSleepHours;
                document.getElementById('sunrisesCount').textContent = approxSunrises;
            }
        }

        updateLiveStats();
        setInterval(updateLiveStats, 1000);

        // Brand Hubs
        const brandHubs = document.getElementById('brandHubs');
        brandHubs.innerHTML = birthdayData.brands.map(b => `
            <div class="brand-card" style="background: ${b.color};">
                <div class="icon">${b.icon}</div>
                <span>${b.name}</span>
            </div>
        `).join('');

        // Photo Grid
        const photoGrid = document.getElementById('photoGrid');
        photoGrid.innerHTML = birthdayData.photos.map(p => `
            <div class="disney-tile">
                <img src="${p.url}" alt="${p.caption}">
                <p>${p.caption}</p>
            </div>
        `).join('');

        // Songs Playlist
        const musicList = document.getElementById('musicList');
        const bgAudio = document.getElementById('bgAudio');
        musicList.innerHTML = birthdayData.songs.map(s => `
            <div class="music-card" onclick="playTrack('${s.file}')">
                <img src="${s.cover}">
                <div>
                    <h4>${s.title}</h4>
                    <small style="color:#94a3b8">${s.source}</small>
                </div>
            </div>
        `).join('');

        window.playTrack = (file) => {
            bgAudio.src = file;
            bgAudio.play();
        };

        // Candle Blow
        const blowBtn = document.getElementById('blowBtn');
        function blowOutCandles() {
            document.getElementById('flame1').classList.add('off');
            document.getElementById('flame2').classList.add('off');
            fireConfetti();
            blowBtn.textContent = "Wish Granted! ✨";
        }
        blowBtn.addEventListener('click', blowOutCandles);

        // Letter Envelope
        const envelopeCard = document.getElementById('envelopeCard');
        const letterBody = document.getElementById('letterBody');
        envelopeCard.addEventListener('click', () => {
            letterBody.classList.remove('hidden');
            letterBody.textContent = birthdayData.letter.body;
        });

        // Vouchers Grid
        const voucherGrid = document.getElementById('voucherGrid');
        voucherGrid.innerHTML = birthdayData.vouchers.map(v => `
            <div class="voucher-card">
                <div class="icon">${v.icon}</div>
                <h3>${v.title}</h3>
                <small>Pass Code: ${v.code}</small>
            </div>
        `).join('');
    }
});
