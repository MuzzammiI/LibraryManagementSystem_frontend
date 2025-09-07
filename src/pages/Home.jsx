import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa'; // Loading icon from react-icons
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { getBooks, addBook } from '../services/api';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Single search field for title/author
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const fetchBooks = async (query = '') => {
    setLoading(true); // Start loading
    try {
      console.log('Fetching books with query:', query); // Debug log
      const params = {};
      if (query && query.trim()) {
        params.title = query; // Send as title parameter
        params.author = query; // Send as author parameter
      }
      const { data } = await getBooks(params);
      console.log('Books fetched:', data); // Debug log
      setBooks(data || []); // Ensure books is always an array
    } catch (error) {
      console.error('Fetch error:', error); // Debug error
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch books';
      showNotification(errorMessage, 'error');
      setBooks([]); // Reset books on error
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    if (user) {
      fetchBooks(); // Fetch all books on initial load
    } else {
      setBooks([]);
      setSearchQuery('');
      setTitle('');
      setAuthor('');
      setIsbn('');
      setLoading(false); // Ensure loading is off when logged out
    }
  }, [user]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      fetchBooks(); // Fetch all books when search query is empty
      return;
    }
    fetchBooks(searchQuery); // Fetch filtered books when query exists
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      showNotification('All fields are required', 'error');
      return;
    }
    try {
      setLoading(true); // Start loading for add book
      const { data } = await addBook({ title, author, isbn });
      setBooks([...books, data]);
      showNotification('Book added successfully', 'success');
      setTitle(''); setAuthor(''); setIsbn('');
    } catch (error) {
      console.error('Add book error:', error); // Debug error
      showNotification(error.response?.data?.message || 'Error adding book', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {user && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Add Enter key support
            className="border p-2 w-full md:w-3/4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full md:w-auto disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Search'}
          </button>
        </div>
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
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded w-full md:w-auto hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Add Book'}
          </button>
        </form>
      )}
      {user ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <FaSpinner className="text-4xl text-blue-500 animate-spin" />
            </div>
          ) : books.length > 0 ? (
            books.map(book => (
              <motion.div
                key={book._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard book={book} onRefetch={fetchBooks} />
              </motion.div>
            ))
          ) : searchQuery ? (
            <p className="text-center col-span-full text-gray-500">Search result is not available</p>
          ) : (
            <p className="text-center col-span-full text-gray-500">No books available.</p>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">Please login to view books.</p>
      )}
    </div>
  );
};

export default Home;