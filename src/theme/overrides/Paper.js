// ----------------------------------------------------------------------

export default function Paper() {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1A202C',
          color: '#fff'
        }
      }
    }
  };
}
