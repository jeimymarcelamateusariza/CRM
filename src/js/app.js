(function(){
    let DB;
    document.addEventListener('DOMContentLoaded', () => {
        crearDB();
    });
    //Crear la base de datos de indexedDB
    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1);
        crearDB.onerror = function(){
            console.log('Error')
        };
        crearDB.onsuccess = function(){
            DB = crearDB.result;
        };
        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;
            const objecStore = db.createObjectStore('crm', {keyPaht: 'id', autoincrement: true });

            objecStore.createIndex('nombre','nombre',{unique: false});
            objecStore.createIndex('email','email',{unique: true});
            objecStore.createIndex('telefono','telefono',{unique: false});
            objecStore.createIndex('empresa','empresa',{unique: false});
            objecStore.createIndex('id','id',{unique: true});

            console.log('DB lista');
        }
    }
}) ();

