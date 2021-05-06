const { addNoteHandler, getAllNotesHandler, getNoteByidHandler, editNoteByidHandler, deleteNoteByidHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        //TODO 8: gunakan fungsi handler ini pada konfigurasi route-nya.
        handler: addNoteHandler,
        
    },

    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    }, 

    {
        method: 'GET',
        path: '/notes/{id}',
        handler:getNoteByidHandler,
    },

    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByidHandler,
    },

    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByidHandler,
    },
];





module.exports = routes;