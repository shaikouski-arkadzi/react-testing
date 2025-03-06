import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

test("рендерит App и проверяет основные элементы", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Проверяем заголовок
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();

  // Проверяем, что отображаются логотипы Vite и React
  // И нету Angular в alt свойстве картинки
  expect(screen.getByAltText(/Vite logo/i)).toBeInTheDocument();
  expect(screen.getByAltText(/React logo/i)).toBeInTheDocument();
  expect(screen.queryByAltText(/Angular logo/i)).toBeNull();

  // Проверяем начальное состояние кнопки
  const button = screen.getByRole("button", { name: /count is 0/i });
  expect(button).toBeInTheDocument();

  // Кликаем по кнопке и проверяем обновление счетчика
  fireEvent.click(button);
  expect(
    screen.getByRole("button", { name: /count is 1/i })
  ).toBeInTheDocument();
});

test("App snapshot", () => {
  expect(
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  ).toMatchSnapshot();
});
