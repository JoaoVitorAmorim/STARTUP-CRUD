import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import {Radar} from "react-chartjs-2"
import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

export default function Dropdown(props) {
  const [meetData, setState] = useState([]);
  function getMeetData() {
    useEffect(() => {
      client
        .query({
          query: gql`
            query Alleixo($input: String!) {
              alleixo(input: $input) {
                e1
                e2
                e3
                e4
                e5
                id
              }
            }
          `,
          variables: { input: props.id },
        })
        .then((result) => setState(result.data.alleixo))
        .then(console.log(meetData))
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }, []);
    return meetData;
  }

  getMeetData();
  const data={data : {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }],
    options : {
      scale: {
          angleLines: {
              display: false
          },
          ticks: {
              suggestedMin: 50,
              suggestedMax: 100
          }
      }
  }
  }}
  

  return (
    <>
      <div
        className="mainContainer"
        style={{
          flexDirection: "row",
        }}
      >
        <div className="firsRow">
          <Meetbar>
            <MeetItem icon="🦔">
              <DropdownMenu props={meetData}></DropdownMenu>
            </MeetItem>
          </Meetbar>
        </div>
        <canvas
          className="secondRow"
          id="secondRow"
          style={{marginLeft:"60rem"}}
        >
          
          
        </canvas>
      </div>
    </>
  );
}

function Meetbar(props) {
  return (
    <nav
      className="meetbar"
      style={{
        height: "60px",
        backgroundColor: "grey",
        padding: "0 1rem",
        borderBottom: "1px solid #474a4d",
      }}
    >
      <ul
        className="meetbar-nav"
        style={{
          height: "60px",
          backgroundColor: "#242526",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {props.children}
      </ul>
    </nav>
  );
}

function MeetItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="meet-item"
      style={{
        width: "60px *0.8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        href="javascript:void(0);"
        className="icon-button"
        style={{
          width: "60px * 0.5",
          height: "60px * 0.5",
          backgroundColor: "#484a4d",
          borderRadius: "50%",
          padding: "5px",
          margin: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "filter 300ms",
          position: "relative",
        }}
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [chartData, setChartData] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    setChartData(props);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="javascript:void(0);"
        className="menu-item"
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          transition: "background 500ms",
          padding: "0,5rem",
        }}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>Reunioes</DropdownItem>
          <DropdownItem leftIcon="🦧" rightIcon="🦧" goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem leftIcon="🦧" rightIcon="🦧" goToMenu="animals">
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <h2>Selecione as Reuniões :</h2>
          </DropdownItem>
          {props.props.map((item, key) => (
            <DropdownItem key={key}>{props.props[key].id}</DropdownItem>
          ))}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon="🦧">
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
      <style jsx>
        {`
          
          
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          a {
            href="javascript:void(0);"
            color: #dadce1;
            text-decoration: none;;
          }
          .dropdown {
            position: absolute;
            top: 58px;
            width: 300px;
            transform: translateX(-45%);
            background-color: #242526;
            border: 1px solid #474a4d;
            border-radius: 8px;
            padding: 1rem;
            overflow: hidden;
            transition: height 500ms ease;
            margin-top:85vh
          }

          .menu {
            width: 100%;
          }

          .menu-item {
            height: 50px;
            display: flex;
            align-items: center;
            border-radius: 8px;
            transition: background 500ms;
            padding: 0.5rem;
          }

          .menu-item .icon-button {
            margin-right: 0.5rem;
          }

          .menu-item .icon-button:hover {
            filter: none;
          }

          .menu-item:hover {
            background-color: #525357;
          }

          .icon-right {
            margin-left: auto;
          }

          /* CSSTransition classes  */
          .menu-primary-enter {
            position: absolute;
            transform: translateX(-110%);
          }
          .menu-primary-enter-active {
            transform: translateX(0%);
            transition: all 500ms ease;
          }
          .menu-primary-exit {
            position: absolute;
          }
          .menu-primary-exit-active {
            transform: translateX(-110%);
            transition: all 500ms ease;
          }

          .menu-secondary-enter {
            transform: translateX(110%);
          }
          .menu-secondary-enter-active {
            transform: translateX(0%);
            transition: all 500ms ease;
          }
          .menu-secondary-exit {
          }
          .menu-secondary-exit-active {
            transform: translateX(110%);
            transition: all 500ms ease;
          }
        `}
      </style>
    </div>
  );
}
