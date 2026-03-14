// Base de datos oficial de rangos inhabilitados (Serie B) - BCB
// Los números se almacenan como enteros. 
// La lógica en app.js se encarga de mostrarlos con el "0" inicial de 9 dígitos.

const RANGOS_BCB = [
    // --- CORTE Bs10 ---
    { inicio: 77100001, fin: 77550000, corte: 10 },
    { inicio: 78000001, fin: 78450000, corte: 10 },
    { inicio: 78900001, fin: 96350000, corte: 10 }, // Rango amplio
    { inicio: 96350001, fin: 96800000, corte: 10 },
    { inicio: 96800001, fin: 97250000, corte: 10 },
    { inicio: 98150001, fin: 98600000, corte: 10 },
    { inicio: 104900001, fin: 105350000, corte: 10 },
    { inicio: 105350001, fin: 105800000, corte: 10 },
    { inicio: 106700001, fin: 107150000, corte: 10 },
    { inicio: 107600001, fin: 108050000, corte: 10 },

    // --- CORTE Bs20 ---
    { inicio: 87280145, fin: 91646549, corte: 20 },
    { inicio: 96650001, fin: 97100000, corte: 20 },
    { inicio: 99800001, fin: 100250000, corte: 20 },
    { inicio: 100250001, fin: 100700000, corte: 20 },
    { inicio: 109250001, fin: 109700000, corte: 20 },
    { inicio: 110600001, fin: 111050000, corte: 20 },
    { inicio: 111050001, fin: 111500000, corte: 20 },

    // --- CORTE Bs50 ---
    { inicio: 67250001, fin: 67700000, corte: 50 },
    { inicio: 69050001, fin: 69500000, corte: 50 },
    { inicio: 76310012, fin: 85139995, corte: 50 },
    { inicio: 86400001, fin: 86850000, corte: 50 },
    { inicio: 90900001, fin: 91350000, corte: 50 }
];