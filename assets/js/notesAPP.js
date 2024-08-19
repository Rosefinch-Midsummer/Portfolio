/*************************************************************************
 * Create Note Popup Logic
 **************************************************************************/

function popup() {
    if (document.getElementById("popupContainer")) {
        return;
    }

    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";

    popupContainer.innerHTML = `
    <div>
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
            <button id="submitBtn">Create Note</button>
            <button id="closeBtn">Close</button>
        </div>
    </div>
    `;
    
    document.body.appendChild(popupContainer);

    document.getElementById("submitBtn").addEventListener("click", createNote);
    document.getElementById("closeBtn").addEventListener("click", closePopup);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText !== '') {
        const note = {
            id: Date.now(),
            text: noteText,
            timestamp: new Date().toLocaleString() // 添加时间戳
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';
        closePopup();
        displayNotes();
    }
}

/*************************************************************************
 * Search Notes Logic
 **************************************************************************/

function searchNotes() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(query));

    filteredNotes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${escapeHTML(note.text)}</span>
        <span class="timestamp">${note.timestamp}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}

/*************************************************************************
 * Display Notes Logic
 **************************************************************************/

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${escapeHTML(note.text)}</span>
        <span class="timestamp">${note.timestamp}</span> <!-- 显示时间戳 -->
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}

/*************************************************************************
 * Edit Note Popup Logic
 **************************************************************************/

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id === noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const noteTimestamp = noteToEdit ? noteToEdit.timestamp : '';

    if (document.getElementById("editing-container")) {
        return;
    }

    const editingPopup = document.createElement("div");
    editingPopup.id = "editing-container";
    
    editingPopup.innerHTML = `
    <div data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <textarea id="note-text">${escapeHTML(noteText)}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote()">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.querySelector('[data-note-id]').getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note => {
            if (note.id === Number(noteId)) {
                return {
                    id: note.id,
                    text: noteText,
                    timestamp: new Date().toLocaleString() // 更新时间戳
                };
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        closeEditPopup();
        displayNotes();
    }
}

/*************************************************************************
 * Delete Note Logic
 **************************************************************************/

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// HTML 转义函数，防止 XSS
function escapeHTML(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// 初始化显示笔记
displayNotes();