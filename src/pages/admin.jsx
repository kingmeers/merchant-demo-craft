import { useEffect, useState } from 'react';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activity?limit=35');
        const data = await response.json();
        setActivities(data);
        setLastUpdate(Date.now());
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();

    const interval = setInterval(() => {
      fetchActivities();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Activity Feed</h1>
        <ul className="space-y-4">
          {activities.map(activity => (
            <li 
              key={activity.timestamp} 
              className={`p-4 rounded ${activity.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} ${lastUpdate - activity.timestamp < 1000 ? 'animate-fadeIn' : ''}`}
            >
              <strong>{activity.agent_id}</strong>: {activity.message}
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s;
        }
      `}</style>
    </div>
  );
};

export default ActivityPage;
