import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useState,useEffect} from "react";

function App() {
 const [myBook, setMyBook] = useState([]);
 const [postBook, setPostBook ] = useState({
                bookId:'',
                bookName:'',
                author: '',
                price:''
       });
 const handleInput =(event) => {
                setPostBook({...postBook,[event.target.name]: event.target.event})
 }

 function handleSubmit(event){
 event.preventDefault()
 axios.post('http://localhost:8080/books',{postBook})
         .then(response => console.log(response))
         .catch(err =>console.log(err))
 }
  return (
           <div className='d-flex align-items-center justify-content-center vh-100 wh-100'>
             <div className='w-50 text-center'>
                 <form onSubmit={handleSubmit}>
                     Book Id:<input type="text" onchange={handleInput} name="bookId"></input><br></br>
                     Book Name:<input type="text" onchange={handleInput} name="bookName"></input><br></br>
                     Book author:<input type="text" onchange={handleInput} name="author"></input><br></br>
                     Book price:<input type="text" onchange={handleInput} name="price"></input><br></br>
                    <button className='btn btn-primary'>Submit</button>
                 </form>

             </div>
          </div>
          )

 useEffect(() => {
    axios.get("http://localhost:8080/book")
         .then((result) => {
                setMyBook(result.data)
                console.log(result.data);
                }).catch((error) => console.log(error));

 },[]);
  return (
  <div>
  <h1> Axios Tutorials</h1>
  {myBook.map((post) => {
  const {bookId, bookName, author, price } = post;

  return <div className="card" key={bookId}>
            <p>{bookName}</p>
            <p>{author}</p>
            <p>{price}</p>
        </div>
  })}
  </div>

);
}

export default App;
