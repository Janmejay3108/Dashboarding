import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Plus, Edit, Trash2, Clock, MapPin, Users } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample events with Indian context
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting with Mumbai Office',
      start: new Date(2025, 5, 10, 10, 0),
      end: new Date(2025, 5, 10, 11, 30),
      type: 'meeting',
      location: 'Conference Room A',
      attendees: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel']
    },
    {
      id: 2,
      title: 'Product Launch Event',
      start: new Date(2025, 5, 12, 14, 0),
      end: new Date(2025, 5, 12, 18, 0),
      type: 'event',
      location: 'Delhi Convention Center',
      attendees: ['Marketing Team', 'Sales Team']
    },
    {
      id: 3,
      title: 'Client Presentation - TechCorp India',
      start: new Date(2025, 5, 15, 15, 0),
      end: new Date(2025, 5, 15, 16, 30),
      type: 'presentation',
      location: 'Client Office, Bangalore',
      attendees: ['Janmejay Tiwari', 'Vikram Singh']
    },
    {
      id: 4,
      title: 'Quarterly Review',
      start: new Date(2025, 5, 18, 9, 0),
      end: new Date(2025, 5, 18, 12, 0),
      type: 'review',
      location: 'Board Room',
      attendees: ['Senior Management']
    },
    {
      id: 5,
      title: 'Training Session - New Hires',
      start: new Date(2025, 5, 20, 10, 0),
      end: new Date(2025, 5, 20, 17, 0),
      type: 'training',
      location: 'Training Room B',
      attendees: ['HR Team', 'New Employees']
    },
    {
      id: 6,
      title: 'Customer Support Review',
      start: new Date(2025, 5, 22, 14, 0),
      end: new Date(2025, 5, 22, 15, 30),
      type: 'review',
      location: 'Support Center',
      attendees: ['Sneha Gupta', 'Support Team']
    }
  ]);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b82f6';
    
    switch (event.type) {
      case 'meeting':
        backgroundColor = '#3b82f6';
        break;
      case 'event':
        backgroundColor = '#10b981';
        break;
      case 'presentation':
        backgroundColor = '#f59e0b';
        break;
      case 'review':
        backgroundColor = '#8b5cf6';
        break;
      case 'training':
        backgroundColor = '#ef4444';
        break;
      default:
        backgroundColor = '#6b7280';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start,
        end,
        type: 'meeting',
        location: 'TBD',
        attendees: ['Janmejay Tiwari']
      };
      setEvents([...events, newEvent]);
    }
  };

  const closeModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    closeModal();
  };

  const upcomingEvents = events
    .filter(event => event.start >= new Date())
    .sort((a, b) => a.start - b.start)
    .slice(0, 5);

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Calendar & Events</h1>
        <p>Manage your schedule and upcoming events.</p>
      </div>

      <div className="calendar-layout">
        <div className="calendar-main">
          <div className="calendar-controls">
            <div className="view-controls">
              <button 
                className={`btn ${view === 'month' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button 
                className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`btn ${view === 'day' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
            </div>
            <button className="btn btn-primary">
              <Plus size={16} />
              Add Event
            </button>
          </div>

          <div className="card calendar-container">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              popup
            />
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="card">
            <h3>Upcoming Events</h3>
            <div className="upcoming-events">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className={`event-indicator ${event.type}`}></div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <div className="event-meta">
                      <span className="event-time">
                        <Clock size={14} />
                        {moment(event.start).format('MMM DD, HH:mm')}
                      </span>
                      <span className="event-location">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Event Types</h3>
            <div className="event-types">
              <div className="event-type">
                <div className="type-indicator meeting"></div>
                <span>Meetings</span>
              </div>
              <div className="event-type">
                <div className="type-indicator event"></div>
                <span>Events</span>
              </div>
              <div className="event-type">
                <div className="type-indicator presentation"></div>
                <span>Presentations</span>
              </div>
              <div className="event-type">
                <div className="type-indicator review"></div>
                <span>Reviews</span>
              </div>
              <div className="event-type">
                <div className="type-indicator training"></div>
                <span>Training</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedEvent.title}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="event-info">
                <div className="info-item">
                  <Clock size={16} />
                  <span>
                    {moment(selectedEvent.start).format('MMMM DD, YYYY HH:mm')} - 
                    {moment(selectedEvent.end).format('HH:mm')}
                  </span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="info-item">
                  <Users size={16} />
                  <span>{selectedEvent.attendees.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary">
                <Edit size={16} />
                Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => deleteEvent(selectedEvent.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
