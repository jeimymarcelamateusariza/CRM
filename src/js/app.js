(function () {
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');


    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if (window.indexedDB.open('crm', 1)) {
            obtenerClientes()
        }
        listadoClientes.addEventListener('click', eliminarRegistro);

    });

    function eliminarRegistro(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);

            const confirmar = confirm('Seguro deseas eliminar')

            if(confirmar){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');
                
                objectStore.delete(idEliminar);

                transaction.oncomplete = function () {
                    console.log('Eliminado')
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function () {
                    console.log('Error')
                }

            }
        }
    }

    //Crear la base de datos de indexedDB
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);
        crearDB.onerror = function () {
            console.log('Error')
        };
        crearDB.onsuccess = function () {
            DB = crearDB.result;
        };
        crearDB.onupgradeneeded = function (e) {
            const db = e.target.result;
            const objecStore = db.createObjectStore('crm', { keyPath: 'id', autoincrement: true });

            objecStore.createIndex('nombre', 'nombre', { unique: false });
            objecStore.createIndex('email', 'email', { unique: true });
            objecStore.createIndex('telefono', 'telefono', { unique: false });
            objecStore.createIndex('empresa', 'empresa', { unique: false });
            objecStore.createIndex('id', 'id', { unique: true });

            console.log('DB lista');
        }
    }

    function obtenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function () {
            console.log('Hubo un error');
        };
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
            const objecStore = DB.transaction('crm').objectStore('crm');

            objecStore.openCursor().onsuccess = function (e) {
                const cursor = e.target.result;

                if (cursor) {
                    const { nombre, telefono, email, empresa, id } = cursor.value;
                    listadoClientes.innerHTML += ` 
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>
                        `;

                    cursor.continue();
                } else {
                    console.log('No hay más registros')
                }
            }
        }
    }
})();

