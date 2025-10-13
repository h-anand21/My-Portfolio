
'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WelcomeScreen = () => {
  return (
    <StyledWrapper>
      <motion.div 
        className="card-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="card">
          <div className="boxshadow" />
          <div className="main">
            <div className="top" />
            <div className="left side" />
            <div className="right side" />
            <div className="title">
              <div className="text-center text-lg md:text-xl p-4">
                  <p>👋 Welcome friends!</p>
                  <p>Coding karte rahe, haste rahe, muskuraate rahe! 💻✨</p>
              </div>
            </div>
            <div className="button-container">
            </div>
          </div>
        </div>
      </motion.div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card {
    position: relative;
    height: 300px;
    width: 230px;
    color: white;
  }

  .card .boxshadow {
    position: absolute;
    height: 100%;
    width: 100%;
    border: 1px solid hsl(var(--primary));
    transform: scale(0.8);
    box-shadow: 0px 30px 70px 0px hsl(var(--primary) / 0.5);
    transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  .card .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(0deg, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary)) 60%, hsl(var(--primary) / 0.5) 100%);
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0 calc(100% - 40px));
    box-shadow: 0px 7px 29px 0px hsl(var(--primary) / 0.5);
    transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  .card .main .top {
    position: absolute;
    top: 0px;
    left: 0;
    width: 0px;
    height: 0px;
    z-index: 2;
    border-top: 115px solid black;
    border-left: 115px solid transparent;
    border-right: 115px solid transparent;
    transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  .card .main .side {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateX(-50%);
    height: 101%;
    background: black;
    clip-path: polygon(0% 0%, 50% 0, 95% 45%, 100% 100%, 0% 100%);
    transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 1s;
  }

  .card .main .left {
    left: 0;
  }

  .card .main .right {
    right: 0;
    transform: translateX(50%) scale(-1, 1);
  }

  .card .main .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 25px;
    opacity: 0;
    z-index: 1;
    transition: all 1s ease-in-out 1s;
    width: 100%;
  }

  .card:hover .main {
    transform: scale(1.1);
  }

  .card:hover .main .top {
    top: -50px;
  }

  .card:hover .main .left,
  .card.active .main .left {
    left: -50px;
    transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
  }
  
  .card:hover .main .right,
  .card.active .main .right {
    right: -50px;
    transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
  }
  
  .card:hover .main .title,
  .card.active .main .title {
    opacity: 1;
    transition: all 0.2s ease-out 1.3s;
  }
  
  .card.active .main .top {
    top: -50px;
  }
`;

export default WelcomeScreen;
