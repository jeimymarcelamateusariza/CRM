let DB;

function conectarDB(){
    const abrirConexion = window.indexedDB.open('crm', 1);
    abrirConexion.onerror = function (){
        console.log('Error')
    }
    abrirConexion.onsuccess = function (){
        DB = abrirConexion.result;
    }
}

function imprimirAlerta (mensaje, tipo){
        
    const alerta = document.querySelector('.alerta');

    if (!alerta){
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'text-center', 'mt-6', 'alerta');
        if(tipo === 'error'){
            divMensaje.classList.add('bg-red-100', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100')
        }
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}
