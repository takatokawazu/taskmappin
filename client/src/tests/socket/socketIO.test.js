import io from 'socket.io-client';
import {
  connectWithSocketIOServer,
  login,
  sendChatMessage,
  createVideoRoom,
  joinVideoRoom,
  leaveVideoRoom,
  addT,
  completeT,
} from '../../socketConnection/socketConnection';

jest.mock('socket.io-client');

describe('Socket.IO Client Tests', () => {
  let socketMock;

  beforeEach(() => {
    socketMock = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    io.mockReturnValue(socketMock);
  });

  afterAll(() => {
    io.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the socket server', () => {
    connectWithSocketIOServer();
    expect(io).toHaveBeenCalledWith(
      'https://taskmappin-c2989267e49d.herokuapp.com/'
    );
    expect(socketMock.on).toHaveBeenCalledWith('connect', expect.any(Function));
  });

  it('should emit a login event', () => {
    let data = {
      username: 'testUser',
      coords: {
        lng: process.env.REACT_APP_DEFAULT_LONTITUDE,
        lat: process.env.REACT_APP_DEFAULT_LATITUDE,
      },
    };
    connectWithSocketIOServer();

    login(data);

    expect(socketMock.emit).toHaveBeenCalledWith('user-login', data);
  });

  it('should emit a chat message event', () => {
    connectWithSocketIOServer();
    sendChatMessage({ message: 'Hello' });
    expect(socketMock.emit).toHaveBeenCalledWith('chat-message', {
      message: 'Hello',
    });
  });

  it('should emit an add task event', () => {
    connectWithSocketIOServer();
    addT({ taskName: 'TaskA' });
    expect(socketMock.emit).toHaveBeenCalledWith('add-task', {
      taskName: 'TaskA',
    });
  });

  it('should emit a complete task event', () => {
    connectWithSocketIOServer();
    completeT({ taskId: 'TaskA' }, 'testUser');
    expect(socketMock.emit).toHaveBeenCalledWith(
      'complete-task',
      { taskId: 'TaskA' },
      'testUser'
    );
  });
});
