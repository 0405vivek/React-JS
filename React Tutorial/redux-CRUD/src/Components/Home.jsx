import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { deleteBook, getAllBooks } from "../services/Actions/booksAction";
import { useNavigate } from "react-router";

const Home = () => {
  const { books } = useSelector((state) => state.bookReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  }
  const handleDelete = (id) => {
    dispatch(deleteBook(id))
  }

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.desc}</td>
              <td>{book.category}</td>
              <td>{book.price}</td>
              <td>
                <img src={book.image} height={80} />
              </td>
              <td>
                <Button onClick={()=> handleEdit(book.id)}>
                  <FaEdit />
                </Button>
              </td>
              <td>
                <Button onClick={()=> handleDelete(book.id)} variant="danger">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Home;