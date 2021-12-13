import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

export const fetchData = async () => {
    // リクエスト後の値をresponseに保存
    const response = await axios.get(todoDataUrl);

    // TODOリストに現在の値としてセット
    setTodoList(response.data);
};