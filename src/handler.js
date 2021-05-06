const { nanoid } = require("nanoid");
//TODO 5: impor array notes pada berkas handler.js.
const notes = require('./notes');

const addNoteHandler = (request, h) => {

    //TODO1: mendapatkan body request
    const {title, tags, body} = request.payload;

    //TODO 2 : install dan gunakan nanoid() untuk membuat id unik dan string.
    const id = nanoid(16);

    //TODO 3: membuat properti createdAt dan updatedAt
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //TODO 4: masukan nilai ke dalam array notes menggunakan method push().
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);

    //TODO 6: cek apakah newNote sudah masuk ke dalam array notes dgn method filter()
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    //TODO 7: gunakan isSuccess untuk menentukan respons yang diberikan server. 
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        note,
    },
});

const getNoteByidHandler = (request, h) => {

    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;

};

const editNoteByidHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;

    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    }
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui catatan. Id tidak ditemukan',
        });

        response.code(404);
        return response;
};


const deleteNoteByidHandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });

        response.code(200);
        return response;
    }   

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;
};



module.exports = {addNoteHandler, getAllNotesHandler, getNoteByidHandler, editNoteByidHandler, deleteNoteByidHandler};