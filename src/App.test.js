import { render, screen } from '@testing-library/react';
import App from './App';
import SamuraiJSApp from "./App";
import ReactDOM from "react-dom/client";

test('renders without crashing', () => {
const div = document.createElement('div'); // 92 cписал тест у Диміча, но он не прошел. Матюкается )))
ReactDOM.render(<SamuraiJSApp/>, div);
ReactDOM.unmountComponentAtNode(div)


  // render(<SamuraiJSApp />); // 92 заменили Арр на SamuraiJSApp
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
