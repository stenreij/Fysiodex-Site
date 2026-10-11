/* ============================================
   ROLE SELECTOR
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const roleCards = document.querySelectorAll('.role-card[data-role]');
    const fysioSection = document.getElementById('content-fysio');
    const patientSection = document.getElementById('content-patient');

    if (!roleCards.length || !fysioSection || !patientSection) {
        console.warn('Role selector: elementen niet gevonden');
        return;
    }

    // TIMEOUT: 1 HOUR
    const EXPIRY_TIME = 1 * 60 * 60 * 1000;

    // RETRIEVE SAVED ROLE AND TIMESTAMP FROM LOCAL STORAGE
    const savedRole = localStorage.getItem('fysiodex-role');
    const savedTimestamp = localStorage.getItem('fysiodex-role-timestamp');

    // CHECK IF SAVED ROLE IS STILL VALID
    if (savedRole && savedTimestamp) {
        const age = Date.now() - parseInt(savedTimestamp, 10);
        
        if (age < EXPIRY_TIME) {
            // IS VALID → SHOW CONTENT
            showContent(savedRole, false);
        } else {
            // IS EXPIRED → REMOVE FROM LOCAL STORAGE
            localStorage.removeItem('fysiodex-role');
            localStorage.removeItem('fysiodex-role-timestamp');
        }
    }

    // CLICK HANDLERS
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.dataset.role;
            showContent(role, true);
            
            // SAVE CHOICE
            localStorage.setItem('fysiodex-role', role);
            localStorage.setItem('fysiodex-role-timestamp', Date.now().toString());
        });
    });

    function showContent(role, scroll = true) {
        fysioSection.hidden = true;
        patientSection.hidden = true;

        let target = null;
        if (role === 'fysio') {
            fysioSection.hidden = false;
            target = fysioSection;
        } else if (role === 'patient') {
            patientSection.hidden = false;
            target = patientSection;
        }

        roleCards.forEach(card => {
            if (card.dataset.role === role) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        if (target && scroll) {
            const targetY = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    }
});