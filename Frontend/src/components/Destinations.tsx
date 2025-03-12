import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, X, Calendar, Users, Globe, Camera, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginPromptModal from './LoginPromptModal';
import AuthModal from './auth/AuthModal';

interface DestinationDetails {
  duration: string;
  groupSize: string;
  season: string;
  includes: string[];
  highlights: string[];
  itinerary: string[];
}

interface Destination {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
  description: string;
  details: DestinationDetails;
}

const BookingConfirmationModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Booking Request Received
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for your interest! Our team will contact you shortly to confirm your booking and discuss the details.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-xl"
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, isOpen, onClose }) => {
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  if (!destination || !destination.details) return null;

  const handleBooking = () => {
    setShowBookingConfirmation(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              <div className="relative h-64 sm:h-80">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{destination.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{destination.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">{destination.details.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Group Size</p>
                      <p className="font-medium text-gray-900 dark:text-white">{destination.details.groupSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Best Season</p>
                      <p className="font-medium text-gray-900 dark:text-white">{destination.details.season}</p>
                    </div>
                  </div>
                </div>

                {destination.details.includes && destination.details.includes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What's Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destination.details.includes.map((item, index) => (
                        <div key={`include-${index}`} className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                          <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {destination.details.highlights && destination.details.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {destination.details.highlights.map((highlight, index) => (
                        <div key={`highlight-${index}`} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                          <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {destination.details.itinerary && destination.details.itinerary.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Itinerary</h3>
                    <div className="space-y-4">
                      {destination.details.itinerary.map((day, index) => (
                        <motion.div
                          key={`itinerary-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{index + 1}</span>
                          </div>
                          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">{day}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2"
                >
                  <span>Book This Trip</span>
                  <Plane className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingConfirmationModal
        isOpen={showBookingConfirmation}
        onClose={() => {
          setShowBookingConfirmation(false);
          onClose();
        }}
      />
    </>
  );
};

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleBooking = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      setShowBookingConfirmation(true);
    }
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations');
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        const data = await response.json();
        setDestinations(data);
      } catch (err) {
        setError('Failed to load destinations. Please try again later.');
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayedDestinations = destinations.slice(0, 3);

  return (
    <>
      <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our hand-picked destinations that offer unforgettable experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium dark:text-white">{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${destination.price}
                      </span>
                      <motion.button
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium group"
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedDestination(destination)}
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/packages')}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-xl inline-flex items-center space-x-2 hover:shadow-lg transition-shadow"
            >
              <span>View More Destinations</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        <DestinationModal
          destination={selectedDestination}
          isOpen={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      </section>

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={() => {
          setShowLoginPrompt(false);
          setShowAuthModal(true);
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="login"
        onAuthSuccess={() => {
          setShowAuthModal(false);
          handleBooking();
        }}
      />
    </>
  );
};

export default Destinations;