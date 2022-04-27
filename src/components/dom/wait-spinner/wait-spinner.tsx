import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function WaitSpinner() {
  return (
    <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}
