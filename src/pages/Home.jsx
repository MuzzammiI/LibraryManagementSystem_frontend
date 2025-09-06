import { useState, useEffect, useContext, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { getBooks, addBook } from '../services/api';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const fetchBooks = useCallback(async () => {
    try {
      const { data } = await getBooks();
      setBooks(data);
    } catch (error) {
      showNotification('Error fetching books', error);
    }
  }, [showNotification]);

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]); // Clear books when user logs out
      setSearch('');
      setTitle('');
      setAuthor('');
      setIsbn('');
    }
  }, [user, fetchBooks]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addBook({ title, author, isbn });
      setBooks([...books, data]);
      showNotification('Book added successfully', 'success');
      setTitle(''); setAuthor(''); setIsbn('');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error adding book', 'error');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {user && (
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {user?.role === 'Admin' && (
        <form onSubmit={handleAddBook} className="mb-6 bg-white p-4 rounded shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full md:w-auto hover:bg-blue-600 transition">Add Book</button>
        </form>
      )}
      {user ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <motion.div
                key={book._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard book={book} onRefetch={fetchBooks} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No books available.</p>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-2xl font-bold text-gray-500">Please login to view books.</p>
      )}
    </div>
  );
};

export default Home;