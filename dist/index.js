"use strict";
let balance = 0;
let transacciones = [];
function actualizarBalance() {
    balance = transacciones.reduce((acc, transaccion) => {
        return transaccion.tipo === 'ingreso' ? acc + transaccion.monto : acc - transaccion.monto;
    }, 0);
    document.getElementById('balance').textContent = balance.toFixed(2);
}
function agregarTransaccion(tipo) {
    const montoInput = document.getElementById('monto');
    const descripcionInput = document.getElementById('descripcion');
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    if (isNaN(monto) || monto <= 0 || descripcion === '') {
        alert('Ingrese un monto válido y una descripción.');
        return;
    }
    const nuevaTransaccion = {
        id: Date.now(),
        monto,
        descripcion,
        tipo
    };
    transacciones.push(nuevaTransaccion);
    actualizarHistorial();
    actualizarBalance();
    montoInput.value = '';
    descripcionInput.value = '';
}
function actualizarHistorial() {
    const historialElement = document.getElementById('transacciones');
    if (!historialElement)
        return;
    historialElement.innerHTML = '';
    transacciones.forEach(transaccion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${transaccion.descripcion}</td>
            <td>${transaccion.monto.toFixed(2)}</td>
            <td class="${transaccion.tipo}">${transaccion.tipo}</td>
        `;
        historialElement.appendChild(fila);
    });
}
