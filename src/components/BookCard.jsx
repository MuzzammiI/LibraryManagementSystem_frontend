import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { borrowBook, returnBook, updateBook, deleteBook } from '../services/api';
import { FaBook, FaEdit, FaTrash } from 'react-icons/fa';

const BookCard = ({ book, onRefetch }) => {
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title);
  const [editAuthor, setEditAuthor] = useState(book.author);
  const [editIsbn, setEditIsbn] = useState(book.isbn);

  const handleBorrow = async () => {
    try {
      showNotification('Borrowing...', 'pending');
      await borrowBook(book._id);
      showNotification('Book borrowed successfully', 'success');
      onRefetch();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error borrowing', 'error');
    }
  };

  const handleReturn = async () => {
    try {
      showNotification('Returning...', 'pending');
      await returnBook(book._id);
      showNotification('Book returned successfully', 'success');
      onRefetch();
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error returning', 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBook(book._id, { title: editTitle, author: editAuthor, isbn: editIsbn });
      showNotification('Book updated successfully', 'success');
      setIsEditing(false);
      onRefetch();
    } catch (error) {
      showNotification('Error updating book', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(book._id);
        showNotification('Book deleted successfully', 'success');
        onRefetch();
      } catch (error) {
        showNotification('Error deleting book', error);
      }
    }
  };

  const stockStatus = book.available ? 'In Stock' : user?.id === book.borrowedBy?.toString() ? 'Borrowed by You' : 'Out of Stock';

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-hidden">
      <div className="flex items-center mb-2">
        <FaBook className="mr-2 text-blue-500 flex-shrink-0" />
        <h3 className="font-bold text-lg truncate">{book.title}</h3>
      </div>
      <p className="text-gray-600 break-words">{book.author}</p>
      <p className="text-sm text-gray-500 break-words">ISBN: {book.isbn}</p>
      <p className="text-sm text-gray-500 break-words">Created by: {book.createdBy}</p>
      <p className={`text-sm font-semibold ${book.available ? 'text-green-500' : 'text-red-500'}`}>{stockStatus}</p>
      {user?.role === 'Member' && book.available ? (
        <button onClick={handleBorrow} className="bg-blue-500 text-white px-3 py-1 rounded mt-2 w-full flex items-center justify-center">
          Borrow
        </button>
      ) : user?.role === 'Member' && !book.available && book.borrowedBy?.toString() === user.id ? (
        <button onClick={handleReturn} className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full flex items-center justify-center">
          Return
        </button>
      ) : null}
      {user?.role === 'Admin' && (
        <div className="flex mt-2 space-x-2">
          <button onClick={() => setIsEditing(!isEditing)} className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center flex-1 justify-center">
            <FaEdit className="mr-1" /> Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded flex items-center flex-1 justify-center">
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      )}
      {isEditing && user?.role === 'Admin' && (
        <form onSubmit={handleUpdate} className="mt-2">
          <input
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-1 w-full mb-1 rounded"
            required
          />
          <input
            placeholder="Author"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            className="border p-1 w-full mb-1 rounded"
            required
          />
          <input
            placeholder="ISBN"
            value={editIsbn}
            onChange={(e) => setEditIsbn(e.target.value)}
            className="border p-1 w-full mb-1 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-1 w-full rounded">Update</button>
        </form>
      )}
    </div>
  );
};

export default BookCard;