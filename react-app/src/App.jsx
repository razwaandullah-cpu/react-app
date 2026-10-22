
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [person, setPerson] = useState([
    { id: 1, name: 'Jaxshon', number: '09087654321' },
    { id: 2, name: 'Felix', number: '123-679-098' },
  ]);

  // Add or update a contact
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !number.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId !== null) {
      setPerson((previous) =>
        previous.map((p) =>
          p.id === editingId
            ? { ...p, name: name.trim(), number: number.trim() }
            : p
        )
      );
      setEditingId(null);
    } else {
      setPerson((previous) => [
        ...previous,
        {
          id: Date.now(),
          name: name.trim(),
          number: number.trim(),
        },
      ]);
    }

    setName('');
    setNumber('');
  }

  // Edit a contact
  function handleEdit(p) {
    setName(p.name);
    setNumber(p.number);
    setEditingId(p.id);
  }

  // Cancel editing
  function handleCancel() {
    setName('');
    setNumber('');
    setEditingId(null);
  }

  // Delete a contact
  function handleDelete(id) {
    setPerson((previous) => previous.filter((p) => p.id !== id));

    if (editingId === id) {
      handleCancel();
    }
  }

  // Search contacts
  const personsToShow = person.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.number.includes(search.trim())
  );

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #f1f5f9;
          color: #1e293b;
        }

        button, input {
          font: inherit;
        }

        button {
          cursor: pointer;
          transition: 0.2s ease;
        }

        button:focus-visible, input:focus-visible {
          outline: 3px solid #93c5fd;
          outline-offset: 3px;
        }

        .phonebook {
          width: min(100% - 30px, 720px);
          margin: 0 auto;
          padding: 40px 0 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .phone-icon {
          display: grid;
          place-items: center;
          width: 65px;
          height: 65px;
          margin: 0 auto 15px;
          border-radius: 18px;
          background: #2563eb;
          color: white;
          font-size: 32px;
          box-shadow: 0 8px 20px #2563eb30;
        }

        .header h1 {
          font-size: clamp(28px, 5vw, 36px);
          color: #0f172a;
          margin-bottom: 10px;
        }

        .header p {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .panel {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 26px;
          margin-bottom: 24px;
          box-shadow: 0 8px 25px #0f172a08;
        }

        .panel h2 {
          font-size: 20px;
          margin-bottom: 22px;
          color: #0f172a;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #f8fafc;
          color: #0f172a;
        }

        .form-group input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px #2563eb18;
          background: white;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 22px;
          flex-wrap: wrap;
        }

        .primary-btn, .cancel-btn {
          padding: 12px 18px;
          border-radius: 9px;
          font-weight: 600;
        }

        .primary-btn {
          flex: 1;
          border: none;
          background: #2563eb;
          color: white;
        }

        .primary-btn:hover {
          background: #1d4ed8;
        }

        .cancel-btn {
          border: 1px solid #cbd5e1;
          background: white;
          color: #475569;
        }

        .cancel-btn:hover {
          background: #f1f5f9;
        }

        .contacts-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .contacts-title h2 {
          margin-bottom: 6px;
        }

        .contacts-title p {
          font-size: 13px;
          color: #64748b;
        }

        .search-box {
          margin-bottom: 18px;
        }

        .search-box input {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #f8fafc;
        }

        .search-box input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .contact-list {
          list-style: none;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 17px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .contact-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .avatar {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 20px;
          font-weight: bold;
        }

        .contact-info {
          flex: 1;
          min-width: 0;
        }

        .contact-info h3 {
          font-size: 15px;
          margin-bottom: 6px;
          overflow-wrap: anywhere;
        }

        .contact-info p {
          font-size: 13px;
          color: #64748b;
          overflow-wrap: anywhere;
        }

        .contact-actions {
          display: flex;
          gap: 7px;
        }

        .edit-btn, .delete-btn {
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          font-size: 12px;
          font-weight: bold;
        }

        .edit-btn {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .edit-btn:hover {
          background: #bfdbfe;
        }

        .delete-btn {
          background: #fee2e2;
          color: #b91c1c;
        }

        .delete-btn:hover {
          background: #fecaca;
        }

        .empty-state {
          text-align: center;
          padding: 35px 10px;
          color: #64748b;
        }

        .empty-state h3 {
          color: #334155;
          margin-bottom: 8px;
        }

        .empty-state p {
          font-size: 14px;
          line-height: 1.6;
        }

        .footer {
          text-align: center;
          padding: 10px;
          color: #94a3b8;
          font-size: 12px;
        }

        @media (max-width: 520px) {
          .phonebook {
            width: calc(100% - 20px);
            padding-top: 25px;
          }

          .panel {
            padding: 20px 15px;
          }

          .contact-card {
            flex-wrap: wrap;
          }

          .contact-info {
            flex-basis: calc(100% - 65px);
          }

          .contact-actions {
            width: 100%;
            padding-left: 59px;
          }

          .edit-btn, .delete-btn {
            flex: 1;
            padding: 10px;
          }

          .form-actions {
            flex-direction: column;
          }

          .primary-btn, .cancel-btn {
            width: 100%;
          }
        }
      `}</style>

      <main className="phonebook">
        <header className="header">
          <div className="phone-icon">☎</div>
          <h1>My Phonebook</h1>
          <p>Keep all your important contacts in one place.</p>
        </header>

        <section className="panel">
          <h2>
            {editingId !== null ? 'Edit Contact' : 'Add New Contact'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter contact name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Phone Number</label>
              <input
                id="number"
                name="number"
                type="tel"
                placeholder="Enter phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                {editingId !== null ? 'Save Changes' : 'Add Contact'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="contacts-title">
            <div>
              <h2>My Contacts</h2>
              <p>
                {person.length} {person.length === 1 ? 'contact' : 'contacts'}
              </p>
            </div>
          </div>

          <div className="search-box">
            <input
              type="search"
              placeholder="Search by name or number..."
              aria-label="Search contacts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {personsToShow.length === 0 ? (
            <div className="empty-state">
              <h3>No contacts found</h3>
              <p>Try another search or add a new contact.</p>
            </div>
          ) : (
            <ul className="contact-list">
              {personsToShow.map((p) => (
                <li className="contact-card" key={p.id}>
                  <div className="avatar">
                    {p.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="contact-info">
                    <h3>{p.name}</h3>
                    <p>{p.number}</p>
                  </div>

                  <div className="contact-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
