import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Should render 4 Harry Potter books with one image, isbn, gernes,title,author,published and description each', async () => {
  render(
    <App />
  );

  // Search for 'Harry' 
  const input = screen.getByLabelText('search book')
  fireEvent.change(input, { target: { value: 'Harry' } })

  // Simulate a click and search
  const button = await screen.findByRole('button');
  userEvent.click(button);

  // get book list that match search
  const list = await screen.findByRole('list');
  let { getAllByRole } = within(list)
  const items = getAllByRole("listitem");

  // checking that searching for 'Harry' returns 4 books
  expect(items.length).toBe(4);

  // Checking that all books returned have one image, isbn, gernes,title,author,published and description
  for (const item of items) {
    const { getAllByLabelText } = within(item)
    const image = getAllByLabelText("image");
    const isbn = getAllByLabelText("isbn");
    const gernes = getAllByLabelText("gernes");
    const title = getAllByLabelText("title");
    const author = getAllByLabelText("author");
    const published = getAllByLabelText("published");
    const description = getAllByLabelText("description");
    expect(isbn.length).toBe(1);
    expect(image.length).toBe(1);
    expect(gernes.length).toBe(1);
    expect(title.length).toBe(1);
    expect(author.length).toBe(1);
    expect(published.length).toBe(1);
    expect(description.length).toBe(1);
  }

})
