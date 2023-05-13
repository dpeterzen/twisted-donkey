import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
interface Data {
    title: string;
    parsed_image_description: string[];
    parsed_text_description: string[];
    illustrations: string[];
    total_pages: number;
}

interface FlipBookProps {
    data: Data;
}

const FlipBook: React.FC<FlipBookProps> = ({ data }) => {
    const { title, illustrations, parsed_image_description, parsed_text_description } = data;

    // Combine the illustrations, image descriptions, and text descriptions into a single array
    const pages = illustrations.map((illustration, i) => ({
        illustration,
        imageDescription: parsed_image_description[i],
        textDescription: parsed_text_description[i]
    }));

    return (
        <div className='my-4'>
            <h1>{title}</h1>
            <br></br>
            {pages.map((page, i) => (
                <Card key={i} style={{ maxWidth: 600, marginBottom: 20 }}>
                    <CardMedia
                        component="img"
                        alt={`Illustration ${i + 1}`}
                        height="240"
                        image={`data:image/png;base64,${page.illustration}`}
                        title={`Illustration ${i + 1}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {page.textDescription}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" component="small">
                            {page.imageDescription}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default FlipBook;