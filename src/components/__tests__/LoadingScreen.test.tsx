import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingScreen from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<LoadingScreen />);
    
    // Verify the loading indicator is present
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('has correct styling', () => {
    const { getByTestId } = render(<LoadingScreen />);
    
    const container = getByTestId('loading-container');
    
    // Verify the container has the correct styles
    expect(container).toHaveStyle({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    });
  });
});
