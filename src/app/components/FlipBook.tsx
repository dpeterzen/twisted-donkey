import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Page {
  illustration?: string;
  imageDescription?: string;
  textDescription?: string;
}

interface FlipBookProps {
  taskID: string;
  totalPages: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ taskID, totalPages }) => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8000/get_updates/${taskID}`);

    eventSource.onmessage = (event) => {
      const { data } = event;
      const updates = JSON.parse(data);

      if (Array.isArray(updates) && updates.length > 0) {
        const { illustrations, parsed_image_description, parsed_text_description } = updates[0];

        const newPages: Page[] = illustrations.map((_: any, index: number) => ({
          illustration: '',
          imageDescription: parsed_image_description[index],
          textDescription: parsed_text_description[index],
        }));

        setPages(newPages);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [taskID]);

  return (
    <div className="my-4">
      {pages.length > 0 ? (
        pages.map((page, i) => (
          <Card key={i} style={{ maxWidth: 600, marginBottom: 20 }}>
            {i === 0 ? (
              <CardContent>
                <Typography variant="h5" component="h2">
                  Title
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p" align="right">
                  Page {i + 1} of {totalPages}
                </Typography>
              </CardContent>
            ) : (
              <>
                <CardMedia
                  component="img"
                  alt={`Illustration ${i + 1}`}
                  height="240"
                  image="placeholder.jpg" // Replace with your placeholder image
                  title={`Illustration ${i + 1}`}
                />
                <CardContent>
                  <Typography variant="caption" color="textSecondary" component="p">
                    Placeholder for image description
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Placeholder for text description
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p" align="right">
                    Page {i + 1} of {totalPages}
                  </Typography>
                </CardContent>
              </>
            )}
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FlipBook;
