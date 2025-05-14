import { Box } from '@mui/material';
import { IMAGE_SIZES } from '../../constants/config';
import { hoverStyles, scrollbarStyles } from '../../styles/common';

function ImageThumbnails({ 
  images, 
  selectedIndex, 
  onSelect,
  thumbnailSize = IMAGE_SIZES.productCard.thumbnail
}) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      mt: 2, 
      overflowX: 'auto',
      pb: 1,
      ...scrollbarStyles.custom
    }}>
      {images.map((image, index) => (
        <Box
          key={index}
          onClick={() => onSelect(index)}
          sx={{
            width: thumbnailSize.width,
            height: thumbnailSize.height,
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
            ...hoverStyles.scale
          }}
        >
          <Box
            component="img"
            src={image}
            alt={`Thumbnail ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: selectedIndex === index ? 1 : 0.7,
              ...hoverStyles.opacity
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default ImageThumbnails; 