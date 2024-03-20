import {useState} from "react";
import './App.css';
import Box from "./component/Box";

// 강의 순서
// 1. 박스 2개(타이틀, 사진, 결과)
// 2. 가위, 바위, 보 버튼
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3,4 의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바뀐다(승-초록, 무-검정 패-빨강)

// 내가 생각한 순서
// 1. 컴퓨터 내부적으로 정답 랜덤 / 클릭할 때마다 랜덤 돌리기
// 2. 가위/바위/보 클릭할 때마다 값 받아와서 승/무/패 가르기
// 3. 승/무/패 색 변화, 글씨 변화
const choice = {
  rock:{
    name : "Rock",
    img:"꼬마돌.jpg"
  },
  scissors:{
    name : "Scissors",
    img:"가위.png"
  },
  paper:{
    name : "Paper",
    img:"종이.jpg"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult]=useState({user: null, computer: null});

  const play = (userChoice) => {
    // 내 선택
    setUserSelect(choice[userChoice])
    // 컴퓨터 선택dd
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);

    //승무패 판단
    setResult(judgement(choice[userChoice], computerChoice));

  };

  const randomChoice = () => {
    // 객체의 키값만 뽑아서 배열로 만들어주는 함수
    let itemArray = Object.keys(choice);

    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  }

  const judgement = (user, computer) => {
    // console.log("user", user, "computer", computer);
    // user == computer tie
    // user == rock, computer == scissors user win
    // user == rock, computer == paper user lose
    // user == scissors, computer == paper user win
    // user == scissors, computer == rock user lose
    // user == paper, computer == rock user win
    // user == paper, computer == scissors user lose

    if (user.name === computer.name){
      return { user: "tie", computer: "tie"};
    }else if(
      (user.name === "Rock" && computer.name === "Scissors") ||
      (user.name === "Scissors" && computer.name === "Paper") ||
      (user.name === "Paper" && computer.name === "Rock")
    ){
      return {user: "win", computer: "lose"};
    } else{
      return {user: "lose", computer: "win"};
    }
  }

  return (
    <div className="container">
      <h1>가위~바위~보!</h1>
      <div className="main">
        <Box title="You" item={userSelect} result={result.user}/>
        <Box title="Computer" item={computerSelect} result={result.computer}/>
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
    
  );
}

export default App;
