import React, { Component } from 'react';
import './App.css';
import Box from "./component/Box";

const choice = {
  rock: {
    name: "Rock",
    img: "꼬마돌.jpg"
  },
  scissors: {
    name: "Scissors",
    img: "가위.png"
  },
  paper: {
    name: "Paper",
    img: "종이.jpg"
  }
};

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: { user: null, computer: null },
    };
  }

  play = (userChoice) => {
    const userSelect = choice[userChoice];
    const computerChoice = this.randomChoice();
    const result = this.judgement(userSelect, computerChoice);

    this.setState({
      userSelect,
      computerSelect: computerChoice,
      result,
    });
  };

  randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const final = itemArray[randomItem];
    return choice[final];
  };

  judgement = (user, computer) => {
    if (user.name === computer.name) {
      return { user: "tie", computer: "tie" };
    } else if (
      (user.name === "Rock" && computer.name === "Scissors") ||
      (user.name === "Scissors" && computer.name === "Paper") ||
      (user.name === "Paper" && computer.name === "Rock")
    ) {
      return { user: "win", computer: "lose" };
    } else {
      return { user: "lose", computer: "win" };
    }
  };

  render() {
    const { userSelect, computerSelect, result } = this.state;
    return (
      <div className="container">
        <h1>가위~바위~보!</h1>
        <div className="main">
          <Box title="You" item={userSelect} result={result.user} />
          <Box title="Computer" item={computerSelect} result={result.computer} />
        </div>
        <div className="main">
          <button onClick={() => this.play("scissors")}>가위</button>
          <button onClick={() => this.play("rock")}>바위</button>
          <button onClick={() => this.play("paper")}>보</button>
        </div>
      </div>
    );
  }
}
