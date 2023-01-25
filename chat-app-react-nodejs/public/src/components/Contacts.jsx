import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={"data:image/jpeg;base64,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"} alt="logo" />
            <h3>wassup</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080421;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #FFFFFF;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
