import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

// jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('react-hot-toast');

describe('LoginPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    // axios.get.mockResolvedValue({ data: true });
    toast.success.mockClear();
    toast.error.mockClear();
  });
  test('renders LoginPage component', () => {
    const { getByLabelText, getByRole } = render(
      <BrowserRouter>
        <AuthContextProvider>
          <LoginPage />
        </AuthContextProvider>
      </BrowserRouter>
    );

    expect(getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});

// describe('first test', () => {
//   afterEach(() => jest.restoreAllMocks());
//   it('should return empty string', async () => {
//     axios.get.mockResolvedValue('');
//     const data = await axios.get();
//     expect(data).toEqual('');
//   });
// });
