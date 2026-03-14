let corteActual = 0;
let html5QrCode = null;
const beep = document.getElementById('audioBeep');
const audioAlerta = new Audio('img/alerta.mp3');

function feedback(tipo) {
    if (tipo === 'error') {
        audioAlerta.play().catch(() => {});
        if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
    } else {
        beep.play().catch(() => {});
        if (navigator.vibrate) navigator.vibrate(100);
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
    document.getElementById('serieInput').focus();
}

function verificar() {
    const rawValue = document.getElementById('serieInput').value.trim();
    if (!rawValue) return;
    
    const numero = parseInt(rawValue);
    const res = document.getElementById('resultContainer');
    const serieFormateada = rawValue.padStart(9, '0');
    
    res.classList.remove('hidden');
    const hallado = RANGOS_BCB.find(r => numero >= r.inicio && numero <= r.fin && r.corte === corteActual);

    if (hallado) {
        feedback('error');
        res.innerHTML = `⚠️ INHABILITADO<br>Serie: ${serieFormateada}`;
        res.className = "result-box error alerta-inhabilitado";
    } else {
        feedback('success');
        res.innerHTML = `✅ VÁLIDO<br>Serie: ${serieFormateada}`;
        res.className = "result-box success";
    }
    document.getElementById('btnReset').classList.remove('hidden');
}

async function activarEscaner() {
    feedback('click');
    document.getElementById('scanner-modal').style.display = "flex";
    if (!html5QrCode) html5QrCode = new Html5Qrcode("reader");

    const config = { 
        fps: 20, 
        qrbox: { width: 280, height: 90 } // Rectángulo para la serie
    };

    html5QrCode.start({ facingMode: "environment" }, config, (text) => {
        document.getElementById('serieInput').value = text;
        cerrarEscaner();
        if(corteActual === 0) mostrarPaso2(); else verificar();
    }).catch(() => cerrarEscaner());
}

function cerrarEscaner() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            document.getElementById('scanner-modal').style.display = "none";
        });
    } else {
        document.getElementById('scanner-modal').style.display = "none";
    }
}

function volverAtras() {
    location.reload(); // Forma más rápida de resetear todo
}

function reiniciarProceso() {
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('btnReset').classList.add('hidden');
    document.getElementById('serieInput').value = "";
}