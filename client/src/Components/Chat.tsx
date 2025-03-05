/** @format */

import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<
    {
      room: string;
      author: string;
      message: string;
      time: string;
    }[]
  >([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    const messageListener = (data: {
      room: string;
      author: string;
      message: string;
      time: string;
    }) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on('receive_message', messageListener);

    return () => {
      socket.off('receive_message', messageListener);
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className={`message ${
                  username === messageContent.author ? 'you' : 'other'
                }`}
              >
                <div className="message-content">
                  <h4>{messageContent.message}</h4>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            );
          })}{' '}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter' && sendMessage();
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
