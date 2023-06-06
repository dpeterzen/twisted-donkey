import React, { useEffect } from 'react';

interface FlipBookProps {
  taskID: string;
  totalPages: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ taskID, totalPages }) => {
  useEffect(() => {
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}get_updates/${taskID}`);

    eventSource.onmessage = (event) => {
      try {
        const update = event.data;
    
        if (!update.startsWith(':')) {
          // Process the update as needed
          const parsedUpdate = JSON.parse(update);
          console.log(parsedUpdate); // Log the parsed update object
        
          if (parsedUpdate.status === 'done') {
            console.log('status = done');
            eventSource.close();
          }
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [taskID]);

  return (
    <div>
      {/* Render your FlipBook component */}
      <p>FlipBook Component</p>
      <p>Total Pages: {totalPages}</p>
      <p>Task ID: {taskID}</p>
    </div>
  );
};

export default FlipBook;