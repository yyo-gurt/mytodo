import { useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const groupArr = [
    { title: "그룹 제목", count: 2 },
    { title: "그룹 제목", count: 3 },
  ];

  const todosArr = [
    { text: "할 일을 적으세요.", date: "2023년 01월 01일" },
    { text: "할 일을 적으세요.", date: "2023년 01월 01일" },
    { text: "할 일을 적으세요.", date: "2023년 01월 01일" },
  ];

  const tabArr = [
    {
      title: "보드",
      content: (
        <div className={styles.board}>
          {groupArr.map((v, i) => {
            return (
              <div className={styles.group} key={i}>
                <div className={styles.top_area}>
                  <h4>{v.title}</h4>
                  <span>{v.count}</span>
                  <button>
                    <img src="/images/more.png" />
                  </button>
                </div>
                {todosArr.map((v, i) => {
                  return (
                    <div className={styles.todo} key={i}>
                      <button>
                        <img src="/images/circle.png" />
                      </button>
                      <span className={styles.text}>{v.text}</span>
                    </div>
                  );
                })}
                <div className={styles.add_todo}>
                  <img src="/images/plus.png" />
                  <span>작업 추가</span>
                </div>
              </div>
            );
          })}
          <div className={styles.add_group}>
            <img src="/images/plus.png" />
          </div>
        </div>
      ),
    },
    {
      title: "캘린더",
      content: <ul className={styles.calendar}></ul>,
    },
    {
      title: "리스트",
      content: (
        <ul className={styles.list}>
          {todosArr.map((v, i) => {
            return (
              <li key={i}>
                <button>
                  <img src="/images/circle.png" />
                </button>
                <span className={styles.text}>{v.text}</span>
                <span className={styles.date}>{v.date}</span>
              </li>
            );
          })}
        </ul>
      ),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <section id={styles.section} className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title} placeholder="제목 없음">
            제목을 입력하세요.
          </div>
          <ul className={styles.tab}>
            {tabArr.map((v, i) => {
              return (
                <li key={i} className={activeIndex === i ? styles.selected : ""} onClick={() => tabClickHandler(i)}>
                  {v.title}
                </li>
              );
            })}
          </ul>
          <div className={styles.todos}>{tabArr[activeIndex].content}</div>
        </div>
      </section>
    </>
  );
}
