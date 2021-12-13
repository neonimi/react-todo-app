/* 
TODOアプリ作成 -step4 モックサーバーと通信するtodos.jsを作成
  TODOの追加・更新・削除できるようにする
*/
import '../App.css';
import {useState, useEffect} from "react";
import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

const TodoTitle = ({title, as}) => {
  if (as === "h1") return <h1>{title}</h1>;
  if (as === "h2") return <h2>{title}</h2>;
  return <p>{title}</p>;
};

const TodoItem = ({todo}) => {
  return (
    // liに一意なIDをkey属性の値として付与
    <li key={todo.id}>
      {todo.content}
      {/* 現時点でボタンは機能していない */}
      <button>{todo.done ? "未完了リストへ": "完了リストへ"}</button>
      <button>削除</button>
    </li>
  );
};

const TodoList = ({todoList}) => {
  return (
    <ul>
    {todoList.map((todo) => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </ul>
  )
}

function App() {
//   TODOリストに空の初期値
  const [todoList, setTodoList] = useState([]);

//   コンポーネントマウント後に処理を実行
  useEffect(() => {
    // 非同期処理(async/await)
    const fetchData = async () => {
      // リクエスト後の値をresponseに保存
      const response = await axios.get(todoDataUrl);

      // TODOリストに現在の値としてセット
      setTodoList(response.data);
    };
    fetchData();
  },[]);

  // 取得したTODOリストの情報を確認
  console.log("TODOリスト：", todoList);

  // 未完了リストを表示
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  console.log("未完了TODOリスト", inCompletedList);

  // 完了リストを表示
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  console.log("完了TODOリスト:", completedList);

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1"/>
    { /* 現時点では未機能 */ }
      <textarea />
      <button>+TODOを追加</button>

      <TodoTitle title="TODOリスト(未)" as="h2" />
      <TodoList todoList={inCompletedList} />

      <TodoTitle title="完了TODOリスト(済)" as="h2" />
      <TodoList todoList={completedList} />
    </>
  );
}

export default App;