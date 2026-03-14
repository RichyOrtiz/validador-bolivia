let corteActual = 0;
let html5QrCode;
const beep = document.getElementById('audioBeep');
// Creamos un segundo audio por código para la alerta de error
const audioAlerta = new Audio('img/alerta.mp3'); 

/**
 * Gestiona el sonido y vibración
 * @param {string} tipo - 'error' para inhabilitados, 'success' o 'click' para lo demás
 */
function feedback(tipo) {
    if (tipo === 'error') {
        // Sonido de Alerta (Sirena/Error)
        audioAlerta.currentTime = 0;
        audioAlerta.play().catch(() => console.log("Interacción necesaria para audio"));
        
        // Vibración agresiva e intermitente
        if ("vibrate" in navigator) {
            navigator.vibrate([300, 100, 300, 100, 300]);
        }
    } else {
        // Sonido normal para éxito o clics
        if (beep) {
            beep.currentTime = 0;
            beep.play().catch(() => {});
        }
        if ("vibrate" in navigator) {
            navigator.vibrate(100);
        }
    }
}

function mostrarPaso2() {
    feedback('click');
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('btnVolver').classList.remove('hidden');
}

function seleccionarCorte(valor) {
    feedback('click');
    corteActual = valor;
    document.getElementById('billeteGrande').src = `img/billete-${valor}.jpg`;
    document.getElementById('visualizer').classList.remove('hidden');
    document.getElementById('inputArea').classList.remove('hidden');
    document.getElementById('serieInput').value = "";
    document.getElementById('serieInput').focus();
}

function verificar() {
    const rawValue = document.getElementById('serieInput').value.trim();
    const numero = parseInt(rawValue);
    const res = document.getElementById('resultContainer');
    const btnReset = document.getElementById('btnReset');

    if (!rawValue || isNaN(numero)) return;
    const serieFormateada = rawValue.padStart(9, '0');
    res.classList.remove('hidden');

    const hallado = RANGOS_BCB.find(r => 
        numero >= r.inicio && numero <= r.fin && r.corte === corteActual
    );

    if (hallado) {
        // DISPARA LA ALERTA (Sonido especial + Parpadeo + Vibración)
        feedback('error');
        res.innerHTML = `⚠️ BILLETE INHABILITADO<br>Serie: ${serieFormateada}<br>¡NO RECIBIR!`;
        res.className = "result-box error alerta-inhabilitado";
    } else {
        // Sonido de éxito normal
        feedback('success');
        res.innerHTML = `✅ BILLETE VÁLIDO<br>Serie: ${serieFormateada}<br>Corte: Bs${corteActual}`;
        res.className = "result-box success";
        res.classList.remove('alerta-inhabilitado');
    }
    
    btnReset.classList.remove('hidden');
    res.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function volverAtras() {
    feedback('click');
    const inputArea = document.getElementById('inputArea');
    if (!inputArea.classList.contains('hidden')) {
        inputArea.classList.add('hidden');
        document.getElementById('visualizer').classList.add('hidden');
        document.getElementById('resultContainer').classList.add('hidden');
        document.getElementById('btnReset').classList.add('hidden');
        corteActual = 0;
    } else {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');
        document.getElementById('btnVolver').classList.add('hidden');
    }
}

function reiniciarProceso() {
    feedback('click');
    const res = document.getElementById('resultContainer');
    res.classList.add('hidden');
    res.classList.remove('alerta-inhabilitado');
    document.getElementById('btnReset').classList.add('hidden');
    document.getElementById('serieInput').value = "";
    document.getElementById('serieInput').focus();
}

// Lógica de Escáner
async function activarEscaner() {
    feedback('click');
    const modal = document.getElementById('scanner-modal');
    modal.style.display = "flex";
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 15, qrbox: { width: 250, height: 120 } }, (text) => {
        document.getElementById('serieInput').value = text;
        cerrarEscaner();
        corteActual === 0 ? mostrarPaso2() : verificar();
    }).catch(err => cerrarEscaner());
}

function cerrarEscaner() {
    const modal = document.getElementById('scanner-modal');
    if (html5QrCode) {
        html5QrCode.stop().then(() => modal.style.display = "none").catch(() => modal.style.display = "none");
    } else { modal.style.display = "none"; }
}