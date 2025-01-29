type TipoTransaccion = 'Ingreso' | 'Gasto';

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

let balance = 0;
let transacciones: Transaccion[] = [];

function actualizarBalance() {
    balance = transacciones.reduce((acc, transaccion) => {
        return transaccion.tipo === 'Ingreso' ? acc + transaccion.monto : acc - transaccion.monto;
    }, 0);
    document.getElementById('balance')!.textContent = balance.toFixed(2);
}

function agregarTransaccion(tipo: TipoTransaccion) {
    const montoInput = document.getElementById('monto') as HTMLInputElement;
    const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

    if (isNaN(monto) || monto <= 0 || descripcion === '') {
        alert('Ingrese un monto válido y una descripción.');
        return;
    }

    const nuevaTransaccion: Transaccion = {
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
    if (!historialElement) return;

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