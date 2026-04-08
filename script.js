const userLang = navigator.language.slice(0, 2);

const lang = translations[userLang] ? userLang : "en";

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        currentType: 'url',
        currentStyle: 'square',
        colorDark: '#000000',
        colorLight: '#ffffff',
        logoImage: null,
        qrData: '',
        zoom: 1
    };

    const elements = {
        formContainer: document.getElementById('form-container'),
        qrDisplay: document.getElementById('qr-display'),
        generateBtn: document.getElementById('generate-btn'),
        downloadSection: document.getElementById('download-section'),
        colorDark: document.getElementById('color-dark'),
        colorLight: document.getElementById('color-light'),
        logoUpload: document.getElementById('logo-upload'),
        clearLogo: document.getElementById('clear-logo'),
        fileName: document.getElementById('file-name'),
        downloadPNG: document.getElementById('download-png'),
        downloadSVG: document.getElementById('download-svg'),
        downloadPDF: document.getElementById('download-pdf'),
        zoomIn: document.getElementById('zoom-in'),
        zoomOut: document.getElementById('zoom-out'),
        typeButtons: document.querySelectorAll('.type-card'),
        styleButtons: document.querySelectorAll('.style-btn'),
    };

    const formTemplates = {
        url: `
            <div class="form-group">
                <label>URL o enlace web</label>
                <input type="url" id="input-url" placeholder="https://ejemplo.com">
            </div>
        `,
        email: `
            <div class="form-group">
                <label>Dirección de correo</label>
                <input type="email" id="input-email" placeholder="hola@ejemplo.com">
            </div>
            <div class="form-group">
                <label>Asunto (opcional)</label>
                <input type="text" id="input-subject" placeholder="Asunto del correo">
            </div>
            <div class="form-group">
                <label>Mensaje (opcional)</label>
                <textarea id="input-body" placeholder="Mensaje del correo..."></textarea>
            </div>
        `,
        text: `
            <div class="form-group">
                <label>Texto</label>
                <textarea id="input-text" placeholder="Escribe tu texto aquí..."></textarea>
            </div>
        `,
        call: `
            <div class="form-group">
                <label>Número de teléfono</label>
                <input type="tel" id="input-phone" placeholder="+54 11 1234 5678">
            </div>
        `,
        sms: `
            <div class="form-group">
                <label>Número de teléfono</label>
                <input type="tel" id="input-phone" placeholder="+54 11 1234 5678">
            </div>
            <div class="form-group">
                <label>Mensaje</label>
                <textarea id="input-message" placeholder="Tu mensaje SMS..."></textarea>
            </div>
        `,
        whatsapp: `
            <div class="form-group">
                <label>Número de WhatsApp (con código de país)</label>
                <input type="tel" id="input-phone" placeholder="+54 11 1234 5678">
            </div>
            <div class="form-group">
                <label>Mensaje predefinido (opcional)</label>
                <textarea id="input-message" placeholder="Hola, ¿cómo estás?"></textarea>
            </div>
        `,
        wifi: `
            <div class="form-group">
                <label>Nombre de la red (SSID)</label>
                <input type="text" id="input-ssid" placeholder="MiRedWiFi">
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="text" id="input-password" placeholder="ContraseñaWiFi">
            </div>
            <div class="form-group">
                <label>Tipo de seguridad</label>
                <select id="input-encryption">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="">Sin seguridad</option>
                </select>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="input-hidden">
                    Red oculta
                </label>
            </div>
        `,
        vcard: `
            <div class="form-group">
                <label>Nombre completo</label>
                <input type="text" id="input-name" placeholder="Juan Pérez">
            </div>
            <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="input-phone" placeholder="+54 11 1234 5678">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="input-email" placeholder="juan@ejemplo.com">
            </div>
            <div class="form-group">
                <label>Empresa (opcional)</label>
                <input type="text" id="input-org" placeholder="Empresa S.A.">
            </div>
            <div class="form-group">
                <label>Cargo (opcional)</label>
                <input type="text" id="input-title" placeholder="Director">
            </div>
            <div class="form-group">
                <label>Sitio web (opcional)</label>
                <input type="url" id="input-url" placeholder="https://ejemplo.com">
            </div>
        `,
        event: `
            <div class="form-group">
                <label>Título del evento</label>
                <input type="text" id="input-title" placeholder="Reunión de equipo">
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <input type="text" id="input-location" placeholder="Oficina Central, Sala 3">
            </div>
            <div class="form-group">
                <label>Descripción (opcional)</label>
                <textarea id="input-description" placeholder="Descripción del evento..."></textarea>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                <div class="form-group">
                    <label>Fecha inicio</label>
                    <input type="date" id="input-start-date">
                </div>
                <div class="form-group">
                    <label>Hora inicio</label>
                    <input type="time" id="input-start-time" value="09:00">
                </div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                <div class="form-group">
                    <label>Fecha fin</label>
                    <input type="date" id="input-end-date">
                </div>
                <div class="form-group">
                    <label>Hora fin</label>
                    <input type="time" id="input-end-time" value="10:00">
                </div>
            </div>
        `,
        instagram: `
            <div class="form-group">
                <label>Usuario de Instagram</label>
                <input type="text" id="input-username" placeholder="miusuario">
            </div>
        `,
        linkedin: `
            <div class="form-group">
                <label>URL del perfil de LinkedIn</label>
                <input type="url" id="input-url" placeholder="https://linkedin.com/in/usuario">
            </div>
        `,
        twitter: `
            <div class="form-group">
                <label>Usuario de Twitter/X (sin @)</label>
                <input type="text" id="input-username" placeholder="usuario">
            </div>
        `,
        bitcoin: `
            <div class="form-group">
                <label>Dirección Bitcoin</label>
                <input type="text" id="input-address" placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh">
            </div>
            <div class="form-group">
                <label>Cantidad (opcional)</label>
                <input type="number" id="input-amount" placeholder="0.001" step="0.00000001">
            </div>
            <div class="form-group">
                <label>Etiqueta (opcional)</label>
                <input type="text" id="input-label" placeholder="Donación">
            </div>
        `,
        location: `
            <div class="form-group">
                <label>Latitud</label>
                <input type="text" id="input-lat" placeholder="-34.6037">
            </div>
            <div class="form-group">
                <label>Longitud</label>
                <input type="text" id="input-lng" placeholder="-58.3816">
            </div>
            <div class="form-group">
                <label>Nombre del lugar (opcional)</label>
                <input type="text" id="input-name" placeholder="Buenos Aires">
            </div>
        `,
        paypal: `
            <div class="form-group">
                <label>Email de PayPal</label>
                <input type="email" id="input-email" placeholder="pago@ejemplo.com">
            </div>
            <div class="form-group">
                <label>Cantidad (opcional)</label>
                <input type="number" id="input-amount" placeholder="10.00" step="0.01">
            </div>
            <div class="form-group">
                <label>Moneda (opcional)</label>
                <select id="input-currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ARS">ARS</option>
                    <option value="GBP">GBP</option>
                </select>
            </div>
            <div class="form-group">
                <label>Descripción (opcional)</label>
                <input type="text" id="input-item" placeholder="Producto o servicio">
            </div>
        `
    };

    const dataBuilders = {
        url: () => {
            return document.getElementById('input-url')?.value.trim() || '';
        },
        email: () => {
            const email = document.getElementById('input-email')?.value.trim();
            const subject = document.getElementById('input-subject')?.value.trim();
            const body = document.getElementById('input-body')?.value.trim();
            if (!email) return '';
            let mailto = `mailto:${email}`;
            const params = [];
            if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
            if (body) params.push(`body=${encodeURIComponent(body)}`);
            if (params.length) mailto += '?' + params.join('&');
            return mailto;
        },
        text: () => {
            return document.getElementById('input-text')?.value.trim() || '';
        },
        call: () => {
            const phone = document.getElementById('input-phone')?.value.trim();
            return phone ? `tel:${phone}` : '';
        },
        sms: () => {
            const phone = document.getElementById('input-phone')?.value.trim();
            const message = document.getElementById('input-message')?.value.trim();
            if (!phone) return '';
            return `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
        },
        whatsapp: () => {
            const phone = document.getElementById('input-phone')?.value.trim().replace(/\s+/g, '');
            const message = document.getElementById('input-message')?.value.trim();
            if (!phone) return '';
            return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
        },
        wifi: () => {
            const ssid = document.getElementById('input-ssid')?.value.trim();
            const password = document.getElementById('input-password')?.value.trim();
            const encryption = document.getElementById('input-encryption')?.value;
            const hidden = document.getElementById('input-hidden')?.checked;
            if (!ssid) return '';
            return `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden ? 'true' : 'false'};;`;
        },
        vcard: () => {
            const name = document.getElementById('input-name')?.value.trim();
            const phone = document.getElementById('input-phone')?.value.trim();
            const email = document.getElementById('input-email')?.value.trim();
            const org = document.getElementById('input-org')?.value.trim();
            const title = document.getElementById('input-title')?.value.trim();
            const url = document.getElementById('input-url')?.value.trim();
            if (!name) return '';
            let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\n`;
            if (phone) vcard += `TEL;TYPE=CELL:${phone}\n`;
            if (email) vcard += `EMAIL:${email}\n`;
            if (org) vcard += `ORG:${org}\n`;
            if (title) vcard += `TITLE:${title}\n`;
            if (url) vcard += `URL:${url}\n`;
            vcard += `END:VCARD`;
            return vcard;
        },
        event: () => {
            const title = document.getElementById('input-title')?.value.trim();
            const location = document.getElementById('input-location')?.value.trim();
            const description = document.getElementById('input-description')?.value.trim();
            const startDate = document.getElementById('input-start-date')?.value;
            const startTime = document.getElementById('input-start-time')?.value;
            const endDate = document.getElementById('input-end-date')?.value;
            const endTime = document.getElementById('input-end-time')?.value;
            if (!title || !startDate) return '';
            const start = startDate.replace(/-/g, '') + 'T' + (startTime || '000000').replace(/:/g, '') + '00';
            const end = endDate ? endDate.replace(/-/g, '') + 'T' + (endTime || '000000').replace(/:/g, '') + '00' : '';
            let vevent = `BEGIN:VEVENT\nSUMMARY:${title}\n`;
            if (location) vevent += `LOCATION:${location}\n`;
            if (description) vevent += `DESCRIPTION:${description}\n`;
            vevent += `DTSTART:${start}\n`;
            if (end) vevent += `DTEND:${end}\n`;
            vevent += `END:VEVENT`;
            return vevent;
        },
        instagram: () => {
            const username = document.getElementById('input-username')?.value.trim();
            return username ? `https://instagram.com/${username}` : '';
        },
        linkedin: () => {
            return document.getElementById('input-url')?.value.trim() || '';
        },
        twitter: () => {
            const username = document.getElementById('input-username')?.value.trim();
            return username ? `https://x.com/${username}` : '';
        },
        bitcoin: () => {
            const address = document.getElementById('input-address')?.value.trim();
            const amount = document.getElementById('input-amount')?.value;
            const label = document.getElementById('input-label')?.value.trim();
            if (!address) return '';
            let bitcoin = `bitcoin:${address}`;
            const params = [];
            if (amount) params.push(`amount=${amount}`);
            if (label) params.push(`label=${encodeURIComponent(label)}`);
            if (params.length) bitcoin += '?' + params.join('&');
            return bitcoin;
        },
        location: () => {
            const lat = document.getElementById('input-lat')?.value.trim();
            const lng = document.getElementById('input-lng')?.value.trim();
            const name = document.getElementById('input-name')?.value.trim();
            if (!lat || !lng) return '';
            return `geo:${lat},${lng}${name ? `?q=${encodeURIComponent(name)}` : ''}`;
        },
        paypal: () => {
            const email = document.getElementById('input-email')?.value.trim();
            const amount = document.getElementById('input-amount')?.value;
            const currency = document.getElementById('input-currency')?.value;
            const item = document.getElementById('input-item')?.value.trim();
            if (!email) return '';
            let url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(email)}`;
            if (amount) url += `&amount=${amount}`;
            if (currency) url += `&currency_code=${currency}`;
            if (item) url += `&item_name=${encodeURIComponent(item)}`;
            return url;
        }
    };

    function generateQRCode(data) {
        if (!data) {
            showPlaceholder();
            return;
        }
        state.qrData = data;
        elements.qrDisplay.innerHTML = '';

        const tempDiv = document.createElement('div');
        new QRCode(tempDiv, {
            text: data,
            width: 400,
            height: 400,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            let originalCanvas = tempDiv.querySelector('canvas');
            if (!originalCanvas) {
                const img = tempDiv.querySelector('img');
                originalCanvas = document.createElement('canvas');
                originalCanvas.width = 400; originalCanvas.height = 400;
                originalCanvas.getContext('2d').drawImage(img, 0, 0, 400, 400);
            }
            processAndShowQR(originalCanvas);
        }, 100);

        elements.downloadSection.classList.remove('hidden');
    }

    function processAndShowQR(originalCanvas) {
        const size = 400;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = state.colorLight;
        ctx.fillRect(0, 0, size, size);

        const imgData = originalCanvas.getContext('2d').getImageData(0, 0, size, size).data;

        let firstPos = -1;
        for (let i = 0; i < imgData.length; i += 4) {
            if (imgData[i] < 128) { firstPos = i / 4; break; }
        }
        if (firstPos === -1) return;

        let startX = firstPos % size;
        let startY = Math.floor(firstPos / size);
        let blackWidth = 0;
        while (imgData[(firstPos + blackWidth) * 4] < 128) blackWidth++;

        const mSize = blackWidth / 7;

        ctx.fillStyle = state.colorDark;

        for (let row = 0; row < (size - startY) / mSize; row++) {
            for (let col = 0; col < (size - startX) / mSize; col++) {
                const x = startX + col * mSize;
                const y = startY + row * mSize;
                const sampleX = Math.floor(x + mSize / 2);
                const sampleY = Math.floor(y + mSize / 2);

                if (sampleX < size && sampleY < size) {
                    const idx = (sampleY * size + sampleX) * 4;
                    if (imgData[idx] < 128) {
                        drawStyledRect(ctx, x, y, mSize, state.currentStyle);
                    }
                }
            }
        }

        if (state.logoImage) {
            const lSize = size * 0.2;
            const pos = (size - lSize) / 2;
            ctx.fillStyle = state.colorLight;
            ctx.fillRect(pos - 4, pos - 4, lSize + 8, lSize + 8);
            ctx.drawImage(state.logoImage, pos, pos, lSize, lSize);
        }

        elements.qrDisplay.innerHTML = '';
        elements.qrDisplay.appendChild(canvas);
        applyZoom();
    }

    function drawStyledRect(ctx, x, y, s, style, radius = 0, isStroke = false) {
        ctx.beginPath();
        const r = radius || s * 0.25;
        const p = s * 0.05;

        if (style === 'dots') {
            ctx.arc(x + s / 2, y + s / 2, (s / 2) - p, 0, Math.PI * 2);
        } else if (style === 'rounded' || radius > 0) {
            const rad = Math.min(r, s / 2);
            ctx.moveTo(x + rad, y + p);
            ctx.arcTo(x + s - p, y + p, x + s - p, y + s - p, rad);
            ctx.arcTo(x + s - p, y + s - p, x + p, y + s - p, rad);
            ctx.arcTo(x + p, y + s - p, x + p, y + p, rad);
            ctx.arcTo(x + p, y + p, x + s - p, y + p, rad);
        } else {
            ctx.rect(x, y, s, s);
        }
        isStroke ? ctx.stroke() : ctx.fill();
    }

    function showPlaceholder() {
        elements.qrDisplay.innerHTML = `<div class="qr-placeholder"><div class="placeholder-animation"><div class="scan-line"></div><svg class="placeholder-qr" viewBox="0 0 100 100"><rect x="10" y="10" width="35" height="35" rx="5" fill="currentColor" opacity="0.2"/><rect x="55" y="10" width="35" height="35" rx="5" fill="currentColor" opacity="0.2"/><rect x="10" y="55" width="35" height="35" rx="5" fill="currentColor" opacity="0.2"/><rect x="55" y="55" width="35" height="35" rx="2" fill="currentColor" opacity="0.1"/></svg></div><p class="placeholder-text">Generá tu QR personalizado en segundos</p></div>`;
        elements.downloadSection.classList.add('hidden');
    }

    function applyZoom() {
        const qrCanvas = elements.qrDisplay.querySelector('canvas');
        if (qrCanvas) qrCanvas.style.transform = `scale(${state.zoom})`;
        document.querySelector('.zoom-level').textContent = `${Math.round(state.zoom * 100)}%`;
    }

    function downloadPNG() {
        const canvas = elements.qrDisplay.querySelector('canvas');
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `qr-${state.currentType}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    function downloadSVG() {
        if (!state.qrData) return;

        const svg = generateSVGFromData(state.qrData);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = `qr-${state.currentType}-${Date.now()}.svg`;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    }

    function downloadPDF() {
        const canvas = elements.qrDisplay.querySelector('canvas');
        if (!canvas) return;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 150;
        const imgHeight = 150;
        const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const y = 30;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`qr-${state.currentType}-${Date.now()}.pdf`);
    }

    function generateSVGFromData(data) {
        const tempDiv = document.createElement('div');

        new QRCode(tempDiv, {
            text: data,
            width: 400,
            height: 400,
            correctLevel: QRCode.CorrectLevel.H
        });

        const canvas = tempDiv.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, 400, 400).data;
        let svg = `
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                  <rect width="100%" height="100%" fill="${state.colorLight}"/>
                  `;
        const moduleSize = 400 / 25;
        for (let y = 0; y < 400; y += moduleSize) {
            for (let x = 0; x < 400; x += moduleSize) {
                const pixelIndex = (Math.floor(y) * 400 + Math.floor(x)) * 4;
                if (imgData[pixelIndex] < 128) {
                    if (state.currentStyle === "dots") {
                        svg += `<circle cx="${x + moduleSize / 2}" cy="${y + moduleSize / 2}" r="${moduleSize / 2}" fill="${state.colorDark}"/>`;
                    } else if (state.currentStyle === "rounded") {
                        svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${moduleSize / 3}" fill="${state.colorDark}"/>`;
                    } else {
                        svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="${state.colorDark}"/>`;
                    }
                }
            }
        }
        svg += `</svg>`;
        return svg;
    }

    function renderForm(type) {
        state.currentType = type;
        elements.formContainer.innerHTML = formTemplates[type] || '';
        attachFormListeners();
    }

    function attachFormListeners() {
        const inputs = elements.formContainer.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(livePreview, 500));
        });
    }

    function livePreview() {
        const data = getQRData();
        if (data && data.length > 3) {
            generateQRCode(data);
        }
    }

    function getQRData() {
        const builder = dataBuilders[state.currentType];
        return builder ? builder() : '';
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    elements.typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderForm(btn.dataset.type);
        });
    });

    elements.styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.styleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentStyle = btn.dataset.style;
            if (state.qrData) generateQRCode(state.qrData);
        });
    });

    elements.colorDark.addEventListener('input', (e) => {
        state.colorDark = e.target.value;
        if (state.qrData) generateQRCode(state.qrData);
    });

    elements.colorLight.addEventListener('input', (e) => {
        state.colorLight = e.target.value;
        if (state.qrData) generateQRCode(state.qrData);
    });

    elements.logoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    state.logoImage = img;
                    elements.fileName.textContent = file.name;
                    elements.clearLogo.classList.remove('hidden');
                    if (state.qrData) generateQRCode(state.qrData);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    elements.clearLogo.addEventListener('click', () => {
        state.logoImage = null;
        elements.logoUpload.value = '';
        elements.fileName.textContent = 'Subir imagen';
        elements.clearLogo.classList.add('hidden');
        if (state.qrData) generateQRCode(state.qrData);
    });

    elements.generateBtn.addEventListener('click', () => {
        const data = getQRData();
        if (!data || data.length < 3) {
            alert('Completá el campo correctamente');
            return;
        }
        generateQRCode(data);
    });

    elements.downloadPNG.addEventListener('click', downloadPNG);
    elements.downloadSVG.addEventListener('click', downloadSVG);
    elements.downloadPDF.addEventListener('click', downloadPDF);

    elements.zoomIn.addEventListener('click', () => {
        if (state.zoom < 2) {
            state.zoom += 0.25;
            applyZoom();
        }
    });

    elements.zoomOut.addEventListener('click', () => {
        if (state.zoom > 0.5) {
            state.zoom -= 0.25;
            applyZoom();
        }
    });

    renderForm('url');
    showPlaceholder();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

 document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

 function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
 }
document.querySelectorAll("[data-i18n]").forEach(el => {
  const key = el.dataset.i18n;
  if(translations[lang][key]){
    el.textContent = translations[lang][key];
  }
});