import { useState } from 'react';
import css from './styles/App.module.scss';
import avatar from './assets/chatbot.svg';

export default function App(): JSX.Element {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const submitForm = (
    e: React.FormEvent<HTMLFormElement>,
    value: string,
    messages: string[]
  ): void => {
    e.preventDefault();
    const arr = value.split('+');
    if (
      arr.length !== 2 &&
      !Number.isInteger(+arr[0]) &&
      !Number.isInteger(+arr[1])
    )
      setMessages([...messages, value, 'Что-то пошло не так :(']);

    const sum = (+arr[0] + +arr[1]).toString();
    sum === 'NaN'
      ? setMessages([...messages, value, 'Что-то пошло не так :('])
      : setMessages([...messages, value, sum]);
    setValue('');
  };

  const createListItem = (messages: string[]) => {
    return messages.map((elem: string, idx: number) => (
      <li
        key={idx}
        className={idx % 2 === 0 ? css.user : css.bot}
      >
        {elem}
      </li>
    ));
  };

  return (
    <>
      <header className={css.header}>
        <img
          src={avatar}
          alt="Chatbot avatar"
        />
        <span>CalculatorBot</span>
      </header>
      <ul className={css.chatbox}>{createListItem(messages)}</ul>
      <form onSubmit={(e) => submitForm(e, value, messages)}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          type="text"
          placeholder="Введите выражение..."
        />
        <button />
      </form>
    </>
  );
}
