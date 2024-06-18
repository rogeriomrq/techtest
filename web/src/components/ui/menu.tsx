import { ReactElement } from "react";

function Menu(): ReactElement {
  return (
      <header className="w-full p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(19, 51, 44)' }}>
            <a href="/" className="hover:underline" style={{ color: 'rgb(19, 51, 44)'}}>Kanastra</a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/payment" className="text-lg font-semibold hover:underline" style={{ color: 'rgb(19, 51, 44)' }}>Pagamento</a>
            </li>
            <li>
              <a href="/about" className="text-lg font-semibold hover:underline" style={{ color: 'rgb(19, 51, 44)' }}>Sobre</a>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export { Menu };
