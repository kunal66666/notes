import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { BsPlusLg } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { NoteItem } from '../components/NoteItem';

const Notes = ({ notes }) => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    const filtered = notes.filter(note => {
      return note.title.toLowerCase().includes(text.toLowerCase());
    });

    setFilteredNotes(filtered);
    if (filtered.length === 0) {
      navigate('/'); // Navigate to homepage if no notes are found
    }
  };

  useEffect(() => {
    handleSearch();
  }, [text, notes]);

  return (
    <section>
      <header className='notes__header'>
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            autoFocus
            placeholder='Keyword...'
          />
        )}
        <button
          className='btn'
          onClick={() => setShowSearch(prevState => !prevState)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className='notes__container'>
        {filteredNotes.length === 0 && <p className='empty__notes'>No notes found.</p>}
        {filteredNotes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to='/create-note' className='btn add__btn'>
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;
